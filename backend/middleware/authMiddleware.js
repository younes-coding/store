import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
import { dbStore } from '../config/databaseStore.js';

const JWT_SECRET = process.env.JWT_SECRET || 'lumiere_secret_jwt_key_2026_super_secure';

export const protectAdmin = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      let foundAdmin = null;

      // 1. Try MongoDB by ObjectId or by email
      if (Admin.db && Admin.db.readyState === 1) {
        try {
          if (decoded.id && decoded.id.match(/^[0-9a-fA-F]{24}$/)) {
            foundAdmin = await Admin.findById(decoded.id).select('-password');
          }
        } catch (e) {}

        if (!foundAdmin && decoded.email) {
          try {
            foundAdmin = await Admin.findOne({ email: decoded.email.toLowerCase() }).select('-password');
          } catch (e) {}
        }
      }

      // 2. Fallback to store
      if (!foundAdmin && decoded.email) {
        const storeAdmin = dbStore.getAdminByEmail(decoded.email);
        if (storeAdmin) {
          foundAdmin = {
            id: storeAdmin.id || decoded.id,
            _id: storeAdmin.id || decoded.id,
            name: storeAdmin.name,
            email: storeAdmin.email,
            role: 'admin'
          };
        }
      }

      // 3. Fallback to valid decoded token
      if (!foundAdmin && decoded.role === 'admin') {
        foundAdmin = {
          id: decoded.id,
          _id: decoded.id,
          name: 'يونس الإداري',
          email: decoded.email,
          role: 'admin'
        };
      }

      if (!foundAdmin) {
        return res.status(401).json({ success: false, message: 'غير مصرح: حساب المشرف غير متوفر' });
      }

      req.admin = {
        id: foundAdmin._id || foundAdmin.id,
        name: foundAdmin.name,
        email: foundAdmin.email,
        role: foundAdmin.role || 'admin'
      };

      return next();
    } catch (error) {
      console.error('[Auth Middleware Error]:', error.message);
      return res.status(401).json({ success: false, message: 'جلسة تسجيل الدخول غير صالحة أو منتهية، يرجى تسجيل الدخول مجدداً' });
    }
  }

  return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
};
