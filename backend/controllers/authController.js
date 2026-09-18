import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin.js';
import { dbStore } from '../config/databaseStore.js';

const JWT_SECRET = process.env.JWT_SECRET || 'lumiere_secret_jwt_key_2026_super_secure';

const generateToken = (id, email) => {
  return jwt.sign(
    { id: String(id), email: String(email).toLowerCase(), role: 'admin' },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// @desc    Admin Login
// @route   POST /api/admin/login
// @access  Public (Rate-limited)
export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ success: false, message: 'يرجى إدخال البريد الإلكتروني وكلمة السر بشكل صحيح' });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Check MongoDB Admin Collection
    if (Admin.db && Admin.db.readyState === 1) {
      const admin = await Admin.findOne({ email: cleanEmail });
      if (admin) {
        const isMatch = await admin.matchPassword(password);
        if (isMatch) {
          const token = generateToken(admin._id, admin.email);
          return res.json({
            success: true,
            token,
            admin: {
              id: admin._id,
              name: admin.name,
              email: admin.email
            }
          });
        }
      }
    }

    // 2. Check JSON Database Store (Fallback)
    const storeAdmin = dbStore.getAdminByEmail(cleanEmail);
    if (storeAdmin) {
      let isStoreMatch = false;
      if (storeAdmin.password.startsWith('$2a$') || storeAdmin.password.startsWith('$2b$')) {
        isStoreMatch = await bcrypt.compare(password, storeAdmin.password);
      } else {
        isStoreMatch = (storeAdmin.password === password);
      }

      if (isStoreMatch) {
        const token = generateToken(storeAdmin.id || storeAdmin._id, storeAdmin.email);
        return res.json({
          success: true,
          token,
          admin: {
            id: storeAdmin.id || storeAdmin._id,
            name: storeAdmin.name,
            email: storeAdmin.email
          }
        });
      }
    }

    return res.status(401).json({ success: false, message: 'البريد الإلكتروني أو كلمة السر غير صحيحة' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Current Admin User
// @route   GET /api/admin/me
// @access  Protected Admin
export const getAdminProfile = async (req, res, next) => {
  try {
    res.json({
      success: true,
      admin: req.admin
    });
  } catch (error) {
    next(error);
  }
};

