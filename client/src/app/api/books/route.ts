import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { recordActivityLog } from '@/lib/logger';
import { createGoogleDriveBookHierarchy } from '@/lib/googleDrive';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    let books: any[] = [];
    if (prisma && (prisma as any).book) {
      books = await (prisma as any).book.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }

    return NextResponse.json({ books });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error fetching books' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = getAuthUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, subtitle, authorName, category, format, price, isbn, coverImage, description } = body;

    if (!title || !authorName || !price) {
      return NextResponse.json({ error: 'Title, authorName, and price are required' }, { status: 400 });
    }

    // 1. Generate Google Drive Hierarchical Folders
    const driveFolder = await createGoogleDriveBookHierarchy(title);

    // 2. Generate ISBN if not provided
    const assignedIsbn = isbn || `978-93-${Math.floor(100000 + Math.random() * 900000)}`;

    // 3. Save Book to Database
    let newBook = null;
    try {
      if (prisma && prisma.book) {
        newBook = await prisma.book.create({
          data: {
            title,
            subtitle: subtitle || '',
            authorName,
            category: category || 'Fiction',
            format: format || 'Paperback',
            price: Number(price) || 399,
            isbn: assignedIsbn,
            status: 'Published',
            coverImage: coverImage || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
            description: description || '',
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
      details: `Created and published author book "${title}" by ${authorName}. Drive link: ${driveFolder.folderUrl}`,
    });

    return NextResponse.json({
      success: true,
      book: newBook || {
        id: `pc-${Date.now()}`,
        title,
        subtitle,
        authorName,
        category,
        format,
        price,
        isbn: assignedIsbn,
        status: 'Published',
        driveFolderUrl: driveFolder.folderUrl,
      },
      driveFolder,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error creating book' }, { status: 500 });
  }
}
