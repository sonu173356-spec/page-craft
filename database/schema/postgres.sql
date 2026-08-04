-- ============================================================
-- Page Craft — PostgreSQL Database Schema
-- This schema can be used when migrating from mock data
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---- Users ----
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'customer' CHECK (role IN ('admin', 'author', 'customer')),
  avatar VARCHAR(500),
  phone VARCHAR(20),
  is_verified BOOLEAN DEFAULT FALSE,
  refresh_token TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ---- Authors ----
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  bio TEXT,
  short_bio VARCHAR(500),
  avatar VARCHAR(500),
  website VARCHAR(500),
  social_twitter VARCHAR(255),
  social_instagram VARCHAR(255),
  social_linkedin VARCHAR(255),
  books_published INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  genres TEXT[], -- PostgreSQL array type
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ---- Books ----
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
  description TEXT,
  short_description VARCHAR(500),
  cover_image VARCHAR(500),
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  isbn VARCHAR(13),
  pages INTEGER,
  language VARCHAR(50) DEFAULT 'English',
  category VARCHAR(100),
  genre TEXT[],
  format TEXT[] DEFAULT '{"paperback"}',
  publish_date DATE,
  rating DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_bestseller BOOLEAN DEFAULT FALSE,
  is_new_release BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  stock INTEGER DEFAULT 100,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ---- Orders ----
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  payment_method VARCHAR(50),
  shipping_name VARCHAR(255),
  shipping_line1 VARCHAR(500),
  shipping_line2 VARCHAR(500),
  shipping_city VARCHAR(100),
  shipping_state VARCHAR(100),
  shipping_zip VARCHAR(20),
  shipping_country VARCHAR(100),
  shipping_phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ---- Order Items ----
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  book_id UUID REFERENCES books(id) ON DELETE SET NULL,
  title VARCHAR(255),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  format VARCHAR(20)
);

-- ---- Reviews ----
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title VARCHAR(255),
  content TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ---- Blog Posts ----
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image VARCHAR(500),
  category VARCHAR(100),
  tags TEXT[],
  author_name VARCHAR(255),
  author_avatar VARCHAR(500),
  read_time INTEGER DEFAULT 5,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  publish_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ---- Newsletter Subscribers ----
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- ---- Contact Messages ----
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(500),
  query_type VARCHAR(100),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ---- Coupons ----
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) UNIQUE NOT NULL,
  discount DECIMAL(5, 2) NOT NULL,
  type VARCHAR(20) DEFAULT 'percentage' CHECK (type IN ('percentage', 'fixed')),
  max_uses INTEGER,
  used_count INTEGER DEFAULT 0,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ---- Indexes ----
CREATE INDEX idx_books_category ON books(category);
CREATE INDEX idx_books_author ON books(author_id);
CREATE INDEX idx_books_slug ON books(slug);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_reviews_book ON reviews(book_id);
CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_blog_category ON blog_posts(category);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
