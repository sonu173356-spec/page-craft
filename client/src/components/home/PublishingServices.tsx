'use client';
import { motion } from 'framer-motion';
import { BookOpen, Printer, Globe, Megaphone, Edit3, PenTool } from 'lucide-react';
import { SectionHeading, Card } from '@/components/ui';
import Link from 'next/link';

const services = [
  {
    icon: BookOpen,
    title: 'Self-Publishing',
    description: 'Keep 100% of your rights and royalties. We guide you through the entire publishing process.',
    href: '/self-publishing'
  },
  {
    icon: Globe,
    title: 'Distribution',
    description: 'Make your book available globally across 150+ countries via major retailers like Amazon.',
    href: '/distribution'
  },
  {
    icon: Megaphone,
    title: 'Marketing',
    description: 'Strategic book promotion, author branding, and targeted ad campaigns to boost sales.',
    href: '/marketing-services'
  },
  {
    icon: Edit3,
    title: 'Editing',
    description: 'Professional developmental editing, copyediting, and proofreading for a flawless manuscript.',
    href: '/book-editing'
  }
];

export default function PublishingServices() {
  return (
    <section className="py-20 bg-[#FDFAF6]">
      <div className="container mx-auto px-4">
        <SectionHeading title="Our Publishing Services" subtitle="Everything you need to turn your manuscript into a masterpiece." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group h-full p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white border border-gray-100 rounded-2xl cursor-pointer">
                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#C5A55A]/10 transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-[#1A1A2E] group-hover:text-[#C5A55A] transition-colors duration-300" />
                </div>
                <h3 className="font-playfair font-bold text-2xl text-[#1A1A2E] mb-3">{service.title}</h3>
                <p className="text-[#6B7280] mb-6 leading-relaxed">
                  {service.description}
                </p>
                <Link href={service.href} className="inline-flex items-center text-[#8B1A1A] font-medium hover:text-[#722F37] transition-colors">
                  Learn More
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
