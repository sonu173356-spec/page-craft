'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { BookOpen, Users, DollarSign, Star, ShoppingBag, ArrowRight, Settings, PlusCircle } from 'lucide-react';
import Link from 'next/link';

const revenueData = [
  { name: 'Jan', revenue: 40000 },
  { name: 'Feb', revenue: 30000 },
  { name: 'Mar', revenue: 20000 },
  { name: 'Apr', revenue: 27800 },
  { name: 'May', revenue: 18900 },
  { name: 'Jun', revenue: 23900 },
];

export default function AdminDashboardPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-playfair text-[#1A1A2E]">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Platform overview and content manager controls</p>
        </div>

        {/* Quick Action Link to Internal Dashboard */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/internal-dashboard"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-semibold text-sm rounded-xl shadow-md transition-all active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-[#C5A55A]" />
            Internal Book Manager
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Total Revenue', value: '₹24,45,678', icon: <DollarSign className="text-[#8B1A1A]" /> },
          { title: 'Total Orders', value: '8,234', icon: <ShoppingBag className="text-[#8B1A1A]" /> },
          { title: 'Total Books', value: '1,452', icon: <BookOpen className="text-[#8B1A1A]" /> },
          { title: 'Total Authors', value: '342', icon: <Users className="text-[#8B1A1A]" /> },
          { title: 'Total Users', value: '12,453', icon: <Users className="text-[#8B1A1A]" /> },
          { title: 'Pending Reviews', value: '28', icon: <Star className="text-[#8B1A1A]" /> }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className="p-3 bg-red-50 rounded-xl">{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-[#1A1A2E]">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access Bar */}
      <div className="bg-gradient-to-r from-[#1A1A2E] to-[#2D2D44] p-6 rounded-2xl text-white shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-xl text-[#C5A55A]">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-playfair text-lg font-bold">Internal Content Dashboard & Live Editor</h4>
            <p className="text-xs text-gray-300">Edit author books, update prices, change cover images, and publish to the live site.</p>
          </div>
        </div>

        <Link
          href="/admin/internal-dashboard"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#C5A55A] hover:bg-[#b09148] text-[#1A1A2E] font-bold text-sm rounded-xl transition-all shadow"
        >
          Open Internal Dashboard
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#1A1A2E] mb-6 font-playfair">Revenue (Last 6 Months)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="revenue" stroke="#8B1A1A" strokeWidth={3} dot={{ r: 4, fill: '#8B1A1A' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#1A1A2E] mb-6 font-playfair">New Users</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                <Bar dataKey="revenue" fill="#C5A55A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
