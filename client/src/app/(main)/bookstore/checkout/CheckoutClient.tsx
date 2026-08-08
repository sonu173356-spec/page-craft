'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CreditCard, Truck, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/store';
import Link from 'next/link';
import Image from 'next/image';
import RealisticBookCover from '@/components/ui/RealisticBookCover';

const STEPS = ['Cart Review', 'Shipping', 'Payment', 'Confirmation'];

export default function CheckoutClient() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0 && currentStep !== 3) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4">
        <ShoppingBag className="w-20 h-20 text-gray-300 mb-6" />
        <h2 className="font-playfair text-3xl font-bold text-[#1A1A2E] mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added any books to your cart yet.</p>
        <Link href="/bookstore" className="bg-[#8B1A1A] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#722F37] transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const subtotal = getTotal();
  const shipping = 5.00;
  const total = subtotal + shipping;

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      setCurrentStep(3); // Confirmation
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FDFAF6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Step Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#8B1A1A] -z-10 rounded-full transition-all duration-500" style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}></div>
            {STEPS.map((step, index) => (
              <div key={step} className="flex flex-col items-center gap-2 bg-[#FDFAF6] px-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${currentStep >= index ? 'bg-[#8B1A1A] text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {currentStep > index ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${currentStep >= index ? 'text-[#1A1A2E]' : 'text-gray-400'}`}>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-10"
            >
              {currentStep === 0 && (
                <div className="space-y-8">
                  <h2 className="font-playfair text-2xl font-bold text-[#1A1A2E]">Review Your Order</h2>
                  <div className="space-y-4">
                    {items.map(item => (
                      <div key={`${item.book.id}-${item.format}`} className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-4">
                          <RealisticBookCover book={item.book} size="sm" />
                          <div>
                            <h3 className="font-medium text-[#1A1A2E]">{item.book.title}</h3>
                            <p className="text-sm text-gray-500 capitalize">{item.format} x {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-bold text-[#1A1A2E]">₹{(item.book.price * (item.book.price < 100 ? 25 : 1) * item.quantity).toFixed(0)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl space-y-3">
                    <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between text-gray-600"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
                    <div className="flex justify-between text-xl font-bold text-[#1A1A2E] pt-3 border-t border-gray-200">
                      <span>Total</span><span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <button onClick={handleNext} className="bg-[#8B1A1A] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#722F37] transition-colors">
                      Continue to Shipping
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-8">
                  <h2 className="font-playfair text-2xl font-bold text-[#1A1A2E] flex items-center gap-2"><Truck className="w-6 h-6"/> Shipping Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2"><label className="text-sm font-medium text-gray-700">First Name</label><input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#8B1A1A] focus:outline-none" defaultValue="John" /></div>
                    <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Last Name</label><input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#8B1A1A] focus:outline-none" defaultValue="Doe" /></div>
                    <div className="space-y-2 md:col-span-2"><label className="text-sm font-medium text-gray-700">Address</label><input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#8B1A1A] focus:outline-none" defaultValue="123 Publisher St" /></div>
                    <div className="space-y-2"><label className="text-sm font-medium text-gray-700">City</label><input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#8B1A1A] focus:outline-none" defaultValue="New York" /></div>
                    <div className="space-y-2"><label className="text-sm font-medium text-gray-700">ZIP Code</label><input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#8B1A1A] focus:outline-none" defaultValue="10001" /></div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <button onClick={handleBack} className="px-6 py-3 text-gray-500 hover:text-[#1A1A2E] font-medium">Back</button>
                    <button onClick={handleNext} className="bg-[#8B1A1A] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#722F37] transition-colors">
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8">
                  <h2 className="font-playfair text-2xl font-bold text-[#1A1A2E] flex items-center gap-2"><CreditCard className="w-6 h-6"/> Payment Method</h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-center gap-4 p-4 border border-[#8B1A1A] bg-[#8B1A1A]/5 rounded-xl cursor-pointer">
                      <input type="radio" name="payment" defaultChecked className="text-[#8B1A1A] focus:ring-[#8B1A1A] w-5 h-5" />
                      <div>
                        <span className="block font-medium text-[#1A1A2E]">Credit Card</span>
                        <span className="text-sm text-gray-500">Secure encrypted payment</span>
                      </div>
                    </label>
                    <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer">
                      <input type="radio" name="payment" className="text-[#8B1A1A] focus:ring-[#8B1A1A] w-5 h-5" />
                      <div>
                        <span className="block font-medium text-[#1A1A2E]">PayPal</span>
                        <span className="text-sm text-gray-500">Fast and secure checkout</span>
                      </div>
                    </label>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-600"><ShieldCheck className="w-5 h-5" /> <span className="text-sm font-medium">SSL Encrypted Checkout</span></div>
                    <span className="font-bold text-xl text-[#1A1A2E]">Total: ${total.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button onClick={handleBack} className="px-6 py-3 text-gray-500 hover:text-[#1A1A2E] font-medium" disabled={isProcessing}>Back</button>
                    <button onClick={handlePayment} disabled={isProcessing} className="bg-[#8B1A1A] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#722F37] transition-colors flex items-center gap-2 disabled:opacity-70">
                      {isProcessing ? 'Processing...' : 'Place Order'}
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="text-center py-12 space-y-6">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-6">
                    <Check className="w-12 h-12" />
                  </div>
                  <h2 className="font-playfair text-4xl font-bold text-[#1A1A2E]">Order Confirmed!</h2>
                  <p className="text-gray-600 text-lg">Thank you for your purchase. Your order #ORD-{Math.floor(Math.random() * 100000)} is being processed.</p>
                  <p className="text-gray-500">We've sent a confirmation email to john.doe@example.com</p>
                  <div className="pt-8">
                    <Link href="/bookstore" className="bg-[#8B1A1A] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#722F37] transition-colors inline-block cursor-pointer">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
