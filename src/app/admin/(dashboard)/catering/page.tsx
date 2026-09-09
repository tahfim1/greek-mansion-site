import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
export default async function CateringInquiriesPage() {
  let inquiries: any[] = [];
  try {
    inquiries = await prisma.cateringInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (e) {
    console.warn('Could not fetch catering inquiries (database not available):', e);
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>
            Catering Inquiries
          </h1>
          <p className="text-[#11102F]/60 mt-1">Manage and respond to catering requests.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#E8DCCB] overflow-hidden">
        {inquiries.length === 0 ? (
          <div className="p-8 text-center text-[#11102F]/60">
            No inquiries yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E8DCCB] bg-[#F7F3EA]/50">
                  <th className="p-4 font-bold text-[#1E1C59] text-sm uppercase tracking-wider">Date Received</th>
                  <th className="p-4 font-bold text-[#1E1C59] text-sm uppercase tracking-wider">Name / Contact</th>
                  <th className="p-4 font-bold text-[#1E1C59] text-sm uppercase tracking-wider">Event Info</th>
                  <th className="p-4 font-bold text-[#1E1C59] text-sm uppercase tracking-wider">Guests & Budget</th>
                  <th className="p-4 font-bold text-[#1E1C59] text-sm uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DCCB]/60">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-[#F7F3EA]/30 transition-colors group align-top">
                    <td className="p-4 whitespace-nowrap text-sm text-[#11102F]/70">
                      {new Date(inquiry.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      <br />
                      <span className="text-xs text-[#11102F]/40">{new Date(inquiry.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-[#1E1C59]">{inquiry.name}</div>
                      <div className="text-sm text-[#11102F]/70 mt-1">
                        <a href={`mailto:${inquiry.email}`} className="text-[#F3BA2F] hover:underline block">{inquiry.email}</a>
                        <a href={`tel:${inquiry.phone}`} className="text-[#F3BA2F] hover:underline block mt-0.5">{inquiry.phone}</a>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <span className="font-semibold text-[#11102F]">Type:</span> {inquiry.eventType || 'N/A'}
                      </div>
                      <div className="text-sm mt-1">
                        <span className="font-semibold text-[#11102F]">Date:</span> {new Date(inquiry.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="text-sm mt-1">
                        <span className="font-semibold text-[#11102F]">Pickup:</span> {inquiry.pickup === 'pickup' ? 'Pickup' : 'Discuss Delivery'}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <span className="font-semibold text-[#11102F]">Guests:</span> {inquiry.guests}
                      </div>
                      <div className="text-sm mt-1">
                        <span className="font-semibold text-[#11102F]">Budget:</span> {inquiry.budget || 'Not specified'}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider
                        ${inquiry.status === 'NEW' ? 'bg-blue-100 text-blue-800' : ''}
                        ${inquiry.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${inquiry.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : ''}
                        ${inquiry.status === 'ARCHIVED' ? 'bg-gray-100 text-gray-800' : ''}
                      `}>
                        {inquiry.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
