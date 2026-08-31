// ============================================================
// Page Craft — API Service Layer
// Centralized API client for all backend communication
// ============================================================

import { API_BASE_URL } from '@/lib/constants';
import type {
  ApiResponse,
  Book,
  Author,
  BlogPost,
  PublishingPlan,
  FAQ,
  Career,
  Service,
  Order,
  Review,
  DashboardStats,
  ContactForm,
  NewsletterForm,
} from '@/types';

// ---- Base Fetch Wrapper ----

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    // If the server isn't running, return mock-friendly error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.warn('API server not available, using client-side fallback');
      throw new Error('API server is not available');
    }
    throw error;
  }
}

// ---- Auth Service ----

export const authService = {
  login: (email: string, password: string) =>
    apiFetch<{ user: { id: string; name: string; email: string; role: string }; accessToken: string; refreshToken: string }>(
      '/auth/login',
      { method: 'POST', body: JSON.stringify({ email, password }) }
    ),

  register: (data: { name: string; email: string; password: string; role?: string }) =>
    apiFetch<{ user: { id: string; name: string; email: string; role: string }; accessToken: string }>(
      '/auth/register',
      { method: 'POST', body: JSON.stringify(data) }
    ),

  refreshToken: (refreshToken: string) =>
    apiFetch<{ accessToken: string }>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    }),

  forgotPassword: (email: string) =>
    apiFetch<{ message: string }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
};

// ---- Books Service ----

export const bookService = {
  getAll: (params?: {
    search?: string;
    category?: string;
    genre?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    page?: number;
    limit?: number;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          searchParams.append(key, String(value));
        }
      });
    }
    const query = searchParams.toString();
    return apiFetch<Book[]>(`/books${query ? `?${query}` : ''}`);
  },

  getById: (id: string) => apiFetch<Book>(`/books/${id}`),

  create: (data: Partial<Book>) =>
    apiFetch<Book>('/books', { method: 'POST', body: JSON.stringify(data) }),

  update: (id: string, data: Partial<Book>) =>
    apiFetch<Book>(`/books/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  delete: (id: string) =>
    apiFetch<void>(`/books/${id}`, { method: 'DELETE' }),
};

// ---- Authors Service ----

export const authorService = {
  getAll: () => apiFetch<Author[]>('/authors'),
  getById: (id: string) => apiFetch<Author>(`/authors/${id}`),
};

// ---- Blog Service ----

export const blogService = {
  getAll: (params?: { category?: string; page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
    }
    const query = searchParams.toString();
    return apiFetch<BlogPost[]>(`/blogs${query ? `?${query}` : ''}`);
  },
  getBySlug: (slug: string) => apiFetch<BlogPost>(`/blogs/${slug}`),
  create: (data: Partial<BlogPost>) =>
    apiFetch<BlogPost>('/blogs', { method: 'POST', body: JSON.stringify(data) }),
};

// ---- Orders Service ----

export const orderService = {
  getAll: () => apiFetch<Order[]>('/orders'),
  create: (data: Partial<Order>) =>
    apiFetch<Order>('/orders', { method: 'POST', body: JSON.stringify(data) }),
};

// ---- Reviews Service ----

export const reviewService = {
  getAll: () => apiFetch<Review[]>('/reviews'),
  create: (data: Partial<Review>) =>
    apiFetch<Review>('/reviews', { method: 'POST', body: JSON.stringify(data) }),
};

// ---- Dashboard Service ----

export const dashboardService = {
  getAdminStats: () => apiFetch<DashboardStats>('/dashboard/admin'),
  getAuthorStats: () => apiFetch<DashboardStats>('/dashboard/author'),
};

// ---- Plans Service ----

export const planService = {
  getAll: () => apiFetch<PublishingPlan[]>('/plans'),
};

// ---- FAQ Service ----

export const faqService = {
  getAll: () => apiFetch<FAQ[]>('/faqs'),
};

// ---- Careers Service ----

export const careerService = {
  getAll: () => apiFetch<Career[]>('/careers'),
};

// ---- Services ----

export const serviceService = {
  getAll: () => apiFetch<Service[]>('/services'),
};

// ---- Contact ----

export const contactService = {
  submit: (data: ContactForm) =>
    apiFetch<{ message: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// ---- Newsletter ----

export const newsletterService = {
  subscribe: (data: NewsletterForm) =>
    apiFetch<{ message: string }>('/newsletter', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// ---- Coupons ----

export const couponService = {
  getAll: () => apiFetch<{ id: string; code: string; discount: number; isActive: boolean }[]>('/coupons'),
  create: (data: { code: string; discount: number; expiresAt: string }) =>
    apiFetch('/coupons', { method: 'POST', body: JSON.stringify(data) }),
};
