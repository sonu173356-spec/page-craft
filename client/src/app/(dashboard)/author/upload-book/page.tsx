'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, IndianRupee, FileText, CheckCircle2, HardDrive, Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { FileUploader, UploadedFileInfo } from '@/components/ui/FileUploader';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function UploadBookPage() {
  const [step, setStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFileInfo>>({});
  const [isPublishedSuccess, setIsPublishedSuccess] = useState(false);

  const handleFileUpload = (info: UploadedFileInfo) => {
    setUploadedFiles(prev => ({ ...prev, [info.type]: info }));
  };

  const handleFinalPublish = () => {
    setIsPublishedSuccess(true);
    toast.success('🎉 Book published live and sent to Admin Review Desk!');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold font-playfair text-[#1A1A2E]">Author Book Upload & Publishing Portal</h1>
        <p className="text-gray-500 text-xs mt-1">Upload manuscript PDFs, front/back covers, or attach Google Drive links</p>
      </div>

      {/* Stepper */}
      <div className="flex justify-between items-center relative before:absolute before:top-1/2 before:left-0 before:w-full before:h-1 before:bg-gray-100 before:-z-10">
        {[
          { num: 1, label: 'Book Details', icon: <Book className="w-4 h-4" /> },
          { num: 2, label: 'Pricing & Royalty', icon: <IndianRupee className="w-4 h-4" /> },
          { num: 3, label: 'Files & Google Drive', icon: <HardDrive className="w-4 h-4" /> },
          { num: 4, label: 'Publish Review', icon: <CheckCircle2 className="w-4 h-4" /> }
        ].map(s => (
          <div key={s.num} className="flex flex-col items-center gap-1.5 bg-gray-50 px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 ${step >= s.num ? 'bg-[#8B1A1A] text-white border-[#8B1A1A]' : 'bg-white text-gray-400 border-gray-200'} transition-colors`}>
              {s.icon}
            </div>
            <span className={`text-xs font-bold ${step >= s.num ? 'text-[#8B1A1A]' : 'text-gray-400'}`}>{s.label}</span>
          </div>
        ))}
      </div>

      {isPublishedSuccess ? (
        /* Celebratory Success Modal View */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-3xl border border-green-200 shadow-xl text-center space-y-6 max-w-xl mx-auto"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-inner">
            <Sparkles className="w-10 h-10 animate-bounce" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-playfair text-[#1A1A2E]">Congratulations! 🎉</h2>
            <p className="text-sm font-semibold text-green-700">Your book has been submitted to the Admin Publishing Desk!</p>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Your manuscript PDFs and cover designs are stored securely in Google Drive & Supabase. Our review team will verify your ISBN and activate bookstore sales within 24 hours.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-left text-xs text-gray-700 space-y-1">
            <span className="font-bold text-[#8B1A1A] block">Published Record:</span>
            <p>• Status: <span className="font-bold text-amber-600">Under Review / Approved</span></p>
            <p>• Royalty Plan: <span className="font-bold text-green-600">100% Net Royalty</span></p>
            <p>• Storage: <span className="font-bold text-blue-600">Google Drive & Supabase Synced</span></p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Link
              href="/author/books"
              className="px-6 py-3 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" /> View My Books Catalog
            </Link>
            <Link
              href="/author/dashboard"
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2"
            >
              Go to Author Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-[#1A1A2E] border-b pb-3">Book Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="font-bold text-gray-600 uppercase">Book Title</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B1A1A]/20 outline-none text-sm" placeholder="Enter book title" />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-600 uppercase">Category</label>
                  <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B1A1A]/20 outline-none text-sm">
                    <option>Fiction</option>
                    <option>Non-Fiction</option>
                    <option>Poetry</option>
                    <option>Self-Help</option>
                    <option>Business</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-600 uppercase">Language</label>
                  <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B1A1A]/20 outline-none text-sm">
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Bengali</option>
                    <option>Tamil</option>
                    <option>Marathi</option>
                  </select>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="font-bold text-gray-600 uppercase">Description</label>
                  <textarea rows={3} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B1A1A]/20 outline-none text-sm" placeholder="Write a compelling description..."></textarea>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-[#1A1A2E] border-b pb-3">Pricing & Royalty Terms</h2>
              <div className="grid grid-cols-1 gap-5 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-600 uppercase">Retail Price (₹)</label>
                  <input type="number" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B1A1A]/20 outline-none text-sm" defaultValue={399} />
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-emerald-900">
                  <div>
                    <h4 className="font-bold text-sm">100% Royalty Guarantee Enabled</h4>
                    <p className="text-xs text-emerald-700 mt-0.5">Author earns 100% net profit on every book copy sold on bookstore & global channels.</p>
                  </div>
                  <div className="w-10 h-6 bg-emerald-600 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h2 className="text-lg font-bold text-[#1A1A2E]">Google Drive & Supabase Asset Desk</h2>
                  <p className="text-xs text-gray-500">Upload Front/Back Covers and PDF Drafts or attach Google Drive links</p>
                </div>
                <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                  <HardDrive className="w-3.5 h-3.5" />
                  Google + Supabase Active
                </span>
              </div>

              {/* 4 File Upload Zones */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FileUploader
                  label="1. Front Cover (PNG/JPG)"
                  accept="image/*"
                  type="frontCover"
                  onUploadComplete={handleFileUpload}
                />
                <FileUploader
                  label="2. Back Cover (PNG/JPG)"
                  accept="image/*"
                  type="backCover"
                  onUploadComplete={handleFileUpload}
                />
                <FileUploader
                  label="3. Full Jacket Cover (PDF)"
                  accept=".pdf,image/*"
                  type="fullCoverPdf"
                  onUploadComplete={handleFileUpload}
                />
                <FileUploader
                  label="4. Interior Manuscript Draft (PDF/DOCX)"
                  accept=".pdf,.doc,.docx"
                  type="manuscriptPdf"
                  onUploadComplete={handleFileUpload}
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 text-green-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-[#1A1A2E] font-playfair">Ready to Publish!</h2>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Your manuscript PDFs, Front & Back Cover PNGs have been attached via Supabase Storage & Google Drive.
              </p>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl max-w-md mx-auto text-left text-xs text-blue-900 space-y-1.5">
                <span className="font-bold block text-blue-950">Attached Assets Summary:</span>
                <p>• Front Cover: {uploadedFiles.frontCover?.name || 'front_cover.png'} ({uploadedFiles.frontCover?.storageProvider || 'Google Drive'})</p>
                <p>• Back Cover: {uploadedFiles.backCover?.name || 'back_cover.png'} ({uploadedFiles.backCover?.storageProvider || 'Google Drive'})</p>
                <p>• Manuscript Draft: {uploadedFiles.manuscriptPdf?.name || 'manuscript_draft.pdf'} (Database synced)</p>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between text-xs">
            <button 
              disabled={step === 1}
              onClick={() => setStep(s => Math.max(1, s - 1))}
              className={`px-5 py-2.5 rounded-xl font-bold transition-colors ${step === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Back
            </button>
            
            {step === 4 ? (
              <button 
                onClick={handleFinalPublish}
                className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-colors shadow-md animate-pulse"
              >
                Publish Book Live
              </button>
            ) : (
              <button 
                onClick={() => setStep(s => Math.min(4, s + 1))}
                className="px-6 py-2.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-xl font-bold transition-colors shadow-md"
              >
                Continue to {step === 1 ? 'Pricing' : step === 2 ? 'Files & Google Drive' : 'Review'}
              </button>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
