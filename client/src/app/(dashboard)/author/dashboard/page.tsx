'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, TrendingUp, DollarSign, Clock } from 'lucide-react';

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
];

const recentOrders = [
  { id: '#ORD-001', book: 'The Midnight Library', customer: 'John Doe', amount: '?450', status: 'Shipped' },
  { id: '#ORD-002', book: 'Atomic Habits', customer: 'Jane Smith', amount: '?350', status: 'Pending' },
  { id: '#ORD-003', book: 'Dune', customer: 'Bob Wilson', amount: '?550', status: 'Delivered' },
  { id: '#ORD-004', book: 'Project Hail Mary', customer: 'Alice Brown', amount: '?499', status: 'Shipped' },
  { id: '#ORD-005', book: 'The Martian', customer: 'Charlie Davis', amount: '?399', status: 'Pending' },
];

export default function AuthorDashboardPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-playfair text-[#1A1A2E]">Welcome back, Author!</h1>
        <div className="space-x-3">
          <button className="px-4 py-2 bg-[#8B1A1A] text-white rounded-lg hover:bg-red-800 transition-colors">Upload Book</button>
          <button className="px-4 py-2 bg-gray-100 text-[#1A1A2E] rounded-lg hover:bg-gray-200 transition-colors">View Reports</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Books', value: '12', icon: <BookOpen className="text-[#8B1A1A]" /> },
          { title: 'Total Sales', value: '1,234', icon: <TrendingUp className="text-[#8B1A1A]" /> },
          { title: 'Total Revenue', value: '?45,678', icon: <DollarSign className="text-[#8B1A1A]" /> },
          { title: 'Pending Royalty', value: '?5,432', icon: <Clock className="text-[#8B1A1A]" /> }
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#1A1A2E] mb-6 font-playfair">Sales Overview (Last 6 Months)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="sales" stroke="#8B1A1A" strokeWidth={3} dot={{ r: 4, fill: '#8B1A1A' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#1A1A2E] mb-6 font-playfair">Book Status</h3>
          <div className="space-y-4">
            {[
              { label: 'Published', count: 8, color: 'bg-green-500' },
              { label: 'Under Review', count: 3, color: 'bg-yellow-500' },
              { label: 'Drafts', count: 1, color: 'bg-gray-400' }
            ].map((status, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                  <span className="font-medium text-gray-700">{status.label}</span>
                </div>
                <span className="font-bold text-[#1A1A2E]">{status.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-[#1A1A2E] mb-6 font-playfair">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-3 text-sm font-medium text-gray-500">Order ID</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Book</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Customer</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Amount</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order, i) => (
                <tr key={i}>
                  <td className="py-4 text-sm font-medium text-[#1A1A2E]">{order.id}</td>
                  <td className="py-4 text-sm text-gray-600">{order.book}</td>
                  <td className="py-4 text-sm text-gray-600">{order.customer}</td>
                  <td className="py-4 text-sm text-gray-600">{order.amount}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
