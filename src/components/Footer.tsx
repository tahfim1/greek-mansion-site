import Link from 'next/link';
import Image from 'next/image';
import { BUSINESS, NAV_LINKS } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1E1C59] text-white pb-24 lg:pb-0">
      {/* Gold meander line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#B18C56] to-transparent opacity-60" />
      
      <div className="container-custom mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left lg:pr-12">
            <Link href="/" className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo/logo-icon.png"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-white font-bold text-lg" style={{ fontFamily: "'Marcellus', serif" }}>
                  {BUSINESS.shortName}
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              {BUSINESS.tagline}. Fresh Greek favourites for dine-in, takeout, and catering at {BUSINESS.address.shortLocation}.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2 text-sm">
              {BUSINESS.services.map((service, i) => (
                <span key={service} className="flex items-center gap-2">
                  <span className="text-[#B18C56] font-semibold">{service}</span>
                  {i < BUSINESS.services.length - 1 && (
                    <span className="text-white/30">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center lg:text-left">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4" style={{ fontFamily: "'Manrope', sans-serif", color: '#ffffff' }}>
              Quick Links
            </h3>
            <nav aria-label="Footer navigation" className="flex flex-col items-center lg:items-start gap-2.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/70 hover:text-white text-sm transition-colors hover:translate-x-1 inline-flex"
                  style={{ transition: 'color 0.2s, transform 0.2s' }}
                >
                  {link.label}
                </Link>
              ))}

            </nav>
          </div>

          {/* Contact */}
          <div className="text-center lg:text-left">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4" style={{ fontFamily: "'Manrope', sans-serif", color: '#ffffff' }}>
              Visit Us
            </h3>
            <div className="flex flex-col items-center lg:items-start gap-3 text-sm">
              <address className="not-italic text-white/70 leading-relaxed">
                {BUSINESS.address.street}<br />
                {BUSINESS.address.city}, {BUSINESS.address.province} {BUSINESS.address.postalCode}
              </address>
              <a
                href={BUSINESS.phoneTel}
                className="text-white hover:text-[#B18C56] font-semibold transition-colors inline-flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                {BUSINESS.phone}
              </a>
              <a
                href={BUSINESS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#B18C56] transition-colors inline-flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Get Directions
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs text-center">
            © {currentYear} {BUSINESS.name}. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-white/40">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
