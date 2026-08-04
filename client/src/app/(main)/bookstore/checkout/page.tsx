import { Metadata } from 'next';
import React from 'react';
import CheckoutClient from './CheckoutClient';

export const metadata: Metadata = {
  title: 'Checkout | Page Craft',
  description: 'Complete your purchase securely.',
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
