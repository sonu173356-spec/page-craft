'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store';

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-[#1A1A2E]/40 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-playfair text-xl font-bold text-[#1A1A2E] flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Shopping Cart
              </h2>
              <button
                onClick={closeCart}
                className="p-2 text-gray-400 hover:text-[#1A1A2E] transition-colors rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <ShoppingBag className="w-16 h-16" />
                  <p className="text-lg text-[#1A1A2E]">Your cart is empty</p>
                  <button onClick={closeCart} className="text-[#8B1A1A] font-medium hover:underline">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.book.id}-${item.format}`} className="flex gap-4">
                    <div className="relative w-20 aspect-[2/3] bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      {item.book.coverImage ? (
                        <Image src={item.book.coverImage} alt={item.book.title} fill className="object-cover" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#8B1A1A] to-[#722F37] flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-white/50" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-[#1A1A2E] line-clamp-1">{item.book.title}</h3>
                          <p className="text-sm text-gray-500 capitalize">{item.format}</p>
                        </div>
                        <button onClick={() => removeItem(item.book.id)} className="text-gray-400 hover:text-red-500 p-1">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-3 border border-gray-200 rounded-lg p-1">
                          <button onClick={() => updateQuantity(item.book.id, item.quantity - 1)} className="p-1 hover:bg-gray-100 rounded">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.book.id, item.quantity + 1)} className="p-1 hover:bg-gray-100 rounded">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-bold text-[#1A1A2E]">${(item.book.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-xl font-bold text-[#1A1A2E]">${getTotal().toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={closeCart} className="px-4 py-3 rounded-lg border border-gray-200 font-medium text-[#1A1A2E] hover:bg-gray-100 transition-colors">
                    Continue
                  </button>
                  <Link href="/bookstore/checkout" onClick={closeCart} className="px-4 py-3 rounded-lg bg-[#8B1A1A] text-white font-medium hover:bg-[#722F37] transition-colors text-center">
                    Checkout
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
