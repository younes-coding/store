import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Search,
  Eye,
  X,
  MapPin,
  User,
  Phone
} from 'lucide-react';
import { apiRequest } from '../api/client';
import { SkeletonRow } from '../components/SkeletonTable';
import { useToast } from '../context/ToastContext';
import { useAdminLanguage } from '../context/AdminLanguageContext';
import { useLiveOrders } from '../context/LiveOrdersContext';

export const OrdersPage: React.FC = () => {
  const { t } = useAdminLanguage();
  const { showToast } = useToast();
  const { orders: rawOrders, refreshOrders } = useLiveOrders();
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isLoading] = useState(false);

  // Selected Order Modal State
  const [activeOrder, setActiveOrder] = useState<any | null>(null);

  // Filtered orders from live stream
  const filteredOrders = useMemo(() => {
    return rawOrders.filter((order) => {
      const matchStatus = selectedStatus === 'all' || order.status === selectedStatus;
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        String(order.orderId || '').toLowerCase().includes(q) ||
        String(order.customer?.fullName || '').toLowerCase().includes(q) ||
        String(order.customer?.phone || '').includes(q) ||
        String(order.customer?.wilaya || '').toLowerCase().includes(q);

      return matchStatus && matchSearch;
    });
  }, [rawOrders, selectedStatus, search]);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await apiRequest(`/orders/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });

      if (res.success) {
        showToast('تم تحديث الطلب', `تم تغيير حالة الطلب #${orderId} بنجاح`, 'success');
        refreshOrders();
        if (activeOrder && (activeOrder._id === orderId || activeOrder.orderId === orderId)) {
          setActiveOrder({ ...activeOrder, status: newStatus });
        }
      }
    } catch (err: any) {
      showToast('فشل التحديث', err.message || 'تعذر تحديث حالة الطلب', 'error');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Live Sync Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent">{t('ordersBadge')}</span>
          <h1 className="font-serif text-3xl font-light text-dark mt-1">
            {t('ordersTitle')}
          </h1>
        </div>

        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-200 text-xs font-bold text-emerald-800 self-start sm:self-auto shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>تحديث فوري مباشر (Live Sync)</span>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-brand-200 shadow-sm">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث برقم الطلب (1، 2...)، اسم العميل، أو رقم الهاتف..."
            className="w-full pr-10 pl-4 py-2.5 bg-brand-50 border border-brand-200 rounded-xl text-xs text-dark placeholder-neutral-400 focus:outline-none focus:border-accent"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-neutral-600">الحالة:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full md:w-auto bg-brand-50 border border-brand-200 rounded-xl px-4 py-2.5 text-xs text-dark focus:outline-none focus:border-accent font-semibold cursor-pointer"
          >
            <option value="all">{t('statusAll')} ({rawOrders.length})</option>
            <option value="Pending">{t('statusPending')}</option>
            <option value="Processing">{t('statusProcessing')}</option>
            <option value="Shipped">{t('statusShipped')}</option>
            <option value="Delivered">{t('statusDelivered')}</option>
            <option value="Cancelled">{t('statusCancelled')}</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-brand-200 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-brand-200 bg-brand-50 text-neutral-600 uppercase tracking-wider font-semibold">
                  <th className="py-4 px-4 whitespace-nowrap">{t('tableOrderId')}</th>
                  <th className="py-4 px-4 whitespace-nowrap">{t('tableCustomer')}</th>
                  <th className="py-4 px-4 whitespace-nowrap">عدد القطع</th>
                  <th className="py-4 px-4 whitespace-nowrap">{t('tableTotal')}</th>
                  <th className="py-4 px-4 whitespace-nowrap">{t('tableStatus')}</th>
                  <th className="py-4 px-4 whitespace-nowrap">{t('tableDate')}</th>
                  <th className="py-4 px-4 text-left whitespace-nowrap">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100">
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              </tbody>
            </table>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-20 text-center text-xs text-neutral-500">لا توجد طلبات تطابق الفلتر المختار.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-brand-200 bg-brand-50 text-neutral-600 uppercase tracking-wider font-semibold">
                  <th className="py-4 px-4 whitespace-nowrap">{t('tableOrderId')}</th>
                  <th className="py-4 px-4 whitespace-nowrap">{t('tableCustomer')}</th>
                  <th className="py-4 px-4 whitespace-nowrap">عدد القطع</th>
                  <th className="py-4 px-4 whitespace-nowrap">{t('tableTotal')}</th>
                  <th className="py-4 px-4 whitespace-nowrap">{t('tableStatus')}</th>
                  <th className="py-4 px-4 whitespace-nowrap">{t('tableDate')}</th>
                  <th className="py-4 px-4 text-left whitespace-nowrap">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100 text-neutral-800">
                {filteredOrders.map((order, idx) => (
                  <motion.tr
                    key={order._id || order.orderId}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, delay: idx * 0.02, ease: 'easeOut' }}
                    className="hover:bg-brand-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-accent text-sm whitespace-nowrap" dir="ltr">{order.orderId}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-semibold text-dark text-xs">{order.customer?.fullName}</p>
                        <p className="text-[11px] text-neutral-500 font-mono" dir="ltr">{order.customer?.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-neutral-600">
                      {order.items?.length || 0} قطع
                    </td>
                    <td className="py-3 px-4 font-bold text-dark">{Number(order.totalAmount || 0).toLocaleString('ar-DZ')} د.ج</td>
                    <td className="py-3 px-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order._id || order.orderId, e.target.value)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider focus:outline-none border cursor-pointer ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                              order.status === 'Processing' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                                order.status === 'Cancelled' ? 'bg-rose-100 text-rose-800 border-rose-300' :
                                  'bg-purple-100 text-purple-800 border-purple-300'
                          }`}
                      >
                        <option value="Pending">{t('statusPending')}</option>
                        <option value="Processing">{t('statusProcessing')}</option>
                        <option value="Shipped">{t('statusShipped')}</option>
                        <option value="Delivered">{t('statusDelivered')}</option>
                        <option value="Cancelled">{t('statusCancelled')}</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-neutral-500 text-xs font-mono whitespace-nowrap" dir="ltr">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </td>
                    <td className="py-3 px-4 text-left">
                      <button
                        onClick={() => setActiveOrder(order)}
                        className="px-3 py-1.5 rounded-lg bg-brand-100 hover:bg-dark hover:text-white text-xs font-semibold text-dark transition-colors inline-flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" /> عرض التفاصيل
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {activeOrder && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveOrder(null)}
              className="fixed inset-0 bg-dark/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-8 border border-brand-200 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-brand-200">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-accent uppercase tracking-widest font-bold" dir="ltr">
                      مرجع الطلب: #{activeOrder.orderId}
                    </span>
                    <span className="text-neutral-300">•</span>
                    <span className="text-xs font-mono text-neutral-500" dir="ltr">
                      {new Date(activeOrder.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-light text-dark">
                    تفاصيل الطلب الكاملة
                  </h3>
                </div>
                <button
                  onClick={() => setActiveOrder(null)}
                  className="p-2 text-neutral-400 hover:text-dark hover:bg-brand-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Customer Delivery Info */}
              <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200 space-y-3 text-xs">
                <h4 className="font-bold text-dark uppercase tracking-wider text-[11px]">بيانات العميل والتوصيل</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-neutral-700">
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] text-neutral-400 font-semibold">اسم العميل ورقم الهاتف:</p>
                      <p className="font-bold text-dark text-sm">{activeOrder.customer?.fullName}</p>
                      <p className="text-neutral-600 font-mono text-xs mt-0.5 flex items-center gap-1" dir="ltr">
                        <Phone className="w-3 h-3 text-accent inline" />
                        {activeOrder.customer?.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] text-neutral-400 font-semibold">عنوان التوصيل:</p>
                      {activeOrder.customer?.wilaya && (
                        <p className="font-bold text-dark">{activeOrder.customer?.wilaya}</p>
                      )}
                      <p className="text-neutral-600 mt-0.5">
                        {activeOrder.customer?.city && activeOrder.customer?.city !== activeOrder.customer?.wilaya ? `${activeOrder.customer?.city} — ` : ''}
                        {activeOrder.customer?.address}
                      </p>
                      {activeOrder.customer?.notes && (
                        <p className="text-[11px] text-amber-800 bg-amber-50 rounded-lg p-2 mt-2 border border-amber-200">
                          <strong>ملاحظة الزبون:</strong> {activeOrder.customer.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items Table */}
              <div className="space-y-3">
                <h4 className="font-bold text-dark text-xs uppercase tracking-wider">القطع المطلوبة ({activeOrder.items?.length})</h4>
                <div className="space-y-2">
                  {activeOrder.items?.map((item: any, idx: number) => {
                    const name = item.name || item.product?.name || '';
                    const imgSrc = item.image || item.images?.[0] || item.product?.images?.[0] || item.product?.image || (
                      name.includes('الريفييرا') ? '/products/old-money-outfit-1.jpg' :
                        name.includes('مونوكروم') ? '/products/old-money-outfit-2.jpg' :
                          name.includes('كومو') ? '/products/old-money-outfit-3.jpg' :
                            name.includes('الأرستقراط') || name.includes('بليزر') ? '/products/old-money-outfit-4.jpg' :
                              name.includes('المترف') || name.includes('إيكرو') ? '/products/old-money-outfit-5.jpg' :
                                '/products/old-money-outfit-1.jpg'
                    );

                    return (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-brand-50 border border-brand-200/80 text-xs">
                        <div className="flex items-center gap-3">
                          <img
                            src={imgSrc}
                            alt={name}
                            className="w-12 h-14 object-cover rounded-lg bg-neutral-200 border border-brand-200 shrink-0"
                          />
                          <div>
                            <p className="font-semibold text-dark">{name}</p>
                            <p className="text-neutral-500 text-[11px]">
                              اللون: {item.selectedColor?.nameAr || item.selectedColor?.name || item.selectedColor || 'افتراضي'} | المقاس: {item.selectedSize} | الكمية: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-dark font-sans">{Number(((item.price || item.product?.price || 0) * (item.quantity || 1))).toLocaleString('ar-DZ')} د.ج</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Summary */}
              <div className="pt-4 border-t border-brand-200 flex items-center justify-between text-xs">
                <span className="text-neutral-500">حالة الطلب: <strong className="text-dark font-bold">{t(`status${activeOrder.status}`) || activeOrder.status}</strong></span>
                <div className="text-right">
                  <span className="text-neutral-500 block text-[11px]">المبلغ الإجمالي المدفوع:</span>
                  <span className="text-xl font-bold text-dark font-sans">{Number(activeOrder.totalAmount || 0).toLocaleString('ar-DZ')} د.ج</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

