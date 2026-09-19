import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  FolderTree,
  Settings,
  LogOut,
  Sparkles,
  ExternalLink,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAdminLanguage } from '../context/AdminLanguageContext';
import { useLiveOrders } from '../context/LiveOrdersContext';

export type AdminTab = 'overview' | 'storefront' | 'products' | 'orders' | 'categories' | 'settings';

interface SidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isOpenMobile = false,
  onCloseMobile
}) => {
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

  const handleTabClick = (tabId: AdminTab) => {
    onTabChange(tabId);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full bg-dark text-brand-100 select-none">
      {/* Brand Header */}
      <div>
        <div className="p-5 sm:p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-accent text-dark font-serif font-bold text-xl flex items-center justify-center shadow-md shrink-0">
              ي
            </span>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-base sm:text-lg font-bold text-white tracking-wider uppercase truncate">
                YOUNES SARTORIAL
              </span>
              <span className="text-[10px] tracking-wider text-accent font-bold -mt-0.5">
                يونس سارتوريال • لوحة الإدارة
              </span>
            </div>
          </div>

          {/* Close button on mobile */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 sm:p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => handleTabClick(item.id as AdminTab)}
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.12 }}
                className={`relative w-full flex items-center justify-between px-3.5 sm:px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-colors cursor-pointer ${
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
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-dark' : 'text-neutral-400'}`} />
                  <span className="truncate">{t(item.key)}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`relative z-10 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
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
          href="https://younes-sartorial.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 text-xs font-bold transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2 truncate">
            <Sparkles className="w-3.5 h-3.5 text-accent shrink-0" />
            <span className="truncate">زيارة واجهة المتجر</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
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
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-64 border-l border-neutral-800 flex-col shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Out Drawer */}
      <AnimatePresence>
        {isOpenMobile && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onCloseMobile}
              className="fixed inset-0 bg-dark/70 backdrop-blur-sm"
            />

            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 border-l border-neutral-800"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

