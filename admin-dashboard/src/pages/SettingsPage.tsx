import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save,
  Building2,
  Truck,
  Sparkles,
  Search,
  RefreshCw,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  RotateCcw,
  HelpCircle
} from 'lucide-react';
import { apiRequest } from '../api/client';
import { useToast } from '../context/ToastContext';
import { useAdminLanguage } from '../context/AdminLanguageContext';
import { ALGERIA_WILAYAS, getDefaultWilayas, type WilayaItem } from '../data/wilayas';
import { type FaqItem, getDefaultFaqs } from '../data/faqs';

export const SettingsPage: React.FC = () => {
  const { t } = useAdminLanguage();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    storeName: 'يونس سارتوريال — الفخامة الكلاسيكية الهادئة Old Money',
    contactEmail: 'bounouayounes560@gmail.com',
    contactPhone: '0657533005',
    address: 'تلمسان، الجزائر',
    freeShippingThreshold: 0,
    standardShippingCost: 600,
    wilayas: [] as WilayaItem[],
    wilayaShippingRates: {} as Record<string, number>,
    faqs: [] as FaqItem[],
    announcementText: '✨ تميّز بأناقة «أولد موني» الراقية — أقمشة نبيلة وتغليف ملكي فاخر مع توصيل استثنائي لباب منزلك'
  });

  const [wilayaSearch, setWilayaSearch] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Add Wilaya state
  const [isAddingWilaya, setIsAddingWilaya] = useState(false);
  const [newWilayaName, setNewWilayaName] = useState('');
  const [newWilayaPrice, setNewWilayaPrice] = useState<number>(600);

  // Inline rename state
  const [editingWilayaId, setEditingWilayaId] = useState<string | null>(null);
  const [editingWilayaName, setEditingWilayaName] = useState('');

  // FAQ Management states
  const [isAddingFaq, setIsAddingFaq] = useState(false);
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');

  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [editingFaqQuestion, setEditingFaqQuestion] = useState('');
  const [editingFaqAnswer, setEditingFaqAnswer] = useState('');
  const [faqSearch, setFaqSearch] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await apiRequest<{ success: boolean; data: any }>('/settings');
        if (res.success && res.data) {
          const stdCost = Number(res.data.standardShippingCost) || 600;
          let loadedWilayas: WilayaItem[] = [];

          if (Array.isArray(res.data.wilayas) && res.data.wilayas.length > 0) {
            loadedWilayas = res.data.wilayas;
          } else {
            // Fallback from existing rates or default
            const existingRates = res.data.wilayaShippingRates || {};
            loadedWilayas = ALGERIA_WILAYAS.map((wName, idx) => ({
              id: `wilaya-${String(idx + 1).padStart(2, '0')}`,
              name: wName,
              price: existingRates[wName] !== undefined ? Number(existingRates[wName]) : stdCost
            }));
          }

          // Build dictionary for fast lookup
          const ratesMap: Record<string, number> = {};
          loadedWilayas.forEach(w => {
            ratesMap[w.name] = w.price;
          });

          // Load FAQs
          const loadedFaqs: FaqItem[] = Array.isArray(res.data.faqs) && res.data.faqs.length > 0
            ? res.data.faqs
            : getDefaultFaqs();

          setFormData({
            ...res.data,
            wilayas: loadedWilayas,
            wilayaShippingRates: ratesMap,
            faqs: loadedFaqs
          });
          setNewWilayaPrice(stdCost);
        }
      } catch (err) {
        console.error('Failed to fetch store settings:', err);
      }
    };

    fetchSettings();
  }, []);

  // Update specific wilaya price
  const handleWilayaPriceChange = (id: string, price: number) => {
    const cleanPrice = Math.max(0, price);
    setFormData(prev => {
      const updatedList = prev.wilayas.map(w => w.id === id ? { ...w, price: cleanPrice } : w);
      const updatedRates: Record<string, number> = {};
      updatedList.forEach(w => {
        updatedRates[w.name] = w.price;
      });
      return {
        ...prev,
        wilayas: updatedList,
        wilayaShippingRates: updatedRates
      };
    });
  };

  // Start editing a wilaya name
  const handleStartRename = (wilaya: WilayaItem) => {
    setEditingWilayaId(wilaya.id);
    setEditingWilayaName(wilaya.name);
  };

  // Save renamed wilaya
  const handleSaveRename = (id: string) => {
    const trimmed = editingWilayaName.trim();
    if (!trimmed) {
      showToast('خطأ', 'اسم الولاية لا يمكن أن يكون فارغاً', 'error');
      return;
    }

    setFormData(prev => {
      const updatedList = prev.wilayas.map(w => w.id === id ? { ...w, name: trimmed } : w);
      const updatedRates: Record<string, number> = {};
      updatedList.forEach(w => {
        updatedRates[w.name] = w.price;
      });
      return {
        ...prev,
        wilayas: updatedList,
        wilayaShippingRates: updatedRates
      };
    });

    setEditingWilayaId(null);
    setEditingWilayaName('');
    showToast('تم التعديل', `تم تعديل اسم الولاية بنجاح إلى "${trimmed}"`, 'success');
  };

  // Add new Wilaya
  const handleAddWilaya = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newWilayaName.trim();
    if (!trimmed) {
      showToast('خطأ', 'يرجى إدخال اسم الولاية الجديدة', 'error');
      return;
    }

    // Check duplicate
    if (formData.wilayas.some(w => w.name.toLowerCase() === trimmed.toLowerCase())) {
      showToast('تنبيه', 'هذه الولاية موجودة بالفعل في القائمة', 'error');
      return;
    }

    const newId = `wilaya-${Date.now()}`;
    const newPrice = Math.max(0, Number(newWilayaPrice) || 0);
    const newObj: WilayaItem = {
      id: newId,
      name: trimmed,
      price: newPrice
    };

    setFormData(prev => {
      const updatedList = [...prev.wilayas, newObj];
      const updatedRates: Record<string, number> = {
        ...prev.wilayaShippingRates,
        [trimmed]: newPrice
      };
      return {
        ...prev,
        wilayas: updatedList,
        wilayaShippingRates: updatedRates
      };
    });

    setNewWilayaName('');
    setIsAddingWilaya(false);
    showToast('تمت الإضافة', `تمت إضافة ولاية "${trimmed}" بتكلفة ${newPrice} د.ج بنجاح`, 'success');
  };

  // Delete Wilaya
  const handleDeleteWilaya = (id: string, name: string) => {
    if (!window.confirm(`هل أنت متأكد من حذف ولاية "${name}" من قائمة التوصيل؟`)) {
      return;
    }

    setFormData(prev => {
      const updatedList = prev.wilayas.filter(w => w.id !== id);
      const updatedRates: Record<string, number> = {};
      updatedList.forEach(w => {
        updatedRates[w.name] = w.price;
      });
      return {
        ...prev,
        wilayas: updatedList,
        wilayaShippingRates: updatedRates
      };
    });

    showToast('تم الحذف', `تم حذف ولاية "${name}" من القائمة`, 'info');
  };

  // Apply standard cost to all
  const handleApplyStandardToAll = () => {
    const cost = Number(formData.standardShippingCost) || 0;
    setFormData(prev => {
      const updatedList = prev.wilayas.map(w => ({ ...w, price: cost }));
      const updatedRates: Record<string, number> = {};
      updatedList.forEach(w => {
        updatedRates[w.name] = cost;
      });
      return {
        ...prev,
        wilayas: updatedList,
        wilayaShippingRates: updatedRates
      };
    });
    showToast('تم التطبيق', `تم تطبيق سعر ${cost} د.ج على جميع الولايات (${formData.wilayas.length} ولاية)`, 'info');
  };

  // Reset to default 69 wilayas
  const handleResetToDefaultWilayas = () => {
    if (!window.confirm('هل تود استرجاع قائمة الـ 69 ولاية الأصلية بالأسعار الافتراضية؟')) {
      return;
    }
    const stdCost = Number(formData.standardShippingCost) || 600;
    const defaultList = getDefaultWilayas(stdCost);
    const updatedRates: Record<string, number> = {};
    defaultList.forEach(w => {
      updatedRates[w.name] = w.price;
    });

    setFormData(prev => ({
      ...prev,
      wilayas: defaultList,
      wilayaShippingRates: updatedRates
    }));
    showToast('تم الاسترجاع', 'تمت استعادة قائمة الـ 69 ولاية الجزائرية الافتراضية بنجاح', 'success');
  };

  // Filtered by search
  const filteredWilayas = formData.wilayas.filter(w =>
    w.name.toLowerCase().includes(wilayaSearch.toLowerCase().trim())
  );

  // --- FAQ Handlers ---
  const handleAddFaq = () => {
    const q = newFaqQuestion.trim();
    const a = newFaqAnswer.trim();
    if (!q || !a) {
      showToast('بيانات ناقصة', 'يرجى كتابة نص السؤال ونص الإجابة معاً', 'error');
      return;
    }
    const newId = `faq-${Date.now()}`;
    const newObj: FaqItem = { id: newId, question: q, answer: a };
    setFormData(prev => ({
      ...prev,
      faqs: [...(prev.faqs || []), newObj]
    }));
    setNewFaqQuestion('');
    setNewFaqAnswer('');
    setIsAddingFaq(false);
    showToast('تمت الإضافة', 'تمت إضافة السؤال بنجاح إلى القائمة', 'success');
  };

  const handleStartEditFaq = (faq: FaqItem) => {
    setEditingFaqId(faq.id);
    setEditingFaqQuestion(faq.question);
    setEditingFaqAnswer(faq.answer);
  };

  const handleSaveEditFaq = (id: string) => {
    const q = editingFaqQuestion.trim();
    const a = editingFaqAnswer.trim();
    if (!q || !a) {
      showToast('خطأ', 'لا يمكن ترك السؤال أو الإجابة فارغين', 'error');
      return;
    }
    setFormData(prev => ({
      ...prev,
      faqs: (prev.faqs || []).map(f => f.id === id ? { ...f, question: q, answer: a } : f)
    }));
    setEditingFaqId(null);
    showToast('تم التحديث', 'تم حفظ تعديلات السؤال والإجابة بنجاح', 'success');
  };

  const handleDeleteFaq = (id: string, q: string) => {
    if (!window.confirm(`هل أنت متأكد من حذف هذا السؤال: "${q}"؟`)) {
      return;
    }
    setFormData(prev => ({
      ...prev,
      faqs: (prev.faqs || []).filter(f => f.id !== id)
    }));
    showToast('تم الحذف', 'تم حذف السؤال من قائمة الأسئلة الشائعة', 'info');
  };

  const handleResetDefaultFaqs = () => {
    if (!window.confirm('هل تود استرجاع قائمة الأسئلة الشائعة الافتراضية؟')) {
      return;
    }
    setFormData(prev => ({
      ...prev,
      faqs: getDefaultFaqs()
    }));
    showToast('تم الاسترجاع', 'تم استرجاع الأسئلة الشائعة الافتراضية بنجاح', 'success');
  };

  const filteredFaqs = (formData.faqs || []).filter(f =>
    f.question.toLowerCase().includes(faqSearch.toLowerCase().trim()) ||
    f.answer.toLowerCase().includes(faqSearch.toLowerCase().trim())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Keep rates in sync
      const syncRates: Record<string, number> = {};
      formData.wilayas.forEach(w => {
        syncRates[w.name] = w.price;
      });

      const payload = {
        ...formData,
        wilayaShippingRates: syncRates
      };

      const res = await apiRequest<{ success: boolean; data: any }>('/settings', {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      if (res.success) {
        setIsSaved(true);
        showToast('تم حفظ الإعدادات', 'تم تحديث الإعدادات والولايات والأسئلة الشائعة بنجاح', 'success');
        setTimeout(() => setIsSaved(false), 3000);
      }
    } catch (err: any) {
      showToast('فشل الحفظ', err.message || 'تعذر حفظ الإعدادات', 'error');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-accent">{t('settingsBadge')}</span>
        <h1 className="font-serif text-3xl font-light text-dark mt-1">
          {t('settingsTitle')}
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          إدارة هوية المتجر، وسائل التواصل، وإضافة وتعديل ولايات الوطن وتحديد تكلفة التوصيل لكل ولاية
        </p>
      </div>

      {isSaved && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>تم حفظ وتحديث إعدادات المتجر وقائمة الولايات بنجاح.</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Brand Info */}
        <div className="bg-white rounded-3xl border border-brand-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 pb-4 border-b border-brand-200">
            <Building2 className="w-5 h-5 text-accent" />
            <h3 className="font-serif text-xl font-light text-dark">معلومات المتجر وهوية العلامة</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="block font-bold text-neutral-700 mb-1">{t('storeName')}</label>
              <input
                type="text"
                required
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full p-3 bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">البريد الإلكتروني للإدارة</label>
              <input
                type="email"
                required
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full p-3 bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent font-medium font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">رقم الهاتف وواتساب المتجر</label>
              <input
                type="text"
                required
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full p-3 bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent font-medium font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-neutral-700 mb-1">{t('flagshipAddress')}</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-3 bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent font-medium"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-neutral-700 mb-1">الشريط الإعلاني أعلى الموقع</label>
              <textarea
                rows={2}
                required
                value={formData.announcementText}
                onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
                className="w-full p-3 bg-brand-50 border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent font-medium text-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Logistics & Dynamic Wilaya-by-Wilaya Shipping Costs */}
        <div className="bg-white rounded-3xl border border-brand-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-200">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-accent shrink-0" />
              <div>
                <h3 className="font-serif text-xl font-light text-dark">إدارة وتخصيص ولايات وتكاليف الشحن</h3>
                <p className="text-[11px] text-neutral-500 mt-0.5">يمكنك إضافة ولايات جديدة، تعديل اسم أي ولاية، وضبط تكلفة التوصيل لكل ولاية</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsAddingWilaya(true)}
              className="px-4 py-2 bg-dark hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer shrink-0 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 text-accent" />
              <span>إضافة ولاية جديدة</span>
            </button>
          </div>

          {/* Modal / Inline form for Adding a new Wilaya */}
          <AnimatePresence>
            {isAddingWilaya && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-5 bg-brand-100/70 border border-brand-300 rounded-2xl space-y-3 overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-dark flex items-center gap-2">
                    <Plus className="w-4 h-4 text-accent" />
                    إضافة ولاية أو منطقة توصيل جديدة
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsAddingWilaya(false)}
                    className="p-1 hover:bg-brand-200 rounded-full text-neutral-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end text-xs">
                  <div className="sm:col-span-6">
                    <label className="block font-bold text-neutral-700 mb-1">اسم الولاية (الرقم والاسم باللغتين أو العربية):</label>
                    <input
                      type="text"
                      placeholder="مثال: 70 - ولاية النور (El Nour)"
                      value={newWilayaName}
                      onChange={(e) => setNewWilayaName(e.target.value)}
                      className="w-full p-2.5 bg-white border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent font-medium text-xs"
                      autoFocus
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block font-bold text-neutral-700 mb-1">تكلفة التوصيل (د.ج):</label>
                    <input
                      type="number"
                      min="0"
                      step="50"
                      value={newWilayaPrice}
                      onChange={(e) => setNewWilayaPrice(Number(e.target.value))}
                      className="w-full p-2.5 bg-white border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent font-bold text-xs"
                    />
                  </div>

                  <div className="sm:col-span-3 flex gap-2">
                    <button
                      type="button"
                      onClick={handleAddWilaya}
                      className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" /> إضافة للقائمة
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingWilaya(false)}
                      className="px-3 py-2.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Global standard cost & free shipping threshold */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs p-4 rounded-2xl bg-brand-50 border border-brand-200">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                التكلفة الافتراضية للتوصيل (د.ج)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  step="50"
                  required
                  value={formData.standardShippingCost}
                  onChange={(e) => setFormData({ ...formData, standardShippingCost: Number(e.target.value) })}
                  className="w-full p-2.5 bg-white border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent font-bold"
                />
                <button
                  type="button"
                  onClick={handleApplyStandardToAll}
                  className="px-3 py-2 bg-accent hover:bg-accent-hover text-dark rounded-xl font-bold whitespace-nowrap text-[11px] transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <RefreshCw className="w-3 h-3" /> تطبيق على كل الولايات
                </button>
              </div>
              <p className="text-[10px] text-neutral-500 mt-1">يُطبّق هذا السعر كقيمة افتراضية عند إضافة ولايات جديدة أو للولايات غير المعدلة</p>
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                الحد الأدنى للشحن المجاني (د.ج)
              </label>
              <input
                type="number"
                min="0"
                step="500"
                required
                value={formData.freeShippingThreshold}
                onChange={(e) => setFormData({ ...formData, freeShippingThreshold: Number(e.target.value) })}
                className="w-full p-2.5 bg-white border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent font-bold"
              />
              <p className="text-[10px] text-neutral-500 mt-1">ضع 0 إذا كنت لا ترغب في تفعيل الشحن المجاني التلقائي</p>
            </div>
          </div>

          {/* Wilayas List with Search, Rename, and Individual Price Inputs */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-3">
                <h4 className="font-bold text-dark text-xs">قائمة الولايات ومناطق التوصيل المسجلة:</h4>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-dark text-white">
                  {formData.wilayas.length} ولاية
                </span>
                <button
                  type="button"
                  onClick={handleResetToDefaultWilayas}
                  className="text-[11px] text-neutral-500 hover:text-accent font-semibold flex items-center gap-1 transition-colors cursor-pointer mr-2"
                  title="استعادة قائمة الـ 69 ولاية الأصلية"
                >
                  <RotateCcw className="w-3 h-3" /> استرجاع الـ 69 ولاية الأصلية
                </button>
              </div>

              <div className="relative max-w-xs w-full">
                <Search className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="ابحث عن ولاية (مثال: تلمسان، الجزائر...)"
                  value={wilayaSearch}
                  onChange={(e) => setWilayaSearch(e.target.value)}
                  className="w-full pl-3 pr-8 py-1.5 bg-brand-50 border border-brand-200 rounded-xl text-xs focus:outline-none focus:border-accent text-right"
                />
              </div>
            </div>

            {filteredWilayas.length === 0 ? (
              <div className="py-12 text-center text-neutral-500 text-xs bg-brand-50 rounded-2xl border border-brand-200">
                لا توجد ولاية تطابق كلمة البحث "{wilayaSearch}". يمكنك النقر على زر "إضافة ولاية جديدة" أعلاه لإضافتها.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[420px] overflow-y-auto p-1 border border-brand-200/80 rounded-2xl bg-brand-50/50">
                {filteredWilayas.map((wilaya) => {
                  const isEditingThis = editingWilayaId === wilaya.id;

                  return (
                    <div
                      key={wilaya.id}
                      className="p-3 bg-white rounded-xl border border-brand-200 flex flex-col justify-between gap-2 shadow-2xs hover:border-accent/60 transition-all group"
                    >
                      {isEditingThis ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editingWilayaName}
                            onChange={(e) => setEditingWilayaName(e.target.value)}
                            className="w-full p-2 bg-brand-50 border border-accent rounded-lg text-xs font-semibold text-dark focus:outline-none"
                            autoFocus
                          />
                          <div className="flex gap-1 justify-end">
                            <button
                              type="button"
                              onClick={() => handleSaveRename(wilaya.id)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Check className="w-3 h-3" /> حفظ الاسم
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingWilayaId(null)}
                              className="px-2 py-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 rounded-md text-[10px] font-semibold cursor-pointer"
                            >
                              إلغاء
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold text-dark text-xs truncate flex-1" title={wilaya.name}>
                            {wilaya.name}
                          </p>
                          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => handleStartRename(wilaya)}
                              className="p-1 text-neutral-400 hover:text-accent hover:bg-brand-50 rounded transition-colors cursor-pointer"
                              title="تعديل اسم الولاية"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteWilaya(wilaya.id, wilaya.name)}
                              className="p-1 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                              title="حذف الولاية"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-brand-100">
                        <span className="text-[10px] text-neutral-400">
                          {wilaya.price === 0 ? 'توصيل مجاني' : `${Number(wilaya.price).toLocaleString('ar-DZ')} د.ج`}
                        </span>

                        <div className="w-28 shrink-0 flex items-center gap-1 bg-brand-50 px-2 py-1 rounded-lg border border-brand-200">
                          <input
                            type="number"
                            min="0"
                            step="50"
                            value={wilaya.price}
                            onChange={(e) => handleWilayaPriceChange(wilaya.id, Number(e.target.value))}
                            className="w-full bg-transparent text-xs font-bold text-dark text-center focus:outline-none"
                          />
                          <span className="text-[10px] text-neutral-500 font-semibold shrink-0">د.ج</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* --- FAQ Management Section --- */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-200 shadow-luxury space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-brand-100 rounded-2xl">
                <HelpCircle className="w-5 h-5 text-dark" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-dark">
                  الأسئلة الشائعة (FAQ) المعروضة للزبائن
                </h3>
                <p className="text-xs text-neutral-500">
                  تحكّم كامل في إجابات الأسئلة المتكررة التي تظهر في نافذة FAQ للزبائن في المتجر
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsAddingFaq(true)}
              className="px-4 py-2.5 bg-dark hover:bg-neutral-800 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shadow-sm"
            >
              <Plus className="w-4 h-4 text-accent" />
              <span>إضافة سؤال شائع جديد</span>
            </button>
          </div>

          {/* Modal / Inline form for Adding a new FAQ */}
          <AnimatePresence>
            {isAddingFaq && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-5 bg-brand-100/70 border border-brand-300 rounded-2xl space-y-4 overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-dark flex items-center gap-2">
                    <Plus className="w-4 h-4 text-accent" />
                    إضافة سؤال شائع جديد
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsAddingFaq(false)}
                    className="p-1 hover:bg-brand-200 rounded-full text-neutral-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">نص السؤال *</label>
                    <input
                      type="text"
                      placeholder="مثال: كيف أختار المقاس المناسب؟"
                      value={newFaqQuestion}
                      onChange={(e) => setNewFaqQuestion(e.target.value)}
                      className="w-full p-2.5 bg-white border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent font-semibold text-xs"
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">نص الإجابة والتوضيح *</label>
                    <textarea
                      rows={3}
                      placeholder="اكتب الإجابة المفصلة التي ستظهر للزبون عند قراءة هذا السؤال..."
                      value={newFaqAnswer}
                      onChange={(e) => setNewFaqAnswer(e.target.value)}
                      className="w-full p-2.5 bg-white border border-brand-200 rounded-xl text-dark focus:outline-none focus:border-accent font-medium text-xs leading-relaxed resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAddingFaq(false)}
                      className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                    >
                      إلغاء
                    </button>
                    <button
                      type="button"
                      onClick={handleAddFaq}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Check className="w-4 h-4" /> إضافة السؤال للأسئلة الشائعة
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search & Reset bar for FAQs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-3">
              <h4 className="font-bold text-dark text-xs">قائمة الأسئلة الشائعة المسجلة:</h4>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-dark text-white">
                {(formData.faqs || []).length} سؤال
              </span>
              <button
                type="button"
                onClick={handleResetDefaultFaqs}
                className="text-[11px] text-neutral-500 hover:text-accent font-semibold flex items-center gap-1 transition-colors cursor-pointer mr-2"
                title="استرجاع الأسئلة الافتراضية"
              >
                <RotateCcw className="w-3 h-3" /> استرجاع الأسئلة الافتراضية
              </button>
            </div>

            <div className="relative max-w-xs w-full">
              <Search className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="ابحث في الأسئلة أو الإجابات..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full pl-3 pr-8 py-1.5 bg-brand-50 border border-brand-200 rounded-xl text-xs focus:outline-none focus:border-accent text-right"
              />
            </div>
          </div>

          {/* FAQs List */}
          {filteredFaqs.length === 0 ? (
            <div className="py-12 text-center text-neutral-500 text-xs bg-brand-50 rounded-2xl border border-brand-200">
              لا توجد أسئلة تطابق البحث. يمكنك النقر على "إضافة سؤال شائع جديد" أعلاه.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => {
                const isEditingThis = editingFaqId === faq.id;

                return (
                  <div
                    key={faq.id || index}
                    className="p-4 bg-brand-50/60 rounded-2xl border border-brand-200 shadow-2xs hover:border-accent/60 transition-all group space-y-2"
                  >
                    {isEditingThis ? (
                      <div className="space-y-3 p-1">
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-700 mb-1">نص السؤال:</label>
                          <input
                            type="text"
                            value={editingFaqQuestion}
                            onChange={(e) => setEditingFaqQuestion(e.target.value)}
                            className="w-full p-2.5 bg-white border border-accent rounded-xl text-xs font-semibold text-dark focus:outline-none"
                            autoFocus
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-neutral-700 mb-1">نص الإجابة:</label>
                          <textarea
                            rows={3}
                            value={editingFaqAnswer}
                            onChange={(e) => setEditingFaqAnswer(e.target.value)}
                            className="w-full p-2.5 bg-white border border-accent rounded-xl text-xs font-medium text-dark focus:outline-none leading-relaxed resize-none"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setEditingFaqId(null)}
                            className="px-3 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            إلغاء
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveEditFaq(faq.id)}
                            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" /> حفظ التعديل
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1.5 flex-1">
                          <h4 className="font-serif font-bold text-dark text-xs sm:text-sm flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-brand-200 text-dark text-[10px] font-bold flex items-center justify-center shrink-0">
                              {index + 1}
                            </span>
                            <span>{faq.question}</span>
                          </h4>
                          <p className="text-xs text-neutral-600 leading-relaxed mr-7">
                            {faq.answer}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => handleStartEditFaq(faq)}
                            className="p-1.5 text-neutral-500 hover:text-accent hover:bg-white rounded-lg transition-colors cursor-pointer border border-transparent hover:border-brand-200"
                            title="تعديل السؤال والإجابة"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteFaq(faq.id, faq.question)}
                            className="p-1.5 text-neutral-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-rose-200"
                            title="حذف السؤال"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-8 py-3.5 bg-dark hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 shadow-luxury cursor-pointer"
          >
            <Save className="w-4 h-4 text-accent" />
            <span>حفظ جميع الإعدادات والأسئلة الشائعة</span>
          </motion.button>
        </div>
      </form>
    </div>
  );
};



