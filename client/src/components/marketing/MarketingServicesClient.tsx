'use client';

import React, { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Check, Megaphone, Star, Globe, ShieldCheck, X, Sparkles, ArrowRight, QrCode, CreditCard, Building, Clock, Video, TrendingUp, Users, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface MarketingPackage {
  id: string;
  name: string;
  price: string;
  amount: number;
  badge?: string;
  tagline: string;
  features: string[];
  popular?: boolean;
}

const marketingPackages: MarketingPackage[] = [
  {
    id: 'boost',
    name: 'Book Boost Package',
    price: '₹4,999',
    amount: 4999,
    tagline: 'Ideal for initial launch traction & local visibility.',
    features: [
      'Amazon Ads Campaign Setup & 7-Day Monitoring',
      '5 Verified Bookstagrammer Reviews',
      'Custom Social Media Graphics (Posters & Banner)',
      'Goodreads Giveaway & Listing Setup',
      'Targeted Reader Email Announcement',
    ],
  },
  {
    id: 'growth',
    name: 'Growth & PR Package',
    price: '₹14,999',
    amount: 14999,
    badge: 'Most Popular',
    popular: true,
    tagline: 'Comprehensive marketing push to reach thousands of readers.',
    features: [
      '30-Day Managed Amazon Sponsored Keyword Ads',
      '15 Verified Reader & Book Blogger Reviews',
      '1-Page Custom Author Portfolio Website',
      'National Digital PR Press Release (10+ News Portals)',
      'High-Impact Animated Book Trailer Video Reel',
      'Dedicated Author Brand Manager',
    ],
  },
  {
    id: 'bestseller',
    name: 'Bestseller Surge Package',
    price: '₹29,999',
    amount: 29999,
    badge: 'Ultimate Reach',
    tagline: 'Maximum media exposure & guaranteed Amazon Bestseller push.',
    features: [
      '60-Day Aggressive Multi-Channel Advertising (Amazon + Insta)',
      '30 Top Influencer & BookTok Video Feature Promotions',
      'Premium Custom Author Website with Domain & Hosting',
      'Print & National Media Press Release Coverage',
      'Virtual Author Launch Event & Podcast Feature',
      'Guaranteed Category Bestseller Rank Strategy',
      'Lifetime VIP Marketing Support',
    ],
  },
];

const marketingServicesList = [
  { title: 'Amazon Ads Strategy', desc: 'Target high-intent readers searching for your genre on Amazon.', icon: TrendingUp },
  { title: 'Social Media Campaigns', desc: 'Engaging Instagram Reels, Facebook posts, and YouTube shorts.', icon: Video },
  { title: 'Influencer Outreach', desc: 'Collaborate with top Bookstagrammers and Goodreads reviewers.', icon: Users },
  { title: 'Editorial Book Reviews', desc: 'Get reviewed by trusted literary blogs and magazine editors.', icon: Star },
  { title: 'Author Branding', desc: 'Build your personal brand with a professional author website.', icon: Globe },
  { title: 'Email Newsletter Push', desc: 'Send your book directly to over 50,000 active readers.', icon: Mail },
];

export default function MarketingServicesClient() {
  const [selectedPkg, setSelectedPkg] = useState<MarketingPackage | null>(null);
  const [paymentTab, setPaymentTab] = useState<'upi' | 'card' | 'netbanking' | 'emi'>('upi');
  
  // Form State
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorPhone, setAuthorPhone] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [upiId, setUpiId] = useState('');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [txnId, setTxnId] = useState('');

  const handleOpenCheckout = (pkg: MarketingPackage) => {
    setSelectedPkg(pkg);
    setPaymentSuccess(false);
    setTxnId('');
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedTxn = `MKT-${Math.floor(100000 + Math.random() * 900000)}`;
      setTxnId(generatedTxn);
      setIsProcessing(false);
      setPaymentSuccess(true);
      toast.success(`🚀 Marketing package booked successfully! Receipt: ${generatedTxn}`);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#FDFAF6] py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading title="Get Your Book Noticed" subtitle="Targeted marketing campaigns designed to boost book sales & reader reviews." />

        {/* Marketing Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {marketingServicesList.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-all">
                <div className="bg-[#8B1A1A]/10 text-[#8B1A1A] p-3 rounded-xl shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base font-playfair">{s.title}</h3>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 🌟 Tailored Marketing Packages Section */}
        <div className="mt-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-3 py-1 bg-red-100 text-[#8B1A1A] text-xs font-bold rounded-full uppercase tracking-wider">
              Marketing Packages
            </span>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#1A1A2E] mt-3">
              Choose Your Book Promotion Plan
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              All packages include dedicated ad management, verified reader reviews, and campaign analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {marketingPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-3xl p-8 shadow-xl border flex flex-col justify-between ${
                  pkg.popular ? 'border-[#C5A55A] scale-105 z-10' : 'border-gray-100'
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8B1A1A] text-white px-4 py-1 rounded-full text-xs font-bold shadow-md">
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-playfair font-bold text-[#1A1A2E]">{pkg.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 min-h-[36px]">{pkg.tagline}</p>
                  
                  <div className="my-6">
                    <span className="text-4xl font-bold text-[#8B1A1A]">{pkg.price}</span>
                    <span className="text-xs text-gray-400 font-medium ml-2">/ campaign</span>
                  </div>

                  <ul className="space-y-3.5 text-xs text-gray-700 font-medium border-t pt-6 border-gray-100">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start">
                        <Check className="w-4 h-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleOpenCheckout(pkg)}
                  className="w-full mt-8 py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-full font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Megaphone className="w-4 h-4" />
                  Book Package & Pay
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 💳 Marketing Package Payment Modal */}
      <AnimatePresence>
        {selectedPkg && (
          <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 md:p-10 shadow-2xl relative space-y-6 border border-gray-100 my-auto max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedPkg(null)}
                className="absolute top-5 right-5 p-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors shadow-sm cursor-pointer z-10"
              >
                <X size={20} />
              </button>

              {paymentSuccess ? (
                /* Payment Success View */
                <div className="text-center py-6 space-y-6">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Sparkles className="w-10 h-10 animate-bounce" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-bold font-playfair text-[#1A1A2E]">Marketing Booked! 🚀</h3>
                    <p className="text-sm text-gray-500">Transaction ID: <strong className="text-gray-900 font-mono text-base">{txnId}</strong></p>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 p-5 sm:p-6 rounded-2xl text-left text-sm text-emerald-950 space-y-2.5">
                    <span className="font-bold block text-emerald-900 text-base border-b border-emerald-200/60 pb-2">Order Summary</span>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Marketing Package:</span>
                      <strong className="text-gray-900">{selectedPkg.name}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Book Title:</span>
                      <strong className="text-gray-900">{bookTitle || 'My Published Book'}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Amount Paid:</span>
                      <strong className="text-[#8B1A1A] font-bold text-base">{selectedPkg.price}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Author Name:</span>
                      <strong className="text-gray-900">{authorName || 'Published Author'}</strong>
                    </p>
                  </div>

                  <div className="pt-2">
                    <a
                      href="/author/dashboard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold rounded-2xl text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2.5"
                    >
                      Track Campaign in Author Portal <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              ) : (
                /* Payment Modal Form */
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <span className="px-3 py-1 bg-red-100 text-[#8B1A1A] text-xs font-bold rounded-full inline-block mb-2">Secure Checkout</span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-playfair text-[#1A1A2E]">
                      {selectedPkg.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Total Payable: <strong className="text-[#8B1A1A] text-lg font-bold ml-1">{selectedPkg.price}</strong>
                    </p>
                  </div>

                  <form onSubmit={handleProcessPayment} className="space-y-5">
                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs sm:text-sm font-bold text-gray-700">Author Full Name</label>
                        <input
                          type="text"
                          required
                          value={authorName}
                          onChange={e => setAuthorName(e.target.value)}
                          placeholder="e.g. Ananya Roy"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs sm:text-sm font-bold text-gray-700">Book Title</label>
                        <input
                          type="text"
                          required
                          value={bookTitle}
                          onChange={e => setBookTitle(e.target.value)}
                          placeholder="e.g. Shadows of Destiny"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs sm:text-sm font-bold text-gray-700">Mobile Number</label>
                        <input
                          type="tel"
                          required
                          value={authorPhone}
                          onChange={e => setAuthorPhone(e.target.value)}
                          placeholder="+91 9876543210"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs sm:text-sm font-bold text-gray-700">Email Address</label>
                        <input
                          type="email"
                          required
                          value={authorEmail}
                          onChange={e => setAuthorEmail(e.target.value)}
                          placeholder="author@example.com"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] transition-all"
                        />
                      </div>
                    </div>

                    {/* Payment Tabs */}
                    <div className="space-y-2.5 pt-1">
                      <label className="block text-xs sm:text-sm font-bold text-gray-800">Select Payment Method:</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-bold text-center">
                        <button
                          type="button"
                          onClick={() => setPaymentTab('upi')}
                          className={`py-3 px-2 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                            paymentTab === 'upi' ? 'border-[#8B1A1A] bg-red-50/80 text-[#8B1A1A] ring-2 ring-[#8B1A1A]/20 shadow-sm' : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <QrCode className="w-5 h-5" /> UPI / QR
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentTab('card')}
                          className={`py-3 px-2 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                            paymentTab === 'card' ? 'border-[#8B1A1A] bg-red-50/80 text-[#8B1A1A] ring-2 ring-[#8B1A1A]/20 shadow-sm' : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <CreditCard className="w-5 h-5" /> Card
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentTab('netbanking')}
                          className={`py-3 px-2 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                            paymentTab === 'netbanking' ? 'border-[#8B1A1A] bg-red-50/80 text-[#8B1A1A] ring-2 ring-[#8B1A1A]/20 shadow-sm' : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <Building className="w-5 h-5" /> NetBanking
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentTab('emi')}
                          className={`py-3 px-2 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                            paymentTab === 'emi' ? 'border-[#8B1A1A] bg-red-50/80 text-[#8B1A1A] ring-2 ring-[#8B1A1A]/20 shadow-sm' : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <Clock className="w-5 h-5" /> EMI
                        </button>
                      </div>
                    </div>

                    {/* Tab Panels */}
                    {paymentTab === 'upi' && (
                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-3 text-center">
                        <p className="text-xs sm:text-sm text-gray-600 font-medium">Scan QR Code using GPay, PhonePe, Paytm, or BHIM:</p>
                        <div className="w-36 h-36 bg-white border border-gray-300 mx-auto rounded-xl flex items-center justify-center p-2.5 shadow-sm">
                          <img src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=upi://pay?pa=pagecraft@upi" alt="UPI QR Code" className="w-full h-full object-contain" />
                        </div>
                        <input
                          type="text"
                          placeholder="Or enter VPA ID (e.g. author@paytm)"
                          value={upiId}
                          onChange={e => setUpiId(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#8B1A1A]/20"
                        />
                      </div>
                    )}

                    {paymentTab === 'card' && (
                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-3">
                        <input type="text" placeholder="Card Number (4532 •••• •••• 8892)" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#8B1A1A]/20" required />
                        <div className="grid grid-cols-2 gap-3">
                          <input type="text" placeholder="MM/YY" className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#8B1A1A]/20" required />
                          <input type="password" maxLength={3} placeholder="CVV" className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#8B1A1A]/20" required />
                        </div>
                      </div>
                    )}

                    {paymentTab === 'netbanking' && (
                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-3">
                        <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#8B1A1A]/20">
                          <option>HDFC Bank</option>
                          <option>State Bank of India (SBI)</option>
                          <option>ICICI Bank</option>
                          <option>Axis Bank</option>
                          <option>Kotak Mahindra</option>
                        </select>
                      </div>
                    )}

                    {paymentTab === 'emi' && (
                      <div className="p-4 bg-[#8B1A1A]/5 border border-[#8B1A1A]/15 rounded-2xl space-y-2 text-gray-800 text-xs sm:text-sm">
                        <p className="flex justify-between items-center">
                          <span>• 3 Months No-Cost EMI:</span>
                          <strong className="text-[#8B1A1A] font-bold text-base">₹{(selectedPkg.amount / 3).toFixed(0)}/mo</strong>
                        </p>
                        <p className="flex justify-between items-center">
                          <span>• 6 Months Easy EMI:</span>
                          <strong className="text-[#8B1A1A] font-bold text-base">₹{(selectedPkg.amount / 6).toFixed(0)}/mo</strong>
                        </p>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full py-4 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold rounded-2xl text-sm sm:text-base shadow-lg shadow-[#8B1A1A]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isProcessing ? 'Verifying Campaign Payment...' : `Pay ${selectedPkg.price} & Launch Campaign`}
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
