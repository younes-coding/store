import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import dns from 'dns';
import { fileURLToPath } from 'url';
import { Admin } from '../models/Admin.js';
import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';
import { Setting } from '../models/Setting.js';
import { Order } from '../models/Order.js';

// Ensure Google / Cloudflare public DNS for resolving Atlas SRV records
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // ignore
}

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbJsonPath = path.join(__dirname, '../data/database.json');

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('[Seed Error] MONGODB_URI is not defined in backend/.env. Please add your MongoDB Atlas connection string first.');
      process.exit(1);
    }

    console.log('[Seed] Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected successfully to MongoDB!');

    // Read current data from database.json
    let currentData = { products: [], categories: [], orders: [], admins: [], settings: {} };
    if (fs.existsSync(dbJsonPath)) {
      currentData = JSON.parse(fs.readFileSync(dbJsonPath, 'utf8'));
    }

    // Clear existing collections
    await Admin.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Setting.deleteMany({});
    await Order.deleteMany({});

    // 1. Seed Admins
    if (currentData.admins && currentData.admins.length > 0) {
      await Admin.insertMany(currentData.admins);
      console.log(`[Seed] Seeded ${currentData.admins.length} Admin User(s).`);
    } else {
      await Admin.create({
        name: 'يونس سارتوريال',
        email: 'admin@younessartorial.dz',
        password: 'admin123456',
        role: 'admin'
      });
      console.log(`[Seed] Created Default Admin User: admin@younessartorial.dz (Password: admin123456)`);
    }

    // 2. Seed Categories
    if (currentData.categories && currentData.categories.length > 0) {
      const categoriesToSeed = currentData.categories.map(c => ({
        slug: c.id || c.slug,
        label: c.label,
        description: c.description || '',
        image: c.image || '',
        count: c.count || 0
      }));
      await Category.insertMany(categoriesToSeed);
      console.log(`[Seed] Seeded ${categoriesToSeed.length} Categories: ${categoriesToSeed.map(c => c.label).join(', ')}`);
    }

    // 3. Seed Products
    if (currentData.products && currentData.products.length > 0) {
      const productsToSeed = currentData.products.map(p => ({
        name: p.name,
        subtitle: p.subtitle || '',
        price: p.price,
        originalPrice: p.originalPrice || null,
        category: p.category,
        categoryLabel: p.categoryLabel,
        rating: p.rating || 5.0,
        reviewCount: p.reviewCount || 1,
        images: p.images || [],
        colors: p.colors || [],
        sizes: p.sizes || [],
        description: p.description || '',
        fabricCare: p.fabricCare || '',
        details: p.details || [],
        isNewItem: p.isNewItem ?? p.isNew ?? false,
        isBestSeller: p.isBestSeller ?? false,
        isSale: p.isSale ?? false,
        stockCount: p.stockCount || 15
      }));
      await Product.insertMany(productsToSeed);
      console.log(`[Seed] Seeded ${productsToSeed.length} Algerian Old Money Products successfully.`);
    }

    // 4. Seed Settings
    if (currentData.settings) {
      await Setting.create(currentData.settings);
      console.log(`[Seed] Seeded Store Settings & Homepage custom banners.`);
    }

    // 5. Seed Orders (if any)
    if (currentData.orders && currentData.orders.length > 0) {
      const ordersToSeed = currentData.orders.map((o, idx) => ({
        orderId: o.orderId || o.id || `ORD-${String(idx + 1).padStart(3, '0')}`,
        customer: {
          fullName: o.customer?.fullName || o.customer?.name || 'زبون مميز',
          email: o.customer?.email || 'client@younes.dz',
          phone: o.customer?.phone || '+213 550 00 00 00',
          address: o.customer?.address || 'حي المنار',
          city: o.customer?.city || o.customer?.wilaya || 'تلمسان',
          postalCode: o.customer?.postalCode || '13000',
          country: o.customer?.country || 'الجزائر',
          notes: o.customer?.notes || ''
        },
        items: (o.items || []).map(item => ({
          name: item.name || 'منتج كلاسيكي',
          price: item.price || 0,
          selectedColor: typeof item.selectedColor === 'object' ? item.selectedColor : { name: String(item.selectedColor || ''), hex: '#000000' },
          selectedSize: item.selectedSize || 'M',
          quantity: item.quantity || 1
        })),
        subtotal: o.subtotal || o.totalAmount || 0,
        discount: o.discount || 0,
        shippingCost: o.shippingCost || 600,
        totalAmount: o.totalAmount || o.subtotal || 0,
        status: o.status || 'Pending'
      }));
      await Order.insertMany(ordersToSeed);
      console.log(`[Seed] Seeded ${ordersToSeed.length} Order(s).`);
    }

    console.log('\n✨ [Seed Success] Real database populated with all tables and data successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Failed to seed database:', error.message);
    process.exit(1);
  }
};

seedData();
