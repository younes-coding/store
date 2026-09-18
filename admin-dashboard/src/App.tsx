import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { AdminLanguageProvider } from './context/AdminLanguageContext';
import { Sidebar, type AdminTab } from './components/Sidebar';
import { LoginPage } from './pages/LoginPage';
import { OverviewPage } from './pages/OverviewPage';
import { ProductsPage } from './pages/ProductsPage';
import { OrdersPage } from './pages/OrdersPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { SettingsPage } from './pages/SettingsPage';
import { StorefrontPage } from './pages/StorefrontPage';

import { LiveOrdersProvider } from './context/LiveOrdersContext';

function DashboardLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

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

  return (
    <div className="min-h-screen flex bg-brand-50 text-dark overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content View */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto overflow-y-auto w-full min-w-0">
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
