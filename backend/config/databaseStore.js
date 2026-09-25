import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE_PATH = path.join(__dirname, '..', 'data', 'database.json');

// Initial default state
const getInitialDatabase = () => ({
  admins: [
    {
      id: 'adm-001',
      email: 'bounouayounes@gmail.com',
      password: '$2a$10$//v7yR/GPhjz7Ofkm3hnKOgiowbrxeBaEZLUdHZmpM8AKJbIr5/7u', // younes13 (bcrypt hashed)
      name: 'يونس',
      role: 'superadmin',
      createdAt: new Date().toISOString()
    }
  ],
  categories: [
    {
      _id: "shirts",
      id: "shirts",
      slug: "shirts",
      label: "القمصان والبولو الفاخر",
      description: "قمصان بوبلين قطن مصري فاخر وتيشرتات بولو محبوكة بياقات مفتوحة كلاسيكية.",
      image: "/products/old-money-outfit-1.jpg",
      count: 2
    },
    {
      _id: "knitwear",
      id: "knitwear",
      slug: "knitwear",
      label: "الكشمير والتريكو الفاخر",
      description: "كنزات بولو مضلعة من الصوف والحرير وأطقم كشمير وتريكو صيفي فائق النعومة.",
      image: "/products/old-money-outfit-2.jpg",
      count: 2
    },
    {
      _id: "suits",
      id: "suits",
      slug: "suits",
      label: "البدلات والبليزرات الكلاسيكية",
      description: "بليزرات كتان وصوف إيطالي مفصلة بأبعاد أرستقراطية وبدلات كلاسيكية فاخرة.",
      image: "/products/old-money-outfit-4.jpg",
      count: 1
    }
  ],
  products: [
    {
      _id: "ys-outfit-01",
      id: "ys-outfit-01",
      name: "طقم الريفييرا الإيطالية: قميص بوبلين أبيض وكنزة كشمير زيتية",
      nameAr: "طقم الريفييرا الإيطالية: قميص بوبلين أبيض وكنزة كشمير زيتية",
      subtitle: "The Italian Riviera Poplin Shirt & Olive Cashmere Draped Knit",
      price: 380,
      originalPrice: 450,
      category: "shirts",
      categoryLabel: "القمصان والبولو الفاخر",
      rating: 5,
      reviewCount: 18,
      images: ["/products/old-money-outfit-1.jpg"],
      colors: [
        { name: "White & Olive Green", nameAr: "أبيض ناصع مع زيتي ملكي", hex: "#4B5320" },
        { name: "White & Navy Blue", nameAr: "أبيض مع كحلي داكن", hex: "#1C2833" },
        { name: "White & Charcoal", nameAr: "أبيض مع رمادي فحمي", hex: "#374151" }
      ],
      sizes: ["48 (M)", "50 (L)", "52 (XL)", "54 (XXL)"],
      description: "طقم متكامل يجسد أرستقراطية الريفييرا الإيطالية ونمط الـ Old Money الهادئ. يتكون من قميص كلاسيكي منسوج من القطن المصري البوبلين 120s فائق النعومة مع ياقة إيطالية مفتوحة، مرفق بكنزة كشمير خفيفة باللون الزيتي الملكي لتوضع بأناقة عفوية على الأكتاف، مع بنطال صوفي أسود بقصة مفصلة.",
      fabricCare: ["قميص: 100% قطن مصري بوبلين فاخر", "الكنزة: 100% كشمير منغولي خفيف ناعم", "تنظيف جاف فقط أو غسيل يدوي بارد للكشمير"],
      details: ["قصة كلاسيكية هادئة ومريحة بأبعاد إيطالية متوازنة", "أزرار صدف طبيعي (Mother-of-Pearl) مخيطة يدوياً", "كنزة كشمير مصممة خصيصاً للارتداء على الكتف أو مستقلة", "مناسب للمناسبات النهارية والمنتجعات الراقية"],
      isNewItem: true,
      isNew: true,
      isBestSeller: true,
      isSale: true,
      stockCount: 15,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: "ys-outfit-02",
      id: "ys-outfit-02",
      name: "طقم مونوكروم بيج رملي: بولو محبوك وبنطال بكسرات كلاسيكية",
      nameAr: "طقم مونوكروم بيج رملي: بولو محبوك وبنطال بكسرات كلاسيكية",
      subtitle: "Monochrome Sand Ribbed Knit Polo & High-Waisted Pleated Trousers",
      price: 420,
      originalPrice: 490,
      category: "knitwear",
      categoryLabel: "الكشمير والتريكو الفاخر",
      rating: 5,
      reviewCount: 24,
      images: ["/products/old-money-outfit-2.jpg"],
      colors: [
        { name: "Monochrome Sand Tan", nameAr: "بيج رملي مونوكروم", hex: "#C8AD8D" },
        { name: "Desert Oatmeal", nameAr: "شوفان صحراوي دافئ", hex: "#DCD0C0" },
        { name: "Tobacco Brown", nameAr: "بني تبغي كلاسيكي", hex: "#6E473B" }
      ],
      sizes: ["48 (M)", "50 (L)", "52 (XL)", "54 (XXL)"],
      description: "إطلالة مونوكروم ساحرة بلون البيج الرملي تعكس الفخامة الصامتة والذوق الرفيع. يجمع بين قميص بولو صيفي محبوك بنقشة مربعات دقيقة وملمس فائق النعومة، مع بنطال قماش إيطالي بخصر مرتفع وكسرات أمامية تمنح قواماً مستقيماً وأنيقاً.",
      fabricCare: ["البولو: 70% قطن عضوي ممشط، 30% حرير طبيعي", "البنطال: 100% صوف استوائي خفيف بارد", "تنظيف جاف للحفاظ على رونق النسيج والكسرات"],
      details: ["ياقة بولو كلاسيكية بدون أزرار (Johnny Collar)", "بنطال بقصة واسعة قليلاً وكسرات أمامية مزدوجة", "أشرطة تعديل جانبية بدلاً من الحزام لإطلالة نقية", "تناسق لوني موحد فائق الفخامة"],
      isNewItem: true,
      isNew: true,
      isBestSeller: true,
      isSale: false,
      stockCount: 12,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: "ys-outfit-03",
      id: "ys-outfit-03",
      name: "طقم بحيرة كومو: بولو باستيل محبوك وبنطال صوف عاجي",
      nameAr: "طقم بحيرة كومو: بولو باستيل محبوك وبنطال صوف عاجي",
      subtitle: "Lake Como Pastel Knit Polo, Ivory Pleated Trousers & Suede Loafers",
      price: 460,
      originalPrice: 530,
      category: "shirts",
      categoryLabel: "القمصان والبولو الفاخر",
      rating: 5,
      reviewCount: 31,
      images: ["/products/old-money-outfit-3.jpg"],
      colors: [
        { name: "Pastel Lemon Yellow & Ivory", nameAr: "أصفر باستيل هادئ مع عاجي", hex: "#F3E5AB" },
        { name: "Sky Blue & Off-White", nameAr: "أزرق سماوي مع أوف وايت", hex: "#87CEEB" },
        { name: "Sage Green & Cream", nameAr: "أخضر ميرمية مع كريمي", hex: "#9CAF88" }
      ],
      sizes: ["46 (S)", "48 (M)", "50 (L)", "52 (XL)", "54 (XXL)"],
      description: "طقم مستوحى من رحلات البحيرات الإيطالية ويخوت بحيرة كومو. يتألف من قميص بولو محبوك بلون أصفر باستيل ناعم بياقة V مفتوحة، وبنطال صوفي مريح بلون الأوف وايت العاجي بكسرات دقيقة، مع كنزة صوفية خفيفة على الكتف لمظهر أرستقراطي متكامل.",
      fabricCare: ["البولو: 100% قطن بيما محبوك بتنفس عالي", "البنطال: صوف فيرجن ناعم 100% مريح صيفاً وشتاءً", "غسيل جاف للمحافظة على درجة ألوان الباستيل"],
      details: ["ياقة مفتوحة ناعمة على نمط كابري الإيطالي", "بنطال بكسرة أمامية حادة وثنيات كلاسيكية 2 إنش", "مرفق معه سترة صوف خفيفة متناسقة للأكتاف", "مثالي للعطلات والمناسبات الفاخرة المفتوحة"],
      isNewItem: true,
      isNew: true,
      isBestSeller: true,
      isSale: true,
      stockCount: 18,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: "ys-outfit-04",
      id: "ys-outfit-04",
      name: "طقم فيلا الأرستقراط: بليزر كتان بيج وتيشرت قطني فاخر",
      nameAr: "طقم فيلا الأرستقراط: بليزر كتان بيج وتيشرت قطني فاخر",
      subtitle: "Vintage Estate Beige Linen Tailored Blazer & Premium White Tee",
      price: 620,
      originalPrice: 720,
      category: "suits",
      categoryLabel: "البدلات والبليزرات الكلاسيكية",
      rating: 5,
      reviewCount: 19,
      images: ["/products/old-money-outfit-4.jpg"],
      colors: [
        { name: "Warm Beige & White", nameAr: "بيج رملي دافئ مع أبيض", hex: "#D2B48C" },
        { name: "Olive Khaki & Cream", nameAr: "زيتي كاكي مع كريمي", hex: "#556B2F" },
        { name: "Navy Blue & Off-White", nameAr: "كحلي داكن مع أوف وايت", hex: "#1A2A3A" }
      ],
      sizes: ["48 (M)", "50 (L)", "52 (XL)", "54 (XXL)"],
      description: "توليفة كلاسيكية لا تزول من عالم السيارات الكلاسيكية والقصور العريقة. بليزر مفصل من مزيج الكتان والصوف الإيطالي بلون بيج أنيق يوضع على الكتف بكل خفة، مع تيشرت قطني ناصع البياض بياقة مستديرة وبنطال بيج عالي الخصر بحزام جلدي فاخر.",
      fabricCare: ["البليزر: 65% كتان إيرلندي نقي، 35% صوف إيطالي", "التيشرت: 100% قطن سيزلاند فائق النعومة", "تنظيف جاف متخصص للبليزر"],
      details: ["بليزر بأكتاف طبيعية غير مبطنة Spalla Camicia", "بطانة حريرية جزئية للتنفس الكامل والراحة", "بنطال كلاسيكي بكسرات وجيوب مائلة وحزام جلد طبيعي", "إطلالة كلاسيكية سينمائية فائقة الرقي"],
      isNewItem: true,
      isNew: true,
      isBestSeller: false,
      isSale: true,
      stockCount: 10,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: "ys-outfit-05",
      id: "ys-outfit-05",
      name: "طقم الهدوء المترف: كنزة بولو مضلعة إيكرو وبنطال كتان أبيض",
      nameAr: "طقم الهدوء المترف: كنزة بولو مضلعة إيكرو وبنطال كتان أبيض",
      subtitle: "Ribbed Ecru Knit Long-Sleeve Polo & Tailored White Linen Trousers",
      price: 490,
      originalPrice: 560,
      category: "knitwear",
      categoryLabel: "الكشمير والتريكو الفاخر",
      rating: 5,
      reviewCount: 27,
      images: ["/products/old-money-outfit-5.jpg"],
      colors: [
        { name: "Ecru & Pure White", nameAr: "إيكرو كريمي مع أبيض ناصع", hex: "#F4F0EA" },
        { name: "Camel & Cream", nameAr: "بيج كلاسيكي مع عاجي", hex: "#C19A6B" },
        { name: "Charcoal & Ivory", nameAr: "فحمي هادئ مع أوف وايت", hex: "#374151" }
      ],
      sizes: ["46 (S)", "48 (M)", "50 (L)", "52 (XL)", "54 (XXL)"],
      description: "التجسيد الأقصى لمفهوم الأناقة الهادئة (Quiet Luxury). كنزة بولو مضلعة بأكمام طويلة محبوكة من مزيج الصوف الفاخر والحرير بلون الإيكرو الكريمي، مدمجة مع بنطال كتان إيطالي أبيض بطول كاحل كلاسيكي وأناقة نقية.",
      fabricCare: ["الكنزة: 60% صوف ميرينو إكسترا فاين، 40% حرير طبيعي", "البنطال: 100% كتان إيطالي معالج ضد التجعد الشديد", "غسيل يدوي لطيف بماء بارد أو تنظيف جاف"],
      details: ["حياكة عمودية مضلعة (Ribbed Knit) تبرز تناسق القوام", "ياقة بولو مفتوحة بدون أزرار لراحة استثنائية", "بنطال كتان بقصة مريحة عند الفخذ وضيقة تدريجياً نحو الكاحل", "مثالي للإطلالات اليومية الفاخرة والاسترخاء الأنيق"],
      isNewItem: true,
      isNew: true,
      isBestSeller: true,
      isSale: false,
      stockCount: 14,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  orders: [],
  settings: {
    storeName: 'يونس سارتوريال | YOUNES SARTORIAL — الفخامة الكلاسيكية الهادئة Old Money',
    contactEmail: 'contact@younes-sartorial.com',
    contactPhone: '+213 43 00 00 00',
    address: 'تلمسان، الجزائر',
    freeShippingThreshold: 0,
    standardShippingCost: 600,
    announcementText: '✨ تميّز بأناقة «أولد موني» الراقية — أقمشة نبيلة وتغليف ملكي فاخر مع توصيل استثنائي لباب منزلك',
  }
});

class DatabaseStore {
  constructor() {
    this.filePath = DB_FILE_PATH;
    this.data = null;
    this.init();
  }

  init() {
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (fs.existsSync(this.filePath)) {
        const fileContent = fs.readFileSync(this.filePath, 'utf-8');
        this.data = JSON.parse(fileContent);
        // Ensure all top-level keys exist
        if (!this.data.products) this.data.products = [];
        if (!this.data.orders) this.data.orders = [];
        if (!this.data.categories) this.data.categories = [];
        if (!this.data.admins) this.data.admins = [];
        if (!this.data.settings) this.data.settings = {};

        console.log(`[JSON Database Loaded] ${this.data.products.length} products, ${this.data.orders.length} orders saved permanently in database.json`);
      } else {
        this.data = getInitialDatabase();
        this.save();
        console.log(`[JSON Database Initialized] Created database file at ${this.filePath} with ${this.data.products.length} Old Money products.`);
      }
    } catch (err) {
      console.error('[JSON Database Init Error] Falling back to memory state:', err);
      this.data = getInitialDatabase();
    }
  }

  save() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8');
      return true;
    } catch (err) {
      console.error('[JSON Database Save Error]:', err);
      return false;
    }
  }

  // --- PRODUCTS ---
  getProducts(filter = {}) {
    let result = [...this.data.products];
    const { category, search, isSale, isNew } = filter;

    if (category && category !== 'all') {
      result = result.filter(p => p.category === category);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (isSale === 'true') {
      result = result.filter(p => p.isSale);
    }
    if (isNew === 'true') {
      result = result.filter(p => p.isNew || p.isNewItem);
    }

    return result;
  }

  getProductById(id) {
    return this.data.products.find(p => p._id === id || p.id === id);
  }

  createProduct(productData) {
    const id = `ys-${Date.now()}`;
    const newProduct = {
      _id: id,
      id: id,
      ...productData,
      rating: productData.rating || 5.0,
      reviewCount: productData.reviewCount || 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.products.unshift(newProduct);
    this.save();
    return newProduct;
  }

  updateProduct(id, updateData) {
    const index = this.data.products.findIndex(p => p._id === id || p.id === id);
    if (index === -1) return null;

    this.data.products[index] = {
      ...this.data.products[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.data.products[index];
  }

  deleteProduct(id) {
    const index = this.data.products.findIndex(p => p._id === id || p.id === id);
    if (index === -1) return false;

    this.data.products.splice(index, 1);
    this.save();
    return true;
  }

  // --- ORDERS ---
  getOrders(filter = {}) {
    let result = this.data.orders.map(o => {
      const populatedItems = Array.isArray(o.items)
        ? o.items.map(item => {
            const prod = this.data.products.find(p => p.name === item.name || p.id === item.productId || p._id === item.productId);
            const image = item.image || item.product?.images?.[0] || prod?.images?.[0] || '';
            return {
              ...item,
              image,
              product: {
                id: prod?.id || item.productId || '',
                name: item.name,
                images: prod?.images || (image ? [image] : [])
              }
            };
          })
        : [];
      return { ...o, items: populatedItems };
    });

    const { status, search } = filter;

    if (status && status !== 'all') {
      result = result.filter(o => o.status === status);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(o =>
        (o.orderId && o.orderId.toLowerCase().includes(q)) ||
        (o.customer?.fullName && o.customer.fullName.toLowerCase().includes(q)) ||
        (o.customer?.email && o.customer.email.toLowerCase().includes(q)) ||
        (o.customer?.phone && o.customer.phone.toLowerCase().includes(q))
      );
    }

    return result;
  }

  getOrderById(id) {
    const o = this.data.orders.find(ord => ord._id === id || ord.orderId === id);
    if (!o) return null;
    const populatedItems = Array.isArray(o.items)
      ? o.items.map(item => {
          const prod = this.data.products.find(p => p.name === item.name || p.id === item.productId || p._id === item.productId);
          const image = item.image || item.product?.images?.[0] || prod?.images?.[0] || '';
          return {
            ...item,
            image,
            product: {
              id: prod?.id || item.productId || '',
              name: item.name,
              images: prod?.images || (image ? [image] : [])
            }
          };
        })
      : [];
    return { ...o, items: populatedItems };
  }

  createOrder(orderData) {
    const id = `ord-${Date.now()}`;
    let orderId = orderData.orderId;
    if (!orderId) {
      const nums = (this.data.orders || [])
        .map(o => parseInt(String(o.orderId || '').replace(/[^0-9]/g, ''), 10))
        .filter(n => !isNaN(n));
      const nextNum = nums.length > 0 ? Math.max(...nums) + 1 : (this.data.orders?.length || 0) + 1;
      orderId = String(nextNum);
    }

    // Ensure item images are filled
    const enrichedItems = Array.isArray(orderData.items)
      ? orderData.items.map(item => {
          const prod = this.data.products.find(p => p.name === item.name || p.id === item.productId || p._id === item.productId);
          const image = item.image || item.product?.images?.[0] || prod?.images?.[0] || '';
          return {
            ...item,
            image,
            product: {
              id: prod?.id || item.productId || '',
              name: item.name,
              images: prod?.images || (image ? [image] : [])
            }
          };
        })
      : [];

    const newOrder = {
      _id: id,
      ...orderData,
      orderId,
      items: enrichedItems,
      status: orderData.status || 'Pending',
      createdAt: new Date().toISOString()
    };
    this.data.orders.unshift(newOrder);

    // Update product stock counts
    if (Array.isArray(orderData.items)) {
      orderData.items.forEach(item => {
        const prod = this.data.products.find(p => p.name === item.name || p.id === item.productId || p._id === item.productId);
        if (prod && typeof prod.stockCount === 'number') {
          prod.stockCount = Math.max(0, prod.stockCount - (item.quantity || 1));
        }
      });
    }

    this.save();
    return newOrder;
  }

  updateOrderStatus(id, status) {
    const order = this.data.orders.find(o => o._id === id || o.orderId === id);
    if (!order) return null;

    order.status = status;
    order.updatedAt = new Date().toISOString();
    this.save();
    return order;
  }

  // --- CATEGORIES ---
  getCategories() {
    // Recount items
    this.data.categories.forEach(cat => {
      cat.count = this.data.products.filter(p => p.category === cat.slug || p.category === cat.id).length;
    });
    return this.data.categories;
  }

  createCategory(categoryData) {
    const slug = categoryData.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `cat-${Date.now()}`;
    const newCat = {
      _id: slug,
      id: slug,
      slug,
      ...categoryData,
      count: 0
    };
    this.data.categories.push(newCat);
    this.save();
    return newCat;
  }

  updateCategory(id, updateData) {
    const index = this.data.categories.findIndex(c => c._id === id || c.slug === id || c.id === id);
    if (index === -1) return null;

    this.data.categories[index] = {
      ...this.data.categories[index],
      ...updateData
    };
    this.save();
    return this.data.categories[index];
  }

  deleteCategory(id) {
    const index = this.data.categories.findIndex(c => c._id === id || c.slug === id || c.id === id);
    if (index === -1) return false;

    this.data.categories.splice(index, 1);
    this.save();
    return true;
  }

  // --- SETTINGS ---
  getSettings() {
    return this.data.settings;
  }

  updateSettings(settingsData) {
    this.data.settings = {
      ...this.data.settings,
      ...settingsData
    };
    this.save();
    return this.data.settings;
  }

  // --- ADMINS ---
  getAdminByEmail(email) {
    return this.data.admins.find(a => a.email.toLowerCase() === email.toLowerCase());
  }
}

export const dbStore = new DatabaseStore();
