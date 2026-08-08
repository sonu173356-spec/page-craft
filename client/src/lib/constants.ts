// ============================================================
// Page Craft — Site Constants & Navigation Configuration
// ============================================================

export const SITE_CONFIG = {
  name: 'Page Craft',
  tagline: 'Your Story, Professionally Published',
  description:
    'Page Craft is a premium self-publishing platform helping authors publish, distribute, and market their books worldwide.',
  url: 'https://www.thepagecraft.com',
  email: 'hello@thepagecraft.com',
  phone: '+91 98765 43210',
  address: {
    line1: '42, Literary Lane, Connaught Place',
    city: 'New Delhi',
    state: 'Delhi',
    zip: '110001',
    country: 'India',
  },
  social: {
    instagram: 'https://instagram.com/thepagecraft',
    facebook: 'https://facebook.com/thepagecraft',
    twitter: 'https://twitter.com/thepagecraft',
    linkedin: 'https://linkedin.com/company/thepagecraft',
    youtube: 'https://youtube.com/@thepagecraft',
  },
} as const;

export interface NavItem {
  label: string;
  href: string;
  isDashboard?: boolean;
  children?: NavItem[];
  description?: string;
  icon?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    children: [
      {
        label: 'Our Story',
        href: '/about',
        description: 'Learn about our journey and mission',
      },
      {
        label: 'Why Choose Us',
        href: '/about#why-choose-us',
        description: 'What sets Page Craft apart',
      },
    ],
  },
  {
    label: 'Services',
    href: '/publishing-plans',
    children: [
      {
        label: 'Publishing Plans',
        href: '/publishing-plans',
        description: 'Affordable packages for every author',
      },
      {
        label: 'Publishing Process',
        href: '/publishing-process',
        description: 'From manuscript to bookshelf',
      },
      {
        label: 'Self Publishing',
        href: '/self-publishing',
        description: 'Publish on your own terms',
      },
      {
        label: 'Distribution',
        href: '/distribution',
        description: 'Reach readers in 150+ countries',
      },
      {
        label: 'Marketing Services',
        href: '/marketing-services',
        description: 'Get your book noticed',
      },
      {
        label: 'Book Editing',
        href: '/book-editing',
        description: 'Professional editing & proofreading',
      },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Bookstore', href: '/bookstore' },
  { label: 'Authors', href: '/authors' },
  {
    label: 'Resources',
    href: '/blog',
    children: [
      {
        label: 'Blog',
        href: '/blog',
        description: 'Tips, guides & author interviews',
      },
      {
        label: 'Testimonials',
        href: '/testimonials',
        description: 'Hear from our published authors',
      },
      {
        label: 'FAQs',
        href: '/faq',
        description: 'Answers to common questions',
      },
    ],
  },
  {
    label: 'Dashboards',
    href: '/author/dashboard',
    children: [
      {
        label: 'Author Portal',
        href: '/author/dashboard',
        isDashboard: true,
        description: 'Access author book sales, royalties & tools',
      },
      {
        label: 'Upload Book Desk',
        href: '/author/upload-book',
        isDashboard: true,
        description: 'Publish manuscript PDFs & book covers',
      },
      {
        label: 'Content Manager',
        href: '/admin/internal-dashboard',
        isDashboard: true,
        description: 'Live admin visual book editor',
      },
      {
        label: 'Order Requests Desk',
        href: '/admin/orders',
        isDashboard: true,
        description: 'Fulfill customer reader orders & tracking',
      },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_LINKS = {
  services: [
    { label: 'Publishing Plans', href: '/publishing-plans' },
    { label: 'Self Publishing', href: '/self-publishing' },
    { label: 'Book Editing', href: '/book-editing' },
    { label: 'Distribution', href: '/distribution' },
    { label: 'Marketing', href: '/marketing-services' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Testimonials', href: '/testimonials' },
  ],
  dashboards: [
    { label: 'Author Portal (Login) ↗', href: '/author/login', isDashboard: true },
    { label: 'Create Author Account ↗', href: '/author/signup', isDashboard: true },
    { label: 'Author Dashboard ↗', href: '/author/dashboard', isDashboard: true },
    { label: 'Upload Book ↗', href: '/author/upload-book', isDashboard: true },
    { label: 'Content Manager ↗', href: '/admin/internal-dashboard', isDashboard: true },
    { label: 'Order Desk ↗', href: '/admin/orders', isDashboard: true },
  ],
  support: [
    { label: 'FAQs', href: '/faq' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Publishing Process', href: '/publishing-process' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Refund Policy', href: '/refund-policy' },
    { label: 'Shipping Policy', href: '/shipping-policy' },
  ],
} as const;

export const STATS = [
  { value: '100+', label: 'Authors Published' },
  { value: '50+', label: 'Books Released' },
  { value: '10K+', label: 'Copies Printed' },
  { value: 'Pan-India', label: 'Distribution Reach' },
] as const;

export const BOOK_CATEGORIES = [
  'Fiction',
  'Non-Fiction',
  'Poetry',
  'Self-Help',
  'Romance',
  'Mystery & Thriller',
  'Science Fiction',
  'Fantasy',
  'Biography',
  'Business',
  'Children\'s',
  'Academic',
  'Philosophy',
  'History',
  'Health & Wellness',
] as const;

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
