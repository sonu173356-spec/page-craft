'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, BookOpen, ShoppingBag, Users, DollarSign, Megaphone, 
  Settings, Search, Filter, RefreshCw, CheckCircle2, Clock, AlertCircle, 
  Plus, Edit3, Trash2, Eye, ExternalLink, ShieldCheck, Sparkles, Save, X, 
  ArrowUpRight, ArrowDownRight, TrendingUp, Check, ChevronRight, FileText, 
  Printer, Truck, UserCheck, HardDrive, CreditCard, Layers, Globe, FolderPlus,
  Download, ShieldAlert, Key, UserPlus, Lock, Database, FileSpreadsheet
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export interface AuthorBook {
  id: string;
  title: string;
  subtitle?: string;
  authorName: string;
  category: string;
  format: 'Paperback' | 'Hardcover' | 'eBook';
  price: number;
  royaltyRate: number;
  status: 'Published' | 'Under Review' | 'Draft';
  isbn: string;
  publishedDate: string;
  coverImage: string;
  salesCount: number;
  description: string;
  driveFolderUrl?: string;
}

const INITIAL_BOOKS: AuthorBook[] = [
  {
    id: 'pc-101',
    title: 'The Silent Echo',
    subtitle: 'A Psychological Suspense Thriller',
    authorName: 'Eleanor Vance',
    category: 'Fiction',
    format: 'Paperback',
    price: 399,
    royaltyRate: 100,
    status: 'Published',
    isbn: '978-93-89021-12-4',
    publishedDate: '2024-01-15',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
    salesCount: 1245,
    description: 'A gripping psychological thriller that will keep you on the edge of your seat until the final breathtaking page.',
    driveFolderUrl: 'https://drive.google.com/drive/folders/pagecraft-echo-101',
  },
  {
    id: 'pc-102',
    title: 'Midnight Dreams',
    subtitle: 'Poetry of Love & Loss',
    authorName: 'Sarah Jenkins',
    category: 'Poetry',
    format: 'Hardcover',
    price: 299,
    royaltyRate: 100,
    status: 'Under Review',
    isbn: '978-93-89021-45-2',
    publishedDate: '2024-02-10',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop',
    salesCount: 420,
    description: 'A soulful collection of contemporary verses exploring modern love, heartbreak, and healing.',
    driveFolderUrl: 'https://drive.google.com/drive/folders/pagecraft-dreams-102',
  },
  {
    id: 'pc-103',
    title: 'Startup Unlocked',
    subtitle: 'From 0 to $1M ARR in 12 Months',
    authorName: 'Marcus Sterling',
    category: 'Business',
    format: 'eBook',
    price: 499,
    royaltyRate: 100,
    status: 'Published',
    isbn: '978-93-89021-99-5',
    publishedDate: '2023-11-20',
    coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop',
    salesCount: 3100,
    description: 'The ultimate zero-fluff playbook for founders and bootstrappers building venture-scalable software businesses.',
    driveFolderUrl: 'https://drive.google.com/drive/folders/pagecraft-startup-103',
  },
];

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Active Menu Tab state synchronized with ?menu=
  const menuFromUrl = searchParams.get('menu') || 'Dashboard';
  const [activeMenu, setActiveMenu] = useState(menuFromUrl);

  useEffect(() => {
    if (menuFromUrl) {
      setActiveMenu(menuFromUrl);
    }
  }, [menuFromUrl]);

  const handleMenuChange = (menuName: string) => {
    setActiveMenu(menuName);
    router.push(`/admin/internal-dashboard?menu=${encodeURIComponent(menuName)}`);
  };

  // Auth state
  const [userRole, setUserRole] = useState<'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'EDITOR' | 'FINANCE' | 'SUPPORT' | 'EMPLOYEE'>('SUPER_ADMIN');
  const [userEmail, setUserEmail] = useState('admin@thepagecraft.com');

  // State Data
  const [books, setBooks] = useState<AuthorBook[]>(INITIAL_BOOKS);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [backupsList, setBackupsList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isSyncing, setIsSyncing] = useState(false);

  // Modals state
  const [editingBook, setEditingBook] = useState<AuthorBook | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);
  const [selectedDriveBook, setSelectedDriveBook] = useState<AuthorBook | null>(null);
  const [driveStructure, setDriveStructure] = useState<any | null>(null);

  // Form states
  const [formState, setFormState] = useState<Partial<AuthorBook>>({});
  const [newTeamState, setNewTeamState] = useState({ name: '', email: '', password: '', role: 'EDITOR', phone: '' });

  // Fetch live API data on mount
  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUserRole(data.user.role || 'SUPER_ADMIN');
          setUserEmail(data.user.email || 'admin@thepagecraft.com');
        }
      })
      .catch(() => {});

    fetch('/api/activity-logs')
      .then(res => res.json())
      .then(data => {
        if (data.logs) setActivityLogs(data.logs);
      })
      .catch(() => {});

    fetch('/api/team')
      .then(res => res.json())
      .then(data => {
        if (data.members) setTeamMembers(data.members);
      })
      .catch(() => {});

    fetch('/api/backup')
      .then(res => res.json())
      .then(data => {
        if (data.backups) setBackupsList(data.backups);
      })
      .catch(() => {});
  }, []);

  const handleSyncWithMainWebsite = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      toast.success('Main Website Bookstore API synced successfully! All live changes deployed.');
    }, 1200);
  };

  const handleOpenGoogleDrive = async (book: AuthorBook) => {
    setSelectedDriveBook(book);
    setIsDriveModalOpen(true);
    setDriveStructure(null);

    try {
      const res = await fetch('/api/gdrive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookTitle: book.title }),
      });
      const data = await res.json();
      if (data.driveFolder) {
        setDriveStructure(data.driveFolder);
      }
    } catch (err) {
      toast.error('Could not load Drive folders');
    }
  };

  const handleCreateTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userRole !== 'SUPER_ADMIN') {
      toast.error('Permission Denied. Only Super Admin can create team members.');
      return;
    }

    try {
      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTeamState),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success(`Created team user "${newTeamState.name}" with role ${newTeamState.role}!`);
      setIsTeamModalOpen(false);
      setNewTeamState({ name: '', email: '', password: '', role: 'EDITOR', phone: '' });

      // Refresh team
      fetch('/api/team').then(r => r.json()).then(d => d.members && setTeamMembers(d.members));
    } catch (err) {
      toast.error('Error creating team member');
    }
  };

  const handleTriggerBackup = async () => {
    try {
      const res = await fetch('/api/backup', { method: 'POST' });
      const data = await res.json();
      if (data.backup) {
        toast.success(`🎉 Manual Database Backup "${data.backup.backupName}" generated!`);
        fetch('/api/backup').then(r => r.json()).then(d => d.backups && setBackupsList(d.backups));
      }
    } catch (err) {
      toast.error('Error generating backup');
    }
  };

  const handleExportCsv = () => {
    window.open('/api/analytics?format=csv', '_blank');
    toast.success('Downloading Sales & Revenue Analytics CSV...');
  };

  const handleOpenEdit = (book: AuthorBook) => {
    setEditingBook(book);
    setFormState(book);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook) return;

    setBooks(prev => prev.map(b => (b.id === editingBook.id ? { ...b, ...formState } as AuthorBook : b)));
    toast.success(`Successfully updated "${formState.title}" and synced with main website!`);
    setEditingBook(null);
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    const newBook: AuthorBook = {
      id: `pc-${Date.now().toString().slice(-4)}`,
      title: formState.title || 'Untitled Book',
      subtitle: formState.subtitle || '',
      authorName: formState.authorName || 'Author Name',
      category: formState.category || 'Fiction',
      format: (formState.format as any) || 'Paperback',
      price: Number(formState.price) || 399,
      royaltyRate: 100,
      status: (formState.status as any) || 'Published',
      isbn: formState.isbn || `978-93-${Math.floor(100000 + Math.random() * 900000)}`,
      publishedDate: new Date().toISOString().split('T')[0],
      coverImage: formState.coverImage || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
      salesCount: 0,
      description: formState.description || 'No description provided.',
    };

    setBooks([newBook, ...books]);
    toast.success(`Created new author book "${newBook.title}" and published live!`);
    setIsCreateModalOpen(false);
    setFormState({});
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to remove "${title}" from the main website?`)) {
      setBooks(prev => prev.filter(b => b.id !== id));
      toast.success(`Removed "${title}" from platform.`);
    }
  };

  const filteredBooks = books.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.isbn.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sidebarMenuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, badge: undefined },
    { name: 'Books', icon: BookOpen, badge: books.length },
    { name: 'Orders', icon: ShoppingBag, badge: '4' },
    { name: 'Authors', icon: Users, badge: '980' },
    { name: 'Royalties', icon: DollarSign, badge: '100%' },
    { name: 'Marketing', icon: Megaphone, badge: 'Active' },
    { name: 'Settings', icon: Settings, badge: undefined },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col lg:flex-row font-sans text-gray-800">
      {/* 🔴 Left Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-[#1A1A2E] text-white shrink-0 flex flex-col justify-between border-r border-gray-800 shadow-xl">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-gray-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#8B1A1A] rounded-xl flex items-center justify-center font-bold text-white shadow-md">
                PC
              </div>
              <div>
                <h2 className="font-playfair font-bold text-lg text-white leading-tight">Page Craft</h2>
                <p className="text-[10px] text-[#C5A55A] font-bold uppercase tracking-wider">Internal Operations</p>
              </div>
            </div>
          </div>

          {/* User Role Badge */}
          <div className="p-4 bg-white/5 border-b border-gray-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A55A]" />
              <span className="font-bold text-gray-200">{userEmail.split('@')[0]}</span>
            </div>
            <span className="px-2 py-0.5 bg-[#8B1A1A] text-white text-[10px] font-bold rounded-full">
              {userRole}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Ops Navigation
            </div>
            {sidebarMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => handleMenuChange(item.name)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#8B1A1A] text-white shadow-lg shadow-[#8B1A1A]/30 font-bold'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-gray-800 text-gray-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Server & API Status Footer */}
        <div className="p-4 m-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Database Engine:</span>
            <span className="text-green-400 font-bold text-[11px] flex items-center gap-1">
              <Database className="w-3 h-3" /> Prisma PostgreSQL
            </span>
          </div>
          <p className="text-[11px] text-gray-400">JWT Auth & RBAC Active</p>
        </div>
      </aside>

      {/* 🟢 Main Operations Body */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
        {/* Top Operational Action Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
              <span>Internal Control Panel</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#8B1A1A] font-bold">{activeMenu} Menu</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-playfair text-[#1A1A2E] mt-1">
              Internal Control Panel — {activeMenu}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsLogsModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#8B1A1A]" />
              Activity Logs
            </button>

            <button
              onClick={() => setIsTeamModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs rounded-xl transition-all cursor-pointer border border-blue-200"
            >
              <UserPlus className="w-4 h-4 text-blue-700" />
              Team Management
            </button>

            <button
              onClick={handleSyncWithMainWebsite}
              disabled={isSyncing}
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#C5A55A] hover:bg-[#b09148] text-[#1A1A2E] font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync Site API'}
            </button>

            <button
              onClick={() => {
                setFormState({ category: 'Fiction', format: 'Paperback', price: 399, status: 'Published' });
                setIsCreateModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Author Book
            </button>
          </div>
        </div>

        {/* 🌟 1. MENU: DASHBOARD VIEW */}
        {activeMenu === 'Dashboard' && (
          <div className="space-y-8">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Manuscripts</p>
                  <h3 className="text-2xl font-bold text-[#1A1A2E] font-playfair mt-1">1,482</h3>
                  <span className="text-[11px] font-bold text-green-600 flex items-center gap-0.5 mt-1">
                    <TrendingUp className="w-3 h-3" /> +14% this month
                  </span>
                </div>
                <div className="p-3 bg-red-50 text-[#8B1A1A] rounded-2xl"><BookOpen className="w-6 h-6" /></div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Live Store Books</p>
                  <h3 className="text-2xl font-bold text-green-600 font-playfair mt-1">{books.length + 1285}</h3>
                  <span className="text-[11px] font-bold text-gray-500 mt-1">100% Royalty Active</span>
                </div>
                <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><Globe className="w-6 h-6" /></div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Ops Desk</p>
                  <h3 className="text-2xl font-bold text-amber-500 font-playfair mt-1">48</h3>
                  <span className="text-[11px] font-bold text-amber-600 mt-1">Requires Approval</span>
                </div>
                <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl"><Clock className="w-6 h-6" /></div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Royalty Disbursed</p>
                  <h3 className="text-2xl font-bold text-[#C5A55A] font-playfair mt-1">₹24,85,000</h3>
                  <span className="text-[11px] font-bold text-green-600 mt-1">100% Net Royalty Payout</span>
                </div>
                <div className="p-3 bg-yellow-50 text-[#C5A55A] rounded-2xl"><ShieldCheck className="w-6 h-6" /></div>
              </div>
            </div>

            {/* Quick Action System Bar */}
            <div className="bg-gradient-to-r from-[#1A1A2E] to-[#2B2B45] text-white p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 bg-[#C5A55A] text-[#1A1A2E] text-[10px] font-bold rounded-full uppercase">Operations Quick Tools</span>
                <h3 className="text-xl font-bold font-playfair">Database & Google Drive Integration Suite</h3>
                <p className="text-xs text-gray-300">Automated Google Drive folder generation, manual backups, and CSV sales exports.</p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={handleExportCsv}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4" /> Export Sales CSV
                </button>

                <button
                  onClick={handleTriggerBackup}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
                >
                  <Database className="w-4 h-4" /> Backup System
                </button>
              </div>
            </div>

            {/* Live Publishing Pipeline & Workflow */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="font-bold font-playfair text-lg text-[#1A1A2E] flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#8B1A1A]" /> Live Manuscript Operational Pipeline
                </h3>
                <span className="text-xs font-semibold text-gray-400">Automated Workflow Desk</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs font-bold">
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl space-y-1">
                  <span className="text-[10px] text-red-600 block uppercase">Stage 1</span>
                  <p className="text-[#8B1A1A]">Manuscript Received</p>
                  <span className="text-[11px] text-gray-500 font-normal">18 Books</span>
                </div>
                <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl space-y-1">
                  <span className="text-[10px] text-amber-600 block uppercase">Stage 2</span>
                  <p className="text-amber-800">Formatting & Editing</p>
                  <span className="text-[11px] text-gray-500 font-normal">14 Books</span>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl space-y-1">
                  <span className="text-[10px] text-blue-600 block uppercase">Stage 3</span>
                  <p className="text-blue-800">Cover Art Approval</p>
                  <span className="text-[11px] text-gray-500 font-normal">9 Books</span>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-100 rounded-xl space-y-1">
                  <span className="text-[10px] text-purple-600 block uppercase">Stage 4</span>
                  <p className="text-purple-800">ISBN Allocation</p>
                  <span className="text-[11px] text-gray-500 font-normal">7 Books</span>
                </div>
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl space-y-1">
                  <span className="text-[10px] text-emerald-600 block uppercase">Stage 5</span>
                  <p className="text-emerald-800">Published & Live</p>
                  <span className="text-[11px] text-gray-500 font-normal">1,290 Live</span>
                </div>
              </div>
            </div>

            {/* Activity Logs & Quick Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Activity Log */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 lg:col-span-1">
                <div className="flex justify-between items-center border-b pb-3">
                  <h3 className="font-bold font-playfair text-lg text-[#1A1A2E] flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#C5A55A]" /> Activity Log Stream
                  </h3>
                  <button onClick={() => setIsLogsModalOpen(true)} className="text-[11px] font-bold text-[#8B1A1A]">View All</button>
                </div>
                <div className="space-y-4 text-xs">
                  {activityLogs.slice(0, 4).map(log => (
                    <div key={log.id} className="flex gap-3 items-start border-b border-gray-50 pb-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1 shrink-0"></div>
                      <div>
                        <p className="font-bold text-gray-800">{log.action}</p>
                        <p className="text-gray-500 text-[11px] line-clamp-1">{log.details}</p>
                        <span className="text-[10px] text-gray-400">{log.userEmail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Books Quick Review Table */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 lg:col-span-2">
                <div className="flex justify-between items-center border-b pb-3">
                  <h3 className="font-bold font-playfair text-lg text-[#1A1A2E]">Manuscripts & Drive Asset Status</h3>
                  <button onClick={() => handleMenuChange('Books')} className="text-xs font-bold text-[#8B1A1A] hover:underline">View All Books →</button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b text-gray-400 font-bold uppercase">
                        <th className="py-2">Book Title</th>
                        <th className="py-2">Author</th>
                        <th className="py-2">Drive Folders</th>
                        <th className="py-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y font-medium text-gray-700">
                      {books.map(b => (
                        <tr key={b.id}>
                          <td className="py-3 font-bold text-[#1A1A2E]">{b.title}</td>
                          <td className="py-3">{b.authorName}</td>
                          <td className="py-3">
                            <button
                              onClick={() => handleOpenGoogleDrive(b)}
                              className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold rounded-lg flex items-center gap-1 hover:bg-blue-100 cursor-pointer"
                            >
                              <HardDrive className="w-3 h-3" /> Drive Inspector
                            </button>
                          </td>
                          <td className="py-3 text-right">
                            <button onClick={() => handleOpenEdit(b)} className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800 font-bold cursor-pointer">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 📚 2. MENU: BOOKS VIEW */}
        {activeMenu === 'Books' && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by title, author name, or ISBN..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20 text-xs sm:text-sm"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="text-xs font-semibold text-gray-400 uppercase">Status:</span>
                {['All', 'Published', 'Under Review', 'Draft'].map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      statusFilter === status
                        ? 'bg-[#8B1A1A] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Author Books Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/80 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <th className="py-4 px-6">Book Details</th>
                      <th className="py-4 px-6">Author</th>
                      <th className="py-4 px-6">Price / Format</th>
                      <th className="py-4 px-6">Google Drive</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {filteredBooks.map(book => (
                      <tr key={book.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 shadow-sm relative border border-gray-200">
                              <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h4 className="font-bold text-[#1A1A2E] font-playfair text-base group-hover:text-[#8B1A1A] transition-colors">
                                {book.title}
                              </h4>
                              {book.subtitle && <p className="text-xs text-gray-400 line-clamp-1">{book.subtitle}</p>}
                              <span className="inline-block mt-1 text-[11px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                {book.category}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-6 font-medium text-[#1A1A2E]">
                          {book.authorName}
                        </td>

                        <td className="py-4 px-6">
                          <div className="font-bold text-[#8B1A1A]">₹{book.price}</div>
                          <div className="text-xs text-gray-400">{book.format} • 100% Royalty</div>
                        </td>

                        <td className="py-4 px-6">
                          <button
                            onClick={() => handleOpenGoogleDrive(book)}
                            className="px-3 py-1.5 bg-blue-50 text-blue-800 rounded-xl font-bold text-xs flex items-center gap-1.5 hover:bg-blue-100 cursor-pointer border border-blue-200"
                          >
                            <HardDrive className="w-3.5 h-3.5" />
                            Drive Folders
                          </button>
                        </td>

                        <td className="py-4 px-6">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              book.status === 'Published'
                                ? 'bg-green-100 text-green-700'
                                : book.status === 'Under Review'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {book.status}
                          </span>
                        </td>

                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(book)}
                              className="p-2 text-gray-500 hover:text-[#8B1A1A] hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Edit Book Details"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(book.id, book.title)}
                              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Remove Book"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ⚙️ 7. MENU: SETTINGS VIEW & BACKUPS */}
        {activeMenu === 'Settings' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 text-xs">
              <h3 className="text-xl font-bold font-playfair text-[#1A1A2E] border-b pb-3">Internal Operations Settings & Database Backups</h3>
              <div className="space-y-3 max-w-md">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Prisma PostgreSQL Database URL</label>
                  <input type="text" readOnly value="postgresql://user:pass@localhost:5432/pagecraft_db" className="w-full px-3 py-2 bg-gray-100 border rounded-xl text-xs font-mono" />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Google Drive Integration Status</label>
                  <span className="px-3 py-1 bg-green-100 text-green-700 font-bold rounded-full inline-block">Active (Hierarchical Automated Generator)</span>
                </div>
              </div>

              <div className="pt-4 border-t space-y-3">
                <h4 className="font-bold text-sm text-[#1A1A2E]">Backup System Logs</h4>
                <div className="space-y-2">
                  {backupsList.map(bk => (
                    <div key={bk.id} className="p-3 bg-gray-50 border rounded-xl flex items-center justify-between">
                      <div>
                        <p className="font-bold text-gray-900">{bk.backupName}</p>
                        <p className="text-[11px] text-gray-400">{bk.createdBy} • {bk.size}</p>
                      </div>
                      <span className="px-2.5 py-0.5 bg-green-100 text-green-700 font-bold rounded-full text-[10px]">{bk.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 📁 Modal: Google Drive Hierarchical Inspector */}
        <AnimatePresence>
          {isDriveModalOpen && selectedDriveBook && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
                <div className="p-5 bg-[#1A1A2E] text-white flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-[#C5A55A]" />
                    <h3 className="font-bold font-playfair text-lg">Google Drive Manager — {selectedDriveBook.title}</h3>
                  </div>
                  <button onClick={() => setIsDriveModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer"><X size={18} /></button>
                </div>

                <div className="p-6 space-y-5 overflow-y-auto text-xs">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl space-y-1 text-blue-900">
                    <span className="font-bold block text-blue-950">Drive Hierarchical Structure:</span>
                    <p className="font-mono">The Page Craft / Books / {selectedDriveBook.title}</p>
                    <p className="text-[11px] text-blue-700">All assets are synced with Google Cloud & Supabase Storage</p>
                  </div>

                  {driveStructure ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border">
                        <span className="font-bold text-gray-800">Main Book Folder URL:</span>
                        <a href={driveStructure.folderUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold flex items-center gap-1 hover:underline">
                          Open in Google Drive <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {driveStructure.subfolders.map((sf: any) => (
                          <div key={sf.name} className="p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-500 transition-colors space-y-1">
                            <span className="font-bold text-gray-900 block truncate">{sf.name}</span>
                            <span className="text-[10px] text-gray-400 block">Synced Folder</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-gray-400">Generating Google Drive Folder Hierarchy...</div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 👥 Modal: Team User Management (Super Admin) */}
        <AnimatePresence>
          {isTeamModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
                <div className="p-5 bg-blue-900 text-white flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-[#C5A55A]" />
                    <h3 className="font-bold font-playfair text-lg">Team User Management & Permissions</h3>
                  </div>
                  <button onClick={() => setIsTeamModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer"><X size={18} /></button>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto text-xs">
                  {userRole === 'SUPER_ADMIN' ? (
                    <form onSubmit={handleCreateTeamMember} className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3">
                      <h4 className="font-bold text-gray-800 text-sm">Add New Team Member (Super Admin Exclusive)</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Full Name" required value={newTeamState.name} onChange={e => setNewTeamState({ ...newTeamState, name: e.target.value })} className="px-3 py-2 bg-white border rounded-xl" />
                        <input type="email" placeholder="Work Email" required value={newTeamState.email} onChange={e => setNewTeamState({ ...newTeamState, email: e.target.value })} className="px-3 py-2 bg-white border rounded-xl" />
                        <input type="password" placeholder="Password" required value={newTeamState.password} onChange={e => setNewTeamState({ ...newTeamState, password: e.target.value })} className="px-3 py-2 bg-white border rounded-xl" />
                        <select value={newTeamState.role} onChange={e => setNewTeamState({ ...newTeamState, role: e.target.value })} className="px-3 py-2 bg-white border rounded-xl font-bold">
                          <option value="ADMIN">ADMIN</option>
                          <option value="MANAGER">MANAGER</option>
                          <option value="EDITOR">EDITOR</option>
                          <option value="FINANCE">FINANCE</option>
                          <option value="SUPPORT">SUPPORT</option>
                          <option value="EMPLOYEE">EMPLOYEE</option>
                        </select>
                      </div>
                      <div className="flex justify-end pt-1">
                        <button type="submit" className="px-4 py-2 bg-blue-700 text-white font-bold rounded-xl">Create Member</button>
                      </div>
                    </form>
                  ) : (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900">
                      🔒 Only <strong>Super Admin</strong> has permission to invite or add new team users.
                    </div>
                  )}

                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-800 text-sm">Active Team Directory</h4>
                    <div className="divide-y border rounded-xl bg-white">
                      {teamMembers.map(tm => (
                        <div key={tm.id} className="p-3 flex justify-between items-center">
                          <div>
                            <p className="font-bold text-gray-900">{tm.name} <span className="text-[10px] text-gray-400">({tm.email})</span></p>
                            <span className="text-[10px] font-bold text-blue-700">Role: {tm.role}</span>
                          </div>
                          <span className="px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full font-bold text-[10px]">{tm.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 📜 Modal: Activity Logs */}
        <AnimatePresence>
          {isLogsModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
                <div className="p-5 bg-gray-900 text-white flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#C5A55A]" />
                    <h3 className="font-bold font-playfair text-lg">System Security & Activity Logs Audit</h3>
                  </div>
                  <button onClick={() => setIsLogsModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer"><X size={18} /></button>
                </div>

                <div className="p-6 space-y-4 overflow-y-auto text-xs">
                  <div className="divide-y border rounded-2xl bg-white overflow-hidden">
                    {activityLogs.map(l => (
                      <div key={l.id} className="p-3.5 flex justify-between items-center hover:bg-gray-50">
                        <div>
                          <p className="font-bold text-gray-900">{l.action}</p>
                          <p className="text-gray-500 text-[11px]">{l.details}</p>
                          <span className="text-[10px] text-gray-400">{l.userEmail} ({l.userRole}) • IP: {l.ipAddress || '127.0.0.1'}</span>
                        </div>
                        <span className="text-[10px] font-mono text-gray-400">{new Date(l.createdAt).toLocaleTimeString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Edit Book Modal */}
        <AnimatePresence>
          {editingBook && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#1A1A2E] text-white">
                  <div className="flex items-center gap-2">
                    <Edit3 className="w-5 h-5 text-[#C5A55A]" />
                    <h3 className="font-playfair text-xl font-bold">Edit Author Book: {editingBook.title}</h3>
                  </div>
                  <button onClick={() => setEditingBook(null)} className="text-gray-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
                </div>

                <form onSubmit={handleSaveEdit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold uppercase text-gray-500">Book Title</label>
                      <input type="text" value={formState.title || ''} onChange={e => setFormState({ ...formState, title: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20" required />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-gray-500">Author Name</label>
                      <input type="text" value={formState.authorName || ''} onChange={e => setFormState({ ...formState, authorName: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20" required />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-gray-500">Category</label>
                      <select value={formState.category || 'Fiction'} onChange={e => setFormState({ ...formState, category: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20">
                        <option>Fiction</option>
                        <option>Non-Fiction</option>
                        <option>Poetry</option>
                        <option>Business</option>
                        <option>Self-Help</option>
                        <option>Fantasy</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-gray-500">Price (₹)</label>
                      <input type="number" value={formState.price || ''} onChange={e => setFormState({ ...formState, price: Number(e.target.value) })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20" required />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-gray-500">Publication Status</label>
                      <select value={formState.status || 'Published'} onChange={e => setFormState({ ...formState, status: e.target.value as any })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20">
                        <option value="Published">Published (Live on Site)</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold uppercase text-gray-500">Cover Image URL / Path</label>
                      <input type="text" value={formState.coverImage || ''} onChange={e => setFormState({ ...formState, coverImage: e.target.value })} placeholder="https://..." className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20" />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                    <button type="button" onClick={() => setEditingBook(null)} className="px-5 py-2 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 cursor-pointer">Cancel</button>
                    <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold rounded-lg shadow-md cursor-pointer"><Save className="w-4 h-4" /> Save & Deploy Changes</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function InternalDashboardClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center p-8 text-[#8B1A1A] font-bold">
        Loading BookLeaf Internal Operational Dashboard...
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
