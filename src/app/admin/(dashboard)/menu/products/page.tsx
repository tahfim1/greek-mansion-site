import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import ProductClient from './ProductClient';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function ProductsAdmin() {
  const products = await prisma.product.findMany({
    include: { category: true, images: true },
    orderBy: [{ categoryId: 'asc' }, { displayOrder: 'asc' }],
  });

  const categories = await prisma.category.findMany({
    orderBy: { displayOrder: 'asc' }
  });

  return (
    <div>
      <ProductClient initialProducts={products} categories={categories} />
    </div>
  );
}
