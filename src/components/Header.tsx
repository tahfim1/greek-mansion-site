'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BUSINESS, NAV_LINKS } from '@/lib/constants';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
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
            ? 'bg-[#1E1C59]/98 backdrop-blur-md shadow-lg py-2.5 lg:py-2'
            : 'bg-[#1E1C59] py-3 lg:py-3'
        }`}
      >
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group py-0.5" aria-label="Greek Mansion Restaurant — Home">
            <div className="relative h-[40px] sm:h-[46px] lg:h-[50px] xl:h-[54px] w-[126px] sm:w-[145px] lg:w-[157px] xl:w-[170px] transition-all duration-300">
              <Image
                src="/images/logo/logo.png"
                alt="Greek Mansion Restaurant"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 xl:px-4 py-2.5 text-base xl:text-[17px] font-bold tracking-wide transition-colors relative group ${
                  pathname === link.href
                    ? 'text-[#B18C56]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full bg-[#B18C56] transition-all duration-300 ${
                    pathname === link.href ? 'opacity-100 scale-100' : 'opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-5">

            <a
              href="https://www.ubereats.com/ca/store/greek-mansion/2jMowxE1Ts6w_sOBYT_BQA?utm=greekfooddelivery.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden ml-2 xl:ml-3 bg-[#06C167] text-white !py-3 xl:!py-3.5 !px-5 xl:!px-7 !text-base xl:!text-[17px] !font-bold !rounded-full shadow-md hover:shadow-lg transition-shadow flex items-center gap-2 group"
            >
              <div className="absolute inset-0 bg-[#04a053] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
              <span className="relative z-10 flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                Uber Eats
              </span>
            </a>
            
            <Link
              href="/menu"
              className="btn-gold !py-3 xl:!py-3.5 !px-5 xl:!px-7 !text-base xl:!text-[17px] !font-bold !rounded-full shadow-md hover:shadow-lg transition-all"
            >
              View Menu
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-white hover:text-[#B18C56] transition-colors rounded-xl bg-white/5 active:bg-white/10"
              aria-label="Toggle menu"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
          className={`lg:hidden absolute top-full left-0 w-full bg-[#1E1C59]/98 backdrop-blur-xl border-t border-white/10 shadow-2xl transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[calc(100dvh-4.5rem)] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden pointer-events-none'
          }`}
        >
          <div className="px-5 sm:px-6 pt-4 pb-8 flex flex-col gap-2.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg sm:text-xl font-bold py-3 border-b border-white/10 tracking-wide transition-colors ${
                  pathname === link.href ? 'text-[#B18C56]' : 'text-white hover:text-[#B18C56]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 pb-2 flex flex-col gap-3.5">
              <a href={BUSINESS.phoneTel} className="text-white font-bold text-base sm:text-lg flex items-center gap-3 py-1 hover:text-[#B18C56] transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B18C56" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span>{BUSINESS.phone}</span>
              </a>
              <Link href="/menu" className="btn-gold !w-full !justify-center !py-3.5 !text-base sm:!text-lg !font-bold !rounded-full shadow-lg">
                View Menu
              </Link>
            </div>
          </div>
        </div>
      </header>


    </>
  );
}
