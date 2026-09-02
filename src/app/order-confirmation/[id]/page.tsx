import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatPrice } from '@/data/menu';

const prisma = new PrismaClient();

export default async function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true }
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#F7F3EA] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-[#E8DCCB] max-w-2xl w-full text-center">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl text-[#1E1C59] mb-2" style={{ fontFamily: "'Marcellus', serif" }}>
          Order Confirmed!
        </h1>
        <p className="text-[#11102F]/60 mb-8">
          Thank you, {order.customerName}. Your order has been received and is being prepared.
        </p>

        {/* Order Details Card */}
        <div className="bg-[#F7F3EA] rounded-xl p-6 text-left mb-8 border border-[#E8DCCB]/60">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#E8DCCB] pb-4 mb-4 gap-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#11102F]/50 mb-1">Order Number</p>
              <p className="text-xl font-bold text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>
                {order.orderNumber}
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs font-bold uppercase tracking-wider text-[#11102F]/50 mb-1">Order Type</p>
              <p className="font-semibold text-[#1E1C59]">
                {order.type === 'PICKUP' ? 'Pickup In-Store' : 'Dine-In'}
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="font-semibold text-[#1E1C59]">
                  {item.quantity}x {item.productName}
                </span>
                <span className="text-[#1E1C59]">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#E8DCCB] pt-4 flex justify-between items-center">
            <span className="font-bold text-[#1E1C59]">Total to Pay In-Store</span>
            <span className="text-xl font-bold text-[#B18C56]" style={{ fontFamily: "'Marcellus', serif" }}>
              {formatPrice(order.total)}
            </span>
          </div>
        </div>

        <Link href="/" className="btn-primary !rounded-full !px-8">
          Return Home
        </Link>
      </div>
    </div>
  );
}
