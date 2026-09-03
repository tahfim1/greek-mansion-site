"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Landmark, Briefcase, PartyPopper, Users, ArrowRight, MapPin, Phone } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { getFeaturedProducts, formatPrice } from '@/data/menu';
import { 
  heroFadeInUp, 
  staggerHero, 
  fadeInUpSlow, 
  fadeInScale, 
  slideInRightSlow, 
  slideInLeftSlow, 
  staggerContainerSlow 
} from '@/lib/animations';

import FeaturedCategoriesScroll from '@/components/home/FeaturedCategoriesScroll';
import { getPublicSettings } from '@/app/actions';
import { useState, useEffect } from 'react';

const DEFAULT_GALLERY = [
  { src: '/images/food/gyro-wrap.jpg', alt: 'Gyro pita wrap with tzatziki', variant: slideInLeftSlow },
  { src: '/images/food/chicken-dinner.jpg', alt: 'Chicken souvlaki dinner plate', variant: fadeInScale },
  { src: '/images/food/grilled-calamari.jpg', alt: 'Grilled calamari appetizer', variant: slideInRightSlow },
  { src: '/images/food/spanakopita.jpg', alt: 'Spanakopita — spinach and cheese pastry', variant: slideInLeftSlow },
  { src: '/images/food/lamb-plate.jpg', alt: 'Lamb souvlaki dinner plate', variant: fadeInScale },
  { src: '/images/food/fish-and-chips.jpg', alt: 'Fish and chips with haddock', variant: slideInRightSlow },
];

export default function HomePage() {
  const [gallery, setGallery] = useState<any[]>(DEFAULT_GALLERY);

  useEffect(() => {
    async function loadSettings() {
      const settings = await getPublicSettings();
      if (settings.HOMEPAGE_GALLERY) {
        try {
          const parsed = JSON.parse(settings.HOMEPAGE_GALLERY);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Map parsed images and cycle through animation variants
            const variants = [slideInLeftSlow, fadeInScale, slideInRightSlow];
            setGallery(parsed.map((img: any, i: number) => ({
              src: img.src,
              alt: img.alt || 'Gallery image',
              variant: variants[i % variants.length]
            })));
          }
        } catch (e) {
          console.error("Failed to parse HOMEPAGE_GALLERY", e);
        }
      }
    }
    loadSettings();
  }, []);

  return (
    <>
      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/food/home-hero.jpg"
            alt="Greek Mansion Restaurant — Authentic Greek cuisine spread with gyro, souvlaki, salads, and pita"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E1C59]/80 via-[#1E1C59]/60 to-[#1E1C59]/90" />
        </div>

        {/* Content */}
        <motion.div 
          className="relative z-30 container-custom mx-auto px-4 sm:px-6 text-center py-32 lg:py-40"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={staggerHero}
        >
          {/* Eyebrow */}
          <motion.p variants={heroFadeInUp} className="text-[#B18C56] text-base sm:text-lg lg:text-xl font-bold tracking-[0.25em] uppercase mb-6">
            {BUSINESS.tagline}
          </motion.p>
          
          {/* Main Heading */}
          <motion.h1 variants={heroFadeInUp} className="text-white text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-normal leading-tight mb-8" style={{ fontFamily: "'BlessedDay', cursive", color: '#ffffff', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
            Discover Our Flavours
          </motion.h1>

          {/* Supporting line */}
          <motion.p variants={heroFadeInUp} className="text-white/90 text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Fresh Greek favourites for dine-in, takeout, and catering at {BUSINESS.address.shortLocation}.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={heroFadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <Link href="/menu" className="btn-gold !rounded-full !px-10 !py-4 !text-lg shadow-xl shadow-black/20 font-semibold tracking-wide">
              View Our Menu
            </Link>
          </motion.div>

          {/* Phone link */}
          <motion.a
            variants={heroFadeInUp}
            href={BUSINESS.phoneTel}
            className="inline-flex items-center gap-2.5 text-white/80 hover:text-[#B18C56] transition-colors text-base sm:text-lg font-medium"
          >
            <Phone size={20} />
            Call {BUSINESS.phone}
          </motion.a>
        </motion.div>
      </section>

      {/* ── Quick Service Choices ──────────────────────────── */}
      <section className="section-padding !pt-32 lg:!pt-48 relative z-20 -mt-24" id="services">
        {/* Fading background at the start of the 2nd section that crossfades over the hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white -z-10 pointer-events-none" />
        <div className="absolute inset-0 texture-white -z-10 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%)' }} />
        
        <div className="container-custom mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 text-center md:text-left">
            <motion.div variants={fadeInUpSlow} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-50px" }} className="max-w-2xl mb-6 md:mb-0 flex flex-col items-center md:items-start">
              <p className="text-[#B18C56] text-sm font-semibold tracking-[0.15em] uppercase mb-3">How We Serve You</p>
              <h2 className="text-4xl sm:text-5xl text-[#1E1C59] leading-tight" style={{ fontFamily: "'Marcellus', serif" }}>
                Three Ways to Enjoy <br className="hidden sm:block"/> Greek Mansion
              </h2>
              <div className="gold-line mt-6" />
            </motion.div>
            <motion.div variants={fadeInUpSlow} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-50px" }} className="hidden md:block">
              <Link href="/menu" className="btn-outline !rounded-full">
                Explore The Menu
              </Link>
            </motion.div>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
            variants={staggerContainerSlow}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              {
                image: '/images/food/hero-hq.jpg',
                title: 'Dine-In',
                desc: 'Enjoy our warm, welcoming atmosphere with friends and family.',
                cta: { label: 'Get Directions', href: BUSINESS.googleMapsUrl, external: true },
                variant: slideInLeftSlow,
              },
              {
                image: '/images/food/gyro-wrap.jpg',
                title: 'Takeout',
                desc: 'Pick up your favourites — hot and ready.',
                cta: { label: 'View Menu', href: '/menu', external: false },
                variant: fadeInUpSlow,
              },
              {
                image: '/images/food/family-meal.jpg',
                title: 'Catering',
                desc: 'Group meals, office lunches, and celebrations — made easy.',
                cta: { label: 'Plan Your Catering', href: '/catering', external: false },
                variant: slideInRightSlow,
              },
            ].map((service) => (
              <motion.div
                variants={service.variant}
                key={service.title}
                className="flex flex-col group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl bg-white border border-[#E8DCCB]/60 card-hover"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden img-zoom">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                
                {/* Content Box */}
                <div className="p-8 flex flex-col flex-1 text-center bg-white">
                  <h3 className="text-2xl text-[#1E1C59] mb-3" style={{ fontFamily: "'Marcellus', serif" }}>
                    {service.title}
                  </h3>
                  <p className="text-[#11102F]/60 text-sm leading-relaxed mb-6 flex-1">
                    {service.desc}
                  </p>
                  <div className="mt-auto">
                    {service.cta.external ? (
                      <a
                        href={service.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#B18C56] font-bold text-sm hover:text-[#8F7045] transition-colors inline-flex items-center gap-1 uppercase tracking-wider"
                      >
                        {service.cta.label} <ArrowRight size={18} />
                      </a>
                    ) : (
                      <Link
                        href={service.cta.href}
                        className="text-[#B18C56] font-bold text-sm hover:text-[#8F7045] transition-colors inline-flex items-center gap-1 uppercase tracking-wider"
                      >
                        {service.cta.label} <ArrowRight size={18} />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="md:hidden text-center mt-8">
            <Link href="/menu" className="btn-outline !rounded-full w-full justify-center">
              Explore The Menu
            </Link>
          </div>
        </div>
      </section>

      {/* ── Dynamic Featured Categories Scroll ─────────────── */}
      <FeaturedCategoriesScroll />

      {/* ── Brand Experience Section ──────────────────────── */}
      <section className="section-padding bg-[#1E1C59] relative overflow-hidden texture-indigo">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, #B18C56 0px, #B18C56 1px, transparent 1px, transparent 20px)`,
          }} />
        </div>
        
        <div className="container-custom mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16 items-center">
            {/* Image */}
            <motion.div 
              className="relative max-w-sm mx-auto lg:max-w-none w-full"
              variants={slideInLeftSlow}
              initial="initial"
              whileInView="whileInView"
            >
              <div className="relative w-full aspect-[3/4] rounded-t-[100px] rounded-b-2xl overflow-hidden">
                <Image
                  src="/images/food/greek-salad.jpg"
                  alt="Fresh Greek salad with feta, olives, tomatoes, and cucumbers"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Gold border accent */}
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-t-[100px] rounded-b-2xl border-2 border-[#B18C56]/30 -z-10" />
            </motion.div>

            {/* Text */}
            <motion.div 
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainerSlow}
            >
              <motion.p variants={slideInRightSlow} className="text-[#B18C56] text-base sm:text-lg font-bold tracking-[0.15em] uppercase mb-4">
                Our Story
              </motion.p>
              <motion.h2 variants={slideInRightSlow} className="text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6" style={{ fontFamily: "'Marcellus', serif", color: '#ffffff' }}>
                A Taste of Greece, Right Here in Scarborough
              </motion.h2>
              <motion.div variants={slideInRightSlow} className="gold-line mb-6" />
              <motion.p variants={slideInRightSlow} className="text-white/70 leading-relaxed mb-4">
                At Greek Mansion, we bring the bold, fresh flavours of Mediterranean cuisine to your table. Every dish is prepared with care — from our signature souvlaki cooked over an open flame to our creamy tzatziki made in-house.
              </motion.p>
              <motion.p variants={slideInRightSlow} className="text-white/70 leading-relaxed mb-8">
                Whether you&apos;re stopping by for a quick lunch box, gathering the family for a feast, or planning catering for your next event, we&apos;re here to make it memorable.
              </motion.p>
              <motion.div variants={slideInRightSlow} className="flex flex-wrap gap-4">
                <Link href="/about" className="btn-gold !rounded-full">
                  Learn More
                </Link>
                <Link href="/menu" className="btn-outline-white !rounded-full">
                  View Menu
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 💼 Catering Preview ================================================= */}
      <section className="pt-20 pb-8 lg:pt-24 lg:pb-12 bg-white relative overflow-hidden texture-white">
        {/* Decorative Background Map / Meander */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'repeating-linear-gradient(45deg, #1E1C59 0px, #1E1C59 2px, transparent 2px, transparent 12px)' }}>
        </div>

        <div className="container-custom mx-auto relative z-10 px-4 sm:px-6">
          <div className="relative flex flex-col lg:flex-row items-center gap-12">
            
            {/* Content (Left) */}
            <motion.div 
              className="flex-1 w-full relative z-10 lg:pr-8 text-center lg:text-left flex flex-col items-center lg:items-start"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainerSlow}
            >
              <motion.p variants={fadeInUpSlow} className="text-[#B18C56] text-sm sm:text-base font-bold tracking-[0.2em] uppercase mb-4">
                Greek Mansion Catering
              </motion.p>
              <motion.h2 variants={fadeInUpSlow} className="text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>
                Feed Your Crowd <br className="hidden lg:block"/>With Authentic Flavours
              </motion.h2>
              <motion.div variants={fadeInUpSlow} className="gold-line mx-auto lg:mx-0 mb-8" />
              <motion.p variants={fadeInUpSlow} className="text-[#11102F]/80 text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                From office lunches to family celebrations, our catering packages bring authentic Greek flavours to your table. Each package includes souvlaki, rice, potatoes, Greek salad, tzatziki, and pita.
              </motion.p>
              
              {/* 2x2 Grid for features */}
              <motion.div variants={fadeInUpSlow} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 w-full max-w-xl mx-auto lg:mx-0">
                {[
                  { icon: <Briefcase color="#B18C56" size={24} />, title: 'Corporate Lunches' },
                  { icon: <PartyPopper color="#B18C56" size={24} />, title: 'Family Celebrations' },
                  { icon: <Landmark color="#B18C56" size={24} />, title: 'Community Events' },
                  { icon: <Users color="#B18C56" size={24} />, title: 'Team Gatherings' }
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-4 bg-[#F7F3EA] p-4 rounded-2xl border border-[#E8DCCB] hover:border-[#B18C56]/50 hover:bg-[#E8DCCB] transition-all card-hover">
                    <div className="w-12 h-12 rounded-full bg-[#1E1C59]/5 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-[#1E1C59] font-semibold text-sm">{item.title}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeInUpSlow} className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link href="/catering" className="btn-gold !rounded-full">
                  Plan Your Catering
                </Link>
                <a href={BUSINESS.phoneTel} className="btn-outline !rounded-full">
                  Call to Discuss
                </a>
              </motion.div>
            </motion.div>

            {/* Image (Right) - Breakout Design */}
            <motion.div 
              className="lg:w-[45%] w-full relative z-10 lg:-mr-24 lg:-my-8"
              variants={fadeInScale}
              initial="initial"
              whileInView="whileInView"
            >
              <div className="relative aspect-square lg:aspect-[4/5] rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-[#1E1C59] transition-transform duration-500 bg-[#E8DCCB]">
                <Image
                  src="/images/food/family-meal.jpg"
                  alt="Greek Mansion family meal spread for catering"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                {/* Glassmorphic Price Badge overlay */}
                <motion.div 
                  className="absolute bottom-6 left-6 right-6 sm:right-auto bg-[#11102F]/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-2xl flex items-center gap-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="w-14 h-14 bg-[#B18C56] rounded-full flex items-center justify-center text-white shrink-0 shadow-lg">
                    <Landmark size={24} />
                  </div>
                  <div>
                    <p className="text-[#B18C56] text-xs font-bold uppercase tracking-widest mb-1">Packages From</p>
                    <p className="text-3xl font-bold text-white leading-none" style={{ fontFamily: "'Marcellus', serif", color: '#ffffff' }}>$129.95</p>
                    <p className="text-white/50 text-xs mt-1">Feeds up to 10 people</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Food Gallery Mosaic ────────────────────────────── */}
      <section className="section-padding bg-white relative texture-white">
        <div className="container-custom mx-auto relative z-10">
          <motion.div variants={fadeInUpSlow} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-50px" }} className="text-center mb-12">
            <p className="text-[#B18C56] text-sm font-semibold tracking-[0.15em] uppercase mb-3">Gallery</p>
            <h2 className="text-3xl sm:text-4xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>
              Made Fresh, Served with Love
            </h2>
            <div className="gold-line-center mt-4" />
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4"
            variants={staggerContainerSlow}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
          >
            {gallery.map((img, i) => (
              <motion.div 
                variants={img.variant}
                key={i} 
                className="relative overflow-hidden rounded-xl img-zoom aspect-square shadow-sm"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Location & Visit ──────────────────────────────── */}
      <section className="section-padding bg-[#F7F3EA] relative texture-ivory" id="location">
        <div className="container-custom mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Map Area */}
            <motion.div 
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8DCCB] border-2 border-[#E8DCCB]"
              variants={slideInLeftSlow}
              initial="initial"
              whileInView="whileInView"
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

            {/* Info */}
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainerSlow}
            >
              <motion.p variants={slideInRightSlow} className="text-[#B18C56] text-sm font-semibold tracking-[0.15em] uppercase mb-3">
                Find Us
              </motion.p>
              <motion.h2 variants={slideInRightSlow} className="text-3xl sm:text-4xl text-[#1E1C59] leading-tight mb-6" style={{ fontFamily: "'Marcellus', serif" }}>
                Visit Greek Mansion
              </motion.h2>
              <motion.div variants={slideInRightSlow} className="gold-line mb-8" />

              <div className="space-y-5">
                <motion.div variants={slideInRightSlow} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1E1C59]/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={20} color="#B18C56" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1E1C59]">{BUSINESS.name}</p>
                    <address className="not-italic text-[#11102F]/60 text-sm leading-relaxed">
                      {BUSINESS.address.full}
                    </address>
                  </div>
                </motion.div>

                <motion.div variants={slideInRightSlow} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1E1C59]/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone size={20} color="#B18C56" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1E1C59]">Call Us</p>
                    <a href={BUSINESS.phoneTel} className="text-[#B18C56] font-semibold hover:text-[#8F7045] transition-colors">
                      {BUSINESS.phone}
                    </a>
                  </div>
                </motion.div>
              </div>

              <motion.div variants={slideInRightSlow} className="flex flex-wrap gap-4 mt-8">
                <a
                  href={BUSINESS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !rounded-full"
                >
                  <MapPin size={16} />
                  Get Directions
                </a>
                <a href={BUSINESS.phoneTel} className="btn-outline !rounded-full flex items-center gap-2">
                  <Phone size={16} />
                  Call Now
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────── */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/food/hero.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#1E1C59]/85" />
        </div>
        <motion.div 
          className="relative z-10 container-custom mx-auto px-4 sm:px-6 text-center"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={staggerHero}
        >
          <motion.h2 variants={fadeInScale} className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4" style={{ fontFamily: "'Marcellus', serif", color: '#ffffff' }}>
            Ready for a Taste of Greece?
          </motion.h2>
          <motion.p variants={fadeInScale} className="text-white/70 max-w-lg mx-auto mb-8">
            Explore our full menu, or plan your next event with our catering packages.
          </motion.p>
          <motion.div variants={fadeInScale} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/menu" className="btn-gold !rounded-full !px-8 !py-3.5">
              View Menu
            </Link>
            <Link href="/catering" className="btn-outline-white !rounded-full !px-8 !py-3.5">
              Plan Catering
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
