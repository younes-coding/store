import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, CheckCircle, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { OrderSuccessModal } from '../components/checkout/OrderSuccessModal';

export const ALGERIA_WILAYAS = [
  '01 - أدرار (Adrar)',
  '02 - الشلف (Chlef)',
  '03 - الأغواط (Laghouat)',
  '04 - أم البواقي (Oum El Bouaghi)',
  '05 - باتنة (Batna)',
  '06 - بجاية (Béjaïa)',
  '07 - بسكرة (Biskra)',
  '08 - بشار (Béchar)',
  '09 - البليدة (Blida)',
  '10 - البويرة (Bouira)',
  '11 - تمنراست (Tamanrasset)',
  '12 - تبسة (Tébessa)',
  '13 - تلمسان (Tlemcen)',
  '14 - تيارت (Tiaret)',
  '15 - تيزي وزو (Tizi Ouzou)',
  '16 - الجزائر (Alger)',
  '17 - الجلفة (Djelfa)',
  '18 - جيجل (Jijel)',
  '19 - سطيف (Sétif)',
  '20 - سعيدة (Saïda)',
  '21 - سكيكدة (Skikda)',
  '22 - سيدي بلعباس (Sidi Bel Abbès)',
  '23 - عنابة (Annaba)',
  '24 - قالمة (Guelma)',
  '25 - قسنطينة (Constantine)',
  '26 - المدية (Médéa)',
  '27 - مستغانم (Mostaganem)',
  '28 - المسيلة (M\'Sila)',
  '29 - معسكر (Mascara)',
  '30 - ورقلة (Ouargla)',
  '31 - وهران (Oran)',
  '32 - البيض (El Bayadh)',
  '33 - إليزي (Illizi)',
  '34 - برج بوعريريج (Bordj Bou Arréridj)',
  '35 - بومرداس (Boumerdès)',
  '36 - الطارف (El Tarf)',
  '37 - تندوف (Tindouf)',
  '38 - تيسمسيلت (Tissemsilt)',
  '39 - الوادي (El Oued)',
  '40 - خنشلة (Khenchela)',
  '41 - سوق أهراس (Souk Ahras)',
  '42 - تيبازة (Tipaza)',
  '43 - ميلة (Mila)',
  '44 - عين الدفلى (Aïn Defla)',
  '45 - النعامة (Naâma)',
  '46 - عين تموشنت (Aïn Témouchent)',
  '47 - غرداية (Ghardaïa)',
  '48 - غليزان (Relizane)',
  '49 - تيميمون (Timimoun)',
  '50 - برج باجي مختار (Bordj Badji Mokhtar)',
  '51 - أولاد جلال (Ouled Djellal)',
  '52 - بني عباس (Béni Abbès)',
  '53 - عين صالح (In Salah)',
  '54 - عين قزام (In Guezzam)',
  '55 - تقرت (Touggourt)',
  '56 - جانت (Djanet)',
  '57 - المغير (El M\'Ghair)',
  '58 - المنيعة (El Meniaa)',
  '59 - بريكة (Barika)',
  '60 - بوسعادة (Bou Saâda)',
  '61 - آفلو (Aflou)',
  '62 - مسعد (Messaad)',
  '63 - عين وسارة (Aïn Oussera)',
  '64 - قصر الشلالة (Ksar Chellala)',
  '65 - فرندة (Frenda)',
  '66 - عين البيضاء (Aïn Beïda)',
  '67 - شلغوم العيد (Chelghoum Laïd)',
  '68 - القل (Collo)',
  '69 - الأبيض سيدي الشيخ (El Abiodh Sidi Cheikh)'
];

interface CheckoutPageProps {
  onNavigateToShop: () => void;
  onTrackOrder?: (orderId: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigateToShop, onTrackOrder }) => {
  const { t } = useLanguage();
  const { cart, subtotal, clearCart } = useCart();
  const { showToast } = useToast();
  const { formatPrice } = useCurrency();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    wilaya: '13 - تلمسان (Tlemcen)',
    notes: ''
  });

  const [storeSettings, setStoreSettings] = useState<{
    standardShippingCost: number;
    freeShippingThreshold: number;
    wilayaShippingRates: Record<string, number>;
    wilayas: Array<{ id: string; name: string; price: number }>;
  }>({
    standardShippingCost: 600,
    freeShippingThreshold: 0,
    wilayaShippingRates: {},
    wilayas: []
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${API_BASE}/settings`);
        const data = await res.json();
        if (data.success && data.data) {
          const loadedWilayas = Array.isArray(data.data.wilayas) && data.data.wilayas.length > 0 ? data.data.wilayas : [];
          setStoreSettings({
            standardShippingCost: Number(data.data.standardShippingCost) ?? 600,
            freeShippingThreshold: Number(data.data.freeShippingThreshold) ?? 0,
            wilayaShippingRates: data.data.wilayaShippingRates || {},
            wilayas: loadedWilayas
          });
          // If the default wilaya is not in list, select first available
          if (loadedWilayas.length > 0) {
            setFormData(prev => {
              const exists = loadedWilayas.some((w: any) => w.name === prev.wilaya);
              return exists ? prev : { ...prev, wilaya: loadedWilayas[0].name };
            });
          }
        }
      } catch (e) {
        console.warn('Could not fetch shipping settings, using default rates');
      }
    };
    fetchSettings();
  }, []);

  const availableWilayas = useMemo(() => {
    if (storeSettings.wilayas && storeSettings.wilayas.length > 0) {
      return storeSettings.wilayas.map(w => w.name);
    }
    return ALGERIA_WILAYAS;
  }, [storeSettings.wilayas]);

  const wilayaShippingCost = useMemo(() => {
    if (storeSettings.freeShippingThreshold > 0 && subtotal >= storeSettings.freeShippingThreshold) {
      return 0;
    }
    if (storeSettings.wilayaShippingRates && storeSettings.wilayaShippingRates[formData.wilaya] !== undefined) {
      return Number(storeSettings.wilayaShippingRates[formData.wilaya]);
    }
    return Number(storeSettings.standardShippingCost) ?? 600;
  }, [formData.wilaya, subtotal, storeSettings]);

  const orderGrandTotal = subtotal + wilayaShippingCost;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    items: typeof cart;
    subtotal: number;
    total: number;
    customer: typeof formData;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.wilaya) {
      showToast('بيانات غير مكتملة', 'يرجى ملء جميع الحقول المطلوبة المميزة بـ *', 'error');
      return;
    }

    const phoneClean = formData.phone.replace(/[^0-9]/g, '');
    if (phoneClean.length < 9 || phoneClean.length > 12) {
      showToast('رقم هاتف غير صالح', 'يرجى إدخال رقم هاتف جزائري صحيح (مثال: 0550123456 أو 0660123456)', 'error');
      return;
    }

    if (cart.length === 0) {
      showToast(t('emptyCartMessage'), '', 'error');
      return;
    }

    setIsSubmitting(true);

    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    const orderPayload = {
      customer: {
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        wilaya: formData.wilaya,
        notes: formData.notes
      },
      items: cart.map(item => ({
        productId: item.product.id || (item.product as any)._id,
        name: item.product.name,
        price: item.product.price,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        quantity: item.quantity,
        image: item.product.images?.[0] || '',
        product: {
          id: item.product.id,
          name: item.product.name,
          images: item.product.images || []
        }
      })),
      subtotal,
      discount: 0,
      shippingCost: wilayaShippingCost,
      totalAmount: orderGrandTotal
    };

    try {
      const response = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderPayload)
      });

      const data = await response.json();

      if (response.ok && data.success && data.data) {
        const confirmedId = data.data.orderId;
        try {
          localStorage.setItem('younes_last_order_id', confirmedId);
          localStorage.setItem('younes_last_order_phone', formData.phone);
        } catch (e) {}

        setCompletedOrder({
          orderId: confirmedId,
          items: [...cart],
          subtotal,
          total: data.data.totalAmount || orderGrandTotal,
          customer: { ...formData }
        });
        showToast('تم تأكيد الطلب بنجاح', `رقم طلبك: ${confirmedId}`, 'success');
        setIsSubmitting(false);
        clearCart();
        return;
      } else {
        showToast('تنبيه', data.message || 'تعذر تسجيل الطلب، يرجى مراجعة البيانات المدخلة', 'error');
        setIsSubmitting(false);
        return;
      }
    } catch (err) {
      console.warn('Backend order API not reachable, falling back to local storage:', err);
    }

    // Fallback if backend is completely offline
    const generatedId = `${Math.floor(10 + Math.random() * 90)}`;
    try {
      localStorage.setItem('younes_last_order_id', generatedId);
      localStorage.setItem('younes_last_order_phone', formData.phone);
    } catch (e) {}

    setCompletedOrder({
      orderId: generatedId,
      items: [...cart],
      subtotal,
      total: orderGrandTotal,
      customer: { ...formData }
    });
    showToast('تم استلام طلبك', `رقم طلبك المؤقت: ${generatedId}`, 'success');
    setIsSubmitting(false);
    clearCart();
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* If Order Completed Show Success Confirmation Modal */}
      {completedOrder && (
        <OrderSuccessModal
          orderId={completedOrder.orderId}
          customerData={{
            ...completedOrder.customer,
            country: completedOrder.customer.wilaya
          }}
          cartItems={completedOrder.items}
          subtotal={completedOrder.subtotal}
          total={completedOrder.total}
          onNewOrder={() => {
            setCompletedOrder(null);
            onNavigateToShop();
          }}
          onTrackOrder={(id) => {
            setCompletedOrder(null);
            if (onTrackOrder) {
              onTrackOrder(id);
            }
          }}
        />
      )}

      {/* Header */}
      <div className="mb-8 flex items-center justify-between pb-6 border-b border-brand-200">
        <div>
          <button
            onClick={onNavigateToShop}
            className="text-xs font-semibold tracking-wider text-neutral-500 hover:text-dark flex items-center gap-2 mb-2 transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" /> العودة لحقيبة التسوق
          </button>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-dark">
            إتمام الطلب والدفع
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            لا يلزم إنشاء حساب مسبق. أدخل بيانات التوصيل مباشرة لتأكيد طلبك وتجهيزه.
          </p>
        </div>
      </div>

      {cart.length === 0 && !completedOrder ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-brand-200 p-8 space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
            <ShoppingBag className="w-8 h-8 text-brand-400" />
          </div>
          <h3 className="font-serif text-2xl text-dark">حقيبة التسوق فارغة حالياً</h3>
          <button
            onClick={onNavigateToShop}
            className="px-6 py-3 bg-dark text-white rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            استعراض التشكيلات الفاخرة
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Delivery Form */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Customer Contact Info */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-brand-100">
                <span className="w-7 h-7 rounded-full bg-dark text-white text-xs font-bold flex items-center justify-center">
                  ١
                </span>
                <h3 className="font-serif text-xl font-medium text-dark">
                  بيانات العميل والتواصل
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-dark mb-2">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="مثال: يونس محمد"
                    className="w-full px-4 py-3 text-xs bg-brand-50 border border-brand-200 rounded-xl focus:outline-none focus:border-accent text-dark font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-dark mb-2">
                    رقم الهاتف الجوال *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="05 / 06 / 07 XX XX XX XX"
                    className="w-full px-4 py-3 text-xs bg-brand-50 border border-brand-200 rounded-xl focus:outline-none focus:border-accent text-dark font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-brand-100">
                <span className="w-7 h-7 rounded-full bg-dark text-white text-xs font-bold flex items-center justify-center">
                  ٢
                </span>
                <h3 className="font-serif text-xl font-medium text-dark">
                  عنوان التوصيل
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-dark mb-2">
                    الولاية ({availableWilayas.length} ولاية / منطقة) *
                  </label>
                  <select
                    name="wilaya"
                    required
                    value={formData.wilaya}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-xs bg-brand-50 border border-brand-200 rounded-xl focus:outline-none focus:border-accent text-dark font-semibold cursor-pointer max-h-48"
                  >
                    {availableWilayas.map((wilaya) => (
                      <option key={wilaya} value={wilaya}>
                        {wilaya}
                      </option>
                    ))}
                  </select>

                  {/* Dynamic Shipping Badge based on selected Wilaya */}
                  <div className="mt-2.5 p-3 rounded-xl bg-brand-100/70 border border-brand-200 flex items-center justify-between text-xs transition-all">
                    <div className="flex items-center gap-2 text-dark font-medium">
                      <Truck className="w-4 h-4 text-accent" />
                      <span>تكلفة التوصيل إلى <strong>{formData.wilaya.split('(')[0].trim()}</strong>:</span>
                    </div>
                    <span className="font-bold text-dark">
                      {wilayaShippingCost === 0 ? (
                        <span className="text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full text-xs font-bold">توصيل مجاني</span>
                      ) : (
                        <span className="text-dark font-serif text-sm">{formatPrice(wilayaShippingCost)}</span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-dark mb-2">
                    البلدية / المدينة *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="مثال: تلمسان، المنصورة، شتوان، ندرومة، الحناية..."
                    className="w-full px-4 py-3 text-xs bg-brand-50 border border-brand-200 rounded-xl focus:outline-none focus:border-accent text-dark font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-dark mb-2">
                    اسم الشارع والحي ورقم المبنى *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="مثال: حي إمامة، شارع باستور، عمارة 5 شقة 12"
                    className="w-full px-4 py-3 text-xs bg-brand-50 border border-brand-200 rounded-xl focus:outline-none focus:border-accent text-dark font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-dark mb-2">
                    ملاحظات خاصة بالتوصيل والتغليف (اختياري)
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="طلب تغليف هدايا ملكي، توجيهات لمسؤول التوصيل..."
                    className="w-full px-4 py-3 text-xs bg-brand-50 border border-brand-200 rounded-xl focus:outline-none focus:border-accent text-dark font-medium resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-5 sticky top-32 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-200 shadow-sm space-y-6">
              <h3 className="font-serif text-2xl font-light text-dark pb-4 border-b border-brand-200">
                ملخص الطلب
              </h3>

              {/* Items List */}
              <div className="space-y-4 max-h-72 overflow-y-auto pl-1">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3 text-xs">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-14 h-16 object-cover rounded-xl shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-dark truncate">{item.product.name}</h4>
                      <p className="text-neutral-500 mt-0.5">
                        {item.selectedColor.nameAr || item.selectedColor.name} • المقاس: {item.selectedSize}
                      </p>
                      <span className="text-neutral-400">الكمية: {item.quantity}</span>
                    </div>
                    <span className="font-bold text-dark shrink-0 font-serif">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-xs text-neutral-600 pt-4 border-t border-brand-200">
                <div className="flex justify-between">
                  <span>المجموع الفرعي للأزياء</span>
                  <span className="font-semibold text-dark font-serif">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>رسوم التوصيل ({formData.wilaya.split('(')[0].trim()})</span>
                  <span className={`font-semibold ${wilayaShippingCost === 0 ? 'text-emerald-700 font-bold' : 'text-dark font-serif'}`}>
                    {wilayaShippingCost === 0 ? 'توصيل مجاني' : formatPrice(wilayaShippingCost)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-dark pt-3 border-t border-brand-200">
                  <span>المبلغ الإجمالي المستحق</span>
                  <span className="text-xl text-dark font-serif">{formatPrice(orderGrandTotal)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-dark hover:bg-neutral-800 disabled:bg-neutral-400 text-white rounded-xl font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-luxury transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    جاري تأكيد وتجهيز الطلب...
                  </span>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>تأكيد وإرسال الطلب ({formatPrice(orderGrandTotal)})</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
