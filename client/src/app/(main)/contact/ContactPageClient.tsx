'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Using hook form and zod
import { useForm as useReactHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  queryType: z.string().min(1, 'Please select a query type'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters')
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPageClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useReactHookForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { queryType: '' }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('We have received your inquiry and will get back to you shortly.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-charcoal text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]} className="mb-8 text-white/80" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Whether you're ready to publish or just have a few questions, our team is here to help you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 -mt-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex items-start space-x-4">
                <div className="p-3 bg-primary/10 text-primary rounded-full"><Mail className="w-6 h-6" /></div>
                <div>
                  <h3 className="text-lg font-bold text-charcoal mb-1">Email Us</h3>
                  <p className="text-gray-500 mb-2">Our friendly team is here to help.</p>
                  <a href="mailto:hello@pagecraft.com" className="text-primary font-medium hover:underline">hello@pagecraft.com</a>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex items-start space-x-4">
                <div className="p-3 bg-primary/10 text-primary rounded-full"><Phone className="w-6 h-6" /></div>
                <div>
                  <h3 className="text-lg font-bold text-charcoal mb-1">Call Us</h3>
                  <p className="text-gray-500 mb-2">Mon-Fri from 8am to 5pm.</p>
                  <a href="tel:+15550000000" className="text-primary font-medium hover:underline">+1 (555) 000-0000</a>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex items-start space-x-4">
                <div className="p-3 bg-primary/10 text-primary rounded-full"><MapPin className="w-6 h-6" /></div>
                <div>
                  <h3 className="text-lg font-bold text-charcoal mb-1">Visit Us</h3>
                  <p className="text-gray-500 mb-2">Come say hello at our office HQ.</p>
                  <p className="text-charcoal font-medium">100 Publishing Way<br/>New York, NY 10012</p>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100"
            >
              <h2 className="text-3xl font-playfair font-bold text-charcoal mb-8">Send us a message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input 
                    label="Full Name" 
                    placeholder="Jane Doe" 
                    {...register('name')} 
                    error={errors.name?.message} 
                  />
                  <Input 
                    label="Email Address" 
                    type="email" 
                    placeholder="jane@example.com" 
                    {...register('email')} 
                    error={errors.email?.message} 
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Input 
                    label="Phone Number" 
                    placeholder="+1 (555) 000-0000" 
                    {...register('phone')} 
                    error={errors.phone?.message} 
                  />
                  <Select 
                    label="Query Type" 
                    options={[
                      { value: '', label: 'Select a query type' },
                      { value: 'publishing', label: 'Publishing Services' },
                      { value: 'support', label: 'Author Support' },
                      { value: 'press', label: 'Press & Media' },
                      { value: 'other', label: 'Other' }
                    ]}
                    {...register('queryType')} 
                    error={errors.queryType?.message} 
                  />
                </div>

                <Input 
                  label="Subject" 
                  placeholder="How can we help?" 
                  {...register('subject')} 
                  error={errors.subject?.message} 
                />

                <TextArea 
                  label="Message" 
                  placeholder="Tell us a little more about what you need..." 
                  rows={5}
                  {...register('message')} 
                  error={errors.message?.message} 
                />

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary-dark text-white py-4 text-lg" 
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                  leftIcon={!isSubmitting ? <Send className="w-5 h-5" /> : undefined}
                >
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map & Hours Section */}
      <section className="py-16 px-4 bg-white border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-playfair font-bold text-charcoal mb-6">Our Office</h2>
              <p className="text-gray-600 mb-8">
                Located in the heart of New York's publishing district, our headquarters is where the magic happens. 
                While we operate globally, we always welcome our authors to drop by for a coffee and a chat.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-charcoal">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="font-medium">Monday - Friday:</span>
                  <span className="text-gray-600">9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex items-center space-x-3 text-charcoal">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="font-medium">Saturday - Sunday:</span>
                  <span className="text-gray-600">Closed</span>
                </div>
              </div>
            </div>
            
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-md bg-gray-100 group">
              {/* Decorative Map Placeholder */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-charcoal/20" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-xl animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
