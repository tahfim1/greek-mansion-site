import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { formatPrice } from '@/data/menu';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function ProductsAdmin() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: [{ categoryId: 'asc' }, { displayOrder: 'asc' }],
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>Products</h1>
          <p className="text-[#11102F]/60">Manage your menu items</p>
        </div>
        <button className="bg-[#B18C56] text-white px-4 py-2 rounded shadow">
          + Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#E8DCCB] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F7F3EA] border-b border-[#E8DCCB]">
              <th className="p-4 text-sm font-bold text-[#1E1C59] uppercase tracking-wider">Name</th>
              <th className="p-4 text-sm font-bold text-[#1E1C59] uppercase tracking-wider">Category</th>
              <th className="p-4 text-sm font-bold text-[#1E1C59] uppercase tracking-wider">Price</th>
              <th className="p-4 text-sm font-bold text-[#1E1C59] uppercase tracking-wider">Status</th>
              <th className="p-4 text-sm font-bold text-[#1E1C59] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-[#E8DCCB] hover:bg-gray-50">
                <td className="p-4 font-medium text-[#1E1C59]">{p.name}</td>
                <td className="p-4 text-[#11102F]/60">{p.category?.name || 'Uncategorized'}</td>
                <td className="p-4 text-[#11102F]/60">{formatPrice(p.basePrice)}</td>
                <td className="p-4 text-[#11102F]/60">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    p.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
                    p.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {p.status}
                  </span>
                  {p.isSoldOut && <span className="ml-2 px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Sold Out</span>}
                </td>
                <td className="p-4">
                  <button className="text-[#B18C56] font-semibold text-sm mr-4 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-[#11102F]/50">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
