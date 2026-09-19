import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCurrency } from '../../context/CurrencyContext';
import { getLocalizedProduct } from '../../data/products';

interface CartDrawerProps {
  onNavigateToCheckout: () => void;
  onNavigateToShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onNavigateToCheckout,
  onNavigateToShop
}) => {
  const { language, t } = useLanguage();
  const { formatPrice } = useCurrency();
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    finalTotal
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 left-0 max-w-full flex pr-0 sm:pr-10">
            {/* Side Drawer Box */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="w-screen max-w-full sm:max-w-md bg-brand-50 shadow-2xl flex flex-col justify-between border-r border-brand-200 text-right"
            >
              {/* Header */}
              <div className="p-6 border-b border-brand-200 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-dark" />
                  <h2 className="font-serif text-2xl font-bold text-dark">
                    {t('cartTitle')} ({cart.length})
                  </h2>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 text-neutral-500 hover:text-dark hover:bg-brand-100 rounded-full transition-colors cursor-pointer"
                  aria-label="إغلاق حقيبة التسوق"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                      <ShoppingBag className="w-8 h-8 text-brand-400" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-dark mb-2">{t('emptyCartMessage')}</h3>
                    <button
                      onClick={() => {
                        closeCart();
                        onNavigateToShop();
                      }}
                      className="px-6 py-3 rounded-full bg-dark text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-md cursor-pointer"
                    >
                      {t('startShopping')}
                    </button>
                  </div>
                ) : (
                  <AnimatePresence>
                    {cart.map(item => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-4 p-4 rounded-xl bg-white border border-brand-200/70 shadow-sm relative group text-right"
                      >
                        {/* Image */}
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-24 object-cover rounded-lg bg-neutral-100 shrink-0 border border-brand-200"
                        />

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between min-w-0 pl-6">
                          <div>
                            <h4 className="text-sm font-bold text-dark truncate">
                              {getLocalizedProduct(item.product, language).name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 text-xs text-neutral-500">
                              <span className="flex items-center gap-1 font-semibold">
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-neutral-300 inline-block"
                                  style={{ backgroundColor: item.selectedColor.hex }}
                                />
                                {item.selectedColor.nameAr || item.selectedColor.name}
                              </span>
                              <span>•</span>
                              <span>المقاس: <strong>{item.selectedSize}</strong></span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity buttons */}
                            <div className="flex items-center border border-brand-200 rounded-lg bg-brand-50">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 text-neutral-600 hover:text-dark transition-colors font-bold cursor-pointer"
                                aria-label="تقليل الكمية"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-7 text-center text-xs font-bold text-dark">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 text-neutral-600 hover:text-dark transition-colors font-bold cursor-pointer"
                                aria-label="زيادة الكمية"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Price */}
                            <span className="font-bold text-xs text-dark font-serif">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>

                        {/* Remove item button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="absolute top-3 left-3 text-neutral-400 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                          aria-label="حذف العنصر"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-brand-200 space-y-4 text-right">
                  {/* Pricing lines */}
                  <div className="space-y-2 text-xs text-neutral-600">
                    <div className="flex justify-between text-sm font-bold text-dark">
                      <span>{t('total')}</span>
                      <span className="text-xl font-bold text-dark font-serif">{formatPrice(finalTotal || subtotal)}</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    onClick={() => {
                      closeCart();
                      onNavigateToCheckout();
                    }}
                    className="w-full py-4 bg-dark hover:bg-neutral-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-luxury group cursor-pointer"
                  >
                    <span>{t('proceedToCheckout')}</span>
                    <ArrowRight className="w-4 h-4 text-accent rotate-180 group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
