import { Category } from '../models/Category.js';
import { dbStore } from '../config/databaseStore.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    if (Category.db && Category.db.readyState === 1) {
      const categories = await Category.find({}).sort({ label: 1 });
      return res.json({ success: true, count: categories.length, data: categories });
    }
    const categories = dbStore.getCategories();
    res.json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    next(error);
  }
};

// @desc    Create category
// @route   POST /api/categories
// @access  Protected Admin
export const createCategory = async (req, res, next) => {
  try {
    const { label, description, image } = req.body;
    if (!label) {
      return res.status(400).json({ success: false, message: 'اسم التصنيف مطلوب' });
    }

    const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `cat-${Date.now()}`;

    const catData = {
      slug,
      label,
      description: description || '',
      image: image || '',
      count: 0
    };

    if (Category.db && Category.db.readyState === 1) {
      const created = await Category.create(catData);
      dbStore.createCategory(catData);
      return res.status(201).json({ success: true, data: created });
    }

    const created = dbStore.createCategory(catData);
    res.status(201).json({ success: true, data: created });
  } catch (error) {
    next(error);
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Protected Admin
export const updateCategory = async (req, res, next) => {
  try {
    if (Category.db && Category.db.readyState === 1) {
      const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'التصنيف غير موجود' });
      dbStore.updateCategory(req.params.id, req.body);
      return res.json({ success: true, data: updated });
    }

    const updated = dbStore.updateCategory(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'التصنيف غير موجود' });

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Protected Admin
export const deleteCategory = async (req, res, next) => {
  try {
    if (Category.db && Category.db.readyState === 1) {
      const deleted = await Category.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ success: false, message: 'التصنيف غير موجود' });
      dbStore.deleteCategory(req.params.id);
      return res.json({ success: true, message: 'تم حذف التصنيف بنجاح' });
    }

    const deleted = dbStore.deleteCategory(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'التصنيف غير موجود' });

    res.json({ success: true, message: 'تم حذف التصنيف بنجاح' });
  } catch (error) {
    next(error);
  }
};

