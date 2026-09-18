import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Menu, X, Sparkles, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useLanguage } from '../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export type ViewMode = 'home' | 'shop' | 'detail' | 'checkout' | 'track';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode, category?: string) => void;
  onOpenWishlist: () => void;
  onOpenPolicy: (type: 'shipping' | 'returns' | 'authenticity' | 'contact' | 'faq') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  onNavigate, 
  onOpenWishlist,
  onOpenPolicy
}) => {
  const { totalItems, toggleCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Banner Announcement */}
      <div className="bg-dark text-brand-100 text-xs py-2 px-4 font-medium tracking-wider flex items-center justify-between border-b border-neutral-800">
        <div className="hidden md:flex items-center gap-4 text-[11px] text-neutral-400">
          <button 
            onClick={() => onOpenPolicy('shipping')}
            className="hover:text-accent transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Truck className="w-3.5 h-3.5 text-accent" />
            <span>توصيل سريع لكافة الـ 69 ولاية مع المعاينة قبل الدفع</span>
          </button>
          <span>•</span>
          <button 
            onClick={() => onOpenPolicy('contact')}
            className="hover:text-accent transition-colors cursor-pointer"
          >
            رقم الهاتف: 0657533005
          </button>
        </div>

        <div className="flex-1 md:flex-initial text-center flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse shrink-0" />
          <span className="truncate">{t('topBanner')}</span>
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-[11px] font-bold text-accent bg-neutral-900/80 px-2.5 py-0.5 rounded-full border border-neutral-700">
          <span>د.ج (دينار جزائري)</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-sm py-3.5 border-b border-brand-200/50'
            : 'bg-brand-50/90 backdrop-blur-md py-4.5 border-b border-brand-200/30'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-dark hover:text-brand-600 transition-colors cursor-pointer"
              aria-label="قائمة التصفح"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-8 text-sm font-semibold tracking-wide text-neutral-700">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-dark transition-colors relative px-2.5 py-1.5 cursor-pointer ${
                currentView === 'home' ? 'text-dark font-bold text-accent' : ''
              }`}
            >
              <span>{t('navHome')}</span>
              {currentView === 'home' && (
                <motion.div
                  layoutId="activeNavTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                />
              )}
            </button>

            <button
              onClick={() => onNavigate('shop')}
              className={`hover:text-dark transition-colors relative px-2.5 py-1.5 cursor-pointer ${
                currentView === 'shop' ? 'text-dark font-bold text-accent' : ''
              }`}
            >
              <span>{t('navCollection')}</span>
              {currentView === 'shop' && (
                <motion.div
                  layoutId="activeNavTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                />
              )}
            </button>

            <button
              onClick={() => onNavigate('track')}
              className={`hover:text-dark transition-colors relative px-2.5 py-1.5 flex items-center gap-1.5 cursor-pointer ${
                currentView === 'track' ? 'text-dark font-bold text-accent' : ''
              }`}
            >
              <Truck className="w-4 h-4 text-accent" />
              <span>تتبع الطلب</span>
              {currentView === 'track' && (
                <motion.div
                  layoutId="activeNavTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                />
              )}
            </button>

            <button
              onClick={() => onOpenPolicy('faq')}
              className="hover:text-dark transition-colors px-2.5 py-1.5 cursor-pointer text-neutral-600"
            >
              الأسئلة الشائعة
            </button>

            <button
              onClick={() => onOpenPolicy('contact')}
              className="hover:text-dark transition-colors px-2.5 py-1.5 cursor-pointer text-neutral-600"
            >
              اتصل بنا
            </button>
          </div>

          {/* Logo Center */}
          <div className="flex flex-col items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-dark tracking-[0.15em] uppercase">
              YOUNES SARTORIAL
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-accent font-bold -mt-0.5">
              يونس سارتوريال • الفخامة الكلاسيكية
            </span>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3.5 rtl:space-x-reverse">
            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-dark hover:text-accent transition-colors rounded-full hover:bg-brand-100/50 cursor-pointer"
              title="المفضلة والقطع المحفوظة"
              aria-label="المفضلة"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleCart}
              className="relative flex items-center gap-2 py-2 px-3.5 rounded-full bg-dark text-white hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
              aria-label="حقيبة التسوق"
            >
              <ShoppingBag className="w-4 h-4 text-brand-100" />
              <span className="text-xs font-bold hidden sm:inline">{t('navBag')}</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  className="w-5 h-5 bg-accent text-dark text-[11px] font-bold rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-brand-50 border-b border-brand-200 px-6 py-6 space-y-4 shadow-xl overflow-hidden text-right"
          >
            <div className="flex flex-col space-y-3 text-sm font-bold text-neutral-800">
              <button
                onClick={() => {
                  onNavigate('home');
                  setIsMobileMenuOpen(false);
                }}
                className="text-right py-3 border-b border-brand-200/50 hover:text-accent text-base"
              >
                الرئيسية
              </button>
              <button
                onClick={() => {
                  onNavigate('shop');
                  setIsMobileMenuOpen(false);
                }}
                className="text-right py-3 border-b border-brand-200/50 hover:text-accent text-base"
              >
                جميع الملابس والأطقم
              </button>
              <button
                onClick={() => {
                  onNavigate('track');
                  setIsMobileMenuOpen(false);
                }}
                className="text-right py-3 border-b border-brand-200/50 hover:text-accent text-base flex items-center justify-between"
              >
                <span>تتبع مسار شحنتك</span>
                <Truck className="w-4 h-4 text-accent" />
              </button>
              <button
                onClick={() => {
                  onOpenPolicy('shipping');
                  setIsMobileMenuOpen(false);
                }}
                className="text-right py-2 text-neutral-600 hover:text-dark text-xs"
              >
                سياسة التوصيل (69 ولاية)
              </button>
              <button
                onClick={() => {
                  onOpenPolicy('returns');
                  setIsMobileMenuOpen(false);
                }}
                className="text-right py-2 text-neutral-600 hover:text-dark text-xs"
              >
                سياسة الاستبدال والإرجاع
              </button>
              <button
                onClick={() => {
                  onOpenPolicy('contact');
                  setIsMobileMenuOpen(false);
                }}
                className="text-right py-2 text-neutral-600 hover:text-dark text-xs"
              >
                خدمة العملاء والكونسيرج
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
