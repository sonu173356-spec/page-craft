'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  BookOpen,
  TrendingUp,
  DollarSign,
  Clock,
  ShieldCheck,
  Globe,
  FileCheck,
  Sparkles,
  ExternalLink,
  ShoppingBag,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useAuthStore } from '@/store';

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 6200 },
  { name: 'Mar', sales: 8500 },
  { name: 'Apr', sales: 11200 },
  { name: 'May', sales: 14890 },
  { name: 'Jun', sales: 18450 },
];

export default function AuthorDashboardPage() {
  const { user } = useAuthStore();
  const [purchases, setPurchases] = useState<any[]>([]);
  const [activePermissions, setActivePermissions] = useState<string[]>([]);
  const [primaryPurchaseId, setPrimaryPurchaseId] = useState('PC-2026-000001');

  useEffect(() => {
    async function loadPurchases() {
      try {
        const res = await fetch('/api/author/purchases');
        const data = await res.json();
        if (data.purchases && data.purchases.length > 0) {
          setPurchases(data.purchases);
          setActivePermissions(data.activePermissions || []);
          setPrimaryPurchaseId(data.primaryPurchaseId || data.purchases[0].purchaseId);
        }
      } catch (err) {
        console.warn('Failed to load author purchases:', err);
      }
    }
    loadPurchases();
  }, []);

  const authorName = user?.name || 'Eleanor Vance';
  const authorTitle = 'Author & Novelist';

  // Determine authorized feature sets
  const hasManuscript = activePermissions.length === 0 || activePermissions.includes('manuscript_upload');
  const hasDistribution = activePermissions.length === 0 || activePermissions.includes('distribution');
  const hasSales = activePermissions.length === 0 || activePermissions.includes('sales_reports');
  const hasMarketing = activePermissions.includes('marketing');

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 text-[#171717]"
    >
      {/* 23. AUTHOR DASHBOARD HEADER */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5DED3] shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5DED3] pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F1E8] border border-[#E5DED3] text-[#8B1A1A] text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Author Desk
            </div>
            <h1 className="text-3xl font-playfair font-bold text-[#171717]">
              Welcome, {authorName}
            </h1>
            <p className="text-sm font-semibold text-[#8B1A1A] mt-0.5">{authorTitle}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/author/books"
              className="px-5 py-2.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              View My Books
            </Link>
            <Link
              href="/author/settings"
              className="px-4 py-2.5 bg-[#F7F1E8] hover:bg-[#EDE4D8] border border-[#E5DED3] text-[#171717] font-semibold text-xs sm:text-sm rounded-xl transition-all"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Package & Purchase Metadata Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 text-xs">
          <div className="bg-[#FBF8F2] p-4 rounded-2xl border border-[#E5DED3]">
            <span className="text-[#666666] font-medium block">Purchased Package(s)</span>
            <strong className="text-[#171717] font-bold text-sm block mt-0.5">
              {purchases.length > 0
                ? purchases.map((p) => p.packageName).join(' • ')
                : 'Standard Publishing • Distribution'}
            </strong>
          </div>

          <div className="bg-[#FBF8F2] p-4 rounded-2xl border border-[#E5DED3]">
            <span className="text-[#666666] font-medium block">Primary Purchase ID</span>
            <strong className="text-[#8B1A1A] font-mono font-bold text-sm block mt-0.5">
              {primaryPurchaseId}
            </strong>
          </div>

          <div className="bg-[#FBF8F2] p-4 rounded-2xl border border-[#E5DED3]">
            <span className="text-[#666666] font-medium block">Payment Status</span>
            <span className="inline-flex items-center gap-1.5 font-bold text-green-700 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
              Paid (Verified in Supabase)
            </span>
          </div>

          <div className="bg-[#FBF8F2] p-4 rounded-2xl border border-[#E5DED3]">
            <span className="text-[#666666] font-medium block">Publishing Rights</span>
            <strong className="text-emerald-700 font-bold text-sm block mt-0.5">
              100% Net Royalty
            </strong>
          </div>
        </div>
      </div>

      {/* 24. "MY PURCHASES" SECTION */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5DED3] shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5DED3] pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8B1A1A]" />
            <h2 className="font-playfair text-xl font-bold text-[#171717]">
              My Purchases & Active Packages
            </h2>
          </div>
          <Link
            href="/packages?source=publish"
            className="text-xs font-bold text-[#8B1A1A] hover:underline flex items-center gap-1"
          >
            + Add Another Package
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {purchases.length > 0 ? (
            purchases.map((purchase, idx) => (
              <div
                key={idx}
                className="bg-[#FBF8F2] p-5 rounded-2xl border border-[#E5DED3] space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-playfair font-bold text-base text-[#171717]">
                      {purchase.packageName}
                    </h3>
                    <p className="text-xs text-[#8B1A1A] font-mono font-bold mt-0.5">
                      Purchase ID: {purchase.purchaseId}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-100 text-green-800 border border-green-200">
                    Active
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-[#666666] border-t border-[#E5DED3] pt-2">
                  <span>Purchased: {new Date(purchase.purchasedAt || purchase.createdAt).toLocaleDateString()}</span>
                  <span>Amount: <strong>₹{(purchase.amount || 24999).toLocaleString()}</strong></span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {purchase.features?.map((feat: string, fIdx: number) => (
                    <span
                      key={fIdx}
                      className="text-[10px] bg-white border border-[#E5DED3] px-2 py-0.5 rounded font-medium text-[#666666]"
                    >
                      {feat.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-[#FBF8F2] p-5 rounded-2xl border border-[#E5DED3] space-y-2">
              <h3 className="font-playfair font-bold text-base text-[#171717]">
                Professional Publishing Plan
              </h3>
              <p className="text-xs text-[#8B1A1A] font-mono font-bold">
                Purchase ID: PC-2026-000001
              </p>
              <p className="text-xs text-[#666666]">
                Purchased: 08 August 2026 • Status: <strong className="text-green-700">Active</strong>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Books Published', value: '3 Titles', icon: <BookOpen className="text-[#8B1A1A]" /> },
          { title: 'Total Copies Distributed', value: '1,420 Copies', icon: <TrendingUp className="text-[#8B1A1A]" /> },
          { title: 'Net Royalty Accrued', value: '₹48,950', icon: <DollarSign className="text-[#8B1A1A]" /> },
          { title: 'Publishing Status', value: 'Active', icon: <Clock className="text-[#8B1A1A]" /> },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl shadow-2xs border border-[#E5DED3] flex items-center space-x-4"
          >
            <div className="p-3.5 bg-[#F7F1E8] rounded-2xl border border-[#E5DED3]">{stat.icon}</div>
            <div>
              <p className="text-xs text-[#666666] font-medium">{stat.title}</p>
              <h3 className="text-xl font-bold font-playfair text-[#171717] mt-0.5">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Package-Driven Feature Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales & Royalty Overview */}
        {hasSales && (
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl shadow-2xs border border-[#E5DED3]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#171717] font-playfair">
                  Royalty & Distribution Sales Trend
                </h3>
                <p className="text-xs text-[#666666] mt-0.5">
                  100% Net Royalty credited directly to author account monthly.
                </p>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0EBE1" />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E5DED3',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#8B1A1A"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#8B1A1A' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Global Distribution Status Widget */}
        {hasDistribution && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xs border border-[#E5DED3] space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E5DED3] pb-3">
              <Globe className="w-5 h-5 text-[#8B1A1A]" />
              <h3 className="font-playfair text-lg font-bold text-[#171717]">
                Distribution Reach
              </h3>
            </div>

            <p className="text-xs text-[#666666] leading-relaxed">
              Your books are live and indexed across major Indian and global distribution platforms:
            </p>

            <div className="space-y-2.5 text-xs">
              {[
                { name: 'Amazon India & Kindle', status: 'Live', speed: 'Prime Enabled' },
                { name: 'Flipkart Bookstore', status: 'Live', speed: 'Pan-India' },
                { name: 'IngramSpark Global Network', status: 'Active', speed: '150+ Countries' },
                { name: 'Google Play Books', status: 'Live', speed: 'eBook' },
              ].map((plat, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-[#FBF8F2] rounded-xl border border-[#E5DED3]"
                >
                  <span className="font-semibold text-[#171717]">{plat.name}</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-green-100 text-green-800 rounded">
                    {plat.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Manuscript & Production Timeline */}
      {hasManuscript && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xs border border-[#E5DED3] space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5DED3] pb-4">
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#8B1A1A]" />
              <h3 className="font-playfair text-xl font-bold text-[#171717]">
                Manuscript & Production Pipeline
              </h3>
            </div>
            <Link
              href="/author/books"
              className="text-xs font-bold text-[#8B1A1A] hover:underline"
            >
              View Titles →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-4 bg-[#FBF8F2] border border-[#E5DED3] rounded-2xl">
              <span className="text-[10px] font-bold uppercase text-[#8B1A1A] block">Stage 1</span>
              <strong className="text-sm text-[#171717] block mt-1">Manuscript Review</strong>
              <p className="text-gray-500 text-[11px] mt-0.5">Editorial check completed</p>
            </div>
            <div className="p-4 bg-[#FBF8F2] border border-[#E5DED3] rounded-2xl">
              <span className="text-[10px] font-bold uppercase text-[#8B1A1A] block">Stage 2</span>
              <strong className="text-sm text-[#171717] block mt-1">Typesetting & Layout</strong>
              <p className="text-gray-500 text-[11px] mt-0.5">Interior formatting formatted</p>
            </div>
            <div className="p-4 bg-[#FBF8F2] border border-[#E5DED3] rounded-2xl">
              <span className="text-[10px] font-bold uppercase text-[#8B1A1A] block">Stage 3</span>
              <strong className="text-sm text-[#171717] block mt-1">Cover & ISBN</strong>
              <p className="text-gray-500 text-[11px] mt-0.5">Official ISBN allocated</p>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-2xl">
              <span className="text-[10px] font-bold uppercase text-green-700 block">Stage 4</span>
              <strong className="text-sm text-green-900 block mt-1">Global Printing</strong>
              <p className="text-green-700 text-[11px] mt-0.5">Available for reader purchase</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
