import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const setting = await prisma.restaurantSetting.findUnique({
      where: { key: 'HOME_FEATURED_CATEGORIES' }
    });

    if (!setting || !setting.value) {
      return NextResponse.json([]);
    }

    let featuredCategoryIds: string[] = [];
    try {
      featuredCategoryIds = JSON.parse(setting.value);
    } catch (e) {
      return NextResponse.json([]);
    }

    if (!Array.isArray(featuredCategoryIds) || featuredCategoryIds.length === 0) {
      return NextResponse.json([]);
    }

    // Fetch the categories and their products
    const categories = await prisma.category.findMany({
      where: {
        id: { in: featuredCategoryIds },
        isArchived: false,
        isHidden: false
      },
      include: {
        products: {
          where: { status: { in: ['PUBLISHED', 'sold_out'] } },
          orderBy: { displayOrder: 'asc' },
          include: {
            images: {
              orderBy: { displayOrder: 'asc' },
              take: 1
            }
          }
        }
      }
    });

    // Map to Menu structure and preserve the explicit order defined by the admin
    const orderedCategories = featuredCategoryIds
      .map(id => categories.find(c => c.id === id))
      .filter(Boolean)
      .map(cat => {
        if (!cat) return null;
        return {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          description: cat.description || '',
          image: cat.image || '',
          products: cat.products.map(p => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            description: p.shortDescription || p.fullDescription || '',
            price: p.basePrice,
            image: p.images[0]?.url || '',
            status: p.status === 'sold_out' ? 'sold_out' : 'available',
            variants: p.menuInfoGroups ? JSON.parse(p.menuInfoGroups) : []
          }))
        };
      })
      .filter(cat => cat !== null);

    return NextResponse.json(orderedCategories);
  } catch (error) {
    console.error('Error fetching featured home categories:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
