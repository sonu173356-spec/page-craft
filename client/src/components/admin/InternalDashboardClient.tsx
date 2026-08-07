'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  LayoutGrid, User, Table, BookOpen, LogOut, ChevronDown, 
  Search, Edit, MessageCircle, SlidersHorizontal, Check, 
  FileSpreadsheet
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// 1. ALL USERS / AUTHORS DATA
const AUTHORS_LIST = [
  { name: 'Ana', userType: 'Author / 1 books limit', date: 'Jun 5, 2024', email: 'ana.alcaza@zeroqode.com' },
  { name: 'test ana', userType: 'Author / 10 books limit', date: 'Jun 6, 2024', email: 'alcazaana@gmail.com' },
  { name: 'aliek', userType: 'Author / 10 books limit', date: 'Jun 6, 2024', email: 'alexeigro@gmail.com' },
  { name: 'Afaam Q.', userType: 'Author / 1 books limit', date: 'Jun 11, 2024', email: 'alexeigro++tr@gmail.com' },
  { name: 'Afaam Q.', userType: 'Author / 1 books limit', date: 'Jun 11, 2024', email: 'alexeigro++455@gmail.com' },
  { name: 'Alik', userType: 'Author / 1 books limit', date: 'Jun 11, 2024', email: 'alexeigro++rrr@gmail.com' },
];

// 2. VIEWS (SUPER ADMIN 19642) DATA
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
  { title: 'Eta Hae', email: 'wathoreshubhra263@gmail.com', author: 'Shubhra Wathore', address: 'Shri purnima...', country: 'India', cover: 'bg-orange-100' },
  { title: 'Red string', email: 'suyasha.gosavi29@gmail.com', author: 'Suyasha Gosavi', address: 'flat no. 104...', country: 'India', cover: 'bg-red-100' },
  { title: 'Paper Luna', email: 'sugandhagupta23@hotmail.com', author: 'Sugandha Gupta', address: 'India', country: 'India', cover: 'bg-pink-200' },
  { title: "Say 'Yes' to Life", email: 'pratikmiss@gmail.com', author: 'Pratiksha Bhatt', address: '605', country: 'India', cover: 'bg-gray-100' },
  { title: 'Whispers of Enchantment', email: 'divyashriade@gmail.com', author: 'Divyashri...', address: 'Tukai Darshan...', country: 'India', cover: 'bg-amber-100' },
  { title: 'Conversations With The...', email: 'namratasingh.ns@gmail.com', author: 'NAMRATA SINGH', address: 'Flat No. 32, Tower...', country: 'India', cover: 'bg-blue-100' },
  { title: 'Ink', email: 'aasthasharma2214@gmail.com', author: 'Aastha Sharma', address: 'Gulmohar colony...', country: 'India', cover: 'bg-stone-100' },
];

// 3. AUTHOR COPIES ORDERS DATA
const AUTHOR_COPIES_DATA = [
  { id: 'BLP12136B', email: 'hashmijazan@gmail.com', name: 'Nilofer', title: 'Nilu aur...', isbn: '9789376420629', count: 24, address: 'Civil lines...', status: 'Paid', amount: 'INR 2203.2', phone: '9844668122' },
  { id: 'BLP12134B', email: 'pba472@aol.com', name: 'Gram P Paul', title: 'Reflections...', isbn: '9789376420056', count: 24, address: '73 Ideal...', status: 'Paid', amount: 'USD 164.16', phone: '5702040411', isHighlight: true },
  { id: 'BLP12132B', email: 'ritikgautam072@gmail.com', name: 'Ritik Gautam', title: 'Still We Walk', isbn: '9789375100393', count: 24, address: 'Tiwari...', status: 'Paid', amount: 'INR 2592', phone: '9140378733' },
  { id: 'BLP12130B', email: 'ashmiahuwalia@gmail.com', name: 'Ashmi Ahluwalia', title: 'Entangled', isbn: '9789376423187', count: 24, address: 'B95 Sector...', status: 'Paid', amount: 'INR 2462.4', phone: '9198736299' },
  { id: 'BLP12128B', email: 'naziafarooq409@gmail.com', name: 'Nazia Farooq', title: 'What if we...', isbn: '9789376429530', count: 24, address: 'Srinagar...', status: 'Paid', amount: 'INR 3787.2', phone: '7006697844' },
  { id: 'BLP12126B', email: 'saileeb@gmail.com', name: 'Sailee Brahme', title: 'Jazbaaton...', isbn: '9789372138931', count: 28, address: '21 Para...', status: 'Paid', amount: 'INR 2658.4', phone: '9960257355' },
  { id: 'BLP12125B', email: 'mathur.1992@gmail.com', name: 'Prakhar Mohan Mathur', title: 'Ek Adhoori...', isbn: '9789376426430', count: 24, address: 'Flat 703...', status: 'Paid', amount: 'INR 2404.8', phone: '9873056911' },
  { id: 'BLP12123B', email: 'manali.amruta@gmail.com', name: 'Anish Gokhale', title: 'Bard of India', isbn: '9789375435747', count: 24, address: 'D1202...', status: 'Paid', amount: 'INR 2318.4', phone: '9096895477' },
  { id: 'BLP12121B', email: 'healthhackerz@gmail.com', name: 'Mridula K R', title: 'From The...', isbn: '9789376429868', count: 24, address: 'R4-A/G, G...', status: 'Paid', amount: 'INR 2620.8', phone: '9480429288' },
];

// 4. ADD-ONS DATA
const ADD_ONS_DATA = [
  { email: 'sreekumar.namboodiri@gmail.com', name: 'Sreekumar Maranghat Sambhu', title: 'The Grammar of...', isbn: '9789375272533', phone: '8129969019', country: 'India', date: '14/03/26' },
  { email: 'sasdmalik@gmail.com', name: 'Saras Malik', title: 'Gratitude', isbn: '9789375279853', phone: '9818124327', country: 'India', date: '13/03/26' },
  { email: 'siddharthnahar@hotmail.com', name: 'Siddharth Nahar', title: 'Love Written in the...', isbn: '9789375275527', phone: '9783322747', country: 'India', date: '12/03/26' },
  { email: 'joanna.ann.thomas@gmail.com', name: 'Ivana Rohan Mathews', title: 'Whispers Beneath...', isbn: '9789375272830', phone: '9820238115', country: 'India', date: '12/03/26' },
  { email: 'reetbarki@gmail.com', name: 'ऋतु बर्की', title: 'बुने हुए ख्वाब', isbn: '9789369534982', phone: '7988788106', country: 'India', date: '11/03/26' },
  { email: 'amalavs744@gmail.com', name: 'Amala V S', title: 'THYSELF', isbn: '9789375107491', phone: '8590324223', country: 'India', date: '11/03/26' },
  { email: 'himani.hemu.bisht@gmail.com', name: 'Dr. Himani Bisht', title: 'Echoes Of A Living...', isbn: '9789373143606', phone: '9711173709', country: 'India', date: '10/03/26' },
  { email: 'amagrande.amanda@gmail.com', name: 'Earra Stonewood', title: '"Radical"...', isbn: '9781807158071', phone: '7754324086', country: 'United States', date: '09/03/26' },
  { email: 'drvs390@gmail.com', name: 'VAISHNAVI SHARMA', title: 'हर कोना कुछ कहता है', isbn: '9781807158835', phone: '9810605474', country: 'India', date: '09/03/26' },
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
