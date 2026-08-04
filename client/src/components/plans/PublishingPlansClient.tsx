'use client';

import React, { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion } from '@/components/ui/Accordion';
import { Check, X, ShieldCheck, CreditCard, QrCode, Building, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface PlanItem {
  name: string;
  price: string;
  amount: number;
  description: string;
  features: string[];
  missing: string[];
  popular: boolean;
}

const plans: PlanItem[] = [
  {
    name: 'Starter', price: '₹9,999', amount: 9999,
    description: 'Perfect for first-time authors.',
    features: ['Cover design', 'ISBN allocation', 'Indian distribution', '100% royalty', 'Personal manager'],
    missing: ['Editing', 'Custom typesetting', 'Global distribution', 'Marketing'],
    popular: false,
  },
  {
    name: 'Professional', price: '₹24,999', amount: 24999,
    description: 'Comprehensive publishing support.',
    features: ['Cover design', 'ISBN allocation', 'Global distribution', '100% royalty', 'Personal manager', 'Basic editing', '5 author copies', 'Amazon ads setup', 'Author interview'],
    missing: ['Custom typesetting', 'Influencer marketing'],
    popular: true,
  },
  {
    name: 'Premium', price: '₹49,999', amount: 49999,
    description: 'Ultimate publishing experience.',
    features: ['Custom cover design', 'ISBN allocation', 'Global distribution', '100% royalty', 'Personal manager', 'Advanced editing', 'Custom typesetting', '10 author copies', '30-day Amazon ads', 'Amazon ranking strategy', 'Influencer marketing'],
    missing: [],
    popular: false,
  }
];

const faqs = [
  {
    id: 'faq-1',
    title: 'Do I keep 100% of my royalties?',
    content: 'Yes, absolutely. You retain all rights and 100% of the net royalties.',
  },
  {
    id: 'faq-2',
    title: 'How long does the publishing process take?',
    content: 'Our standard publishing timeline is 30 to 45 days after manuscript submission.',
  },
  {
    id: 'faq-3',
    title: 'Can I upgrade my plan later?',
    content: 'Yes! You can upgrade your publishing plan at any stage before final printing.',
  },
];

export default function PublishingPlansClient() {
  const [selectedPlan, setSelectedPlan] = useState<PlanItem | null>(null);
  const [paymentTab, setPaymentTab] = useState<'upi' | 'card' | 'netbanking' | 'emi'>('upi');
  
  // Author Form State
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorPhone, setAuthorPhone] = useState('');
  const [upiId, setUpiId] = useState('');

  // Payment Processing State
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const handleOpenPaymentModal = (plan: PlanItem) => {
    setSelectedPlan(plan);
    setPaymentSuccess(false);
    setTransactionId('');
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedTxnId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
      setTransactionId(generatedTxnId);
      setIsProcessing(false);
      setPaymentSuccess(true);
      toast.success(`🎉 Payment of ${selectedPlan?.price} successful! Receipt: ${generatedTxnId}`);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#FDFAF6] py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading title="Choose Your Publishing Plan" subtitle="Transparent pricing. No hidden fees." />
        
        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative bg-white rounded-2xl shadow-xl border ${plan.popular ? 'border-[#C5A55A] scale-105 z-10' : 'border-gray-100'} p-8 flex flex-col`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8B1A1A] text-white px-4 py-1 rounded-full text-sm font-bold">Most Popular</div>
              )}
              <h3 className="text-2xl font-playfair font-bold text-[#1A1A2E]">{plan.name}</h3>
              <p className="text-gray-500 text-sm mt-2">{plan.description}</p>
              <div className="my-6 text-4xl font-bold text-[#8B1A1A]">{plan.price}</div>
              <ul className="flex-1 space-y-4 text-xs font-medium text-gray-700">
                {plan.features.map(f => <li key={f} className="flex items-start"><Check className="h-4 w-4 text-green-600 mr-2 shrink-0 mt-0.5" /><span>{f}</span></li>)}
                {plan.missing.map(f => <li key={f} className="flex items-start opacity-40"><X className="h-4 w-4 text-gray-400 mr-2 shrink-0 mt-0.5" /><span className="line-through">{f}</span></li>)}
              </ul>
              
              <button
                onClick={() => handleOpenPaymentModal(plan)}
                className="w-full mt-8 py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                Get Started & Pay
                <ShieldCheck className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="mt-24 max-w-4xl mx-auto">
          <SectionHeading title="Frequently Asked Questions" />
          <div className="mt-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <Accordion items={faqs} />
          </div>
        </div>
      </div>

      {/* 💳 Author Package Payment Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl overflow-hidden relative space-y-5 border border-gray-100"
            >
              <button
                onClick={() => setSelectedPlan(null)}
                className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>

              {paymentSuccess ? (
                /* Payment Success Confirmation */
                <div className="text-center py-6 space-y-5">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Sparkles className="w-8 h-8 animate-bounce" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold font-playfair text-[#1A1A2E]">Payment Successful! 🎉</h3>
                    <p className="text-xs text-gray-500">Transaction ID: <strong className="text-gray-900 font-mono">{transactionId}</strong></p>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-left text-xs text-emerald-950 space-y-1.5">
                    <span className="font-bold block text-emerald-900">Receipt Summary:</span>
                    <p>• Package: <strong>{selectedPlan.name} Publishing Plan</strong></p>
                    <p>• Amount Paid: <strong className="text-[#8B1A1A]">{selectedPlan.price}</strong></p>
                    <p>• Author Name: <strong>{authorName || 'Published Author'}</strong></p>
                    <p>• Royalty: <strong>100% Net Royalty Retention</strong></p>
                  </div>

                  <div className="pt-2">
                    <a
                      href="/author/upload-book"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      Proceed to Upload Manuscript <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ) : (
                /* Interactive Payment Form */
                <div className="space-y-4">
                  <div className="border-b pb-3">
                    <span className="px-2.5 py-0.5 bg-red-100 text-[#8B1A1A] text-[10px] font-bold rounded-full">Secure Checkout</span>
                    <h3 className="text-xl font-bold font-playfair text-[#1A1A2E] mt-1">
                      {selectedPlan.name} Package Checkout
                    </h3>
                    <p className="text-xs text-gray-500">Total Payable: <strong className="text-[#8B1A1A] text-sm">{selectedPlan.price}</strong></p>
                  </div>

                  <form onSubmit={handleProcessPayment} className="space-y-4 text-xs">
                    {/* Author Details Inputs */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-bold text-gray-600">Author Full Name</label>
                        <input
                          type="text"
                          required
                          value={authorName}
                          onChange={e => setAuthorName(e.target.value)}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#8B1A1A]/20"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-gray-600">Mobile Number</label>
                        <input
                          type="tel"
                          required
                          value={authorPhone}
                          onChange={e => setAuthorPhone(e.target.value)}
                          placeholder="+91 9876543210"
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#8B1A1A]/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-gray-600">Email Address</label>
                      <input
                        type="email"
                        required
                        value={authorEmail}
                        onChange={e => setAuthorEmail(e.target.value)}
                        placeholder="author@example.com"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#8B1A1A]/20"
                      />
                    </div>

                    {/* Payment Method Tabs */}
                    <div className="space-y-2 pt-1">
                      <label className="font-bold text-gray-700 block">Select Payment Method:</label>
                      <div className="grid grid-cols-4 gap-2 text-[10px] font-bold text-center">
                        <button
                          type="button"
                          onClick={() => setPaymentTab('upi')}
                          className={`py-2 px-1 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                            paymentTab === 'upi' ? 'border-[#8B1A1A] bg-red-50 text-[#8B1A1A]' : 'border-gray-200 bg-gray-50 text-gray-600'
                          }`}
                        >
                          <QrCode className="w-4 h-4" /> UPI / QR
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentTab('card')}
                          className={`py-2 px-1 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                            paymentTab === 'card' ? 'border-[#8B1A1A] bg-red-50 text-[#8B1A1A]' : 'border-gray-200 bg-gray-50 text-gray-600'
                          }`}
                        >
                          <CreditCard className="w-4 h-4" /> Card
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentTab('netbanking')}
                          className={`py-2 px-1 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                            paymentTab === 'netbanking' ? 'border-[#8B1A1A] bg-red-50 text-[#8B1A1A]' : 'border-gray-200 bg-gray-50 text-gray-600'
                          }`}
                        >
                          <Building className="w-4 h-4" /> NetBanking
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentTab('emi')}
                          className={`py-2 px-1 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                            paymentTab === 'emi' ? 'border-[#8B1A1A] bg-red-50 text-[#8B1A1A]' : 'border-gray-200 bg-gray-50 text-gray-600'
                          }`}
                        >
                          <Clock className="w-4 h-4" /> EMI
                        </button>
                      </div>
                    </div>

                    {/* Dynamic Tab Body */}
                    {paymentTab === 'upi' && (
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2 text-center">
                        <p className="text-[11px] text-gray-600 font-medium">Scan QR Code using GPay, PhonePe, Paytm, or BHIM:</p>
                        <div className="w-32 h-32 bg-white border border-gray-300 mx-auto rounded-lg flex items-center justify-center p-2">
                          <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=pagecraft@upi" alt="UPI QR Code" className="w-full h-full object-contain" />
                        </div>
                        <input
                          type="text"
                          placeholder="Or enter VPA ID (e.g. 9876543210@paytm)"
                          value={upiId}
                          onChange={e => setUpiId(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                        />
                      </div>
                    )}

                    {paymentTab === 'card' && (
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
                        <input type="text" placeholder="Card Number (4532 •••• •••• 8892)" className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs" required />
                        <div className="grid grid-cols-2 gap-2">
                          <input type="text" placeholder="MM/YY" className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs" required />
                          <input type="password" maxLength={3} placeholder="CVV" className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs" required />
                        </div>
                      </div>
                    )}

                    {paymentTab === 'netbanking' && (
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
                        <select className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium">
                          <option>HDFC Bank</option>
                          <option>State Bank of India (SBI)</option>
                          <option>ICICI Bank</option>
                          <option>Axis Bank</option>
                          <option>Kotak Mahindra</option>
                        </select>
                      </div>
                    )}

                    {paymentTab === 'emi' && (
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-1 text-gray-700 text-[11px]">
                        <p>• 3 Months No-Cost EMI: <strong>₹{(selectedPlan.amount / 3).toFixed(0)}/mo</strong></p>
                        <p>• 6 Months Easy EMI: <strong>₹{(selectedPlan.amount / 6).toFixed(0)}/mo</strong></p>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full py-3 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isProcessing ? 'Verifying Payment...' : `Pay ${selectedPlan.price} Now`}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
