'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { BookOpen, Target, Heart, Lightbulb, ExternalLink, Sparkles, CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Royalty to Authors', value: '100%', icon: Target },
  { label: 'Global Distribution Channels', value: '150+', icon: BookOpen },
  { label: 'Average Publishing Turnaround', value: '30-45 Days', icon: Zap },
  { label: 'Author Care & Support', value: '24/7', icon: Heart },
];

const values = [
  { title: 'Quality First', description: 'We never compromise on the editing, typography, cover design, or print quality of our authors’ books.', icon: BookOpen },
  { title: '100% Royalty & Transparency', description: 'Authors retain 100% net royalties and all intellectual property rights forever. Zero hidden cuts.', icon: Target },
  { title: 'Author Centric', description: 'Your creative vision is our highest priority. We assign a personal publishing consultant to every project.', icon: Heart },
  { title: 'Modern Innovation', description: 'Embracing modern technology, automated portals, and global distribution for emerging writers.', icon: Lightbulb },
];

const milestones = [
  {
    year: '2026',
    stage: 'Phase 01',
    title: 'The Beginning',
    description: 'Founded with a simple vision: to make publishing more accessible, transparent, and author-friendly. We began building a modern publishing platform focused on helping writers bring their stories to readers.',
  },
];

const teamMembers = [
  {
    name: 'Vikramaditya Rao',
    role: 'Founder & Publishing Director',
    bio: 'Dedicated to building an accessible, transparent, and modern publishing ecosystem for independent authors.',
    initials: 'VR',
    color: 'bg-rose-700',
  },
  {
    name: 'Dr. Priya Sharma',
    role: 'Chief Editorial Officer',
    bio: 'Overseeing book interior assessment, developmental editing, and editorial standards for emerging writers.',
    initials: 'PS',
    color: 'bg-amber-600',
  },
  {
    name: 'Arjun Menon',
    role: 'Head of Global Distribution',
    bio: 'Managing print-on-demand networks, logistics, and digital catalog listings across major retail channels.',
    initials: 'AM',
    color: 'bg-teal-700',
  },
  {
    name: 'Aisha Khan',
    role: 'Lead Book & Cover Designer',
    bio: 'Crafting bespoke typography layouts, print interior formatting, and market-ready book covers.',
    initials: 'AK',
    color: 'bg-[#8B1A1A]',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function AboutPageClient() {
  return (
    <div className="bg-[#FDFAF6] min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} className="mb-8" />
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="px-3.5 py-1 bg-red-100 text-[#8B1A1A] text-xs font-bold rounded-full uppercase tracking-wider">
              About Page Craft
            </span>
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-[#1A1A2E] mt-4 mb-6 leading-tight">
              Crafting Stories, <span className="text-[#8B1A1A]">Building Legacies</span>
            </h1>
            <p className="text-lg md:text-xl text-[#4A4A5A] leading-relaxed font-inter max-w-3xl mx-auto">
              We are a modern self-publishing house dedicated to bringing extraordinary stories to life. 
              By combining high editorial standards with innovative technology, we empower authors to publish professionally and retain 100% royalty.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Highlights / Commitments Strip */}
      <section className="py-14 bg-white border-y border-gray-100 shadow-sm">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div key={index} variants={itemVariants} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-[#8B1A1A] mb-3 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl md:text-4xl font-playfair font-bold text-[#1A1A2E] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 font-medium text-xs md:text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 space-y-4">
              <span className="px-3 py-1 bg-amber-100 text-[#C5A55A] font-bold text-xs rounded-full uppercase">
                Our Mission
              </span>
              <h2 className="text-3xl font-playfair font-bold text-[#1A1A2E]">
                Democratizing Publishing for Every Writer
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                To eliminate the traditional gatekeeping of publishing by providing authors with world-class editorial, cover design, premium printing, and global distribution services without forfeiting creative rights or royalties.
              </p>
              <ul className="space-y-2 pt-2 text-xs font-semibold text-gray-700">
                <li className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> 100% Net Royalty retention
                </li>
                <li className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Fast turnaround in 30-45 days
                </li>
                <li className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Global listing in 150+ countries
                </li>
              </ul>
            </div>

            <div className="bg-[#1A1A2E] text-white p-8 md:p-10 rounded-3xl shadow-xl space-y-4">
              <span className="px-3 py-1 bg-white/10 text-[#C5A55A] font-bold text-xs rounded-full uppercase">
                Our Vision
              </span>
              <h2 className="text-3xl font-playfair font-bold text-white">
                Empowering Voices & New Stories
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                We envision a world where every compelling book interior finds its readers. Through modern print-on-demand technology, transparent author dashboards, and personalized support, we are building the future of author-first publishing.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-bold text-[#C5A55A]">
                <span>⭐ Author-First Publishing</span>
                <span>•</span>
                <span>🚀 Built for Growth in 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🌟 Refined "Our Journey" Timeline — Exclusively 2026 Phase 01 */}
      <section className="py-24 px-4 bg-white border-y border-gray-100">
        <div className="container mx-auto max-w-4xl">
          {/* Centered Heading */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="px-3 py-1 bg-red-100 text-[#8B1A1A] font-bold text-xs rounded-full uppercase tracking-wider">
              2026 & Beyond
            </span>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#1A1A2E]">
              Our Journey
            </h2>
            <div className="w-16 h-1 bg-[#8B1A1A] mx-auto rounded-full mt-2 mb-3" />
            <p className="text-base text-gray-600 leading-relaxed font-inter">
              From a new beginning to a growing home for authors and stories.
            </p>
          </div>

          {/* Desktop Timeline (Clean Centered 2026 Phase 01) */}
          <div className="hidden md:block relative max-w-3xl mx-auto">
            {/* Center Continuous Vertical Line */}
            <div className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-rose-200 via-[#8B1A1A]/30 to-rose-200 -translate-x-1/2" />

            <div className="space-y-12">
              {milestones.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative grid grid-cols-2 gap-12 items-center"
                >
                  {/* Left Column: Year & Phase */}
                  <div className="flex items-center justify-end text-right pr-8">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-[#C5A55A] uppercase tracking-widest block">
                        {item.stage}
                      </span>
                      <span className="text-5xl md:text-6xl font-playfair font-bold text-[#8B1A1A]">
                        {item.year}
                      </span>
                    </div>
                  </div>

                  {/* Central Timeline Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-[#8B1A1A] ring-4 ring-rose-100 flex items-center justify-center shadow-md">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  </div>

                  {/* Right Column: Information Card */}
                  <div className="flex items-center justify-start pl-8 text-left">
                    <div className="bg-[#FDFAF6] p-8 rounded-3xl shadow-sm border border-gray-100 w-full hover:shadow-md transition-shadow">
                      <span className="text-xs font-bold text-[#C5A55A] uppercase tracking-wider block mb-1">
                        {item.stage}
                      </span>
                      <h3 className="text-2xl font-playfair font-bold text-[#1A1A2E] mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed font-inter">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile / Tablet Single Column Timeline */}
          <div className="md:hidden relative pl-8 border-l-2 border-rose-200 ml-4">
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Timeline Dot on line */}
                <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-[#8B1A1A] ring-4 ring-rose-100" />
                
                <div className="mb-2 flex items-baseline gap-2">
                  <span className="text-3xl font-playfair font-bold text-[#8B1A1A]">{item.year}</span>
                  <span className="text-xs font-bold text-[#C5A55A] uppercase tracking-wider">• {item.stage}</span>
                </div>

                <div className="bg-[#FDFAF6] p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-playfair font-bold text-[#1A1A2E] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed font-inter">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Emotional Takeaway */}
          <div className="mt-14 text-center">
            <p className="text-sm font-playfair italic text-[#8B1A1A] font-semibold">
              “2026 is where our story begins — and this is only the beginning.”
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <SectionHeading title="Meet Our Leadership" subtitle="The publishing professionals and book craft experts behind your success." align="center" className="mb-14" />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((m) => (
              <div key={m.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all space-y-3">
                <div className={`w-20 h-20 rounded-full ${m.color} text-white font-bold text-xl flex items-center justify-center mx-auto shadow-md`}>
                  {m.initials}
                </div>
                <div>
                  <h3 className="font-playfair font-bold text-lg text-[#1A1A2E]">{m.name}</h3>
                  <p className="text-xs font-bold text-[#8B1A1A] uppercase tracking-wider">{m.role}</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed pt-1">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-[#1A1A2E] text-white px-4">
        <div className="container mx-auto max-w-6xl">
          <SectionHeading title="Core Values" subtitle="What drives us forward every single day" align="center" className="mb-16 text-white" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-[#C5A55A]/50 transition-colors"
                >
                  <Icon className="w-10 h-10 text-[#C5A55A] mb-6" />
                  <h3 className="text-xl font-bold mb-3 font-playfair">{value.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#FDFAF6] to-[#FFF5F5] px-4 text-center border-t border-rose-100">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="w-12 h-12 rounded-full bg-red-100 text-[#8B1A1A] flex items-center justify-center mx-auto shadow-inner">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-4xl font-playfair font-bold text-[#1A1A2E]">Ready to share your story?</h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            Begin your author journey with Page Craft. Publish your book in paperback & eBook and earn 100% royalty.
          </p>
          <div className="pt-2">
            <Link
              href="/login?redirect=/author/upload-book"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-full font-bold text-base shadow-md hover:shadow-xl transition-all cursor-pointer"
            >
              Publish My Book
              <ExternalLink className="w-4 h-4 opacity-80" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
