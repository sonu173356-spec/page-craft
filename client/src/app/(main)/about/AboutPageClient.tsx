'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BookOpen, Target, Heart, Lightbulb, Users, Globe } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Books Published', value: 2500, suffix: '+', icon: BookOpen },
  { label: 'Active Authors', value: 1200, suffix: '+', icon: Users },
  { label: 'Countries Reached', value: 85, suffix: '', icon: Globe },
  { label: 'Copies Sold', value: 5000000, suffix: '+', icon: Target },
];

const values = [
  { title: 'Quality First', description: 'We never compromise on the editing, design, or production quality of our books.', icon: BookOpen },
  { title: 'Transparency', description: 'Clear communication, fair contracts, and honest feedback at every stage.', icon: Target },
  { title: 'Author Centric', description: 'Your vision is our priority. We work to amplify your unique voice.', icon: Heart },
  { title: 'Innovation', description: 'Embracing new technologies and marketing strategies in publishing.', icon: Lightbulb },
];

const team = [
  { name: 'Eleanor Vance', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { name: 'Marcus Sterling', role: 'Head of Editing', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { name: 'Sarah Chen', role: 'Art Director', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { name: 'James Wilson', role: 'Marketing Lead', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
];

const milestones = [
  { year: '2019', title: 'The Beginning', description: 'Page Craft was founded with a mission to democratize premium publishing.' },
  { year: '2021', title: 'Going Global', description: 'Expanded our distribution network to over 50 countries worldwide.' },
  { year: '2023', title: 'Digital Revolution', description: 'Launched our proprietary author dashboard and real-time royalty tracking.' },
  { year: '2026', title: 'Industry Leaders', description: 'Recognized as the fastest-growing independent publisher in North America.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function AboutPageClient() {
  return (
    <div className="bg-ivory min-h-screen">
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
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-charcoal mb-6">
              Crafting Stories, <span className="text-primary">Building Legacies</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We are a modern publishing house dedicated to bringing extraordinary stories to life. 
              By combining traditional publishing quality with innovative technology, we empower authors to reach readers worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
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
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-500 font-medium">{stat.label}</div>
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
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col md:flex-row gap-6 items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              >
                <div className="md:w-1/2 flex justify-center md:justify-end md:px-8">
                  {index % 2 === 0 ? (
                    <div className="text-4xl font-playfair font-bold text-accent">{milestone.year}</div>
                  ) : (
                    <div className="text-left">
                      <h3 className="text-2xl font-bold text-charcoal mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  )}
                </div>
                <div className="hidden md:flex w-4 h-4 rounded-full bg-primary relative z-10 shrink-0" />
                <div className="md:w-1/2 flex justify-center md:justify-start md:px-8">
                  {index % 2 !== 0 ? (
                    <div className="text-4xl font-playfair font-bold text-accent">{milestone.year}</div>
                  ) : (
                    <div className="text-left">
                      <h3 className="text-2xl font-bold text-charcoal mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-charcoal text-white px-4">
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
                  className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700"
                >
                  <Icon className="w-10 h-10 text-accent mb-6" />
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <SectionHeading title="Meet the Team" subtitle="The people behind the pages" align="center" className="mb-16" />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/5]">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-bold text-charcoal text-center">{member.name}</h3>
                <p className="text-accent font-medium text-center">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-playfair font-bold text-charcoal mb-6">Ready to share your story?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of authors who have successfully published their work with Page Craft.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary-dark text-white rounded-full px-8">
              Start Publishing Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
