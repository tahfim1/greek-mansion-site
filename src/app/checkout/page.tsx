'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/data/menu';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getTax, getTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'PICKUP', // Default
    instructions: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if cart is empty after mount
  useEffect(() => {
    if (mounted && items.length === 0) {
      router.push('/menu');
    }
  }, [mounted, items.length, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          },
          orderType: formData.type,
          specialInstructions: formData.instructions,
          items: items,
          totals: {
            subtotal: getSubtotal(),
            tax: getTax(),
            total: getTotal(),
          }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong submitting your order');
      }

      // Success!
      clearCart();
      router.push(`/order-confirmation/${data.orderId}`);
      
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  if (!mounted || items.length === 0) return null;

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#F7F3EA]">
      <div className="container-custom mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl md:text-4xl text-[#1E1C59] mb-8" style={{ fontFamily: "'Marcellus', serif" }}>
          Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="lg:w-2/3">
            <form id="checkout-form" onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#E8DCCB]">
              <h2 className="text-xl font-bold text-[#1E1C59] mb-6 border-b border-[#E8DCCB] pb-2">
                Customer Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <div>
                  <label htmlFor="name" className="form-label">Full Name *</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="form-input" />
                </div>
                <div>
                  <label htmlFor="phone" className="form-label">Phone Number *</label>
                  <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} className="form-input" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="form-input" />
                </div>
              </div>

              <h2 className="text-xl font-bold text-[#1E1C59] mb-6 border-b border-[#E8DCCB] pb-2">
                Order Details
              </h2>
              
              <div className="grid grid-cols-1 gap-5 mb-8">
                <div>
                  <label htmlFor="type" className="form-label">Order Type *</label>
                  <select id="type" name="type" required value={formData.type} onChange={handleChange} className="form-input">
                    <option value="PICKUP">Pickup (In Store)</option>
                    <option value="DINE_IN">Dine-In (We will assign a table)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="instructions" className="form-label">Order Instructions (Optional)</label>
                  <textarea 
                    id="instructions" 
                    name="instructions" 
                    rows={3} 
                    value={formData.instructions} 
                    onChange={handleChange} 
                    className="form-input resize-none" 
                    placeholder="E.g. I will pick up in 30 minutes..."
                  />
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                  {error}
                </div>
              )}

              {/* Payment Section (Simulated) */}
              <div className="bg-[#1E1C59]/5 p-6 rounded-xl border border-[#1E1C59]/10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1E1C59] flex items-center justify-center flex-shrink-0 text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E1C59] mb-1">Pay In Store</h3>
                    <p className="text-sm text-[#11102F]/60 leading-relaxed">
                      For Phase 2, we are capturing the order electronically but payment will be handled at the restaurant counter (Cash, Debit, or Credit).
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8DCCB] sticky top-24">
              <h2 className="text-xl font-bold text-[#1E1C59] mb-4 border-b border-[#E8DCCB] pb-2">
                Order Summary
              </h2>
              
              <div className="max-h-[300px] overflow-y-auto mb-6 pr-2 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex-1 pr-4">
                      <p className="font-bold text-[#1E1C59]">
                        {item.quantity}x {item.product.name}
                      </p>
                      {(item.variantLabel || item.modifiers.length > 0) && (
                        <p className="text-[#11102F]/60 text-xs mt-0.5">
                          {[item.variantLabel !== 'Regular' ? item.variantLabel : null, ...item.modifiers.map(m => m.option)].filter(Boolean).join(', ')}
                        </p>
                      )}
                    </div>
                    <div className="font-medium text-[#1E1C59]">
                      {formatPrice((item.basePrice + item.modifiers.reduce((sum, mod) => sum + mod.priceDelta, 0)) * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 pt-4 border-t border-[#E8DCCB] mb-6">
                <div className="flex justify-between text-sm text-[#11102F]/60">
                  <span>Subtotal</span>
                  <span>{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-sm text-[#11102F]/60">
                  <span>Tax (13%)</span>
                  <span>{formatPrice(getTax())}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-[#1E1C59] pt-2 border-t border-[#E8DCCB]/50">
                  <span>Total</span>
                  <span>{formatPrice(getTotal())}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full btn-primary !justify-center py-4 text-base shadow-lg disabled:opacity-70"
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
