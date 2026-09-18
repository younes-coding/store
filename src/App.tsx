import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { LanguageProvider } from './context/LanguageContext';
import { ProductProvider } from './context/ProductContext';
import { CurrencyProvider } from './context/CurrencyContext';

import { Navbar, type ViewMode } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { PageTransition } from './components/common/PageTransition';
import { QuickViewModal } from './components/product/QuickViewModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { WishlistDrawer } from './components/cart/WishlistDrawer';
import { PolicyModal, type PolicyType } from './components/common/PolicyModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { type Product } from './data/products';

export function AppContent() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);
  const [trackedOrderId, setTrackedOrderId] = useState<string>('');

  const handleNavigate = (view: ViewMode, category?: string) => {
    setCurrentView(view);
    if (category) {
      setSelectedCategory(category);
    } else if (view === 'shop' && !category) {
      setSelectedCategory('all');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTrackOrderFromCheckout = (orderId: string) => {
    setTrackedOrderId(orderId);
    setCurrentView('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-50 text-dark font-sans">
      {/* Header */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenPolicy={(policy) => setActivePolicy(policy)}
      />

      {/* Main View with Smooth Page Transitions */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <PageTransition key="home">
              <HomePage
                onNavigateToShop={(cat) => handleNavigate('shop', cat)}
                onSelectProduct={handleSelectProduct}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            </PageTransition>
          )}

          {currentView === 'shop' && (
            <PageTransition key="shop">
              <ShopPage
                initialCategory={selectedCategory}
                onSelectProduct={handleSelectProduct}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            </PageTransition>
          )}

          {currentView === 'detail' && selectedProduct && (
            <PageTransition key="detail">
              <ProductDetailPage
                product={selectedProduct}
                onSelectProduct={handleSelectProduct}
                onNavigateToShop={() => handleNavigate('shop')}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            </PageTransition>
          )}

          {currentView === 'checkout' && (
            <PageTransition key="checkout">
              <CheckoutPage
                onNavigateToShop={() => handleNavigate('shop')}
                onTrackOrder={handleTrackOrderFromCheckout}
              />
            </PageTransition>
          )}

          {currentView === 'track' && (
            <PageTransition key="track">
              <OrderTrackingPage
                initialOrderId={trackedOrderId}
                onNavigateToShop={() => handleNavigate('shop')}
              />
            </PageTransition>
          )}
        </AnimatePresence>
      </div>

      {/* Global Drawers & Modals */}
      <CartDrawer
        onNavigateToCheckout={() => handleNavigate('checkout')}
        onNavigateToShop={() => handleNavigate('shop')}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onSelectProduct={handleSelectProduct}
        onNavigateToShop={() => handleNavigate('shop')}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onViewFullDetail={(p) => handleSelectProduct(p)}
      />

      <PolicyModal
        type={activePolicy}
        onClose={() => setActivePolicy(null)}
      />

      {/* Floating WhatsApp Direct Chat */}
      <a
        href="https://wa.me/213657533005?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA%20%D9%8A%D9%88%D9%86%D8%B3%20%D8%B3%D8%A7%D8%B1%D8%AA%D9%88%D8%B1%D9%8A%D8%A7%D9%84"
        target="_blank"
        rel="noopener noreferrer"
        title="محادثة واتساب مباشرة"
        className="fixed bottom-6 right-6 z-50 p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group flex-row-reverse"
      >
        <MessageCircle className="w-6 h-6 shrink-0" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out group-hover:ml-2 text-xs font-bold">
          تواصل عبر واتساب
        </span>
      </a>

      {/* Footer */}
      <Footer 
        onNavigate={handleNavigate}
        onOpenPolicy={(policy) => setActivePolicy(policy)}
      />
    </div>
  );
}

export default function App() {
  return (
    <CurrencyProvider>
      <LanguageProvider>
        <ToastProvider>
          <WishlistProvider>
            <CartProvider>
              <ProductProvider>
                <AppContent />
              </ProductProvider>
            </CartProvider>
          </WishlistProvider>
        </ToastProvider>
      </LanguageProvider>
    </CurrencyProvider>
  );
}
