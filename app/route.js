import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'rsvps.json');

async function getStoredRSVPs() {
  try {
    const fileContent = await fs.readFile(FILE_PATH, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
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
    const body = await request.json();
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

    await fs.mkdir(DATA_DIR, { recursive: true });
    const currentList = await getStoredRSVPs();
    currentList.push(newEntry);
    await fs.writeFile(FILE_PATH, JSON.stringify(currentList, null, 2), 'utf-8');

    const webhookUrl = process.env.RSVP_WEBHOOK_URL || process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(newEntry),
      }).catch((err) => console.error('RSVP webhook error:', err));
    }

    return NextResponse.json({ success: true, data: newEntry }, { status: 201 });
  } catch (error) {
    console.error('RSVP submission error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
