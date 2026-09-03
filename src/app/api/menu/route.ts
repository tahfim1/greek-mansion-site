import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const categoriesData = await prisma.category.findMany({
      where: { isHidden: false, isArchived: false },
      orderBy: { displayOrder: 'asc' },
      include: {
        products: {
          where: { status: 'PUBLISHED' },
          orderBy: { displayOrder: 'asc' },
          include: { images: true }
        }
      }
    });

    const formattedCategories = categoriesData.map(cat => ({
      id: cat.slug,
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      image: cat.image || '',
      sortOrder: cat.displayOrder,
      products: cat.products.map(prod => {
        let variants = [];
        try {
          variants = prod.menuInfoGroups ? JSON.parse(prod.menuInfoGroups) : [];
        } catch(e) {}
        
        return {
          id: prod.slug,
          name: prod.name,
          description: prod.fullDescription || prod.shortDescription || '',
          image: prod.images[0]?.url || '',
          price: prod.basePrice,
          variants: variants,
          status: (prod.isSoldOut ? 'sold_out' : 'active') as 'active' | 'sold_out' | 'draft',
          featured: prod.isFeatured
        };
      })
    }));

    return NextResponse.json(formattedCategories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}
