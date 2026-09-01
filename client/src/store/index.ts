// ============================================================
// Page Craft — Zustand Stores
// Client-side UI state management
// ============================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, CartItem, Book } from '@/types';

// ---- Auth Store ----
// Note: Tokens are NOT stored in localStorage.
// Real authentication sessions are maintained via HttpOnly cookies by the server.

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: (user) =>
    set({
      user,
      isAuthenticated: true,
      isLoading: false,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }),

  setLoading: (isLoading) => set({ isLoading }),

  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
}));

// ---- Cart Store ----

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (book: Book, format: string, quantity?: number) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (book, format, quantity = 1) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.book.id === book.id && item.format === format
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.book.id === book.id && item.format === format
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { items: [...state.items, { book, quantity, format }] };
        }),

      removeItem: (bookId) =>
        set((state) => ({
          items: state.items.filter((item) => item.book.id !== bookId),
        })),

      updateQuantity: (bookId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.book.id !== bookId)
              : state.items.map((item) =>
                  item.book.id === bookId ? { ...item, quantity } : item
                ),
        })),

      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotal: () =>
        get().items.reduce(
          (total, item) => total + item.book.price * item.quantity,
          0
        ),

      getItemCount: () =>
        get().items.reduce((count, item) => count + item.quantity, 0),
    }),
    {
      name: 'pagecraft-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// ---- Wishlist Store ----

interface WishlistState {
  items: string[]; // Book IDs
  addItem: (bookId: string) => void;
  removeItem: (bookId: string) => void;
  toggleItem: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (bookId) =>
        set((state) => ({
          items: state.items.includes(bookId)
            ? state.items
            : [...state.items, bookId],
        })),

      removeItem: (bookId) =>
        set((state) => ({
          items: state.items.filter((id) => id !== bookId),
        })),

      toggleItem: (bookId) => {
        const { items } = get();
        if (items.includes(bookId)) {
          set({ items: items.filter((id) => id !== bookId) });
        } else {
          set({ items: [...items, bookId] });
        }
      },

      isInWishlist: (bookId) => get().items.includes(bookId),

      clearWishlist: () => set({ items: [] }),
    }),
    { name: 'pagecraft-wishlist' }
  )
);

// ---- UI Store ----

interface UIState {
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  activeModal: string | null;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setSearchOpen: (open: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  activeModal: null,

  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
}));
