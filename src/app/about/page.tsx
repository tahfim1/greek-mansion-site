import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: 'Greek Mansion Restaurant brings authentic Greek cuisine to Scarborough. Fresh souvlaki, gyro, Greek salads, and more at Steeles and Middlefield.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-16 bg-[#1E1C59]">
        <div className="absolute inset-0 opacity-15">
          <Image src="/images/food/hero-hq.jpg" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative z-10 container-custom mx-auto px-4 sm:px-6 text-center py-12">
          <p className="text-[#B18C56] text-sm font-semibold tracking-[0.15em] uppercase mb-3">Our Story</p>
          <h1 className="text-4xl sm:text-5xl text-white mb-4" style={{ fontFamily: "'Marcellus', serif", color: '#ffffff' }}>
            About Greek Mansion
          </h1>
          <p className="text-white/60 max-w-lg mx-auto text-sm">
            {BUSINESS.tagline}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-[#F7F3EA]">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-t-[100px] rounded-b-2xl overflow-hidden">
                <Image
                  src="/images/food/steak-dinner.jpg"
                  alt="Steak dinner plate with Greek salad, rice, and potatoes"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-t-[100px] rounded-b-2xl border-2 border-[#B18C56]/20 -z-10" />
            </div>

            <div>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl sm:text-4xl text-[#1E1C59] leading-tight mb-6" style={{ fontFamily: "'Marcellus', serif" }}>
                Bold Flavours, Honest Food
              </h2>
              <p className="text-[#11102F]/70 leading-relaxed mb-4">
                Greek Mansion brings the bold, generous flavours of Greek cuisine to Scarborough. Located at Steeles and Middlefield, we prepare everything with care — from our souvlaki skewered and cooked over an open flame, to our creamy tzatziki made fresh in-house.
              </p>
              <p className="text-[#11102F]/70 leading-relaxed mb-4">
                Our menu features a wide range of authentic dishes: dinner plates, pita wraps, fresh salads, sandwiches, and our popular family specials. We also offer catering packages for groups of any size, perfect for office lunches, celebrations, and community events.
              </p>
              <p className="text-[#11102F]/70 leading-relaxed mb-8">
                Whether you&apos;re dining in, picking up a quick lunch box, or feeding a crowd, Greek Mansion is here to make every meal memorable.
              </p>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Dine-In', icon: '🍽️' },
                  { label: 'Takeout', icon: '📦' },
                  { label: 'Catering', icon: '👨‍👩‍👧‍👦' },
                ].map((s) => (
                  <div key={s.label} className="text-center bg-white rounded-xl p-4 border border-[#E8DCCB]/60">
                    <span className="text-2xl mb-2 block">{s.icon}</span>
                    <span className="text-[#1E1C59] font-bold text-sm">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Food Gallery Strip */}
      <section className="bg-white py-12">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src: '/images/food/gyro-plate.jpg', alt: 'Gyro dinner plate' },
              { src: '/images/food/grilled-calamari.jpg', alt: 'Grilled calamari' },
              { src: '/images/food/falafel-plate.jpg', alt: 'Falafel plate' },
              { src: '/images/food/chicken-fillet-wrap.jpg', alt: 'Chicken fillet wrap' },
            ].map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden img-zoom">
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[#1E1C59]">
        <div className="container-custom mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl text-white mb-4" style={{ fontFamily: "'Marcellus', serif" }}>
            Come Taste the Difference
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8 text-sm">
            {BUSINESS.address.full}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/menu" className="btn-gold !rounded-full !px-8">View Our Menu</Link>
            <a href={BUSINESS.phoneTel} className="btn-outline-white !rounded-full !px-8">Call {BUSINESS.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
