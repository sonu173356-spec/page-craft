'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Book, IndianRupee, FileText, CheckCircle2 } from 'lucide-react';

export default function UploadBookPage() {
  const [step, setStep] = useState(1);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-playfair text-[#1A1A2E]">Upload New Book</h1>
        <p className="text-gray-500 mt-2">Share your masterpiece with the world</p>
      </div>

      <div className="flex justify-between items-center relative before:absolute before:top-1/2 before:left-0 before:w-full before:h-1 before:bg-gray-100 before:-z-10">
        {[
          { num: 1, label: 'Details', icon: <Book className="w-5 h-5" /> },
          { num: 2, label: 'Pricing', icon: <IndianRupee className="w-5 h-5" /> },
          { num: 3, label: 'Files', icon: <FileText className="w-5 h-5" /> },
          { num: 4, label: 'Review', icon: <CheckCircle2 className="w-5 h-5" /> }
        ].map(s => (
          <div key={s.num} className="flex flex-col items-center gap-2 bg-gray-50 px-2">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${step >= s.num ? 'bg-[#8B1A1A] text-white border-[#8B1A1A]' : 'bg-white text-gray-400 border-gray-200'} transition-colors`}>
              {s.icon}
            </div>
            <span className={`text-sm font-medium ${step >= s.num ? 'text-[#8B1A1A]' : 'text-gray-400'}`}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1A1A2E] border-b pb-4">Book Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Book Title</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B1A1A]/20 outline-none" placeholder="Enter book title" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B1A1A]/20 outline-none">
                  <option>Fiction</option>
                  <option>Non-Fiction</option>
                  <option>Self-Help</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Language</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B1A1A]/20 outline-none">
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B1A1A]/20 outline-none" placeholder="Write a compelling description..."></textarea>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1A1A2E] border-b pb-4">Pricing & Formats</h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Price (?)</label>
                <input type="number" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B1A1A]/20 outline-none" placeholder="299" />
              </div>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-[#1A1A2E]">Auto-generate ISBN</h4>
                  <p className="text-sm text-gray-500">We will provide a free ISBN for your book</p>
                </div>
                <div className="w-12 h-6 bg-[#8B1A1A] rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1A1A2E] border-b pb-4">Upload Files</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-[#8B1A1A] hover:bg-red-50/50 transition-colors cursor-pointer group">
                <Upload className="w-10 h-10 text-gray-400 group-hover:text-[#8B1A1A] mb-4" />
                <h4 className="font-medium text-[#1A1A2E] mb-1">Upload Manuscript</h4>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 50MB</p>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-[#8B1A1A] hover:bg-red-50/50 transition-colors cursor-pointer group">
                <Upload className="w-10 h-10 text-gray-400 group-hover:text-[#8B1A1A] mb-4" />
                <h4 className="font-medium text-[#1A1A2E] mb-1">Upload Cover</h4>
                <p className="text-xs text-gray-500">JPG, PNG up to 10MB</p>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] font-playfair">Ready to Publish!</h2>
            <p className="text-gray-500 max-w-md mx-auto">Please review all your details carefully. Once submitted, your book will go under our review process before being published.</p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between">
          <button 
            disabled={step === 1}
            onClick={() => setStep(s => Math.max(1, s - 1))}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${step === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Back
          </button>
          <button 
            onClick={() => setStep(s => Math.min(4, s + 1))}
            className="px-6 py-2 bg-[#8B1A1A] text-white rounded-lg font-medium hover:bg-red-800 transition-colors"
          >
            {step === 4 ? 'Submit for Review' : 'Continue'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
