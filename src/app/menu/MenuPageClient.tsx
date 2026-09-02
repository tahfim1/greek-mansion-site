'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice, Product, ProductVariant, Category } from '@/data/menu';
import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import('@/components/PDFViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto rounded-2xl h-64 border-4 border-[#1E1C59] bg-white text-[#1E1C59] animate-pulse">
      Loading print menu...
    </div>
  ),
});

interface MenuPageClientProps {
  initialCategories: Category[];
}

export default function MenuPageClient({ initialCategories }: MenuPageClientProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategories[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});
  const navRef = useRef<HTMLDivElement>(null);

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setSelectedVariant(product.variants && product.variants.length > 0 ? product.variants[0] : null);
  };

  // Scroll to category
  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const el = categoryRefs.current[categoryId];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Intersection observer to track active category
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
            // Scroll nav tab into view
            const navBtn = document.querySelector(`[data-nav="${entry.target.id}"]`);
            navBtn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        }
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 }
    );

    initialCategories.forEach((cat) => {
      const el = categoryRefs.current[cat.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [initialCategories]);

  // Filter out products that have no images
  const categoriesWithValidProducts = initialCategories.map(cat => ({
    ...cat,
    products: cat.products.filter(p => p.image !== '')
  })).filter(cat => cat.products.length > 0);

  // Filter products by search
  const filteredCategories = searchQuery.trim()
    ? categoriesWithValidProducts.map((cat) => ({
        ...cat,
        products: cat.products.filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter((cat) => cat.products.length > 0)
    : categoriesWithValidProducts;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-12 bg-[#1E1C59] texture-indigo">
        <div className="absolute inset-0 opacity-15">
          <Image src="/images/food/hero.jpg" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative z-10 container-custom mx-auto px-4 sm:px-6 text-center py-8">
          <p className="text-[#B18C56] text-sm font-semibold tracking-[0.15em] uppercase mb-3">
            Greek Mansion Restaurant
          </p>
          <h1 className="text-4xl sm:text-5xl text-white mb-4" style={{ fontFamily: "'Marcellus', serif", color: '#ffffff' }}>
            Our Menu
          </h1>
          <p className="text-white/60 max-w-lg mx-auto mb-6 text-sm">
            Authentic Greek cuisine made fresh daily. Browse our full menu below or download the PDF.
          </p>
          <a
            href="/Greek-Mansion-Menu.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#B18C56] hover:text-[#C9A872] transition-colors text-sm font-semibold"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Menu PDF
          </a>
        </div>
      </section>

      {/* PDF Menu Embed */}
      <section className="bg-[#F7F3EA] py-12 border-b border-[#E8DCCB] texture-ivory">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>
              Original Print Menu
            </h2>
            <div className="gold-line-center mt-4 mb-8" />
          </div>
          <PDFViewer file="/Greek-Mansion-Menu.pdf" />
        </div>
      </section>

      {/* Search + Category Navigation (Sticky) */}
      <div className="sticky top-[56px] lg:top-[64px] z-30 bg-white/95 backdrop-blur-md border-b border-[#E8DCCB] shadow-sm">
        <div className="container-custom mx-auto px-4 sm:px-6">
          {/* Search */}
          <div className="py-3">
            <div className="relative max-w-md mx-auto">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B18C56]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                placeholder="Search our menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input !pl-10 !py-2.5 !text-sm !rounded-full !border-[#E8DCCB]"
                aria-label="Search menu items"
              />
            </div>
          </div>
          {/* Category tabs */}
          {!searchQuery && (
            <div ref={navRef} className="flex overflow-x-auto gap-1 pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              {categoriesWithValidProducts.map((cat) => (
                <button
                  key={cat.id}
                  data-nav={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-[#1E1C59] text-white'
                      : 'text-[#1E1C59]/60 hover:text-[#1E1C59] hover:bg-[#E8DCCB]/50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Menu Content */}
      <section className="section-padding bg-[#F7F3EA] !pt-12 texture-ivory">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12 animate-slide-down">
            <h2 className="text-3xl sm:text-4xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>
              Explore Our Menu
            </h2>
            <div className="gold-line-center mt-4" />
          </div>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#1E1C59] text-xl font-bold mb-2" style={{ fontFamily: "'Marcellus', serif" }}>
                No items found
              </p>
              <p className="text-[#11102F]/50 text-sm">
                Try a different search term or{' '}
                <button onClick={() => setSearchQuery('')} className="text-[#B18C56] font-semibold hover:underline">
                  clear your search
                </button>
              </p>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <section
                key={category.id}
                id={category.id}
                ref={(el) => { categoryRefs.current[category.id] = el; }}
                className="mb-14 scroll-mt-36"
              >
                {/* Category header */}
                <div className="flex items-center gap-4 mb-2">
                  <h2 className="text-2xl sm:text-3xl text-[#1E1C59] whitespace-nowrap" style={{ fontFamily: "'Marcellus', serif" }}>
                    {category.name}
                  </h2>
                  <div className="flex-1 h-px bg-[#B18C56]/20" />
                </div>
                {category.description && (
                  <p className="text-[#11102F]/50 text-sm mb-6 max-w-2xl">
                    {category.description}
                  </p>
                )}

                {/* Products grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {category.products.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => openProductModal(product)}
                      className={`bg-white rounded-xl overflow-hidden border border-[#E8DCCB]/60 card-hover group h-full flex flex-col cursor-pointer ${
                        product.status === 'sold_out' ? 'opacity-70 grayscale-[0.3]' : ''
                      }`}
                      role="button"
                      tabIndex={0}
                    >
                      {/* Image */}
                      {product.image && (
                        <div className="relative aspect-[16/10] img-zoom shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.status === 'sold_out' ? (
                              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                                Sold Out
                              </span>
                            ) : (
                              <span className="bg-[#1E1C59]/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider border border-[#1E1C59]/20">
                                In Stock
                              </span>
                            )}
                            {product.cateringOnly && (
                              <span className="bg-[#1E1C59] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                Catering Only
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Info */}
                      <div className="p-4 flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-1 gap-2">
                          <h3 className="text-lg font-bold text-[#1E1C59] leading-tight" style={{ fontFamily: "'Marcellus', serif" }}>
                            {product.name}
                          </h3>
                        </div>
                        <p className="text-[#11102F]/60 text-xs leading-relaxed mb-4 line-clamp-2 flex-1">
                          {product.description}
                        </p>

                        {/* Variants / Price */}
                        {product.variants && product.variants.length > 0 ? (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {product.variants.map((v) => (
                              <span
                                key={v.label}
                                className="text-xs bg-[#F7F3EA] px-2.5 py-1 rounded-md text-[#1E1C59] font-medium"
                              >
                                {v.label}: <span className="font-bold">{formatPrice(v.price)}</span>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[#B18C56] font-bold text-lg mb-4">
                            {formatPrice(product.price)}
                          </p>
                        )}

                        {/* View Details button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            openProductModal(product);
                          }}
                          className={`w-full py-2.5 rounded-lg border text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                            product.status === 'sold_out' 
                              ? 'bg-gray-100 text-gray-500 border-gray-200' 
                              : 'bg-[#F7F3EA] text-[#1E1C59] border-[#E8DCCB] hover:bg-[#E8DCCB]'
                          }`}
                          aria-label={`View details for ${product.name}`}
                        >
                          {product.status === 'sold_out' ? 'Sold Out' : 'View Details'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </section>

      {/* Premium Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#11102F]/80 backdrop-blur-md animate-fade-in">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={() => setSelectedProduct(null)} />
          
          <div className="relative bg-[#F7F3EA] rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden animate-slide-up flex flex-col lg:flex-row max-h-[95vh] texture-ivory border border-[#E8DCCB]">
            {/* Close button */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 w-12 h-12 bg-white/50 hover:bg-white text-[#1E1C59] rounded-full flex items-center justify-center transition-colors backdrop-blur-md shadow-lg border border-[#E8DCCB]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>

            {/* Left/Top: Image Column */}
            <div className={`relative w-full lg:w-1/2 ${selectedProduct.image ? 'h-64 sm:h-80 lg:h-auto' : 'hidden lg:block bg-[#1E1C59]'} shrink-0`}>
              {selectedProduct.image ? (
                <Image 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  fill 
                  className={`object-cover ${selectedProduct.status === 'sold_out' ? 'grayscale-[0.3]' : ''}`} 
                  sizes="(max-width: 1024px) 100vw, 50vw" 
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1E1C59]/10 to-[#E8DCCB]/50 texture-indigo">
                  <span className="text-[#B18C56]/20 text-8xl font-bold" style={{ fontFamily: "'Marcellus', serif" }}>GM</span>
                </div>
              )}
              
              {/* Badges on Image */}
              <div className="absolute top-6 left-6 flex flex-col gap-3 z-10">
                {selectedProduct.status === 'sold_out' ? (
                  <span className="bg-red-600 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest border border-red-500">
                    Sold Out
                  </span>
                ) : (
                  <span className="bg-[#1E1C59]/90 backdrop-blur-md text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest border border-white/20">
                    In Stock
                  </span>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
            </div>

            {/* Right/Bottom: Content Column */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 overflow-y-auto flex flex-col">
              <div className="mb-8">
                <h2 className="text-4xl lg:text-5xl font-bold text-[#1E1C59] mb-4 leading-tight" style={{ fontFamily: "'Marcellus', serif" }}>
                  {selectedProduct.name}
                </h2>
                
                {/* Price Display */}
                {selectedProduct.variants && selectedProduct.variants.length === 0 && (
                  <p className="text-3xl text-[#B18C56] font-bold" style={{ fontFamily: "'Marcellus', serif" }}>
                    {formatPrice(selectedProduct.price)}
                  </p>
                )}
                <div className="gold-line-left mt-6 mb-6" />
                
                {/* Description */}
                <div className="prose prose-lg text-[#11102F]/80">
                  <p className="leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>
              </div>

              {/* Variants Selection */}
              {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                <div className="mb-10 mt-auto">
                  <label className="block text-[#1E1C59] font-bold text-sm uppercase tracking-widest mb-4">
                    Available Options
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedProduct.variants.map((v) => (
                      <button
                        key={v.label}
                        onClick={() => setSelectedVariant(v)}
                        className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col items-start ${
                          selectedVariant?.label === v.label 
                            ? 'border-[#B18C56] bg-white shadow-md text-[#1E1C59]' 
                            : 'border-[#E8DCCB] bg-white/50 text-[#11102F]/70 hover:border-[#B18C56]/50 hover:bg-white'
                        }`}
                      >
                        <span className="font-bold text-lg mb-1" style={{ fontFamily: "'Marcellus', serif" }}>{v.label}</span>
                        <span className="text-[#B18C56] font-bold">{formatPrice(v.price)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Action Area */}
              <div className="mt-auto pt-8 border-t border-[#E8DCCB]">
                 {selectedProduct.status === 'sold_out' ? (
                   <div className="w-full py-4 text-center rounded-xl bg-gray-200 text-gray-500 font-bold uppercase tracking-widest border border-gray-300">
                     Currently Unavailable
                   </div>
                 ) : (
                   <div className="w-full py-4 text-center rounded-xl bg-[#1E1C59] text-white font-bold tracking-widest border border-[#1E1C59] shadow-lg">
                     Available In-Store
                   </div>
                 )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
