import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About',
  description: 'Greek Mansion Restaurant brings authentic Greek cuisine to Scarborough. Fresh souvlaki, gyro, Greek salads, and more at Steeles and Middlefield.',
};

export default function AboutPage() {
  return <AboutClient />;
}
