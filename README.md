# YOUNES SARTORIAL — Luxury E-Commerce Storefront, REST API & Admin Portal

A full-stack, Old Money classic menswear luxury e-commerce platform built with **React**, **Tailwind CSS**, **Node.js/Express**, and **MongoDB**. The platform features an account-free customer storefront with live delivery fee calculations across 69 Algerian wilayas, Cash on Delivery, a RESTful Express API backend, and a real-time Live Sync Admin Dashboard for store management.

---

## 🏛️ System Architecture

```
haute-fashion-store/
├── backend/                  # Node.js + Express REST API
│   ├── config/               # Database connection & persistent storage
│   ├── controllers/          # Business logic for auth, products, orders, categories, settings
│   ├── models/               # Mongoose MongoDB schemas
│   ├── middleware/           # JWT auth guard, rate limiters & centralized error handler
│   ├── routes/               # API endpoint definitions
│   ├── scripts/              # Seed script for initial admin user & catalog
│   ├── .env.example          # Environment variable template
│   └── server.js             # Main server entry point
├── admin-dashboard/          # React + Tailwind Admin Portal (Port 5176)
│   ├── src/
│   │   ├── api/              # API Client with auto-attached JWT headers
│   │   ├── components/       # Sidebar, live order alerts, layout, modals, metric cards
│   │   ├── context/          # AuthContext & LiveOrdersContext for real-time live sync
│   │   └── pages/            # Login, Overview, Products, Orders, Categories, Settings
│   └── package.json
└── src/                      # Customer Storefront (Port 5175)
    ├── components/           # Product cards, Cart drawer, Quick view, Filters
    ├── context/              # CartContext, WishlistContext, ToastContext
    └── pages/                # Home, Shop, Product Detail, Express Checkout, Order Tracking
```

---

## 🔑 Admin Credentials

- **Admin Portal URL**: `http://localhost:5176`
- **Email**: `admin@younes.com`
- **Password**: `admin123456`

---

## 🚀 Quick Local Setup

### 1. Backend Server (`backend/`)
```bash
cd backend
npm install
npm run seed      # Populates default admin, categories, and initial products
npm start         # Runs Express server on http://localhost:5000
```

### 2. Admin Dashboard (`admin-dashboard/`)
```bash
cd admin-dashboard
npm install
npm run dev -- --port 5176   # Runs Admin Portal on http://localhost:5176
```

### 3. Customer Storefront
```bash
npm install
npm run dev                  # Runs Customer Storefront on http://localhost:5175
```

---

## 📡 API Endpoints Overview

### Admin Authentication (`/api/admin`)
- `POST /api/admin/login` — Login admin with email/password (returns JWT)
- `GET /api/admin/me` — Verify active token (Protected)

### Garment Catalog (`/api/products`)
- `GET /api/products` — Fetch garments (Filter by category, search, sale status)
- `GET /api/products/:id` — Get garment by ID
- `POST /api/products` — Create new garment (Protected)
- `PUT /api/products/:id` — Update garment details or stock count (Protected)
- `DELETE /api/products/:id` — Delete garment (Protected)

### Orders & Fulfillment (`/api/orders`)
- `POST /api/orders` — Submit customer order from checkout (Public)
- `GET /api/orders` — List customer orders with status filter (Protected)
- `GET /api/orders/:id` — Get full order receipt & address details (Protected)
- `PUT /api/orders/:id/status` — Update order status (`Pending` → `Processing` → `Shipped` → `Delivered` → `Cancelled`) (Protected)

### Categories & Settings (`/api/categories`, `/api/settings`)
- `GET /api/categories`, `POST /api/categories`, `PUT /api/categories/:id`, `DELETE /api/categories/:id`
- `GET /api/settings`, `PUT /api/settings`

---

## ☁️ Deployment Instructions

### Deploying Database on MongoDB Atlas (Free Tier)
1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free M0 cluster.
3. Under **Database Access**, create a user (e.g. `lumiere_user` / password).
4. Under **Network Access**, add `0.0.0.0/0` (allow access from anywhere).
5. Copy your connection string (`mongodb+srv://<username>:<password>@cluster.mongodb.net/lumiere-store?retryWrites=true&w=majority`).

### Deploying Backend on Render
1. Create a new Web Service on [Render](https://render.com/).
2. Select your repository and set Root Directory to `backend`.
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Add Environment Variables:
   - `MONGODB_URI`: `<Your MongoDB Atlas Connection String>`
   - `JWT_SECRET`: `<Generate a random secret string>`
   - `NODE_ENV`: `production`

### Deploying Admin Dashboard & Customer Storefront on Render / Vercel
1. For Admin Dashboard: Root directory `admin-dashboard`, Build command: `npm run build`, Publish directory: `dist`. Set `VITE_API_URL` to your live Render backend URL.
2. For Storefront: Build command: `npm run build`, Publish directory: `dist`.
