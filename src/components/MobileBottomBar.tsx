'use client';

import Link from 'next/link';
import { Truck } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export default function MobileBottomBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-stretch border-t border-[#F3BA2F]/30 bg-transparent">
        {/* Call */}
        <a
          href={BUSINESS.phoneTel}
          className="flex-1 flex flex-col items-center justify-center pt-2.5 pb-4 bg-[#1E1C59]/98 backdrop-blur-md text-white/80 hover:text-[#F3BA2F] transition-colors active:bg-white/5"
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
          className="flex-1 flex flex-col items-center justify-center pt-2.5 pb-4 bg-[#1E1C59]/98 backdrop-blur-md text-white/80 hover:text-[#F3BA2F] transition-colors active:bg-white/5"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="text-[10px] font-semibold mt-0.5">Menu</span>
        </Link>
        {/* Uber Eats */}
        <a
          href="https://www.ubereats.com/ca/store/greek-mansion/2jMowxE1Ts6w_sOBYT_BQA?utm=greekfooddelivery.ca"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center pt-2.5 pb-4 bg-[#06C167] text-white hover:bg-[#05a357] transition-colors active:bg-[#05a357]"
        >
          <Truck size={20} strokeWidth={2} />
          <span className="text-[10px] font-bold mt-0.5">Uber Eats</span>
        </a>
    </div>
  );
}
