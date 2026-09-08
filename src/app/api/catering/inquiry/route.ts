import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Create the inquiry in the database
    const inquiry = await prisma.cateringInquiry.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        eventType: body.eventType || null,
        eventDate: new Date(body.eventDate),
        guests: parseInt(body.guests, 10),
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
