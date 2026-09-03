'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BUSINESS } from '@/lib/constants';
import { MENU_CATEGORIES, formatPrice } from '@/data/menu';
import CateringForm from './CateringForm';
import { 
  heroFadeInUp, 
  staggerHero, 
  fadeInUpSlow, 
  fadeInScale, 
  slideInRightSlow, 
  slideInLeftSlow, 
  staggerContainerSlow 
} from '@/lib/animations';

export default function CateringClient() {
  const cateringCategory = MENU_CATEGORIES.find(c => c.id === 'catering');
  const pitaPlatterCategory = MENU_CATEGORIES.find(c => c.id === 'pita-platters');

  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-16 bg-[#1E1C59] texture-indigo overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/food/family-meal.jpg" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <motion.div 
          className="relative z-10 container-custom mx-auto px-4 sm:px-6 text-center py-12"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={staggerHero}
        >
          <motion.p variants={heroFadeInUp} className="text-[#B18C56] text-sm font-semibold tracking-[0.15em] uppercase mb-3">Catering</motion.p>
          <motion.h1 variants={heroFadeInUp} className="text-4xl sm:text-5xl text-white mb-4" style={{ fontFamily: "'Marcellus', serif", color: '#ffffff' }}>
            Feed Your Crowd
          </motion.h1>
          <motion.p variants={heroFadeInUp} className="text-white/60 max-w-lg mx-auto text-sm">
            From office lunches to family celebrations — authentic Greek cuisine for groups of any size.
          </motion.p>
        </motion.div>
      </section>

      {/* Catering Packages */}
      <section className="section-padding bg-[#F7F3EA] texture-ivory overflow-hidden">
        <div className="container-custom mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainerSlow}
          >
            <motion.p variants={fadeInUpSlow} className="text-[#B18C56] text-sm font-semibold tracking-[0.15em] uppercase mb-3">Packages</motion.p>
            <motion.h2 variants={fadeInUpSlow} className="text-3xl sm:text-4xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>
              Catering Combos
            </motion.h2>
            <motion.div variants={fadeInUpSlow} className="gold-line-center mt-4" />
            <motion.p variants={fadeInUpSlow} className="text-[#11102F]/60 text-sm mt-4 max-w-2xl mx-auto">
              Each combo includes 2 souvlaki, rice, potatoes, Greek salad, tzatziki and pita per person. Substitutions available upon request — extra charges may apply.
            </motion.p>
          </motion.div>

          {/* Combo cards */}
          {cateringCategory && (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainerSlow}
            >
              {cateringCategory.products.map((pkg) => {
                const people = pkg.name.match(/\d+/)?.[0] || '';
                return (
                  <motion.div variants={fadeInScale} key={pkg.id} className="bg-white rounded-2xl p-6 text-center card-hover border border-[#E8DCCB]/60 shadow-sm hover:shadow-xl transition-all">
                    <div className="w-16 h-16 rounded-full bg-[#1E1C59] flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-xl font-bold">{people}</span>
                    </div>
                    <p className="text-[#11102F]/50 text-sm mb-1">People</p>
                    <p className="text-3xl font-bold text-[#1E1C59] mb-4" style={{ fontFamily: "'Marcellus', serif" }}>
                      {formatPrice(pkg.price)}
                    </p>
                    <p className="text-[#11102F]/50 text-xs leading-relaxed">
                      {pkg.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Pita Platters */}
          {pitaPlatterCategory && (
            <motion.div 
              className="bg-white rounded-2xl p-8 border border-[#E8DCCB]/60 mb-8 shadow-sm"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUpSlow}
            >
              <h3 className="text-xl text-[#1E1C59] mb-2" style={{ fontFamily: "'Marcellus', serif" }}>
                Pita Platters
              </h3>
              <p className="text-[#11102F]/50 text-sm mb-4">{pitaPlatterCategory.description}</p>
              <div className="flex flex-wrap gap-4">
                {pitaPlatterCategory.products.map((pkg) => {
                  const people = pkg.name.match(/\d+/)?.[0] || '';
                  return (
                    <div key={pkg.id} className="bg-[#F7F3EA] rounded-xl px-6 py-4 flex items-center gap-4 transition-transform hover:-translate-y-1">
                      <span className="text-[#1E1C59] font-bold text-lg">{people} people</span>
                      <span className="text-[#B18C56] font-bold text-xl">{formatPrice(pkg.price)}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          <motion.div 
            className="bg-[#1E1C59] rounded-2xl p-6 text-center shadow-lg"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUpSlow}
          >
            <p className="text-white/70 text-sm">
              <strong className="text-[#B18C56]">Note:</strong> All catering is cash or debit only — surcharges may apply otherwise. No limit to number of people — call the store for larger parties.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Occasions */}
      <section className="section-padding bg-white texture-white overflow-hidden">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainerSlow}
            >
              <motion.p variants={slideInRightSlow} className="text-[#B18C56] text-sm font-semibold tracking-[0.15em] uppercase mb-3">Perfect For</motion.p>
              <motion.h2 variants={slideInRightSlow} className="text-3xl sm:text-4xl text-[#1E1C59] leading-tight mb-6" style={{ fontFamily: "'Marcellus', serif" }}>
                Every Occasion
              </motion.h2>
              <motion.div variants={slideInRightSlow} className="gold-line mb-6" />
              <motion.div variants={staggerContainerSlow} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: '🏢', title: 'Office Lunches', desc: 'Keep your team fuelled and happy' },
                  { icon: '🎉', title: 'Celebrations', desc: 'Birthdays, graduations, milestones' },
                  { icon: '👨‍👩‍👧‍👦', title: 'Family Gatherings', desc: 'Bring everyone together over great food' },
                  { icon: '⛪', title: 'Community Events', desc: 'Church groups, clubs, and fundraisers' },
                  { icon: '🏟️', title: 'Game Day', desc: 'Fuel the fans with Greek favourites' },
                  { icon: '🤝', title: 'Corporate Events', desc: 'Impress clients and partners' },
                ].map((item) => (
                  <motion.div variants={fadeInUpSlow} key={item.title} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#F7F3EA] transition-colors">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-bold text-[#1E1C59] text-sm">{item.title}</p>
                      <p className="text-[#11102F]/50 text-xs">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div 
              className="relative aspect-[4/3] rounded-2xl overflow-hidden img-zoom shadow-xl"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              variants={slideInLeftSlow}
            >
              <Image
                src="/images/food/family-meal.jpg"
                alt="Greek Mansion catering spread"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="section-padding bg-[#F7F3EA] texture-ivory overflow-hidden" id="inquiry">
        <motion.div 
          className="container-custom mx-auto max-w-3xl"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainerSlow}
        >
          <motion.div variants={fadeInUpSlow} className="text-center mb-10">
            <p className="text-[#B18C56] text-sm font-semibold tracking-[0.15em] uppercase mb-3">Get Started</p>
            <h2 className="text-3xl sm:text-4xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>
              Catering Inquiry
            </h2>
            <div className="gold-line-center mt-4" />
            <p className="text-[#11102F]/60 text-sm mt-4">
              Fill out the form below and we&apos;ll get back to you, or call us directly at{' '}
              <a href={BUSINESS.phoneTel} className="text-[#B18C56] font-semibold hover:underline">
                {BUSINESS.phone}
              </a>
            </p>
          </motion.div>

          <motion.div variants={fadeInUpSlow}>
            <CateringForm />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
