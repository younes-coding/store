import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, X, Filter, RefreshCw } from 'lucide-react';
import { CATEGORIES } from '../../data/products';
import { useProducts } from '../../context/ProductContext';

export interface FilterState {
  category: string;
  sizes: string[];
  colors: string[];
  isSaleOnly: boolean;
  isNewOnly: boolean;
}

interface ProductFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  totalResults: number;
  isMobileDrawer?: boolean;
  onCloseMobile?: () => void;
}

const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL', '38 (S)', '40 (M)', '42 (L)', '44 (XL)', '46 (XXL)', 'قياس موحد'];

const AVAILABLE_COLORS = [
  'أسود',
  'أبيض',
  'كحلي',
  'أزرق رمادي',
  'أخضر زمردي',
  'بيج',
  'رمادي فاتح'
];

export const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  isMobileDrawer = false,
  onCloseMobile
}) => {
  const { categories: dynamicCategories, products } = useProducts();
  const activeCategories = dynamicCategories && dynamicCategories.length > 0 ? dynamicCategories : CATEGORIES;
  const [openSections, setOpenSections] = useState({
    categories: true,
    sizes: true,
    colors: true,
    badges: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategorySelect = (catId: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === catId ? 'all' : catId
    });
  };

  const handleSizeToggle = (size: string) => {
    const updatedSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ ...filters, sizes: updatedSizes });
  };

  const handleColorToggle = (colorName: string) => {
    const updatedColors = filters.colors.includes(colorName)
      ? filters.colors.filter(c => c !== colorName)
      : [...filters.colors, colorName];
    onFilterChange({ ...filters, colors: updatedColors });
  };

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.isSaleOnly ||
    filters.isNewOnly;

  const content = (
    <div className="space-y-6 text-right">
      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="p-4 bg-brand-100/60 rounded-2xl border border-brand-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-dark">
              الفلاتر النشطة
            </span>
            <button
              onClick={onResetFilters}
              className="text-xs text-accent hover:text-accent-hover font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> إعادة تعيين الكل
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.category !== 'all' && (
              <span className="px-2.5 py-1 bg-white rounded-full text-xs text-dark font-medium border border-brand-200 flex items-center gap-1">
                القسم: {CATEGORIES.find(c => c.id === filters.category)?.labelAr || CATEGORIES.find(c => c.id === filters.category)?.label}
                <X className="w-3 h-3 cursor-pointer text-neutral-400 hover:text-dark mr-1" onClick={() => handleCategorySelect(filters.category)} />
              </span>
            )}

            {filters.sizes.map(s => (
              <span key={s} className="px-2.5 py-1 bg-white rounded-full text-xs text-dark font-medium border border-brand-200 flex items-center gap-1">
                المقاس: {s}
                <X className="w-3 h-3 cursor-pointer text-neutral-400 hover:text-dark mr-1" onClick={() => handleSizeToggle(s)} />
              </span>
            ))}

            {filters.colors.map(c => (
              <span key={c} className="px-2.5 py-1 bg-white rounded-full text-xs text-dark font-medium border border-brand-200 flex items-center gap-1">
                اللون: {c}
                <X className="w-3 h-3 cursor-pointer text-neutral-400 hover:text-dark mr-1" onClick={() => handleColorToggle(c)} />
              </span>
            ))}

            {filters.isSaleOnly && (
              <span className="px-2.5 py-1 bg-rose-50 text-rose-700 rounded-full text-xs font-bold border border-rose-200 flex items-center gap-1">
                التخفيضات فقط
                <X className="w-3 h-3 cursor-pointer text-rose-500 hover:text-rose-700 mr-1" onClick={() => onFilterChange({ ...filters, isSaleOnly: false })} />
              </span>
            )}
          </div>
        </div>
      )}

      {/* Categories Accordion */}
      <div className="border-b border-brand-200/80 pb-5">
        <button
          onClick={() => toggleSection('categories')}
          className="w-full flex items-center justify-between text-sm font-bold text-dark mb-3 cursor-pointer"
        >
          <span>الأقسام والتصنيفات</span>
          {openSections.categories ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <AnimatePresence initial={false}>
          {openSections.categories && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-1.5 overflow-hidden"
            >
              <button
                onClick={() => handleCategorySelect('all')}
                className={`w-full flex items-center justify-between text-xs py-2 px-3 rounded-xl transition-colors cursor-pointer ${
                  filters.category === 'all'
                    ? 'bg-dark text-white font-bold'
                    : 'text-neutral-600 hover:bg-brand-100 hover:text-dark'
                }`}
              >
                <span>جميع المعروضات</span>
              </button>
              {activeCategories.map(cat => {
                const count = products.filter(p => 
                  p.category === cat.id || 
                  (cat as any).slug === p.category || 
                  p.categoryLabel === cat.label || 
                  p.categoryLabel === cat.labelAr
                ).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`w-full flex items-center justify-between text-xs py-2 px-3 rounded-xl transition-colors cursor-pointer ${
                      filters.category === cat.id
                        ? 'bg-dark text-white font-bold'
                        : 'text-neutral-600 hover:bg-brand-100 hover:text-dark'
                    }`}
                  >
                    <span>{cat.labelAr || cat.label}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${filters.category === cat.id ? 'bg-accent text-dark' : 'bg-brand-100 text-neutral-500'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sizes Grid */}
      <div className="border-b border-brand-200/80 pb-5">
        <button
          onClick={() => toggleSection('sizes')}
          className="w-full flex items-center justify-between text-sm font-bold text-dark mb-3 cursor-pointer"
        >
          <span>المقاس</span>
          {openSections.sizes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <AnimatePresence initial={false}>
          {openSections.sizes && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-wrap gap-2 overflow-hidden"
            >
              {AVAILABLE_SIZES.map(size => {
                const isSelected = filters.sizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => handleSizeToggle(size)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-dark text-white shadow-sm'
                        : 'bg-white text-neutral-600 border border-brand-200 hover:border-dark'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Color Badges */}
      <div className="border-b border-brand-200/80 pb-5">
        <button
          onClick={() => toggleSection('colors')}
          className="w-full flex items-center justify-between text-sm font-bold text-dark mb-3 cursor-pointer"
        >
          <span>اللون</span>
          {openSections.colors ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <AnimatePresence initial={false}>
          {openSections.colors && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-wrap gap-2 overflow-hidden"
            >
              {AVAILABLE_COLORS.map(colorName => {
                const isSelected = filters.colors.includes(colorName);
                return (
                  <button
                    key={colorName}
                    onClick={() => handleColorToggle(colorName)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-dark text-white shadow-sm ring-1 ring-accent/40'
                        : 'bg-white text-neutral-700 border border-brand-200 hover:border-dark'
                    }`}
                  >
                    {colorName}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Checkbox Badges */}
      <div className="space-y-3">
        <label className="flex items-center gap-3 text-xs font-bold text-dark cursor-pointer">
          <input
            type="checkbox"
            checked={filters.isSaleOnly}
            onChange={(e) => onFilterChange({ ...filters, isSaleOnly: e.target.checked })}
            className="w-4 h-4 rounded text-accent focus:ring-accent accent-accent cursor-pointer"
          />
          <span>عرض المنتجات المخفضة فقط</span>
        </label>

        <label className="flex items-center gap-3 text-xs font-bold text-dark cursor-pointer">
          <input
            type="checkbox"
            checked={filters.isNewOnly}
            onChange={(e) => onFilterChange({ ...filters, isNewOnly: e.target.checked })}
            className="w-4 h-4 rounded text-accent focus:ring-accent accent-accent cursor-pointer"
          />
          <span>عرض القطع الواصلة حديثاً فقط</span>
        </label>
      </div>
    </div>
  );

  if (isMobileDrawer) {
    return (
      <div className="p-6 bg-brand-50 min-h-full flex flex-col justify-between text-right">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-brand-200 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-accent" />
              <h3 className="font-serif text-2xl font-bold text-dark">تصفية التشكيلة</h3>
            </div>
            <button
              onClick={onCloseMobile}
              className="p-2 text-neutral-500 hover:text-dark cursor-pointer"
              aria-label="إغلاق الفلاتر"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {content}
        </div>

        <div className="pt-6 border-t border-brand-200 mt-8">
          <button
            onClick={onCloseMobile}
            className="w-full py-3.5 bg-dark text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
          >
            عرض النتائج ({totalResults} قطعة)
          </button>
        </div>
      </div>
    );
  }

  return content;
};
