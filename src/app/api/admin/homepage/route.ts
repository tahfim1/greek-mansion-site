import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {

    // Fetch all available categories (not archived, not hidden)
    const availableCategories = await prisma.category.findMany({
      where: {
        isArchived: false,
        isHidden: false
      },
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
      },
      orderBy: {
        displayOrder: 'asc'
      }
    });

    // Fetch the current featured configuration
    const setting = await prisma.restaurantSetting.findUnique({
      where: { key: 'HOME_FEATURED_CATEGORIES' }
    });

    let featuredCategoryIds: string[] = [];
    if (setting && setting.value) {
      try {
        featuredCategoryIds = JSON.parse(setting.value);
      } catch (e) {
        featuredCategoryIds = [];
      }
    }

    return NextResponse.json({ availableCategories, featuredCategoryIds });
  } catch (error) {
    console.error('Error fetching homepage config:', error);
    return NextResponse.json({ error: 'Failed to fetch homepage config' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {

    const { featuredCategoryIds } = await request.json();

    if (!Array.isArray(featuredCategoryIds)) {
      return NextResponse.json({ error: 'featuredCategoryIds must be an array' }, { status: 400 });
    }

    // Upsert the setting
    await prisma.restaurantSetting.upsert({
      where: { key: 'HOME_FEATURED_CATEGORIES' },
      update: { value: JSON.stringify(featuredCategoryIds) },
      create: { 
        key: 'HOME_FEATURED_CATEGORIES', 
        value: JSON.stringify(featuredCategoryIds) 
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating homepage config:', error);
    return NextResponse.json({ error: 'Failed to update homepage config' }, { status: 500 });
  }
}
