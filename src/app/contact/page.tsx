import type { Metadata } from 'next';
import { BUSINESS } from '@/lib/constants';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact Greek Mansion Restaurant at ${BUSINESS.phone}. Located at ${BUSINESS.address.full}. Dine-in, takeout, and catering available.`,
};

export default function ContactPage() {
  return <ContactClient />;
}
