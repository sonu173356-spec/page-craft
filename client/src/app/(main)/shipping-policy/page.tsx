import React from 'react';
import { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Shipping Policy | Page Craft',
  description: 'Shipping policy for physical book orders at Page Craft.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-ivory min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shipping Policy' }
          ]} 
          className="mb-8"
        />
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-6">Shipping Policy</h1>
          <p className="text-gray-500 mb-8">Last Updated: August 2026</p>
          
          <div className="prose prose-lg max-w-none prose-headings:font-playfair prose-headings:text-charcoal prose-a:text-primary hover:prose-a:text-primary-dark">
            <h2>Order Processing Time</h2>
            <p>All physical book orders are processed within 2-3 business days. Print-on-demand orders require an additional 3-5 business days for printing before they are shipped. Orders are not shipped or delivered on weekends or holidays.</p>
            <p>If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery. If there will be a significant delay in shipment of your order, we will contact you via email.</p>

            <h2>Shipping Rates & Delivery Estimates</h2>
            <p>Shipping charges for your order will be calculated and displayed at checkout. Delivery delays can occasionally occur.</p>
            
            <h3>Domestic Shipping</h3>
            <ul>
              <li><strong>Standard Shipping:</strong> 5-7 business days.</li>
              <li><strong>Expedited Shipping:</strong> 2-3 business days.</li>
            </ul>

            <h3>International Shipping</h3>
            <ul>
              <li><strong>Standard International:</strong> 10-21 business days.</li>
              <li><strong>Express International:</strong> 5-10 business days.</li>
            </ul>

            <h2>Shipment Confirmation & Order Tracking</h2>
            <p>You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</p>

            <h2>Customs, Duties and Taxes</h2>
            <p>Page Craft is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).</p>

            <h2>Damages</h2>
            <p>If you received your order damaged, please refer to our Refund Policy and contact our support team immediately so we can arrange a replacement.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
