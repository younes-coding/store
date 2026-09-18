import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  ShoppingBag,
  Heart,
  ChevronLeft,
  Truck,
  RotateCcw,
  Check,
  Share2,
  MessageCircle
} from 'lucide-react';
import { getLocalizedProduct, type Product, type ProductColor } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { ProductReviews } from '../components/product/ProductReviews';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useProducts } from '../context/ProductContext';

interface ProductDetailPageProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onNavigateToShop: () => void;
  onQuickView: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product: rawProduct,
  onSelectProduct,
  onNavigateToShop,
  onQuickView
}) => {
  const { language, t } = useLanguage();
  const product = getLocalizedProduct(rawProduct, language);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const { formatPrice } = useCurrency();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'افتراضي', hex: '#1A1A1A' });
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '48 (M)');
  const [quantity, setQuantity] = useState(1);

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    showToast(t('addedToBag'), `${product.name} (${selectedColor.nameAr || selectedColor.name}, ${selectedSize})`, 'success');
  };

  const handleWhatsAppQuickOrder = () => {
    const formattedAmount = formatPrice(product.price * quantity);
    const msg = encodeURIComponent(
      `مرحباً يونس سارتوريال للأزياء،\nأود طلب القطعة التالية بنظام الدفع عند الاستلام:\n- القطعة: ${product.name}\n- المقاس: ${selectedSize}\n- اللون: ${selectedColor.nameAr || selectedColor.name}\n- الكمية: ${quantity}\n- السعر: ${formattedAmount}\n\nيرجى تأكيد التوافر وتفاصيل التوصيل.`
    );
    window.open(`https://wa.me/213657533005?text=${msg}`, '_blank');
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product.id);
    showToast(isLiked ? 'تم الحذف من المفضلة' : 'تم الحفظ في المفضلة', product.name, 'info');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('تم نسخ الرابط', 'تم نسخ رابط المنتج إلى الحافظة بنجاح.', 'info');
    }
  };

  const { products } = useProducts();

  // Find related products
  const relatedProducts = products.filter(p =>
    (product.relatedIds && product.relatedIds.includes(p.id)) || (p.category === product.category && p.id !== product.id)
  ).slice(0, 3);

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8 overflow-x-auto whitespace-nowrap">
        <button onClick={onNavigateToShop} className="hover:text-dark transition-colors font-bold cursor-pointer">
          الرئيسية
        </button>
        <ChevronLeft className="w-3.5 h-3.5 text-neutral-400" />
        <button
          onClick={() => onNavigateToShop()}
          className="hover:text-dark transition-colors font-bold cursor-pointer"
        >
          {product.categoryLabel}
        </button>
        <ChevronLeft className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-dark font-bold truncate">{product.name}</span>
      </nav>

      {/* Main Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
        {/* Right Column in RTL: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-brand-100/50 shadow-md border border-brand-200">
            {product.images && product.images.length > 0 && product.images[activeImageIndex] ? (
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-brand-100/80 to-brand-50 p-8 text-center select-none">
                <div className="w-24 h-24 rounded-full bg-white shadow-md border border-brand-200 flex items-center justify-center mb-4">
                  <span className="font-serif text-3xl font-bold text-accent">L</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-dark mb-2">{product.name}</h3>
                <p className="text-xs text-neutral-500 max-w-sm">{product.subtitle}</p>
                <div className="mt-4 px-4 py-2 rounded-full bg-white/90 border border-brand-200 shadow-sm text-xs text-accent font-bold">
                  LUMIÈRE Sartorial
                </div>
              </div>
            )}

            {/* Share & Wishlist overlay buttons */}
            <div className="absolute top-4 left-4 flex gap-2">
              <button
                onClick={handleShare}
                className="p-3 rounded-full bg-white/90 backdrop-blur-md text-dark hover:bg-dark hover:text-white transition-colors shadow-sm cursor-pointer"
                title="مشاركة الرابط"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`p-3 rounded-full backdrop-blur-md transition-colors shadow-sm cursor-pointer ${
                  isLiked ? 'bg-rose-500 text-white' : 'bg-white/90 text-dark hover:bg-white hover:text-rose-500'
                }`}
                title="حفظ في المفضلة"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Live Stock Badge */}
            {product.stockCount <= 5 && (
              <div className="absolute bottom-4 right-4 bg-dark/90 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold border border-amber-500/30 flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>إصدار محدود — متبقي {product.stockCount} قطع فقط</span>
              </div>
            )}
          </div>

          {/* Thumbnails Row */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-accent ring-2 ring-accent/40 shadow-sm'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Left Column in RTL: Product Info & Purchase Form */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
              <span className="font-bold text-accent text-sm tracking-wider">
                {product.categoryLabel}
              </span>
              <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-neutral-400 font-normal">({product.reviewCount} تقييم حقيقي)</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-dark leading-tight">
              {product.name}
            </h1>
            <p className="text-xs text-neutral-500 mt-1">{product.subtitle}</p>

            <div className="flex items-baseline gap-3 mt-4 pt-4 border-t border-brand-200/80">
              <span className="font-bold text-3xl text-dark font-serif">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-base text-neutral-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <p className="text-xs text-neutral-700 leading-relaxed font-normal">
            {product.description}
          </p>

          {/* Color Selection (Text-based buttons) */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold text-dark">
              اللون المختار: <span className="text-accent font-bold">{selectedColor.nameAr || selectedColor.name}</span>
            </label>
            <div className="flex flex-wrap gap-2.5">
              {product.colors.map(color => {
                const isSelected = (selectedColor.nameAr && color.nameAr && selectedColor.nameAr === color.nameAr) || selectedColor.name === color.name;
                return (
                  <button
                    key={color.nameAr || color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                      isSelected
                        ? 'bg-dark text-white border-dark ring-2 ring-accent/50 shadow-sm'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-dark hover:bg-brand-50'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-accent" />}
                    <span>{color.nameAr || color.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2 pt-2">
            <div className="text-xs">
              <label className="font-bold text-dark">
                المقاس الإيطالي المعتمد
              </label>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSize === size
                      ? 'bg-dark text-white shadow-md'
                      : 'bg-brand-50 text-dark border border-brand-200 hover:border-dark'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-3 pt-4">
            <div className="flex gap-4">
              <div className="flex items-center border border-brand-200 rounded-xl bg-brand-50 px-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-neutral-500 hover:text-dark p-2 font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold text-dark">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-neutral-500 hover:text-dark p-2 font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-dark hover:bg-neutral-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-3 shadow-luxury transition-all group cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                <span>إضافة لحقيبة التسوق — {formatPrice(product.price * quantity)}</span>
              </button>
            </div>

            {/* Direct Instant WhatsApp Order Button */}
            <button
              onClick={handleWhatsAppQuickOrder}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>طلب مباشر بنقرة واحدة عبر WhatsApp (دفع عند الاستلام)</span>
            </button>
          </div>

          {/* Trust value props */}
          <div className="grid grid-cols-2 gap-3 py-4 border-y border-brand-200/80 text-xs text-neutral-700 font-bold">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-accent shrink-0" />
              <span>توصيل لكافة الـ 69 ولاية مع المعاينة</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-accent shrink-0" />
              <span>ضمان استبدال المقاس مجاناً</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <ProductReviews
        productId={product.id}
        productName={product.name}
        rating={product.rating}
        reviewCount={product.reviewCount}
      />

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="space-y-8 pt-16 border-t border-brand-200 mt-16">
          <div className="text-right">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">مختارات متناسقة</span>
            <h2 className="font-serif text-3xl font-bold text-dark">
              قطع تكمل أناقتك الكلاسيكية
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map(rel => (
              <ProductCard
                key={rel.id}
                product={rel}
                onSelect={onSelectProduct}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
