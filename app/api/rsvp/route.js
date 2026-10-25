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

function validateName(rawName) {
  const name = (rawName || '').trim();
  if (!name || name.length < 2 || name.length > 60) {
    return { valid: false, error: 'Name must be between 2 and 60 characters.' };
  }

  // Allowed characters: Latin alphabets, Devanagari script, spaces, dots, hyphens, apostrophes
  const validCharRegex = /^[a-zA-Z\u0900-\u097F\s.'-]+$/;
  if (!validCharRegex.test(name)) {
    return { valid: false, error: 'Name must contain only valid letters and spaces.' };
  }

  const lettersOnly = name.replace(/[^a-zA-Z\u0900-\u097F]/g, '');
  if (lettersOnly.length < 2) {
    return { valid: false, error: 'Name must contain at least 2 valid letters.' };
  }

  // Block 3 or more consecutive identical characters (e.g. "aaa", "zzzz")
  if (/(.)\1{2,}/i.test(name)) {
    return { valid: false, error: 'Please enter a genuine name without repeated characters.' };
  }

  // Check all letters identical (e.g. "aaaa", "bb")
  const uniqueChars = new Set(lettersOnly.toLowerCase());
  if (uniqueChars.size < 2 && lettersOnly.length >= 2) {
    return { valid: false, error: 'Please enter a valid, complete name.' };
  }

  const lower = name.toLowerCase().replace(/[^a-z]/g, '');
  const dummyNames = [
    'abc', 'xyz', 'test', 'tester', 'testing', 'asdf', 'qwerty', 'dummy',
    'sample', 'fake', 'admin', 'user', 'guest', 'none', 'unknown', 'null',
    'temp', 'random', 'foo', 'bar', 'baz', 'demo', 'check', 'noone', 'someone',
    'abcdef', 'zxcv', 'qwer'
  ];
  if (dummyNames.includes(lower)) {
    return { valid: false, error: 'Please enter your actual name.' };
  }

  // Ensure Latin names contain recognized vowels
  if (/^[a-zA-Z\s.'-]+$/.test(name) && !/[aeiouyAEIOUY]/.test(name)) {
    return { valid: false, error: 'Name must contain recognizable vowels.' };
  }

  // Check repeated 2-letter patterns (e.g. "ababab", "xyxyxy")
  if (lower.length >= 4 && /^([a-z]{2})\1+$/.test(lower)) {
    return { valid: false, error: 'Please enter a valid name.' };
  }

  return { valid: true, cleanName: name };
}

function validatePhone(rawPhone) {
  const cleanPhone = (rawPhone || '').toString().trim();
  if (!/^\d{10}$/.test(cleanPhone)) {
    return { valid: false, error: 'Contact number must be exactly 10 digits (numbers only).' };
  }
  if (!/^[6-9]\d{9}$/.test(cleanPhone) || /^(\d)\1{9}$/.test(cleanPhone)) {
    return { valid: false, error: 'Please enter a valid 10-digit mobile number.' };
  }
  if (['1234567890', '0123456789', '9876543210', '0987654321'].includes(cleanPhone)) {
    return { valid: false, error: 'Sequential test numbers are not allowed.' };
  }
  return { valid: true, cleanPhone };
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

    const nameValidation = validateName(name);
    if (!nameValidation.valid) {
      return NextResponse.json({ success: false, error: nameValidation.error }, { status: 400 });
    }

    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.valid) {
      return NextResponse.json({ success: false, error: phoneValidation.error }, { status: 400 });
    }

    const validStatus = status === 'declining' ? 'declining' : 'attending';
    const validGuests = validStatus === 'attending' ? Math.min(Math.max(Number(guests) || 1, 1), 6) : 0;
    const cleanMessage = (message || '').toString().trim().slice(0, 500);
    const cleanEvents = Array.isArray(attendingEvents) && attendingEvents.length > 0 ? attendingEvents : ['all'];
    const cleanName = nameValidation.cleanName;
    const cleanPhone = phoneValidation.cleanPhone;

    const currentList = await getStoredRSVPs();

    // Check for exact identical duplicate where all values are the same
    const areEventsEqual = (a, b) => {
      const arrA = Array.isArray(a) ? [...a].sort() : [];
      const arrB = Array.isArray(b) ? [...b].sort() : [];
      return JSON.stringify(arrA) === JSON.stringify(arrB);
    };

    const exactDuplicate = currentList.find((item) => {
      const sameName = (item.name || '').trim().toLowerCase() === cleanName.toLowerCase();
      const samePhone = (item.phone || '').toString().trim() === cleanPhone;
      const sameStatus = (item.status || 'attending') === validStatus;
      const sameGuests = Number(item.guests || 0) === Number(validGuests);
      const sameEvents = areEventsEqual(item.attendingEvents, cleanEvents);
      const sameMessage = (item.message || '').trim().toLowerCase() === cleanMessage.toLowerCase();
      return sameName && samePhone && sameStatus && sameGuests && sameEvents && sameMessage;
    });

    if (exactDuplicate) {
      return NextResponse.json({
        success: true,
        duplicate: true,
        message: 'An identical RSVP entry already exists. No duplicate created.',
        data: exactDuplicate,
      }, { status: 200 });
    }

    // Any different value creates a new valid entry without overwriting previous data
    const savedEntry = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2, 7),
      name: cleanName,
      phone: cleanPhone,
      status: validStatus,
      guests: validGuests,
      attendingEvents: cleanEvents,
      message: cleanMessage,
      createdAt: new Date().toISOString(),
    };
    currentList.push(savedEntry);

    await saveRSVPList(currentList);

    // Sync with Google Sheets / Webhook if configured
    const googleSheetUrl = process.env.GOOGLE_SHEET_URL || process.env.RSVP_WEBHOOK_URL || process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (googleSheetUrl && typeof googleSheetUrl === 'string' && googleSheetUrl.startsWith('http')) {
      try {
        const sheetRes = await fetch(googleSheetUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ action: 'create', ...savedEntry }),
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

    return NextResponse.json({ success: true, data: savedEntry }, { status: 201 });
  } catch (error) {
    console.error('RSVP submission error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
