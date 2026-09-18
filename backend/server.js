import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import settingRoutes from './routes/settingRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { globalLimiter } from './middleware/rateLimiters.js';
import { sanitizeInput } from './middleware/sanitize.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to Database
connectDB();

const app = express();

// 1. Security Headers (Helmet)
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false // Allow images and fonts from local/external CDNs
}));

// 2. Global Rate Limiter
app.use('/api', globalLimiter);

// 3. CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  process.env.CLIENT_URL,
  process.env.ADMIN_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
  credentials: true
}));

// 4. Request Body Parsing & Payload limits
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// 5. Input & NoSQL Sanitization
app.use(sanitizeInput);

// Serve static product images
app.use('/products', express.static(path.join(__dirname, 'public/products')));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    security: 'hardened',
    database: 'MongoDB Atlas Connected',
    store: 'Younes Sartorial API — Old Money Luxury',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/admin', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/settings', settingRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[Younes Shop API] Running on port ${PORT} (${process.env.NODE_ENV || 'development'} mode)`);
  console.log(`[Younes Shop Health Check] http://localhost:${PORT}/api/health`);
});

