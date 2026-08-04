'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, MapPin, Phone, Globe, ExternalLink } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { FOOTER_LINKS, SITE_CONFIG } from '@/lib/constants';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

  const socialIconMap: Record<string, React.ReactNode> = {
    instagram: <Globe className="w-5 h-5" />,
    facebook: <Globe className="w-5 h-5" />,
    twitter: <Globe className="w-5 h-5" />,
    linkedin: <Globe className="w-5 h-5" />,
    youtube: <Globe className="w-5 h-5" />,
  };

  return (
    <footer className="bg-[#1A1A2E] text-[#FDFAF6]">
      {/* Top Section: Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-playfair font-bold text-white mb-2">
                Join our newsletter
              </h3>
              <p className="text-gray-400">
                Get the latest publishing tips, author interviews, and exclusive offers delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md lg:ml-auto w-full">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C5A55A] focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-3 font-medium bg-[#C5A55A] text-[#1A1A2E] rounded-lg hover:bg-[#b0934f] transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Section: Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <Logo darkBg size="lg" />
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              {SITE_CONFIG.description}
            </p>
            <div className="flex items-center gap-4 pt-2">
              {Object.entries(SITE_CONFIG.social).map(([platform, url]) => (
                <motion.a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#C5A55A] hover:text-[#1A1A2E] transition-colors"
                  aria-label={`Visit our ${platform} page`}
                >
                  {socialIconMap[platform]}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-playfair font-semibold text-white mb-6">Services</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#C5A55A] transition-colors inline-flex items-center group text-sm"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Dashboards & Portals */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h4 className="text-lg font-playfair font-semibold text-white mb-4">Dashboards & Portals</h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.dashboards?.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={`/login?redirect=${encodeURIComponent(link.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-[#C5A55A] transition-colors text-sm flex items-center gap-1.5 font-medium"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3 text-[#C5A55A]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-playfair font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                {FOOTER_LINKS.company.slice(0, 3).map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-[#C5A55A] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Legal & Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-playfair font-semibold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-400 mb-8 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C5A55A] flex-shrink-0 mt-1" />
                <span>
                  {SITE_CONFIG.address.line1}<br />
                  {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} {SITE_CONFIG.address.zip}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C5A55A] flex-shrink-0" />
                <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C5A55A] flex-shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>

            <h4 className="text-lg font-playfair font-semibold text-white mb-4">Legal</h4>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#C5A55A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Made with <span className="text-red-500 animate-pulse">❤️</span> by Page Craft
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
