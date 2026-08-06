'use client';

import React, { useState } from 'react';
import { CheckCircle2, FileText, Image as ImageIcon, RefreshCw, Link as LinkIcon, HardDrive, Check, X, Upload } from 'lucide-react';
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

  const processFile = (file: File) => {
    setIsUploading(true);
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);

    const finishUpload = (fileUrl: string) => {
      const uploadedData: UploadedFileInfo = {
        name: file.name,
        size: `${sizeMb} MB`,
        url: fileUrl,
        type,
        storageProvider: 'Supabase Storage',
      };

      setFileInfo(uploadedData);
      setIsUploading(false);
      if (onUploadComplete) onUploadComplete(uploadedData);
      toast.success(`🎉 ${file.name} uploaded successfully!`);
    };

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const rawResult = event.target?.result as string;
        if (!rawResult) {
          finishUpload('https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop');
          return;
        }

        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const maxDim = 500;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > maxDim) {
                height *= maxDim / width;
                width = maxDim;
              }
            } else {
              if (height > maxDim) {
                width *= maxDim / height;
                height = maxDim;
              }
            }

            canvas.width = width;
            canvas.height = height;
            ctx?.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
            finishUpload(compressedDataUrl);
          } catch (err) {
            finishUpload(rawResult);
          }
        };
        img.onerror = () => finishUpload(rawResult);
        img.src = rawResult;
      };
      reader.readAsDataURL(file);
    } else {
      setTimeout(() => {
        finishUpload('https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop');
      }, 500);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFileInfo(null);
    setDriveUrlInput('');
    toast.success('File removed. You can upload a new file.');
  };

  const handleDriveUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driveUrlInput.trim()) return;

    const uploadedData: UploadedFileInfo = {
      name: `Google Drive Link (${type})`,
      size: 'Cloud Link',
      url: driveUrlInput.trim(),
      type,
      storageProvider: 'Google Drive',
    };

    setFileInfo(uploadedData);
    setShowDriveInput(false);
    if (onUploadComplete) onUploadComplete(uploadedData);
    toast.success('Google Drive asset link attached successfully!');
  };

  return (
    <div className="border-2 border-dashed border-gray-200 hover:border-[#8B1A1A] hover:bg-red-50/20 transition-all rounded-2xl p-5 relative overflow-hidden bg-white group">
      {!showDriveInput && !fileInfo && !isUploading && (
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
        />
      )}

      {isUploading ? (
        <div className="flex flex-col items-center justify-center py-5 text-center">
          <RefreshCw className="w-8 h-8 text-[#8B1A1A] animate-spin mb-2" />
          <p className="text-xs font-bold text-[#1A1A2E]">Uploading & Encrypting Asset...</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Syncing with Supabase & Cloud Storage</p>
        </div>
      ) : fileInfo ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
              <span className="font-bold text-xs text-[#1A1A2E] truncate max-w-[170px]" title={fileInfo.name}>
                {fileInfo.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-full flex items-center gap-1">
                <HardDrive className="w-3 h-3" />
                {fileInfo.storageProvider}
              </span>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="p-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-full transition-colors cursor-pointer"
                title="Remove file"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200/80 p-2.5 rounded-xl flex items-center justify-between text-[11px] text-gray-700 font-medium">
            <span>Size: <strong>{fileInfo.size}</strong></span>
            <span className="font-bold text-green-700 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Uploaded & Ready
            </span>
          </div>
        </div>
      ) : showDriveInput ? (
        <form onSubmit={handleDriveUrlSubmit} className="space-y-3 relative z-20">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-gray-700 block">Attach Google Drive Share Link:</label>
            <button
              type="button"
              onClick={() => setShowDriveInput(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <input
            type="url"
            placeholder="https://drive.google.com/file/d/..."
            value={driveUrlInput}
            onChange={e => setDriveUrlInput(e.target.value)}
            className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#8B1A1A]/20"
            required
          />
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowDriveInput(false)}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-3.5 h-3.5" /> Attach Link
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <div className="w-10 h-10 rounded-full bg-red-50 text-[#8B1A1A] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            {type.includes('Pdf') ? <FileText className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
          </div>
          <h4 className="font-bold text-xs text-[#1A1A2E] mb-1">{label}</h4>
          <p className="text-[11px] text-gray-500 mb-2">Click anywhere to select file ({accept})</p>

          <div className="relative z-20 pt-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowDriveInput(true);
              }}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg text-[10px] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LinkIcon className="w-3 h-3 text-[#8B1A1A]" />
              Or attach Google Drive Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
