import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, Heart, Check, ArrowLeft } from 'lucide-react';
import { type Product, type ProductColor } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { useCurrency } from '../../context/CurrencyContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onViewFullDetail: (product: Product) => void;
}

interface QuickViewModalContentProps {
  product: Product;
  onClose: () => void;
  onViewFullDetail: (product: Product) => void;
}

const QuickViewModalContent: React.FC<QuickViewModalContentProps> = ({
  product,
  onClose,
  onViewFullDetail
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const { formatPrice } = useCurrency();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, 1);
    showToast('تمت الإضافة للحقيبة', `${product.name} - ${selectedColor.name} / ${selectedSize}`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center">
      {/* Backdrop Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-dark/70 backdrop-blur-md"
      />

      {/* Modal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl z-10 border border-brand-200"
      >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-20 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-dark hover:bg-dark hover:text-white transition-colors shadow-sm"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Column */}
            <div className="p-6 bg-brand-50 flex flex-col justify-between">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-white shadow-sm mb-4">
                {product.images && product.images.length > 0 && product.images[selectedImage] ? (
                  <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-brand-100/70 to-brand-50 p-6 text-center select-none">
                    <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-brand-200 flex items-center justify-center mb-3">
                      <span className="font-serif text-xl font-bold text-accent">L</span>
                    </div>
                    <p className="font-serif text-sm font-semibold text-dark">{product.name}</p>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">
                      صورة مميزة
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImage === idx ? 'border-accent ring-2 ring-accent/30' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Column */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                  <span className="font-semibold text-accent">
                    {product.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 font-medium">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{product.rating}</span>
                    <span>({product.reviewCount} تقييم)</span>
                  </div>
                </div>

                <h2 className="font-serif text-2xl md:text-3xl font-light text-dark mb-2">
                  {product.name}
                </h2>

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl font-bold text-dark font-serif">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-neutral-400 line-through font-serif">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed mb-6 line-clamp-3">
                  {product.description}
                </p>

                {/* Color Selection (Text-based buttons) */}
                <div className="space-y-2 mb-6">
                  <span className="block text-xs font-semibold text-dark">
                    اللون المختار: <span className="text-accent font-bold">{selectedColor.nameAr || selectedColor.name}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map(color => {
                      const isSelected = (selectedColor.nameAr && color.nameAr && selectedColor.nameAr === color.nameAr) || selectedColor.name === color.name;
                      return (
                        <button
                          key={color.nameAr || color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                            isSelected
                              ? 'bg-dark text-white border-dark ring-2 ring-accent/40 shadow-xs'
                              : 'bg-white text-neutral-700 border-neutral-300 hover:border-dark hover:bg-brand-50'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-accent" />}
                          <span>{color.nameAr || color.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-dark">
                      اختر المقاس
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          selectedSize === size
                            ? 'bg-dark text-white shadow-sm'
                            : 'bg-brand-50 text-dark border border-brand-200 hover:border-dark'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3 pt-4 border-t border-brand-100">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 bg-dark hover:bg-neutral-800 text-white rounded-xl font-semibold text-xs tracking-wider flex items-center justify-center gap-2 shadow-luxury transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4 text-accent" />
                    <span>إضافة إلى حقيبة التسوق</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3.5 rounded-xl border transition-colors flex items-center justify-center ${
                      isLiked
                        ? 'border-rose-500 bg-rose-50 text-rose-500'
                        : 'border-brand-200 text-dark hover:bg-brand-100'
                    }`}
                    title="قائمة الأمنيات"
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onViewFullDetail(product);
                  }}
                  className="w-full text-center text-xs font-semibold text-neutral-600 hover:text-dark py-2 transition-colors flex items-center justify-center gap-1"
                >
                  <span>عرض كامل تفاصيل ومواصفات القطعة</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
  );
};

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onViewFullDetail
}) => {
  return (
    <AnimatePresence>
      {product && (
        <QuickViewModalContent
          key={product.id}
          product={product}
          onClose={onClose}
          onViewFullDetail={onViewFullDetail}
        />
      )}
    </AnimatePresence>
  );
};

