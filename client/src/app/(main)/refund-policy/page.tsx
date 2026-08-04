import React from 'react';
import { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Refund Policy | Page Craft',
  description: 'Refund policy for publishing services at Page Craft.',
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-ivory min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Refund Policy' }
          ]} 
          className="mb-8"
        />
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-6">Refund Policy</h1>
          <p className="text-gray-500 mb-8">Last Updated: August 2026</p>
          
          <div className="prose prose-lg max-w-none prose-headings:font-playfair prose-headings:text-charcoal prose-a:text-primary hover:prose-a:text-primary-dark">
            <h2>Overview</h2>
            <p>At Page Craft, we strive to ensure 100% satisfaction with our publishing services. However, we understand that situations may arise where a refund is requested. This policy outlines the conditions under which refunds are provided.</p>

            <h2>Publishing Services</h2>
            <p>For our core publishing packages, we offer a refund policy based on the stage of the publishing process:</p>
            <ul>
              <li><strong>Before Formatting/Editing Begins:</strong> 100% refund, minus a $50 administrative fee.</li>
              <li><strong>During Formatting/Editing:</strong> 50% refund, as work has already commenced and resources have been allocated.</li>
              <li><strong>After Final Proof Approval:</strong> No refunds are possible once the book has been sent for final print or digital distribution.</li>
            </ul>

            <h2>Physical Book Orders</h2>
            <p>If you have ordered physical copies of your book or any other printed materials from us, refunds or replacements are only issued if:</p>
            <ul>
              <li>The books arrive damaged due to shipping.</li>
              <li>There is a verified manufacturing defect (e.g., missing pages, upside-down printing).</li>
            </ul>
            <p>You must notify us within 14 days of receiving your order to be eligible for a replacement or refund for physical books.</p>

            <h2>Process Timeline</h2>
            <p>Approved refunds are processed within 5-7 business days and will be credited back to your original method of payment. Depending on your bank or credit card company, it may take an additional 2-10 business days for the funds to appear in your account.</p>

            <h2>Contact Us</h2>
            <p>To request a refund or if you have any questions about this policy, please contact our support team at billing@pagecraft.com with your order number and details of your request.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
