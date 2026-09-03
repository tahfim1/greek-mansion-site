import type { Metadata } from 'next';
import MenuPageClient from './MenuPageClient';
import { MENU_CATEGORIES } from '@/data/menu';

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Browse the full Greek Mansion menu — appetizers, pita wraps, dinner plates, sandwiches, salads, specials, and catering packages.',
};

export default function MenuPage() {
  // Pass the static menu data as initial state so the page renders instantly.
  // The client component will fetch the latest CMS data in the background.
  return <MenuPageClient initialCategories={MENU_CATEGORIES} />;
}
