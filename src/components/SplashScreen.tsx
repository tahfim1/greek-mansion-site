'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Check if we've already shown the splash screen in this session
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    
    if (hasSeenSplash) {
      setIsVisible(false);
      return;
    }

    // Artificial delay for the premium loading effect
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      sessionStorage.setItem('hasSeenSplash', 'true');
      
      // Completely unmount after fade out completes
      setTimeout(() => setIsVisible(false), 1000);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#1E1C59] transition-opacity duration-1000 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle Greek texture background */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `repeating-linear-gradient(45deg, #B18C56 0px, #B18C56 1px, transparent 1px, transparent 20px)` }} />
          
          <div className="flex flex-col items-center relative z-10">
            {/* Greek Meander / Ornament Spinner */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
              className="relative w-24 h-24 mb-8"
            >
              {/* Custom SVG for a Greek style loader (abstract) */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#B18C56]" fill="none" stroke="currentColor" strokeWidth="3">
                {/* Outer ring */}
                <circle cx="50" cy="50" r="46" strokeOpacity="0.2" />
                {/* Spinning segment */}
                <path d="M50 4 a 46 46 0 0 1 46 46" strokeLinecap="round" />
                {/* Inner Greek Meander motif */}
                <path d="M 30 50 h 10 v -10 h 10 v 20 h 10 v -20 h 10" strokeWidth="2" strokeOpacity="0.5" strokeLinejoin="miter" strokeLinecap="square" />
              </svg>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-[#B18C56] text-3xl md:text-4xl tracking-[0.2em] uppercase font-bold text-center"
              style={{ fontFamily: "'Marcellus', serif" }}
            >
              Greek Mansion
            </motion.h1>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 1.5, ease: "easeInOut" }}
              className="h-[1px] bg-[#B18C56]/50 w-full max-w-[200px] mt-6"
            />
          </div>
    </div>
  );
}
