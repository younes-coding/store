import React, { useState } from 'react';
import { MapPin, ArrowRight, MessageCircle, Truck, RotateCcw, ShieldCheck, PhoneCall } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';
import { type ViewMode } from './Navbar';

interface FooterProps {
  onNavigate: (view: ViewMode, category?: string) => void;
  onOpenPolicy: (type: 'shipping' | 'returns' | 'authenticity' | 'contact' | 'faq') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPolicy }) => {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();
  const { t } = useLanguage();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast(t('joinButton'), 'شكراً لانضمامك إلى مجتمع يونس سارتوريال للأناقة الراقية.', 'success');
    setEmail('');
  };

  const handleWhatsAppChat = () => {
    const msg = encodeURIComponent('مرحباً يونس سارتوريال، أود الاستفسار عن التشكيلات الفاخرة.');
    window.open(`https://wa.me/213657533005?text=${msg}`, '_blank');
  };

  return (
    <footer className="bg-dark text-brand-100 pt-16 pb-12 border-t border-neutral-800 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Badges Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-neutral-800">
          <button
            onClick={() => onOpenPolicy('shipping')}
            className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-accent/40 transition-colors text-right cursor-pointer"
          >
            <Truck className="w-6 h-6 text-accent shrink-0" />
            <div>
              <h5 className="text-xs font-bold text-white">توصيل لـ 69 ولاية</h5>
              <p className="text-[11px] text-neutral-400">معاينة قبل الدفع</p>
            </div>
          </button>

          <button
            onClick={() => onOpenPolicy('returns')}
            className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-accent/40 transition-colors text-right cursor-pointer"
          >
            <RotateCcw className="w-6 h-6 text-accent shrink-0" />
            <div>
              <h5 className="text-xs font-bold text-white">استبدال سهل</h5>
              <p className="text-[11px] text-neutral-400">ضمان الرضا 100%</p>
            </div>
          </button>

          <button
            onClick={() => onOpenPolicy('authenticity')}
            className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-accent/40 transition-colors text-right cursor-pointer"
          >
            <ShieldCheck className="w-6 h-6 text-accent shrink-0" />
            <div>
              <h5 className="text-xs font-bold text-white">أقمشة نبيلة أصلية</h5>
              <p className="text-[11px] text-neutral-400">كشمير وصوف مصري وإيطالي</p>
            </div>
          </button>

          <button
            onClick={() => onOpenPolicy('contact')}
            className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-accent/40 transition-colors text-right cursor-pointer"
          >
            <PhoneCall className="w-6 h-6 text-accent shrink-0" />
            <div>
              <h5 className="text-xs font-bold text-white">خدمة العملاء</h5>
              <p className="text-[11px] text-neutral-400">0657533005</p>
            </div>
          </button>
        </div>

        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-[0.15em] uppercase block">
              YOUNES SARTORIAL
            </span>
            <span className="text-xs tracking-[0.25em] text-accent font-bold uppercase block">
              يونس سارتوريال — الفخامة الكلاسيكية الهادئة
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              وجهتكم الأولى للأناقة الأرستقراطية بنمط Old Money الهادئ. نبتكر قطعاً تدمج بين الأصالة الإيطالية والأقمشة النبيلة لتعكس مكانتكم وذوقكم الرفيع.
            </p>
            <div className="flex items-center gap-2 text-accent font-bold text-xs pt-1">
              <MapPin className="w-4 h-4 text-accent shrink-0" />
              <span>المقر الرئيسي: تلمسان، الجزائر</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase pb-2 border-b border-neutral-800">
              أقسام المتجر
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-accent transition-colors cursor-pointer">
                  الرئيسية
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-accent transition-colors cursor-pointer">
                  جميع التشكيلات
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('track')} className="hover:text-accent transition-colors cursor-pointer text-brand-200 font-semibold">
                  تتبع مسار شحنتك
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase pb-2 border-b border-neutral-800">
              خدمة العملاء
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button onClick={() => onOpenPolicy('shipping')} className="hover:text-accent transition-colors cursor-pointer">
                  الشحن لكافة الـ 69 ولاية
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('returns')} className="hover:text-accent transition-colors cursor-pointer">
                  سياسة الاستبدال والإرجاع
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('authenticity')} className="hover:text-accent transition-colors cursor-pointer">
                  ضمان الأصالة والجودة
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('faq')} className="hover:text-accent transition-colors cursor-pointer">
                  الأسئلة الشائعة (FAQ)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('contact')} className="hover:text-accent transition-colors cursor-pointer">
                  تواصل مع الكونسيرج
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase pb-2 border-b border-neutral-800">
              النشرة البريدية الحصرية
            </h4>
            <p className="text-xs text-neutral-400">
              اشترك لتصلك عروض التشكيلات الموسمية الحصرية والأطقم الملكية المحدودة.
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل بريدك الإلكتروني..."
                required
                className="bg-neutral-900 border border-neutral-700 rounded-r-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-accent flex-1 text-right"
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent-hover text-dark font-bold px-5 py-3 rounded-l-xl transition-colors flex items-center gap-1.5 text-xs cursor-pointer shrink-0"
              >
                <span>انضمام</span>
                <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              </button>
            </form>

            {/* Direct WhatsApp Concierge Button */}
            <button
              onClick={handleWhatsAppChat}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>محادثة فورية مع خدمة العملاء عبر WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Clean Bottom Copyright Bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-light gap-4">
          <p>© {new Date().getFullYear()} YOUNES SARTORIAL (يونس سارتوريال للأزياء الكلاسيكية الفاخرة) — جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => onOpenPolicy('returns')} className="hover:text-accent cursor-pointer">الخصوصية والشروط</button>
            <span>•</span>
            <button onClick={() => onOpenPolicy('shipping')} className="hover:text-accent cursor-pointer">التوصيل والدفع</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
