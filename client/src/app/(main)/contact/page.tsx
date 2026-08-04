import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us | Page Craft',
  description: 'Get in touch with Page Craft. Our team is here to help you with your publishing journey.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
