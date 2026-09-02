import type { Metadata } from 'next';
import MenuPageClient from './MenuPageClient';

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Browse the full Greek Mansion menu — appetizers, pita wraps, dinner plates, sandwiches, salads, specials, and catering packages. Order online for pickup.',
};

export default function MenuPage() {
  return <MenuPageClient />;
}
