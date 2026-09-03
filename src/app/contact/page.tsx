import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact Greek Mansion Restaurant at ${BUSINESS.phone}. Located at ${BUSINESS.address.full}. Dine-in, takeout, and catering available.`,
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-16 bg-[#1E1C59]">
        <div className="absolute inset-0 opacity-15">
          <Image src="/images/food/hero.jpg" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative z-10 container-custom mx-auto px-4 sm:px-6 text-center py-12">
          <p className="text-[#B18C56] text-sm font-semibold tracking-[0.15em] uppercase mb-3">Get In Touch</p>
          <h1 className="text-4xl sm:text-5xl text-white mb-4" style={{ fontFamily: "'Marcellus', serif", color: '#ffffff' }}>
            Contact Us
          </h1>
          <p className="text-white/60 max-w-lg mx-auto text-sm">
            We&apos;d love to hear from you. Stop by, call us, or send us a message.
          </p>
        </div>
      </section>

      {/* Contact Info + Map */}
      <section className="section-padding bg-[#F7F3EA]">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Info */}
            <div>
              <h2 className="text-3xl text-[#1E1C59] mb-6" style={{ fontFamily: "'Marcellus', serif" }}>
                {BUSINESS.name}
              </h2>
              <div className="gold-line mb-8" />

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1E1C59]/5 flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B18C56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-[#1E1C59] mb-1">Address</p>
                    <address className="not-italic text-[#11102F]/60 text-sm leading-relaxed">
                      {BUSINESS.address.street}<br />
                      {BUSINESS.address.city}, {BUSINESS.address.province} {BUSINESS.address.postalCode}<br />
                      {BUSINESS.address.country}
                    </address>
                    <a
                      href={BUSINESS.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#B18C56] font-semibold text-sm hover:text-[#8F7045] transition-colors inline-flex items-center gap-1 mt-2"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1E1C59]/5 flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B18C56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-[#1E1C59] mb-1">Phone</p>
                    <a href={BUSINESS.phoneTel} className="text-[#B18C56] font-bold text-xl hover:text-[#8F7045] transition-colors">
                      {BUSINESS.phone}
                    </a>
                  </div>
                </div>

                {/* Services */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1E1C59]/5 flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B18C56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-[#1E1C59] mb-1">Services</p>
                    <div className="flex items-center gap-2 text-sm text-[#11102F]/60">
                      {BUSINESS.services.map((service, i) => (
                        <span key={service} className="flex items-center gap-2">
                          <span>{service}</span>
                          {i < BUSINESS.services.length - 1 && <span className="text-[#B18C56]">•</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>


              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <a href={BUSINESS.phoneTel} className="btn-primary !rounded-full">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  Call Now
                </a>
                <a href={BUSINESS.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline !rounded-full">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Get Directions
                </a>
              </div>
            </div>

            {/* Map Area */}
            <div className="relative aspect-square lg:aspect-auto lg:min-h-[500px] rounded-2xl overflow-hidden bg-[#E8DCCB] border-2 border-[#E8DCCB]">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(BUSINESS.address.full)}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps - Greek Mansion"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Catering CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom mx-auto text-center">
          <p className="text-[#B18C56] text-sm font-semibold tracking-[0.15em] uppercase mb-3">Planning an Event?</p>
          <h2 className="text-3xl sm:text-4xl text-[#1E1C59] mb-4" style={{ fontFamily: "'Marcellus', serif" }}>
            Let Us Cater for You
          </h2>
          <p className="text-[#11102F]/60 max-w-lg mx-auto mb-8 text-sm">
            From office lunches to celebrations — packages for groups of any size starting at $129.95.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/catering" className="btn-primary !rounded-full !px-8">Plan Your Catering</Link>
            <a href={BUSINESS.phoneTel} className="btn-outline !rounded-full !px-8">Call to Discuss</a>
          </div>
        </div>
      </section>
    </>
  );
}
