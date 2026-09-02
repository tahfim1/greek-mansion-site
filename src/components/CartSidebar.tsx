'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/data/menu';

export default function CartSidebar() {
  const { 
    items, 
    isSidebarOpen, 
    closeSidebar, 
    removeItem, 
    updateQuantity, 
    getSubtotal,
    getTax,
    getTotal,
    getItemCount
  } = useCartStore();

  // Handle hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#1E1C59]/40 backdrop-blur-sm z-[100] transition-opacity"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-[110] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#E8DCCB] bg-[#F7F3EA]">
          <h2 className="text-2xl text-[#1E1C59] flex items-center gap-2" style={{ fontFamily: "'Marcellus', serif" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Your Order
          </h2>
          <button 
            onClick={closeSidebar}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1E1C59] hover:bg-[#E8DCCB]/50 transition-colors shadow-sm"
            aria-label="Close cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-[#F7F3EA] rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B18C56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <h3 className="text-xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>Your cart is empty</h3>
              <p className="text-[#11102F]/50 text-sm max-w-[200px]">
                Looks like you haven&apos;t added any items yet.
              </p>
              <button 
                onClick={closeSidebar}
                className="btn-outline !rounded-full mt-4"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-6 border-b border-[#E8DCCB]/60 last:border-0 last:pb-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className="font-bold text-[#1E1C59] truncate pr-2">
                        {item.quantity > 1 && <span className="text-[#B18C56] mr-1">{item.quantity}x</span>}
                        {item.product.name}
                      </h4>
                      <span className="font-bold text-[#1E1C59] whitespace-nowrap">
                        {formatPrice((item.basePrice + item.modifiers.reduce((sum, mod) => sum + mod.priceDelta, 0)) * item.quantity)}
                      </span>
                    </div>
                    
                    {/* Item Details */}
                    <div className="text-xs text-[#11102F]/60 space-y-1 mb-3">
                      {item.variantLabel && (
                        <p><span className="font-medium text-[#11102F]/80">Size/Type:</span> {item.variantLabel}</p>
                      )}
                      {item.modifiers.map((mod, idx) => (
                        <p key={idx}>
                          <span className="font-medium text-[#11102F]/80">{mod.group}:</span> {mod.option}
                          {mod.priceDelta > 0 && ` (+${formatPrice(mod.priceDelta)})`}
                        </p>
                      ))}
                      {item.specialInstructions && (
                        <p className="italic bg-[#F7F3EA] p-1.5 rounded mt-1">"{item.specialInstructions}"</p>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-[#E8DCCB] rounded-lg bg-white overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#1E1C59] hover:bg-[#F7F3EA] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-[#1E1C59]">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#1E1C59] hover:bg-[#F7F3EA] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-red-500 font-semibold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout Button */}
        {items.length > 0 && (
          <div className="border-t border-[#E8DCCB] bg-[#F7F3EA] p-4 sm:p-6">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#11102F]/60">Subtotal</span>
                <span className="font-medium text-[#1E1C59]">{formatPrice(getSubtotal())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#11102F]/60">Tax (13% HST)</span>
                <span className="font-medium text-[#1E1C59]">{formatPrice(getTax())}</span>
              </div>
              <div className="h-px bg-[#B18C56]/20 my-2" />
              <div className="flex justify-between items-end">
                <span className="font-bold text-[#1E1C59]">Total</span>
                <span className="text-2xl font-bold text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>
                  {formatPrice(getTotal())}
                </span>
              </div>
            </div>
            
            <Link 
              href="/checkout" 
              onClick={closeSidebar}
              className="w-full btn-primary !justify-center py-4 text-base shadow-lg shadow-indigo-900/10"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
