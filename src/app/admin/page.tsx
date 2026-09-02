import { PrismaClient } from '@prisma/client';
import { formatPrice } from '@/data/menu';
import LogoutButton from './LogoutButton';

const prisma = new PrismaClient();

// Add `export const dynamic = 'force-dynamic'` to ensure this page is never cached 
// and always pulls the latest orders from the database.
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: true },
    take: 50, // Get the 50 most recent orders
  });

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#F7F3EA]">
      <div className="container-custom mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-[#B18C56] text-sm font-bold tracking-widest uppercase mb-1">Admin Dashboard</p>
            <h1 className="text-3xl md:text-4xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>
              Recent Orders
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm font-bold bg-[#1E1C59] text-white px-4 py-2 rounded-full shadow-md">
              {orders.filter(o => o.status === 'PENDING').length} Pending
            </div>
            <LogoutButton />
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-[#E8DCCB]">
            <p className="text-[#11102F]/60 text-lg">No orders have been placed yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-[#E8DCCB] overflow-hidden">
                {/* Header */}
                <div className={`p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                  order.status === 'PENDING' ? 'bg-amber-50 border-b border-amber-100' : 'bg-[#F7F3EA] border-b border-[#E8DCCB]'
                }`}>
                  <div>
                    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold mb-2 ${
                      order.status === 'PENDING' ? 'bg-amber-200 text-amber-900' : 
                      order.status === 'COMPLETED' ? 'bg-green-200 text-green-900' : 
                      'bg-gray-200 text-gray-900'
                    }`}>
                      {order.status}
                    </span>
                    <h2 className="text-xl font-bold text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>
                      {order.orderNumber}
                    </h2>
                    <p className="text-[#11102F]/60 text-sm">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="sm:text-right">
                    <p className="font-bold text-[#1E1C59]">{order.customerName}</p>
                    <p className="text-[#11102F]/60 text-sm">{order.customerPhone}</p>
                    <p className="text-[#11102F]/60 text-sm">{order.customerEmail}</p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Items */}
                  <div className="md:col-span-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#11102F]/50 mb-3 border-b border-[#E8DCCB] pb-2">Order Items</h3>
                    <div className="space-y-3">
                      {order.items.map((item) => {
                        let modifiers = [];
                        try {
                          modifiers = item.modifiers ? JSON.parse(item.modifiers) : [];
                        } catch(e) {}
                        
                        return (
                          <div key={item.id} className="flex justify-between items-start border-b border-dashed border-[#E8DCCB]/50 pb-2 last:border-0 last:pb-0">
                            <div>
                              <p className="font-bold text-[#1E1C59]">
                                {item.quantity}x {item.productName}
                              </p>
                              {(item.variantName || modifiers.length > 0) && (
                                <p className="text-[#11102F]/60 text-sm">
                                  {[item.variantName !== 'Regular' ? item.variantName : null, ...modifiers.map((m: any) => m.option)].filter(Boolean).join(', ')}
                                </p>
                              )}
                              {item.specialInstructions && (
                                <p className="text-amber-700 text-xs mt-1 bg-amber-50 p-1 rounded inline-block">
                                  Note: {item.specialInstructions}
                                </p>
                              )}
                            </div>
                            <span className="font-medium text-[#1E1C59]">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Totals & Actions */}
                  <div className="bg-[#F7F3EA] rounded-xl p-4 h-fit">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#11102F]/50 mb-3 border-b border-[#E8DCCB] pb-2">Order Total</h3>
                    <div className="space-y-1 mb-4 text-sm text-[#11102F]/70">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{formatPrice(order.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>{formatPrice(order.tax)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg text-[#1E1C59] pt-2 mt-2 border-t border-[#E8DCCB]/50">
                        <span>Total</span>
                        <span>{formatPrice(order.total)}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-center text-[#11102F]/50 uppercase tracking-widest font-bold">
                        Type: {order.type}
                      </span>
                    </div>
                  </div>
                </div>
                
                {order.specialInstructions && (
                  <div className="bg-amber-50 p-4 border-t border-amber-100">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">Customer Note</p>
                    <p className="text-amber-900 text-sm italic">{order.specialInstructions}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
