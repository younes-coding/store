import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { getLocalizedProduct, type Product } from '../../data/products';
import { useLanguage } from '../../context/LanguageContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useProducts } from '../../context/ProductContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const { language, t } = useLanguage();
  const { formatPrice } = useCurrency();
  const { products } = useProducts();
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const popularTags = language === 'ar'
    ? ['بليزر كلاسيكي', 'لوفرز إيطالي', 'كشمير خالص', 'ساعة تراثية', 'نظارات هافانا']
    : ['Camel Blazer', 'Suede Loafers', 'Cashmere Crewneck', 'Heritage Watch', 'Havana Sunglasses'];

  const results = query.trim() === ''
    ? []
    : products.map(p => getLocalizedProduct(p, language)).filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.nameAr && p.nameAr.toLowerCase().includes(query.toLowerCase())) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex flex-col items-center justify-start pt-16 sm:pt-24 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-dark/75 backdrop-blur-md"
        />

        {/* Search Container */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl z-10 border border-brand-200"
        >
          {/* Input Header */}
          <div className="p-4 sm:p-6 border-b border-brand-200 flex items-center gap-3 bg-brand-50">
            <Search className="w-6 h-6 text-accent shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full text-base sm:text-lg bg-transparent border-none text-dark placeholder-neutral-400 focus:outline-none font-serif font-light"
            />
            {query && (
              <button onClick={() => setQuery('')} className="p-1 text-neutral-400 hover:text-dark">
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-dark rounded-full hover:bg-brand-100 transition-colors"
              aria-label="Close search modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body content */}
          <div className="max-h-[60vh] overflow-y-auto p-6">
            {query.trim() === '' ? (
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">{t('popularSearches')}</p>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3.5 py-1.5 rounded-full bg-brand-100 hover:bg-dark hover:text-white text-xs font-medium text-dark transition-colors flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-accent" />
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-10 text-neutral-500 text-sm">
                {t('noSearchMatch', { query })}
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  {results.length} {t('searchFoundCount')}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.map(product => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-brand-50 hover:bg-white border border-transparent hover:border-brand-200 transition-all cursor-pointer group shadow-sm"
                    >
                      {product.images && product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-14 h-16 object-cover rounded-xl shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-16 rounded-xl bg-brand-200/60 border border-brand-300/60 flex items-center justify-center shrink-0">
                          <span className="font-serif text-xs font-bold text-accent">YS</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-accent font-bold">
                          {product.categoryLabel}
                        </span>
                        <h4 className="text-xs font-semibold text-dark truncate group-hover:text-accent transition-colors">
                          {product.name}
                        </h4>
                        <span className="text-xs font-bold text-dark mt-0.5 block font-serif">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-dark group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
