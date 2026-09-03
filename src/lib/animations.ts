export const easePremium = [0.16, 1, 0.3, 1]; // Custom cubic-bezier for a slow, elegant feel
export const easeSubtle = [0.25, 0.1, 0.25, 1];

export const heroFadeInUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1.6, ease: easePremium }
};

export const staggerHero = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.1 } },
  viewport: { once: true }
};

export const fadeInUpSlow = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 1.4, ease: easePremium }
};

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 1.5, ease: easePremium }
};

export const slideInRightSlow = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 1.5, ease: easePremium }
};

export const slideInLeftSlow = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 1.5, ease: easePremium }
};

export const staggerContainerSlow = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { staggerChildren: 0.25, delayChildren: 0.1 }
};
