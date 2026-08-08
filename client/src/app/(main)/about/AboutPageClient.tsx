'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { BookOpen, Target, Heart, Lightbulb, Users, Globe, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Books Published', value: 25000, suffix: '+', icon: BookOpen },
  { label: 'Authors Published', value: 12000, suffix: '+', icon: Users },
  { label: 'Countries Reached', value: 150, suffix: '+', icon: Globe },
  { label: 'Copies Sold', value: 2000000, suffix: '+', icon: Target },
];

const values = [
  { title: 'Quality First', description: 'We never compromise on the editing, design, or production quality of our books.', icon: BookOpen },
  { title: 'Transparency', description: 'Clear communication, 100% net royalties, and honest feedback at every stage.', icon: Target },
  { title: 'Author Centric', description: 'Your vision is our priority. We work to amplify your unique voice worldwide.', icon: Heart },
  { title: 'Innovation', description: 'Embracing modern technology, automated portals, and global distribution.', icon: Lightbulb },
];

const milestones = [
  { year: '2019', title: 'The Beginning', description: 'Page Craft was founded with a mission to make self-publishing transparent, accessible, and author-first.' },
  { year: '2021', title: 'Going Global', description: 'Expanded distribution across Amazon, Flipkart, Google Books, and 150+ international platforms.' },
  { year: '2023', title: 'Author Portal & Tech', description: 'Launched our dedicated author dashboard, real-time sales reporting, and automated manuscript systems.' },
  { year: '2026', title: 'Industry Leaders', description: 'Trusted by over 12,000+ published authors with 25,000+ published books across the globe.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-[#1A1A2E] mb-6">
              Crafting Stories, <span className="text-[#8B1A1A]">Building Legacies</span>
            </h1>
            <p className="text-lg md:text-xl text-[#4A4A5A] leading-relaxed font-inter">
              We are a modern self-publishing house dedicated to bringing extraordinary stories to life. 
              By combining premium editorial standards with state-of-the-art technology, we empower authors to publish globally and retain 100% royalty.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with Updated Metrics */}
      <section className="py-16 bg-white border-y border-gray-100 shadow-sm">
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
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-[#8B1A1A] mb-4 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-4xl md:text-5xl font-playfair font-bold text-[#1A1A2E] mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-500 font-medium text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading title="Our Journey" subtitle="How we got here" align="center" className="mb-16" />
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col md:flex-row gap-6 items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              >
                <div className="md:w-1/2 flex justify-center md:justify-end md:px-8">
                  {index % 2 === 0 ? (
                    <div className="text-4xl font-playfair font-bold text-[#C5A55A]">{milestone.year}</div>
                  ) : (
                    <div className="text-left bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full">
                      <h3 className="text-xl font-bold text-[#1A1A2E] mb-1 font-playfair">{milestone.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{milestone.description}</p>
                    </div>
                  )}
                </div>
                <div className="hidden md:flex w-4 h-4 rounded-full bg-[#8B1A1A] ring-4 ring-rose-100 relative z-10 shrink-0" />
                <div className="md:w-1/2 flex justify-center md:justify-start md:px-8">
                  {index % 2 !== 0 ? (
                    <div className="text-4xl font-playfair font-bold text-[#C5A55A]">{milestone.year}</div>
                  ) : (
                    <div className="text-left bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full">
                      <h3 className="text-xl font-bold text-[#1A1A2E] mb-1 font-playfair">{milestone.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{milestone.description}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-[#1A1A2E] text-white px-4">
        <div className="container mx-auto max-w-6xl">
          <SectionHeading title="Core Values" subtitle="What drives us forward" align="center" className="mb-16 text-white" />
          
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

      {/* CTA Section - Logo Crimson & Target Blank Secondary Window */}
      <section className="py-20 bg-gradient-to-b from-[#FDFAF6] to-[#FFF5F5] px-4 text-center border-t border-rose-100">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="w-12 h-12 rounded-full bg-red-100 text-[#8B1A1A] flex items-center justify-center mx-auto shadow-inner">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-4xl font-playfair font-bold text-[#1A1A2E]">Ready to share your story?</h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            Join over 12,000+ published authors worldwide. Publish your book in paperback & eBook and earn 100% royalty with Page Craft.
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
