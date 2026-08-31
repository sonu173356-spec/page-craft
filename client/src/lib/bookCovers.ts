// ============================================================
// Page Craft — Realistic Book Catalog & Cover Integration Service
// ============================================================

export interface PublishedBook {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  authorSlug?: string;
  authorId?: string;
  genre: string;
  category: string;
  price: string;
  numericPrice: number;
  originalPrice?: string;
  rating: number;
  reviewCount: number;
  description: string;
  isbn: string;
  pages: number;
  format: string;
  featured: boolean;
  status: 'published' | 'under_review' | 'draft';
  created_at: string;
  cover_image_url?: string | null;
  // Visual artwork preset metadata for fallback realistic cover
  coverStyle: {
    bgGradient: string;
    accentColor: string;
    textColor: string;
    fontFamily: string;
    textureImage: string;
    moodBadge: string;
  };
}

export const SAMPLE_PUBLISHED_BOOKS: PublishedBook[] = [
  {
    id: 'book-se-1',
    title: 'The Silent Echo',
    subtitle: 'A Novel of Solitude and Memory',
    author: 'Elena Martinez',
    authorSlug: 'eleanor-vance',
    authorId: 'author-1',
    genre: 'Literary Fiction / Mystery',
    category: 'Mystery',
    price: '₹399',
    numericPrice: 399,
    originalPrice: '₹499',
    rating: 4.9,
    reviewCount: 184,
    description:
      'A secluded manor in the Scottish Highlands holds the key to a twenty-year-old disappearance that refuses to remain buried in the mists of time.',
    isbn: '978-93-84729-10-4',
    pages: 384,
    format: 'Paperback • eBook',
    featured: true,
    status: 'published',
    created_at: '2026-08-01T10:00:00.000Z',
    cover_image_url: '/books/silent-echo.jpg',
    coverStyle: {
      bgGradient: 'from-[#0F172A] via-[#1E293B] to-[#334155]',
      accentColor: '#C5A55A',
      textColor: '#F8FAFC',
      fontFamily: 'Playfair Display, serif',
      textureImage: '/books/silent-echo.jpg',
      moodBadge: 'Literary Mystery',
    },
  },
  {
    id: 'book-bh-2',
    title: 'Beyond the Horizon',
    subtitle: 'Untold Expeditions into the Wild North',
    author: 'Marcus Sterling',
    authorSlug: 'marcus-sterling',
    authorId: 'author-2',
    genre: 'Adventure / Fiction',
    category: 'Adventure',
    price: '₹449',
    numericPrice: 449,
    originalPrice: '₹549',
    rating: 4.8,
    reviewCount: 142,
    description:
      'A breathtaking adventure chronicling three explorers navigating uncharted glaciers, perilous storms, and the raw beauty of the Arctic circle.',
    isbn: '978-93-84729-11-1',
    pages: 320,
    format: 'Paperback • Hardcover',
    featured: true,
    status: 'published',
    created_at: '2026-08-02T14:30:00.000Z',
    cover_image_url: '/books/beyond-horizon.jpg',
    coverStyle: {
      bgGradient: 'from-[#0B192C] via-[#1E3E62] to-[#000000]',
      accentColor: '#E2B659',
      textColor: '#FFFFFF',
      fontFamily: 'Playfair Display, serif',
      textureImage: '/books/beyond-horizon.jpg',
      moodBadge: 'Wild Adventure',
    },
  },
  {
    id: 'book-wt-3',
    title: 'Whispers of Time',
    subtitle: 'Chronicles of Forgotten Empires',
    author: 'Sarah Jenkins',
    authorSlug: 'sarah-jenkins',
    authorId: 'author-3',
    genre: 'Historical Fiction / Fantasy',
    category: 'Historical',
    price: '₹349',
    numericPrice: 349,
    originalPrice: '₹429',
    rating: 4.9,
    reviewCount: 210,
    description:
      'In the twilight of the Renaissance, an antique clockmaker uncovers a mechanism that weaves threads between divergent timelines.',
    isbn: '978-93-84729-12-8',
    pages: 410,
    format: 'Paperback • Collector Edition',
    featured: true,
    status: 'published',
    created_at: '2026-08-03T09:15:00.000Z',
    cover_image_url: '/books/whispers-time.jpg',
    coverStyle: {
      bgGradient: 'from-[#3B1E1E] via-[#5C2E2E] to-[#1A0B0B]',
      accentColor: '#D4AF37',
      textColor: '#FDF8F0',
      fontFamily: 'Cinzel, Georgia, serif',
      textureImage: '/books/whispers-time.jpg',
      moodBadge: 'Historical Epic',
    },
  },
  {
    id: 'book-ee-4',
    title: 'Echoes of Eternity',
    subtitle: 'Deep Stellar Odyssey',
    author: 'Mark T. Vance',
    authorSlug: 'mark-t-vance',
    authorId: 'author-4',
    genre: 'Sci-Fi / Space Opera',
    category: 'Sci-Fi',
    price: '₹399',
    numericPrice: 399,
    originalPrice: '₹499',
    rating: 4.7,
    reviewCount: 98,
    description:
      'When humanity discovers an ancient interstellar signal reverberating through deep space, a research vessel embarks on a journey beyond return.',
    isbn: '978-93-84729-13-5',
    pages: 352,
    format: 'Paperback • eBook',
    featured: true,
    status: 'published',
    created_at: '2026-08-08T08:00:00.000Z',
    cover_image_url: '/books/echoes-eternity.jpg',
    coverStyle: {
      bgGradient: 'from-[#0D0221] via-[#0F084B] to-[#26408B]',
      accentColor: '#A6E1FA',
      textColor: '#FFFFFF',
      fontFamily: 'Inter, sans-serif',
      textureImage: '/books/echoes-eternity.jpg',
      moodBadge: 'Space Opera',
    },
  },
  {
    id: 'book-vk-5',
    title: 'The Vegan Kitchen',
    subtitle: '100 Vibrant Plant-Based Creations',
    author: 'Lily Brooks',
    authorSlug: 'lily-brooks',
    authorId: 'author-5',
    genre: 'Cookbook / Lifestyle',
    category: 'Cookbook',
    price: '₹499',
    numericPrice: 499,
    originalPrice: '₹649',
    rating: 4.8,
    reviewCount: 167,
    description:
      'Wholesome, nourishing recipes crafted with farm-fresh herbs, seasonal produce, and simple step-by-step techniques for every home chef.',
    isbn: '978-93-84729-14-2',
    pages: 256,
    format: 'Hardcover • Full Color',
    featured: true,
    status: 'published',
    created_at: '2026-08-07T16:20:00.000Z',
    cover_image_url: '/books/vegan-kitchen.jpg',
    coverStyle: {
      bgGradient: 'from-[#1B4332] via-[#2D6A4F] to-[#52B788]',
      accentColor: '#D8F3DC',
      textColor: '#FFFFFF',
      fontFamily: 'Playfair Display, serif',
      textureImage: '/books/vegan-kitchen.jpg',
      moodBadge: 'Culinary Arts',
    },
  },
  {
    id: 'book-mw-6',
    title: 'Midnight Whispers',
    subtitle: 'A Psychological Thriller',
    author: 'S. R. Thorne',
    authorSlug: 'sr-thorne',
    authorId: 'author-6',
    genre: 'Psychological Thriller / Noir',
    category: 'Thriller',
    price: '₹299',
    numericPrice: 299,
    originalPrice: '₹399',
    rating: 4.6,
    reviewCount: 88,
    description:
      'A late-night radio host begins receiving calls from an anonymous listener who knows intimate secrets about past crimes never solved by police.',
    isbn: '978-93-84729-15-9',
    pages: 288,
    format: 'Paperback • Audiobook',
    featured: false,
    status: 'published',
    created_at: '2026-08-06T19:40:00.000Z',
    cover_image_url: '/books/midnight-whispers.jpg',
    coverStyle: {
      bgGradient: 'from-[#050505] via-[#171717] to-[#262626]',
      accentColor: '#DC2626',
      textColor: '#F5F5F5',
      fontFamily: 'Playfair Display, serif',
      textureImage: '/books/midnight-whispers.jpg',
      moodBadge: 'Noir Thriller',
    },
  },
  {
    id: 'book-sp-7',
    title: 'Startup Playbook',
    subtitle: 'From Idea to Scalable Enterprise',
    author: 'John Doe & Marcus Sterling',
    authorSlug: 'marcus-sterling',
    authorId: 'author-2',
    genre: 'Business & Strategy',
    category: 'Business',
    price: '₹599',
    numericPrice: 599,
    originalPrice: '₹749',
    rating: 4.9,
    reviewCount: 320,
    description:
      'Actionable frameworks, financial architectures, and execution strategies used by leading founders to build enduring tech ventures.',
    isbn: '978-93-84729-16-6',
    pages: 360,
    format: 'Hardcover • Paperback',
    featured: true,
    status: 'published',
    created_at: '2026-08-05T11:00:00.000Z',
    cover_image_url: '/books/startup-playbook.jpg',
    coverStyle: {
      bgGradient: 'from-[#0F172A] via-[#1E293B] to-[#3B82F6]',
      accentColor: '#60A5FA',
      textColor: '#FFFFFF',
      fontFamily: 'Inter, sans-serif',
      textureImage: '/books/startup-playbook.jpg',
      moodBadge: 'Executive Playbook',
    },
  },
  {
    id: 'book-ps-8',
    title: 'Poetic Soul',
    subtitle: 'Verses on Belonging & Light',
    author: 'Maya Lin',
    authorSlug: 'maya-lin',
    authorId: 'author-7',
    genre: 'Contemporary Poetry',
    category: 'Poetry',
    price: '₹199',
    numericPrice: 199,
    originalPrice: '₹299',
    rating: 4.9,
    reviewCount: 114,
    description:
      'A delicate collection of lyrical poetry exploring quiet moments of courage, heartbreak, healing, and the beauty of human connection.',
    isbn: '978-93-84729-17-3',
    pages: 140,
    format: 'Paperback Edition',
    featured: true,
    status: 'published',
    created_at: '2026-08-04T12:10:00.000Z',
    cover_image_url: '/books/poetic-soul.jpg',
    coverStyle: {
      bgGradient: 'from-[#4A0E17] via-[#8B1A1A] to-[#C5A55A]',
      accentColor: '#FFE5B4',
      textColor: '#FFF9F0',
      fontFamily: 'Playfair Display, serif',
      textureImage: '/books/poetic-soul.jpg',
      moodBadge: 'Lyrical Poetry',
    },
  },
  {
    id: 'book-lc-9',
    title: 'The Lost City',
    subtitle: 'Relics of the Forgotten Sun',
    author: 'Alex Rider',
    authorSlug: 'alex-rider',
    authorId: 'author-8',
    genre: 'Action & Adventure',
    category: 'Adventure',
    price: '₹349',
    numericPrice: 349,
    originalPrice: '₹449',
    rating: 4.7,
    reviewCount: 175,
    description:
      'Deep inside the Amazonian canopy lies an undiscovered obsidian temple guarded by ancient mechanisms and rival treasure hunters.',
    isbn: '978-93-84729-18-0',
    pages: 340,
    format: 'Paperback • eBook',
    featured: false,
    status: 'published',
    created_at: '2026-08-03T18:00:00.000Z',
    cover_image_url: '/books/lost-city.jpg',
    coverStyle: {
      bgGradient: 'from-[#1C1917] via-[#44403C] to-[#78716C]',
      accentColor: '#F59E0B',
      textColor: '#FAFAF9',
      fontFamily: 'Playfair Display, serif',
      textureImage: '/books/lost-city.jpg',
      moodBadge: 'Archaeological Thriller',
    },
  },
];

// ============================================================
// Cover Image Resolver Utility
// ============================================================
// 1. Author's uploaded front cover PNG always takes first priority.
// 2. If null or undefined, falls back to genre-specific artistic book cover.
export function resolveBookCover(book: Partial<PublishedBook> | any): {
  url: string | null;
  hasCustomUpload: boolean;
  altText: string;
} {
  const uploadedUrl =
    book?.cover_image_url ||
    book?.coverFrontImage ||
    book?.frontCoverImage ||
    book?.coverImage ||
    book?.image ||
    null;

  const title = book?.title || 'Untitled Book';
  const author = book?.author || book?.authorName || book?.penName || 'Page Craft Author';
  const altText = `${title} — Book cover by ${author}`;

  if (uploadedUrl && typeof uploadedUrl === 'string' && uploadedUrl.trim() !== '') {
    return {
      url: uploadedUrl,
      hasCustomUpload: true,
      altText,
    };
  }

  // Fallback to sample book artwork if matched by ID or Title
  const matched = SAMPLE_PUBLISHED_BOOKS.find(
    (b) =>
      b.id === book?.id ||
      b.title.toLowerCase().trim() === (book?.title || '').toLowerCase().trim()
  );

  if (matched?.cover_image_url) {
    return {
      url: matched.cover_image_url,
      hasCustomUpload: false,
      altText,
    };
  }

  return {
    url: null,
    hasCustomUpload: false,
    altText,
  };
}
