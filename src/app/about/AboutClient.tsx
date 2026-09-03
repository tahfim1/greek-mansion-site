'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BUSINESS } from '@/lib/constants';
import { 
  heroFadeInUp, 
  staggerHero, 
  fadeInUpSlow, 
  fadeInScale, 
  slideInRightSlow, 
  slideInLeftSlow, 
  staggerContainerSlow 
} from '@/lib/animations';

export default function AboutClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-16 bg-[#1E1C59] texture-indigo">
        <div className="absolute inset-0 opacity-15">
          <Image src="/images/food/hero-hq.jpg" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <motion.div 
          className="relative z-10 container-custom mx-auto px-4 sm:px-6 text-center py-12"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={staggerHero}
        >
          <motion.p variants={heroFadeInUp} className="text-[#B18C56] text-sm font-semibold tracking-[0.15em] uppercase mb-3">Our Story</motion.p>
          <motion.h1 variants={heroFadeInUp} className="text-4xl sm:text-5xl text-white mb-4" style={{ fontFamily: "'Marcellus', serif", color: '#ffffff' }}>
            About Greek Mansion
          </motion.h1>
          <motion.p variants={heroFadeInUp} className="text-white/60 max-w-lg mx-auto text-sm">
            {BUSINESS.tagline}
          </motion.p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="section-padding bg-[#F7F3EA] texture-ivory overflow-hidden">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              className="relative"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              variants={slideInLeftSlow}
            >
              <div className="relative aspect-[4/5] rounded-t-[100px] rounded-b-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/food/steak-dinner.jpg"
                  alt="Steak dinner plate with Greek salad, rice, and potatoes"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-t-[100px] rounded-b-2xl border-2 border-[#B18C56]/20 -z-10" />
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainerSlow}
            >
              <motion.div variants={slideInRightSlow} className="gold-line mb-6" />
              <motion.h2 variants={slideInRightSlow} className="text-3xl sm:text-4xl text-[#1E1C59] leading-tight mb-6" style={{ fontFamily: "'Marcellus', serif" }}>
                Bold Flavours, Honest Food
              </motion.h2>
              <motion.p variants={slideInRightSlow} className="text-[#11102F]/70 leading-relaxed mb-4">
                Greek Mansion brings the bold, generous flavours of Greek cuisine to Scarborough. Located at Steeles and Middlefield, we prepare everything with care — from our souvlaki skewered and cooked over an open flame, to our creamy tzatziki made fresh in-house.
              </motion.p>
              <motion.p variants={slideInRightSlow} className="text-[#11102F]/70 leading-relaxed mb-4">
                Our menu features a wide range of authentic dishes: dinner plates, pita wraps, fresh salads, sandwiches, and our popular family specials. We also offer catering packages for groups of any size, perfect for office lunches, celebrations, and community events.
              </motion.p>
              <motion.p variants={slideInRightSlow} className="text-[#11102F]/70 leading-relaxed mb-8">
                Whether you&apos;re dining in, picking up a quick lunch box, or feeding a crowd, Greek Mansion is here to make every meal memorable.
              </motion.p>

              <motion.div variants={slideInRightSlow} className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Dine-In', icon: '🍽️' },
                  { label: 'Takeout', icon: '📦' },
                  { label: 'Catering', icon: '👨‍👩‍👧‍👦' },
                ].map((s) => (
                  <div key={s.label} className="text-center bg-white rounded-xl p-4 border border-[#E8DCCB]/60 shadow-sm transition-transform hover:-translate-y-1">
                    <span className="text-2xl mb-2 block">{s.icon}</span>
                    <span className="text-[#1E1C59] font-bold text-sm">{s.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Food Gallery Strip */}
      <section className="bg-white py-12 texture-white overflow-hidden">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainerSlow}
          >
            {[
              { src: '/images/food/gyro-plate.jpg', alt: 'Gyro dinner plate' },
              { src: '/images/food/grilled-calamari.jpg', alt: 'Grilled calamari' },
              { src: '/images/food/falafel-plate.jpg', alt: 'Falafel plate' },
              { src: '/images/food/chicken-fillet-wrap.jpg', alt: 'Chicken fillet wrap' },
            ].map((img, i) => (
              <motion.div variants={fadeInScale} key={i} className="relative aspect-square rounded-xl overflow-hidden img-zoom shadow-md">
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[#1E1C59] texture-indigo overflow-hidden">
        <motion.div 
          className="container-custom mx-auto text-center relative z-10"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainerSlow}
        >
          <motion.h2 variants={fadeInUpSlow} className="text-3xl sm:text-4xl text-white mb-4" style={{ fontFamily: "'Marcellus', serif" }}>
            Come Taste the Difference
          </motion.h2>
          <motion.p variants={fadeInUpSlow} className="text-white/60 max-w-lg mx-auto mb-8 text-sm">
            {BUSINESS.address.full}
          </motion.p>
          <motion.div variants={fadeInUpSlow} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/menu" className="btn-gold !rounded-full !px-8">View Our Menu</Link>
            <a href={BUSINESS.phoneTel} className="btn-outline-white !rounded-full !px-8">Call {BUSINESS.phone}</a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
