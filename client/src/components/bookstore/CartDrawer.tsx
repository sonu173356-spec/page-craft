'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store';
import RealisticBookCover from '@/components/ui/RealisticBookCover';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotal } = useCartStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const subtotal = getTotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 cursor-pointer"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col font-inter"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-[#FDFAF6]">
              <h2 className="font-playfair text-xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#8B1A1A]" />
                Reading Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
              <button
                onClick={closeCart}
                className="p-2 text-gray-400 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-70">
                  <div className="w-16 h-16 rounded-full bg-amber-50 text-[#8B1A1A] flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#1A1A2E] font-playfair">Your cart is empty</p>
                    <p className="text-xs text-gray-500 mt-1">Explore our published titles and author releases.</p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="px-5 py-2.5 bg-[#8B1A1A] text-white rounded-xl text-xs font-bold hover:bg-[#722F37] transition-all cursor-pointer shadow-xs"
                  >
                    Browse Bookstore
                  </button>
                </div>
              ) : (
                items.map((item) => {
                  const bookPrice = Math.round(item.book.price * (item.book.price < 100 ? 25 : 1));
                  const itemTotal = bookPrice * item.quantity;

                  return (
                    <div key={`${item.book.id}-${item.format}`} className="flex gap-4 p-3 rounded-2xl bg-[#FDFAF6] border border-[#EBE4D8]/80">
                      <div className="shrink-0 flex items-center justify-center">
                        <RealisticBookCover book={item.book} size="sm" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0">
                            <h3 className="font-playfair font-bold text-sm text-[#1A1A2E] line-clamp-1">
                              {item.book.title}
                            </h3>
                            <p className="text-[11px] text-[#8B1A1A] font-semibold capitalize">
                              {item.format} Edition
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.book.id)}
                            className="text-gray-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                            title="Remove"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-2 border border-gray-200 rounded-xl bg-white p-1">
                            <button
                              onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100 rounded text-gray-600 cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100 rounded text-gray-600 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-bold text-sm text-[#1A1A2E]">
                            ₹{itemTotal}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-[#FDFAF6] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-medium">Estimated Subtotal</span>
                  <span className="text-2xl font-bold font-playfair text-[#1A1A2E]">
                    ₹{Math.round(subtotal * (subtotal < 100 ? 25 : 1))}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">Free door-step delivery & genuine publishing quality guaranteed.</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={closeCart}
                    className="px-4 py-3 rounded-xl border border-gray-200 font-bold text-xs text-[#1A1A2E] hover:bg-white transition-colors cursor-pointer"
                  >
                    Continue Browsing
                  </button>
                  <Link
                    href="/bookstore/checkout"
                    onClick={closeCart}
                    className="px-4 py-3 rounded-xl bg-[#8B1A1A] text-white font-bold text-xs hover:bg-[#722F37] transition-all text-center shadow-md cursor-pointer"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
