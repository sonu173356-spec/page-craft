import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest, isAuthorOrAdmin } from '@/lib/auth';
import { recordActivityLog } from '@/lib/logger';
import { createGoogleDriveBookHierarchy } from '@/lib/googleDrive';
import { validateCsrfOrigin } from '@/lib/csrf';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    let books: any[] = [];
    if (prisma && (prisma as any).book) {
      books = await (prisma as any).book.findMany({
        where: { status: 'Published' },
        orderBy: { createdAt: 'desc' },
        take: 100,
      });
    }

    return NextResponse.json({ books });
  } catch (err: any) {
    return NextResponse.json({ error: 'Error fetching books' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!validateCsrfOrigin(req)) {
    return NextResponse.json({ error: 'CSRF Origin Validation Failed' }, { status: 403 });
  }

  const user = getAuthUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isAuthorOrAdmin(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { title, subtitle, authorName, category, format, price, isbn, coverImage, description } = body;

    if (!title || !price) {
      return NextResponse.json({ error: 'Title and price are required' }, { status: 400 });
    }

    const sanitizedTitle = String(title).slice(0, 200).trim();
    const sanitizedAuthorName = user.name || (authorName ? String(authorName).slice(0, 100).trim() : 'Author');
    const numericPrice = Math.max(0, Number(price) || 399);

    // 1. Generate Google Drive Hierarchical Folders
    const driveFolder = await createGoogleDriveBookHierarchy(sanitizedTitle);

    // 2. Generate or sanitize ISBN
    const assignedIsbn = isbn ? String(isbn).slice(0, 30) : `978-93-${Math.floor(100000 + Math.random() * 900000)}`;

    // 3. Save Book to Database
    let newBook = null;
    try {
      if (prisma && prisma.book) {
        newBook = await prisma.book.create({
          data: {
            title: sanitizedTitle,
            subtitle: subtitle ? String(subtitle).slice(0, 200) : '',
            authorName: sanitizedAuthorName,
            category: category ? String(category).slice(0, 50) : 'Fiction',
            format: format ? String(format).slice(0, 50) : 'Paperback',
            price: numericPrice,
            isbn: assignedIsbn,
            status: 'Published',
            coverImage: coverImage ? String(coverImage).slice(0, 500) : 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
            description: description ? String(description).slice(0, 2000) : '',
            driveFolderUrl: driveFolder.folderUrl,
          },
        });
      }
    } catch (err) {
      console.warn('DB create book error:', err);
    }

    // 4. Log Activity
    await recordActivityLog({
      userId: user.userId,
      userEmail: user.email,
      userRole: user.role,
      action: 'BOOK_CREATED_AND_PUBLISHED',
      details: `Created and published author book "${sanitizedTitle}" by ${sanitizedAuthorName}.`,
    });

    return NextResponse.json({
      success: true,
      book: newBook || {
        id: `pc-${Date.now()}`,
        title: sanitizedTitle,
        subtitle: subtitle || '',
        authorName: sanitizedAuthorName,
        category: category || 'Fiction',
        format: format || 'Paperback',
        price: numericPrice,
        isbn: assignedIsbn,
        status: 'Published',
        driveFolderUrl: driveFolder.folderUrl,
      },
      driveFolder,
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Error creating book' }, { status: 500 });
  }
}
