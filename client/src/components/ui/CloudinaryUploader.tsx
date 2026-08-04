'use client';

import React, { useState } from 'react';
import { CheckCircle2, FileText, Image as ImageIcon, Sparkles, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';

export interface UploadedFileInfo {
  name: string;
  originalSize: string;
  compressedSize: string;
  savedPercentage: string;
  url: string;
  type: 'frontCover' | 'backCover' | 'fullCoverPdf' | 'manuscriptPdf';
  cloudName: string;
}

interface CloudinaryUploaderProps {
  label: string;
  accept: string;
  type: 'frontCover' | 'backCover' | 'fullCoverPdf' | 'manuscriptPdf';
  onUploadComplete?: (fileInfo: UploadedFileInfo) => void;
}

const DEFAULT_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'cbqwif6x';

export function CloudinaryUploader({ label, accept, type, onUploadComplete }: CloudinaryUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState<UploadedFileInfo | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // Simulate Cloudinary Upload & Auto-Compression
    setTimeout(() => {
      const origSizeMb = (file.size / (1024 * 1024)).toFixed(2);
      const compSizeMb = (file.size * 0.18 / (1024 * 1024)).toFixed(2);
      const savedPct = '82%';

      const uploadedData: UploadedFileInfo = {
        name: file.name,
        originalSize: `${origSizeMb} MB`,
        compressedSize: `${compSizeMb} MB`,
        savedPercentage: savedPct,
        url: URL.createObjectURL(file),
        type,
        cloudName: DEFAULT_CLOUD_NAME,
      };

      setFileInfo(uploadedData);
      setIsUploading(false);
      if (onUploadComplete) onUploadComplete(uploadedData);

      toast.success(`Cloudinary (${DEFAULT_CLOUD_NAME}) Compressed & Saved ${file.name} (${savedPct} smaller!)`);
    }, 1200);
  };

  return (
    <div className="border-2 border-dashed border-gray-200 hover:border-[#8B1A1A] hover:bg-red-50/30 transition-all rounded-2xl p-5 relative overflow-hidden bg-white">
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={isUploading}
        className="absolute inset-0 opacity-0 cursor-pointer z-10"
      />

      {isUploading ? (
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <RefreshCw className="w-8 h-8 text-[#8B1A1A] animate-spin mb-2" />
          <p className="text-xs font-bold text-[#1A1A2E]">Uploading to Cloudinary ({DEFAULT_CLOUD_NAME})...</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Applying q_auto, f_auto WebP/PDF compression</p>
        </div>
      ) : fileInfo ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="font-bold text-xs text-[#1A1A2E] truncate max-w-[180px]">{fileInfo.name}</span>
            </div>
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">
              Cloudinary ({DEFAULT_CLOUD_NAME})
            </span>
          </div>

          {/* Compression badge */}
          <div className="bg-emerald-50 border border-emerald-200/60 p-2 rounded-xl flex items-center justify-between text-[11px] text-emerald-900 font-medium">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Original: <span className="line-through text-gray-400">{fileInfo.originalSize}</span>
            </span>
            <span className="font-bold text-emerald-700">
              Compressed: {fileInfo.compressedSize} ({fileInfo.savedPercentage} saved!)
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-4 text-center pointer-events-none">
          <div className="w-10 h-10 rounded-full bg-red-50 text-[#8B1A1A] flex items-center justify-center mb-2">
            {type.includes('Pdf') ? <FileText className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
          </div>
          <h4 className="font-bold text-xs text-[#1A1A2E] mb-1">{label}</h4>
          <p className="text-[11px] text-gray-400">Click or drag & drop file to auto-compress</p>
        </div>
      )}
    </div>
  );
}
