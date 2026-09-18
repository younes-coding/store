export type Language = 'en' | 'ar';

export interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

export const TRANSLATIONS: Translations = {
  topBanner: {
    en: 'ELEVATE YOUR PRESENCE WITH SARTORIAL QUIET LUXURY — BESPOKE PACKAGING & DISTINGUISHED DELIVERY',
    ar: '✨ تميّز بأناقة «أولد موني» الراقية — أقمشة نبيلة وتغليف ملكي فاخر مع توصيل استثنائي لباب منزلك'
  },
  navHome: { en: 'Home', ar: 'الرئيسية' },
  navCollection: { en: 'All Collections', ar: 'جميع التشكيلات' },
  navShirts: { en: 'Shirts', ar: 'قمصان' },
  navTrousers: { en: 'Trousers', ar: 'سراويل' },
  navFootwear: { en: 'Shoes', ar: 'أحذية' },
  navWatches: { en: 'Watches', ar: 'ساعات' },
  navEyewear: { en: 'Eyewear', ar: 'نظارات' },
  navBag: { en: 'Bag', ar: 'حقيبة التسوق' },
  navSearch: { en: 'Search', ar: 'بحث' },

  // Hero Section
  heroSeasonTag: {
    en: 'YOUNES SARTORIAL — Old Money & Quiet Luxury Menswear',
    ar: 'يونس سارتوريال — التراث الكلاسيكي للأزياء الرجالية Old Money'
  },
  heroTitleLine1: { en: 'Timeless Sartorial Heritage', ar: 'الأناقة الكلاسيكية الرجالية' },
  heroTitleLine2: { en: 'Quiet Luxury & Heritage.', ar: 'فخامة هادئة تتوارثها الأجيال.' },
  heroDescription: {
    en: 'Curated luxury knit polo shirts, Capri collars, bespoke tailoring, and noble fabrics for the distinguished gentleman.',
    ar: 'تشكيلة حصرية للرجل الأنيق من قمصان البولو الصيفية المحبوكة بياقات إيطالية مفتوحة، وأقمشة القطن المصري والتريكو فائق النعومة.'
  },
  heroCtaExplore: { en: 'Explore Younes Sartorial Collection', ar: 'استكشف تشكيلة القمصان الفاخرة' },
  heroCtaClothing: { en: 'View Shirts & Polos', ar: 'عرض تشكيلة القمصان' },
  heroStatFiber: { en: 'Noble Fibers', ar: 'أقمشة وألياف نبيلة' },
  heroStatRating: { en: 'Customer Rating', ar: 'تقييم العملاء' },
  heroStatAtelier: { en: 'Old Money Style', ar: 'طابع أولد موني أصيل' },
  heroFeaturedPiece: { en: 'Featured Sartorial Piece', ar: 'القطعة الكلاسيكية البارزة' },
  heroNewArrival: { en: 'New Arrival', ar: 'وصل حديثاً' },

  // Category Showcase Section
  categorySectionBadge: { en: 'The Sartorial Pillars', ar: 'أركان الأناقة الرجالية الكلاسيكية' },
  categorySectionTitle: { en: 'Men\'s Clothing Departments', ar: 'أقسام الملابس الرجالية' },
  categoryViewAll: { en: 'View All Garments', ar: 'عرض جميع الملابس' },
  itemsCount: { en: 'Garments', ar: 'قطع' },

  // Shop Page & Filters
  shopTitle: { en: 'Younes Sartorial Menswear Archive', ar: 'كتالوج يونس سارتوريال للأزياء والملابس الرجالية' },
  shopSubtitle: {
    en: 'Bespoke tailoring, pure Mongolian cashmere, Giza 87 Egyptian poplin shirts, and pleated flannel trousers.',
    ar: 'بدلات وبليزرات ملكية، كنزات كشمير خالص، قمصان قطن مصري فاخرة، وبناطيل صوفية بقصات كلاسيكية.'
  },
  allCategories: { en: 'All Men\'s Garments', ar: 'جميع الملابس الرجالية' },
  filterByCategory: { en: 'Department', ar: 'القسم' },
  sortBy: { en: 'Sort By', ar: 'ترتيب حسب' },
  sortFeatured: { en: 'Featured Pieces', ar: 'القطع المميزة' },
  sortPriceAsc: { en: 'Price: Low to High', ar: 'السعر: من الأقل للأعلى' },
  sortPriceDesc: { en: 'Price: High to Low', ar: 'السعر: من الأعلى للأقل' },
  sortRating: { en: 'Highest Rated', ar: 'الأعلى تقييماً' },
  showingResults: { en: 'Showing', ar: 'عرض' },
  garmentsFound: { en: 'Garments', ar: 'قطع متوفرة' },
  noGarmentsFound: { en: 'No garments found matching your criteria.', ar: 'لم يتم العثور على قطع تطابق خيارات البحث.' },
  resetFilters: { en: 'Reset Filters', ar: 'إعادة ضبط الفلاتر' },

  // Product Card & Quick View
  quickView: { en: 'Quick View', ar: 'معاينة سريعة' },
  addToBag: { en: 'Add To Bag', ar: 'إضافة إلى الحقيبة' },
  addingToBag: { en: 'Adding...', ar: 'جاري الإضافة...' },
  addedToBag: { en: 'Added to Bag', ar: 'تمت الإضافة للحقيبة' },
  inStock: { en: 'In Stock', ar: 'متوفر في المخزون' },
  lowStock: { en: 'Only {count} left', ar: 'متبقي {count} قطع فقط' },
  badgeNew: { en: 'New', ar: 'جديد' },
  badgeBestSeller: { en: 'Best Seller', ar: 'الأكثر طلباً' },
  badgeSale: { en: 'Sale', ar: 'تخفيض' },
  selectSize: { en: 'Select Size', ar: 'اختر المقاس' },
  selectColor: { en: 'Select Color', ar: 'اختر اللون' },

  // Product Detail Page
  backToShop: { en: 'Back to Menswear Collection', ar: 'العودة لكتالوج الملابس' },
  fabricAndCare: { en: 'Materials & Preservation', ar: 'الخامات الفاخرة والعناية' },
  craftDetails: { en: 'Sartorial & Craftsmanship Details', ar: 'تفاصيل الخياطة والحرفية' },
  complementaryPieces: { en: 'Complete The Sartorial Look', ar: 'قطع مكملة للإطلالة الكلاسيكية' },

  // Cart Drawer
  cartTitle: { en: 'Your Shopping Bag', ar: 'حقيبة التسوق الخاصة بك' },
  emptyCartMessage: { en: 'Your shopping bag is currently empty.', ar: 'حقيبة التسوق فارغة حالياً.' },
  startShopping: { en: 'Explore YOUNES SARTORIAL', ar: 'تصفح تشكيلة يونس سارتوريال' },
  freeShippingProgress: { en: 'Express Delivery to all 69 Wilayas with COD', ar: 'توصيل سريع لكافة الـ 69 ولاية مع الدفع عند الاستلام والمعاينة' },
  unlockedFreeShipping: { en: 'Express Delivery Available Nationwide', ar: 'خدمة التوصيل السريع متوفرة لكافة الولايات' },
  subtotal: { en: 'Subtotal', ar: 'المجموع الفرعي' },
  shippingCalculated: { en: 'Taxes and express delivery calculated at checkout', ar: 'تُحسب مصاريف الشحن حسب الولاية عند إتمام الطلب' },
  proceedToCheckout: { en: 'Proceed to Checkout', ar: 'المتابعة لإتمام الطلب' },
  removeItem: { en: 'Remove', ar: 'حذف' },

  // Search Modal
  searchPlaceholder: { en: 'Search suits, blazers, cashmere sweaters, poplin shirts, wool trousers...', ar: 'ابحث عن البدلات، البليزرات، كنزات الكشمير، القمصان، البناطيل الصوفية...' },
  popularSearches: { en: 'Popular Searches', ar: 'الأكثر بحثاً' },
  searchFoundCount: { en: 'Garments Found', ar: 'قطع تم العثور عليها' },
  noSearchMatch: { en: 'No garments found matching "{query}".', ar: 'لم يتم العثور على قطع تطابق "{query}".' },

  // Checkout Page
  checkoutTitle: { en: 'Express Checkout — YOUNES SARTORIAL', ar: 'إتمام الطلب السريع — يونس سارتوريال' },
  backToBag: { en: 'Return to Bag', ar: 'العودة للحقيبة' },
  contactInfo: { en: 'Customer Contact Details', ar: 'بيانات العميل ومعلومات الاتصال' },
  emailAddress: { en: 'Email Address', ar: 'البريد الإلكتروني' },
  phoneNumber: { en: 'Phone Number', ar: 'رقم الهاتف' },
  shippingAddress: { en: 'Shipping Destination', ar: 'عنوان الشحن والتوصيل' },
  fullName: { en: 'Full Name', ar: 'الاسم الكامل' },
  addressLine: { en: 'Street Address', ar: 'العنوان / الشارع' },
  city: { en: 'City', ar: 'المدينة' },
  country: { en: 'Country', ar: 'الدولة' },
  postalCode: { en: 'Postal Code', ar: 'الرمز البريدي' },
  shippingMethod: { en: 'Shipping Speed', ar: 'طريقة التوصيل' },
  expressShipping: { en: 'White-Glove Express Courier (2-3 Business Days)', ar: 'شحن سريع فائق العناية (2-3 أيام عمل)' },
  standardShipping: { en: 'Insured Tracked Delivery (5-7 Business Days)', ar: 'شحن آمن مؤمن مع تتبع (5-7 أيام عمل)' },
  paymentMethod: { en: 'Payment Option', ar: 'طريقة الدفع' },
  creditCard: { en: 'Credit Card / Visa / MasterCard', ar: 'بطاقة ائتمان / فيزا / ماستركارد' },
  cashOnDelivery: { en: 'Cash on Delivery (COD)', ar: 'الدفع عند الاستلام بعد المعاينة' },
  applePay: { en: 'Apple Pay / Digital Wallet', ar: 'أبل باي / محفظة رقمية' },
  orderSummary: { en: 'Order Summary', ar: 'ملخص الطلب' },
  shippingCost: { en: 'Shipping', ar: 'الشحن' },
  free: { en: 'FREE', ar: 'مجاني' },
  total: { en: 'Total Amount', ar: 'المجموع الإجمالي' },
  placeOrder: { en: 'Complete Order', ar: 'تأكيد وإتمام الطلب' },
  placingOrder: { en: 'Processing Order...', ar: 'جاري معالجة الطلب...' },

  // Order Success Modal
  orderSuccessTitle: { en: 'Order Confirmed!', ar: 'تم تأكيد طلبك بنجاح!' },
  orderSuccessMessage: { en: 'Thank you for choosing YOUNES SARTORIAL. Your Old Money sartorial order has been registered.', ar: 'شكراً لاختيارك يونس سارتوريال (YOUNES SARTORIAL). تم تسجيل طلبك الكلاسيكي بنجاح وجاري تجهيزه للشحن.' },
  orderIdLabel: { en: 'Order Ref:', ar: 'رقم مرجع الطلب:' },
  continueShopping: { en: 'Continue Shopping', ar: 'مواصلة التسوق' },

  // Footer & Assurances
  assuranceShippingTitle: { en: 'Express Nationwide Delivery', ar: 'توصيل سريع لكافة الـ 69 ولاية' },
  assuranceShippingDesc: { en: 'Fast doorstep delivery with Cash on Delivery across all 69 Algerian wilayas', ar: 'توصيل سريع لباب منزلك مع الدفع عند الاستلام والمعاينة قبل الدفع' },
  assuranceReturnTitle: { en: '30-Day Heritage Guarantee', ar: 'ضمان استبدال لمدة 30 يوماً' },
  assuranceReturnDesc: { en: 'Complimentary doorstep size exchange and returns', ar: 'استبدال واسترجاع سهل ومجاني للمقاسات' },
  assuranceOrganicTitle: { en: 'Pure Noble Natural Fibers', ar: 'ألياف وأقمشة طبيعية نبيلة' },
  assuranceOrganicDesc: { en: 'Italian virgin wool, Grade-A Mongolian cashmere, and Giza 87 Egyptian cotton', ar: 'صوف إيطالي بكر، كشمير منغولي خالص، وقطن مصري جيزة 87' },
  footerAbout: {
    en: 'YOUNES SARTORIAL — A distinguished purveyor of authentic Old Money menswear and quiet luxury. Curating bespoke suits, pure Mongolian cashmere knitwear, Egyptian cotton shirts, and high-waisted pleated wool trousers for the refined gentleman.',
    ar: 'يونس سارتوريال (YOUNES SARTORIAL) — وجهتك الأولى لأرقى الأزياء والملابس الرجالية الكلاسيكية بأسلوب Old Money والفخامة الهادئة. ننتقي بعناية البدلات الملكية، كنزات الكشمير الفاخرة، القمصان الكلاسيكية، والبناطيل الصوفية للرجل صاحب الذوق الرفيع.'
  },
  subscribeJournal: { en: 'Subscribe to The Younes Sartorial Gazette', ar: 'اشترك في نشرة يونس سارتوريال الدورية' },
  emailPlaceholder: { en: 'Enter your email address...', ar: 'أدخل بريدك الإلكتروني...' },
  joinButton: { en: 'Join', ar: 'اشتراك' },
  footerCollections: { en: 'Departments', ar: 'أقسام الملابس' },
  footerCustomerCare: { en: 'Customer Concierge', ar: 'خدمة العملاء والاستفسارات' },
  flagshipAtelier: { en: 'YOUNES SARTORIAL Flagship', ar: 'المقر الرئيسي لـ YOUNES SARTORIAL' },
  parisAddress: { en: 'Tlemcen, Algeria', ar: 'تلمسان، الجزائر' },
  copyright: { en: '© {year} YOUNES SARTORIAL. All Rights Reserved.', ar: '© {year} يونس سارتوريال (YOUNES SARTORIAL). جميع الحقوق محفوظة.' }
};
