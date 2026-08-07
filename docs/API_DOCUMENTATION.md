# The Page Craft — Enterprise REST API Documentation

This document describes the core backend REST APIs for **The Page Craft Internal Operations Engine**.

---

## 1. Authentication (`/api/auth`)

### `POST /api/auth/login`
Authenticates a team member or Super Admin. Sets HTTP-only secure JWT cookie.

- **Request Body**:
  ```json
  {
    "email": "admin@thepagecraft.com",
    "password": "AdminPass2026!"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "user": {
      "userId": "super-admin-001",
      "email": "admin@thepagecraft.com",
      "name": "Super Admin",
      "role": "SUPER_ADMIN"
    },
    "token": "eyJhbGciOi..."
  }
  ```

### `GET /api/auth/me`
Retrieves details of the currently authenticated user based on session cookie or Bearer header.

---

## 2. Team Management (`/api/team`) — *Super Admin Only*

### `GET /api/team`
Returns all team members and their active roles (`SUPER_ADMIN`, `ADMIN`, `MANAGER`, `EDITOR`, `FINANCE`, `SUPPORT`, `EMPLOYEE`).

### `POST /api/team`
Creates a new team member with specified role and password.
- **Header**: Authorization Bearer or Cookie (Requires `SUPER_ADMIN` role)
- **Request Body**:
  ```json
  {
    "name": "Priya Sharma",
    "email": "priya@thepagecraft.com",
    "password": "SecurePassword123!",
    "role": "EDITOR",
    "phone": "+91 9876543210"
  }
  ```

---

## 3. Books & Manuscripts (`/api/books`)

### `GET /api/books`
Fetches all live author books and manuscripts from database.

### `POST /api/books`
Creates and publishes a new book. Automatically triggers Google Drive hierarchical folder structure generation.
- **Request Body**:
  ```json
  {
    "title": "The Silent Echo",
    "authorName": "Eleanor Vance",
    "price": 399,
    "category": "Fiction",
    "format": "Paperback"
  }
  ```

---

## 4. Google Drive Hierarchy Integration (`/api/gdrive`)

### `POST /api/gdrive`
Generates the standard Google Drive folder hierarchy for a book project:
```
The Page Craft / Books / [Book Title] / 
  ├── Cover Designs
  ├── Interior PDFs
  ├── Author Photos
  ├── Marketing
  ├── Certificates
  ├── Invoices
  ├── Contracts
  ├── Final Print Files
  ├── PNG & JPEG Assets
  ├── Social Media & Videos
  └── Exports
```

---

## 5. System Logs, Analytics & Backups

### `GET /api/activity-logs?q={query}`
Searches system security audit logs (captures User, Role, IP Address, Action, Date/Time).

### `GET /api/analytics?format=csv`
Returns live revenue, books in review, and sales figures. Setting `format=csv` streams a downloadable CSV report.

### `POST /api/backup`
Triggers an instant manual database and file metadata backup.
