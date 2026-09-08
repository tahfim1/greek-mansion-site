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
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#1E1C59] transition-opacity duration-1000 ease-in-out ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
    >
      {/* Subtle Greek texture background */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `repeating-linear-gradient(45deg, #B18C56 0px, #B18C56 1px, transparent 1px, transparent 20px)` }} />

      <div className="flex flex-col items-center relative z-10 px-6">
        {/* Greek Mansion Official Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-72 sm:w-96 max-w-[85vw] aspect-[992/316] mb-4"
        >
          <motion.img
            src="/images/logo/logo.png"
            alt="Greek Mansion Restaurant"
            className="w-full h-full object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
          />
        </motion.div>



        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: "easeInOut" }}
          className="h-[1px] bg-gradient-to-r from-transparent via-[#B18C56]/70 to-transparent w-48 sm:w-64 mt-4"
        />
      </div>
    </div>
  );
}
