import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  ShoppingBag,
  Clock,
  AlertTriangle,
  ArrowLeft,
  TrendingUp,
  PackageCheck
} from 'lucide-react';
import { apiRequest } from '../api/client';
import { CountUp } from '../components/CountUp';
import { SkeletonRow } from '../components/SkeletonTable';
import { useAdminLanguage } from '../context/AdminLanguageContext';

import { useLiveOrders } from '../context/LiveOrdersContext';

interface OverviewPageProps {
  onNavigateToTab: (tab: 'products' | 'orders') => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ onNavigateToTab }) => {
  const { t } = useAdminLanguage();
  const { orders: liveOrders } = useLiveOrders();
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const productsRes = await apiRequest('/products');
        if (productsRes.success) {
          setProducts(productsRes.data || []);
        }
      } catch (err) {
        console.error('Failed to load products in overview:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const totalRev = useMemo(() => {
    return liveOrders
      .filter((o: any) => o.status !== 'Cancelled' && o.status !== 'cancelled')
      .reduce((sum: number, o: any) => sum + (o.totalAmount || 0), 0);
  }, [liveOrders]);

  const pendingCount = useMemo(() => {
    return liveOrders.filter((o: any) => o.status === 'Pending' || o.status === 'Processing').length;
  }, [liveOrders]);

  const lowStockItems = useMemo(() => {
    return products.filter((p: any) => (p.stockCount || 0) <= 5);
  }, [products]);

  const recentOrders = useMemo(() => {
    return liveOrders.slice(0, 5);
  }, [liveOrders]);

  return (
    <div className="space-y-8">
      {/* Top Banner with Live Sync Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent">{t('overviewBadge')}</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-dark mt-1">
            {t('overviewTitle')}
          </h1>
        </div>

        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-200 text-xs font-bold text-emerald-800 self-start sm:self-auto shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>بث مباشر للطلبات (Live Stream)</span>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0, ease: 'easeOut' }}
          className="p-6 rounded-3xl bg-white border border-brand-200 space-y-4 shadow-sm hover:shadow-floating transition-shadow"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">{t('metricRevenue')}</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-bold text-dark font-sans">
              <CountUp value={totalRev} suffix=" د.ج" duration={400} />
            </span>
            <div className="flex items-center gap-1 text-[11px] text-emerald-700 mt-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" /> <span>+18.4% مقارنة بالشهر السابق</span>
            </div>
          </div>
        </motion.div>

        {/* Total Orders */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.04, ease: 'easeOut' }}
          className="p-6 rounded-3xl bg-white border border-brand-200 space-y-4 shadow-sm hover:shadow-floating transition-shadow"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">{t('metricOrders')}</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-accent flex items-center justify-center border border-amber-200">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-bold text-dark font-sans">
              <CountUp value={liveOrders.length} duration={400} />
            </span>
            <p className="text-[11px] text-neutral-500 mt-1">إجمالي طلبات العملاء</p>
          </div>
        </motion.div>

        {/* Pending Orders */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.08, ease: 'easeOut' }}
          className="p-6 rounded-3xl bg-white border border-brand-200 space-y-4 shadow-sm hover:shadow-floating transition-shadow"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">{t('metricPending')}</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-bold text-dark font-sans">
              <CountUp value={pendingCount} duration={400} />
            </span>
            <p className="text-[11px] text-neutral-500 mt-1">طلبات قيد المراجعة والتجهيز</p>
          </div>
        </motion.div>

        {/* Low Stock Items */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.12, ease: 'easeOut' }}
          className="p-6 rounded-3xl bg-white border border-brand-200 space-y-4 shadow-sm hover:shadow-floating transition-shadow"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">{t('metricLowStock')}</span>
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-bold text-rose-600 font-sans">
              <CountUp value={lowStockItems.length} duration={400} />
            </span>
            <p className="text-[11px] text-neutral-500 mt-1">قطع يقل مخزونها عن 5</p>
          </div>
        </motion.div>
      </div>

      {/* Main Grid: Recent Orders & Low Stock List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Orders List */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-brand-200 p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-2xl font-light text-dark">{t('recentOrdersTitle')}</h3>
              <p className="text-xs text-neutral-500 mt-0.5">أحدث الطلبات الواردة من المتجر</p>
            </div>
            <motion.button
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigateToTab('orders')}
              className="text-xs font-semibold text-accent hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{t('viewAllOrders')}</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {isLoading ? (
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-brand-200 text-neutral-500 uppercase tracking-wider font-semibold">
                    <th className="py-3 px-3">{t('tableOrderId')}</th>
                    <th className="py-3 px-3">{t('tableCustomer')}</th>
                    <th className="py-3 px-3">{t('tableTotal')}</th>
                    <th className="py-3 px-3">{t('tableStatus')}</th>
                    <th className="py-3 px-3">{t('tableDate')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-100">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonRow key={i} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="py-12 text-center text-xs text-neutral-500">لا توجد طلبات عملاء مسجلة حالياً.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-brand-200 text-neutral-500 uppercase tracking-wider font-semibold">
                    <th className="py-3 px-3">{t('tableOrderId')}</th>
                    <th className="py-3 px-3">{t('tableCustomer')}</th>
                    <th className="py-3 px-3">{t('tableTotal')}</th>
                    <th className="py-3 px-3">{t('tableStatus')}</th>
                    <th className="py-3 px-3">{t('tableDate')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-100 text-neutral-800">
                  {recentOrders.map((order, idx) => (
                    <motion.tr
                      key={order._id || order.orderId}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18, delay: idx * 0.03, ease: 'easeOut' }}
                      className="hover:bg-brand-50 transition-colors"
                    >
                      <td className="py-3 px-3 font-mono font-bold text-accent text-sm whitespace-nowrap" dir="ltr">{order.orderId}</td>
                      <td className="py-3 px-3 font-medium text-dark">{order.customer?.fullName}</td>
                      <td className="py-3 px-3 font-bold text-dark">{Number(order.totalAmount || 0).toLocaleString('ar-DZ')} د.ج</td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                              order.status === 'Processing' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                                order.status === 'Cancelled' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                                  'bg-purple-100 text-purple-800 border border-purple-300'
                          }`}>
                          {t(`status${order.status}`) || order.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-neutral-500 text-xs font-mono whitespace-nowrap" dir="ltr">
                        {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Low Stock Alerts Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-brand-200 p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-light text-dark">{t('lowStockTitle')}</h3>
            <motion.button
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigateToTab('products')}
              className="text-xs font-semibold text-accent hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{t('manageInventory')}</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {lowStockItems.length === 0 ? (
            <div className="p-6 text-center text-xs text-neutral-500 bg-brand-50 rounded-2xl border border-brand-200">
              <PackageCheck className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              جميع المنتجات متوفرة بمخزون كافٍ ومريح.
            </div>
          ) : (
            <div className="space-y-3">
              {lowStockItems.map((item, idx) => (
                <motion.div
                  key={item._id || item.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18, delay: idx * 0.03 }}
                  className="p-3 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-between gap-3 text-xs"
                >
                  <img src={item.images?.[0]} alt="" className="w-10 h-12 object-cover rounded-lg shrink-0 bg-neutral-200" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-dark truncate">{item.name}</h4>
                    <span className="text-[11px] text-neutral-500 uppercase">{item.categoryLabel}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-700 font-bold text-[11px]">
                    متبقي {item.stockCount}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

