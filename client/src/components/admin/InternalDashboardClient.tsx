'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  LayoutGrid, User, Table, BookOpen, LogOut, ChevronDown, 
  Search, Edit, MessageCircle, SlidersHorizontal, Check, 
  FileSpreadsheet
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// 1. ALL USERS / AUTHORS DATA (Synthetic demonstration records)
const AUTHORS_LIST = [
  { name: 'Alex Morgan', userType: 'Author / 1 books limit', date: 'Jun 5, 2024', email: 'demo-author-1@example.invalid' },
  { name: 'Jordan Taylor', userType: 'Author / 10 books limit', date: 'Jun 6, 2024', email: 'demo-author-2@example.invalid' },
  { name: 'Samira Khan', userType: 'Author / 10 books limit', date: 'Jun 6, 2024', email: 'demo-author-3@example.invalid' },
  { name: 'Taylor Reed', userType: 'Author / 1 books limit', date: 'Jun 11, 2024', email: 'demo-author-4@example.invalid' },
  { name: 'Casey Bailey', userType: 'Author / 1 books limit', date: 'Jun 11, 2024', email: 'demo-author-5@example.invalid' },
  { name: 'Riley Bennett', userType: 'Author / 1 books limit', date: 'Jun 11, 2024', email: 'demo-author-6@example.invalid' },
];

// 2. VIEWS (SUPER ADMIN) DATA
const VIEWS_SUB_MENUS = [
  'Review',
  'BBP India - Published',
  'BBP Intl - In Review',
  'BBP Intl - Published',
  'GD+21+CR Ind - Review',
  'GD+21+CR Ind - Published',
  'GD+21+CR Intl - Review',
  'GD+21+CR Intl - Published',
  'GED Ind - In Review',
  'GED Ind - Published',
  'GED Intl - In Review',
  'GED Intl - Published',
  '21 EDA Intl - In Review',
  'Free Intl - In Review',
];

const VIEWS_BOOKS_DATA = [
  { title: 'The Silent Echo', email: 'demo-author-1@example.invalid', author: 'Eleanor Vance', address: '101 Publishing Ave, Suite 4', country: 'India', cover: 'bg-orange-100' },
  { title: 'Beyond the Horizon', email: 'demo-author-2@example.invalid', author: 'Marcus Sterling', address: '202 Editorial Way', country: 'India', cover: 'bg-red-100' },
  { title: 'Whispers of Time', email: 'demo-author-3@example.invalid', author: 'Sarah Jenkins', address: '303 Manuscript Road', country: 'India', cover: 'bg-pink-200' },
  { title: 'Digital Frontiers', email: 'demo-author-4@example.invalid', author: 'David Chen', address: '404 Chapter Lane', country: 'India', cover: 'bg-gray-100' },
  { title: 'Culinary Magic', email: 'demo-author-5@example.invalid', author: 'Elena Rodriguez', address: '505 Gourmet Street', country: 'India', cover: 'bg-amber-100' },
  { title: 'Modern Economics', email: 'demo-author-6@example.invalid', author: 'Dr. Robert Hale', address: '606 Academic Park', country: 'India', cover: 'bg-blue-100' },
  { title: 'Sunken Isles', email: 'demo-author-7@example.invalid', author: 'Jessica Wong', address: '707 Fantasy Boulevard', country: 'India', cover: 'bg-stone-100' },
];

// 3. AUTHOR COPIES ORDERS DATA (Synthetic records)
const AUTHOR_COPIES_DATA = [
  { id: 'ORD-DEMO-001', email: 'demo-author-1@example.invalid', name: 'Eleanor Vance', title: 'The Silent Echo', isbn: '978-93-84729-10-4', count: 24, address: '101 Publishing Ave', status: 'Paid', amount: 'INR 2400.0', phone: '+1-555-0101' },
  { id: 'ORD-DEMO-002', email: 'demo-author-2@example.invalid', name: 'Marcus Sterling', title: 'Beyond the Horizon', isbn: '978-93-84729-11-1', count: 24, address: '202 Editorial Way', status: 'Paid', amount: 'USD 160.00', phone: '+1-555-0102', isHighlight: true },
  { id: 'ORD-DEMO-003', email: 'demo-author-3@example.invalid', name: 'Sarah Jenkins', title: 'Whispers of Time', isbn: '978-93-84729-12-8', count: 24, address: '303 Manuscript Road', status: 'Paid', amount: 'INR 2500.0', phone: '+1-555-0103' },
  { id: 'ORD-DEMO-004', email: 'demo-author-4@example.invalid', name: 'David Chen', title: 'Digital Frontiers', isbn: '978-93-84729-13-5', count: 24, address: '404 Chapter Lane', status: 'Paid', amount: 'INR 2450.0', phone: '+1-555-0104' },
  { id: 'ORD-DEMO-005', email: 'demo-author-5@example.invalid', name: 'Elena Rodriguez', title: 'Culinary Magic', isbn: '978-93-84729-14-2', count: 24, address: '505 Gourmet Street', status: 'Paid', amount: 'INR 3700.0', phone: '+1-555-0105' },
  { id: 'ORD-DEMO-006', email: 'demo-author-6@example.invalid', name: 'Dr. Robert Hale', title: 'Modern Economics', isbn: '978-93-84729-15-9', count: 28, address: '606 Academic Park', status: 'Paid', amount: 'INR 2650.0', phone: '+1-555-0106' },
  { id: 'ORD-DEMO-007', email: 'demo-author-7@example.invalid', name: 'Jessica Wong', title: 'Sunken Isles', isbn: '978-93-84729-16-6', count: 24, address: '707 Fantasy Boulevard', status: 'Paid', amount: 'INR 2400.0', phone: '+1-555-0107' },
  { id: 'ORD-DEMO-008', email: 'demo-author-8@example.invalid', name: 'Tom Baker', title: 'Urban Legends', isbn: '978-93-84729-17-3', count: 24, address: '808 Noir Avenue', status: 'Paid', amount: 'INR 2300.0', phone: '+1-555-0108' },
  { id: 'ORD-DEMO-009', email: 'demo-author-9@example.invalid', name: 'Amanda Clarke', title: 'Little Paws', isbn: '978-93-84729-18-0', count: 24, address: '909 Illustrated Grove', status: 'Paid', amount: 'INR 2600.0', phone: '+1-555-0109' },
];

// 4. ADD-ONS DATA (Synthetic records)
const ADD_ONS_DATA = [
  { email: 'demo-author-1@example.invalid', name: 'Eleanor Vance', title: 'The Silent Echo', isbn: '978-93-84729-10-4', phone: '+1-555-0110', country: 'India', date: '14/03/26' },
  { email: 'demo-author-2@example.invalid', name: 'Marcus Sterling', title: 'Beyond the Horizon', isbn: '978-93-84729-11-1', phone: '+1-555-0111', country: 'India', date: '13/03/26' },
  { email: 'demo-author-3@example.invalid', name: 'Sarah Jenkins', title: 'Whispers of Time', isbn: '978-93-84729-12-8', phone: '+1-555-0112', country: 'India', date: '12/03/26' },
  { email: 'demo-author-4@example.invalid', name: 'David Chen', title: 'Digital Frontiers', isbn: '978-93-84729-13-5', phone: '+1-555-0113', country: 'India', date: '12/03/26' },
  { email: 'demo-author-5@example.invalid', name: 'Elena Rodriguez', title: 'Culinary Magic', isbn: '978-93-84729-14-2', phone: '+1-555-0114', country: 'India', date: '11/03/26' },
  { email: 'demo-author-6@example.invalid', name: 'Dr. Robert Hale', title: 'Modern Economics', isbn: '978-93-84729-15-9', phone: '+1-555-0115', country: 'India', date: '11/03/26' },
  { email: 'demo-author-7@example.invalid', name: 'Jessica Wong', title: 'Sunken Isles', isbn: '978-93-84729-16-6', phone: '+1-555-0116', country: 'India', date: '10/03/26' },
  { email: 'demo-author-8@example.invalid', name: 'Tom Baker', title: 'Urban Legends', isbn: '978-93-84729-17-3', phone: '+1-555-0117', country: 'United States', date: '09/03/26' },
  { email: 'demo-author-9@example.invalid', name: 'Amanda Clarke', title: 'Little Paws', isbn: '978-93-84729-18-0', phone: '+1-555-0118', country: 'India', date: '09/03/26' },
];

function BookLeafDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const menuParam = searchParams.get('menu') || 'Dashboard';
  const [activeTab, setActiveTab] = useState(menuParam);
  const [selectedViewsSubMenu, setSelectedViewsSubMenu] = useState('GD+21+CR Intl - Review');
  const [activeAddOnSubTab, setActiveAddOnSubTab] = useState('Copyright');

  // Search filters
  const [authorSearchName, setAuthorSearchName] = useState('');
  const [authorSearchEmail, setAuthorSearchEmail] = useState('');
  const [viewsSearch, setViewsSearch] = useState('');
  const [copiesSearch, setCopiesSearch] = useState('');

  useEffect(() => {
    if (menuParam) {
      setActiveTab(menuParam);
    }
  }, [menuParam]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/admin/internal-dashboard?menu=${encodeURIComponent(tab)}`);
  };

  const navItems = [
    { name: 'Dashboard', icon: LayoutGrid },
    { name: 'All Users', icon: User },
    { name: 'Views', icon: Table },
    { name: 'Author Copies', icon: BookOpen },
    { name: 'Add-Ons', icon: LayoutGrid },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col md:flex-row font-sans text-gray-800 antialiased relative selection:bg-[#FF4D6D] selection:text-white">
      {/* 🔴 Exact Left Sidebar */}
      <aside className="w-full md:w-56 bg-[#FBF9F7] border-r border-[#EFE8E2] shrink-0 flex flex-col justify-between p-4 min-h-screen">
        <div>
          {/* Exact Brand Header */}
          <div className="flex items-center gap-3 px-2 py-4 mb-6">
            <div className="w-8 h-8 bg-[#FF4D6D] rounded flex items-center justify-center text-white font-bold text-lg shadow-sm">
              /
            </div>
            <div>
              <h1 className="font-serif font-bold text-base text-gray-900 leading-tight">
                BookLeaf
              </h1>
              <h2 className="font-serif font-bold text-sm text-gray-800 leading-tight">
                Publishing
              </h2>
              <p className="text-[9px] text-gray-500 font-medium tracking-tight">
                India | USA | UK
              </p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => handleTabChange(item.name)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#EFE5E0] text-gray-900 font-bold shadow-xs'
                      : 'text-gray-700 hover:bg-[#F5EBE6] hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4 text-gray-600 shrink-0" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Exact Logout Button at bottom */}
        <div className="pt-6">
          <button
            onClick={() => {
              toast.success('Logged out successfully');
              router.push('/login');
            }}
            className="w-full border border-[#FF4D6D] text-[#FF4D6D] hover:bg-[#FF4D6D]/10 rounded-xl py-2.5 px-4 flex items-center justify-center gap-2 text-sm font-bold transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* 🟢 Exact Main Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-x-auto">
        {/* ========================================================================= */}
        {/* 1. SCREEN 1: DASHBOARD VIEW                                               */}
        {/* ========================================================================= */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-6">
            {/* Top Date Filter */}
            <div className="flex justify-end items-center gap-3 mb-8">
              <span className="text-xs font-semibold text-gray-600">Filter by Date</span>
              <input
                type="text"
                placeholder="Air Date/Time Picker"
                readOnly
                className="bg-white border border-[#E2D9D2] rounded-md px-3 py-1.5 text-xs text-gray-400 w-56 focus:outline-none shadow-xs"
              />
            </div>

            {/* 8 Metric KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Row 1 */}
              <div className="bg-white p-6 rounded-xl shadow-xs border border-[#F0ECE9]">
                <p className="text-xs font-medium text-gray-700 mb-2">Total Books</p>
                <h3 className="text-3xl font-bold text-[#FF4D6D]">19642</h3>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-xs border border-[#F0ECE9]">
                <p className="text-xs font-medium text-gray-700 mb-2">Books in Draft</p>
                <h3 className="text-3xl font-bold text-[#FF4D6D]">6892</h3>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-xs border border-[#F0ECE9]">
                <p className="text-xs font-medium text-gray-700 mb-2">Books In Review</p>
                <h3 className="text-3xl font-bold text-[#FF4D6D]">136</h3>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-xs border border-[#F0ECE9]">
                <p className="text-xs font-medium text-gray-700 mb-2">Books Published</p>
                <h3 className="text-3xl font-bold text-[#FF4D6D]">12286</h3>
              </div>

              {/* Row 2 */}
              <div className="bg-white p-6 rounded-xl shadow-xs border border-[#F0ECE9]">
                <p className="text-xs font-medium text-gray-700 mb-2">Bestseller Breakthrough</p>
                <h3 className="text-3xl font-bold text-[#FF4D6D]">2719</h3>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-xs border border-[#F0ECE9]">
                <p className="text-xs font-medium text-gray-700 mb-2">Global Distribution</p>
                <h3 className="text-3xl font-bold text-[#FF4D6D]">1588</h3>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-xs border border-[#F0ECE9]">
                <p className="text-xs font-medium text-gray-700 mb-2">Emily Award</p>
                <h3 className="text-3xl font-bold text-[#FF4D6D]">499</h3>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-xs border border-[#F0ECE9]">
                <p className="text-xs font-medium text-gray-700 mb-2">Global+Emily+Copyright</p>
                <h3 className="text-3xl font-bold text-[#FF4D6D]">527</h3>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. SCREEN 2: ALL USERS / AUTHORS VIEW                                     */}
        {/* ========================================================================= */}
        {activeTab === 'All Users' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 font-sans">Authors</h2>
              <button
                onClick={() => {
                  window.open('/api/analytics?format=csv', '_blank');
                  toast.success('Downloading Authors CSV...');
                }}
                className="border border-[#FF4D6D] text-[#FF4D6D] hover:bg-[#FF4D6D]/10 rounded-xl px-5 py-2 text-sm font-bold transition-colors cursor-pointer"
              >
                Download CSV
              </button>
            </div>

            {/* Search Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              <input
                type="text"
                placeholder="Search by Name"
                value={authorSearchName}
                onChange={e => setAuthorSearchName(e.target.value)}
                className="w-full bg-white border border-[#E2D9D2] rounded-md px-3.5 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Search by Email"
                value={authorSearchEmail}
                onChange={e => setAuthorSearchEmail(e.target.value)}
                className="w-full bg-white border border-[#E2D9D2] rounded-md px-3.5 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
              />
            </div>

            {/* Authors Table */}
            <div className="bg-white rounded-xl shadow-xs border border-[#EFE8E2] overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#EFE5E0] text-gray-700 font-semibold border-b border-[#E2D9D2]">
                    <th className="py-3.5 px-5">Full Name</th>
                    <th className="py-3.5 px-5">User Type</th>
                    <th className="py-3.5 px-5">Creation Date</th>
                    <th className="py-3.5 px-5">Email Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0ECE9] text-gray-800">
                  {AUTHORS_LIST.filter(a => 
                    a.name.toLowerCase().includes(authorSearchName.toLowerCase()) &&
                    a.email.toLowerCase().includes(authorSearchEmail.toLowerCase())
                  ).map((author, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-4 px-5 font-medium">{author.name}</td>
                      <td className="py-4 px-5 text-gray-600">{author.userType}</td>
                      <td className="py-4 px-5 text-gray-600">{author.date}</td>
                      <td className="py-4 px-5 text-gray-800 font-mono">{author.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. SCREEN 3: VIEWS VIEW                                                   */}
        {/* ========================================================================= */}
        {activeTab === 'Views' && (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Views Sub-Sidebar */}
            <div className="w-full lg:w-56 shrink-0 bg-white border border-[#EFE8E2] rounded-xl p-2 space-y-0.5 max-h-[80vh] overflow-y-auto">
              {VIEWS_SUB_MENUS.map((menu) => {
                const isSelected = selectedViewsSubMenu === menu;
                return (
                  <button
                    key={menu}
                    onClick={() => setSelectedViewsSubMenu(menu)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer truncate ${
                      isSelected
                        ? 'bg-[#EFE5E0] text-[#FF4D6D] font-bold'
                        : 'text-gray-700 hover:bg-[#FAF8F5]'
                    }`}
                  >
                    {menu}
                  </button>
                );
              })}
            </div>

            {/* Views Main Content */}
            <div className="flex-1 w-full space-y-4">
              <h2 className="text-xl font-bold text-gray-900 font-sans">Super Admin (19642)</h2>

              {/* Search and Action Bar */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <input
                  type="text"
                  placeholder="Search by title, author name, ISBN, email"
                  value={viewsSearch}
                  onChange={e => setViewsSearch(e.target.value)}
                  className="w-full sm:max-w-md bg-white border border-[#E2D9D2] rounded-md px-3.5 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
                />

                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => toast.success('Filters applied')}
                    className="border border-[#FF4D6D] text-[#FF4D6D] hover:bg-[#FF4D6D]/10 rounded-lg px-4 py-1.5 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Filters
                  </button>
                  <button
                    onClick={() => {
                      window.open('/api/analytics?format=csv', '_blank');
                      toast.success('Exporting Super Admin CSV...');
                    }}
                    className="bg-[#FF4D6D] hover:bg-[#e03d5c] text-white rounded-lg px-4 py-1.5 text-xs font-bold transition-colors shadow-xs cursor-pointer"
                  >
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Views Table */}
              <div className="bg-white rounded-xl shadow-xs border border-[#EFE8E2] overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-[#EFE5E0] text-gray-700 font-semibold border-b border-[#E2D9D2]">
                      <th className="py-3 px-3 w-8 text-center"></th>
                      <th className="py-3 px-3 w-8 text-center"></th>
                      <th className="py-3 px-4">Cover / Title</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Author's Name</th>
                      <th className="py-3 px-4">Address</th>
                      <th className="py-3 px-4">Country</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0ECE9] text-gray-800">
                    {VIEWS_BOOKS_DATA.filter(b => 
                      b.title.toLowerCase().includes(viewsSearch.toLowerCase()) ||
                      b.author.toLowerCase().includes(viewsSearch.toLowerCase()) ||
                      b.email.toLowerCase().includes(viewsSearch.toLowerCase())
                    ).map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#FAF8F5] transition-colors">
                        <td className="py-3 px-3 text-center">
                          <input type="checkbox" className="rounded border-gray-300 text-[#FF4D6D] focus:ring-0 cursor-pointer" />
                        </td>
                        <td className="py-3 px-3 text-center">
                          <button onClick={() => toast.success(`Edit ${row.title}`)} className="text-red-400 hover:text-red-600 cursor-pointer">
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-6 h-8 ${row.cover} rounded shrink-0 border border-gray-200 shadow-2xs`}></div>
                            <span className="font-medium text-gray-900">{row.title}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-gray-600 text-[11px]">{row.email}</td>
                        <td className="py-3 px-4 font-medium">{row.author}</td>
                        <td className="py-3 px-4 text-gray-500 text-[11px] truncate max-w-[150px]">{row.address}</td>
                        <td className="py-3 px-4 text-gray-700">{row.country}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. SCREEN 4: AUTHOR COPIES VIEW                                           */}
        {/* ========================================================================= */}
        {activeTab === 'Author Copies' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                placeholder="Search by title, author name, ISBN, e"
                value={copiesSearch}
                onChange={e => setCopiesSearch(e.target.value)}
                className="bg-white border border-[#E2D9D2] rounded-md px-3.5 py-1.5 text-xs text-gray-800 placeholder-gray-400 w-64 focus:outline-none"
              />

              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-gray-700">Filter by Status</span>
                <select className="bg-white border border-[#E2D9D2] rounded-md px-2.5 py-1.5 text-xs text-gray-500 focus:outline-none">
                  <option>Choose an option...</option>
                  <option>Paid</option>
                  <option>Pending</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-gray-700">Filter by Nationality</span>
                <select className="bg-white border border-[#E2D9D2] rounded-md px-2.5 py-1.5 text-xs text-gray-500 focus:outline-none">
                  <option>Choose an option...</option>
                  <option>India</option>
                  <option>International</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-gray-700">Filter by Exclude Status</span>
                <select className="bg-white border border-[#E2D9D2] rounded-md px-2.5 py-1.5 text-xs text-gray-500 focus:outline-none">
                  <option>Choose an option...</option>
                  <option>None</option>
                </select>
              </div>
            </div>

            {/* Author Copies Table */}
            <div className="bg-white rounded-xl shadow-xs border border-[#EFE8E2] overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-[#EFE5E0] text-gray-700 font-semibold border-b border-[#E2D9D2]">
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">ISBN</th>
                    <th className="py-3 px-4">Copy Count</th>
                    <th className="py-3 px-4">Ship Address</th>
                    <th className="py-3 px-4">Pay Status</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Phone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0ECE9] text-gray-800">
                  {AUTHOR_COPIES_DATA.filter(o => 
                    o.title.toLowerCase().includes(copiesSearch.toLowerCase()) ||
                    o.name.toLowerCase().includes(copiesSearch.toLowerCase()) ||
                    o.email.toLowerCase().includes(copiesSearch.toLowerCase()) ||
                    o.id.toLowerCase().includes(copiesSearch.toLowerCase())
                  ).map((order) => (
                    <tr key={order.id} className={`transition-colors ${order.isHighlight ? 'bg-[#FFF5F5] hover:bg-[#FFEEEE]' : 'hover:bg-[#FAF8F5]'}`}>
                      <td className="py-3.5 px-4 font-mono font-medium">{order.id}</td>
                      <td className="py-3.5 px-4 font-mono text-gray-600 text-[11px]">{order.email}</td>
                      <td className="py-3.5 px-4 font-medium">{order.name}</td>
                      <td className="py-3.5 px-4 text-gray-800 font-medium">{order.title}</td>
                      <td className="py-3.5 px-4 font-mono text-gray-500">{order.isbn}</td>
                      <td className="py-3.5 px-4">{order.count}</td>
                      <td className="py-3.5 px-4 text-gray-500 text-[11px] truncate max-w-[100px]">{order.address}</td>
                      <td className="py-3.5 px-4 text-gray-700">{order.status}</td>
                      <td className="py-3.5 px-4 font-medium text-gray-900">{order.amount}</td>
                      <td className="py-3.5 px-4 font-mono text-gray-600">{order.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. SCREEN 5: ADD-ONS VIEW                                                 */}
        {/* ========================================================================= */}
        {activeTab === 'Add-Ons' && (
          <div className="space-y-6">
            {/* Top Sub Tabs */}
            <div className="flex items-center gap-6 pb-2">
              {['Copyright', 'Award', 'Global Distribution', 'PR Package'].map((subTab) => {
                const isSelected = activeAddOnSubTab === subTab;
                return (
                  <button
                    key={subTab}
                    onClick={() => setActiveAddOnSubTab(subTab)}
                    className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FF4D6D] text-white font-bold shadow-xs'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    {subTab}
                  </button>
                );
              })}
            </div>

            {/* Add-Ons Table */}
            <div className="bg-white rounded-xl shadow-xs border border-[#EFE8E2] overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-[#EFE5E0] text-gray-700 font-semibold border-b border-[#E2D9D2]">
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">ISBN</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Country</th>
                    <th className="py-3 px-4">Order Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0ECE9] text-gray-800">
                  {ADD_ONS_DATA.map((addon, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-3.5 px-4 font-mono text-gray-700 text-[11px]">{addon.email}</td>
                      <td className="py-3.5 px-4 font-medium">{addon.name}</td>
                      <td className="py-3.5 px-4 text-gray-900 font-medium">{addon.title}</td>
                      <td className="py-3.5 px-4 font-mono text-gray-500">{addon.isbn}</td>
                      <td className="py-3.5 px-4 font-mono text-gray-700">{addon.phone}</td>
                      <td className="py-3.5 px-4 text-gray-700">{addon.country}</td>
                      <td className="py-3.5 px-4 text-gray-500 text-[11px]">{addon.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Floating WhatsApp Action Icon */}
        <div className="fixed bottom-6 right-6 z-50">
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-[#FF4D6D] hover:bg-[#e03d5c] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
          </a>
        </div>
      </main>
    </div>
  );
}

export default function InternalDashboardClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-8 text-[#FF4D6D] font-bold">
        Loading BookLeaf Internal Dashboard...
      </div>
    }>
      <BookLeafDashboard />
    </Suspense>
  );
}
