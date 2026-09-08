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

    const settings = await prisma.restaurantSetting.findMany();
    const config = settings.reduce((acc: Record<string, string>, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    
    const hideNoImages = config['HIDE_PRODUCTS_WITHOUT_IMAGES'] === 'true';

    const formattedCategories = categoriesData.map(cat => ({
      id: cat.slug,
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      image: cat.image || '',
      sortOrder: cat.displayOrder,
      products: cat.products
        .filter(prod => {
          if (!hideNoImages) return true;
          return prod.images && prod.images.length > 0;
        })
        .map(prod => {
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
    })).filter(cat => cat.products.length > 0);

    return NextResponse.json(formattedCategories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}
