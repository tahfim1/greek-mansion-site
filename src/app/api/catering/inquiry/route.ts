import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate guests and eventDate
    const parsedGuests = parseInt(body.guests, 10);
    if (isNaN(parsedGuests)) {
      return NextResponse.json({ success: false, error: 'Invalid guests count' }, { status: 400 });
    }

    const parsedDate = new Date(body.eventDate);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json({ success: false, error: 'Invalid event date' }, { status: 400 });
    }

    // Create the inquiry in the database
    const inquiry = await prisma.cateringInquiry.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        eventType: body.eventType || null,
        eventDate: parsedDate,
        guests: parsedGuests,
        pickup: body.pickup || null,
        budget: body.budget || null,
        details: body.details || null,
      },
    });

    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (error) {
    console.error('Error creating catering inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
