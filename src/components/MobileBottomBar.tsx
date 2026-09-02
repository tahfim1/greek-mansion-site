'use client';

import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';

export default function MobileBottomBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1E1C59]/98 backdrop-blur-md border-t border-[#B18C56]/30 safe-area-bottom">
      <div className="flex items-stretch">
        {/* Call */}
        <a
          href={BUSINESS.phoneTel}
          className="flex-1 flex flex-col items-center justify-center py-2.5 text-white/80 hover:text-[#B18C56] transition-colors active:bg-white/5"
          aria-label="Call Greek Mansion"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
          </svg>
          <span className="text-[10px] font-semibold mt-0.5">Call</span>
        </a>

        {/* Menu */}
        <Link
          href="/menu"
          className="flex-1 flex flex-col items-center justify-center py-2.5 text-white/80 hover:text-[#B18C56] transition-colors active:bg-white/5"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="text-[10px] font-semibold mt-0.5">Menu</span>
        </Link>

        {/* Order - Prominent */}
        <Link
          href="/menu"
          className="flex-1 flex flex-col items-center justify-center py-2.5 bg-[#B18C56] text-white hover:bg-[#8F7045] transition-colors active:bg-[#8F7045]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
          </svg>
          <span className="text-[10px] font-bold mt-0.5">Order</span>
        </Link>
      </div>
    </div>
  );
}
