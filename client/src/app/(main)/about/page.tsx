import { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us | Page Craft',
  description: 'Learn about Page Craft, our mission, history, and the team behind our premium publishing house.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
