import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

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
  const primary = await readListFromFile(path.join(PRIMARY_DIR, 'rsvps.json'));
  if (primary !== null) return primary;

  const fallback = await readListFromFile(path.join(FALLBACK_DIR, 'rsvps.json'));
  if (fallback !== null) return fallback;

  return [];
}

async function saveRSVP(newEntry) {
  const dirsToTry = [PRIMARY_DIR, FALLBACK_DIR];

  for (const dir of dirsToTry) {
    try {
      await fs.mkdir(dir, { recursive: true });
      const filePath = path.join(dir, 'rsvps.json');
      const currentList = (await readListFromFile(filePath)) || [];
      currentList.push(newEntry);
      await fs.writeFile(filePath, JSON.stringify(currentList, null, 2), 'utf-8');
      return true;
    } catch (err) {
      console.warn(`Could not save RSVP to ${dir} (read-only filesystem or permission issue):`, err.message);
    }
  }
  return false;
}

export async function GET() {
  try {
    const rsvps = await getStoredRSVPs();
    return NextResponse.json({ success: true, count: rsvps.length, data: rsvps });
  } catch (error) {
    console.error('Error retrieving RSVPs:', error);
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

    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });
    }

    const newEntry = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2, 7),
      name: name.trim(),
      phone: (phone || '').trim(),
      status: status || 'attending',
      guests: status === 'attending' ? Number(guests) || 1 : 0,
      attendingEvents: attendingEvents || ['all'],
      message: (message || '').trim(),
      createdAt: new Date().toISOString(),
    };

    await saveRSVP(newEntry);

    const webhookUrl = process.env.RSVP_WEBHOOK_URL || process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (webhookUrl && typeof webhookUrl === 'string' && webhookUrl.startsWith('http')) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(newEntry),
        });
      } catch (err) {
        console.error('RSVP webhook error:', err);
      }
    }

    return NextResponse.json({ success: true, data: newEntry }, { status: 201 });
  } catch (error) {
    console.error('RSVP submission error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
