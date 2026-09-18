// Younes Shop Admin Data Script

export const OLD_MONEY_CATEGORIES = [
  {
    id: "shirts",
    slug: "shirts",
    label: "القمصان والبولو الفاخر",
    description: "قمصان بوبلين قطن مصري فاخر وتيشرتات بولو محبوكة بياقات مفتوحة كلاسيكية.",
    image: "/products/old-money-outfit-1.jpg",
    count: 2
  },
  {
    id: "knitwear",
    slug: "knitwear",
    label: "الكشمير والتريكو الفاخر",
    description: "كنزات بولو مضلعة من الصوف والحرير وأطقم كشمير وتريكو صيفي فائق النعومة.",
    image: "/products/old-money-outfit-2.jpg",
    count: 2
  },
  {
    id: "suits",
    slug: "suits",
    label: "البدلات والبليزرات الكلاسيكية",
    description: "بليزرات كتان وصوف إيطالي مفصلة بأبعاد أرستقراطية وبدلات كلاسيكية فاخرة.",
    image: "/products/old-money-outfit-4.jpg",
    count: 1
  }
];

export const OLD_MONEY_PRODUCTS = [
  {
    id: "ys-outfit-01",
    _id: "ys-outfit-01",
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
    stockCount: 15
  },
  {
    id: "ys-outfit-02",
    _id: "ys-outfit-02",
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
    stockCount: 12
  },
  {
    id: "ys-outfit-03",
    _id: "ys-outfit-03",
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
    stockCount: 18
  },
  {
    id: "ys-outfit-04",
    _id: "ys-outfit-04",
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
    stockCount: 10
  },
  {
    id: "ys-outfit-05",
    _id: "ys-outfit-05",
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
    stockCount: 14
  }
];
