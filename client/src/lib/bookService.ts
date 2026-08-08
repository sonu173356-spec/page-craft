// ============================================================
// Page Craft — Dynamic Book Data Service
// ============================================================

import { PublishedBook, SAMPLE_PUBLISHED_BOOKS } from './bookCovers';

export const BOOKS_UPDATED_EVENT = 'pagecraft_books_updated';

// Helper to retrieve all published books with author-uploaded cover prioritization
export function getStoredPublishedBooks(): PublishedBook[] {
  if (typeof window === 'undefined') {
    return SAMPLE_PUBLISHED_BOOKS;
  }

  try {
    const customStr = localStorage.getItem('pagecraft_user_books');
    const publishedStr = localStorage.getItem('pagecraft_published_books');
    
    const localBooks: PublishedBook[] = [];

    if (publishedStr) {
      const parsed = JSON.parse(publishedStr);
      if (Array.isArray(parsed)) {
        localBooks.push(...parsed);
      }
    }

    if (customStr) {
      const parsed = JSON.parse(customStr);
      if (Array.isArray(parsed)) {
        parsed.forEach((item: any) => {
          const mapped: PublishedBook = {
            id: String(item.id || `custom-${Date.now()}`),
            title: item.title || 'Untitled Book',
            subtitle: item.subtitle || '',
            author: item.author || item.authorName || item.penName || 'Author',
            genre: item.category || item.genre || 'Fiction',
            category: item.category || 'Fiction',
            price: item.price ? (String(item.price).startsWith('₹') ? item.price : `₹${item.price}`) : '₹399',
            numericPrice: Number(String(item.price || '399').replace(/[^\d]/g, '')) || 399,
            rating: item.rating || 5.0,
            reviewCount: item.reviewCount || 1,
            description: item.description || 'A newly published book crafted with Page Craft publishing.',
            isbn: item.isbn || `978-93-84729-${Math.floor(10 + Math.random() * 89)}-0`,
            pages: item.pages || item.pageCount || 200,
            format: item.format || 'Paperback',
            featured: item.featured ?? true, // new author submissions are featured
            status: 'published',
            created_at: item.date || item.created_at || new Date().toISOString(),
            cover_image_url: item.cover_image_url || item.image || item.coverFrontImage || item.frontCoverImage || null,
            coverStyle: {
              bgGradient: 'from-[#1A1A2E] via-[#2E1A2E] to-[#8B1A1A]',
              accentColor: '#C5A55A',
              textColor: '#FDFAF6',
              fontFamily: 'Playfair Display, serif',
              textureImage: item.cover_image_url || item.image || '',
              moodBadge: item.category || 'New Release',
            },
          };
          // Avoid duplicate IDs
          if (!localBooks.some((b) => b.id === mapped.id || b.title === mapped.title)) {
            localBooks.push(mapped);
          }
        });
      }
    }

    // Merge custom books at the top of SAMPLE_PUBLISHED_BOOKS
    const existingTitles = new Set(localBooks.map((b) => b.title.toLowerCase().trim()));
    const finalCatalog = [
      ...localBooks,
      ...SAMPLE_PUBLISHED_BOOKS.filter((b) => !existingTitles.has(b.title.toLowerCase().trim())),
    ];

    return finalCatalog;
  } catch (err) {
    console.warn('Error reading stored published books:', err);
    return SAMPLE_PUBLISHED_BOOKS;
  }
}

// Function to save or publish a book project and notify listeners across the site
export function publishAuthorBook(bookData: Partial<PublishedBook> & { cover_image_url?: string }): PublishedBook {
  const newBook: PublishedBook = {
    id: bookData.id || `pc-book-${Date.now()}`,
    title: bookData.title || 'Untitled Masterpiece',
    subtitle: bookData.subtitle || '',
    author: bookData.author || 'Author',
    genre: bookData.genre || bookData.category || 'Literary Fiction',
    category: bookData.category || 'Fiction',
    price: bookData.price ? (String(bookData.price).startsWith('₹') ? bookData.price : `₹${bookData.price}`) : '₹399',
    numericPrice: Number(String(bookData.price || '399').replace(/[^\d]/g, '')) || 399,
    originalPrice: bookData.originalPrice || '₹499',
    rating: 5.0,
    reviewCount: 1,
    description: bookData.description || 'A compelling new release published via Page Craft.',
    isbn: bookData.isbn || `978-93-84729-${Math.floor(10 + Math.random() * 89)}-5`,
    pages: bookData.pages || 220,
    format: bookData.format || 'Paperback • eBook',
    featured: true,
    status: 'published',
    created_at: new Date().toISOString(),
    cover_image_url: bookData.cover_image_url || null,
    coverStyle: {
      bgGradient: 'from-[#0F172A] via-[#8B1A1A] to-[#1A1A2E]',
      accentColor: '#C5A55A',
      textColor: '#FDFAF6',
      fontFamily: 'Playfair Display, serif',
      textureImage: bookData.cover_image_url || '',
      moodBadge: bookData.category || 'Author Release',
    },
  };

  if (typeof window !== 'undefined') {
    try {
      const existing = getStoredPublishedBooks();
      const filtered = existing.filter((b) => b.id !== newBook.id && b.title !== newBook.title);
      const updated = [newBook, ...filtered];
      localStorage.setItem('pagecraft_published_books', JSON.stringify(updated));

      // Also sync to pagecraft_user_books for backward-compatibility with dashboard
      const userBooksStr = localStorage.getItem('pagecraft_user_books');
      const userBooks = userBooksStr ? JSON.parse(userBooksStr) : [];
      const userBookEntry = {
        id: newBook.id,
        title: newBook.title,
        status: 'Published',
        sales: 0,
        price: newBook.price,
        date: newBook.created_at.split('T')[0],
        category: newBook.category,
        image: newBook.cover_image_url || '',
        cover_image_url: newBook.cover_image_url || '',
      };
      localStorage.setItem('pagecraft_user_books', JSON.stringify([userBookEntry, ...userBooks.filter((b: any) => b.id !== newBook.id)]));

      // Dispatch global window event
      window.dispatchEvent(new CustomEvent(BOOKS_UPDATED_EVENT, { detail: newBook }));
    } catch (e) {
      console.warn('Error persisting published author book:', e);
    }
  }

  return newBook;
}
