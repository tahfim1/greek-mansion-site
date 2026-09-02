import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [
    publishedProducts,
    draftProducts,
    soldOutProducts,
    activeCategories,
    homepageSections
  ] = await Promise.all([
    prisma.product.count({ where: { status: 'PUBLISHED' } }),
    prisma.product.count({ where: { status: 'DRAFT' } }),
    prisma.product.count({ where: { isSoldOut: true } }),
    prisma.category.count({ where: { isHidden: false, isArchived: false } }),
    prisma.homepageSection.count()
  ]);

  return (
    <div>
      <div className="mb-8">
        <p className="text-[#B18C56] text-sm font-bold tracking-widest uppercase mb-1">Overview</p>
        <h1 className="text-3xl md:text-4xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>
          CMS Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat Cards */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8DCCB]">
          <p className="text-[#11102F]/60 text-sm font-bold uppercase tracking-wider mb-2">Published Products</p>
          <p className="text-4xl font-bold text-[#1E1C59]">{publishedProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8DCCB]">
          <p className="text-[#11102F]/60 text-sm font-bold uppercase tracking-wider mb-2">Draft Products</p>
          <p className="text-4xl font-bold text-[#1E1C59]">{draftProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8DCCB]">
          <p className="text-[#11102F]/60 text-sm font-bold uppercase tracking-wider mb-2">Sold Out Products</p>
          <p className="text-4xl font-bold text-red-600">{soldOutProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8DCCB]">
          <p className="text-[#11102F]/60 text-sm font-bold uppercase tracking-wider mb-2">Active Categories</p>
          <p className="text-4xl font-bold text-[#1E1C59]">{activeCategories}</p>
        </div>
      </div>
    </div>
  );
}
