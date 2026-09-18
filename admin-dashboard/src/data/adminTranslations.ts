export type AdminLanguage = 'en' | 'ar';

export interface AdminTranslations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

export const ADMIN_TRANSLATIONS: AdminTranslations = {
  // Sidebar & Navigation
  adminBrandTitle: { en: 'YOUNES SARTORIAL', ar: 'يونس سارتوريال' },
  adminBrandSubtitle: { en: 'Sartorial Portal', ar: 'بوابة التحكم الإدارية' },
  navOverview: { en: 'Analytics Overview', ar: 'نظرة عامة والإحصائيات' },
  navStorefront: { en: 'Storefront & Banners', ar: 'تخصيص الواجهة والبانرات' },
  navProducts: { en: 'Garments Catalog', ar: 'إدارة المنتجات والأزياء' },
  navCategories: { en: 'Classification', ar: 'تصنيفات المجموعات' },
  navOrders: { en: 'Orders & Shipping', ar: 'الطلبات والشحن' },
  navSettings: { en: 'Store Configuration', ar: 'إعدادات المتجر' },
  navLogout: { en: 'Sign Out', ar: 'تسجيل الخروج' },
  adminRoleBadge: { en: 'Senior Administrator', ar: 'مسؤول رئيسي' },

  // Overview Page
  overviewBadge: { en: 'Executive Summary', ar: 'الملخص التنفيذي' },
  overviewTitle: { en: 'Store Analytics Overview', ar: 'لوحة التحليلات والمؤشرات' },
  metricRevenue: { en: 'Total Revenue', ar: 'إجمالي الإيرادات' },
  metricOrders: { en: 'Total Orders', ar: 'إجمالي الطلبات' },
  metricPending: { en: 'Pending Fulfillment', ar: 'طلبات قيد المعالجة' },
  metricLowStock: { en: 'Low Stock Alerts', ar: 'تنبيهات المخزون المنخفض' },
  recentOrdersTitle: { en: 'Recent Customer Orders', ar: 'أحدث طلبات العملاء' },
  viewAllOrders: { en: 'View All Orders', ar: 'عرض جميع الطلبات' },
  lowStockTitle: { en: 'Low Stock Inventory Alert', ar: 'القطع القريبة من النفاد' },
  manageInventory: { en: 'Manage Inventory', ar: 'إدارة المخزون' },

  // Products Page
  productsBadge: { en: 'Inventory Catalog', ar: 'كتالوج المخزون' },
  productsTitle: { en: 'Garments Management', ar: 'إدارة أزياء المتجر' },
  addNewGarment: { en: 'Add New Garment', ar: 'إضافة قطعة جديدة' },
  searchGarmentPlaceholder: { en: 'Search by garment title or description...', ar: 'ابحث باسم القطعة أو الوصف...' },
  allCategoriesFilter: { en: 'All Categories', ar: 'جميع التصنيفات' },
  tableGarment: { en: 'Garment', ar: 'القطعة' },
  tableCategory: { en: 'Category', ar: 'التصنيف' },
  tablePrice: { en: 'Price', ar: 'السعر' },
  tableStock: { en: 'Stock', ar: 'المخزون' },
  tableBadges: { en: 'Badges', ar: 'الشارات' },
  tableActions: { en: 'Actions', ar: 'الإجراءات' },
  editGarment: { en: 'Edit Garment', ar: 'تعديل بيانات القطعة' },
  deleteGarment: { en: 'Delete', ar: 'حذف' },
  confirmDelete: { en: 'Are you sure you want to delete this garment?', ar: 'هل أنت تأكد من رغبتك في حذف هذه القطعة؟' },

  // Modal Product Form
  formTitleAdd: { en: 'Add New Luxury Garment', ar: 'إضافة قطعة أزياء فاخرة' },
  formTitleEdit: { en: 'Edit Garment Details', ar: 'تعديل تفاصيل القطعة' },
  formGarmentName: { en: 'Garment Name', ar: 'اسم القطعة' },
  formSubtitle: { en: 'Subtitle / Headline', ar: 'العنوان الفرعي' },
  formPrice: { en: 'Price (DZD)', ar: 'السعر (د.ج)' },
  formOriginalPrice: { en: 'Original Price (DZD) (Optional for Sale)', ar: 'السعر الأصلي (د.ج) (اختياري للتخفيض)' },
  formCategory: { en: 'Category', ar: 'التصنيف' },
  formStockCount: { en: 'Stock Quantity', ar: 'الكمية المتوفرة في المخزون' },
  formImageUrls: { en: 'Product Imagery', ar: 'صور المنتج' },
  uploadFromDevice: { en: 'Upload from Device', ar: 'رفع صورة من جهازك' },
  dragDropImages: { en: 'Click or Drag & Drop images here to upload', ar: 'اضغط لاختيار صورة من جهازك أو اسحبها وأفلتها هنا' },
  orEnterUrl: { en: 'Or enter image URL', ar: 'أو أدخل رابط صورة خارجي' },
  addImageUrl: { en: 'Add Image URL', ar: 'إضافة الرابط' },
  mainCoverBadge: { en: 'Main Cover', ar: 'الغلاف الرئيسي' },
  setAsCover: { en: 'Make Cover', ar: 'تعيين كغلاف' },
  removeImage: { en: 'Remove', ar: 'حذف' },
  imageFormatsNote: { en: 'PNG, JPG, WEBP up to 5MB', ar: 'يدعم PNG، JPG، WEBP حتى 5 ميجابايت' },
  noImagesYet: { en: 'No images uploaded yet. Upload at least one image.', ar: 'لم يتم إضافة أي صورة بعد. يرجى رفع صورة واحدة على الأقل.' },
  formDescription: { en: 'Description & Fit', ar: 'وصف القطعة والمقاسات' },
  formSizes: { en: 'Available Sizes (comma separated)', ar: 'المقاسات المتاحة (مفصولة بفواصل)' },
  formColors: { en: 'Color Options (Name:#HEX format)', ar: 'الألوان المتاحة (اسم:كود_هيكس)' },
  badgeNewOption: { en: 'New Arrival Badge', ar: 'شارة وصل حديثاً' },
  badgeBestSellerOption: { en: 'Best Seller Badge', ar: 'شارة الأكثر مبيعاً' },
  badgeSaleOption: { en: 'Sale Badge', ar: 'شارة تخفيض' },
  saveGarment: { en: 'Save Garment', ar: 'حفظ القطعة' },
  cancel: { en: 'Cancel', ar: 'إلغاء' },

  // Categories Page
  categoriesBadge: { en: 'Garment Classification', ar: 'تصنيفات التشكيلات' },
  categoriesTitle: { en: 'Categories Management', ar: 'إدارة تصنيفات الأزياء' },
  addCategory: { en: 'Add New Category', ar: 'إضافة تصنيف جديد' },
  categoryLabel: { en: 'Category Name', ar: 'اسم التصنيف' },
  categoryDescription: { en: 'Description', ar: 'الوصف' },
  categoryImage: { en: 'Category Cover Image URL', ar: 'رابط غلاف التصنيف' },
  saveCategory: { en: 'Save Category', ar: 'حفظ التصنيف' },

  // Orders Page
  ordersBadge: { en: 'Fulfillment & Logistics', ar: 'الطلبات والشحن' },
  ordersTitle: { en: 'Customer Orders Management', ar: 'إدارة طلبات العملاء' },
  statusAll: { en: 'All Orders', ar: 'جميع الطلبات' },
  statusPending: { en: 'Pending', ar: 'قيد الانتظار' },
  statusProcessing: { en: 'Processing', ar: 'جاري المعالجة' },
  statusShipped: { en: 'Shipped', ar: 'تم الشحن' },
  statusDelivered: { en: 'Delivered', ar: 'تم التسليم' },
  statusCancelled: { en: 'Cancelled', ar: 'ملغى' },
  tableOrderId: { en: 'Order Ref', ar: 'مرجع الطلب' },
  tableCustomer: { en: 'Customer', ar: 'الزبون' },
  tableDate: { en: 'Date', ar: 'التاريخ' },
  tableStatus: { en: 'Status', ar: 'الحالة' },
  tableTotal: { en: 'Total Amount', ar: 'الإجمالي' },
  tablePayment: { en: 'Payment Method', ar: 'طريقة الدفع' },
  updateStatus: { en: 'Update Status', ar: 'تحديث الحالة' },

  // Settings Page
  settingsBadge: { en: 'Atelier Settings', ar: 'إعدادات المتجر الرئيسية' },
  settingsTitle: { en: 'Store Configuration', ar: 'إعدادات متجر يونس سارتوريال' },
  storeName: { en: 'Store Name', ar: 'اسم المتجر' },
  contactEmail: { en: 'Contact Email', ar: 'البريد الإلكتروني للتواصل' },
  contactPhone: { en: 'Concierge Phone', ar: 'رقم هاتف خدمة العملاء' },
  flagshipAddress: { en: 'Atelier Address', ar: 'عنوان الأتيلييه' },
  freeShippingThreshold: { en: 'Free Shipping Threshold (DZD)', ar: 'حد الشحن المجاني (د.ج) (اختياري)' },
  standardShippingCost: { en: 'Standard Shipping Fee (DZD)', ar: 'تكلفة الشحن القياسي (د.ج)' },
  announcementText: { en: 'Top Announcement Banner Text', ar: 'نص الشريط الإعلاني العلوي' },
  saveSettings: { en: 'Save Store Settings', ar: 'حفظ إعدادات المتجر' },

  // Login Page
  loginPortalTitle: { en: 'YOUNES SARTORIAL Admin Portal', ar: 'بوابة إدارة متجر يونس سارتوريال' },
  loginSubtitle: { en: 'Enter your credentials to access store metrics and catalog control.', ar: 'أدخل بيانات الاعتماد الخاصة بك للوصول للتحليلات وإدارة الكتالوج.' },
  emailField: { en: 'Admin Email', ar: 'البريد الإلكتروني للإداري' },
  passwordField: { en: 'Password', ar: 'كلمة السر' },
  signInButton: { en: 'Sign In to Portal', ar: 'تسجيل الدخول للوحة التحكم' },
  demoCredentialsNote: { en: 'Admin: admin@younes.com | Password: admin123456', ar: 'بيانات الدخول الإدارية: admin@younes.com | كلمة السر: admin123456' }
};
