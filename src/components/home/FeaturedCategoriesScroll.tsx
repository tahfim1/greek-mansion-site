'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useScroll } from 'framer-motion';
import { formatPrice, Product, MENU_CATEGORIES } from '@/data/menu';
import ProductModal from '@/components/menu/ProductModal';

type CategoryWithProducts = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  products: Product[];
};

function getFallbackFeaturedCategories(): CategoryWithProducts[] {
  const featuredIds = ['dinner-plates', 'pita-wraps', 'appetizers', 'mansion-favourites'];
  return featuredIds
    .map(id => MENU_CATEGORIES.find(c => c.id === id))
    .filter((cat): cat is typeof MENU_CATEGORIES[number] => Boolean(cat))
    .map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      image: cat.image || '',
      products: (cat.products || []).filter(p => p.status === 'active').slice(0, 6),
    }));
}

export default function FeaturedCategoriesScroll() {
  const [categories, setCategories] = useState<CategoryWithProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Always fetch fresh data to prevent PC showing old cached data
    fetch('/api/home-categories/featured', { cache: 'no-store' })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        } else {
          setCategories(getFallbackFeaturedCategories());
        }
      })
      .catch(err => {
        console.warn('Featured categories API unavailable, using fallback data:', err);
        setCategories(getFallbackFeaturedCategories());
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F7F3EA] texture-ivory">
        <div className="loader w-12 h-12 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!Array.isArray(categories) || categories.length === 0) {
    return null; 
  }

  return <FeaturedCategoriesScrollInner categories={categories} />;
}

function FeaturedCategoriesScrollInner({ categories }: { categories: CategoryWithProducts[] }) {
  if (!Array.isArray(categories) || categories.length === 0) {
    return null;
  }
  // Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = categories.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Nudge animation to hint scrollability on mobile
  useEffect(() => {
    const timer = setTimeout(() => {
      const activeGrid = document.getElementById(`grid-scroll-0`);
      if (activeGrid && window.innerWidth < 1024 && activeGrid.scrollLeft === 0) {
        activeGrid.scrollBy({ left: 80, behavior: 'smooth' });
        setTimeout(() => {
          activeGrid.scrollBy({ left: -80, behavior: 'smooth' });
        }, 600);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      // Use Math.round to distribute the active slide evenly across the scroll progress
      // without leaving massive dead zones at the start and end.
      let newIndex = Math.round(latest * (totalSlides - 1));
      if (newIndex >= totalSlides) newIndex = totalSlides - 1;
      
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    });
  }, [scrollYProgress, activeIndex, totalSlides]);

  return (
    <>
      {/* Desktop & Mobile Layout - Scroll-jacked container */}
      <div 
        ref={containerRef} 
        style={{ height: `calc(100dvh + ${(totalSlides - 1) * 60}vh)` }}
        className="relative w-full bg-white"
      >
        <div className="!sticky top-0 h-[100dvh] w-full overflow-hidden bg-white texture-white">  
          {/* Progress Indicators */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
            {categories.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-2 rounded-full transition-all duration-500 ${
                  idx === activeIndex ? 'h-10 bg-[#D4AF37]' : 'h-2 bg-[#1E1C59]/20'
                }`}
              />
            ))}
          </div>

          {/* Stacked Categories with CSS crossfade */}
          {categories.map((category, index) => (
            <div 
              key={category.id}
              className={`!absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-white texture-white transition-opacity duration-700 ease-in-out ${
                index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <div className="container-custom mx-auto relative px-4 sm:px-4 h-full pt-[90px] pb-[80px] sm:pt-20 sm:pb-24 lg:pt-32 lg:pb-12 flex flex-col justify-center min-h-0">
                {/* Category Title Area */}
                <div className="text-center mb-3 sm:mb-6 lg:mb-8 shrink-0">
                  <p className="text-[#D4AF37] text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase mb-1 sm:mb-3">From Our Kitchen</p>
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>
                    {category.name}
                  </h2>
                  <div className="gold-line-center mt-2 sm:mt-4" />
                  {category.description && (
                    <p className="text-[#11102F]/60 text-xs sm:text-sm max-w-2xl mx-auto mt-2 sm:mt-4 line-clamp-1 sm:line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </div>

                {/* Products Grid (Scrollable Inner Wheel) */}
                <div 
                  id={`grid-scroll-${index}`}
                  className="shrink w-full max-w-6xl mx-auto overflow-x-auto overflow-y-hidden lg:overflow-y-auto lg:overflow-x-hidden px-2 sm:px-6 lg:px-2 pb-2 min-h-0 relative hide-scrollbar lg:custom-scrollbar snap-x snap-mandatory lg:snap-none"
                >
                  <div className="flex lg:grid lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-8 w-full lg:h-auto">
                      {(category.products || []).map(product => (
                        <div 
                          key={product.id} 
                          className="group cursor-pointer shrink-0 w-[82vw] max-w-[320px] lg:w-auto snap-center"
                          onClick={() => setSelectedProduct(product)}
                        >
                          <div className="bg-white rounded-2xl overflow-hidden card-hover border border-[#E8DCCB]/40 shadow-sm hover:shadow-xl transition-all flex flex-col h-full">
                            {product.image ? (
                              <div className="relative aspect-[16/10] sm:aspect-[3/2] lg:aspect-[4/3] w-full img-zoom bg-[#1E1C59]/5 shrink-0">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className={`object-cover ${product.status === 'sold_out' ? 'grayscale-[0.3]' : ''}`}
                                  sizes="(max-width: 1024px) 85vw, 33vw"
                                />
                                {product.status === 'sold_out' && (
                                  <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow-lg uppercase tracking-widest">
                                    Sold Out
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full bg-[#1E1C59] flex items-center justify-center shrink-0">
                                <Image
                                  src="/images/logo/logo.png"
                                  alt={product.name}
                                  fill
                                  className="object-contain p-6 opacity-80"
                                  sizes="(max-width: 1024px) 85vw, 33vw"
                                />
                                {product.status === 'sold_out' && (
                                  <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow-lg uppercase tracking-widest z-10">
                                    Sold Out
                                  </div>
                                )}
                              </div>
                            )}
                            <div className="p-3.5 sm:p-4 lg:p-5 flex-1 flex flex-col justify-between">
                              <div>
                                <p className="text-[#D4AF37] text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-1">
                                  {category.name}
                                </p>
                                <h3 className="text-base sm:text-lg text-[#1E1C59] mb-1 leading-snug" style={{ fontFamily: "'Marcellus', serif" }}>
                                  {product.name}
                                </h3>
                                <p className="text-[#11102F]/50 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                                  {product.description}
                                </p>
                              </div>
                              <div className="flex items-center justify-between mt-auto pt-2">
                                <span className="text-[#1E1C59] font-bold text-sm sm:text-base">
                                  {product.variants && product.variants.length > 0 
                                    ? `From ${formatPrice(Math.min(...product.variants.map(v => v.price)))}`
                                    : formatPrice(product.price)
                                  }
                                </span>
                                <span className="text-[#D4AF37] text-xs sm:text-sm font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                  View 
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Mobile Pagination Dots */}
                <div className="lg:hidden flex justify-center gap-1.5 mt-2 sm:mt-4 shrink-0">
                  {(category.products || []).map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-[#D4AF37]' : 'bg-[#1E1C59]/20'}`} />
                  ))}
                </div>
                
                {/* View Menu Button */}
                <div className="mt-3 sm:mt-6 flex justify-center shrink-0 w-full">
                  <a href="/menu" className="btn-primary !py-2.5 !px-6 !text-sm sm:!text-base">
                    View Full Menu
                  </a>
                </div>
              </div>
            </div>))}
        </div>
      </div>
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 28, 89, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.8);
        }
      `}</style>
    </>
  );
}
