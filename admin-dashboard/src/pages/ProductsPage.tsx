import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Filter,
  X,
  UploadCloud,
  Star,
  Camera,
  Link as LinkIcon
} from 'lucide-react';
import { apiRequest } from '../api/client';
import { SkeletonRow } from '../components/SkeletonTable';
import { useToast } from '../context/ToastContext';
import { useAdminLanguage } from '../context/AdminLanguageContext';

export const ProductsPage: React.FC = () => {
  const { t } = useAdminLanguage();
  const { showToast } = useToast();
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    price: '',
    originalPrice: '',
    category: 'suits',
    categoryLabel: 'البدلات والبليزرات',
    description: '',
    stockCount: '10',
    images: [] as string[],
    sizes: 'XS, S, M, L, XL',
    colors: 'جملي كلاسيكي:#C6A068, أسود ملكي:#222222',
    details: '',
    fabricCare: '',
    shippingPolicy: '',
    isNew: true,
    isBestSeller: false,
    isSale: false
  });

  const [urlInput, setUrlInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await apiRequest(`/products?category=${selectedCategory}&search=${search}`);
      if (res.success) {
        setProducts(res.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, search]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setUrlInput('');
    setFormData({
      name: '',
      subtitle: '',
      price: '',
      originalPrice: '',
      category: 'shirts',
      categoryLabel: 'قمصان',
      description: '',
      stockCount: '10',
      images: [],
      sizes: 'XS, S, M, L, XL',
      colors: 'جملي كلاسيكي:#C6A068, أسود ملكي:#222222',
      details: '',
      fabricCare: '',
      shippingPolicy: '',
      isNew: true,
      isBestSeller: false,
      isSale: false
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: any) => {
    setEditingProduct(product);
    setUrlInput('');
    const rawImages = Array.isArray(product.images)
      ? product.images
      : typeof product.images === 'string'
      ? product.images.split(/[\n,]/).map((s: string) => s.trim()).filter(Boolean)
      : [];

    setFormData({
      name: product.name || '',
      subtitle: product.subtitle || '',
      price: String(product.price || ''),
      originalPrice: product.originalPrice ? String(product.originalPrice) : '',
      category: product.category || 'shirts',
      categoryLabel: product.categoryLabel || 'قمصان',
      description: product.description || '',
      stockCount: String(product.stockCount || 10),
      images: rawImages,
      sizes: (product.sizes || []).join(', '),
      colors: (product.colors || []).map((c: any) => c.nameAr || c.name).join(', '),
      details: Array.isArray(product.details) ? product.details.join('\n') : (product.details || ''),
      fabricCare: Array.isArray(product.fabricCare) ? product.fabricCare.join('\n') : (product.fabricCare || ''),
      shippingPolicy: product.shippingPolicy || product.shippingInfo || '',
      isNew: product.isNewItem || product.isNew || false,
      isBestSeller: product.isBestSeller || false,
      isSale: product.isSale || false
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        showToast('ملف غير صالح', 'يرجى اختيار ملف صورة صالح (JPG, PNG, WEBP)', 'error');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showToast('حجم الملف كبير', `${file.name} يتجاوز الحد الأقصى 5 ميجابايت`, 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, result]
          }));
          showToast('تمت إضافة الصورة', `تم رفع ${file.name} بنجاح`, 'success');
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddUrl = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const cleanUrl = urlInput.trim();
    if (!cleanUrl) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, cleanUrl]
    }));
    setUrlInput('');
    showToast('تمت إضافة الرابط', 'تمت إضافة رابط الصورة بنجاح', 'success');
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSetCover = (index: number) => {
    setFormData((prev) => {
      const selected = prev.images[index];
      const rest = prev.images.filter((_, i) => i !== index);
      return {
        ...prev,
        images: [selected, ...rest]
      };
    });
    showToast('تحديث الغلاف', 'تم تعيين الصورة كغلاف رئيسي للقطعة', 'info');
  };

  const handleDelete = async (id: string, name?: string) => {
    if (!window.confirm(t('confirmDelete'))) return;
    try {
      await apiRequest(`/products/${id}`, { method: 'DELETE' });
      showToast('تم الحذف', `تم حذف "${name || 'القطعة'}" من الكتالوج بنجاح`, 'info');
      fetchProducts();
    } catch (err: any) {
      showToast('فشلت العملية', err.message || 'تعذر حذف القطعة', 'error');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Use image array directly
    const imageList = formData.images.filter(Boolean);

    // Parse sizes
    const sizeList = formData.sizes
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    // Parse colors as text names (e.g. "أسود, أبيض, كحلي")
    const colorList = formData.colors
      .split(',')
      .map(c => {
        const trimmed = c.trim();
        if (trimmed.includes(':')) {
          const [cName, cHex] = trimmed.split(':');
          return {
            name: (cName || 'لون').trim(),
            nameAr: (cName || 'لون').trim(),
            hex: (cHex || '#1A1A1A').trim()
          };
        }
        return {
          name: trimmed,
          nameAr: trimmed
        };
      })
      .filter(c => c.name);

    const labelMap: Record<string, string> = {
      shirts: 'قمصان',
      trousers: 'سراويل',
      shoes: 'أحذية',
      watches: 'ساعات',
      eyewear: 'نظارات'
    };

    const detailsList = formData.details
      .split('\n')
      .map(d => d.trim())
      .filter(Boolean);

    const fabricCareList = formData.fabricCare
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);

    const payload = {
      name: formData.name,
      subtitle: formData.subtitle,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      category: formData.category,
      categoryLabel: labelMap[formData.category] || formData.category,
      description: formData.description,
      stockCount: Number(formData.stockCount),
      images: imageList,
      sizes: sizeList.length ? sizeList : ['S', 'M', 'L', 'XL'],
      colors: colorList.length ? colorList : [{ name: 'أسود ملكي', hex: '#1A1A1A' }],
      details: detailsList,
      fabricCare: fabricCareList,
      shippingPolicy: formData.shippingPolicy.trim(),
      isNew: formData.isNew,
      isBestSeller: formData.isBestSeller,
      isSale: formData.isSale
    };

    try {
      if (editingProduct) {
        await apiRequest(`/products/${editingProduct._id || editingProduct.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
        showToast('تم التحديث', `تم تحديث "${payload.name}" بنجاح`, 'success');
      } else {
        await apiRequest('/products', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
        showToast('تمت الإضافة', `تمت إضافة "${payload.name}" للكتالوج بنجاح`, 'success');
      }

      setIsModalOpen(false);
      fetchProducts();
    } catch (err: any) {
      showToast('فشلت العملية', err.message || 'تعذر حفظ بيانات القطعة', 'error');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent">{t('productsBadge')}</span>
          <h1 className="font-serif text-3xl font-light text-dark mt-1">
            {t('productsTitle')}
          </h1>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpenAdd}
          className="px-5 py-3 bg-dark hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-colors flex items-center gap-2 shadow-luxury cursor-pointer"
        >
          <Plus className="w-4 h-4 text-accent" /> {t('addNewGarment')}
        </motion.button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-brand-200 shadow-sm">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchGarmentPlaceholder')}
            className="w-full pr-10 pl-4 py-2.5 bg-brand-50 border border-brand-200 rounded-xl text-xs text-dark placeholder-neutral-400 focus:outline-none focus:border-accent"
          />
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-neutral-500 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-auto bg-brand-50 border border-brand-200 rounded-xl px-4 py-2.5 text-xs text-dark focus:outline-none focus:border-accent font-semibold cursor-pointer"
          >
            <option value="all">{t('allCategoriesFilter')} ({products.length})</option>
            <option value="shirts">قمصان (Shirts)</option>
            <option value="trousers">سراويل (Trousers)</option>
            <option value="shoes">أحذية (Shoes)</option>
            <option value="watches">ساعات (Watches)</option>
            <option value="eyewear">نظارات (Eyewear)</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-brand-200 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-brand-200 bg-brand-50 text-neutral-600 uppercase tracking-wider font-semibold">
                  <th className="py-4 px-4">{t('tableGarment')}</th>
                  <th className="py-4 px-4 whitespace-nowrap">{t('tableCategory')}</th>
                  <th className="py-4 px-4 whitespace-nowrap">{t('tablePrice')}</th>
                  <th className="py-4 px-4 whitespace-nowrap">{t('tableStock')}</th>
                  <th className="py-4 px-4 whitespace-nowrap">{t('tableBadges')}</th>
                  <th className="py-4 px-4 text-left whitespace-nowrap">{t('tableActions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100">
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              </tbody>
            </table>
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center text-xs text-neutral-500">لا توجد أزياء مطابقة للبحث حالياً.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-brand-200 bg-brand-50 text-neutral-600 uppercase tracking-wider font-semibold">
                  <th className="py-4 px-4">{t('tableGarment')}</th>
                  <th className="py-4 px-4 whitespace-nowrap">{t('tableCategory')}</th>
                  <th className="py-4 px-4 whitespace-nowrap">{t('tablePrice')}</th>
                  <th className="py-4 px-4 whitespace-nowrap">{t('tableStock')}</th>
                  <th className="py-4 px-4 whitespace-nowrap">{t('tableBadges')}</th>
                  <th className="py-4 px-4 text-left whitespace-nowrap">{t('tableActions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100 text-neutral-800">
                {products.map((p, idx) => (
                  <motion.tr
                    key={p._id || p.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, delay: idx * 0.02, ease: 'easeOut' }}
                    className="hover:bg-brand-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {p.images && p.images.length > 0 && p.images[0] ? (
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-12 h-14 object-cover rounded-xl shrink-0 bg-neutral-100 border border-brand-200"
                          />
                        ) : (
                          <div className="w-12 h-14 rounded-xl shrink-0 bg-brand-100 border border-brand-200 flex flex-col items-center justify-center text-[9px] text-neutral-400">
                            <Camera className="w-4 h-4 text-neutral-400 mb-0.5" />
                            <span>بدون صورة</span>
                          </div>
                        )}
                        <div>
                          <h4 className="font-semibold text-dark text-xs">{p.name}</h4>
                          <p className="text-[11px] text-neutral-500 truncate max-w-xs">{p.subtitle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 uppercase text-[11px] font-semibold text-neutral-600 whitespace-nowrap">
                      {p.categoryLabel || p.category}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="font-bold text-dark">{Number(p.price || 0)} د.ج</span>
                      {p.originalPrice && (
                        <span className="text-[11px] text-neutral-400 line-through mr-1.5">{Number(p.originalPrice)} د.ج</span>
                      )}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                        (p.stockCount || 0) <= 5
                          ? 'bg-rose-100 text-rose-700 border border-rose-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}>
                        {p.stockCount || 0} قطعة
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {(p.isNew || p.isNewItem) && (
                          <span className="px-2 py-0.5 bg-dark text-white text-[9px] font-bold rounded-md">
                            وصل حديثاً
                          </span>
                        )}
                        {p.isBestSeller && (
                          <span className="px-2 py-0.5 bg-accent text-dark text-[9px] font-bold rounded-md">
                            الأكثر مبيعاً
                          </span>
                        )}
                        {p.isSale && (
                          <span className="px-2 py-0.5 bg-rose-700 text-white text-[9px] font-bold rounded-md">
                            تخفيض
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-left">
                      <div className="flex items-center justify-start gap-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 text-neutral-500 hover:text-dark hover:bg-brand-100 rounded-lg transition-colors"
                          title={t('editGarment')}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id || p.id, p.name)}
                          className="p-1.5 text-neutral-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title={t('deleteGarment')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit / Add Garment Modal */}
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
              className="relative max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-8 border border-brand-200 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-brand-200">
                <h3 className="font-serif text-2xl font-light text-dark">
                  {editingProduct ? t('formTitleEdit') : t('formTitleAdd')}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-neutral-400 hover:text-dark hover:bg-brand-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      {t('formGarmentName')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="مثال: بدلة صوف كشمير فلورنسية"
                      className="w-full px-3.5 py-2.5 text-xs bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      {t('formSubtitle')}
                    </label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="مثال: صوف إيطالي 100% بحياكة يدوية"
                      className="w-full px-3.5 py-2.5 text-xs bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      {t('formPrice')} *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="490"
                      className="w-full px-3.5 py-2.5 text-xs bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      {t('formOriginalPrice')}
                    </label>
                    <input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      placeholder="590"
                      className="w-full px-3.5 py-2.5 text-xs bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      {t('formCategory')} *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => {
                        const cat = e.target.value;
                        const labelMap: Record<string, string> = {
                          shirts: 'قمصان',
                          trousers: 'سراويل',
                          shoes: 'أحذية',
                          watches: 'ساعات',
                          eyewear: 'نظارات'
                        };
                        setFormData({
                          ...formData,
                          category: cat,
                          categoryLabel: labelMap[cat] || cat
                        });
                      }}
                      className="w-full px-3.5 py-2.5 text-xs bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent font-semibold cursor-pointer"
                    >
                      <option value="shirts">قمصان (Shirts)</option>
                      <option value="trousers">سراويل (Trousers)</option>
                      <option value="shoes">أحذية (Shoes)</option>
                      <option value="watches">ساعات (Watches)</option>
                      <option value="eyewear">نظارات (Eyewear)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    {t('formStockCount')}
                  </label>
                  <input
                    type="number"
                    value={formData.stockCount}
                    onChange={(e) => setFormData({ ...formData, stockCount: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent"
                  />
                </div>

                {/* Product Imagery & Image Uploader */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                      {t('formImageUrls')} ({formData.images.length})
                    </label>
                    <span className="text-[10px] text-neutral-500 font-medium">
                      {t('imageFormatsNote')}
                    </span>
                  </div>

                  {/* Drag & Drop / Click to Browse Box */}
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      handleFileUpload(e.dataTransfer.files);
                    }}
                    className={`relative border-2 border-dashed rounded-2xl p-5 text-center transition-all cursor-pointer ${
                      isDragging
                        ? 'border-accent bg-accent/10 scale-[1.01]'
                        : 'border-brand-300 hover:border-dark bg-brand-50/50 hover:bg-brand-50'
                    }`}
                  >
                    <input
                      type="file"
                      id="product-file-input"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                    />
                    <label htmlFor="product-file-input" className="cursor-pointer flex flex-col items-center justify-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-white border border-brand-200 flex items-center justify-center text-dark shadow-sm">
                        <UploadCloud className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-dark">
                          {t('dragDropImages')}
                        </p>
                        <p className="text-[11px] text-neutral-500 mt-0.5">
                          {t('uploadFromDevice')}
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Quick URL Input Bar */}
                  <div className="flex gap-2 items-center">
                    <div className="relative flex-1">
                      <LinkIcon className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddUrl(); } }}
                        placeholder="https://... (أو ارفع صوراً من جهازك بالأعلى)"
                        className="w-full pr-9 pl-3 py-2 text-xs bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent font-mono"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddUrl}
                      disabled={!urlInput.trim()}
                      className="px-4 py-2 bg-dark hover:bg-neutral-800 disabled:bg-neutral-300 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
                    >
                      {t('addImageUrl')}
                    </button>
                  </div>

                  {/* Visual Image Previews Gallery */}
                  {formData.images.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {formData.images.map((imgUrl, index) => {
                        const isCover = index === 0;
                        return (
                          <div
                            key={index}
                            className={`group relative rounded-2xl overflow-hidden border bg-white shadow-xs transition-all ${
                              isCover ? 'border-accent ring-2 ring-accent/30' : 'border-brand-200 hover:border-brand-400'
                            }`}
                          >
                            <div className="aspect-square w-full relative bg-neutral-100">
                              <img
                                src={imgUrl}
                                alt={`صورة القطعة ${index + 1}`}
                                className="w-full h-full object-cover"
                              />

                              {/* Main Cover Tag */}
                              {isCover ? (
                                <span className="absolute top-2 right-2 text-[10px] font-bold bg-dark text-accent px-2 py-0.5 rounded-md shadow-md flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-accent" /> {t('mainCoverBadge')}
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleSetCover(index)}
                                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-white/95 text-dark hover:bg-dark hover:text-accent text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                                >
                                  <Star className="w-3 h-3" /> {t('setAsCover')}
                                </button>
                              )}

                              {/* Delete Button */}
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 bg-rose-600 hover:bg-rose-700 text-white p-1 rounded-md shadow-md transition-all cursor-pointer"
                                title={t('removeImage')}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800">
                      {t('noImagesYet')}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    {t('formDescription')}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="وصف الخامات، جودة الحياكة، تفاصيل المظهر الكلاسيكي..."
                    className="w-full px-3.5 py-2.5 text-xs bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      {t('formSizes')}
                    </label>
                    <input
                      type="text"
                      value={formData.sizes}
                      onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      الألوان (نص كتابي، مثال: أسود، أبيض، كحلي)
                    </label>
                    <input
                      type="text"
                      value={formData.colors}
                      onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                      placeholder="أسود، أبيض، كحلي، أخضر زمردي..."
                      className="w-full px-3.5 py-2.5 text-xs bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                {/* Checkbox Flags */}
                <div className="flex flex-wrap gap-6 pt-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-dark cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isNew}
                      onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                      className="rounded accent-dark"
                    />
                    <span>{t('badgeNewOption')}</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-semibold text-dark cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isBestSeller}
                      onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                      className="rounded accent-dark"
                    />
                    <span>{t('badgeBestSellerOption')}</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-semibold text-dark cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isSale}
                      onChange={(e) => setFormData({ ...formData, isSale: e.target.checked })}
                      className="rounded accent-dark"
                    />
                    <span>{t('badgeSaleOption')}</span>
                  </label>
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
                    {t('saveGarment')}
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

