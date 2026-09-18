import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, PackageCheck, Printer, Sparkles, MapPin, Phone, Truck, X } from 'lucide-react';
import { type CartItem } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

interface OrderSuccessModalProps {
  orderId: string;
  customerData: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    notes?: string;
  };
  cartItems: CartItem[];
  subtotal: number;
  total: number;
  onNewOrder: () => void;
  onTrackOrder?: (orderId: string) => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  orderId,
  customerData,
  cartItems,
  subtotal: _subtotal,
  total,
  onNewOrder,
  onTrackOrder
}) => {
  const { formatPrice } = useCurrency();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center bg-dark/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 260 }}
        className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 z-10 shadow-2xl border border-brand-200 text-right"
      >
        {/* Close Button (X) */}
        <button
          type="button"
          onClick={onNewOrder}
          className="absolute top-5 left-5 p-2 rounded-full text-neutral-400 hover:text-dark hover:bg-neutral-100 transition-colors z-20 cursor-pointer shadow-sm border border-neutral-200/60"
          title="إغلاق والعودة للمتجر"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Celebration Icon */}
        <div className="text-center space-y-3 pb-6 border-b border-brand-200">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2, stiffness: 300 }}
            className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner"
          >
            <CheckCircle2 className="w-10 h-10" />
          </motion.div>

          <div className="flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent bg-brand-100 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> تم تأكيد الطلب بنجاح
            </span>
            <span className="inline-flex items-center text-xs font-mono font-bold text-dark bg-brand-200/80 px-3 py-1 rounded-full border border-brand-300">
              مرجع الطلب: {orderId}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-light text-dark">
            شكراً لك، {customerData.fullName}!
          </h2>
          <p className="text-xs text-neutral-500 max-w-md mx-auto">
            تم استلام طلبك رقم ({orderId}) بنجاح وجاري تجهيزه للشحن والتوصيل الملكي.
          </p>
        </div>

        {/* Details Content */}
        <div className="py-6 space-y-6">
          {/* Shipping Address Summary */}
          <div className="bg-brand-50 p-4 rounded-2xl border border-brand-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-600">
            <div>
              <span className="font-bold text-dark tracking-wider block mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-accent" /> عنوان التوصيل
              </span>
              <p className="font-medium text-dark">{customerData.fullName}</p>
              <p>{customerData.address}</p>
              <p>{customerData.city}، {customerData.country}</p>
            </div>
            <div>
              <span className="font-bold text-dark tracking-wider block mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-accent" /> معلومات التواصل والدفع
              </span>
              <p className="font-mono">{customerData.phone}</p>
              <p className="mt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <PackageCheck className="w-3.5 h-3.5 text-emerald-600" /> الدفع عند الاستلام بعد المعاينة (2-3 أيام)
              </p>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-dark">القطع المطلوبة ({cartItems.length})</h4>
            <div className="max-h-40 overflow-y-auto space-y-2 pl-1">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-white border border-brand-100">
                  <div className="flex items-center gap-3">
                    <img src={item.product.images[0]} alt="" className="w-10 h-12 object-cover rounded-lg" />
                    <div>
                      <p className="font-semibold text-dark">{item.product.name}</p>
                      <span className="text-neutral-500 text-[11px]">{item.selectedColor.nameAr || item.selectedColor.name} / المقاس {item.selectedSize} × {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold text-dark font-serif">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial summary */}
          <div className="space-y-1.5 text-xs text-neutral-600 pt-3 border-t border-brand-200">
            <div className="flex justify-between text-base font-bold text-dark pt-2">
              <span>إجمالي المبلغ المستحق</span>
              <span className="text-lg text-accent font-serif">{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-brand-200">
          {onTrackOrder && (
            <button
              onClick={() => onTrackOrder(orderId)}
              className="flex-1 py-3.5 bg-dark hover:bg-neutral-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-luxury cursor-pointer"
            >
              <Truck className="w-4 h-4 text-accent" />
              <span>تتبع مسار شحنتك الآن</span>
            </button>
          )}

          <button
            onClick={handlePrint}
            className="flex-1 py-3.5 bg-brand-100 hover:bg-brand-200 text-dark rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-dark" /> طباعة إيصال الطلب
          </button>

          <button
            onClick={onNewOrder}
            className="flex-1 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-dark rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>العودة للتسوق</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
