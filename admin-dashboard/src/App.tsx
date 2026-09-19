import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Sparkles } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { AdminLanguageProvider, useAdminLanguage } from './context/AdminLanguageContext';
import { Sidebar, type AdminTab } from './components/Sidebar';
import { LoginPage } from './pages/LoginPage';
import { OverviewPage } from './pages/OverviewPage';
import { ProductsPage } from './pages/ProductsPage';
import { OrdersPage } from './pages/OrdersPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { SettingsPage } from './pages/SettingsPage';
import { StorefrontPage } from './pages/StorefrontPage';
import { LiveOrdersProvider, useLiveOrders } from './context/LiveOrdersContext';

function DashboardLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const { t } = useAdminLanguage();
  const { pendingOrdersCount } = useLiveOrders();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-50 text-neutral-500 flex items-center justify-center text-xs uppercase tracking-widest font-semibold">
        Validating Admin Session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const tabTitles: Record<AdminTab, string> = {
    overview: t('navOverview'),
    storefront: t('navStorefront'),
    products: t('navProducts'),
    categories: t('navCategories'),
    orders: t('navOrders'),
    settings: t('navSettings'),
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-brand-50 text-dark overflow-x-hidden">
      {/* Mobile Sticky Luxury Header Bar */}
      <header className="lg:hidden sticky top-0 z-40 bg-dark text-white px-4 py-3.5 flex items-center justify-between border-b border-neutral-800 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-xl bg-neutral-900 border border-neutral-700 text-accent hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-accent text-dark font-serif font-bold text-sm flex items-center justify-center shadow-sm">
              ي
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-sm font-bold tracking-wider text-white">
                YOUNES SARTORIAL
              </span>
              <span className="text-[10px] text-accent font-bold -mt-0.5">
                {tabTitles[activeTab]}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {pendingOrdersCount > 0 && (
            <button
              onClick={() => setActiveTab('orders')}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-accent text-dark rounded-full text-xs font-bold animate-pulse cursor-pointer shadow-sm"
            >
              <span>{pendingOrdersCount}</span>
              <span className="text-[10px]">طلبات</span>
            </button>
          )}

          <a
            href="https://younes-sartorial.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-neutral-900 text-accent hover:text-white border border-neutral-800 transition-colors"
            title="زيارة المتجر"
          >
            <Sparkles className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Sidebar Component (Desktop + Mobile Drawer) */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content View with Dynamic Responsive Padding */}
      <main className="flex-1 p-3.5 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full min-w-0 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            {activeTab === 'overview' && (
              <OverviewPage onNavigateToTab={(tab) => setActiveTab(tab)} />
            )}
            {activeTab === 'storefront' && <StorefrontPage />}
            {activeTab === 'products' && <ProductsPage />}
            {activeTab === 'orders' && <OrdersPage />}
            {activeTab === 'categories' && <CategoriesPage />}
            {activeTab === 'settings' && <SettingsPage />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AdminLanguageProvider>
      <AuthProvider>
        <ToastProvider>
          <LiveOrdersProvider>
            <DashboardLayout />
          </LiveOrdersProvider>
        </ToastProvider>
      </AuthProvider>
    </AdminLanguageProvider>
  );
}
