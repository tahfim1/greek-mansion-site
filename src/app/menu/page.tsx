import type { Metadata } from 'next';
import MenuPageClient from './MenuPageClient';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic'; // Ensures it updates automatically when CMS changes

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Browse the full Greek Mansion menu — appetizers, pita wraps, dinner plates, sandwiches, salads, specials, and catering packages.',
};

export default async function MenuPage() {
  // Fetch active categories and products from the database
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

  // Transform database models to match the expected format for MenuPageClient
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

  // Render the client component with the dynamic data
  return <MenuPageClient initialCategories={formattedCategories} />;
}
