import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Edit, Trash2, X, Upload } from 'lucide-react';
import { apiRequest } from '../api/client';
import { SkeletonCard } from '../components/SkeletonTable';
import { useToast } from '../context/ToastContext';
import { useAdminLanguage } from '../context/AdminLanguageContext';

export const CategoriesPage: React.FC = () => {
  const { t } = useAdminLanguage();
  const { showToast } = useToast();
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    label: '',
    description: '',
    image: ''
  });

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const res = await apiRequest('/categories');
      if (res.success) {
        setCategories(res.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({ label: '', description: '', image: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: any) => {
    setEditingCategory(cat);
    setFormData({
      label: cat.label || '',
      description: cat.description || '',
      image: cat.image || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, label?: string) => {
    if (!window.confirm(t('confirmDelete'))) return;
    try {
      await apiRequest(`/categories/${id}`, { method: 'DELETE' });
      showToast('تم الحذف', `تم حذف تصنيف "${label || 'التصنيف'}" بنجاح`, 'info');
      fetchCategories();
    } catch (err: any) {
      showToast('فشل الحذف', err.message || 'تعذر حذف التصنيف', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await apiRequest(`/categories/${editingCategory._id || editingCategory.slug}`, {
          method: 'PUT',
          body: JSON.stringify(formData)
        });
        showToast('تم التحديث', `تم حفظ تصنيف "${formData.label}" بنجاح`, 'success');
      } else {
        await apiRequest('/categories', {
          method: 'POST',
          body: JSON.stringify(formData)
        });
        showToast('تمت الإضافة', `تمت إضافة تصنيف "${formData.label}" بنجاح`, 'success');
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (err: any) {
      showToast('فشلت العملية', err.message || 'تعذر حفظ التصنيف', 'error');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent">{t('categoriesBadge')}</span>
          <h1 className="font-serif text-3xl font-light text-dark mt-1">
            {t('categoriesTitle')}
          </h1>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpenAdd}
          className="px-5 py-3 bg-dark hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-colors flex items-center gap-2 shadow-luxury cursor-pointer"
        >
          <Plus className="w-4 h-4 text-accent" /> {t('addCategory')}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        ) : categories.map((cat, idx) => (
          <motion.div
            key={cat._id || cat.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, delay: idx * 0.03, ease: 'easeOut' }}
            className="bg-white rounded-3xl border border-brand-200 p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-floating transition-shadow"
          >
            <div className="flex items-center gap-4">
              {cat.image ? (
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-16 h-20 object-cover rounded-2xl shrink-0 border border-brand-200 bg-neutral-100"
                />
              ) : (
                <div className="w-16 h-20 rounded-2xl shrink-0 border border-brand-200 bg-brand-100 flex flex-col items-center justify-center text-accent font-serif font-bold text-lg">
                  يونس
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-xl font-light text-dark">{cat.label}</h3>
                <span className="text-[10px] uppercase font-mono text-accent">المعرف: {cat.slug || cat.id}</span>
                <p className="text-xs text-neutral-500 line-clamp-2 mt-1">{cat.description}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-brand-200 flex items-center justify-between">
              <span className="text-xs text-neutral-600 font-semibold">{cat.count || 0} قطع</span>
              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOpenEdit(cat)}
                  className="p-1.5 text-neutral-500 hover:text-dark hover:bg-brand-100 rounded-lg transition-colors"
                  title="تعديل التصنيف"
                >
                  <Edit className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(cat._id || cat.slug, cat.label)}
                  className="p-1.5 text-neutral-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="حذف التصنيف"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-dark/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 border border-brand-200 shadow-2xl z-10 space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-brand-200">
                <h3 className="font-serif text-2xl font-light text-dark">
                  {editingCategory ? 'تعديل بيانات التصنيف' : t('addCategory')}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-neutral-400 hover:text-dark hover:bg-brand-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    {t('categoryLabel')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="مثال: المعاطف والبناطيل الصوفية"
                    className="w-full px-3.5 py-2.5 text-xs bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    {t('categoryDescription')}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="وصف تفصيلي لتشكيلة التصنيف وأناقتها..."
                    className="w-full px-3.5 py-2.5 text-xs bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    {t('categoryImage')}
                  </label>

                  {formData.image && (
                    <div className="relative w-24 h-28 rounded-xl overflow-hidden border border-brand-200 mb-2 group">
                      <img src={formData.image} alt="معاينة" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: '' })}
                        className="absolute top-1 left-1 p-1 bg-rose-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        title="حذف"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <label className="px-4 py-2 bg-brand-100 hover:bg-brand-200 text-dark rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0">
                      <Upload className="w-3.5 h-3.5 text-accent" />
                      <span>{t('uploadFromDevice') || 'رفع صورة'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              if (ev.target?.result) {
                                setFormData({ ...formData, image: ev.target.result as string });
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>

                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://... أو ارفع صورة من جهازك"
                      className="w-full px-3.5 py-2 text-xs bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-brand-200">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-brand-200 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-dark hover:bg-brand-50 transition-colors"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-dark hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-luxury"
                  >
                    {t('saveCategory')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

