import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

import CategoryClient from './CategoryClient';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function CategoriesAdmin() {
  const categories = await prisma.category.findMany({
    orderBy: { displayOrder: 'asc' },
  });

  return (
    <div>
      <CategoryClient initialCategories={categories} />
    </div>
  );
}
