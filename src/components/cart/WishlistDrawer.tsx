import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useToast } from '../../context/ToastContext';
import { useProducts } from '../../context/ProductContext';
import { type Product } from '../../data/products';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onNavigateToShop: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onNavigateToShop
}) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { products } = useProducts();
  const { addToCart, openCart } = useCart();
  const { formatPrice } = useCurrency();
  const { showToast } = useToast();

  const wishlistProducts = wishlist
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as Product[];

  const handleMoveToCart = (product: Product) => {
    const defaultColor = product.colors && product.colors.length > 0
      ? product.colors[0]
      : { name: 'Default', hex: '#111' };
    const defaultSize = product.sizes && product.sizes.length > 0
      ? product.sizes[0]
      : 'Standard';

    addToCart(product, defaultColor, defaultSize, 1);
    toggleWishlist(product.id);
    showToast('تمت الإضافة لحقيبة التسوق', `تم نقل "${product.name}" إلى حقيبة التسوق بنجاح.`, 'success');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
            {/* Side Drawer Box */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="w-screen max-w-md bg-brand-50 shadow-2xl flex flex-col justify-between border-r border-brand-200 text-right"
            >
              {/* Header */}
              <div className="p-6 border-b border-brand-200 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
                    <Heart className="w-5 h-5 fill-rose-600" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-dark">
                      قائمة الرغبات والمفضلة
                    </h2>
                    <span className="text-[11px] text-neutral-500 font-medium">
                      ({wishlist.length}) قطع محفوظة
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-neutral-500 hover:text-dark hover:bg-brand-100 rounded-full transition-colors cursor-pointer"
                  aria-label="إغلاق قائمة المفضلة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mb-4 text-rose-300">
                      <Heart className="w-10 h-10" />
                    </div>
                    <h3 className="font-serif text-2xl font-light text-dark mb-2">
                      قائمة أمنياتك فارغة حالياً
                    </h3>
                    <p className="text-xs text-neutral-500 max-w-xs mb-6">
                      احفظ إطلالاتك وقطعك المفضلة للعودة إليها وشرائها في أي وقت.
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateToShop();
                      }}
                      className="px-6 py-3 rounded-full bg-dark text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-md cursor-pointer"
                    >
                      استكشاف التشكيلات الفاخرة
                    </button>
                  </div>
                ) : (
                  <AnimatePresence>
                    {wishlistProducts.map(product => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-4 p-4 rounded-2xl bg-white border border-brand-200 shadow-sm relative group"
                      >
                        {/* Image */}
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-20 h-24 object-cover rounded-xl bg-neutral-100 shrink-0 border border-brand-200 cursor-pointer"
                          onClick={() => {
                            onSelectProduct(product);
                            onClose();
                          }}
                        />

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <h4 
                              onClick={() => {
                                onSelectProduct(product);
                                onClose();
                              }}
                              className="text-xs font-bold text-dark truncate hover:text-accent transition-colors cursor-pointer"
                            >
                              {product.name}
                            </h4>
                            <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                              {product.categoryLabel}
                            </p>
                            <span className="font-bold text-xs text-dark mt-1 block">
                              {formatPrice(product.price)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mt-3">
                            {/* Move to cart */}
                            <button
                              onClick={() => handleMoveToCart(product)}
                              className="flex-1 py-2 px-3 bg-dark hover:bg-neutral-800 text-white rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>إلى الحقيبة</span>
                            </button>

                            {/* Remove button */}
                            <button
                              onClick={() => toggleWishlist(product.id)}
                              className="p-2 text-neutral-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                              title="إزالة من المفضلة"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Bottom bar if items exist */}
              {wishlistProducts.length > 0 && (
                <div className="p-6 bg-white border-t border-brand-200">
                  <button
                    onClick={() => {
                      wishlistProducts.forEach(p => handleMoveToCart(p));
                      openCart();
                      onClose();
                    }}
                    className="w-full py-3.5 bg-brand-100 hover:bg-brand-200 text-dark rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-dark" />
                    <span>نقل جميع القطع إلى حقيبة التسوق</span>
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
