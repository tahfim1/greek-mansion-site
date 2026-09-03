'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BUSINESS } from '@/lib/constants';
import { 
  heroFadeInUp, 
  staggerHero, 
  fadeInUpSlow, 
  slideInRightSlow, 
  slideInLeftSlow, 
  staggerContainerSlow 
} from '@/lib/animations';

export default function ContactClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-16 bg-[#1E1C59] overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image src="/images/food/hero.jpg" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <motion.div 
          className="relative z-10 container-custom mx-auto px-4 sm:px-6 text-center py-12"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={staggerHero}
        >
          <motion.p variants={heroFadeInUp} className="text-[#B18C56] text-sm font-semibold tracking-[0.15em] uppercase mb-3">Get In Touch</motion.p>
          <motion.h1 variants={heroFadeInUp} className="text-4xl sm:text-5xl text-white mb-4" style={{ fontFamily: "'Marcellus', serif", color: '#ffffff' }}>
            Contact Us
          </motion.h1>
          <motion.p variants={heroFadeInUp} className="text-white/60 max-w-lg mx-auto text-sm">
            We&apos;d love to hear from you. Stop by, call us, or send us a message.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Info + Map */}
      <section className="section-padding bg-[#F7F3EA] overflow-hidden">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Info */}
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainerSlow}
            >
              <motion.h2 variants={slideInRightSlow} className="text-3xl text-[#1E1C59] mb-6" style={{ fontFamily: "'Marcellus', serif" }}>
                {BUSINESS.name}
              </motion.h2>
              <motion.div variants={slideInRightSlow} className="gold-line mb-8" />

              <div className="space-y-6">
                {/* Address */}
                <motion.div variants={slideInRightSlow} className="flex items-start gap-4">
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
                </motion.div>

                {/* Phone */}
                <motion.div variants={slideInRightSlow} className="flex items-start gap-4">
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
                </motion.div>

                {/* Services */}
                <motion.div variants={slideInRightSlow} className="flex items-start gap-4">
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
                </motion.div>


              </div>

              {/* Action buttons */}
              <motion.div variants={slideInRightSlow} className="flex flex-wrap gap-4 mt-8">
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
              </motion.div>
            </motion.div>

            {/* Map Area */}
            <motion.div 
              className="relative aspect-square lg:aspect-auto lg:min-h-[500px] rounded-2xl overflow-hidden bg-[#E8DCCB] border-2 border-[#E8DCCB] shadow-xl"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              variants={slideInLeftSlow}
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Catering CTA */}
      <section className="section-padding bg-white overflow-hidden">
        <motion.div 
          className="container-custom mx-auto text-center"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainerSlow}
        >
          <motion.p variants={fadeInUpSlow} className="text-[#B18C56] text-sm font-semibold tracking-[0.15em] uppercase mb-3">Planning an Event?</motion.p>
          <motion.h2 variants={fadeInUpSlow} className="text-3xl sm:text-4xl text-[#1E1C59] mb-4" style={{ fontFamily: "'Marcellus', serif" }}>
            Let Us Cater for You
          </motion.h2>
          <motion.p variants={fadeInUpSlow} className="text-[#11102F]/60 max-w-lg mx-auto mb-8 text-sm">
            From office lunches to celebrations — packages for groups of any size starting at $129.95.
          </motion.p>
          <motion.div variants={fadeInUpSlow} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/catering" className="btn-primary !rounded-full !px-8">Plan Your Catering</Link>
            <a href={BUSINESS.phoneTel} className="btn-outline !rounded-full !px-8">Call to Discuss</a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
