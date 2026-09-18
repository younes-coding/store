import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  FolderTree,
  Settings,
  LogOut,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAdminLanguage } from '../context/AdminLanguageContext';

import { useLiveOrders } from '../context/LiveOrdersContext';

export type AdminTab = 'overview' | 'storefront' | 'products' | 'orders' | 'categories' | 'settings';

interface SidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { logout, admin } = useAuth();
  const { t } = useAdminLanguage();
  const { pendingOrdersCount } = useLiveOrders();

  const navItems = [
    { id: 'overview', key: 'navOverview', icon: LayoutDashboard },
    { id: 'storefront', key: 'navStorefront', icon: Sparkles },
    { id: 'products', key: 'navProducts', icon: Package },
    { id: 'categories', key: 'navCategories', icon: FolderTree },
    { id: 'orders', key: 'navOrders', icon: ShoppingBag, badge: pendingOrdersCount },
    { id: 'settings', key: 'navSettings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-dark text-brand-100 border-l border-neutral-800 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-neutral-800 flex flex-col">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-accent text-dark font-serif font-bold text-xl flex items-center justify-center shadow-md">
              ي
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold text-white tracking-wider uppercase">
                YOUNES SARTORIAL
              </span>
              <span className="text-[10px] tracking-wider text-accent font-bold -mt-0.5">
                يونس سارتوريال • لوحة الإدارة
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => onTabChange(item.id as AdminTab)}
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className={`relative w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-colors cursor-pointer ${
                  isActive
                    ? 'text-dark font-bold'
                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSidebarIndicator"
                    className="absolute inset-0 bg-accent rounded-xl shadow-md"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-dark' : 'text-neutral-400'}`} />
                  <span>{t(item.key)}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`relative z-10 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-dark text-accent' : 'bg-accent text-dark animate-pulse'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info & Storefront Link */}
      <div className="p-4 border-t border-neutral-800 space-y-3">
        {/* Storefront Direct Link */}
        <a
          href="http://localhost:5175"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 text-xs font-bold transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>زيارة واجهة المتجر</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
        </a>

        {/* Admin Profile Details & Logout */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
          <div className="min-w-0 pl-2">
            <p className="text-xs font-bold text-white truncate">{admin?.name || 'مدير متجر يونس'}</p>
            <p className="text-[10px] text-accent truncate">{t('adminRoleBadge')}</p>
          </div>
          <button
            onClick={logout}
            className="p-2 text-neutral-400 hover:text-rose-400 hover:bg-neutral-900 rounded-lg transition-colors cursor-pointer"
            title={t('navLogout')}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
