import type { Metadata } from 'next';
import CateringClient from './CateringClient';

export const metadata: Metadata = {
  title: 'Catering',
  description: 'Greek Mansion catering for office lunches, celebrations, and events in Scarborough. Packages start at $129.95 for 10 people. Call +1 416-292-3333.',
};

export default function CateringPage() {
  return <CateringClient />;
}
