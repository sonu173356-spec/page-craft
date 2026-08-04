# Page Craft — Database Integration Guide

This guide explains how to connect a real database to the Page Craft backend, replacing the mock JSON data.

## Architecture

The backend uses the **Repository Pattern**, which separates data access logic from business logic:

```
Controller → Service → Repository (Interface) → Data Source
```

Currently, repositories use **mock JSON data**. To switch to a real database, you only need to create new repository implementations.

---

## Option 1: PostgreSQL

### 1. Install Dependencies
```bash
cd server
npm install pg @types/pg
# OR use an ORM
npm install prisma @prisma/client
```

### 2. Create Connection
```typescript
// server/src/config/database.ts
import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
```

### 3. Implement Repository
```typescript
// server/src/repositories/PostgresBookRepository.ts
import { IBookRepository } from '../interfaces/IRepository';
import { IBook } from '../interfaces/IBook';
import { pool } from '../config/database';

export class PostgresBookRepository implements IBookRepository {
  async findAll(filters?: any): Promise<IBook[]> {
    const { rows } = await pool.query('SELECT * FROM books WHERE ...');
    return rows;
  }

  async findById(id: string): Promise<IBook | null> {
    const { rows } = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return rows[0] || null;
  }

  // ... implement other methods
}
```

### 4. Update Service
```typescript
// server/src/services/BookService.ts
// Change: const repo = new MockBookRepository();
// To:     const repo = new PostgresBookRepository();
```

### 5. Schema
```sql
-- database/schema/postgres.sql
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  author_id UUID REFERENCES authors(id),
  description TEXT,
  cover_image VARCHAR(500),
  price DECIMAL(10,2) NOT NULL,
  isbn VARCHAR(13),
  pages INTEGER,
  category VARCHAR(100),
  rating DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## Option 2: MongoDB

### 1. Install Dependencies
```bash
npm install mongoose
```

### 2. Create Connection
```typescript
// server/src/config/database.ts
import mongoose from 'mongoose';

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI!);
};
```

### 3. Create Model
```typescript
// server/src/models/Book.ts
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  // ... other fields
}, { timestamps: true });

export const Book = mongoose.model('Book', bookSchema);
```

### 4. Implement Repository
```typescript
// server/src/repositories/MongoBookRepository.ts
import { Book } from '../models/Book';

export class MongoBookRepository implements IBookRepository {
  async findAll(filters?: any) {
    return Book.find(filters).lean();
  }
  // ...
}
```

---

## Option 3: MySQL

Similar to PostgreSQL but using `mysql2` package:
```bash
npm install mysql2
```

---

## Key Principle

**No frontend code changes are needed.** The API endpoints, request/response formats, and service layer remain identical. Only the repository layer changes.

## Environment Variables

Add to your `.env`:
```
# PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/pagecraft

# MongoDB
MONGODB_URI=mongodb://localhost:27017/pagecraft

# MySQL
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=pagecraft
```
