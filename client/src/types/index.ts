// ============================================================
// Page Craft — TypeScript Type Definitions
// ============================================================

export interface Book {
  id: string;
  title: string;
  slug: string;
  author: Author;
  authorId: string;
  description: string;
  shortDescription: string;
  coverImage: string;
  price: number;
  originalPrice?: number;
  isbn: string;
  pages: number;
  language: string;
  category: string;
  genre: string[];
  format: ('paperback' | 'ebook' | 'hardcover')[];
  publishDate: string;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isNewRelease?: boolean;
  isFeatured?: boolean;
  stock: number;
  tags: string[];
}

export interface AuthorBook {
  id: string;
  title: string;
  slug?: string;
  category: string;
  genre?: string[];
  description: string;
  coverImage?: string;
  color?: string;
  price?: number;
  format?: string;
  publishDate?: string;
  pages?: number;
  isbn?: string;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  title?: string;
  initials?: string;
  color?: string;
  avatar?: string;
  photo?: string;
  bio: string;
  shortBio?: string;
  longBio?: string;
  email?: string;
  website?: string;
  social?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    goodreads?: string;
    website?: string;
  };
  booksPublished: number;
  bookCount?: number;
  joinDate?: string;
  authorSince?: string;
  isFeatured?: boolean;
  genres: string[];
  books?: AuthorBook[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'author' | 'customer';
  avatar?: string;
  phone?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentMethod: string;
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  bookId: string;
  title: string;
  quantity: number;
  price: number;
  format: string;
}

export interface Address {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  bookId?: string;
  bookTitle?: string;
  rating: number;
  title: string;
  content: string;
  isVerified: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  publishDate: string;
  readTime: number;
  isFeatured?: boolean;
}

export interface PublishingPlan {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  badge?: string;
  cta: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorAvatar: string;
  bookTitle: string;
  bookCover?: string;
  content: string;
  rating: number;
  role?: string;
}

export interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: string;
  postedDate: string;
  isActive: boolean;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
}

export interface CartItem {
  book: Book;
  quantity: number;
  format: string;
}

export interface WishlistItem {
  bookId: string;
  addedAt: string;
}

export interface DashboardStats {
  totalBooks: number;
  totalSales: number;
  totalRevenue: number;
  totalOrders: number;
  recentOrders: Order[];
  monthlySales: { month: string; sales: number; revenue: number }[];
  topBooks: { title: string; sales: number }[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  queryType: string;
  message: string;
}

export interface NewsletterForm {
  email: string;
  name?: string;
}
