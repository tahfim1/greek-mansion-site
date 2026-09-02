import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function HomepageAdmin() {
  const sections = await prisma.homepageSection.findMany();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>Homepage Content</h1>
          <p className="text-[#11102F]/60">Manage the text, images, and collections on your homepage</p>
        </div>
        <button className="bg-[#B18C56] text-white px-4 py-2 rounded shadow">
          + Add Section
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#E8DCCB] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F7F3EA] border-b border-[#E8DCCB]">
              <th className="p-4 text-sm font-bold text-[#1E1C59] uppercase tracking-wider">Identifier</th>
              <th className="p-4 text-sm font-bold text-[#1E1C59] uppercase tracking-wider">Heading</th>
              <th className="p-4 text-sm font-bold text-[#1E1C59] uppercase tracking-wider">Status</th>
              <th className="p-4 text-sm font-bold text-[#1E1C59] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((sec) => (
              <tr key={sec.id} className="border-b border-[#E8DCCB] hover:bg-gray-50">
                <td className="p-4 font-bold text-[#1E1C59]">{sec.identifier}</td>
                <td className="p-4 text-[#11102F]/60">{sec.heading || '(No heading)'}</td>
                <td className="p-4 text-[#11102F]/60">
                  {sec.isHidden ? 'Hidden' : 'Visible'}
                </td>
                <td className="p-4">
                  <button className="text-[#B18C56] font-semibold text-sm hover:underline">Edit</button>
                </td>
              </tr>
            ))}
            {sections.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-[#11102F]/50">
                  No homepage sections found. Initialize them in settings.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
