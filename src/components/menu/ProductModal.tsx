'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPrice, Product, ProductVariant } from '@/data/menu';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  // Reset variant when a new product is selected
  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant(null);
    }
  }, [product]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#11102F]/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={onClose} />
          
          <motion.div 
            className="relative bg-[#F7F3EA] rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col lg:flex-row max-h-[95vh] texture-ivory border border-[#E8DCCB]"
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
          >
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-12 h-12 bg-white/50 hover:bg-white text-[#1E1C59] rounded-full flex items-center justify-center transition-colors backdrop-blur-md shadow-lg border border-[#E8DCCB]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>

            {/* Left/Top: Image Column */}
            <div className={`relative w-full lg:w-1/2 ${product.image ? 'h-64 sm:h-80 lg:h-auto' : 'hidden lg:block bg-[#1E1C59]'} shrink-0`}>
              {product.image ? (
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className={`object-cover ${product.status === 'sold_out' ? 'grayscale-[0.3]' : ''}`} 
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
                {product.status === 'sold_out' ? (
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
                  {product.name}
                </h2>
                
                {/* Price Display */}
                {product.variants && product.variants.length === 0 && (
                  <p className="text-3xl text-[#B18C56] font-bold" style={{ fontFamily: "'Marcellus', serif" }}>
                    {formatPrice(product.price)}
                  </p>
                )}
                <div className="gold-line-left mt-6 mb-6" />
                
                {/* Description */}
                <div className="prose prose-lg text-[#11102F]/80">
                  <p className="leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Variants Selection */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-10 mt-auto">
                  <label className="block text-[#1E1C59] font-bold text-sm uppercase tracking-widest mb-4">
                    Available Options
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.variants.map((v) => (
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
                 {product.status === 'sold_out' ? (
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
