import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function CategoriesAdmin() {
  const categories = await prisma.category.findMany({
    orderBy: { displayOrder: 'asc' },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>Categories</h1>
          <p className="text-[#11102F]/60">Manage your menu categories</p>
        </div>
        <button className="bg-[#B18C56] text-white px-4 py-2 rounded shadow">
          + Add Category
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#E8DCCB] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F7F3EA] border-b border-[#E8DCCB]">
              <th className="p-4 text-sm font-bold text-[#1E1C59] uppercase tracking-wider">Name</th>
              <th className="p-4 text-sm font-bold text-[#1E1C59] uppercase tracking-wider">Order</th>
              <th className="p-4 text-sm font-bold text-[#1E1C59] uppercase tracking-wider">Status</th>
              <th className="p-4 text-sm font-bold text-[#1E1C59] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b border-[#E8DCCB] hover:bg-gray-50">
                <td className="p-4 font-medium text-[#1E1C59]">{cat.name}</td>
                <td className="p-4 text-[#11102F]/60">{cat.displayOrder}</td>
                <td className="p-4 text-[#11102F]/60">
                  {cat.isHidden ? 'Hidden' : cat.isArchived ? 'Archived' : 'Active'}
                </td>
                <td className="p-4">
                  <button className="text-[#B18C56] font-semibold text-sm mr-4 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-[#11102F]/50">No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
