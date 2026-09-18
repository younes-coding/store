import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Truck, RotateCcw, HelpCircle, PhoneCall, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { type FaqItem, DEFAULT_FAQS } from '../../data/faqs';

export type PolicyType = 'shipping' | 'returns' | 'authenticity' | 'contact' | 'faq' | null;

interface PolicyModalProps {
  type: PolicyType;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  const [storeSettings, setStoreSettings] = useState({
    contactEmail: 'bounouayounes560@gmail.com',
    contactPhone: '0657533005',
    address: 'تلمسان، الجزائر',
    faqs: DEFAULT_FAQS as FaqItem[]
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${API_BASE}/settings`);
        const data = await res.json();
        if (data.success && data.data) {
          setStoreSettings({
            contactEmail: data.data.contactEmail || 'bounouayounes560@gmail.com',
            contactPhone: data.data.contactPhone || '0657533005',
            address: data.data.address || 'تلمسان، الجزائر',
            faqs: Array.isArray(data.data.faqs) && data.data.faqs.length > 0 ? data.data.faqs : DEFAULT_FAQS
          });
        }
      } catch (e) {
        console.warn('Could not fetch dynamic policy settings, using defaults');
      }
    };

    if (type) {
      fetchSettings();
    }
  }, [type]);

  if (!type) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 text-right">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-dark/70 backdrop-blur-sm"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-brand-200 z-10 max-h-[85vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute left-6 top-6 p-2 rounded-full bg-brand-100 text-neutral-500 hover:text-dark transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content Based on Type */}
          {type === 'shipping' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-accent">
                <div className="p-3 bg-brand-100 rounded-2xl">
                  <Truck className="w-6 h-6 text-dark" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-dark">سياسة التوصيل والشحن الملكي</h3>
                  <p className="text-xs text-neutral-500">تغطية شاملة لكافة ولايات الجزائر (69 ولاية)</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-neutral-600 leading-relaxed">
                <div className="p-4 bg-brand-50 rounded-2xl border border-brand-200 space-y-2">
                  <h4 className="font-bold text-dark flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    مدة التوصيل:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 mr-2">
                    <li><strong>الجزائر العاصمة والولايات الكبرى (وهران، قسنطينة، سطيف، تلمسان):</strong> خلال 24 إلى 48 ساعة فقط.</li>
                    <li><strong>باقي ولايات الشمال والهضاب العليا:</strong> خلال 2 إلى 4 أيام عمل.</li>
                    <li><strong>ولايات الجنوب والصحراء:</strong> خلال 3 إلى 6 أيام عمل عبر خطوط شحن مؤمنة.</li>
                  </ul>
                </div>

                <div className="p-4 bg-brand-50 rounded-2xl border border-brand-200 space-y-2">
                  <h4 className="font-bold text-dark flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    المعاينة قبل الدفع:
                  </h4>
                  <p>
                    نمنح لجميع عملائنا الكرام حق فتح وتفقد الطرد بحضور مندوب التوصيل للتأكد من مطابقة الأقمشة والمقاسات قبل تسليم المبلغ (الدفع عند الاستلام).
                  </p>
                </div>

                <div className="p-4 bg-brand-50 rounded-2xl border border-brand-200 space-y-2">
                  <h4 className="font-bold text-dark flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    التغليف الملكي الفاخر:
                  </h4>
                  <p>
                    تصل جميع الطلبات في علب صلبة مقاومة للصدمات، معطرة ومغلفة بورق الحرير وشريط ساتان فاخر مع حقيبة يد مخصصة لحفظ القطع.
                  </p>
                </div>
              </div>
            </div>
          )}

          {type === 'returns' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-accent">
                <div className="p-3 bg-brand-100 rounded-2xl">
                  <RotateCcw className="w-6 h-6 text-dark" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-dark">سياسة الاستبدال والإرجاع</h3>
                  <p className="text-xs text-neutral-500">ضمان الرضا الكامل بنسبة 100%</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-neutral-600 leading-relaxed">
                <p>
                  نحن في <strong>يونس سارتوريال (YOUNES SARTORIAL)</strong> نثق تماماً بجودة خياطتنا وأقمشتنا، لذلك نوفر سياسة استبدال مرنة وسهلة:
                </p>

                <div className="p-4 bg-brand-50 rounded-2xl border border-brand-200 space-y-2">
                  <h4 className="font-bold text-dark">شروط الاستبدال:</h4>
                  <ul className="list-disc list-inside space-y-1.5 mr-2">
                    <li>إمكانية طلب تغيير المقاس أو استبدال القطعة خلال <strong>3 أيام</strong> من تاريخ الاستلام.</li>
                    <li>أن تكون القطعة في حالتها الأصلية غير ملبوسة وغير مغسولة وتحمل كافة الملصقات (Tags).</li>
                    <li>يتم إرسال مندوب التوصيل لاستلام القطعة المستبدلة وتسليمك المقاس الجديد مباشرة عند بابك.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {type === 'authenticity' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-accent">
                <div className="p-3 bg-brand-100 rounded-2xl">
                  <ShieldCheck className="w-6 h-6 text-dark" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-dark">ضمان الأصالة والجودة النبيلة</h3>
                  <p className="text-xs text-neutral-500">خامات نبيلة بمعايير الأزياء الراقية (Old Money)</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-neutral-600 leading-relaxed">
                <div className="p-4 bg-brand-50 rounded-2xl border border-brand-200 space-y-2">
                  <h4 className="font-bold text-dark">أصل الأقمشة:</h4>
                  <p>
                    نستورد أقمشتنا مباشرة من أرقى المصانع العريقة: الكشمير المنغولي الطبيعي، القطن المصري البوبلين فائق النعومة 120s، الصوف الإيطالي الخفيف، والكتان الإيرلندي النقي.
                  </p>
                </div>

                <div className="p-4 bg-brand-50 rounded-2xl border border-brand-200 space-y-2">
                  <h4 className="font-bold text-dark">الخياطة والأزرار:</h4>
                  <p>
                    جميع أزرار القمصان والبدلات مصنوعة من الصدف الطبيعي المستخرج (Mother-of-Pearl) ومثبتة بحياكة متقاطعة يدوية تمنح متانة وفخامة لا تضاهى.
                  </p>
                </div>
              </div>
            </div>
          )}

          {type === 'contact' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-accent">
                <div className="p-3 bg-brand-100 rounded-2xl">
                  <PhoneCall className="w-6 h-6 text-dark" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-dark">خدمة العملاء والكونسيرج الخاص</h3>
                  <p className="text-xs text-neutral-500">فريق مستشاري الأناقة متواجد دائماً لخدمتك</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-4 p-4 bg-brand-50 rounded-2xl border border-brand-200">
                  <PhoneCall className="w-5 h-5 text-accent shrink-0" />
                  <div>
                    <h5 className="font-bold text-dark">رقم الهاتف</h5>
                    <p className="text-neutral-500 font-mono mt-0.5" dir="ltr">{storeSettings.contactPhone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-brand-50 rounded-2xl border border-brand-200">
                  <Mail className="w-5 h-5 text-accent shrink-0" />
                  <div>
                    <h5 className="font-bold text-dark">البريد الإلكتروني</h5>
                    <p className="text-neutral-500 font-mono mt-0.5">{storeSettings.contactEmail}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-brand-50 rounded-2xl border border-brand-200">
                  <MapPin className="w-5 h-5 text-accent shrink-0" />
                  <div>
                    <h5 className="font-bold text-dark">المقر الرئيسي</h5>
                    <p className="text-neutral-500 mt-0.5">{storeSettings.address}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => window.open(`https://wa.me/213${storeSettings.contactPhone.replace(/^0/, '').replace(/\s+/g, '')}`, '_blank')}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                محادثة مباشرة عبر WhatsApp
              </button>
            </div>
          )}

          {type === 'faq' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-accent">
                <div className="p-3 bg-brand-100 rounded-2xl">
                  <HelpCircle className="w-6 h-6 text-dark" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-dark">الأسئلة الشائعة (FAQ)</h3>
                  <p className="text-xs text-neutral-500">إجابات فورية لأكثر الاستفسارات شيوعاً</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-neutral-600">
                {storeSettings.faqs.map((faq, idx) => (
                  <div key={faq.id || idx} className="p-4 bg-brand-50 rounded-2xl border border-brand-200 space-y-1.5 transition-all hover:border-brand-300">
                    <h4 className="font-bold text-dark text-xs sm:text-sm">{faq.question}</h4>
                    <p className="leading-relaxed text-neutral-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Close Button Footer */}
          <div className="mt-8 pt-4 border-t border-brand-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-dark text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              إغلاق
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
