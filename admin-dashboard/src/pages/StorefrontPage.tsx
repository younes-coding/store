import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Save,
  Upload,
  Image as ImageIcon,
  Eye,
  Layers,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { apiRequest } from '../api/client';
import { useToast } from '../context/ToastContext';

export const StorefrontPage: React.FC = () => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  // Homepage Settings State
  const [homepage, setHomepage] = useState({
    heroSeasonTag: 'يونس سارتوريال — التراث الكلاسيكي للأزياء الرجالية Old Money',
    heroTitleLine1: 'الأناقة الكلاسيكية الرجالية',
    heroTitleLine2: 'فخامة هادئة تتوارثها الأجيال.',
    heroDescription: 'تشكيلة حصرية للرجل الأنيق من قمصان البولو الصيفية المحبوكة بياقات إيطالية مفتوحة، وأقمشة القطن المصري والتريكو فائق النعومة.',
    heroImage: '/products/shirt-black-tipping-polo.jpg',
    heroFloatingTitle: 'وصل حديثاً',
    heroFloatingSubtitle: 'قميص بولو تريكو بأكمام طويلة أزرق رمادي',
    heroFloatingPrice: '6200',
    heroFloatingImage: '/products/shirt-slate-blue-knit-long.jpg',
    heritageBannerTag: 'الفخامة الكلاسيكية والأصالة',
    heritageBannerTitle: 'فخامة هادئة تُعبر عنك:',
    heritageBannerSubtitle: 'أناقة كلاسيكية لا تنتهي بمرور الزمن',
    heritageBannerText: 'نختار لك أرقى الأقمشة الإيطالية والإنجليزية المصنوعة بحرفية يدوية استثنائية من صوف الميرينو والقطن المصري والكشمير المنغولي، لتمنحك إطلالة أرستقراطية متكاملة تبرز حضورك الراقي في كل مناسبة.',
    heritageBannerImage: '/products/shirt-slate-blue-knit-long.jpg'
  });

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [settingsRes, categoriesRes] = await Promise.all([
        apiRequest('/settings'),
        apiRequest('/categories')
      ]);

      if (settingsRes.success && settingsRes.data?.homepage) {
        setHomepage(prev => ({ ...prev, ...settingsRes.data.homepage }));
      }
      if (categoriesRes.success && Array.isArray(categoriesRes.data)) {
        setCategories(categoriesRes.data);
      }
    } catch (err: any) {
      console.error('Failed to load storefront data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveHomepage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const res = await apiRequest('/settings', {
        method: 'PUT',
        body: JSON.stringify({ homepage })
      });
      if (res.success) {
        showToast('تم الحفظ بنجاح', 'تم تحديث صور ونصوص الواجهة والبانرات مباشرة في المتجر', 'success');
      }
    } catch (err: any) {
      showToast('فشل الحفظ', err.message || 'تعذر حفظ تعديلات الواجهة', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateCategory = async (catId: string, updatedFields: any) => {
    try {
      const res = await apiRequest(`/categories/${catId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedFields)
      });
      if (res.success) {
        showToast('تم تحديث التصنيف', 'تم حفظ صورة وبيانات التصنيف بنجاح', 'success');
        setCategories(prev => prev.map(c => (c.id === catId || c._id === catId || c.slug === catId) ? { ...c, ...updatedFields } : c));
      }
    } catch (err: any) {
      showToast('فشل التحديث', err.message || 'تعذر حفظ بيانات التصنيف', 'error');
    }
  };

  return (
    <div className="space-y-10 max-w-6xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>لوحة تخصيص الواجهة والبانرات</span>
          </span>
          <h1 className="font-serif text-3xl font-bold text-dark mt-1">
            التحكم في صور ونصوص المتجر الرئيسية
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            تحكم كامل وسهل في الصورة الترحيبية الكبرى، بطاقات التصنيفات الخمسة، وبانر الأصالة الفاخر.
          </p>
        </div>

        <a
          href="https://younes-sartorial.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-brand-100 hover:bg-brand-200 text-dark rounded-xl text-xs font-bold flex items-center gap-2 transition-colors border border-brand-200 shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Eye className="w-4 h-4 text-accent" />
          <span>معاينة المتجر المباشر</span>
        </a>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-xs font-bold text-neutral-400 flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-accent" />
          <span>جاري تحميل إعدادات الواجهة والبانرات...</span>
        </div>
      ) : (
        <form onSubmit={handleSaveHomepage} className="space-y-10">
          {/* SECTION 1: HERO SECTION */}
          <div className="bg-white rounded-3xl border border-brand-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 pb-4 border-b border-brand-200">
              <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-dark font-serif font-bold">
                1
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-dark">القسم الترحيبي الرئيسي (Hero Section)</h3>
                <p className="text-xs text-neutral-500">تحكم بالصورة الكبيرة على الواجهة، والبادج، والعناوين والوصف</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Image Preview & Upload (Hero Main) */}
              <div className="lg:col-span-4 space-y-4">
                <label className="block text-xs font-bold text-neutral-800">
                  الصورة الرئيسية للواجهة (Hero Main Image)
                </label>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-brand-200 bg-neutral-900 shadow-md group">
                  {homepage.heroImage ? (
                    <img
                      src={homepage.heroImage}
                      alt="معاينة الواجهة الرئيسية"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 p-4 text-center text-xs">
                      <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                      <span>لا توجد صورة محددة</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-dark/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 gap-2">
                    <label className="px-4 py-2 bg-accent hover:bg-accent-hover text-dark font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-lg transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>تغيير الصورة من جهازك</span>
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
                                setHomepage({ ...homepage, heroImage: ev.target.result as string });
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <label className="px-3 py-2 bg-brand-100 hover:bg-brand-200 text-dark rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors">
                    <Upload className="w-3.5 h-3.5 text-accent" />
                    <span>رفع صورة</span>
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
                              setHomepage({ ...homepage, heroImage: ev.target.result as string });
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  <input
                    type="text"
                    value={homepage.heroImage}
                    onChange={(e) => setHomepage({ ...homepage, heroImage: e.target.value })}
                    placeholder="رابط أو مسار الصورة: /products/..."
                    className="w-full p-2 text-xs bg-brand-50 border border-brand-200 rounded-xl text-dark font-mono focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              {/* Text Fields */}
              <div className="lg:col-span-8 space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">شارة الموسم العلوية (Badge Tag)</label>
                  <input
                    type="text"
                    value={homepage.heroSeasonTag}
                    onChange={(e) => setHomepage({ ...homepage, heroSeasonTag: e.target.value })}
                    className="w-full p-3 bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">السطر الأول من العنوان (Title Line 1)</label>
                    <input
                      type="text"
                      value={homepage.heroTitleLine1}
                      onChange={(e) => setHomepage({ ...homepage, heroTitleLine1: e.target.value })}
                      className="w-full p-3 bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">السطر الثاني الذهبي (Title Line 2 - Accent)</label>
                    <input
                      type="text"
                      value={homepage.heroTitleLine2}
                      onChange={(e) => setHomepage({ ...homepage, heroTitleLine2: e.target.value })}
                      className="w-full p-3 bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent font-bold text-amber-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">وصف الواجهة الترحيبية (Description)</label>
                  <textarea
                    rows={3}
                    value={homepage.heroDescription}
                    onChange={(e) => setHomepage({ ...homepage, heroDescription: e.target.value })}
                    className="w-full p-3 bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent font-medium leading-relaxed"
                  />
                </div>

                {/* Floating Piece Settings */}
                <div className="pt-6 border-t border-brand-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block font-bold text-neutral-800 flex items-center gap-1.5 text-sm">
                      <Layers className="w-4 h-4 text-accent" />
                      <span>البطاقة العائمة الصغرى الترويجية (Hero Floating Mini Card)</span>
                    </label>
                    <span className="text-[11px] text-accent font-semibold bg-accent/10 px-2.5 py-0.5 rounded-full">
                      تظهر في الزاوية السفلية للصورة الرئيسية
                    </span>
                  </div>

                  <div className="bg-brand-50/70 border border-brand-200 rounded-2xl p-4 sm:p-5 space-y-5">
                    {/* Visual Card Preview Bar */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-brand-200 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-16 rounded-xl overflow-hidden border border-brand-200 bg-neutral-100 shrink-0 relative group">
                          {homepage.heroFloatingImage ? (
                            <img
                              src={homepage.heroFloatingImage}
                              alt="معاينة الصورة الصغيرة"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-dark font-serif font-bold bg-brand-100">
                              ي
                            </div>
                          )}
                        </div>
                        <div>
                          <span className="text-[10px] text-accent font-bold uppercase block">
                            {homepage.heroFloatingTitle || 'وصل حديثاً'}
                          </span>
                          <h4 className="font-serif text-xs font-bold text-dark max-w-xs truncate">
                            {homepage.heroFloatingSubtitle || 'اسم القطعة المعروضة'}
                          </h4>
                          <span className="text-xs font-bold text-dark block mt-0.5">
                            {homepage.heroFloatingPrice ? `${parseFloat(String(homepage.heroFloatingPrice).replace(/[^0-9.]/g, '') || '0').toLocaleString('ar-DZ')} د.ج` : '6 200 د.ج'}
                          </span>
                        </div>
                      </div>

                      <label className="px-3.5 py-2 bg-accent hover:bg-accent-hover text-dark font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-sm self-stretch sm:self-auto justify-center">
                        <Upload className="w-3.5 h-3.5" />
                        <span>رفع الصورة الصغيرة من جهازك</span>
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
                                  setHomepage({ ...homepage, heroFloatingImage: ev.target.result as string });
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-700 mb-1">شارة البطاقة (Badge)</label>
                        <input
                          type="text"
                          value={homepage.heroFloatingTitle}
                          onChange={(e) => setHomepage({ ...homepage, heroFloatingTitle: e.target.value })}
                          placeholder="مثال: وصل حديثاً"
                          className="w-full p-2.5 bg-white border border-brand-200 rounded-xl text-dark text-xs focus:outline-none focus:border-accent"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-neutral-700 mb-1">اسم القطعة المعروضة (Title)</label>
                        <input
                          type="text"
                          value={homepage.heroFloatingSubtitle}
                          onChange={(e) => setHomepage({ ...homepage, heroFloatingSubtitle: e.target.value })}
                          placeholder="مثال: قميص بولو تريكو بأكمام طويلة"
                          className="w-full p-2.5 bg-white border border-brand-200 rounded-xl text-dark text-xs focus:outline-none focus:border-accent"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-neutral-700 mb-1">السعر بالدينار الجزائري (د.ج)</label>
                        <input
                          type="text"
                          value={homepage.heroFloatingPrice}
                          onChange={(e) => setHomepage({ ...homepage, heroFloatingPrice: e.target.value })}
                          placeholder="مثال: 6200"
                          className="w-full p-2.5 bg-white border border-brand-200 rounded-xl text-dark text-xs font-bold focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    {/* Image URL path fallback */}
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-700 mb-1">مسار أو رابط الصورة الصغيرة (Image Path / URL)</label>
                      <input
                        type="text"
                        value={homepage.heroFloatingImage}
                        onChange={(e) => setHomepage({ ...homepage, heroFloatingImage: e.target.value })}
                        placeholder="رابط أو مسار الصورة: /products/... أو ارفعها مباشرة من الزر أعلاه"
                        className="w-full p-2.5 bg-white border border-brand-200 rounded-xl text-dark text-xs font-mono focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: CATEGORY CARDS */}
          <div className="bg-white rounded-3xl border border-brand-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 pb-4 border-b border-brand-200">
              <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-dark font-serif font-bold">
                2
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-dark">بطاقات التصنيفات الخمسة (Category Showcase Cards)</h3>
                <p className="text-xs text-neutral-500">تغيير صور وأوصاف بطاقات: قمصان، سراويل، أحذية، ساعات، ونظارات</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => {
                const catId = cat.id || cat._id || cat.slug;
                return (
                  <div
                    key={catId}
                    className="p-5 rounded-2xl border border-brand-200 bg-brand-50/50 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-lg font-bold text-dark">{cat.label}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-brand-200 text-dark text-[10px] font-bold">
                          {cat.count || 0} قطع
                        </span>
                      </div>

                      {/* Image Preview & Upload */}
                      <div className="relative h-44 rounded-xl overflow-hidden border border-brand-200 bg-neutral-900 group">
                        {cat.image ? (
                          <img
                            src={cat.image}
                            alt={cat.label}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs">
                            لا توجد صورة
                          </div>
                        )}

                        <div className="absolute inset-0 bg-dark/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3">
                          <label className="px-3.5 py-2 bg-accent hover:bg-accent-hover text-dark font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md">
                            <Upload className="w-3.5 h-3.5" />
                            <span>تغيير صورة {cat.label}</span>
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
                                      handleUpdateCategory(catId, { image: ev.target.result as string });
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Edit Fields */}
                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="block text-[11px] font-bold text-neutral-600 mb-1">اسم التصنيف</span>
                          <input
                            type="text"
                            value={cat.label}
                            onChange={(e) => {
                              const newLabel = e.target.value;
                              setCategories(prev => prev.map(c => (c.id === catId || c._id === catId || c.slug === catId) ? { ...c, label: newLabel } : c));
                            }}
                            className="w-full p-2 bg-white border border-brand-200 rounded-lg text-dark font-medium"
                          />
                        </div>

                        <div>
                          <span className="block text-[11px] font-bold text-neutral-600 mb-1">الوصف المعروض في البطاقة</span>
                          <textarea
                            rows={2}
                            value={cat.description || ''}
                            onChange={(e) => {
                              const newDesc = e.target.value;
                              setCategories(prev => prev.map(c => (c.id === catId || c._id === catId || c.slug === catId) ? { ...c, description: newDesc } : c));
                            }}
                            className="w-full p-2 bg-white border border-brand-200 rounded-lg text-dark text-[11px]"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleUpdateCategory(catId, { label: cat.label, description: cat.description, image: cat.image })}
                      className="w-full py-2 bg-dark hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                      <span>حفظ بطاقة {cat.label}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: HERITAGE BANNER */}
          <div className="bg-white rounded-3xl border border-brand-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 pb-4 border-b border-brand-200">
              <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-dark font-serif font-bold">
                3
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-dark">بانر الأصالة والفخامة (Heritage Brand Highlight)</h3>
                <p className="text-xs text-neutral-500">تحكم بصورة البانر العريض، العناوين الملكية، والفقرة الترويجية</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Image Preview & Upload */}
              <div className="lg:col-span-5 space-y-4">
                <label className="block text-xs font-bold text-neutral-800">
                  صورة البانر الفاخر (Heritage Banner Image)
                </label>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-brand-200 bg-neutral-900 shadow-md group">
                  {homepage.heritageBannerImage ? (
                    <img
                      src={homepage.heritageBannerImage}
                      alt="معاينة بانر الأصالة"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 p-4 text-center text-xs">
                      <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                      <span>لا توجد صورة محددة</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-dark/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 gap-2">
                    <label className="px-4 py-2 bg-accent hover:bg-accent-hover text-dark font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-lg transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>رفع صورة جديدة للبانر</span>
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
                                setHomepage({ ...homepage, heritageBannerImage: ev.target.result as string });
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <label className="px-3 py-2 bg-brand-100 hover:bg-brand-200 text-dark rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors">
                    <Upload className="w-3.5 h-3.5 text-accent" />
                    <span>رفع صورة</span>
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
                              setHomepage({ ...homepage, heritageBannerImage: ev.target.result as string });
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  <input
                    type="text"
                    value={homepage.heritageBannerImage}
                    onChange={(e) => setHomepage({ ...homepage, heritageBannerImage: e.target.value })}
                    placeholder="رابط أو مسار الصورة: /products/..."
                    className="w-full p-2 text-xs bg-brand-50 border border-brand-200 rounded-xl text-dark font-mono focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              {/* Banner Text Fields */}
              <div className="lg:col-span-7 space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">شارة البانر العلوية (Badge Tag)</label>
                  <input
                    type="text"
                    value={homepage.heritageBannerTag}
                    onChange={(e) => setHomepage({ ...homepage, heritageBannerTag: e.target.value })}
                    className="w-full p-3 bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">عنوان البانر الرئيسي</label>
                    <input
                      type="text"
                      value={homepage.heritageBannerTitle}
                      onChange={(e) => setHomepage({ ...homepage, heritageBannerTitle: e.target.value })}
                      className="w-full p-3 bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">العنوان الفرعي الذهبي</label>
                    <input
                      type="text"
                      value={homepage.heritageBannerSubtitle}
                      onChange={(e) => setHomepage({ ...homepage, heritageBannerSubtitle: e.target.value })}
                      className="w-full p-3 bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent font-bold text-amber-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">نص وفقرة البانر (Heritage Text)</label>
                  <textarea
                    rows={4}
                    value={homepage.heritageBannerText}
                    onChange={(e) => setHomepage({ ...homepage, heritageBannerText: e.target.value })}
                    className="w-full p-3 bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent font-medium leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Save Button */}
          <div className="sticky bottom-6 z-20 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSaving}
              className="px-8 py-4 bg-dark hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all flex items-center gap-3 shadow-2xl border-2 border-accent/40 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <RefreshCw className="w-4 h-4 animate-spin text-accent" />
              ) : (
                <Save className="w-4 h-4 text-accent" />
              )}
              <span>{isSaving ? 'جاري حفظ التعديلات...' : 'حفظ ونشر جميع تعديلات الواجهة والبانرات'}</span>
            </motion.button>
          </div>
        </form>
      )}
    </div>
  );
};
