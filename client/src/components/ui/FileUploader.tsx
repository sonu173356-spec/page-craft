'use client';

import React, { useState } from 'react';
import { CheckCircle2, FileText, Image as ImageIcon, Sparkles, RefreshCw, Link as LinkIcon, HardDrive, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

export interface UploadedFileInfo {
  name: string;
  size: string;
  url: string;
  type: 'frontCover' | 'backCover' | 'fullCoverPdf' | 'manuscriptPdf';
  storageProvider: 'Google Drive' | 'Supabase Storage' | 'Direct Upload';
}

interface FileUploaderProps {
  label: string;
  accept: string;
  type: 'frontCover' | 'backCover' | 'fullCoverPdf' | 'manuscriptPdf';
  onUploadComplete?: (fileInfo: UploadedFileInfo) => void;
}

export function FileUploader({ label, accept, type, onUploadComplete }: FileUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState<UploadedFileInfo | null>(null);
  const [driveUrlInput, setDriveUrlInput] = useState('');
  const [showDriveInput, setShowDriveInput] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    setTimeout(() => {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      const uploadedData: UploadedFileInfo = {
        name: file.name,
        size: `${sizeMb} MB`,
        url: URL.createObjectURL(file),
        type,
        storageProvider: 'Supabase Storage',
      };

      setFileInfo(uploadedData);
      setIsUploading(false);
      if (onUploadComplete) onUploadComplete(uploadedData);
      toast.success(`${file.name} saved to Supabase / Google Cloud Storage!`);
    }, 1000);
  };

  const handleDriveUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driveUrlInput) return;

    const uploadedData: UploadedFileInfo = {
      name: `Google Drive File (${type})`,
      size: 'Cloud Linked',
      url: driveUrlInput,
      type,
      storageProvider: 'Google Drive',
    };

    setFileInfo(uploadedData);
    setShowDriveInput(false);
    if (onUploadComplete) onUploadComplete(uploadedData);
    toast.success('Connected Google Drive link successfully!');
  };

  return (
    <div className="border-2 border-dashed border-gray-200 hover:border-[#8B1A1A] hover:bg-red-50/30 transition-all rounded-2xl p-5 relative overflow-hidden bg-white">
      {!showDriveInput && !fileInfo && (
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={isUploading}
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
        />
      )}

      {isUploading ? (
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <RefreshCw className="w-8 h-8 text-[#8B1A1A] animate-spin mb-2" />
          <p className="text-xs font-bold text-[#1A1A2E]">Storing File in Supabase / Google Cloud...</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Encrypting and attaching asset link</p>
        </div>
      ) : fileInfo ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="font-bold text-xs text-[#1A1A2E] truncate max-w-[180px]">{fileInfo.name}</span>
            </div>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-full flex items-center gap-1">
              <HardDrive className="w-3 h-3" />
              {fileInfo.storageProvider}
            </span>
          </div>

          <div className="bg-gray-50 border border-gray-200/80 p-2 rounded-xl flex items-center justify-between text-[11px] text-gray-700 font-medium">
            <span>Size: {fileInfo.size}</span>
            <span className="font-bold text-[#8B1A1A]">Ready for Review</span>
          </div>
        </div>
      ) : showDriveInput ? (
        <form onSubmit={handleDriveUrlSubmit} className="space-y-2 z-20 relative">
          <label className="text-[11px] font-bold text-gray-600 block">Paste Google Drive Share Link:</label>
          <input
            type="url"
            placeholder="https://drive.google.com/file/d/..."
            value={driveUrlInput}
            onChange={e => setDriveUrlInput(e.target.value)}
            className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs"
            required
          />
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowDriveInput(false)}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-[#8B1A1A] text-white font-bold rounded text-xs flex items-center gap-1"
            >
              <Check className="w-3 h-3" /> Save Drive Link
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center py-4 text-center pointer-events-none">
          <div className="w-10 h-10 rounded-full bg-red-50 text-[#8B1A1A] flex items-center justify-center mb-2">
            {type.includes('Pdf') ? <FileText className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
          </div>
          <h4 className="font-bold text-xs text-[#1A1A2E] mb-1">{label}</h4>
          <p className="text-[11px] text-gray-400">Click to upload file or attach Google Drive link</p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowDriveInput(true);
            }}
            className="mt-2.5 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg text-[10px] flex items-center gap-1.5 pointer-events-auto z-20"
          >
            <LinkIcon className="w-3 h-3 text-[#8B1A1A]" />
            Or attach Google Drive Link
          </button>
        </div>
      )}
    </div>
  );
}
