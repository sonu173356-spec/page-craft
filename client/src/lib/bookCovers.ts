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
  {
    id: 'book-si-10',
    title: 'Chronicles of the Sunken Isles',
    subtitle: 'Book One: Rise of the Dragon Kings',
    author: 'Elara Vance',
    authorSlug: 'eleanor-vance',
    authorId: 'author-1',
    genre: 'Epic Fantasy / Adventure',
    category: 'Fantasy',
    price: '₹499',
    numericPrice: 499,
    originalPrice: '₹649',
    rating: 4.9,
    reviewCount: 220,
    description:
      'A mythical sunken island kingdom rises from the roaring ocean tides, guarded by ancient dragons and lost celestial magic.',
    isbn: '978-93-84729-19-7',
    pages: 480,
    format: 'Hardcover • Collector Edition',
    featured: true,
    status: 'published',
    created_at: '2026-08-09T12:00:00.000Z',
    cover_image_url: '/books/sunken-isles.jpg',
    coverStyle: {
      bgGradient: 'from-[#0B1E36] via-[#1E3A5F] to-[#D97706]',
      accentColor: '#FBBF24',
      textColor: '#FFFFFF',
      fontFamily: 'Playfair Display, serif',
      textureImage: '/books/sunken-isles.jpg',
      moodBadge: 'Epic High Fantasy',
    },
  },
  {
    id: 'book-uf-11',
    title: 'The Secret Life of Urban Flora',
    subtitle: 'Unveiling the Wild Nature Within Our Cities',
    author: 'Eliza J. Reed',
    authorSlug: 'eliza-reed',
    authorId: 'author-9',
    genre: 'Nature / Botany / Non-Fiction',
    category: 'Non-Fiction',
    price: '₹429',
    numericPrice: 429,
    originalPrice: '₹549',
    rating: 4.8,
    reviewCount: 135,
    description:
      'An inspiring, beautifully illustrated exploration of the resilient wild ferns, mosses, and flora thriving in the heart of modern stone cities.',
    isbn: '978-93-84729-20-3',
    pages: 272,
    format: 'Clothbound Hardcover',
    featured: true,
    status: 'published',
    created_at: '2026-08-10T14:30:00.000Z',
    cover_image_url: '/books/urban-flora.jpg',
    coverStyle: {
      bgGradient: 'from-[#143621] via-[#1E4D2B] to-[#2D6A4F]',
      accentColor: '#D4AF37',
      textColor: '#F3F4F6',
      fontFamily: 'Playfair Display, serif',
      textureImage: '/books/urban-flora.jpg',
      moodBadge: 'Botanical Discovery',
    },
  },
  {
    id: 'book-wc-12',
    title: 'Summer at Willow Creek',
    subtitle: 'A Heartwarming Tale of Love, Healing, and Summer Sun',
    author: 'Clara Hughes',
    authorSlug: 'clara-hughes',
    authorId: 'author-10',
    genre: 'Romance / Contemporary Fiction',
    category: 'Romance',
    price: '₹349',
    numericPrice: 349,
    originalPrice: '₹449',
    rating: 4.9,
    reviewCount: 198,
    description:
      'Returning to her family cottage by Willow Creek, an artist finds unexpected solace and rekindled passion with a childhood neighbor.',
    isbn: '978-93-84729-21-0',
    pages: 310,
    format: 'Paperback • eBook',
    featured: true,
    status: 'published',
    created_at: '2026-08-11T16:00:00.000Z',
    cover_image_url: '/books/willow-creek.jpg',
    coverStyle: {
      bgGradient: 'from-[#854D0E] via-[#CA8A04] to-[#FEF08A]',
      accentColor: '#FEF9C3',
      textColor: '#FFFFFF',
      fontFamily: 'Playfair Display, serif',
      textureImage: '/books/willow-creek.jpg',
      moodBadge: 'Heartfelt Romance',
    },
  },
  {
    id: 'book-lp-13',
    title: 'The Little Paws Adventure',
    subtitle: 'A Whimsical Tale of Friendship in the Enchanted Woods',
    author: 'Mia Sterling',
    authorSlug: 'marcus-sterling',
    authorId: 'author-2',
    genre: "Children's / Picture Book",
    category: "Children's",
    price: '₹299',
    numericPrice: 299,
    originalPrice: '₹399',
    rating: 5.0,
    reviewCount: 142,
    description:
      'Join an adventurous golden puppy and a fluffy kitten on a joyful quest across the fairy forest to find the Rainbow Butterfly.',
    isbn: '978-93-84729-22-7',
    pages: 48,
    format: 'Full Color Hardcover',
    featured: true,
    status: 'published',
    created_at: '2026-08-12T10:00:00.000Z',
    cover_image_url: '/books/little-paws.jpg',
    coverStyle: {
      bgGradient: 'from-[#1E3A8A] via-[#0284C7] to-[#38BDF8]',
      accentColor: '#FEF08A',
      textColor: '#FFFFFF',
      fontFamily: 'Inter, sans-serif',
      textureImage: '/books/little-paws.jpg',
      moodBadge: "Children's Adventure",
    },
  },
];

// ============================================================
// Cover Image Resolver Utility
// ============================================================
// 1. Author's uploaded front cover PNG / local asset always takes first priority.
// 2. Fallback to genre-specific designed cover artwork.
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
  const author = book?.author || book?.authorName || book?.penName || (typeof book?.author === 'object' ? book?.author?.name : 'Page Craft Author');
  const altText = `${title} — Book cover by ${author}`;

  // If local /books/ or valid custom upload is present and not a generic placeholder
  if (uploadedUrl && typeof uploadedUrl === 'string' && uploadedUrl.trim() !== '' && !uploadedUrl.includes('photo-1544947950-fa07a98d237f')) {
    return {
      url: uploadedUrl,
      hasCustomUpload: true,
      altText,
    };
  }

  // Fallback 1: Match by ID, Title, or partial Title
  const titleLower = title.toLowerCase().trim();
  const matched = SAMPLE_PUBLISHED_BOOKS.find(
    (b) =>
      b.id === book?.id ||
      b.title.toLowerCase().trim() === titleLower ||
      titleLower.includes(b.title.toLowerCase().trim()) ||
      b.title.toLowerCase().trim().includes(titleLower)
  );

  if (matched?.cover_image_url) {
    return {
      url: matched.cover_image_url,
      hasCustomUpload: false,
      altText,
    };
  }

  // Fallback 2: Match by Category / Genre to a bespoke cover
  const cat = String(book?.category || book?.genre || '').toLowerCase();
  if (cat.includes('scifi') || cat.includes('sci-fi') || cat.includes('space')) {
    return { url: '/books/echoes-eternity.jpg', hasCustomUpload: false, altText };
  }
  if (cat.includes('myster') || cat.includes('thrill') || cat.includes('noir')) {
    return { url: '/books/silent-echo.jpg', hasCustomUpload: false, altText };
  }
  if (cat.includes('fantasy') || cat.includes('magic') || cat.includes('myth')) {
    return { url: '/books/sunken-isles.jpg', hasCustomUpload: false, altText };
  }
  if (cat.includes('adventur') || cat.includes('expedition')) {
    return { url: '/books/beyond-horizon.jpg', hasCustomUpload: false, altText };
  }
  if (cat.includes('historic') || cat.includes('chronicle') || cat.includes('empire')) {
    return { url: '/books/whispers-time.jpg', hasCustomUpload: false, altText };
  }
  if (cat.includes('cook') || cat.includes('food') || cat.includes('culinary')) {
    return { url: '/books/vegan-kitchen.jpg', hasCustomUpload: false, altText };
  }
  if (cat.includes('business') || cat.includes('startup') || cat.includes('strateg') || cat.includes('econom')) {
    return { url: '/books/startup-playbook.jpg', hasCustomUpload: false, altText };
  }
  if (cat.includes('poet') || cat.includes('verse')) {
    return { url: '/books/poetic-soul.jpg', hasCustomUpload: false, altText };
  }
  if (cat.includes('romance') || cat.includes('love')) {
    return { url: '/books/willow-creek.jpg', hasCustomUpload: false, altText };
  }
  if (cat.includes('child') || cat.includes('kid') || cat.includes('picture')) {
    return { url: '/books/little-paws.jpg', hasCustomUpload: false, altText };
  }
  if (cat.includes('nature') || cat.includes('flora') || cat.includes('botan') || cat.includes('non-fiction')) {
    return { url: '/books/urban-flora.jpg', hasCustomUpload: false, altText };
  }

  // Default universal fallback
  return {
    url: '/books/silent-echo.jpg',
    hasCustomUpload: false,
    altText,
  };
}
