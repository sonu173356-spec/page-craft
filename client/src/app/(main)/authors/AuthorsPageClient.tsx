'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Search, Book } from 'lucide-react';

const ALL_GENRES = ['All', 'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Business', 'Memoir', 'Children'];

const mockAuthors = [
  { id: 1, name: 'Eleanor Vance', initials: 'EV', color: 'bg-rose-100 text-rose-700', genres: ['Fiction', 'Mystery'], books: 3, bio: 'Bestselling author of suspenseful psychological thrillers.' },
  { id: 2, name: 'Marcus Sterling', initials: 'MS', color: 'bg-blue-100 text-blue-700', genres: ['Business', 'Non-Fiction'], books: 5, bio: 'Entrepreneur and investor sharing insights on modern startups.' },
  { id: 3, name: 'Sarah Jenkins', initials: 'SJ', color: 'bg-green-100 text-green-700', genres: ['Romance'], books: 2, bio: 'Writing heartwarming contemporary romance set in small towns.' },
  { id: 4, name: 'David Chen', initials: 'DC', color: 'bg-purple-100 text-purple-700', genres: ['Sci-Fi'], books: 4, bio: 'Exploring the intersection of AI and humanity in near-future settings.' },
  { id: 5, name: 'Elena Rodriguez', initials: 'ER', color: 'bg-yellow-100 text-yellow-700', genres: ['Memoir'], books: 1, bio: 'Award-winning chef documenting her culinary journey across Europe.' },
  { id: 6, name: 'Amanda Clarke', initials: 'AC', color: 'bg-orange-100 text-orange-700', genres: ['Children'], books: 6, bio: 'Creator of the beloved "Little Paws" illustrated series.' },
  { id: 7, name: 'Dr. Robert Hale', initials: 'RH', color: 'bg-teal-100 text-teal-700', genres: ['Non-Fiction', 'Business'], books: 2, bio: 'Professor of Economics breaking down complex market dynamics.' },
  { id: 8, name: 'Jessica Wong', initials: 'JW', color: 'bg-indigo-100 text-indigo-700', genres: ['Fantasy', 'Sci-Fi'], books: 3, bio: 'World-builder crafting epic high-fantasy sagas.' },
  { id: 9, name: 'Tom Baker', initials: 'TB', color: 'bg-red-100 text-red-700', genres: ['Mystery'], books: 8, bio: 'Veteran detective turned crime novelist.' },
  { id: 10, name: 'Rachel Greene', initials: 'RG', color: 'bg-pink-100 text-pink-700', genres: ['Romance', 'Fiction'], books: 4, bio: 'Writing stories about love, loss, and finding oneself.' },
  { id: 11, name: 'Michael O\'Connor', initials: 'MO', color: 'bg-cyan-100 text-cyan-700', genres: ['Fiction', 'Mystery'], books: 2, bio: 'Irish author known for atmospheric historical fiction.' },
  { id: 12, name: 'Sophie Turner', initials: 'ST', color: 'bg-emerald-100 text-emerald-700', genres: ['Non-Fiction'], books: 1, bio: 'Botanist writing about the hidden life of urban plants.' },
  { id: 13, name: 'James Wilson', initials: 'JW', color: 'bg-slate-100 text-slate-700', genres: ['Business'], books: 3, bio: 'Consultant helping founders navigate early-stage growth.' },
  { id: 14, name: 'Lily Evans', initials: 'LE', color: 'bg-fuchsia-100 text-fuchsia-700', genres: ['Fantasy'], books: 2, bio: 'Weaving tales of magic and mythology for young adults.' }
];

const ITEMS_PER_PAGE = 8;

export default function AuthorsPageClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGenre, setActiveGenre] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAuthors = useMemo(() => {
    return mockAuthors.filter(author => {
      const matchesSearch = author.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            author.bio.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = activeGenre === 'All' || author.genres.includes(activeGenre);
      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, activeGenre]);

  const totalPages = Math.ceil(filteredAuthors.length / ITEMS_PER_PAGE);
  const currentAuthors = filteredAuthors.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeGenre]);

  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-charcoal text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Authors' }]} className="mb-8 text-white/80" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              Meet Our Published Authors
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Discover the talented individuals who have trusted Page Craft to bring their stories to the world.
            </p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                type="text" 
                placeholder="Search authors by name or bio..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-3 rounded-full border-none shadow-lg text-charcoal bg-white w-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          
          {/* Genre Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {ALL_GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeGenre === genre 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Author Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {currentAuthors.map((author) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={author.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl ${author.color} group-hover:scale-110 transition-transform duration-300`}>
                      {author.initials}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm font-medium bg-gray-50 px-2.5 py-1 rounded-lg">
                      <Book className="w-4 h-4 mr-1.5 text-accent" />
                      {author.books} {author.books === 1 ? 'Book' : 'Books'}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-charcoal mb-2">{author.name}</h3>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {author.genres.map(g => (
                      <Badge key={g} variant="outline" className="text-xs bg-gray-100 text-gray-600 border-none font-medium">
                        {g}
                      </Badge>
                    ))}
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-3 mt-auto">
                    {author.bio}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredAuthors.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No authors found matching your criteria.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveGenre('All'); }}
                className="text-primary mt-2 font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-12">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 font-medium transition-colors"
              >
                Previous
              </button>
              
              <div className="flex space-x-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-colors ${
                      currentPage === i + 1 
                        ? 'bg-primary text-white' 
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 font-medium transition-colors"
              >
                Next
              </button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
