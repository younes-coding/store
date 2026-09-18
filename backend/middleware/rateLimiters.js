import rateLimit from 'express-rate-limit';

// Global API rate limiter (300 requests per 5 minutes)
export const globalLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'تم تجاوز الحد المسموح به من الطلبات، يرجى المحاولة بعد قليل.'
  }
});

// Admin Login Brute-force protection (10 attempts per 15 minutes)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'تم تجاوز الحد الأقصى لمحاولات تسجيل الدخول. يرجى الانتظار لمدة 15 دقيقة قبل المحاولة مجدداً لحماية الحساب.'
  }
});

// Order placement rate limiter (60 orders per 10 minutes per IP)
export const orderLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'لقد قمت بإرسال عدة طلبات مؤخراً، يرجى الانتظار قليلاً قبل تأكيد طلب جديد.'
  }
});
