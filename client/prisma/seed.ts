import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Page Craft Enterprise Database...');

  // 1. Seed Default Super Admin Account
  const adminEmail = 'admin@thepagecraft.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('AdminPass2026!', 10);
    const superAdmin = await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: adminEmail,
        passwordHash,
        role: 'SUPER_ADMIN',
        status: 'ACTIVE',
        isVerified: true,
        phone: '+91 9876543210',
      },
    });
    console.log('✅ Created Default Super Admin:', superAdmin.email);
  }

  // 2. Seed Default Authors
  const authorEleanor = await prisma.author.upsert({
    where: { slug: 'eleanor-vance' },
    update: {},
    create: {
      name: 'Eleanor Vance',
      slug: 'eleanor-vance',
      bio: 'Bestselling suspense and mystery author.',
      booksPublished: 3,
      isFeatured: true,
    },
  });

  const authorMarcus = await prisma.author.upsert({
    where: { slug: 'marcus-sterling' },
    update: {},
    create: {
      name: 'Marcus Sterling',
      slug: 'marcus-sterling',
      bio: 'Tech founder, investor, and business author.',
      booksPublished: 5,
      isFeatured: true,
    },
  });

  // 3. Seed Default Books
  await prisma.book.upsert({
    where: { isbn: '978-93-89021-12-4' },
    update: {},
    create: {
      title: 'The Silent Echo',
      subtitle: 'A Psychological Suspense Thriller',
      authorId: authorEleanor.id,
      authorName: authorEleanor.name,
      category: 'Fiction',
      format: 'Paperback',
      price: 399,
      isbn: '978-93-89021-12-4',
      status: 'Published',
      coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
      description: 'A gripping psychological thriller.',
    },
  });

  await prisma.book.upsert({
    where: { isbn: '978-93-89021-99-5' },
    update: {},
    create: {
      title: 'Startup Unlocked',
      subtitle: 'From 0 to $1M ARR in 12 Months',
      authorId: authorMarcus.id,
      authorName: authorMarcus.name,
      category: 'Business',
      format: 'eBook',
      price: 499,
      isbn: '978-93-89021-99-5',
      status: 'Published',
      coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop',
      description: 'Zero-fluff playbook for founders.',
    },
  });

  // 4. Seed Default Packages
  const packages = [
    { name: 'Starter', price: '₹9,999', amount: 9999, tagline: 'Perfect for first-time authors.', features: JSON.stringify(['Cover design', 'ISBN allocation', '100% royalty']) },
    { name: 'Professional', price: '₹24,999', amount: 24999, tagline: 'Comprehensive publishing support.', popular: true, features: JSON.stringify(['Cover design', 'ISBN allocation', 'Editing', '100% royalty', 'Author copies']) },
    { name: 'Premium', price: '₹49,999', amount: 49999, tagline: 'Ultimate publishing experience.', features: JSON.stringify(['Custom cover', 'ISBN allocation', 'Advanced editing', '100% royalty', 'Amazon Ads']) },
  ];

  for (const pkg of packages) {
    const existing = await prisma.publishingPackage.findFirst({ where: { name: pkg.name } });
    if (!existing) {
      await prisma.publishingPackage.create({ data: pkg });
    }
  }

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
