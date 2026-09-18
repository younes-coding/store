import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal, Grid3X3, LayoutGrid } from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { ProductFilter, type FilterState } from '../components/product/ProductFilter';
import { SkeletonCard } from '../components/common/SkeletonCard';
import { type Product } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import { useProducts } from '../context/ProductContext';

interface ShopPageProps {
  initialCategory?: string;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest' | 'rating';

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory = 'all',
  onSelectProduct,
  onQuickView
}) => {
  const { t } = useLanguage();
  const { products, categories: dynamicCategories } = useProducts();
  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    sizes: [],
    colors: [],
    isSaleOnly: false,
    isNewOnly: false
  });

  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [gridCols, setGridCols] = useState<3 | 4>(3);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync category if initialCategory changes from nav links
  React.useEffect(() => {
    if (initialCategory) {
      setFilters(prev => ({ ...prev, category: initialCategory }));
    }
  }, [initialCategory]);

  const handleFilterChange = (newFilters: FilterState) => {
    setIsLoading(true);
    setFilters(newFilters);
    setTimeout(() => setIsLoading(false), 200);
  };

  const handleResetFilters = () => {
    setIsLoading(true);
    setFilters({
      category: 'all',
      sizes: [],
      colors: [],
      isSaleOnly: false,
      isNewOnly: false
    });
    setTimeout(() => setIsLoading(false), 200);
  };

  const activeCategoryObj = dynamicCategories.find(c => 
    c.id === filters.category || 
    (c as any).slug === filters.category || 
    (c as any)._id === filters.category ||
    c.label === filters.category ||
    c.labelAr === filters.category
  );

  const categoryTitle = filters.category === 'all'
    ? t('shopTitle')
    : activeCategoryObj ? (activeCategoryObj.labelAr || activeCategoryObj.label) : (filters.category || t('allCategories'));

  const categoryDescription = filters.category === 'all'
    ? t('shopSubtitle')
    : activeCategoryObj ? (activeCategoryObj.descriptionAr || activeCategoryObj.description || '') : '';

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category
      if (filters.category !== 'all') {
        const matchesCat =
          product.category === filters.category ||
          product.categoryLabel === filters.category ||
          (activeCategoryObj && (
            product.category === activeCategoryObj.id ||
            product.category === (activeCategoryObj as any).slug ||
            product.categoryLabel === activeCategoryObj.label ||
            product.categoryLabel === activeCategoryObj.labelAr
          ));
        if (!matchesCat) return false;
      }

      // Sizes
      if (filters.sizes.length > 0) {
        const hasSize = filters.sizes.some(s => product.sizes && product.sizes.includes(s));
        if (!hasSize) return false;
      }

      // Colors
      if (filters.colors.length > 0) {
        const hasColor = filters.colors.some(cName =>
          product.colors && product.colors.some(pc => 
            pc.name.toLowerCase().includes(cName.toLowerCase()) || 
            (pc.nameAr && pc.nameAr.toLowerCase().includes(cName.toLowerCase()))
          )
        );
        if (!hasColor) return false;
      }

      // Sale only
      if (filters.isSaleOnly && !product.isSale) {
        return false;
      }

      // New only
      if (filters.isNewOnly && !(product.isNew || product.isNewItem)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return ((b.isNew || b.isNewItem) ? 1 : 0) - ((a.isNew || a.isNewItem) ? 1 : 0);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [products, filters, sortBy, activeCategoryObj]);

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
      {/* Header Banner */}
      <div className="mb-10 text-center sm:text-right space-y-2 pb-8 border-b border-brand-200">
        <span className="text-xs font-bold uppercase tracking-wider text-accent">YOUNES SARTORIAL — الفخامة الكلاسيكية OLD MONEY</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-dark">
          {categoryTitle}
        </h1>
        <p className="text-sm text-neutral-600 max-w-2xl font-normal leading-relaxed">
          {categoryDescription ? (
            <span>
              <strong className="text-dark font-semibold">{t('showingResults')} {filteredProducts.length} {t('garmentsFound')}</strong> — {categoryDescription}
            </span>
          ) : (
            <span>
              {t('showingResults')} {filteredProducts.length} {t('garmentsFound')}
            </span>
          )}
        </p>
      </div>

      {/* Control Bar (Sort, Mobile Filter Button, Grid Toggle) */}
      <div className="flex flex-row items-center justify-between mb-8 pb-6 border-b border-brand-200/60">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-dark hidden sm:inline">
            ترتيب المعروضات:
          </span>
        </div>

        {/* Actions Left in RTL */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden px-4 py-2.5 bg-white border border-brand-200 rounded-xl text-xs font-bold text-dark flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Filter className="w-4 h-4 text-accent" />
            <span>{t('filterByCategory')}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-neutral-400 hidden sm:inline" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-white border border-brand-200 rounded-xl px-3 py-2.5 text-xs font-bold text-dark focus:outline-none focus:border-accent shadow-sm cursor-pointer"
            >
              <option value="featured">{t('sortFeatured')}</option>
              <option value="newest">{t('badgeNew')}</option>
              <option value="price-low">{t('sortPriceAsc')}</option>
              <option value="price-high">{t('sortPriceDesc')}</option>
              <option value="rating">{t('sortRating')}</option>
            </select>
          </div>

          {/* Desktop Grid Switcher */}
          <div className="hidden lg:flex items-center gap-1 bg-brand-100 p-1 rounded-xl border border-brand-200">
            <button
              onClick={() => setGridCols(3)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${gridCols === 3 ? 'bg-white shadow-sm text-dark' : 'text-neutral-400 hover:text-dark'}`}
              title="3 أعمدة"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${gridCols === 4 ? 'bg-white shadow-sm text-dark' : 'text-neutral-400 hover:text-dark'}`}
              title="4 أعمدة"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar Filter */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-28">
          <ProductFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalResults={filteredProducts.length}
          />
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-9">
          {isLoading ? (
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6`}>
              {[1, 2, 3, 4, 5, 6].map(n => (
                <SkeletonCard key={n} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-brand-200 p-8 space-y-4 shadow-sm">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                <Filter className="w-8 h-8 text-brand-400" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-dark">لم يتم العثور على أي قطع</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                لا توجد قطع تطابق خيارات التصفية الحالية. جرّب ضبط المقاس، اللون، أو مسح الفلاتر.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-3 bg-dark text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                إعادة تعيين جميع الفلاتر
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
              } gap-6`}
            >
              <AnimatePresence>
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={onSelectProduct}
                    onQuickView={onQuickView}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </main>
      </div>

      {/* Mobile Filter Slide-Over Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 max-w-xs w-full bg-brand-50 shadow-2xl overflow-y-auto"
            >
              <ProductFilter
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                totalResults={filteredProducts.length}
                isMobileDrawer={true}
                onCloseMobile={() => setIsMobileFilterOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
