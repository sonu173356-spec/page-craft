'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion } from '@/components/ui/Accordion';
import {
  Check,
  X,
  ShieldCheck,
  CreditCard,
  QrCode,
  Building,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Lock,
  ExternalLink,
  UserCheck,
} from 'lucide-react';
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
    name: 'Starter',
    price: '₹9,999',
    amount: 9999,
    description: 'Perfect for first-time authors.',
    features: ['Cover design', 'ISBN allocation', 'Indian distribution', '100% royalty', 'Personal manager'],
    missing: ['Editing', 'Custom typesetting', 'Global distribution', 'Marketing'],
    popular: false,
  },
  {
    name: 'Professional',
    price: '₹24,999',
    amount: 24999,
    description: 'Comprehensive publishing support.',
    features: [
      'Cover design',
      'ISBN allocation',
      'Global distribution',
      '100% royalty',
      'Personal manager',
      'Basic editing',
      '5 author copies',
      'Amazon ads setup',
      'Author interview',
    ],
    missing: ['Custom typesetting', 'Influencer marketing'],
    popular: true,
  },
  {
    name: 'Premium',
    price: '₹49,999',
    amount: 49999,
    description: 'Ultimate publishing experience.',
    features: [
      'Custom cover design',
      'ISBN allocation',
      'Global distribution',
      '100% royalty',
      'Personal manager',
      'Advanced editing',
      'Custom typesetting',
      '10 author copies',
      '30-day Amazon ads',
      'Amazon ranking strategy',
      'Influencer marketing',
    ],
    missing: [],
    popular: false,
  },
];

const faqs = [
  {
    id: 'faq-1',
    title: 'Do I keep 100% of my royalties?',
    content: 'Yes, absolutely. You retain all rights and 100% of the net royalties from sales.',
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const sourceParam = searchParams.get('source');

  // Author Access Popup state (triggered when navigated from publishing CTAs)
  const [showAccessPopup, setShowAccessPopup] = useState(false);

  useEffect(() => {
    if (sourceParam) {
      setShowAccessPopup(true);
    }
  }, [sourceParam]);

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
  const [purchaseId, setPurchaseId] = useState('');

  const handleOpenPaymentModal = (plan: PlanItem) => {
    setSelectedPlan(plan);
    setPaymentSuccess(false);
    setTransactionId('');
    setPurchaseId('');
  };

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorEmail) {
      toast.error('Please enter your author email address.');
      return;
    }

    setIsProcessing(true);

    try {
      const res = await fetch('/api/packages/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageName: selectedPlan?.name,
          packageId: selectedPlan?.name.toLowerCase(),
          amount: selectedPlan?.amount,
          authorName: authorName || 'Published Author',
          authorEmail,
          authorPhone,
          paymentMethod: paymentTab.toUpperCase(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Payment failed.');
      }

      const generatedTxnId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
      setTransactionId(generatedTxnId);
      setPurchaseId(data.purchaseId || 'PC-2026-000001');
      setPaymentSuccess(true);
      toast.success(`🎉 Payment of ${selectedPlan?.price} successful! Purchase ID: ${data.purchaseId}`);
    } catch (err: any) {
      toast.error(err.message || 'Payment processing failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFAF6] py-16 text-[#171717]">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading
          title="Choose Your Publishing Plan"
          subtitle="Transparent pricing. Keep 100% of your royalties."
        />

        {/* 3. AUTHOR ACCESS POPUP ON PACKAGES PAGE */}
        <AnimatePresence>
          {showAccessPopup && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-[#FBF8F2] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-[#E5DED3] text-[#171717]"
              >
                <button
                  onClick={() => setShowAccessPopup(false)}
                  className="absolute top-4 right-4 p-2 text-[#888888] hover:text-[#171717] hover:bg-[#F7F1E8] rounded-full transition-colors cursor-pointer"
                  aria-label="Close popup"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#F7F1E8] border border-[#E5DED3] flex items-center justify-center mx-auto text-[#8B1A1A]">
                    <BookOpen className="w-6 h-6" />
                  </div>

                  <div>
                    <h2 className="font-playfair text-2xl font-bold text-[#171717]">
                      Ready to publish your book?
                    </h2>
                    <p className="text-xs sm:text-sm text-[#666666] mt-1.5 leading-relaxed">
                      Select how you would like to proceed with your publishing journey:
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#E5DED3] text-left space-y-3 shadow-2xs">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#8B1A1A]">
                      Already purchased one of our packages?
                    </p>
                    <Link
                      href="/author/login"
                      className="w-full py-3 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      Login to Author Portal
                    </Link>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#E5DED3] text-left space-y-3 shadow-2xs">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#666666]">
                      Don&apos;t have a package yet?
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowAccessPopup(false)}
                      className="w-full py-2.5 bg-[#F7F1E8] hover:bg-[#EDE4D8] text-[#171717] font-semibold text-xs sm:text-sm rounded-xl transition-all border border-[#E5DED3] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>View & Purchase Packages</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-3xl shadow-xl border ${
                plan.popular ? 'border-[#8B1A1A] ring-2 ring-[#8B1A1A]/20 scale-105 z-10' : 'border-[#EDE4DB]'
              } p-8 flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8B1A1A] text-white px-4 py-1 rounded-full text-xs font-bold shadow-sm">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-playfair font-bold text-[#171717]">{plan.name}</h3>
              <p className="text-gray-500 text-sm mt-2">{plan.description}</p>
              <div className="my-6 text-4xl font-bold text-[#8B1A1A]">{plan.price}</div>
              <ul className="flex-1 space-y-3 text-xs font-medium text-gray-700">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start">
                    <Check className="h-4 w-4 text-green-600 mr-2 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li key={f} className="flex items-start opacity-40">
                    <X className="h-4 w-4 text-gray-400 mr-2 shrink-0 mt-0.5" />
                    <span className="line-through">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleOpenPaymentModal(plan)}
                className="w-full mt-8 py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
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
          <div className="mt-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#EDE4DB] shadow-sm">
            <Accordion items={faqs} />
          </div>
        </div>
      </div>

      {/* 💳 Author Package Payment Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 md:p-10 shadow-2xl relative space-y-6 border border-gray-100 my-auto max-h-[90vh] overflow-y-auto text-[#171717]"
            >
              <button
                onClick={() => setSelectedPlan(null)}
                className="absolute top-5 right-5 p-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors shadow-sm cursor-pointer z-10"
              >
                <X size={20} />
              </button>

              {paymentSuccess ? (
                /* Payment Success Confirmation & Purchase ID */
                <div className="text-center py-6 space-y-6">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Sparkles className="w-10 h-10 animate-bounce" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-bold font-playfair text-[#171717]">
                      Payment Successful! 🎉
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Unique Purchase ID:{' '}
                      <strong className="text-[#8B1A1A] font-mono text-base">{purchaseId || 'PC-2026-000001'}</strong>
                    </p>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 p-5 sm:p-6 rounded-2xl text-left text-xs sm:text-sm text-emerald-950 space-y-2.5">
                    <span className="font-bold block text-emerald-900 text-base border-b border-emerald-200/60 pb-2">
                      Official Publishing Receipt
                    </span>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Package:</span>
                      <strong className="text-gray-900">{selectedPlan.name} Publishing Plan</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Amount Paid:</span>
                      <strong className="text-[#8B1A1A] font-bold text-base">{selectedPlan.price}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Author Name:</span>
                      <strong className="text-gray-900">{authorName || 'Published Author'}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Author Email:</span>
                      <strong className="text-gray-900">{authorEmail}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Royalty:</span>
                      <strong className="text-emerald-700 font-bold">100% Net Royalty Retention</strong>
                    </p>
                  </div>

                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link
                      href={`/author/books/new?package=${encodeURIComponent(selectedPlan.name.toLowerCase())}&email=${encodeURIComponent(authorEmail)}`}
                      className="w-full py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Open DIY Book Studio
                    </Link>

                    <Link
                      href={`/author/signup?email=${encodeURIComponent(authorEmail)}&name=${encodeURIComponent(authorName)}&package=${encodeURIComponent(selectedPlan.name.toLowerCase())}&purchaseId=${purchaseId}`}
                      className="w-full py-3.5 bg-[#F7F1E8] hover:bg-[#EDE4D8] border border-[#E5DED3] text-[#171717] font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                    >
                      <UserCheck className="w-4 h-4" />
                      Create Author Account
                    </Link>
                  </div>
                </div>
              ) : (
                /* Interactive Payment Form */
                <form onSubmit={handleProcessPayment} className="space-y-6">
                  <div className="border-b pb-4">
                    <span className="px-3 py-1 bg-red-100 text-[#8B1A1A] text-xs font-bold rounded-full inline-block mb-2">
                      Secure Checkout
                    </span>
                    <h3 className="text-2xl font-playfair font-bold text-[#171717]">
                      {selectedPlan.name} Publishing Plan
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">Total Payable: <strong className="text-[#8B1A1A] text-sm">{selectedPlan.price}</strong></p>
                  </div>

                  {/* Author Details Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Author Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Eleanor Vance"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Author Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. eleanor@pagecraft.com"
                        value={authorEmail}
                        onChange={(e) => setAuthorEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]"
                      />
                    </div>
                  </div>

                  {/* Payment Tabs */}
                  <div className="grid grid-cols-4 gap-2 border border-gray-200 p-1 rounded-xl bg-gray-50 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setPaymentTab('upi')}
                      className={`py-2 rounded-lg transition-all ${paymentTab === 'upi' ? 'bg-[#8B1A1A] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      UPI / QR
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentTab('card')}
                      className={`py-2 rounded-lg transition-all ${paymentTab === 'card' ? 'bg-[#8B1A1A] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentTab('netbanking')}
                      className={`py-2 rounded-lg transition-all ${paymentTab === 'netbanking' ? 'bg-[#8B1A1A] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      NetBanking
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentTab('emi')}
                      className={`py-2 rounded-lg transition-all ${paymentTab === 'emi' ? 'bg-[#8B1A1A] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      EMI
                    </button>
                  </div>

                  {/* Tab Body */}
                  {paymentTab === 'upi' && (
                    <div className="space-y-4 text-center bg-amber-50/60 border border-amber-200/80 p-5 rounded-2xl text-xs">
                      <p className="text-gray-600">Scan QR Code using Google Pay, PhonePe, or Paytm:</p>
                      <div className="w-32 h-32 bg-white border border-gray-200 rounded-xl mx-auto flex items-center justify-center p-2 shadow-inner">
                        <QrCode className="w-24 h-24 text-gray-800" />
                      </div>
                      <p className="text-[11px] text-gray-500 font-mono">UPI ID: pagecraft.publishing@icici</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-98"
                  >
                    {isProcessing ? 'Verifying payment...' : `Pay ${selectedPlan.price} & Activate Author Desk`}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
