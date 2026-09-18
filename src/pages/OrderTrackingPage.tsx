import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone,
  Smartphone,
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MessageCircle, 
  ArrowRight, 
  MapPin, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface OrderItem {
  name: string;
  price: number;
  selectedColor?: { name?: string; nameAr?: string; hex?: string };
  selectedSize?: string;
  quantity: number;
}

interface TrackedOrder {
  orderId: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
  customer: {
    fullName: string;
    city: string;
    wilaya: string;
    phone: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  totalAmount: number;
}

const STATUS_STEPS = [
  {
    key: 'Pending',
    labelAr: 'تم استلام الطلب',
    labelEn: 'Order Received',
    descAr: 'تم تسجيل طلبك بنجاح وجاري مراجعة التفاصيل والتأكيد.',
    icon: Clock
  },
  {
    key: 'Processing',
    labelAr: 'جاري التجهيز والتغليف الملكي',
    labelEn: 'Processing & Luxury Packaging',
    descAr: 'يجري الآن فحص الأقمشة وتغليف طلبك بشريط سارتوريال الفاخر.',
    icon: Package
  },
  {
    key: 'Shipped',
    labelAr: 'خرج للتوصيل مع المندوب',
    labelEn: 'Out for Delivery',
    descAr: 'تم تسليم شحنتك لشركة الشحن وهي في طريقها إلى عنوانك.',
    icon: Truck
  },
  {
    key: 'Delivered',
    labelAr: 'تم التسليم بنجاح',
    labelEn: 'Delivered Successfully',
    descAr: 'تم تسليم القطع الفاخرة للعميل بنجاح. نتمنى لك تجربة استثنائية!',
    icon: CheckCircle2
  }
];

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const OrderTrackingPage: React.FC<{
  initialOrderId?: string;
  onNavigateToShop: () => void;
}> = ({ initialOrderId = '', onNavigateToShop }) => {
  const { formatPrice } = useCurrency();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [lastOrderPhone, setLastOrderPhone] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedPhone = localStorage.getItem('younes_last_order_phone');
      if (savedPhone) {
        setLastOrderPhone(savedPhone);
      }
      if (initialOrderId) {
        setSearchQuery(initialOrderId);
        fetchTracking(initialOrderId);
      }
    } catch (e) {}
  }, [initialOrderId]);

  const fetchTracking = async (idToTrack: string) => {
    const raw = idToTrack.trim();
    if (!raw) return;

    setIsLoading(true);
    setError(null);

    // Clean query: strip non-alphanumeric except spaces
    const cleanId = raw.replace(/[#\s]/g, '');

    try {
      // 1. Try server tracking by phone / identifier
      const res = await fetch(`${API_BASE}/orders/track/${encodeURIComponent(cleanId || raw)}`);
      const data = await res.json();

      if (res.ok && data.success && data.data) {
        setOrder(data.data);
        setIsLoading(false);
        return;
      } else {
        throw new Error(data.message || 'لم يتم العثور على الطلب');
      }
    } catch (err: any) {
      console.warn('Track order lookup error:', err?.message || err);
      setError(
        `لم نتمكن من العثور على طلب مسجل برقم الهاتف: "${raw}". يرجى التأكد من كتابة نفس رقم الهاتف الذي استخدمته عند تقديم الطلب.`
      );
      setOrder(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchTracking(searchQuery);
    }
  };

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Processing': return 1;
      case 'Shipped': return 2;
      case 'Delivered': return 3;
      default: return 0;
    }
  };

  const currentStepIndex = order ? getStepIndex(order.status) : 0;

  const handleWhatsAppInquiry = () => {
    if (!order) return;
    const msg = encodeURIComponent(
      `مرحباً خدمة عملاء يونس سارتوريال، أود الاستفسار عن حالة طلبي المسجل باسم (${order.customer.fullName}) ورقم الهاتف (${order.customer.phone}).`
    );
    window.open(`https://wa.me/213657533005?text=${msg}`, '_blank');
  };

  const renderPrice = (val: number) => {
    if (val > 1000) {
      return `${Math.round(val).toLocaleString('ar-DZ')} د.ج`;
    }
    return formatPrice(val);
  };

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Breadcrumb & Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <button
          onClick={onNavigateToShop}
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-dark mb-4 transition-colors cursor-pointer"
        >
          <ArrowRight className="w-3.5 h-3.5" /> العودة للتسوق
        </button>
        <span className="block text-[11px] font-bold uppercase tracking-[0.25em] text-accent mb-2 flex items-center justify-center gap-1.5">
          <Smartphone className="w-3.5 h-3.5" />
          <span>نظام التتبع المباشر برقم الهاتف</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-dark font-light mb-3">
          تتبع مسار شحنتك الملكية
        </h1>
        <p className="text-xs text-neutral-600 leading-relaxed max-w-md mx-auto">
          أدخل رقم هاتفك الذي استخدمته أثناء الطلب لمتابعة حالة شحنتك وموعد تسليمها فوراً.
        </p>
      </div>

      {/* Search Bar Box (Focused on Phone Tracking) */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-brand-200 shadow-sm max-w-2xl mx-auto mb-10">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Phone className="w-4 h-4 text-accent absolute right-4 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="أدخل رقم الهاتف المسجل في طلبك (مثال: 0657533005)..."
              className="w-full pr-11 pl-4 py-3.5 text-xs bg-brand-50 border border-brand-200 rounded-2xl focus:outline-none focus:border-accent text-dark font-medium text-right font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !searchQuery.trim()}
            className="px-8 py-3.5 bg-dark hover:bg-neutral-800 text-white rounded-2xl text-xs font-semibold uppercase tracking-wider disabled:bg-neutral-400 transition-colors shrink-0 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'بحث عن طلبيتي'
            )}
          </button>
        </form>

        {/* Quick Phone Helpers */}
        {lastOrderPhone && (
          <div className="mt-4 pt-4 border-t border-brand-100 flex items-center justify-between gap-2 text-[11px] text-neutral-500">
            <span className="text-neutral-400">آخر رقم مستخدم في الطلب:</span>
            <button
              type="button"
              onClick={() => { setSearchQuery(lastOrderPhone); fetchTracking(lastOrderPhone); }}
              className="px-3 py-1 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>📱 استخدام رقمك ({lastOrderPhone})</span>
            </button>
          </div>
        )}
      </div>

      {/* Error Notice */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 border border-amber-200 text-amber-900 p-4 sm:p-5 rounded-2xl text-xs flex items-start sm:items-center gap-3 max-w-2xl mx-auto mb-10 shadow-sm leading-relaxed"
        >
          <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5 sm:mt-0" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Tracked Order Details View */}
      <AnimatePresence>
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Top Status Header Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center flex-wrap gap-2 sm:gap-3">
                  <span className="text-xs font-bold text-dark px-3 py-1.5 bg-brand-100 rounded-xl flex items-center gap-1.5 border border-brand-200">
                    <Smartphone className="w-3.5 h-3.5 text-accent" />
                    <span>طلبية: {order.customer.fullName}</span>
                  </span>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-xl ${
                    order.status === 'Delivered' 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : order.status === 'Cancelled'
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {order.status === 'Pending' && '⏳ قيد المراجعة والتأكيد'}
                    {order.status === 'Processing' && '🧵 جاري التجهيز والتغليف الملكي'}
                    {order.status === 'Shipped' && '🚚 في طريقها مع مندوب التوصيل'}
                    {order.status === 'Delivered' && '✅ تم التوصيل بنجاح'}
                    {order.status === 'Cancelled' && '❌ ملغي'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-neutral-500 pt-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    تاريخ الطلب: <span dir="ltr" className="font-mono font-medium text-dark">{new Date(order.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    الوجهة: {order.customer.city}، {order.customer.wilaya}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleWhatsAppInquiry}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  استفسار فوري عبر واتساب
                </button>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-brand-200 shadow-sm">
              <h3 className="font-serif text-xl text-dark mb-8">مراحل إعداد وتوصيل شحنتك</h3>

              <div className="relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-brand-200 -translate-y-1/2 z-0" />
                <div
                  className="hidden md:block absolute top-1/2 right-0 h-1 bg-accent -translate-y-1/2 z-0 transition-all duration-700"
                  style={{ width: `${(currentStepIndex / (STATUS_STEPS.length - 1)) * 100}%` }}
                />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                  {STATUS_STEPS.map((step, idx) => {
                    const isCompleted = idx <= currentStepIndex;
                    const isCurrent = idx === currentStepIndex;
                    const Icon = step.icon;

                    return (
                      <div
                        key={step.key}
                        className={`flex md:flex-col items-center md:text-center gap-4 md:gap-3 p-4 md:p-2 rounded-2xl transition-all ${
                          isCurrent
                            ? 'bg-brand-50 md:bg-transparent border border-accent/30 md:border-none'
                            : ''
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isCompleted
                              ? 'bg-dark text-accent shadow-luxury'
                              : 'bg-brand-200 text-neutral-400'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h4 className={`text-xs font-bold ${isCompleted ? 'text-dark' : 'text-neutral-400'}`}>
                            {step.labelAr}
                          </h4>
                          <p className="text-[11px] text-neutral-500 leading-tight">
                            {step.descAr}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Items & Customer Receipt Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Items Card */}
              <div className="md:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-brand-200 shadow-sm space-y-4">
                <h3 className="font-serif text-lg text-dark pb-3 border-b border-brand-100">
                  تفاصيل القطع في هذا الطلب ({order.items.length})
                </h3>
                <div className="divide-y divide-brand-100">
                  {order.items.map((item, i) => (
                    <div key={i} className="py-3 flex items-center justify-between gap-4 text-xs">
                      <div>
                        <h4 className="font-semibold text-dark">{item.name}</h4>
                        <div className="flex items-center gap-2 text-neutral-500 text-[11px] mt-0.5">
                          {item.selectedColor && (
                            <span className="flex items-center gap-1">
                              <span
                                className="w-2.5 h-2.5 rounded-full inline-block border border-black/10"
                                style={{ backgroundColor: item.selectedColor.hex || '#111' }}
                              />
                              {item.selectedColor.nameAr || item.selectedColor.name}
                            </span>
                          )}
                          {item.selectedSize && <span>• المقاس: {item.selectedSize}</span>}
                          <span>• الكمية: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-dark font-mono">
                        {renderPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address & Financial Summary */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-200 shadow-sm space-y-6">
                <div>
                  <h3 className="font-serif text-lg text-dark pb-3 border-b border-brand-100">
                    بيانات المستلم
                  </h3>
                  <div className="space-y-2 text-xs text-neutral-600 mt-3">
                    <p className="font-bold text-dark">{order.customer.fullName}</p>
                    <p>{order.customer.city}، {order.customer.wilaya}</p>
                    <p className="text-neutral-500 font-mono">{order.customer.phone}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-100 space-y-2 text-xs">
                  <div className="flex justify-between text-neutral-600">
                    <span>المجموع الفرعي:</span>
                    <span className="font-medium text-dark">{renderPrice(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>رسوم التوصيل:</span>
                    <span className="font-medium text-dark">
                      {renderPrice(
                        order.shippingCost !== undefined && order.shippingCost !== null
                          ? order.shippingCost
                          : Math.max(0, (order.totalAmount || 0) - (order.subtotal || 0) + (order.discount || 0))
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-dark pt-3 border-t border-brand-100">
                    <span>المبلغ المستحق:</span>
                    <span className="text-accent font-serif text-lg">{renderPrice(order.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
