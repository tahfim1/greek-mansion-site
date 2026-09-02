'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BUSINESS, NAV_LINKS } from '@/lib/constants';
import { useCartStore } from '@/store/cartStore';
import CartSidebar from './CartSidebar';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { getItemCount, toggleSidebar } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#1E1C59]/98 backdrop-blur-md shadow-lg py-2'
            : 'bg-[#1E1C59] py-3'
        }`}
      >
        <div className="container-custom mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Greek Mansion Restaurant — Home">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <Image
                src="/images/logo/logo-icon.png"
                alt=""
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-base sm:text-lg leading-tight tracking-wide" style={{ fontFamily: "'Marcellus', serif" }}>
                {BUSINESS.shortName}
              </span>
              <span className="text-[#B18C56] text-[10px] sm:text-xs font-medium tracking-widest uppercase">
                Restaurant
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-semibold tracking-wide transition-colors relative group ${
                  pathname === link.href
                    ? 'text-[#B18C56]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#B18C56] transition-all duration-300 ${
                    pathname === link.href ? 'w-6' : 'w-0 group-hover:w-6'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a href={BUSINESS.phoneTel} className="text-white font-bold text-sm hover:text-[#B18C56] transition-colors">
              {BUSINESS.phone}
            </a>
            
            {/* Cart Button */}
            <button 
              onClick={toggleSidebar}
              className="relative p-2 text-white hover:text-[#B18C56] transition-colors"
              aria-label="View Cart"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {mounted && getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B18C56] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {getItemCount()}
                </span>
              )}
            </button>

            <Link
              href="/menu"
              className="ml-3 btn-gold !py-2.5 !px-6 !text-sm !rounded-full"
            >
              Order Online
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Mobile Cart Button */}
            <button 
              onClick={toggleSidebar}
              className="relative p-2 text-white"
              aria-label="View Cart"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {mounted && getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B18C56] text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-[#1E1C59]">
                  {getItemCount()}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white"
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full bg-[#1E1C59] border-t border-white/10 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg font-semibold py-2 border-b border-white/10 ${
                  pathname === link.href ? 'text-[#B18C56]' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 pb-4 flex flex-col gap-4">
              <a href={BUSINESS.phoneTel} className="text-white font-bold flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B18C56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                {BUSINESS.phone}
              </a>
              <Link href="/menu" className="btn-gold !w-full !justify-center">
                Order Online
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Global Cart Sidebar */}
      <CartSidebar />
    </>
  );
}
