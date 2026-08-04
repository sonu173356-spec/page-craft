# Page Craft — API Documentation

## Base URL
```
Development: http://localhost:5000/api/v1
Production:  https://api.thepagecraft.com/api/v1
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <access_token>
```

### Roles
- `admin` — Full access to all endpoints
- `author` — Access to own books, sales, royalty, analytics
- `customer` — Access to orders, reviews, wishlist

---

## Endpoints

### Auth

#### POST `/auth/login`
Login and receive JWT tokens.

**Body:**
```json
{
  "email": "test@pagecraft.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_001",
      "name": "John Doe",
      "email": "test@pagecraft.com",
      "role": "author"
    },
    "accessToken": "eyJ...",
    "refreshToken": "eyJ..."
  }
}
```

#### POST `/auth/register`
Register a new user.

**Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "securePass123",
  "role": "customer"
}
```

#### POST `/auth/refresh`
Refresh access token.

**Body:**
```json
{
  "refreshToken": "eyJ..."
}
```

---

### Books

#### GET `/books`
List all books with optional filters.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| search | string | Search by title or author |
| category | string | Filter by category |
| genre | string | Filter by genre |
| minPrice | number | Minimum price |
| maxPrice | number | Maximum price |
| sort | string | Sort: newest, price_asc, price_desc, rating, popular |
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 12) |

**Response:**
```json
{
  "success": true,
  "data": [...books],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 24,
    "totalPages": 2
  }
}
```

#### GET `/books/:id`
Get book by ID.

#### POST `/books` 🔒 Admin/Author
Create a new book.

#### PUT `/books/:id` 🔒 Admin/Author
Update a book.

#### DELETE `/books/:id` 🔒 Admin
Delete a book.

---

### Authors

#### GET `/authors`
List all authors.

#### GET `/authors/:id`
Get author by ID with their books.

---

### Orders

#### GET `/orders` 🔒
List user's orders (admin sees all).

#### POST `/orders` 🔒
Create a new order.

**Body:**
```json
{
  "items": [
    { "bookId": "book_001", "quantity": 2, "format": "paperback" }
  ],
  "shippingAddress": {
    "name": "John Doe",
    "line1": "123 Main St",
    "city": "New Delhi",
    "state": "Delhi",
    "zip": "110001",
    "country": "India",
    "phone": "+919876543210"
  },
  "paymentMethod": "upi"
}
```

---

### Blogs

#### GET `/blogs`
List blog posts. Query: `category`, `page`, `limit`.

#### GET `/blogs/:slug`
Get blog post by slug.

#### POST `/blogs` 🔒 Admin
Create blog post.

---

### Reviews

#### GET `/reviews`
List all reviews/testimonials.

#### POST `/reviews` 🔒
Submit a review.

---

### Dashboard

#### GET `/dashboard/admin` 🔒 Admin
Admin dashboard statistics.

#### GET `/dashboard/author` 🔒 Author
Author dashboard statistics.

---

### Other

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/contact` | — | Submit contact form |
| POST | `/newsletter` | — | Subscribe to newsletter |
| GET | `/plans` | — | Publishing plans |
| GET | `/faqs` | — | FAQs |
| GET | `/careers` | — | Job listings |
| GET | `/services` | — | Publishing services |
| GET | `/coupons` | Admin | List coupons |
| POST | `/coupons` | Admin | Create coupon |

---

## Error Responses

```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

## Rate Limiting
- Public endpoints: 100 requests per 15 minutes
- Auth endpoints: 20 requests per 15 minutes
- Protected endpoints: 200 requests per 15 minutes
