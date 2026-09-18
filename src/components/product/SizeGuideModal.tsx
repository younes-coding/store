import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [tab, setTab] = useState<'suits' | 'shirts' | 'trousers'>('suits');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-dark/70 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 z-10 shadow-2xl border border-brand-200"
        >
          <div className="flex items-center justify-between pb-4 border-b border-brand-200">
            <div className="flex items-center gap-3">
              <Ruler className="w-5 h-5 text-accent" />
              <h3 className="font-serif text-2xl font-light text-dark">
                {language === 'ar' ? 'دليل مقاسات الملابس الكلاسيكية الرجالية' : "Younes Shop — Men's Sartorial Size Guide"}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-dark rounded-full hover:bg-brand-100 transition-colors"
              aria-label="Close Size Guide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-4 space-y-4">
            <div className="flex gap-2 sm:gap-4 border-b border-brand-200 pb-2 overflow-x-auto">
              <button
                onClick={() => setTab('suits')}
                className={`text-xs font-semibold uppercase tracking-wider pb-2 border-b-2 transition-colors whitespace-nowrap ${
                  tab === 'suits' ? 'border-dark text-dark font-bold' : 'border-transparent text-neutral-400 hover:text-dark'
                }`}
              >
                {language === 'ar' ? 'البدلات والبليزرات' : "Suits & Tailoring"}
              </button>
              <button
                onClick={() => setTab('shirts')}
                className={`text-xs font-semibold uppercase tracking-wider pb-2 border-b-2 transition-colors whitespace-nowrap ${
                  tab === 'shirts' ? 'border-dark text-dark font-bold' : 'border-transparent text-neutral-400 hover:text-dark'
                }`}
              >
                {language === 'ar' ? 'القمصان والتريكو' : "Shirts & Knitwear"}
              </button>
              <button
                onClick={() => setTab('trousers')}
                className={`text-xs font-semibold uppercase tracking-wider pb-2 border-b-2 transition-colors whitespace-nowrap ${
                  tab === 'trousers' ? 'border-dark text-dark font-bold' : 'border-transparent text-neutral-400 hover:text-dark'
                }`}
              >
                {language === 'ar' ? 'البناطيل الصوفية' : "Wool Trousers"}
              </button>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              {language === 'ar'
                ? 'جميع القياسات مطابقة لمعايير الخياطة الإنجليزية والإيطالية الكلاسيكية للرجال (Savile Row & Neapolitan Cut). ننصح باختيار مقاسك المعتاد للحصول على مظهر أرستقراطي متناسق.'
                : 'All measurements adhere to authentic Savile Row and Neapolitan men’s tailoring standards. For tailored bespoke drape, select your true chest size.'}
            </p>

            {tab === 'suits' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right text-xs">
                  <thead>
                    <tr className="border-b border-brand-200 bg-brand-50 text-dark font-semibold">
                      <th className="py-3 px-4">{language === 'ar' ? 'المقاس' : 'Size (EU / UK)'}</th>
                      <th className="py-3 px-4">{language === 'ar' ? 'محيط الصدر' : 'Chest (in / cm)'}</th>
                      <th className="py-3 px-4">{language === 'ar' ? 'الخصر' : 'Waist (in / cm)'}</th>
                      <th className="py-3 px-4">{language === 'ar' ? 'الكتف' : 'Shoulders (in / cm)'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-100 text-neutral-600">
                    <tr>
                      <td className="py-3 px-4 font-bold text-dark">46 EU (36 UK - S)</td>
                      <td className="py-3 px-4">36-37" / 92-95 cm</td>
                      <td className="py-3 px-4">30-31" / 76-79 cm</td>
                      <td className="py-3 px-4">17.5" / 44.5 cm</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-dark">48 EU (38 UK - M)</td>
                      <td className="py-3 px-4">38-39" / 96-99 cm</td>
                      <td className="py-3 px-4">32-33" / 81-84 cm</td>
                      <td className="py-3 px-4">18.0" / 45.7 cm</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-dark">50 EU (40 UK - L)</td>
                      <td className="py-3 px-4">40-41" / 100-104 cm</td>
                      <td className="py-3 px-4">34-35" / 86-89 cm</td>
                      <td className="py-3 px-4">18.5" / 47.0 cm</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-dark">52 EU (42 UK - XL)</td>
                      <td className="py-3 px-4">42-43" / 105-109 cm</td>
                      <td className="py-3 px-4">36-37" / 91-95 cm</td>
                      <td className="py-3 px-4">19.0" / 48.3 cm</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-dark">54 EU (44 UK - XXL)</td>
                      <td className="py-3 px-4">44-45" / 110-115 cm</td>
                      <td className="py-3 px-4">38-40" / 96-102 cm</td>
                      <td className="py-3 px-4">19.5" / 49.5 cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {tab === 'shirts' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right text-xs">
                  <thead>
                    <tr className="border-b border-brand-200 bg-brand-50 text-dark font-semibold">
                      <th className="py-3 px-4">{language === 'ar' ? 'المقاس' : 'Collar Size'}</th>
                      <th className="py-3 px-4">{language === 'ar' ? 'محيط الياقة' : 'Neck (in / cm)'}</th>
                      <th className="py-3 px-4">{language === 'ar' ? 'الصدر' : 'Chest (in / cm)'}</th>
                      <th className="py-3 px-4">{language === 'ar' ? 'طول الكم' : 'Sleeve (in / cm)'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-100 text-neutral-600">
                    <tr>
                      <td className="py-3 px-4 font-bold text-dark">38 EU (15" UK - S)</td>
                      <td className="py-3 px-4">15.0" / 38 cm</td>
                      <td className="py-3 px-4">38" / 96 cm</td>
                      <td className="py-3 px-4">34" / 86 cm</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-dark">39 EU (15.5" UK - M)</td>
                      <td className="py-3 px-4">15.5" / 39.5 cm</td>
                      <td className="py-3 px-4">40" / 102 cm</td>
                      <td className="py-3 px-4">34.5" / 88 cm</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-dark">40 EU (16" UK - L)</td>
                      <td className="py-3 px-4">16.0" / 41 cm</td>
                      <td className="py-3 px-4">42" / 107 cm</td>
                      <td className="py-3 px-4">35" / 89 cm</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-dark">41 EU (16.5" UK - XL)</td>
                      <td className="py-3 px-4">16.5" / 42 cm</td>
                      <td className="py-3 px-4">44" / 112 cm</td>
                      <td className="py-3 px-4">35.5" / 90 cm</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-dark">42 EU (17" UK - XXL)</td>
                      <td className="py-3 px-4">17.0" / 43.5 cm</td>
                      <td className="py-3 px-4">46" / 117 cm</td>
                      <td className="py-3 px-4">36" / 91 cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {tab === 'trousers' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right text-xs">
                  <thead>
                    <tr className="border-b border-brand-200 bg-brand-50 text-dark font-semibold">
                      <th className="py-3 px-4">{language === 'ar' ? 'المقاس' : 'Waist Size'}</th>
                      <th className="py-3 px-4">{language === 'ar' ? 'محيط الخصر' : 'Waist (in / cm)'}</th>
                      <th className="py-3 px-4">{language === 'ar' ? 'طول الساق الداخلي' : 'Inseam (in / cm)'}</th>
                      <th className="py-3 px-4">{language === 'ar' ? 'عرض الفخذ' : 'Thigh (in / cm)'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-100 text-neutral-600">
                    <tr>
                      <td className="py-3 px-4 font-bold text-dark">46 EU (30W)</td>
                      <td className="py-3 px-4">30-31" / 76-79 cm</td>
                      <td className="py-3 px-4">32" / 81 cm</td>
                      <td className="py-3 px-4">24" / 61 cm</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-dark">48 EU (32W)</td>
                      <td className="py-3 px-4">32-33" / 81-84 cm</td>
                      <td className="py-3 px-4">32" / 81 cm</td>
                      <td className="py-3 px-4">25" / 63 cm</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-dark">50 EU (34W)</td>
                      <td className="py-3 px-4">34-35" / 86-89 cm</td>
                      <td className="py-3 px-4">33" / 84 cm</td>
                      <td className="py-3 px-4">26" / 66 cm</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-dark">52 EU (36W)</td>
                      <td className="py-3 px-4">36-37" / 91-95 cm</td>
                      <td className="py-3 px-4">33" / 84 cm</td>
                      <td className="py-3 px-4">27" / 68 cm</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-dark">54 EU (38W)</td>
                      <td className="py-3 px-4">38-40" / 96-102 cm</td>
                      <td className="py-3 px-4">34" / 86 cm</td>
                      <td className="py-3 px-4">28" / 71 cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-brand-200 text-center">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-dark text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
            >
              {language === 'ar' ? 'فهمت، شكراً لك' : 'Got It, Thank You'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
