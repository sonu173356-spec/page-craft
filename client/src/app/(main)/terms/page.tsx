import React from 'react';
import { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Page Craft',
  description: 'Terms and Conditions for using the Page Craft platform.',
};

export default function TermsPage() {
  return (
    <div className="bg-ivory min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Terms & Conditions' }
          ]} 
          className="mb-8"
        />
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-6">Terms & Conditions</h1>
          <p className="text-gray-500 mb-8">Last Updated: August 2026</p>
          
          <div className="prose prose-lg max-w-none prose-headings:font-playfair prose-headings:text-charcoal prose-a:text-primary hover:prose-a:text-primary-dark">
            <h2>1. Agreement to Terms</h2>
            <p>By viewing or using this Site, which can be accessed at www.pagecraft.com, you are agreeing to be bound by all these Website Terms and Conditions of Use and agree with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this Site.</p>

            <h2>2. Account Terms</h2>
            <p>When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
            <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.</p>

            <h2>3. Publishing Terms</h2>
            <p>Authors retain all intellectual property rights to their original works published through Page Craft. By submitting your manuscript, you grant us a non-exclusive license to format, distribute, and sell the work as agreed in your specific publishing contract.</p>

            <h2>4. Intellectual Property</h2>
            <p>The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Page Craft and its licensors. The Service is protected by copyright, trademark, and other laws of both the country and foreign countries.</p>

            <h2>5. Payment Terms</h2>
            <p>All payments for publishing packages, marketing services, and other paid features are due upfront unless a payment plan is explicitly agreed upon in writing. Royalties are paid out on a monthly basis, subject to a minimum threshold of $50.</p>

            <h2>6. Limitation of Liability</h2>
            <p>In no event shall Page Craft, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

            <h2>7. Changes</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
