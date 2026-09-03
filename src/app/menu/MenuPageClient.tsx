'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice, Product, ProductVariant, Category } from '@/data/menu';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  heroFadeInUp, 
  staggerHero, 
  fadeInUpSlow, 
  fadeInScale, 
  staggerContainerSlow 
} from '@/lib/animations';
import ProductModal from '@/components/menu/ProductModal';


interface MenuPageClientProps {
  initialCategories: Category[];
}

export default function MenuPageClient({ initialCategories }: MenuPageClientProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [activeCategory, setActiveCategory] = useState(initialCategories[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');

  // Silently fetch fresh CMS data in the background
  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data) && data.length > 0) {
          setCategories(data);
        }
      })
      .catch(err => console.error('Error refreshing menu:', err));
  }, []);
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

    categories.forEach((cat) => {
      const el = categoryRefs.current[cat.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  // Filter out products that have no images
  const categoriesWithValidProducts = categories.map(cat => ({
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
      <section className="relative pt-24 pb-12 bg-[#1E1C59] texture-indigo overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image src="/images/food/hero.jpg" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <motion.div 
          className="relative z-10 container-custom mx-auto px-4 sm:px-6 text-center py-8"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={staggerHero}
        >
          <motion.p variants={heroFadeInUp} className="text-[#B18C56] text-sm font-semibold tracking-[0.15em] uppercase mb-3">
            Greek Mansion Restaurant
          </motion.p>
          <motion.h1 variants={heroFadeInUp} className="text-4xl sm:text-5xl text-white mb-4" style={{ fontFamily: "'Marcellus', serif", color: '#ffffff' }}>
            Our Menu
          </motion.h1>
          <motion.p variants={heroFadeInUp} className="text-white/60 max-w-lg mx-auto mb-6 text-sm">
            Authentic Greek cuisine made fresh daily. Browse our full menu below or download the PDF.
          </motion.p>
          <motion.div variants={heroFadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/Greek-Mansion-Menu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold !rounded-full !px-8 !py-3 !text-sm shadow-xl shadow-black/20 font-semibold tracking-wide"
            >
              See Original Print Menu
            </a>
          </motion.div>
        </motion.div>
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
      <section className="section-padding bg-[#F7F3EA] !pt-12 texture-ivory overflow-hidden">
        <div className="container-custom mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUpSlow}
          >
            <h2 className="text-3xl sm:text-4xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>
              Explore Our Menu
            </h2>
            <div className="gold-line-center mt-4" />
          </motion.div>

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
              <motion.section
                key={category.id}
                id={category.id}
                ref={(el) => { categoryRefs.current[category.id] = el; }}
                className="mb-14 scroll-mt-36"
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainerSlow}
              >
                {/* Category header */}
                <motion.div variants={fadeInUpSlow} className="flex items-center gap-4 mb-2">
                  <h2 className="text-2xl sm:text-3xl text-[#1E1C59] whitespace-nowrap" style={{ fontFamily: "'Marcellus', serif" }}>
                    {category.name}
                  </h2>
                  <div className="flex-1 h-px bg-[#B18C56]/20" />
                </motion.div>
                {category.description && (
                  <motion.p variants={fadeInUpSlow} className="text-[#11102F]/50 text-sm mb-6 max-w-2xl">
                    {category.description}
                  </motion.p>
                )}

                {/* Products grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {category.products.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={fadeInScale}
                      onClick={() => openProductModal(product)}
                      className={`bg-white rounded-xl overflow-hidden border border-[#E8DCCB]/60 card-hover group h-full flex flex-col cursor-pointer shadow-sm hover:shadow-xl transition-all ${
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
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))
          )}
        </div>
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
