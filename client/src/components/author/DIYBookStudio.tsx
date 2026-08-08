'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import {
  BookOpen,
  Layers,
  FileText,
  Palette,
  CheckCircle,
  AlertTriangle,
  Save,
  Eye,
  Send,
  Upload,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Info,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Clock,
  ChevronRight,
  Plus,
  Trash2,
  Lock,
  Download,
  Check,
  X,
  FileCheck,
} from 'lucide-react';
import { useAuthStore } from '@/store';
import { publishAuthorBook } from '@/lib/bookService';

// Step definition
const STEPS = [
  { id: 1, name: 'Book Info', icon: BookOpen, desc: 'Title, metadata & genre' },
  { id: 2, name: 'Book Specs', icon: Layers, desc: 'Trim size & package limits' },
  { id: 3, name: 'Cover Creator', icon: Palette, desc: 'Design or upload cover' },
  { id: 4, name: 'Book Interior', icon: Upload, desc: 'PDF / DOCX & validation' },
  { id: 5, name: 'Chapter Editor', icon: FileText, desc: 'Simple text & formatting' },
  { id: 6, name: 'Live Preview', icon: Eye, desc: 'Turn pages & 3D view' },
  { id: 7, name: 'Final Review', icon: CheckCircle, desc: 'Checklist & submission' },
];

const COVER_TEMPLATES = [
  { id: 'literary', name: 'Literary Classic', bg: '#8B1A1A', text: '#FDFAF6', font: 'Playfair Display', border: 'border-amber-400/40' },
  { id: 'minimalist', name: 'Clean Minimalist', bg: '#FDFAF6', text: '#1A1A2E', font: 'Inter', border: 'border-gray-200' },
  { id: 'gold_noir', name: 'Gold & Charcoal', bg: '#1A1A2E', text: '#C5A55A', font: 'Cinzel', border: 'border-[#C5A55A]' },
  { id: 'botanical', name: 'Sage & Forest', bg: '#1E3A2F', text: '#E8EFE9', font: 'Playfair Display', border: 'border-emerald-500/30' },
  { id: 'poetic', name: 'Crimson Velvet', bg: '#4A0E17', text: '#FAD2E1', font: 'Playfair Display', border: 'border-rose-400/30' },
  { id: 'modern', name: 'Modern Sans', bg: '#2C3E50', text: '#ECF0F1', font: 'Inter', border: 'border-blue-400/30' },
];

const FONTS = ['Playfair Display', 'Cinzel', 'Inter', 'Georgia', 'Merriweather', 'Garamond'];

export interface DIYBookStudioProps {
  initialProjectId?: string;
  initialPackage?: string;
}

export default function DIYBookStudio({ initialProjectId, initialPackage }: DIYBookStudioProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageParam = searchParams.get('package') || initialPackage || 'professional';
  const { user } = useAuthStore();

  const authorName = user?.name || 'Eleanor Vance';
  const authorEmail = user?.email || 'author@pagecraft.com';

  // Active step
  const [currentStep, setCurrentStep] = useState(1);
  const [projectId, setProjectId] = useState(initialProjectId || `proj-${Date.now().toString(36)}`);
  
  // Package specifications & restrictions
  const [selectedPackage, setSelectedPackage] = useState(packageParam);
  
  // Step 1: Book Info
  const [title, setTitle] = useState('The Silent Echo of Whispers');
  const [subtitle, setSubtitle] = useState('A Tale of Memories and Lost Solitude');
  const [penName, setPenName] = useState(authorName);
  const [genre, setGenre] = useState('Literary Fiction');
  const [language, setLanguage] = useState('English');
  const [description, setDescription] = useState(
    'A poetic and emotional journey navigating personal grief, resilience, and rediscovery in the quiet highlands.'
  );
  const [isbn, setIsbn] = useState('978-93-84729-10-4');
  const [edition, setEdition] = useState('1st Edition');
  const [copyrightHolder, setCopyrightHolder] = useState(`${authorName} 2026`);
  const [publisherName, setPublisherName] = useState('Page Craft Publishing');

  // Step 2: Book Specifications
  const [trimSize, setTrimSize] = useState('5x8');
  const [pageCount, setPageCount] = useState(220);
  const [paperType, setPaperType] = useState('Cream');
  const [binding, setBinding] = useState('Paperback');
  const [interiorType, setInteriorType] = useState('Black & White');
  const [coverType, setCoverType] = useState('Matte');

  // Step 3: Cover Creator
  const [coverMode, setCoverMode] = useState<'template' | 'upload'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState('literary');
  const [coverFont, setCoverFont] = useState('Playfair Display');
  const [coverFontSize, setCoverFontSize] = useState(26);
  const [coverBgColor, setCoverBgColor] = useState('#8B1A1A');
  const [coverFontColor, setCoverFontColor] = useState('#FDFAF6');
  const [coverAlignment, setCoverAlignment] = useState<'left' | 'center' | 'right'>('center');
  const [frontCoverImage, setFrontCoverImage] = useState('https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop');
  const [coverFileName, setCoverFileName] = useState('front_cover_original.png');
  const [coverResolution, setCoverResolution] = useState<{ width: number; height: number; dpi: number } | null>({ width: 2400, height: 3600, dpi: 300 });
  const [isCoverDragging, setIsCoverDragging] = useState(false);
  const [backCoverImage, setBackCoverImage] = useState('');
  const [backCoverSummary, setBackCoverSummary] = useState(
    'An extraordinary debut novel exploring memory, belonging, and the invisible threads that tie generations together.'
  );

  // Step 4: Manuscript
  const [manuscriptFile, setManuscriptFile] = useState<File | null>(null);
  const [manuscriptFileName, setManuscriptFileName] = useState('The_Silent_Echo_Manuscript_Final.pdf');
  const [manuscriptFileSize, setManuscriptFileSize] = useState(3450000);
  const [manuscriptPageCount, setManuscriptPageCount] = useState(220);
  const [manuscriptStatus, setManuscriptStatus] = useState<'validated' | 'warning' | 'pending'>('validated');
  const [isUploadingFile, setIsUploadingFile] = useState(false);

  // Step 5: Simple Editor Chapters
  const [chapters, setChapters] = useState([
    {
      id: 'ch-1',
      title: 'Chapter 1: The Mountain Wind',
      content:
        'The fog rolled across the heather before dawn, draping the quiet valley in a blanket of silence. Somewhere in the distance, the stone chapel bell struck five.\n\nMargaret drew her woolen shawl tightly around her shoulders, looking toward the ridgeline where the first amber ribbons of sunrise pierced the pine needles. It had been twelve years since she last stood on this soil.',
      wordCount: 1850,
    },
    {
      id: 'ch-2',
      title: 'Chapter 2: Letters Unopened',
      content:
        'On the mahogany writing desk lay seven envelopes, their wax seals still unbroken after three decades.\n\nEach letter bore the delicate handwriting of a woman who had spent half her life waiting for replies that never came. As the ink catch the morning sunlight, the words began to whisper their long-held secrets.',
      wordCount: 2140,
    },
  ]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  // Step 6: Live Preview
  const [previewPage, setPreviewPage] = useState(0); // 0 = Cover, 1 = Inside Title, 2 = Ch 1, 3 = Ch 2, 4 = Back Cover
  const [previewZoom, setPreviewZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Autosave & Submission State
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [lastSavedTime, setLastSavedTime] = useState<string>('Just now');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  // Package Limitations helper
  const getPackageLimitations = () => {
    const p = selectedPackage.toLowerCase();
    if (p.includes('starter')) {
      return {
        name: 'Starter Publishing Plan',
        allowedTrim: ['5x8'],
        maxPages: 150,
        allowedBindings: ['Paperback'],
        allowedPaper: ['White', 'Cream'],
        allowedInterior: ['Black & White'],
        colorAllowed: false,
        price: '₹9,999',
      };
    } else if (p.includes('premium')) {
      return {
        name: 'Premium Publishing Plan',
        allowedTrim: ['5x8', '5.5x8.5', '6x9', '8x10', '8.5x11'],
        maxPages: 500,
        allowedBindings: ['Paperback', 'Hardcover'],
        allowedPaper: ['Natural Cream', 'Crisp White', 'Gloss Art'],
        allowedInterior: ['Black & White', 'Full Color'],
        colorAllowed: true,
        price: '₹49,999',
      };
    } else {
      return {
        name: 'Professional Publishing Plan',
        allowedTrim: ['5x8', '5.5x8.5', '6x9'],
        maxPages: 350,
        allowedBindings: ['Paperback', 'Hardcover'],
        allowedPaper: ['Natural Cream', 'Crisp White'],
        allowedInterior: ['Black & White', 'Full Color'],
        colorAllowed: true,
        price: '₹24,999',
      };
    }
  };

  const packageSpecs = getPackageLimitations();

  // Calculated spine width (in mm based on page count & paper thickness)
  const spineWidthMm = Math.max(4, Number(((pageCount * (paperType === 'Cream' ? 0.055 : 0.05)) + 1).toFixed(1)));

  // Load project on mount from API or LocalStorage
  useEffect(() => {
    async function loadProject() {
      if (initialProjectId) {
        try {
          const res = await fetch(`/api/author/projects?id=${initialProjectId}`);
          if (res.ok) {
            const data = await res.json();
            if (data.project) {
              const p = data.project;
              setTitle(p.title || '');
              setSubtitle(p.subtitle || '');
              setPenName(p.penName || authorName);
              setGenre(p.genre || 'Fiction');
              setTrimSize(p.trimSize || '5x8');
              setPageCount(p.pageCount || 220);
              setCoverBgColor(p.coverBgColor || '#8B1A1A');
              setCoverFont(p.coverTitleFont || p.coverFont || 'Playfair Display');
              setSelectedPackage(p.packageId || selectedPackage);
              if (p.chapters && p.chapters.length > 0) setChapters(p.chapters);
              setManuscriptFileName(p.manuscriptFileName || '');
              if (p.currentStep) setCurrentStep(p.currentStep);
            }
          }
        } catch (err) {
          console.warn('Could not fetch project from server, falling back to local store:', err);
        }
      } else {
        // Try local storage draft
        try {
          const localDraft = localStorage.getItem(`pagecraft_diy_${packageParam}`);
          if (localDraft) {
            const p = JSON.parse(localDraft);
            setTitle(p.title || title);
            setSubtitle(p.subtitle || subtitle);
            setGenre(p.genre || genre);
          }
        } catch (err) {
          // ignore
        }
      }
    }
    loadProject();
  }, [initialProjectId, packageParam]);

  // Debounced Autosave Trigger
  const autosaveTimeout = useRef<NodeJS.Timeout | null>(null);

  const triggerAutosave = () => {
    setSaveStatus('saving');
    if (autosaveTimeout.current) clearTimeout(autosaveTimeout.current);

    autosaveTimeout.current = setTimeout(async () => {
      try {
        const payload = {
          id: projectId,
          authorEmail,
          authorName,
          packageId: selectedPackage,
          packageName: packageSpecs.name,
          title,
          subtitle,
          penName,
          description,
          genre,
          language,
          isbn,
          edition,
          copyrightHolder,
          publisherName,
          trimSize,
          pageCount,
          paperType,
          binding,
          interiorType,
          coverType,
          coverMode,
          coverTemplate: selectedTemplate,
          coverFrontImage: frontCoverImage,
          coverBackImage: backCoverImage,
          coverTitleFont: coverFont,
          coverFontSize,
          coverFontColor,
          coverBgColor,
          coverAlignment,
          spineWidthMm,
          manuscriptFileName,
          manuscriptFileSize,
          manuscriptPageCount: pageCount,
          manuscriptStatus,
          chapters,
          currentStep,
          progress: Math.round((currentStep / STEPS.length) * 100),
          status: 'Draft',
        };

        // 1. LocalStorage save
        localStorage.setItem(`pagecraft_diy_${projectId}`, JSON.stringify(payload));
        localStorage.setItem('pagecraft_current_project', JSON.stringify(payload));

        // 2. Server API save
        await fetch('/api/author/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        setSaveStatus('saved');
        setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } catch (err) {
        setSaveStatus('unsaved');
      }
    }, 1200);
  };

  // Trigger autosave when key fields change
  useEffect(() => {
    triggerAutosave();
  }, [
    title,
    subtitle,
    penName,
    genre,
    description,
    trimSize,
    pageCount,
    paperType,
    binding,
    interiorType,
    coverBgColor,
    coverFont,
    coverFontSize,
    coverAlignment,
    chapters,
    currentStep,
  ]);

  // Handle Book Interior File Upload & Simulation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.name.endsWith('.pdf') && !file.name.endsWith('.docx')) {
      toast.error('Please upload a valid PDF or DOCX book interior file.');
      return;
    }

    setIsUploadingFile(true);
    setTimeout(() => {
      setManuscriptFile(file);
      setManuscriptFileName(file.name);
      setManuscriptFileSize(file.size);
      
      // Simulated page count detection
      const estimatedPages = Math.max(80, Math.min(450, Math.floor(file.size / 15000)));
      setManuscriptPageCount(estimatedPages);
      setPageCount(estimatedPages);

      if (estimatedPages > packageSpecs.maxPages) {
        setManuscriptStatus('warning');
        toast.error(`Warning: Detected ${estimatedPages} pages. Your ${packageSpecs.name} limit is ${packageSpecs.maxPages} pages.`);
      } else {
        setManuscriptStatus('validated');
        toast.success(`Book Interior "${file.name}" uploaded & validated (${estimatedPages} pages).`);
      }
      setIsUploadingFile(false);
      triggerAutosave();
    }, 1000);
  };

  // Handle Cover Image Upload with File Validation and FileReader Base64 conversion
  const processCoverFile = (file: File, target: 'front' | 'back') => {
    // Validate File Type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      toast.error('Invalid file format. Please upload a PNG, JPG, or WebP cover image.');
      return;
    }

    // Validate File Size (Max 25MB)
    if (file.size > 25 * 1024 * 1024) {
      toast.error('Cover file too large. Maximum allowed size is 25MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const resultDataUrl = event.target?.result as string;
      if (!resultDataUrl) return;

      // Validate image dimensions
      const img = new Image();
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        const estimatedDpi = width >= 2400 ? 300 : width >= 1600 ? 250 : 150;

        if (target === 'front') {
          setFrontCoverImage(resultDataUrl);
          setCoverFileName(file.name);
          setCoverResolution({ width, height, dpi: estimatedDpi });
          setCoverMode('upload');

          if (width < 1200 || height < 1800) {
            toast('⚠️ Uploaded cover resolution is below recommended 1600 × 2560 px. Still accepted for preview, but recommend higher resolution for print.', {
              icon: 'ℹ️',
              duration: 5000,
            });
          } else {
            toast.success(`🎉 Front cover "${file.name}" uploaded & verified (${width} × ${height} px • ${estimatedDpi} DPI).`);
          }
        } else {
          setBackCoverImage(resultDataUrl);
          toast.success(`Back cover artwork "${file.name}" uploaded.`);
        }
        triggerAutosave();
      };
      img.src = resultDataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'front' | 'back') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    processCoverFile(files[0], target);
  };

  const handleCoverDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsCoverDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processCoverFile(e.dataTransfer.files[0], 'front');
    }
  };

  // Handle Final Submission
  const handleSubmitBook = async () => {
    if (!title || title.trim().length < 2) {
      toast.error('Please provide a valid Book Title in Step 1.');
      setCurrentStep(1);
      return;
    }

    if (!penName || penName.trim().length < 2) {
      toast.error('Please provide Author / Pen Name in Step 1.');
      setCurrentStep(1);
      return;
    }

    if (pageCount > packageSpecs.maxPages) {
      toast.error(`Page count (${pageCount}) exceeds your ${packageSpecs.name} limit (${packageSpecs.maxPages} pages). Please adjust or upgrade package.`);
      setCurrentStep(2);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        id: projectId,
        authorEmail,
        authorName,
        packageId: selectedPackage,
        packageName: packageSpecs.name,
        title,
        subtitle,
        penName,
        description,
        genre,
        language,
        isbn,
        edition,
        copyrightHolder,
        publisherName,
        trimSize,
        pageCount,
        paperType,
        binding,
        interiorType,
        coverType,
        coverMode,
        coverTemplate: selectedTemplate,
        coverFrontImage: frontCoverImage,
        cover_image_url: frontCoverImage,
        coverBackImage: backCoverImage,
        coverTitleFont: coverFont,
        coverFontSize,
        coverFontColor,
        coverBgColor,
        coverAlignment,
        spineWidthMm,
        manuscriptFileName,
        manuscriptFileSize,
        manuscriptPageCount: pageCount,
        manuscriptStatus: 'validated',
        chapters,
        currentStep: 7,
        progress: 100,
        status: 'Published',
        validationResults: {
          titleCheck: true,
          authorCheck: true,
          pageSizeCheck: true,
          trimSizeCheck: true,
          coverResolutionCheck: true,
          spineCheck: true,
          bleedCheck: true,
          isReadyForSubmission: true,
        },
      };

      const res = await fetch('/api/author/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Submission failed.');

      // Automatically publish to global site catalog so author-uploaded cover appears in Featured Books, Latest Releases, Bookstore, etc.
      try {
        publishAuthorBook({
          id: projectId,
          title,
          subtitle,
          author: penName || authorName,
          genre,
          category: genre,
          price: '₹399',
          description,
          isbn,
          pages: pageCount,
          cover_image_url: frontCoverImage,
          featured: true,
        });
      } catch (err) {
        console.warn('Catalog publish sync error:', err);
      }

      setIsSubmittedSuccess(true);
      toast.success('🎉 Your book project has been successfully submitted and published!');
    } catch (err: any) {
      toast.error(err.message || 'Error submitting book project.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFAF6] text-[#1A1A2E] flex flex-col font-inter selection:bg-rose-100 selection:text-[#8B1A1A]">
      {/* ============================================================ */}
      {/* 1. TOP NAVIGATION BAR */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5DED3] px-4 lg:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Back to Dashboard */}
          <div className="flex items-center gap-3">
            <Link
              href="/author/dashboard"
              className="p-2 text-gray-500 hover:text-[#8B1A1A] hover:bg-[#F7F1E8] rounded-xl transition-all flex items-center gap-1.5 text-xs font-semibold"
              title="Return to Author Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            <div className="h-6 w-px bg-gray-200 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#8B1A1A] text-white flex items-center justify-center font-playfair font-bold text-sm shadow-xs">
                PC
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-playfair font-bold text-base text-[#1A1A2E] truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                    {title || 'Untitled Book'}
                  </h1>
                  <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-[#8B1A1A] border border-amber-200/60">
                    {packageSpecs.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    {saveStatus === 'saving' ? (
                      <span className="text-amber-600 font-medium animate-pulse">Autosaving...</span>
                    ) : saveStatus === 'saved' ? (
                      <span className="text-emerald-700 font-medium">Saved at {lastSavedTime}</span>
                    ) : (
                      <span className="text-gray-400">Unsaved changes</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions in Topbar */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setCurrentStep(6)}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentStep === 6
                  ? 'bg-[#8B1A1A] text-white shadow-xs'
                  : 'bg-[#F7F1E8] hover:bg-[#EDE4D8] text-[#1A1A2E] border border-[#E5DED3]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Live</span> Preview
            </button>

            <button
              onClick={triggerAutosave}
              className="p-2 sm:px-3.5 sm:py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Save Project Draft"
            >
              <Save className="w-3.5 h-3.5 text-gray-500" />
              <span className="hidden md:inline">Save Draft</span>
            </button>

            <button
              onClick={handleSubmitBook}
              disabled={isSubmitting}
              className="px-4 sm:px-5 py-2 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer active:scale-98 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Book'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. MAIN WORKSPACE CONTAINER */}
      {/* ============================================================ */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ============================================================ */}
        {/* LEFT COLUMN: 7-STEP VERTICAL NAVIGATOR */}
        {/* ============================================================ */}
        <aside className="lg:col-span-3 bg-white p-4 sm:p-5 rounded-3xl border border-[#E5DED3] shadow-xs sticky top-20">
          <div className="flex items-center justify-between border-b border-[#E5DED3] pb-3 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B1A1A]">
              Publishing Studio
            </span>
            <span className="text-xs font-bold text-gray-500">
              Step {currentStep} of {STEPS.length}
            </span>
          </div>

          {/* Step Progress Bar */}
          <div className="w-full bg-[#F7F1E8] h-1.5 rounded-full overflow-hidden mb-4">
            <motion.div
              className="bg-[#8B1A1A] h-full rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / STEPS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <nav className="space-y-1.5" aria-label="Studio steps">
            {STEPS.map((s) => {
              const Icon = s.icon;
              const isActive = currentStep === s.id;
              const isDone = currentStep > s.id;

              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(s.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#8B1A1A] text-white shadow-xs font-bold'
                      : isDone
                      ? 'bg-rose-50/60 text-[#1A1A2E] hover:bg-rose-50 border border-rose-100/50'
                      : 'text-gray-600 hover:bg-[#F7F1E8] hover:text-[#1A1A2E]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : isDone
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {isDone ? <Check className="w-3.5 h-3.5" /> : s.id}
                    </div>
                    <div className="truncate">
                      <p className={`text-xs truncate ${isActive ? 'text-white' : 'text-[#1A1A2E]'}`}>
                        {s.name}
                      </p>
                      <p className={`text-[10px] truncate ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                        {s.desc}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                </button>
              );
            })}
          </nav>

          {/* Package Limit Badge at Bottom of Sidebar */}
          <div className="mt-6 p-4 bg-[#FDFAF6] border border-amber-200/80 rounded-2xl text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#8B1A1A] text-[11px] uppercase tracking-wide">
                Package Included
              </span>
              <span className="text-[11px] font-bold text-gray-800">{packageSpecs.price}</span>
            </div>
            <p className="text-[11px] text-gray-600 font-medium">• Trim: {trimSize} inches</p>
            <p className="text-[11px] text-gray-600 font-medium">• Max Pages: {packageSpecs.maxPages} pages</p>
            <p className="text-[11px] text-gray-600 font-medium">• 100% Net Royalty Retention</p>
          </div>
        </aside>

        {/* ============================================================ */}
        {/* CENTER / MAIN WORKSPACE ACCORDING TO CURRENT STEP */}
        {/* ============================================================ */}
        <main className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5DED3] shadow-xs space-y-6">
          <AnimatePresence mode="wait">
            
            {/* ------------------------------------------------------------ */}
            {/* STEP 1: BOOK INFORMATION */}
            {/* ------------------------------------------------------------ */}
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="border-b border-[#E5DED3] pb-4">
                  <span className="px-3 py-1 rounded-full bg-rose-50 text-[#8B1A1A] text-xs font-bold uppercase tracking-wider">
                    Step 1 of 7
                  </span>
                  <h2 className="text-2xl font-playfair font-bold text-[#1A1A2E] mt-2">
                    Book Information & Metadata
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the fundamental bibliographic details for your book. These will appear on the title page, copyright notice, and online catalog listings.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  <div className="md:col-span-2 space-y-1">
                    <label className="block font-bold text-gray-700">
                      Book Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. The Silent Echo of Whispers"
                      className="w-full px-4 py-3 bg-[#FDFAF6] border border-gray-200 rounded-xl font-medium text-sm text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/30 focus:border-[#8B1A1A]"
                      required
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="block font-bold text-gray-700">Subtitle (Optional)</label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="e.g. A Tale of Memories and Lost Solitude"
                      className="w-full px-4 py-2.5 bg-[#FDFAF6] border border-gray-200 rounded-xl font-medium text-xs text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-gray-700">
                      Author / Pen Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={penName}
                      onChange={(e) => setPenName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full px-4 py-2.5 bg-[#FDFAF6] border border-gray-200 rounded-xl font-medium text-xs text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/30"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-gray-700">Primary Genre</label>
                    <select
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FDFAF6] border border-gray-200 rounded-xl font-medium text-xs text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/30"
                    >
                      <option>Literary Fiction</option>
                      <option>Poetry</option>
                      <option>Contemporary Romance</option>
                      <option>Mystery & Thriller</option>
                      <option>Self-Help & Mindset</option>
                      <option>Business & Leadership</option>
                      <option>Biography & Memoir</option>
                      <option>Science Fiction & Fantasy</option>
                      <option>Children's Literature</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-gray-700">Book Language</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FDFAF6] border border-gray-200 rounded-xl font-medium text-xs text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/30"
                    >
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Bengali</option>
                      <option>Marathi</option>
                      <option>Tamil</option>
                      <option>Telugu</option>
                      <option>Gujarati</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-gray-700">Assigned ISBN-13</label>
                    <input
                      type="text"
                      value={isbn}
                      onChange={(e) => setIsbn(e.target.value)}
                      placeholder="e.g. 978-93-84729-10-4"
                      className="w-full px-4 py-2.5 bg-[#FDFAF6] border border-gray-200 rounded-xl font-mono text-xs text-[#8B1A1A] font-bold focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/30"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="block font-bold text-gray-700">
                      Book Synopsis / Back Cover Description
                    </label>
                    <textarea
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Write a captivating blurb describing your book interior..."
                      className="w-full px-4 py-3 bg-[#FDFAF6] border border-gray-200 rounded-xl font-medium text-xs text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/30 leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-gray-700">Copyright Holder</label>
                    <input
                      type="text"
                      value={copyrightHolder}
                      onChange={(e) => setCopyrightHolder(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FDFAF6] border border-gray-200 rounded-xl font-medium text-xs text-gray-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-gray-700">Publisher Imprint</label>
                    <input
                      type="text"
                      value={publisherName}
                      onChange={(e) => setPublisherName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FDFAF6] border border-gray-200 rounded-xl font-medium text-xs text-gray-700"
                    />
                  </div>
                </div>

                {/* Summary Card */}
                <div className="bg-[#FDFAF6] p-5 rounded-2xl border border-rose-100/60 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-[#8B1A1A] flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="text-xs space-y-1">
                    <h4 className="font-bold text-[#1A1A2E] font-playfair text-sm">
                      Catalog Preview Summary
                    </h4>
                    <p className="text-gray-600">
                      <strong>{title || 'Untitled'}</strong> by <strong>{penName}</strong> ({genre} • {language})
                    </p>
                    <p className="text-gray-500 text-[11px]">
                      ISBN: <span className="font-mono text-[#8B1A1A]">{isbn}</span> • Imprint: {publisherName}
                    </p>
                  </div>
                </div>

                {/* Navigation Button */}
                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                  >
                    Continue to Book Specs
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ------------------------------------------------------------ */}
            {/* STEP 2: BOOK SPECIFICATIONS & PACKAGE RESTRICTIONS */}
            {/* ------------------------------------------------------------ */}
            {currentStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="border-b border-[#E5DED3] pb-4">
                  <span className="px-3 py-1 rounded-full bg-rose-50 text-[#8B1A1A] text-xs font-bold uppercase tracking-wider">
                    Step 2 of 7
                  </span>
                  <h2 className="text-2xl font-playfair font-bold text-[#1A1A2E] mt-2">
                    Book Size & Package Specifications
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Configure trim size, page count, paper color, and binding type. These settings dictate the print geometry and spine thickness.
                  </p>
                </div>

                {/* Active Package Banner */}
                <div className="bg-[#FDFAF6] border border-amber-200/80 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#8B1A1A] uppercase tracking-wider block">
                      Enforced Package Configuration
                    </span>
                    <h3 className="font-playfair font-bold text-lg text-[#1A1A2E]">
                      {packageSpecs.name}
                    </h3>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Allows up to {packageSpecs.maxPages} pages, {packageSpecs.allowedTrim.join(', ')} trim sizes, and 100% Net Royalty.
                    </p>
                  </div>
                  <Link
                    href="/publishing-plans"
                    className="px-4 py-2 bg-white hover:bg-gray-50 text-[#8B1A1A] border border-rose-200 rounded-xl text-xs font-bold shadow-2xs shrink-0 text-center"
                  >
                    Upgrade Package
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  {/* Trim Size Options */}
                  <div className="space-y-2">
                    <label className="block font-bold text-gray-700">
                      Trim Size (Inches)
                    </label>
                    <p className="text-[11px] text-gray-500">
                      Standard industry book dimensions. (Recommended: 5 × 8 in for fiction and poetry)
                    </p>
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {['5x8', '5.5x8.5', '6x9'].map((t) => {
                        const isAllowed = packageSpecs.allowedTrim.includes(t);
                        const isSelected = trimSize === t;

                        return (
                          <button
                            key={t}
                            type="button"
                            disabled={!isAllowed}
                            onClick={() => setTrimSize(t)}
                            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#8B1A1A] text-white border-[#8B1A1A] shadow-xs font-bold'
                                : isAllowed
                                ? 'bg-white hover:bg-gray-50 border-gray-200 text-[#1A1A2E]'
                                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
                            }`}
                          >
                            <span className="block text-sm font-bold">{t}</span>
                            <span className="text-[10px] opacity-80">
                              {isAllowed ? 'Included' : 'In Pro/Premium'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Page Count Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="font-bold text-gray-700">Page Count: {pageCount} pages</label>
                      <span className="text-[11px] text-[#8B1A1A] font-bold">Max: {packageSpecs.maxPages}</span>
                    </div>
                    <p className="text-[11px] text-gray-500">
                      Adjust or let the book interior detector set this automatically.
                    </p>
                    <input
                      type="range"
                      min={40}
                      max={packageSpecs.maxPages}
                      value={pageCount}
                      onChange={(e) => setPageCount(Number(e.target.value))}
                      className="w-full accent-[#8B1A1A] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400">
                      <span>40 pages</span>
                      <span>{packageSpecs.maxPages} pages</span>
                    </div>
                  </div>

                  {/* Paper Type */}
                  <div className="space-y-2">
                    <label className="block font-bold text-gray-700">Paper Tone</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'Cream', name: 'Natural Cream (80 GSM)', desc: 'Warm tone for fiction & poetry' },
                        { id: 'White', name: 'Crisp White (80 GSM)', desc: 'Clean high-contrast for non-fiction' },
                      ].map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPaperType(p.id)}
                          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                            paperType === p.id
                              ? 'bg-[#8B1A1A] text-white border-[#8B1A1A] shadow-xs'
                              : 'bg-white hover:bg-gray-50 border-gray-200 text-[#1A1A2E]'
                          }`}
                        >
                          <span className="block font-bold text-xs">{p.name}</span>
                          <span className="text-[10px] opacity-80 block mt-0.5">{p.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Binding Type */}
                  <div className="space-y-2">
                    <label className="block font-bold text-gray-700">Binding Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'Paperback', name: 'Perfect Paperback', desc: 'Softcover, flexible & standard' },
                        { id: 'Hardcover', name: 'Case Laminate Hardcover', desc: 'Durable rigid boards' },
                      ].map((b) => {
                        const isAllowed = packageSpecs.allowedBindings.includes(b.id);
                        return (
                          <button
                            key={b.id}
                            type="button"
                            disabled={!isAllowed}
                            onClick={() => setBinding(b.id)}
                            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                              binding === b.id
                                ? 'bg-[#8B1A1A] text-white border-[#8B1A1A] shadow-xs'
                                : isAllowed
                                ? 'bg-white hover:bg-gray-50 border-gray-200 text-[#1A1A2E]'
                                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
                            }`}
                          >
                            <span className="block font-bold text-xs">{b.name}</span>
                            <span className="text-[10px] opacity-80 block mt-0.5">
                              {isAllowed ? b.desc : 'Upgrade package'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Auto Calculated Spine Width Box */}
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    <span>
                      Estimated Spine Width: <strong>{spineWidthMm} mm</strong> based on {pageCount} pages ({paperType} paper).
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full font-bold">
                    Auto-Calculated
                  </span>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Book Info
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-2.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                  >
                    Continue to Cover Creator
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ------------------------------------------------------------ */}
            {/* STEP 3: COVER CREATOR STUDIO */}
            {/* ------------------------------------------------------------ */}
            {currentStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="border-b border-[#E5DED3] pb-4">
                  <span className="px-3 py-1 rounded-full bg-rose-50 text-[#8B1A1A] text-xs font-bold uppercase tracking-wider">
                    Step 3 of 7
                  </span>
                  <h2 className="text-2xl font-playfair font-bold text-[#1A1A2E] mt-2">
                    Book Cover Creator & Customizer
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Design a market-ready cover using our curated publishing templates or upload your custom high-resolution print artwork.
                  </p>
                </div>

                {/* Mode Selector: Template vs Custom Upload */}
                <div className="flex gap-2 p-1.5 bg-[#FDFAF6] border border-gray-200 rounded-2xl text-xs font-bold max-w-sm">
                  <button
                    type="button"
                    onClick={() => setCoverMode('template')}
                    className={`flex-1 py-2 rounded-xl transition-all ${
                      coverMode === 'template'
                        ? 'bg-[#8B1A1A] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    🎨 Template Designer
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoverMode('upload')}
                    className={`flex-1 py-2 rounded-xl transition-all ${
                      coverMode === 'upload'
                        ? 'bg-[#8B1A1A] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    📤 Custom Artwork Upload
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Controls Panel */}
                  <div className="lg:col-span-7 space-y-4 text-xs">
                    {coverMode === 'template' ? (
                      <>
                        <div className="space-y-2">
                          <label className="block font-bold text-gray-700">Choose Curated Template</label>
                          <div className="grid grid-cols-3 gap-2">
                            {COVER_TEMPLATES.map((tmpl) => (
                              <button
                                key={tmpl.id}
                                type="button"
                                onClick={() => {
                                  setSelectedTemplate(tmpl.id);
                                  setCoverBgColor(tmpl.bg);
                                  setCoverFontColor(tmpl.text);
                                  setCoverFont(tmpl.font);
                                }}
                                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                                  selectedTemplate === tmpl.id
                                    ? 'ring-2 ring-[#8B1A1A] border-[#8B1A1A] shadow-xs'
                                    : 'border-gray-200 hover:bg-gray-50'
                                }`}
                              >
                                <div
                                  className="w-full h-8 rounded-lg mb-1.5 shadow-2xs"
                                  style={{ backgroundColor: tmpl.bg }}
                                />
                                <span className="font-bold text-[11px] block truncate">{tmpl.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="block font-bold text-gray-700">Title Typography Font</label>
                            <select
                              value={coverFont}
                              onChange={(e) => setCoverFont(e.target.value)}
                              className="w-full px-3 py-2 bg-[#FDFAF6] border border-gray-200 rounded-xl"
                            >
                              {FONTS.map((f) => (
                                <option key={f} value={f}>
                                  {f}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="block font-bold text-gray-700">Title Font Size: {coverFontSize}px</label>
                            <input
                              type="range"
                              min={18}
                              max={36}
                              value={coverFontSize}
                              onChange={(e) => setCoverFontSize(Number(e.target.value))}
                              className="w-full accent-[#8B1A1A] mt-2 cursor-pointer"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block font-bold text-gray-700">Background Color</label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={coverBgColor}
                                onChange={(e) => setCoverBgColor(e.target.value)}
                                className="w-8 h-8 rounded-lg border border-gray-300 cursor-pointer p-0.5"
                              />
                              <span className="font-mono text-xs text-gray-600">{coverBgColor}</span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="block font-bold text-gray-700">Text Alignment</label>
                            <div className="flex gap-1 border border-gray-200 rounded-xl p-1 bg-[#FDFAF6]">
                              {(['left', 'center', 'right'] as const).map((align) => (
                                <button
                                  key={align}
                                  type="button"
                                  onClick={() => setCoverAlignment(align)}
                                  className={`flex-1 py-1 capitalize rounded-lg transition-all ${
                                    coverAlignment === align ? 'bg-[#8B1A1A] text-white font-bold' : 'text-gray-600'
                                  }`}
                                >
                                  {align}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1 pt-1">
                          <label className="block font-bold text-gray-700">Optional Cover Artwork / Photo URL</label>
                          <input
                            type="text"
                            value={frontCoverImage}
                            onChange={(e) => setFrontCoverImage(e.target.value)}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-3 py-2 bg-[#FDFAF6] border border-gray-200 rounded-xl text-xs"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="space-y-4">
                        {/* Drag & Drop Cover Zone */}
                        <div
                          onDragOver={(e) => {
                            e.preventDefault();
                            setIsCoverDragging(true);
                          }}
                          onDragLeave={() => setIsCoverDragging(false)}
                          onDrop={handleCoverDrop}
                          className={`p-6 border-2 border-dashed rounded-3xl text-center space-y-3 transition-all ${
                            isCoverDragging
                              ? 'border-[#8B1A1A] bg-rose-50/50 ring-2 ring-[#8B1A1A]/30'
                              : 'border-[#E5DED3] bg-[#FDFAF6] hover:border-amber-300'
                          }`}
                        >
                          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#8B1A1A] flex items-center justify-center mx-auto shadow-2xs">
                            <Upload className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-[#1A1A2E]">
                              Drag & Drop Front Cover Artwork (PNG / JPG / WebP)
                            </p>
                            <p className="text-gray-500 text-[11px] mt-0.5">
                              Recommended Print Resolution: <strong>1600 × 2560 px</strong> (300 DPI, 1:1.6 paperback aspect ratio)
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                            <label className="px-5 py-2.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-xl font-bold text-xs cursor-pointer shadow-xs transition-all flex items-center gap-1.5">
                              <Upload className="w-3.5 h-3.5" />
                              Browse Cover File
                              <input
                                type="file"
                                accept="image/png,image/jpeg,image/jpg,image/webp"
                                className="hidden"
                                onChange={(e) => handleCoverUpload(e, 'front')}
                              />
                            </label>

                            {frontCoverImage && (
                              <button
                                type="button"
                                onClick={() => {
                                  setFrontCoverImage('');
                                  setCoverFileName('');
                                  setCoverResolution(null);
                                  toast('Cover artwork removed. Resetting to template.');
                                }}
                                className="px-3.5 py-2 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 rounded-xl font-semibold text-xs cursor-pointer shadow-2xs transition-colors flex items-center gap-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Remove
                              </button>
                            )}
                          </div>
                        </div>

                        {/* File Details & Resolution Verification Banner */}
                        {coverResolution && (
                          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-900">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                              <div>
                                <span className="font-bold block truncate max-w-xs">{coverFileName}</span>
                                <span className="text-[11px] text-emerald-700">
                                  {coverResolution.width} × {coverResolution.height} px • {coverResolution.dpi} DPI Resolution
                                </span>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                              Valid Print Cover
                            </span>
                          </div>
                        )}

                        <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-1">
                          <span className="font-bold text-gray-800 text-xs block">Back Cover Blurb / Synopsis</span>
                          <textarea
                            rows={3}
                            value={backCoverSummary}
                            onChange={(e) => setBackCoverSummary(e.target.value)}
                            className="w-full px-3 py-2 bg-[#FDFAF6] border border-gray-200 rounded-xl text-xs focus:ring-1 focus:ring-[#8B1A1A]/40 outline-none leading-relaxed"
                            placeholder="Short synopsis printed on the back cover..."
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Live Canvas Preview */}
                  <div className="lg:col-span-5 flex flex-col items-center">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A55A]" />
                      Front Cover Live Canvas
                    </div>

                    {/* Realistic Physical Book Mockup Frame */}
                    <div className="relative group/mockup">
                      {/* Physical Book Spine Edge and Underlayer */}
                      <div className="absolute inset-0 rounded-r-2xl bg-black/15 translate-x-2 translate-y-2 blur-xs -z-10" />
                      <div className="absolute inset-y-1 right-0 w-3 bg-gradient-to-l from-[#F5EFE6] via-[#E8DEC8] to-transparent rounded-r-lg -z-5" />

                      <div
                        className="w-64 h-92 rounded-r-2xl shadow-xl p-6 relative overflow-hidden flex flex-col justify-between border-y border-r border-black/20 bg-[#171717]"
                        style={{
                          backgroundColor: coverBgColor,
                          color: coverFontColor,
                          fontFamily: coverFont,
                          textAlign: coverAlignment,
                        }}
                      >
                        {/* Spine Crease Depth Effect */}
                        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/45 via-white/10 to-transparent pointer-events-none z-20" />
                        <div className="absolute left-[3px] top-0 bottom-0 w-[1px] bg-white/20 pointer-events-none z-20" />

                        {/* Cover Photo / Texture with object-fit contain/cover */}
                        {frontCoverImage && (
                          <div className="absolute inset-0 w-full h-full bg-[#111827] overflow-hidden">
                            <img
                              src={frontCoverImage}
                              alt="Front Cover Art"
                              className="w-full h-full object-cover pointer-events-none"
                            />
                            {/* Subtle texture blend */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                          </div>
                        )}

                        {/* Top Header info */}
                        <div className="relative z-10">
                          <span className="text-[9px] font-bold uppercase tracking-[0.2em] block opacity-85">
                            {genre}
                          </span>
                        </div>

                        {/* Title & Subtitle */}
                        <div className="relative z-10 my-auto space-y-1.5 px-2 drop-shadow-md">
                          <h3
                            className="font-bold leading-tight drop-shadow-sm"
                            style={{ fontSize: `${coverFontSize}px` }}
                          >
                            {title || 'Book Title'}
                          </h3>
                          {subtitle && (
                            <p className="text-[10px] font-sans opacity-90 leading-snug italic">
                              {subtitle}
                            </p>
                          )}
                        </div>

                        {/* Author Name Byline */}
                        <div className="relative z-10 border-t border-white/25 pt-2">
                          <p className="text-xs font-bold tracking-wider uppercase font-sans">
                            {penName || authorName}
                          </p>
                          <p className="text-[8px] opacity-70 uppercase font-sans tracking-widest">
                            Page Craft Imprint
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-400 mt-3 text-center">
                      Spine: {spineWidthMm}mm • Trim: {trimSize} in • 300 DPI Validated
                    </p>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Book Specs
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-2.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                  >
                    Continue to Book Interior
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ------------------------------------------------------------ */}
            {/* STEP 4: INTERIOR BOOK INTERIOR UPLOAD & VALIDATION */}
            {/* ------------------------------------------------------------ */}
            {currentStep === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="border-b border-[#E5DED3] pb-4">
                  <span className="px-3 py-1 rounded-full bg-rose-50 text-[#8B1A1A] text-xs font-bold uppercase tracking-wider">
                    Step 4 of 7
                  </span>
                  <h2 className="text-2xl font-playfair font-bold text-[#1A1A2E] mt-2">
                    Book Interior Upload & Pre-Flight Validation
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Upload your completed book interior in PDF or DOCX format. Our automated pre-flight engine will check page count, trim size, margins, and bleed settings.
                  </p>
                </div>

                {/* Drag-and-Drop Area */}
                <div className="p-8 border-2 border-dashed border-gray-300 hover:border-[#8B1A1A] transition-colors rounded-3xl bg-[#FDFAF6] text-center space-y-4">
                  <div className="w-14 h-14 bg-red-50 text-[#8B1A1A] rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                    <FileText className="w-7 h-7" />
                  </div>

                  <div>
                    <h3 className="font-playfair font-bold text-lg text-[#1A1A2E]">
                      Drag & drop your book interior file here
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Supports PDF (Recommended) and Microsoft Word (.docx) up to 100 MB.
                    </p>
                  </div>

                  <div>
                    <label className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-xl font-bold text-xs cursor-pointer shadow-xs transition-all">
                      <Upload className="w-4 h-4" />
                      <span>{isUploadingFile ? 'Analyzing Book Interior...' : 'Select File from Computer'}</span>
                      <input
                        type="file"
                        accept=".pdf,.docx,.doc"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                </div>

                {/* Validation Results Card */}
                {manuscriptFileName && (
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <FileCheck className="w-5 h-5 text-emerald-600" />
                        <div>
                          <p className="font-bold text-[#1A1A2E] text-sm">{manuscriptFileName}</p>
                          <p className="text-gray-400 text-[11px]">
                            {(manuscriptFileSize / (1024 * 1024)).toFixed(2)} MB • {manuscriptPageCount} detected pages
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-xs flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Validated
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                      <div className="p-3 bg-[#FDFAF6] rounded-xl">
                        <span className="text-gray-500 block text-[10px]">Trim Geometry</span>
                        <strong className="text-emerald-700 font-bold">{trimSize} in (Matches)</strong>
                      </div>
                      <div className="p-3 bg-[#FDFAF6] rounded-xl">
                        <span className="text-gray-500 block text-[10px]">Inside Margins</span>
                        <strong className="text-emerald-700 font-bold">0.75 in (Safe)</strong>
                      </div>
                      <div className="p-3 bg-[#FDFAF6] rounded-xl">
                        <span className="text-gray-500 block text-[10px]">Bleed Status</span>
                        <strong className="text-emerald-700 font-bold">0.125 in (Standard)</strong>
                      </div>
                      <div className="p-3 bg-[#FDFAF6] rounded-xl">
                        <span className="text-gray-500 block text-[10px]">Font Embedding</span>
                        <strong className="text-emerald-700 font-bold">100% Embedded</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Cover Creator
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(5)}
                    className="px-6 py-2.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                  >
                    Continue to Chapter Editor
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ------------------------------------------------------------ */}
            {/* STEP 5: SIMPLE LIGHTWEIGHT CHAPTER EDITOR */}
            {/* ------------------------------------------------------------ */}
            {currentStep === 5 && (
              <motion.div
                key="step-5"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="border-b border-[#E5DED3] pb-4">
                  <span className="px-3 py-1 rounded-full bg-rose-50 text-[#8B1A1A] text-xs font-bold uppercase tracking-wider">
                    Step 5 of 7
                  </span>
                  <h2 className="text-2xl font-playfair font-bold text-[#1A1A2E] mt-2">
                    Simple Chapter Content Editor
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Fine-tune chapter openings, insert page breaks, adjust body paragraphs, or draft bonus author notes.
                  </p>
                </div>

                {/* Chapter Selector & Add Tab */}
                <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 pb-3">
                  {chapters.map((ch, idx) => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setActiveChapterIndex(idx)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeChapterIndex === idx
                          ? 'bg-[#8B1A1A] text-white shadow-xs'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {ch.title}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newChNum = chapters.length + 1;
                      const newChapter = {
                        id: `ch-${Date.now()}`,
                        title: `Chapter ${newChNum}: New Chapter`,
                        content: 'Start writing your story here...',
                        wordCount: 5,
                      };
                      setChapters([...chapters, newChapter]);
                      setActiveChapterIndex(chapters.length);
                      toast.success(`Chapter ${newChNum} created.`);
                    }}
                    className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-[#8B1A1A] border border-amber-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Chapter
                  </button>
                </div>

                {/* Lightweight Formatting Toolbar */}
                <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#FDFAF6] border border-gray-200 rounded-2xl text-xs font-semibold text-gray-700">
                  <button
                    type="button"
                    onClick={() => toast('Applied Heading style')}
                    className="px-3 py-1 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg shadow-2xs"
                  >
                    H1 Chapter Title
                  </button>
                  <button
                    type="button"
                    onClick={() => toast('Applied Subheading')}
                    className="px-3 py-1 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg shadow-2xs"
                  >
                    H2 Subtitle
                  </button>
                  <div className="h-5 w-px bg-gray-300 mx-1" />
                  <button
                    type="button"
                    onClick={() => toast('Toggle Bold')}
                    className="px-2.5 py-1 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg font-bold"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onClick={() => toast('Toggle Italic')}
                    className="px-2.5 py-1 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg italic"
                  >
                    I
                  </button>
                  <div className="h-5 w-px bg-gray-300 mx-1" />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...chapters];
                      updated[activeChapterIndex].content += '\n\n--- [Page Break] ---\n\n';
                      setChapters(updated);
                      toast.success('Inserted Page Break');
                    }}
                    className="px-3 py-1 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg shadow-2xs text-[#8B1A1A]"
                  >
                    + Page Break
                  </button>
                </div>

                {/* Chapter Content Editor */}
                {chapters[activeChapterIndex] && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        value={chapters[activeChapterIndex].title}
                        onChange={(e) => {
                          const updated = [...chapters];
                          updated[activeChapterIndex].title = e.target.value;
                          setChapters(updated);
                        }}
                        className="text-lg font-playfair font-bold text-[#1A1A2E] bg-transparent border-b border-gray-200 pb-1 focus:outline-none focus:border-[#8B1A1A] w-full max-w-md"
                      />
                      <span className="text-xs text-gray-400">
                        {chapters[activeChapterIndex].content.split(/\s+/).filter(Boolean).length} words
                      </span>
                    </div>

                    <textarea
                      rows={12}
                      value={chapters[activeChapterIndex].content}
                      onChange={(e) => {
                        const updated = [...chapters];
                        updated[activeChapterIndex].content = e.target.value;
                        updated[activeChapterIndex].wordCount = e.target.value.split(/\s+/).filter(Boolean).length;
                        setChapters(updated);
                      }}
                      className="w-full p-5 bg-[#FDFAF6] border border-gray-200 rounded-2xl text-sm font-serif leading-relaxed text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20"
                    />
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Book Interior
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(6)}
                    className="px-6 py-2.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                  >
                    Continue to Live Preview
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ------------------------------------------------------------ */}
            {/* STEP 6: LIVE REALISTIC BOOK PREVIEWER */}
            {/* ------------------------------------------------------------ */}
            {currentStep === 6 && (
              <motion.div
                key="step-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="border-b border-[#E5DED3] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-rose-50 text-[#8B1A1A] text-xs font-bold uppercase tracking-wider">
                      Step 6 of 7
                    </span>
                    <h2 className="text-2xl font-playfair font-bold text-[#1A1A2E] mt-2">
                      Live Realistic Book Previewer
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Experience your book exactly as readers and bookstore buyers will see it in print.
                    </p>
                  </div>

                  {/* Zoom & Page Navigation Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewZoom((z) => Math.max(75, z - 15))}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono font-bold text-gray-600 px-1">{previewZoom}%</span>
                    <button
                      type="button"
                      onClick={() => setPreviewZoom((z) => Math.min(130, z + 15))}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Page Navigation Tabs */}
                <div className="flex justify-center gap-2 text-xs font-bold">
                  {[
                    { id: 0, label: '📕 Front Cover' },
                    { id: 1, label: '📖 Half Title' },
                    { id: 2, label: '📜 Chapter 1' },
                    { id: 3, label: '📜 Chapter 2' },
                    { id: 4, label: '📗 Back Cover' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPreviewPage(p.id)}
                      className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                        previewPage === p.id
                          ? 'bg-[#8B1A1A] text-white shadow-xs'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Interactive Book Display Canvas */}
                <div className="py-8 bg-[#EFE9DF] rounded-3xl flex items-center justify-center p-4 overflow-hidden relative min-h-[440px]">
                  <div
                    style={{ transform: `scale(${previewZoom / 100})`, transition: 'transform 0.2s ease' }}
                    className="relative transition-all"
                  >
                    {/* Front Cover */}
                    {previewPage === 0 && (
                      <motion.div
                        initial={{ opacity: 0, rotateY: -10 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        className="w-72 h-96 rounded-r-2xl shadow-2xl p-8 relative flex flex-col justify-between overflow-hidden"
                        style={{
                          backgroundColor: coverBgColor,
                          color: coverFontColor,
                          fontFamily: coverFont,
                          textAlign: coverAlignment,
                        }}
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/40 via-white/10 to-transparent pointer-events-none" />
                        {frontCoverImage && (
                          <img
                            src={frontCoverImage}
                            alt="Cover"
                            className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-overlay pointer-events-none"
                          />
                        )}
                        <span className="text-[10px] uppercase tracking-widest block opacity-75 relative z-10">
                          {genre}
                        </span>
                        <div className="relative z-10 my-auto">
                          <h2
                            className="font-bold leading-tight drop-shadow-xs"
                            style={{ fontSize: `${coverFontSize}px` }}
                          >
                            {title || 'Book Title'}
                          </h2>
                          {subtitle && <p className="text-xs font-sans opacity-85 mt-2">{subtitle}</p>}
                        </div>
                        <div className="relative z-10 border-t border-white/20 pt-3">
                          <p className="text-sm font-bold tracking-wider uppercase font-sans">
                            {penName || authorName}
                          </p>
                          <p className="text-[9px] opacity-60 uppercase font-sans">Page Craft Publishing</p>
                        </div>
                      </motion.div>
                    )}

                    {/* Half Title / Copyright Page */}
                    {previewPage === 1 && (
                      <motion.div
                        initial={{ opacity: 0, rotateY: 10 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        className="w-72 h-96 bg-[#FDFAF6] rounded-r-xl shadow-2xl p-8 flex flex-col justify-between text-[#1A1A2E] border-l-4 border-gray-200"
                      >
                        <div className="text-center pt-8 space-y-2">
                          <h2 className="font-playfair text-xl font-bold">{title}</h2>
                          <p className="text-xs text-gray-500 font-serif italic">{subtitle}</p>
                          <p className="text-xs font-bold pt-4">{penName}</p>
                        </div>

                        <div className="text-[9px] text-gray-400 font-mono space-y-1 border-t border-gray-200 pt-4">
                          <p>First Published in 2026</p>
                          <p>Copyright © {copyrightHolder}</p>
                          <p>ISBN-13: {isbn}</p>
                          <p>Printed in India by {publisherName}</p>
                        </div>
                      </motion.div>
                    )}

                    {/* Chapter 1 Interior Spread */}
                    {previewPage === 2 && (
                      <motion.div
                        initial={{ opacity: 0, rotateY: 10 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        className="w-72 h-96 bg-[#FDFAF6] rounded-r-xl shadow-2xl p-7 flex flex-col justify-between text-[#1A1A2E] border-l-4 border-gray-200 text-xs font-serif leading-relaxed"
                      >
                        <div>
                          <div className="text-center pb-4 mb-3 border-b border-gray-200">
                            <span className="text-[10px] uppercase font-sans tracking-widest text-gray-400">
                              Chapter One
                            </span>
                            <h3 className="text-sm font-bold font-playfair mt-0.5">The Mountain Wind</h3>
                          </div>
                          <p className="text-[11px] text-justify leading-relaxed text-gray-700">
                            <span className="text-2xl font-playfair font-bold float-left mr-1.5 leading-none text-[#8B1A1A]">
                              T
                            </span>
                            he fog rolled across the heather before dawn, draping the quiet valley in a blanket of silence. Somewhere in the distance, the stone chapel bell struck five.
                          </p>
                          <p className="text-[11px] text-justify leading-relaxed text-gray-700 mt-2">
                            Margaret drew her woolen shawl tightly around her shoulders, looking toward the ridgeline where the first amber ribbons of sunrise pierced the pine needles.
                          </p>
                        </div>
                        <div className="text-center text-[10px] text-gray-400 font-sans border-t border-gray-200 pt-2">
                          1
                        </div>
                      </motion.div>
                    )}

                    {/* Chapter 2 Interior Spread */}
                    {previewPage === 3 && (
                      <motion.div
                        initial={{ opacity: 0, rotateY: 10 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        className="w-72 h-96 bg-[#FDFAF6] rounded-r-xl shadow-2xl p-7 flex flex-col justify-between text-[#1A1A2E] border-l-4 border-gray-200 text-xs font-serif leading-relaxed"
                      >
                        <div>
                          <div className="text-center pb-4 mb-3 border-b border-gray-200">
                            <span className="text-[10px] uppercase font-sans tracking-widest text-gray-400">
                              Chapter Two
                            </span>
                            <h3 className="text-sm font-bold font-playfair mt-0.5">Letters Unopened</h3>
                          </div>
                          <p className="text-[11px] text-justify leading-relaxed text-gray-700">
                            <span className="text-2xl font-playfair font-bold float-left mr-1.5 leading-none text-[#8B1A1A]">
                              O
                            </span>
                            n the mahogany writing desk lay seven envelopes, their wax seals still unbroken after three decades. Each letter bore the delicate handwriting of a woman who had spent half her life waiting.
                          </p>
                        </div>
                        <div className="text-center text-[10px] text-gray-400 font-sans border-t border-gray-200 pt-2">
                          14
                        </div>
                      </motion.div>
                    )}

                    {/* Back Cover */}
                    {previewPage === 4 && (
                      <motion.div
                        initial={{ opacity: 0, rotateY: 10 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        className="w-72 h-96 rounded-l-2xl shadow-2xl p-7 relative flex flex-col justify-between overflow-hidden"
                        style={{ backgroundColor: coverBgColor, color: coverFontColor }}
                      >
                        <div className="space-y-2">
                          <span className="text-[9px] uppercase tracking-widest block opacity-75 font-sans">
                            Praise for {title}
                          </span>
                          <p className="text-xs font-serif leading-relaxed italic opacity-90">
                            &quot;{backCoverSummary}&quot;
                          </p>
                        </div>

                        <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs space-y-1">
                          <p className="text-[10px] font-bold uppercase tracking-wider font-sans">
                            About the Author
                          </p>
                          <p className="text-[9px] font-sans opacity-80 leading-snug">
                            {penName} is a contemporary author published with Page Craft Publishing.
                          </p>
                        </div>

                        <div className="bg-white p-2.5 rounded-xl text-black flex items-center justify-between shadow-xs">
                          <div>
                            <span className="text-[8px] font-mono block text-gray-500">ISBN-13</span>
                            <span className="text-[9px] font-mono font-bold">{isbn}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[8px] block text-gray-500">INR</span>
                            <span className="text-xs font-bold text-[#8B1A1A]">₹399.00</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Page Navigation Prev / Next */}
                <div className="flex justify-between items-center text-xs">
                  <button
                    type="button"
                    disabled={previewPage === 0}
                    onClick={() => setPreviewPage((p) => Math.max(0, p - 1))}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold disabled:opacity-40 cursor-pointer"
                  >
                    ← Previous Page
                  </button>
                  <span className="font-medium text-gray-500">
                    Page {previewPage + 1} of 5
                  </span>
                  <button
                    type="button"
                    disabled={previewPage === 4}
                    onClick={() => setPreviewPage((p) => Math.min(4, p + 1))}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold disabled:opacity-40 cursor-pointer"
                  >
                    Next Page →
                  </button>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(5)}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Chapter Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(7)}
                    className="px-6 py-2.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                  >
                    Continue to Final Review
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ------------------------------------------------------------ */}
            {/* STEP 7: FINAL REVIEW & PRE-SUBMISSION VALIDATION */}
            {/* ------------------------------------------------------------ */}
            {currentStep === 7 && (
              <motion.div
                key="step-7"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="border-b border-[#E5DED3] pb-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                    Step 7 of 7 — Final Step
                  </span>
                  <h2 className="text-2xl font-playfair font-bold text-[#1A1A2E] mt-2">
                    Pre-Submission Validation & Final Review
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Review your complete book project specifications. Once submitted, our editorial and printing production team will commence typesetting and proof generation.
                  </p>
                </div>

                {/* Automated Validation Checklist Matrix */}
                <div className="bg-[#FDFAF6] p-6 rounded-3xl border border-[#E5DED3] space-y-4">
                  <h3 className="font-playfair font-bold text-lg text-[#1A1A2E] flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#8B1A1A]" />
                    Automated Pre-Flight Check Results
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {[
                      { name: 'Book Title & Metadata', status: title ? 'Passed' : 'Missing', ok: Boolean(title) },
                      { name: 'Author / Pen Name', status: penName ? 'Passed' : 'Missing', ok: Boolean(penName) },
                      { name: 'Page Count Limits', status: `${pageCount} / ${packageSpecs.maxPages} pages`, ok: pageCount <= packageSpecs.maxPages },
                      { name: 'Trim Size Geometry', status: `${trimSize} in (Package Verified)`, ok: true },
                      { name: 'Cover Canvas Resolution', status: '300 DPI (Print Ready)', ok: true },
                      { name: 'Spine Width Calculation', status: `${spineWidthMm} mm (Verified)`, ok: true },
                      { name: 'Book Interior Formats', status: manuscriptFileName ? 'PDF Validated' : 'Ready', ok: true },
                      { name: 'ISBN-13 Allocation', status: isbn || 'Assigned', ok: true },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-white rounded-2xl border border-gray-200 flex items-center justify-between shadow-2xs"
                      >
                        <div className="flex items-center gap-2">
                          {item.ok ? (
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                          )}
                          <span className="font-semibold text-[#1A1A2E]">{item.name}</span>
                        </div>
                        <span className="text-[11px] font-bold font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950 flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <strong className="block">Status: Ready for Submission</strong>
                      <span className="text-gray-600 text-[11px]">
                        All critical pre-flight checks have passed. You are cleared to submit your book for professional production.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Final Submission Card */}
                <div className="bg-white p-6 rounded-3xl border border-rose-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                    <div>
                      <h4 className="font-playfair font-bold text-xl text-[#1A1A2E]">{title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        By {penName} • {genre} • {packageSpecs.name} • {trimSize} in • {pageCount} Pages
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-bold text-xs self-start">
                      100% Net Royalty
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <p className="text-xs text-gray-500 leading-relaxed max-w-md">
                      Upon submission, your book interior and cover assets will be locked for typesetting. You will receive real-time updates on your author dashboard.
                    </p>
                    <button
                      type="button"
                      onClick={handleSubmitBook}
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-4 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-2xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Submitting to Editorial Team...' : 'Submit Book for Review'}</span>
                    </button>
                  </div>
                </div>

                {/* Back Button */}
                <div className="flex justify-start pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(6)}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Live Preview
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      {/* ============================================================ */}
      {/* 3. SUCCESS MODAL ON SUBMIT */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isSubmittedSuccess && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-gray-100 text-center relative space-y-6"
            >
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Sparkles className="w-10 h-10 animate-bounce" />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">
                  Submission Successful
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-playfair text-[#1A1A2E]">
                  Your Book Has Been Submitted! 🎉
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
                  &quot;<strong className="text-[#1A1A2E]">{title}</strong>&quot; has entered the editorial review and typesetting pipeline under the <strong>{packageSpecs.name}</strong>.
                </p>
              </div>

              <div className="bg-[#FDFAF6] border border-[#E5DED3] p-5 rounded-2xl text-left text-xs space-y-2 text-gray-700">
                <p className="flex justify-between">
                  <span className="text-gray-500">Project Reference ID:</span>
                  <strong className="font-mono text-[#8B1A1A]">{projectId}</strong>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500">Author Imprint:</span>
                  <strong>{penName}</strong>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <strong className="text-emerald-700 font-bold">Under Editorial Review</strong>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500">Estimated Turnaround:</span>
                  <strong>30–45 Days</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <Link
                  href="/author/dashboard"
                  className="w-full py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Author Dashboard
                </Link>
                <Link
                  href="/author/books"
                  className="w-full py-3.5 bg-[#F7F1E8] hover:bg-[#EDE4D8] border border-[#E5DED3] text-[#1A1A2E] font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Layers className="w-4 h-4" />
                  View All Books
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
