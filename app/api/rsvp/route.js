import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

const isServerless = Boolean(
  process.env.VERCEL ||
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  process.env.LAMBDA_TASK_ROOT ||
  process.cwd().startsWith('/var/task')
);

const PRIMARY_DIR = path.join(process.cwd(), 'data');
const FALLBACK_DIR = path.join(os.tmpdir(), 'wedding-rsvp-data');

async function readListFromFile(filePath) {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    if (fileContent && fileContent.trim()) {
      return JSON.parse(fileContent);
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.warn(`Could not read RSVPs from ${filePath}:`, error.message);
    }
  }
  return null;
}

async function getStoredRSVPs() {
  const dirsToTry = isServerless ? [FALLBACK_DIR] : [PRIMARY_DIR, FALLBACK_DIR];
  for (const dir of dirsToTry) {
    const data = await readListFromFile(path.join(dir, 'rsvps.json'));
    if (data !== null) return data;
  }
  return [];
}

async function saveRSVPList(list) {
  const dirsToTry = isServerless ? [FALLBACK_DIR] : [PRIMARY_DIR, FALLBACK_DIR];
  for (const dir of dirsToTry) {
    try {
      await fs.mkdir(dir, { recursive: true });
      const filePath = path.join(dir, 'rsvps.json');
      await fs.writeFile(filePath, JSON.stringify(list, null, 2), 'utf-8');
      return true;
    } catch (err) {
      console.warn(`Could not save RSVP to ${dir}:`, err.message);
    }
  }
  return false;
}

export async function GET() {
  try {
    const rsvps = await getStoredRSVPs();
    return NextResponse.json({ success: true, count: rsvps.length, data: rsvps });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve RSVPs' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON payload' }, { status: 400 });
    }

    const { name, phone, status, guests, attendingEvents, message } = body;

    const cleanName = (name || '').trim();
    const cleanPhone = (phone || '').trim();

    if (!cleanName) {
      return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });
    }

    const currentList = await getStoredRSVPs();
    const normalizedName = cleanName.toLowerCase();
    const normalizedPhone = cleanPhone.replace(/\D/g, '');

    // Find existing entry by matching name and phone
    const existingIndex = currentList.findIndex((item) => {
      const itemNormName = (item.name || '').trim().toLowerCase();
      const itemNormPhone = (item.phone || '').replace(/\D/g, '');

      if (normalizedPhone && itemNormPhone) {
        return itemNormPhone === normalizedPhone || itemNormName === normalizedName;
      }
      return itemNormName === normalizedName;
    });

    let savedEntry;
    const isUpdate = existingIndex !== -1;

    if (isUpdate) {
      // Overwrite existing entry in place
      savedEntry = {
        ...currentList[existingIndex],
        name: cleanName,
        phone: cleanPhone,
        status: status || 'attending',
        guests: status === 'attending' ? Number(guests) || 1 : 0,
        attendingEvents: attendingEvents || ['all'],
        message: (message || '').trim(),
        updatedAt: new Date().toISOString(),
      };
      currentList[existingIndex] = savedEntry;
    } else {
      // Create new entry
      savedEntry = {
        id: Date.now().toString(36) + Math.random().toString(36).substring(2, 7),
        name: cleanName,
        phone: cleanPhone,
        status: status || 'attending',
        guests: status === 'attending' ? Number(guests) || 1 : 0,
        attendingEvents: attendingEvents || ['all'],
        message: (message || '').trim(),
        createdAt: new Date().toISOString(),
      };
      currentList.push(savedEntry);
    }

    await saveRSVPList(currentList);

    // Sync with Google Sheets / Webhook if configured
    const googleSheetUrl = process.env.GOOGLE_SHEET_URL || process.env.RSVP_WEBHOOK_URL || process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (googleSheetUrl && typeof googleSheetUrl === 'string' && googleSheetUrl.startsWith('http')) {
      try {
        const sheetRes = await fetch(googleSheetUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ action: isUpdate ? 'update' : 'create', ...savedEntry }),
          redirect: 'follow',
        });
        const sheetResponseText = await sheetRes.text();
        console.log('Google Sheets sync response:', sheetResponseText);
      } catch (err) {
        console.error('Google Sheets sync error:', err);
      }
    } else {
      console.warn('RSVP saved, but GOOGLE_SHEET_URL is not set or invalid:', googleSheetUrl);
    }

    return NextResponse.json({ success: true, updated: isUpdate, data: savedEntry }, { status: isUpdate ? 200 : 201 });
  } catch (error) {
    console.error('RSVP submission error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
