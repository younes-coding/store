import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Compass, Award } from 'lucide-react';
import { AnimatedSection } from '../components/common/AnimatedSection';
import { ProductCard } from '../components/product/ProductCard';
import { TESTIMONIALS, getLocalizedProduct, getLocalizedCategory, type Product } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import { useProducts } from '../context/ProductContext';
import { useCurrency } from '../context/CurrencyContext';

interface HomePageProps {
  onNavigateToShop: (category?: string) => void;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateToShop,
  onSelectProduct,
  onQuickView
}) => {
  const { language, t } = useLanguage();
  const { products, categories: dynamicCategories } = useProducts();
  const { formatPrice } = useCurrency();

  const [homepageSettings, setHomepageSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${API_BASE}/settings`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data?.homepage) {
            setHomepageSettings(json.data.homepage);
          }
        }
      } catch (err) {
        // Fallback gracefully
      }
    };
    fetchSettings();
  }, []);

  const localizedProducts = products.map(p => getLocalizedProduct(p, language));
  const featuredProducts = localizedProducts.slice(0, 6);

  // Dynamic pieces for hero section fallback
  const pieceWithImage = localizedProducts.find(p => p.images && p.images.length > 0);
  const heroRunwayPiece = pieceWithImage || localizedProducts[0] || {
    id: 'ys-hero',
    name: 'بليزر مايفير بصدر مزدوج',
    subtitle: 'صوف إيطالي بكر 100% بقصة كلاسيكية راقية',
    price: 680,
    images: []
  };

  const secondaryPieceWithImage = localizedProducts.filter(p => p.id !== heroRunwayPiece.id).find(p => p.images && p.images.length > 0);
  const heroNewArrivalPiece = secondaryPieceWithImage || localizedProducts[1] || localizedProducts[0] || heroRunwayPiece;

  // Live overrides from Admin Dashboard
  const heroImageSrc = homepageSettings?.heroImage || (heroRunwayPiece.images && heroRunwayPiece.images[0]);
  const heroSeasonTagText = homepageSettings?.heroSeasonTag || t('heroSeasonTag');
  const heroTitleLine1Text = homepageSettings?.heroTitleLine1 || t('heroTitleLine1');
  const heroTitleLine2Text = homepageSettings?.heroTitleLine2 || t('heroTitleLine2');
  const heroDescText = homepageSettings?.heroDescription || t('heroDescription');

  const floatingImg = homepageSettings?.heroFloatingImage || (heroNewArrivalPiece.images && heroNewArrivalPiece.images[0]);
  const floatingTitle = homepageSettings?.heroFloatingTitle || t('heroNewArrival');
  const floatingSubtitle = homepageSettings?.heroFloatingSubtitle || heroNewArrivalPiece.name;
  
  // Format price: if custom DZD price is provided in settings, format it directly in DZD
  const formatFloatingPrice = () => {
    if (homepageSettings?.heroFloatingPrice !== undefined && homepageSettings?.heroFloatingPrice !== null && homepageSettings?.heroFloatingPrice !== '') {
      const numericVal = parseFloat(String(homepageSettings.heroFloatingPrice).replace(/[^0-9.]/g, ''));
      if (!isNaN(numericVal)) {
        return `${numericVal.toLocaleString('ar-DZ')} د.ج`;
      }
      return String(homepageSettings.heroFloatingPrice);
    }
    return formatPrice(heroNewArrivalPiece.price);
  };
  const floatingPriceDisplay = formatFloatingPrice();

  const heritageImg = homepageSettings?.heritageBannerImage || (secondaryPieceWithImage && secondaryPieceWithImage.images && secondaryPieceWithImage.images[0]);
  const heritageTag = homepageSettings?.heritageBannerTag || 'الفخامة الكلاسيكية والأصالة';
  const heritageTitle = homepageSettings?.heritageBannerTitle || 'فخامة هادئة تُعبر عنك:';
  const heritageSubtitle = homepageSettings?.heritageBannerSubtitle || 'أناقة كلاسيكية لا تنتهي بمرور الزمن';
  const heritageText = homepageSettings?.heritageBannerText || 'نختار لك أرقى الأقمشة الإيطالية والإنجليزية المصنوعة بحرفية يدوية استثنائية من صوف الميرينو والقطن المصري والكشمير المنغولي، لتمنحك إطلالة أرستقراطية متكاملة تبرز حضورك الراقي في كل مناسبة.';

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-brand-50">
        {/* Background Subtle Gradient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-200/50 via-brand-50 to-brand-100/40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Right Content in RTL (Left in LTR) */}
            <div className="lg:col-span-6 space-y-8 text-center lg:text-right">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-200 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold text-dark">
                  {heroSeasonTagText}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-dark tracking-tight leading-[1.15]"
              >
                {heroTitleLine1Text} <br />
                <span className="text-accent font-serif">{heroTitleLine2Text}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
              >
                {heroDescText}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <button
                  onClick={() => onNavigateToShop()}
                  className="w-full sm:w-auto px-8 py-4 bg-dark hover:bg-neutral-800 text-white rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-3 shadow-luxury group transition-all duration-300 cursor-pointer"
                >
                  <span>{t('heroCtaExplore')}</span>
                  <ArrowRight className="w-4 h-4 text-accent group-hover:-translate-x-1 transition-transform rotate-180" />
                </button>

                <button
                  onClick={() => onNavigateToShop('shirts')}
                  className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-brand-100 text-dark border border-brand-200 rounded-full font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  {t('heroCtaClothing')}
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-3 gap-6 pt-8 border-t border-brand-200/80 max-w-md mx-auto lg:mx-0"
              >
                <div>
                  <span className="block font-serif text-2xl sm:text-3xl font-bold text-dark">100%</span>
                  <span className="text-xs text-neutral-500 font-semibold">{t('heroStatFiber')}</span>
                </div>
                <div>
                  <span className="block font-serif text-2xl sm:text-3xl font-bold text-dark">4.9★</span>
                  <span className="text-xs text-neutral-500 font-semibold">{t('heroStatRating')}</span>
                </div>
                <div>
                  <span className="block font-serif text-2xl sm:text-3xl font-bold text-dark">تلمسان، الجزائر</span>
                  <span className="text-xs text-neutral-500 font-semibold">المقر الرئيسي </span>
                </div>
              </motion.div>
            </div>

            {/* Left Visual Composition in RTL (Right in LTR) */}
            <div className="lg:col-span-6 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative mx-auto max-w-md lg:max-w-none"
              >
                {/* Main Hero Dynamic Visual */}
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-[#1b2028] via-[#14181d] to-[#0d1013]">
                  {heroImageSrc ? (
                    <>
                      <img
                        src={heroImageSrc}
                        alt="الواجهة الرئيسية يونس سارتوريال"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                      <div className="w-32 h-32 rounded-full border-2 border-accent/40 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center mb-6 shadow-inner">
                        <span className="font-serif text-4xl font-bold text-accent">YS</span>
                        <span className="text-[10px] tracking-widest text-accent/80 font-mono mt-1">SARTORIAL</span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2 tracking-wider">
                        YOUNES SARTORIAL
                      </h3>
                      <p className="text-xs text-neutral-300 font-normal max-w-xs">
                        يونس سارتوريال — الفخامة الكلاسيكية والتراث الملكي
                      </p>
                    </div>
                  )}

                  <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl glass-panel-dark text-white space-y-1 text-right">
                    <span className="text-[10px] text-accent font-bold uppercase tracking-wider">{t('heroFeaturedPiece')}</span>
                    <h3 className="font-serif text-xl font-bold text-white">{heroRunwayPiece.name}</h3>
                    <p className="text-xs text-neutral-300 font-light line-clamp-1">{heroRunwayPiece.subtitle}</p>
                  </div>
                </div>

                {/* Floating Secondary Card Accent */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-4 p-4 rounded-2xl bg-white shadow-floating border border-brand-200 max-w-xs"
                >
                  {floatingImg ? (
                    <img
                      src={floatingImg}
                      alt={floatingSubtitle}
                      className="w-14 h-16 object-cover rounded-xl shrink-0 border border-brand-200 bg-neutral-100"
                    />
                  ) : (
                    <div className="w-14 h-16 rounded-xl bg-brand-100 flex items-center justify-center text-dark font-serif font-bold shrink-0">
                      ي
                    </div>
                  )}
                  <div className="min-w-0 text-right">
                    <span className="text-[10px] text-accent font-bold uppercase">{floatingTitle}</span>
                    <h4 className="font-serif text-xs font-bold text-dark truncate">{floatingSubtitle}</h4>
                    <span className="text-xs font-bold text-dark">{floatingPriceDisplay}</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Showcase Section */}
      <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-right gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent">{t('categorySectionBadge')}</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark mt-1">
              {t('categorySectionTitle')}
            </h2>
          </div>
          <button
            onClick={() => onNavigateToShop()}
            className="text-xs font-bold uppercase tracking-wider text-dark hover:text-accent flex items-center gap-2 group transition-colors cursor-pointer"
          >
            <span>{t('categoryViewAll')}</span>
            <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dynamicCategories.map((catRaw) => {
            const cat = getLocalizedCategory(catRaw, language);
            const dynamicCategoryProduct = products.find(p => p.category === cat.id && p.images && p.images.length > 0);
            const displayImage = cat.image || dynamicCategoryProduct?.images?.[0] || '';

            return (
              <motion.div
                key={cat.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                onClick={() => onNavigateToShop(cat.id)}
                className="group relative h-96 rounded-3xl overflow-hidden shadow-sm hover:shadow-floating cursor-pointer border border-brand-200/60 bg-[#15191E]"
              >
                {displayImage ? (
                  <img
                    src={displayImage}
                    alt={cat.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#1E252D] to-[#12161A]">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                      <span className="font-serif text-2xl font-bold text-accent">ي</span>
                    </div>
                    <span className="text-xs text-accent font-bold">
                      قسم كلاسيكي
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent" />

                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white text-right">
                  <div className="flex justify-start">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white">
                      {products.filter(p => p.category === cat.id).length || cat.count} {t('itemsCount')}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-accent transition-colors">
                      {cat.label}
                    </h3>
                    <p className="text-xs text-neutral-300 font-normal line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                    <div className="pt-2 flex items-center text-xs font-bold text-accent gap-2 group-hover:-translate-x-1 transition-transform">
                      <span>{language === 'ar' ? `استكشف تشكيلة ال${cat.label}` : `Explore ${cat.label}`}</span>
                      <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </AnimatedSection>

      {/* Featured / New Arrivals Section */}
      <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">مختارات النخبة</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark">
            أحدث القطع والتشكيلات الواصلة
          </h2>
          <p className="text-sm text-neutral-600 max-w-xl mx-auto">
            استكشف تشكيلتنا الفاخرة المنتقاة بعناية من البدلات المفصلة، أحذية اللوفر الجلدية، ساعات اليد الكلاسيكية، ونظارات التورتويس الإيطالية.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => onNavigateToShop()}
            className="px-8 py-4 bg-dark hover:bg-neutral-800 text-white rounded-full font-bold text-xs uppercase tracking-wider inline-flex items-center gap-3 shadow-luxury transition-all cursor-pointer"
          >
            <span>تصفح كامل المعروضات ({products.length} قطعة فاخرة)</span>
            <ArrowRight className="w-4 h-4 text-accent rotate-180" />
          </button>
        </div>
      </AnimatedSection>

      {/* Heritage Brand Highlight Banner */}
      <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-dark text-white shadow-2xl border border-neutral-800 grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="p-8 sm:p-12 lg:p-16 lg:col-span-7 space-y-6 z-10 text-right">
            <span className="px-3.5 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-bold inline-block">
              {heritageTag}
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">
              {heritageTitle} <br />
              <span className="text-accent">{heritageSubtitle}</span>
            </h2>
            <p className="text-sm text-neutral-300 font-light leading-relaxed max-w-lg">
              {heritageText}
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigateToShop()}
                className="px-8 py-4 bg-accent hover:bg-accent-hover text-dark font-bold rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
              >
                <span>استكشف التشكيلة الكاملة</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 h-80 lg:h-full min-h-[300px] relative bg-gradient-to-br from-[#1d2229] to-[#0d1013] flex items-center justify-center p-8 text-center">
            {heritageImg ? (
              <>
                <img
                  src={heritageImg}
                  alt="تشكيلة متجر يونس سارتوريال"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-dark via-dark/40 to-transparent" />
              </>
            ) : (
              <div className="space-y-4">
                <div className="w-20 h-20 rounded-full border border-accent/50 mx-auto flex items-center justify-center bg-white/5">
                  <span className="font-serif text-3xl font-bold text-accent">ي</span>
                </div>
                <h4 className="font-serif text-xl font-bold text-white">يونس سارتوريال — المقر الرئيسي (تلمسان، الجزائر)</h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                  الفخامة الكلاسيكية الهادئة Old Money
                </p>
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* Brand Values */}
      <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 px-8 rounded-3xl bg-white border border-brand-200 shadow-sm text-center">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto text-accent">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-dark">حياكة كلاسيكية إنجليزية رفيعة</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              كل قطعة تتبع أدق معايير الأناقة الكلاسيكية بالأكتاف الطبيعية المريحة، والكسرات الأمامية المنسابة، والأزرار الطبيعية الفاخرة.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto text-accent">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-dark">أقمشة وألياف نبيلة نقية 100%</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              منتقاة من أرقى معامل الصوف البكر الإيطالي، ومزارع الكشمير المنغولي النقي، وحقول القطن المصري جيزة 87 طويل التيلة.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto text-accent">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-dark">قطع تتوارثها الأجيال</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              أزياء وتحف صُممت لتزداد عراقة وجمالاً مع مرور السنوات، محتفظة بأناقتها ووقارها عبر الأجيال.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Editorial Testimonials */}
      <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">آراء وتجارب النخبة</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark">
            أصداء عملاء YOUNES SARTORIAL في الجزائر
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-brand-50 border border-brand-200 flex flex-col justify-between space-y-6 shadow-sm text-right"
            >
              <p className="text-sm text-neutral-700 leading-relaxed">
                "{testimonial.quoteAr || testimonial.quote || testimonial.comment}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-brand-200">
                <div className="w-12 h-12 rounded-full bg-dark text-accent flex items-center justify-center font-serif text-sm font-bold border-2 border-accent shrink-0">
                  {testimonial.author ? testimonial.author.charAt(0) : 'ي'}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-dark">{testimonial.author || testimonial.name}</h4>
                  <span className="text-xs text-neutral-500">{testimonial.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
};
