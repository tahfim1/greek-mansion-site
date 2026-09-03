'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useScroll } from 'framer-motion';
import { formatPrice, Product } from '@/data/menu';
import ProductModal from '@/components/menu/ProductModal';

type CategoryWithProducts = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  products: Product[];
};

export default function FeaturedCategoriesScroll() {
  const [categories, setCategories] = useState<CategoryWithProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Use aggressive caching for the fetch
    fetch('/api/home-categories/featured', { cache: 'force-cache' })
      .then(res => res.json())
      .then(data => {
        setCategories(data);
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F7F3EA] texture-ivory">
        <div className="loader w-12 h-12 rounded-full border-4 border-[#B18C56] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (categories.length === 0) {
    return null; 
  }

  return <FeaturedCategoriesScrollInner categories={categories} />;
}

function FeaturedCategoriesScrollInner({ categories }: { categories: CategoryWithProducts[] }) {
  // Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = categories.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

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
      <div 
        ref={containerRef} 
        style={{ height: `calc(100vh + ${(totalSlides - 1) * 60}vh)` }}
        className="relative w-full bg-[#F7F3EA]"
      >
        <div className="!sticky top-0 h-screen w-full overflow-hidden bg-[#F7F3EA] texture-ivory">  
          {/* Progress Indicators */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 hidden lg:flex">
            {categories.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-2 rounded-full transition-all duration-500 ${
                  idx === activeIndex ? 'h-10 bg-[#B18C56]' : 'h-2 bg-[#1E1C59]/20'
                }`}
              />
            ))}
          </div>

          {/* Stacked Categories with CSS crossfade */}
          {categories.map((category, index) => (
            <div 
              key={category.id}
              className={`!absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[#F7F3EA] texture-ivory transition-opacity duration-700 ease-in-out ${
                index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <div className="container-custom mx-auto relative px-4 h-full pt-20 pb-8 lg:pt-32 lg:pb-12 flex flex-col min-h-0">
                {/* Category Title Area */}
                <div className="text-center mb-6 lg:mb-8 shrink-0">
                  <p className="text-[#B18C56] text-sm font-semibold tracking-[0.15em] uppercase mb-3">From Our Kitchen</p>
                  <h2 className="text-4xl lg:text-5xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>
                    {category.name}
                  </h2>
                  <div className="gold-line-center mt-4" />
                  {category.description && (
                    <p className="text-[#11102F]/60 max-w-2xl mx-auto mt-4 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </div>

                {/* Products Grid (Scrollable Inner Wheel) */}
                <div 
                  className="flex-1 w-full max-w-6xl mx-auto overflow-y-auto custom-scrollbar px-2 pb-6 min-h-0 relative"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
                      {category.products.map(product => (
                        <div 
                          key={product.id} 
                          className="group cursor-pointer"
                          onClick={() => setSelectedProduct(product)}
                        >
                          <div className="bg-[#F7F3EA] rounded-2xl overflow-hidden card-hover border border-[#E8DCCB]/40 shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                            {product.image ? (
                              <div className="relative aspect-[4/3] w-full img-zoom bg-[#1E1C59]/5 shrink-0">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className={`object-cover ${product.status === 'sold_out' ? 'grayscale-[0.3]' : ''}`}
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                {product.status === 'sold_out' && (
                                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-widest">
                                    Sold Out
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="aspect-[4/3] w-full bg-[#E8DCCB] flex items-center justify-center shrink-0">
                                <span className="text-[#B18C56]/50 text-4xl" style={{ fontFamily: "'Marcellus', serif" }}>GM</span>
                              </div>
                            )}
                            <div className="p-5 flex-1 flex flex-col justify-between">
                              <div>
                                <p className="text-[#B18C56] text-xs font-semibold tracking-wider uppercase mb-1">
                                  {category.name}
                                </p>
                                <h3 className="text-lg text-[#1E1C59] mb-1" style={{ fontFamily: "'Marcellus', serif" }}>
                                  {product.name}
                                </h3>
                                <p className="text-[#11102F]/50 text-sm mb-3 line-clamp-2">
                                  {product.description}
                                </p>
                              </div>
                              <div className="flex items-center justify-between mt-auto">
                                <span className="text-[#1E1C59] font-bold">
                                  {product.variants && product.variants.length > 0 
                                    ? `From ${formatPrice(Math.min(...product.variants.map(v => v.price)))}`
                                    : formatPrice(product.price)
                                  }
                                </span>
                                <span className="text-[#B18C56] text-sm font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
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
                
                {/* View Menu Button */}
                <div className="mt-6 flex justify-center shrink-0 w-full">
                  <a href="/menu" className="btn-primary">
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
          background: rgba(177, 140, 86, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(177, 140, 86, 0.8);
        }
      `}</style>
    </>
  );
}
