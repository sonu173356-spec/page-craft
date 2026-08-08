import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ALL_AUTHORS, getAuthorBySlug } from '@/lib/authorsData';
import AuthorProfileClient from './AuthorProfileClient';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return ALL_AUTHORS.map((author) => ({
    slug: author.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    return {
      title: 'Author Not Found | Page Craft',
      description: 'The requested author profile could not be found.',
    };
  }

  const title = `${author.name} — ${author.title || 'Published Author'} | Page Craft`;
  const description =
    author.shortBio ||
    `Discover ${author.name}, ${author.title || 'published author'} with Page Craft. Read full biography, browse ${author.bookCount || author.booksPublished} published books, and view literary works.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      url: `https://www.thepagecraft.com/authors/${author.slug}`,
      siteName: 'Page Craft Publishing',
    },
    alternates: {
      canonical: `https://www.thepagecraft.com/authors/${author.slug}`,
    },
  };
}

export default async function AuthorProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  return <AuthorProfileClient author={author} slug={slug} />;
}
