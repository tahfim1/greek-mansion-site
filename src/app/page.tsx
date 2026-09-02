import Image from 'next/image';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import { getFeaturedProducts, formatPrice, MENU_CATEGORIES } from '@/data/menu';

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 6);

  return (
    <>
      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/food/hero-hq.jpg"
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
        <div className="relative z-10 container-custom mx-auto px-4 sm:px-6 text-center py-32 lg:py-40">
          {/* Eyebrow */}
          <p className="animate-slide-down text-[#B18C56] text-sm sm:text-base font-semibold tracking-[0.2em] uppercase mb-4">
            {BUSINESS.tagline}
          </p>
          
          {/* Main Heading */}
          <h1 className="animate-slide-down animation-delay-100 text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-tight mb-6" style={{ fontFamily: "'Marcellus', serif", color: '#ffffff' }}>
            Discover Our Flavours
          </h1>

          {/* Supporting line */}
          <p className="animate-slide-down animation-delay-200 text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Fresh Greek favourites for dine-in, takeout, and catering at {BUSINESS.address.shortLocation}.
          </p>

          {/* CTAs */}
          <div className="animate-slide-down animation-delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link href="/menu" className="btn-gold !rounded-full !px-8 !py-3.5 !text-base">
              View Our Menu
            </Link>
            <Link href="/menu" className="btn-outline-white !rounded-full !px-8 !py-3.5 !text-base">
              Order Online
            </Link>
          </div>

          {/* Phone link */}
          <a
            href={BUSINESS.phoneTel}
            className="animate-slide-down animation-delay-400 inline-flex items-center gap-2 text-white/70 hover:text-[#B18C56] transition-colors text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            Call {BUSINESS.phone}
          </a>
        </div>
      </section>

      {/* ── Quick Service Choices ──────────────────────────── */}
      <section className="section-padding bg-white" id="services">
        <div className="container-custom mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 text-center md:text-left">
            <div className="animate-slide-down max-w-2xl mb-6 md:mb-0 flex flex-col items-center md:items-start">
              <p className="text-[#B18C56] text-sm font-semibold tracking-[0.15em] uppercase mb-3">How We Serve You</p>
              <h2 className="text-4xl sm:text-5xl text-[#1E1C59] leading-tight" style={{ fontFamily: "'Marcellus', serif" }}>
                Three Ways to Enjoy <br className="hidden sm:block"/> Greek Mansion
              </h2>
              <div className="gold-line mt-6" />
            </div>
            <div className="hidden md:block">
              <Link href="/menu" className="btn-outline !rounded-full">
                Explore The Menu
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                image: '/images/food/hero-hq.jpg',
                title: 'Dine-In',
                desc: 'Enjoy our warm, welcoming atmosphere with friends and family.',
                cta: { label: 'Get Directions', href: BUSINESS.googleMapsUrl, external: true },
              },
              {
                image: '/images/food/gyro-wrap.jpg',
                title: 'Takeout',
                desc: 'Order ahead and pick up your favourites — hot and ready.',
                cta: { label: 'Order Online', href: '/menu', external: false },
              },
              {
                image: '/images/food/family-meal.jpg',
                title: 'Catering',
                desc: 'Group meals, office lunches, and celebrations — made easy.',
                cta: { label: 'Plan Your Catering', href: '/catering', external: false },
              },
            ].map((service, idx) => (
              <div
                key={service.title}
                className={`animate-slide-down flex flex-col group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl bg-white border border-[#E8DCCB]/60 card-hover animation-delay-${(idx + 1) * 100}`}
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
                        {service.cta.label} <span className="text-lg">→</span>
                      </a>
                    ) : (
                      <Link
                        href={service.cta.href}
                        className="text-[#B18C56] font-bold text-sm hover:text-[#8F7045] transition-colors inline-flex items-center gap-1 uppercase tracking-wider"
                      >
                        {service.cta.label} <span className="text-lg">→</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="md:hidden text-center mt-8">
            <Link href="/menu" className="btn-outline !rounded-full w-full justify-center">
              Explore The Menu
            </Link>
          </div>
        </div>
      </section>

      {/* ── Signature Menu Highlights ─────────────────────── */}
      <section className="section-padding bg-[#F7F3EA]" id="highlights">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12 animate-slide-down">
            <p className="text-[#B18C56] text-sm font-semibold tracking-[0.15em] uppercase mb-3">From Our Kitchen</p>
            <h2 className="text-3xl sm:text-4xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>
              Signature Dishes
            </h2>
            <div className="gold-line-center mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featured.map((item) => (
              <Link href="/menu" key={item.id} className="group">
                <div className="bg-[#F7F3EA] rounded-2xl overflow-hidden card-hover border border-[#E8DCCB]/40">
                  {item.image ? (
                    <div className="relative aspect-[4/3] img-zoom">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-[#E8DCCB] flex items-center justify-center">
                      <span className="text-[#B18C56]/50 text-4xl" style={{ fontFamily: "'Marcellus', serif" }}>GM</span>
                    </div>
                  )}
                  <div className="p-5">
                    <p className="text-[#B18C56] text-xs font-semibold tracking-wider uppercase mb-1">
                      {item.categoryName}
                    </p>
                    <h3 className="text-lg text-[#1E1C59] mb-1" style={{ fontFamily: "'Marcellus', serif" }}>
                      {item.name}
                    </h3>
                    <p className="text-[#11102F]/50 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#1E1C59] font-bold">
                        {item.variants && item.variants.length > 0
                          ? `From ${formatPrice(item.variants[0].price)}`
                          : formatPrice(item.price)}
                      </span>
                      <span className="text-[#B18C56] text-sm font-semibold group-hover:translate-x-1 transition-transform">
                        View →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/menu" className="btn-primary !rounded-full !px-10">
              Explore Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* ── Brand Experience Section ──────────────────────── */}
      <section className="section-padding bg-[#1E1C59] relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, #B18C56 0px, #B18C56 1px, transparent 1px, transparent 20px)`,
          }} />
        </div>
        
        <div className="container-custom mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="animate-slide-down relative max-w-sm mx-auto lg:max-w-none w-full">
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
            </div>

            {/* Text */}
            <div className="animate-slide-down animation-delay-200">
              <p className="text-[#B18C56] text-base sm:text-lg font-bold tracking-[0.15em] uppercase mb-4">
                Our Story
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6" style={{ fontFamily: "'Marcellus', serif", color: '#ffffff' }}>
                A Taste of Greece, Right Here in Scarborough
              </h2>
              <div className="gold-line mb-6" />
              <p className="text-white/70 leading-relaxed mb-4">
                At Greek Mansion, we bring the bold, fresh flavours of Mediterranean cuisine to your table. Every dish is prepared with care — from our signature souvlaki cooked over an open flame to our creamy tzatziki made in-house.
              </p>
              <p className="text-white/70 leading-relaxed mb-8">
                Whether you&apos;re stopping by for a quick lunch box, gathering the family for a feast, or planning catering for your next event, we&apos;re here to make it memorable.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/about" className="btn-gold !rounded-full">
                  Learn More
                </Link>
                <Link href="/menu" className="btn-outline-white !rounded-full">
                  View Menu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* 💼 Catering Preview 
================================================= */}
        <section className="pt-20 pb-8 lg:pt-24 lg:pb-12 bg-white relative overflow-hidden">
          {/* Decorative Background Map / Meander */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'repeating-linear-gradient(45deg, #1E1C59 0px, #1E1C59 2px, transparent 2px, transparent 12px)' }}>
          </div>

          <div className="container-custom mx-auto relative z-10 px-4 sm:px-6">
            <div className="relative flex flex-col lg:flex-row items-center gap-12">
              
              {/* Content (Left) */}
              <div className="flex-1 w-full relative z-10 lg:pr-8 text-center lg:text-left flex flex-col items-center lg:items-start">
                <p className="text-[#B18C56] text-sm sm:text-base font-bold tracking-[0.2em] uppercase mb-4">
                  Greek Mansion Catering
                </p>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>
                  Feed Your Crowd <br className="hidden lg:block"/>With Authentic Flavours
                </h2>
                <div className="gold-line mx-auto lg:mx-0 mb-8" />
                <p className="text-[#11102F]/80 text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                  From office lunches to family celebrations, our catering packages bring authentic Greek flavours to your table. Each package includes souvlaki, rice, potatoes, Greek salad, tzatziki, and pita.
                </p>
                
                {/* 2x2 Grid for features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 w-full max-w-xl mx-auto lg:mx-0">
                  {[
                    { 
                      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B18C56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>, 
                      title: 'Corporate Lunches' 
                    },
                    { 
                      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B18C56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"></path><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"></path><path d="M2 21h20"></path><path d="M7 8v2"></path><path d="M12 8v2"></path><path d="M17 8v2"></path></svg>, 
                      title: 'Family Celebrations' 
                    },
                    { 
                      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B18C56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>, 
                      title: 'Community Events' 
                    },
                    { 
                      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B18C56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>, 
                      title: 'Team Gatherings' 
                    }
                  ].map((item) => (
                    <div key={item.title} className="flex items-center gap-4 bg-[#F7F3EA] p-4 rounded-2xl border border-[#E8DCCB] hover:border-[#B18C56]/50 hover:bg-[#E8DCCB] transition-all card-hover">
                      <div className="w-12 h-12 rounded-full bg-[#1E1C59]/5 flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <span className="text-[#1E1C59] font-semibold text-sm">{item.title}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <Link href="/catering" className="btn-gold !rounded-full">
                    Plan Your Catering
                  </Link>
                  <a href={BUSINESS.phoneTel} className="btn-outline !rounded-full">
                    Call to Discuss
                  </a>
                </div>
              </div>

              {/* Image (Right) - Breakout Design */}
              <div className="lg:w-[45%] w-full relative z-10 lg:-mr-24 lg:-my-8">
                <div className="relative aspect-square lg:aspect-[4/5] rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-[#1E1C59] transform lg:rotate-2 hover:rotate-0 transition-transform duration-500 bg-[#E8DCCB]">
                  <Image
                    src="/images/food/family-meal.jpg"
                    alt="Greek Mansion family meal spread for catering"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  
                  {/* Glassmorphic Price Badge overlay */}
                  <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-[#11102F]/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-2xl flex items-center gap-5 animate-fade-in-up">
                    <div className="w-14 h-14 bg-[#B18C56] rounded-full flex items-center justify-center text-white shrink-0 shadow-lg">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#B18C56] text-xs font-bold uppercase tracking-widest mb-1">Packages From</p>
                      <p className="text-3xl font-bold text-white leading-none" style={{ fontFamily: "'Marcellus', serif", color: '#ffffff' }}>$129.95</p>
                      <p className="text-white/50 text-xs mt-1">Feeds up to 10 people</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      {/* ── Food Gallery Mosaic ────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#B18C56] text-sm font-semibold tracking-[0.15em] uppercase mb-3">Gallery</p>
            <h2 className="text-3xl sm:text-4xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>
              Made Fresh, Served with Love
            </h2>
            <div className="gold-line-center mt-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
            {[
              { src: '/images/food/gyro-wrap.jpg', alt: 'Gyro pita wrap with tzatziki' },
              { src: '/images/food/chicken-dinner.jpg', alt: 'Chicken souvlaki dinner plate' },
              { src: '/images/food/grilled-calamari.jpg', alt: 'Grilled calamari appetizer' },
              { src: '/images/food/spanakopita.jpg', alt: 'Spanakopita — spinach and cheese pastry' },
              { src: '/images/food/lamb-plate.jpg', alt: 'Lamb souvlaki dinner plate' },
              { src: '/images/food/fish-and-chips.jpg', alt: 'Fish and chips with haddock' },
            ].map((img, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl img-zoom aspect-square animate-slide-down" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location & Visit ──────────────────────────────── */}
      <section className="section-padding bg-[#F7F3EA]" id="location">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Map Area */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8DCCB] border-2 border-[#E8DCCB]">
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

            {/* Info */}
            <div>
              <p className="text-[#B18C56] text-sm font-semibold tracking-[0.15em] uppercase mb-3">
                Find Us
              </p>
              <h2 className="text-3xl sm:text-4xl text-[#1E1C59] leading-tight mb-6" style={{ fontFamily: "'Marcellus', serif" }}>
                Visit Greek Mansion
              </h2>
              <div className="gold-line mb-8" />

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1E1C59]/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B18C56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-[#1E1C59]">{BUSINESS.name}</p>
                    <address className="not-italic text-[#11102F]/60 text-sm leading-relaxed">
                      {BUSINESS.address.full}
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1E1C59]/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B18C56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-[#1E1C59]">Call Us</p>
                    <a href={BUSINESS.phoneTel} className="text-[#B18C56] font-semibold hover:text-[#8F7045] transition-colors">
                      {BUSINESS.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <a
                  href={BUSINESS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !rounded-full"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Get Directions
                </a>
                <a href={BUSINESS.phoneTel} className="btn-outline !rounded-full">
                  Call Now
                </a>
              </div>
            </div>
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
        <div className="relative z-10 container-custom mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4" style={{ fontFamily: "'Marcellus', serif", color: '#ffffff' }}>
            Ready for a Taste of Greece?
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">
            Explore our full menu, order online for pickup, or plan your next event with our catering packages.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/menu" className="btn-gold !rounded-full !px-8 !py-3.5">
              View Menu
            </Link>
            <Link href="/menu" className="btn-outline-white !rounded-full !px-8 !py-3.5">
              Order Online
            </Link>
            <Link href="/catering" className="btn-outline-white !rounded-full !px-8 !py-3.5">
              Plan Catering
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
