import { Product } from '../models/Product.js';
import { dbStore } from '../config/databaseStore.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const { category, search, isSale, isNew } = req.query;

    if (Product.db && Product.db.readyState === 1) {
      let query = {};
      if (category && category !== 'all') query.category = category;
      if (isSale === 'true') query.isSale = true;
      if (isNew === 'true') query.isNewItem = true;
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { subtitle: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }

      const products = await Product.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: products.length, data: products });
    }

    // Persistent Local Database Store
    const products = dbStore.getProducts({ category, search, isSale, isNew });
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    if (Product.db && Product.db.readyState === 1) {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ success: false, message: 'المنتج غير موجود' });
      return res.json({ success: true, data: product });
    }

    const product = dbStore.getProductById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'المنتج غير موجود' });
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Protected Admin
export const createProduct = async (req, res, next) => {
  try {
    const { name, subtitle, price, originalPrice, category, categoryLabel, description, stockCount, images, colors, sizes, isNew, isBestSeller, isSale, fabricCare, details, shippingPolicy } = req.body;

    if (!name || !price || !category || !description) {
      return res.status(400).json({ success: false, message: 'يرجى ملء الحقول المطلوبة (الاسم، السعر، التصنيف، الوصف)' });
    }

    const labelMap = {
      suits: 'البدلات والبليزرات',
      knitwear: 'الكشمير والتريكو',
      shirts: 'القمصان والبولو',
      outerwear: 'المعاطف والبناطيل',
      footwear: 'أحذية كلاسيكية ولوفر',
      watches: 'ساعات فاخرة',
      eyewear: 'نظارات كلاسيكية'
    };

    const productData = {
      name,
      subtitle: subtitle || '',
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      category,
      categoryLabel: categoryLabel || labelMap[category] || category,
      rating: 5.0,
      reviewCount: 1,
      images: images && images.length ? images : [],
      colors: colors || [{ name: 'أسود ملكي', hex: '#1A1A1A' }],
      sizes: sizes || ['48 (M)', '50 (L)', '52 (XL)'],
      description,
      fabricCare: Array.isArray(fabricCare) ? fabricCare.filter(f => Boolean(f && f.trim())) : (fabricCare ? [String(fabricCare)] : []),
      details: Array.isArray(details) ? details.filter(d => Boolean(d && d.trim())) : (details ? [String(details)] : []),
      shippingPolicy: shippingPolicy ? String(shippingPolicy).trim() : '',
      isNewItem: isNew !== undefined ? isNew : true,
      isNew: isNew !== undefined ? isNew : true,
      isBestSeller: isBestSeller || false,
      isSale: isSale || false,
      stockCount: Number(stockCount || 10)
    };

    if (Product.db && Product.db.readyState === 1) {
      const newProd = await Product.create(productData);
      dbStore.createProduct(productData);
      return res.status(201).json({ success: true, data: newProd });
    }

    const newProd = dbStore.createProduct(productData);
    res.status(201).json({ success: true, data: newProd });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Protected Admin
export const updateProduct = async (req, res, next) => {
  try {
    if (Product.db && Product.db.readyState === 1) {
      const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updated) return res.status(404).json({ success: false, message: 'المنتج غير موجود' });
      dbStore.updateProduct(req.params.id, req.body);
      return res.json({ success: true, data: updated });
    }

    const updated = dbStore.updateProduct(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'المنتج غير موجود' });

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Protected Admin
export const deleteProduct = async (req, res, next) => {
  try {
    if (Product.db && Product.db.readyState === 1) {
      const deleted = await Product.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ success: false, message: 'المنتج غير موجود' });
      dbStore.deleteProduct(req.params.id);
      return res.json({ success: true, message: 'تم حذف المنتج بنجاح' });
    }

    const deleted = dbStore.deleteProduct(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'المنتج غير موجود' });

    res.json({ success: true, message: 'تم حذف المنتج بنجاح' });
  } catch (error) {
    next(error);
  }
};

