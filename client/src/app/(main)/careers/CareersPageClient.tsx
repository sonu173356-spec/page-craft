'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { 
  Briefcase, Clock, Heart, BookOpen, 
  Coffee, Laptop, Globe, Sparkles,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const benefits = [
  { title: 'Flexible Hours', description: 'Work when you are most productive. We care about results, not clocking in.', icon: Clock },
  { title: 'Remote Work', description: 'Work from anywhere in the world, or join us at our NY headquarters.', icon: Globe },
  { title: 'Learning Budget', description: 'Annual stipend for courses, conferences, and continued professional growth.', icon: Laptop },
  { title: 'Health Insurance', description: 'Comprehensive medical, dental, and vision coverage for you and your family.', icon: Heart },
  { title: 'Book Allowance', description: 'Free books from our catalog and a monthly stipend for any other books.', icon: BookOpen },
  { title: 'Creative Freedom', description: 'We encourage innovative thinking and give you the autonomy to execute ideas.', icon: Sparkles },
];

const jobs = [
  {
    title: 'Senior Developmental Editor',
    department: 'Editorial',
    location: 'Remote / New York',
    type: 'Full-time',
    description: `We are looking for an experienced developmental editor to work closely with our fiction authors. You will be responsible for structural edits, pacing, character development, and guiding authors through the rewriting process. 
    \n\nRequirements:\n- 5+ years of editing experience in traditional or hybrid publishing\n- Strong portfolio of published works\n- Excellent communication skills\n- Empathy and patience in working with authors.`
  },
  {
    title: 'Book Cover Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description: `Join our award-winning design team to create stunning, market-ready book covers across various genres. You'll work directly with authors and our Art Director to bring stories to life visually.
    \n\nRequirements:\n- 3+ years of book cover design experience\n- Mastery of Adobe Creative Suite\n- Understanding of genre tropes and market trends\n- Strong typography skills.`
  },
  {
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'New York (Hybrid)',
    type: 'Full-time',
    description: `Help our authors reach their target readers. You will manage Amazon Ads, coordinate social media campaigns, and develop comprehensive launch strategies for high-profile releases.
    \n\nRequirements:\n- Proven track record in book marketing\n- Experience with Amazon Advertising and Facebook Ads\n- Strong copywriting abilities\n- Data-driven approach to marketing.`
  },
  {
    title: 'Author Success Manager',
    department: 'Support',
    location: 'Remote',
    type: 'Full-time',
    description: `Be the primary point of contact for our published authors. You will guide them through the post-publishing phase, answer questions about royalties, and help them navigate our platform.
    \n\nRequirements:\n- Exceptional customer service skills\n- Background in publishing or author services\n- Highly organized and detail-oriented\n- Tech-savvy and able to troubleshoot platform issues.`
  }
];

export default function CareersPageClient() {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 bg-charcoal text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[150%] rounded-full bg-gradient-to-r from-primary to-accent blur-3xl transform rotate-12" />
          <div className="absolute top-[20%] right-[10%] w-[40%] h-[100%] rounded-full bg-gradient-to-l from-primary to-accent blur-3xl transform -rotate-45" />
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Careers' }]} className="mb-8 text-white/80" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-accent text-sm font-medium tracking-wider mb-6">JOIN OUR TEAM</span>
            <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6">
              Help Us Build The Future Of Publishing
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              We're a team of book lovers, tech enthusiasts, and creative minds working together to empower authors worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Culture / Benefits Section */}
      <section className="py-24 px-4 bg-white border-y border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-playfair font-bold text-charcoal mb-6">Life at Page Craft</h2>
            <p className="text-lg text-gray-600">
              We believe in treating our team as well as we treat our authors. That means providing a supportive, creative, and flexible environment where you can do your best work.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-ivory p-8 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-charcoal mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading 
            title="Open Positions" 
            subtitle="Find your next opportunity" 
            align="left" 
            className="mb-12" 
          />
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            {jobs.length > 0 ? (
              <Accordion 
                items={jobs.map(job => ({
                  id: job.title,
                  title: (
                    <div className="flex flex-col md:flex-row md:items-center justify-between w-full pr-4 gap-4">
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-charcoal">{job.title}</h3>
                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500 font-medium">
                          <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1"/> {job.department}</span>
                          <span className="flex items-center"><Globe className="w-4 h-4 mr-1"/> {job.location}</span>
                          <span className="flex items-center"><Clock className="w-4 h-4 mr-1"/> {job.type}</span>
                        </div>
                      </div>
                    </div>
                  ),
                  content: (
                    <div className="pt-4 border-t border-gray-100 mt-4">
                      <div className="prose prose-sm max-w-none text-gray-600 mb-6 whitespace-pre-wrap">
                        {job.description}
                      </div>
                      <Link href={`/contact?subject=Application%20for%20${encodeURIComponent(job.title)}`}>
                        <Button className="bg-primary hover:bg-primary-dark text-white rounded-full">
                          Apply for this position
                        </Button>
                      </Link>
                    </div>
                  )
                }))} 
              />
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Coffee className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-lg font-medium">We don't have any open positions right now.</p>
                <p>Check back later or send an open application via our contact form.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
