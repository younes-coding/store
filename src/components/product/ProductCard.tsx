import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { getLocalizedProduct, type Product } from '../../data/products';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCurrency } from '../../context/CurrencyContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product: rawProduct,
  onSelect,
  onQuickView
}) => {
  const { language, t } = useLanguage();
  const product = getLocalizedProduct(rawProduct, language);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { formatPrice } = useCurrency();
  const selectedColor = product.colors[0] || { name: 'افتراضي', hex: '#1A1A1A' };

  const isLiked = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, product.sizes[0] || 'قياسي', 1);
    showToast(t('addedToBag'), `${product.name} (${selectedColor.name})`, 'success');
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast(
      isLiked ? 'تم الحذف من المفضلة' : 'تم الحفظ في المفضلة',
      product.name,
      'info'
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-brand-200/60 shadow-sm hover:shadow-floating transition-all duration-300 cursor-pointer text-right"
      onClick={() => onSelect(product)}
    >
      {/* Image Container with Badges & Hover Actions */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-100/40">
        {product.images && product.images.length > 0 && product.images[0] ? (
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-brand-100/70 via-brand-50 to-brand-100/50 p-6 text-center select-none">
            <div className="w-16 h-16 rounded-full bg-white/90 border border-brand-300 shadow-sm flex items-center justify-center mb-3">
              <span className="font-serif text-xl font-bold text-accent tracking-wider">ي</span>
            </div>
            <p className="font-serif text-xs font-bold text-dark line-clamp-2 px-2">{product.name}</p>
            <span className="text-[10px] text-neutral-400 font-bold mt-1.5">
              متجر يونس
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNew && (
            <span className="px-2.5 py-1 bg-dark text-white text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3 text-accent" /> {t('badgeNew')}
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2.5 py-1 bg-accent text-dark text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
              {t('badgeBestSeller')}
            </span>
          )}
          {product.isSale && (
            <span className="px-2.5 py-1 bg-rose-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
              {t('badgeSale')}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleWishlistClick}
          className={`absolute top-3 left-3 z-10 p-2.5 rounded-full backdrop-blur-md transition-colors shadow-sm cursor-pointer ${
            isLiked
              ? 'bg-rose-500 text-white'
              : 'bg-white/80 text-dark hover:bg-white hover:text-rose-500'
          }`}
          aria-label="حفظ في المفضلة"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </motion.button>

        {/* Quick View Button */}
        <div className="absolute inset-x-4 bottom-14 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hidden sm:flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-4 py-2 bg-white/95 backdrop-blur-md text-dark hover:bg-dark hover:text-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-accent" /> {t('quickView')}
          </button>
        </div>

        {/* Quick Add To Cart Button */}
        <div className="absolute inset-x-4 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleQuickAdd}
            className="w-full py-3 bg-dark text-white hover:bg-neutral-800 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-luxury transition-all cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-accent" />
            <span>{t('addToBag')}</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white text-right">
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
            <span className="font-bold text-accent">{product.categoryLabel}</span>
            <div className="flex items-center gap-1 text-amber-600 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-neutral-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-serif text-lg font-bold text-dark line-clamp-1 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">{product.subtitle}</p>
        </div>

        <div className="mt-4 pt-3 border-t border-brand-100 flex items-center justify-between">
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-sm text-dark font-serif">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-[11px] text-neutral-400 line-through font-serif">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color Name Badge */}
          <div className="text-[11px] text-neutral-600 font-bold bg-brand-50 px-2 py-0.5 rounded-md border border-brand-200 truncate max-w-[120px]" title={selectedColor.nameAr || selectedColor.name}>
            {selectedColor.nameAr || selectedColor.name}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
