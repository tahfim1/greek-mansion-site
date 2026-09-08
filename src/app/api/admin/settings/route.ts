import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.restaurantSetting.findMany();
    const config = settings.reduce((acc: Record<string, string>, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    return NextResponse.json(config);
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // We expect an object with key-value pairs
    for (const [key, value] of Object.entries(body)) {
      if (typeof value === 'string') {
        await prisma.restaurantSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value }
        });
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
