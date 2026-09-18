export interface ProductColor {
  name: string;
  nameAr?: string;
  hex?: string;
  bgClass?: string;
}

export interface Product {
  id: string;
  _id?: string;
  name: string;
  nameAr?: string;
  subtitle: string;
  subtitleAr?: string;
  price: number;
  originalPrice?: number;
  category: 'shirts' | 'trousers' | 'shoes' | 'watches' | 'eyewear' | string;
  categoryLabel: string;
  categoryLabelAr?: string;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  description: string;
  descriptionAr?: string;
  fabricCare: string[];
  fabricCareAr?: string[];
  details: string[];
  detailsAr?: string[];
  shippingPolicy?: string;
  isNew?: boolean;
  isNewItem?: boolean;
  isBestSeller?: boolean;
  isSale?: boolean;
  stockCount: number;
  relatedIds: string[];
}

export interface CategoryOption {
  id: string;
  label: string;
  labelAr?: string;
  count: number;
  image: string;
  description: string;
  descriptionAr?: string;
}

export const CATEGORIES: CategoryOption[] = [
  {
    id: 'shirts',
    label: 'قمصان',
    labelAr: 'قمصان',
    count: 5,
    image: '/products/shirt-black-tipping-polo.jpg',
    description: 'تشكيلة قمصان وبولو محبوكة من القطن المصري والتريكو الصيفي فائق النعومة بياقات كلاسيكية.',
    descriptionAr: 'تشكيلة قمصان وبولو محبوكة من القطن المصري والتريكو الصيفي فائق النعومة بياقات كلاسيكية.'
  },
  {
    id: 'trousers',
    label: 'سراويل',
    labelAr: 'سراويل',
    count: 5,
    image: '/products/trouser-beige-gurkha-pleated.jpg',
    description: 'سراويل قماش وكتان بكسرات إيطالية كلاسيكية وقصات سارتوريال مريحة وأشرطة تعديل جانبية.',
    descriptionAr: 'سراويل قماش وكتان بكسرات إيطالية كلاسيكية وقصات سارتوريال مريحة وأشرطة تعديل جانبية.'
  },
  {
    id: 'shoes',
    label: 'أحذية',
    labelAr: 'أحذية',
    count: 4,
    image: '/products/shoe-sand-suede-summer-loafers.jpg',
    description: 'أحذية لوفر جلد طبيعي وسويد إيطالي فاخر وسليب أون صيفي بنعال مطاطية مريحة.',
    descriptionAr: 'أحذية لوفر جلد طبيعي وسويد إيطالي فاخر وسليب أون صيفي بنعال مطاطية مريحة.'
  },
  {
    id: 'watches',
    label: 'ساعات',
    labelAr: 'ساعات',
    count: 3,
    image: '/products/watch-maurice-lacroix-silver-brown.jpg',
    description: 'ساعات يد كلاسيكية فاخرة بإطارات مصقولة وموانئ شعاع الشمس وأحزمة جلد طبيعي.',
    descriptionAr: 'ساعات يد كلاسيكية فاخرة بإطارات مصقولة وموانئ شعاع الشمس وأحزمة جلد طبيعي.'
  },
  {
    id: 'eyewear',
    label: 'نظارات',
    labelAr: 'نظارات',
    count: 2,
    image: '/products/eyewear-havana-tortoise-classic-sunglasses.jpg',
    description: 'نظارات شمسية كلاسيكية بإطارات التورتويس والأسيتات الإيطالية وحماية UV400.',
    descriptionAr: 'نظارات شمسية كلاسيكية بإطارات التورتويس والأسيتات الإيطالية وحماية UV400.'
  }
];

export const PRODUCTS: Product[] = [
  // --- SHIRTS (قمصان) ---
  {
    id: 'ys-shirt-01',
    _id: 'ys-shirt-01',
    name: 'قميص بولو محبوك أسود كلاسيكي بحواف بيضاء وياقة إيطالية مفتوحة',
    nameAr: 'قميص بولو محبوك أسود كلاسيكي بحواف بيضاء وياقة إيطالية مفتوحة',
    subtitle: 'Black Knit Polo with White Tipping & Open Italian Collar',
    subtitleAr: 'قميص بولو تريكو صيفي من القطن المصري فائق النعومة بياقة كابري كلاسيكية مفتوحة',
    price: 5400,
    originalPrice: 6800,
    category: 'shirts',
    categoryLabel: 'قمصان',
    categoryLabelAr: 'قمصان',
    rating: 5.0,
    reviewCount: 32,
    images: [
      '/products/shirt-black-tipping-polo.jpg'
    ],
    colors: [
      { name: 'أسود مع حواف بيضاء', nameAr: 'أسود مع حواف بيضاء' },
      { name: 'أسود سادة', nameAr: 'أسود سادة' },
      { name: 'كحلي داكن', nameAr: 'كحلي داكن' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'قميص بولو صيفي محبوك من خيوط القطن المصري فائق النعومة، يتميز بقصة مريحة وأكتاف مضبوطة وياقة مفتوحة بدون أزرار (Capri Collar) محددة بحواف بيضاء نقية تضفي لمسة أرستقراطية كلاسيكية (Old Money Aesthetic). مثالي للارتداء مع بنطال كتان أبيض أو رمادي فاتح في المناسبات الصيفية والخرجات الراقية في الجزائر.',
    fabricCare: [
      '100% قطن مصري محبوك طبيعي عالي النفاذية',
      'غسيل يدوي أو على برنامج خفيف بماء بارد',
      'تجفيف مسطح للحفاظ على شكل الحياكة'
    ],
    details: [
      'ياقة إيطالية مفتوحة ومريحة بدون أزرار (Open Camp Collar)',
      'حواف بيضاء متباينة على أطراف الياقة والأكمام',
      'نسيج قطني يسمح بمرور الهواء ومقاوم للحرارة',
      'حياكة متينة ومريحة تناسب الاستخدام اليومي والمناسبات'
    ],
    isNew: true,
    isNewItem: true,
    isBestSeller: true,
    isSale: true,
    stockCount: 18,
    relatedIds: ['ys-shirt-02', 'ys-shirt-03', 'ys-trouser-01', 'ys-shoe-01']
  },
  {
    id: 'ys-shirt-02',
    _id: 'ys-shirt-02',
    name: 'قميص بولو تريكو بأكمام طويلة أزرق رمادي محبوك ناعم',
    nameAr: 'قميص بولو تريكو بأكمام طويلة أزرق رمادي محبوك ناعم',
    subtitle: 'Slate Blue Long-Sleeve Textured Knit Polo',
    subtitleAr: 'بولو سارتوريال بأكمام طويلة من خيوط الميرينو والقطن الإيطالي',
    price: 6200,
    originalPrice: 7500,
    category: 'shirts',
    categoryLabel: 'قمصان',
    categoryLabelAr: 'قمصان',
    rating: 4.9,
    reviewCount: 27,
    images: [
      '/products/shirt-slate-blue-knit-long.jpg'
    ],
    colors: [
      { name: 'أزرق رمادي', nameAr: 'أزرق رمادي' },
      { name: 'كحلي ليلي', nameAr: 'كحلي ليلي' },
      { name: 'بيج رملي', nameAr: 'بيج رملي' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'قميص بولو بأكمام طويلة منسوج بنمط خطوط عمودية خفية تعطي قواماً متناسقاً ومظهراً فخماً هادئاً. مزود بياقة قميص متقنة وأزرار كلاسيكية مريحة. مناسب جداً للأجواء المعتدلة والربيعية والخريفية، واللقاءات الرسمية والعملية مع بنطال قماش كلاسيكي.',
    fabricCare: [
      'مزيج قطن ميرينو إيطالي ناعم الملمس',
      'تنظيف جاف أو غسيل يدوي خفيف',
      'كوي بدرجة حرارة خفيفة من الداخل'
    ],
    details: [
      'حياكة عمودية خفيفة تبرز تفاصيل القوام الرياضي',
      'أكمام طويلة بأساور مطاطية مريحة تحافظ على ثباتها',
      'أزرار أمامية أنيقة متناسقة مع لون القماش',
      'قصة سليم فت كلاسيكية متناسقة مع البناطيل القماشية'
    ],
    isNew: true,
    isNewItem: true,
    isBestSeller: true,
    isSale: false,
    stockCount: 14,
    relatedIds: ['ys-shirt-01', 'ys-trouser-01', 'ys-trouser-02', 'ys-shoe-04']
  },
  {
    id: 'ys-shirt-03',
    _id: 'ys-shirt-03',
    name: 'قميص بولو كحلي كلاسيكي بياقة ريترو عاجية ناصعة',
    nameAr: 'قميص بولو كحلي كلاسيكي بياقة ريترو عاجية ناصعة',
    subtitle: 'Vintage Navy Knit Polo with Ivory Retro Collar',
    subtitleAr: 'بولو محبوك مستوحى من نوادي الريفييرا الإيطالية الكلاسيكية',
    price: 5600,
    originalPrice: 6900,
    category: 'shirts',
    categoryLabel: 'قمصان',
    categoryLabelAr: 'قمصان',
    rating: 5.0,
    reviewCount: 41,
    images: [
      '/products/shirt-retro-navy-cream-polo.jpg'
    ],
    colors: [
      { name: 'كحلي مع ياقة عاجية', nameAr: 'كحلي مع ياقة عاجية' },
      { name: 'أخضر زيتي مع ياقة بيج', nameAr: 'أخضر زيتي مع ياقة بيج' },
      { name: 'بني موكا مع ياقة كريمي', nameAr: 'بني موكا مع ياقة كريمي' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'تصميم كلاسيكي مستوحى من حقبة الستينيات الذهبية لنوادي الريفييرا. يجمع بين اللون الكحلي الداكن المريح وياقة القميص الكلاسيكية المتباينة باللون العاجي العريق بفتحة V مريحة. خامة خفيفة تمتص الرطوبة ومصممة لتحافظ على رونقها وأناقتها حتى بعد تكرار الاستخدام.',
    fabricCare: [
      '100% قطن بيكيه ناعم ممشط',
      'غسيل بماء بارد بألوان مماثلة',
      'لا تستعمل المبيضات'
    ],
    details: [
      'ياقة ريترو عريضة باللون العاجي الكلاسيكي',
      'فتحة ياقة V بدون أزرار لسهولة الارتداء والراحة',
      'أكمام قصيرة بحاشية مطاطية متماسكة',
      'قطعة أساسية لكل محبي الستايل الكلاسيكي الهادئ'
    ],
    isNew: false,
    isNewItem: false,
    isBestSeller: true,
    isSale: true,
    stockCount: 22,
    relatedIds: ['ys-shirt-01', 'ys-trouser-03', 'ys-shoe-01', 'ys-shoe-04']
  },
  {
    id: 'ys-shirt-04',
    _id: 'ys-shirt-04',
    name: 'قميص بولو مضلع أخضر زمردي بخطوط بيضاء أفقية ناعمة',
    nameAr: 'قميص بولو مضلع أخضر زمردي بخطوط بيضاء أفقية ناعمة',
    subtitle: 'Emerald Green Ribbed Polo with Fine White Stripes',
    subtitleAr: 'قميص بولو تريكو فاخر باللون الزيتي الزمردي وتقليمات بيضاء هادئة',
    price: 5800,
    originalPrice: 7200,
    category: 'shirts',
    categoryLabel: 'قمصان',
    categoryLabelAr: 'قمصان',
    rating: 4.8,
    reviewCount: 19,
    images: [
      '/products/shirt-emerald-striped-knit-polo.jpg'
    ],
    colors: [
      { name: 'أخضر زمردي مخطط', nameAr: 'أخضر زمردي مخطط' },
      { name: 'كحلي مخطط', nameAr: 'كحلي مخطط' },
      { name: 'أسود مخطط', nameAr: 'أسود مخطط' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'قطعة مميزة بلون أخضر زمردي غني يبرز الأناقة والشخصية، مع تقليمات بيضاء أفقية متوازنة وتضليع عمودي يضفي عمقاً للخامة. يتميز بأزرار متناسقة وقبة كلاسيكية تثبت بأناقة. يتماشى بامتياز مع الشورتات الكلاسيكية وبناطيل التيل والكتان.',
    fabricCare: [
      '100% قطن بريميوم مقاوم للحرارة',
      'غسيل آلي على برنامج الصوف أو القطن الخفيف',
      'كوي بدرجة حرارة متوسطة'
    ],
    details: [
      'تضليع عمودي بارز يمنح ملمساً فاخراً وشكلاً جذاباً',
      'خطوط أفقية بيضاء ناصعة بدقة حياكة متناهية',
      'أزرار قميص متينة باللون الزيتي المتناسق',
      'تناسب مثالي مع البناطيل البيضاء والسوداء'
    ],
    isNew: true,
    isNewItem: true,
    isBestSeller: false,
    isSale: true,
    stockCount: 15,
    relatedIds: ['ys-shirt-05', 'ys-trouser-04', 'ys-shoe-03', 'ys-shoe-01']
  },
  {
    id: 'ys-shirt-05',
    _id: 'ys-shirt-05',
    name: 'قميص بولو مضلع أبيض ناصع مع سحاب معدني فضي فاخر',
    nameAr: 'قميص بولو مضلع أبيض ناصع مع سحاب معدني فضي فاخر',
    subtitle: 'Crisp White Ribbed Half-Zip Polo Shirt',
    subtitleAr: 'قميص بولو نصف سحاب أبيض ناصع بتضليع عمودي عصري راقٍ',
    price: 5900,
    originalPrice: 7400,
    category: 'shirts',
    categoryLabel: 'قمصان',
    categoryLabelAr: 'قمصان',
    rating: 5.0,
    reviewCount: 38,
    images: [
      '/products/shirt-white-zip-ribbed-polo.jpg'
    ],
    colors: [
      { name: 'أبيض ناصع', nameAr: 'أبيض ناصع' },
      { name: 'بيج عاجي', nameAr: 'بيج عاجي' },
      { name: 'رمادي فاتح', nameAr: 'رمادي فاتح' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'قمة الفخامة العصرية؛ بولو أبيض ناصع بتضليع عمودي يمنح الجسد مظهراً رياضياً وأنيقاً، مزود بسحاب معدني فضي مصقول يمنحك حرية التحكم في مستوى فتحة الياقة. تصميم ملكي مثالي للأعراس واللقاءات الراقية والعطلات الصيفية.',
    fabricCare: [
      '100% قطن جيزة طويل التيلة ناصع البياض',
      'غسيل بماء بارد للمحافظة على إشراقة اللون الأبيض',
      'لا تستعمل مبيضات كلورية'
    ],
    details: [
      'سحاب نصفي معدني فضي متين وسلس الحركة (Half-Zip)',
      'تضليع عمودي دقيق يعطي مظهراً متناسقاً ورشيقاً',
      'ياقة قميص عصرية تثبت بانسيابية حول العنق',
      'مناسب للمناسبات الرسمية والصيفية على حد سواء'
    ],
    isNew: true,
    isNewItem: true,
    isBestSeller: true,
    isSale: false,
    stockCount: 20,
    relatedIds: ['ys-shirt-01', 'ys-trouser-01', 'ys-shoe-01', 'ys-shoe-04']
  },

  // --- TROUSERS (سراويل) ---
  {
    id: 'ys-trouser-01',
    _id: 'ys-trouser-01',
    name: 'بنطال قماش إيطالي بيج بخصر سارتوريال مرتفع وأشرطة تعديل جانبية',
    nameAr: 'بنطال قماش إيطالي بيج بخصر سارتوريال مرتفع وأشرطة تعديل جانبية',
    subtitle: 'Tailored Beige Pleated Trousers with Side Adjusters',
    subtitleAr: 'بنطال كلاسيكي إيطالي فاخر بكسرات أمامية وأزرار خصر جانبية بدون حزام',
    price: 6400,
    originalPrice: 7900,
    category: 'trousers',
    categoryLabel: 'سراويل',
    categoryLabelAr: 'سراويل',
    rating: 5.0,
    reviewCount: 35,
    images: [
      '/products/trouser-beige-gurkha-pleated.jpg'
    ],
    colors: [
      { name: 'بيج جملي كلاسيكي', nameAr: 'بيج جملي كلاسيكي' },
      { name: 'رمادي فحمي', nameAr: 'رمادي فحمي' },
      { name: 'كحلي داكن', nameAr: 'كحلي داكن' }
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)', '46 (XXL)'],
    description: 'بنطال سارتوريال كلاسيكي بخصر مرتفع وتفصيل إيطالي متقن، مزود بأشرطة وأزرار تعديل جانبية على الخصر (Side Adjusters) بدلاً من الحزام لمنح إطلالة ناعمة ومترفة (Old Money). يتميز بكسرة أمامية مزدوجة تمنح انسيابية للقوام وراحة استثنائية.',
    fabricCare: [
      '70% صوف استوائي بارد، 30% فسكوز تركي ناعم',
      'تنظيف جاف متخصص أو غسيل يدوي بارد',
      'كوي مع واقي قماش للحفاظ على لمعة الخيط'
    ],
    details: [
      'أشرطة وأزرار تعديل جانبية تلغي الحاجة للحزام التقليدي',
      'كسرات أمامية حادة ومتقنة تعطي قواماً ممشوقاً',
      'قصة مستقيمة مريحة (Straight Leg Sartorial Cut)',
      'بطانة جيوب قطنية ناعمة ومخفية'
    ],
    isNew: true,
    isNewItem: true,
    isBestSeller: true,
    isSale: true,
    stockCount: 16,
    relatedIds: ['ys-shirt-01', 'ys-shirt-02', 'ys-shoe-01', 'ys-shoe-04']
  },
  {
    id: 'ys-trouser-02',
    _id: 'ys-trouser-02',
    name: 'بنطال سارتوريال ملكي أزرق سماوي بحزام عريض مدمج وكسرات أمامية',
    nameAr: 'بنطال سارتوريال ملكي أزرق سماوي بحزام عريض مدمج وكسرات أمامية',
    subtitle: 'Royal Sky Blue High-Waisted Gurkha Dress Trousers',
    subtitleAr: 'بنطال كلاسيكي أرستقراطي بخصر عريض ممتد وقصة واسعة انسيابية',
    price: 6900,
    originalPrice: 8500,
    category: 'trousers',
    categoryLabel: 'سراويل',
    categoryLabelAr: 'سراويل',
    rating: 4.9,
    reviewCount: 21,
    images: [
      '/products/trouser-royal-blue-sartorial.jpg'
    ],
    colors: [
      { name: 'أزرق سماوي ملكي', nameAr: 'أزرق سماوي ملكي' },
      { name: 'كحلي ليلي', nameAr: 'كحلي ليلي' },
      { name: 'رمادي فضي', nameAr: 'رمادي فضي' }
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)', '46 (XXL)'],
    description: 'قطعة أرستقراطية فريدة بلون أزرق سماوي ساطع يبرز الأناقة الصيفية والشخصية القيادية. يتميز بخصر عريض ممتد بأسلوب "جوركا" الإيطالي، مع كسرات أمامية عميقة وثنيات كاحل محكمة. يتماشى بامتياز مع القمصان البيضاء والعاجية.',
    fabricCare: [
      '100% صوف فيرجن خفيف بارد معالج ضد الرطوبة والحرارة',
      'تنظيف جاف فقط للحفاظ على حياكة الخصر العريض',
      'تعليق على شماعة خشبية عريضة'
    ],
    details: [
      'حزام خصر عريض مدمج مع إبزيم معدني جانبي فاخر',
      'كسرات أمامية مزدوجة تضمن حرية الحركة التامة',
      'قصة ساق كلاسيكية مريحة وعصرية',
      'تناسق مبهر مع القمصان القطنية البيضاء وأحذية اللوفر'
    ],
    isNew: true,
    isNewItem: true,
    isBestSeller: true,
    isSale: false,
    stockCount: 12,
    relatedIds: ['ys-shirt-05', 'ys-shoe-01', 'ys-shoe-02', 'ys-trouser-01']
  },
  {
    id: 'ys-trouser-03',
    _id: 'ys-trouser-03',
    name: 'بنطال كتان صيفي أزرق جليدي برباط خصر مطاطي مرن',
    nameAr: 'بنطال كتان صيفي أزرق جليدي برباط خصر مطاطي مرن',
    subtitle: 'Ice Blue Pure Linen Relaxed Drawstring Trousers',
    subtitleAr: 'بنطال كتان طبيعي 100% خفيف وفائق الراحة للخرجات الصيفية والمنتجعات',
    price: 5800,
    originalPrice: 7200,
    category: 'trousers',
    categoryLabel: 'سراويل',
    categoryLabelAr: 'سراويل',
    rating: 5.0,
    reviewCount: 29,
    images: [
      '/products/trouser-ice-blue-linen-drawstring.jpg'
    ],
    colors: [
      { name: 'أزرق جليدي', nameAr: 'أزرق جليدي' },
      { name: 'أبيض ناصع', nameAr: 'أبيض ناصع' },
      { name: 'بيج رملي', nameAr: 'بيج رملي' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'قمة الراحة والأناقة غير الرسمية (Casual Luxury). بنطال كتان نقي بلون أزرق فاتح مهدئ للأعصاب، مزود بخصر مطاطي مريح مع حبل ربط بأطراف معدنية سوداء. مثالي للخرجات الصيفية، العطلات، والمشي على الشواطئ والمنتجعات.',
    fabricCare: [
      '100% كتان طبيعي نقي عالي الجودة معالج بنعومة فائقة',
      'غسيل يدوي أو آلي بماء بارد على دورة الأقمشة الحساسة',
      'كوي بالبخار وهو رطب قليلاً'
    ],
    details: [
      'خصر مطاطي مريح مع رباط حبل مزود برؤوس معدنية أنيقة',
      'قماش كتان خفيف يسمح بمرور الهواء ويمنع التعرق',
      'قصة مريحة وعملية تناسب الأحذية الرياضية البيضاء وأحذية اللوفر',
      'جيوب جانبية وخلفية عميقة وعملية'
    ],
    isNew: false,
    isNewItem: false,
    isBestSeller: true,
    isSale: true,
    stockCount: 19,
    relatedIds: ['ys-shirt-03', 'ys-shoe-02', 'ys-shoe-01', 'ys-trouser-01']
  },
  {
    id: 'ys-trouser-04',
    _id: 'ys-trouser-04',
    name: 'بنطال قماش أوف وايت عاجي بكسرات كلاسيكية وقصة مستقيمة',
    nameAr: 'بنطال قماش أوف وايت عاجي بكسرات كلاسيكية وقصة مستقيمة',
    subtitle: 'Tailored Off-White Ivory Pleated Dress Trousers',
    subtitleAr: 'بنطال قماشي عاجي فاخر بقصة مستقيمة وكسرة ساق إيطالية حادة',
    price: 6200,
    originalPrice: 7600,
    category: 'trousers',
    categoryLabel: 'سراويل',
    categoryLabelAr: 'سراويل',
    rating: 4.9,
    reviewCount: 34,
    images: [
      '/products/trouser-cream-ivory-pleated.jpg'
    ],
    colors: [
      { name: 'أوف وايت عاجي', nameAr: 'أوف وايت عاجي' },
      { name: 'أسود كلاسيكي', nameAr: 'أسود كلاسيكي' },
      { name: 'رمادي فاتح', nameAr: 'رمادي فاتح' }
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)', '46 (XXL)'],
    description: 'البنطال الأبيض العاجي الأساسي في خزانة كل رجل كلاسيكي. قصة مستقيمة مع كسرات أمامية حادة تمنح وقاراً وهيبة للمظهر العام. يتماشى بروعة مع قمصان البولو السوداء والكنزات الكشميرية الداكنة.',
    fabricCare: [
      'مزيج قطن مصري وصوف ناعم بوبلين ثقيل لا يشف',
      'تنظيف جاف أو غسيل يدوي لطيف',
      'يحفظ معلقاً للحفاظ على استقامة الكسرات'
    ],
    details: [
      'قماش عالي الكثافة معتم وغير شفاف تماماً',
      'كسرة طولية حادة تعطي انطباعاً بالطول والرشاقة',
      'عروات حزام كلاسيكية مع إمكانية الارتداء مع حزام جلد أسود أو بني',
      'تناسق أسطوري مع قمصان البولو السوداء والزيتية'
    ],
    isNew: true,
    isNewItem: true,
    isBestSeller: true,
    isSale: false,
    stockCount: 15,
    relatedIds: ['ys-shirt-01', 'ys-shoe-03', 'ys-shoe-04', 'ys-trouser-01']
  },
  {
    id: 'ys-trouser-05',
    _id: 'ys-trouser-05',
    name: 'بنطال جوركا زيتي كاكي بأزرار مزدوجة وخصر مرتفع مفصل',
    nameAr: 'بنطال جوركا زيتي كاكي بأزرار مزدوجة وخصر مرتفع مفصل',
    subtitle: 'Military Olive Khaki Double-Button Gurkha Trousers',
    subtitleAr: 'بنطال سارتوريال عسكري فاخر بخصر مزدوج الأزرار وتصميم كلاسيكي هادئ',
    price: 6600,
    originalPrice: 8200,
    category: 'trousers',
    categoryLabel: 'سراويل',
    categoryLabelAr: 'سراويل',
    rating: 5.0,
    reviewCount: 26,
    images: [
      '/products/trouser-olive-khaki-gurkha.jpg'
    ],
    colors: [
      { name: 'زيتي كاكي عسكري', nameAr: 'زيتي كاكي عسكري' },
      { name: 'بني تبغي', nameAr: 'بني تبغي' },
      { name: 'كحلي داكن', nameAr: 'كحلي داكن' }
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)', '46 (XXL)'],
    description: 'بنطال سارتوريال عسكري مستوحى من بنطلونات الجوركا البريطانية الكلاسيكية. خصر مرتفع مع زرين جانبيين متباعدين يمنحان تحكماً مثالياً في القياس وشكلاً بارزاً للخصر بدون حزام. خامة قماشية فاخرة تعطي فخامة وحضوراً قوياً.',
    fabricCare: [
      '100% قطن تويل إيطالي ثقيل ناعم الملمس ومقاوم للاهتراء',
      'غسيل آلي بماء فاتر مع ألوان مماثلة',
      'كوي بدرجة حرارة متوسطة'
    ],
    details: [
      'إغلاق خصر عريض بزرين متتاليين يمنح استقامة ومظهراً مهندماً',
      'كسرات أمامية عميقة مستوحاة من التصاميم البريطانية الملكية',
      'نسيج متين وفاخر يتحمل الاستخدام اليومي ويحافظ على لمعانه',
      'يتناسق بامتياز مع قمصان البولو البيضاء والسترات الكلاسيكية'
    ],
    isNew: true,
    isNewItem: true,
    isBestSeller: true,
    isSale: true,
    stockCount: 17,
    relatedIds: ['ys-shirt-05', 'ys-shoe-04', 'ys-shoe-01', 'ys-trouser-01']
  },

  // --- SHOES (أحذية) ---
  {
    id: 'ys-shoe-01',
    _id: 'ys-shoe-01',
    name: 'حذاء لوفر صيفي سويدي بيج رملي بنعل مطاطي خفيف (Summer Walk)',
    nameAr: 'حذاء لوفر صيفي سويدي بيج رملي بنعل مطاطي خفيف (Summer Walk)',
    subtitle: 'Sand Suede Summer Walk Loafers with Natural Rubber Sole',
    subtitleAr: 'حذاء لوفر إيطالي فاخر من جلد السويد فائق النعومة بنعل طبيعي مريح',
    price: 8200,
    originalPrice: 9800,
    category: 'shoes',
    categoryLabel: 'أحذية',
    categoryLabelAr: 'أحذية',
    rating: 5.0,
    reviewCount: 48,
    images: [
      '/products/shoe-sand-suede-summer-loafers.jpg'
    ],
    colors: [
      { name: 'بيج رملي سويدي', nameAr: 'بيج رملي سويدي' },
      { name: 'كحلي ليلي', nameAr: 'كحلي ليلي' },
      { name: 'رمادي حجري', nameAr: 'رمادي حجري' }
    ],
    sizes: ['40 EU', '41 EU', '42 EU', '43 EU', '44 EU', '45 EU'],
    description: 'الأيقونة الصيفية الخالدة للأناقة الهادئة والـ Old Money. مصنوع من جلد السويد الإيطالي غير المبطن فائق النعومة والخفة، مزود بنعل مطاطي من اللاتكس الطبيعي المرن لمقاومة الانزلاق وتوفير راحة مطلقة عند المشي. مثالي للإطلالات اليومية والرحلات مع بنطال كتان أو قميص بولو.',
    fabricCare: [
      '100% جلد شمواه سويد إيطالي طبيعي فائق النعومة',
      'تنظيف بفرشاة الشمواه الجافة المخصصة',
      'استخدام بخاخ حماية مقاوم للماء والبقع'
    ],
    details: [
      'نعل مطاطي خفيف مرن يوفر ثباتاً فائقاً',
      'حياكة يدوية متقنة على حواف مقدمة الحذاء',
      'بطانة داخلية جلدية ناعمة تمتص الرطوبة وتمنع التعرق',
      'تصميم خفيف الوزن ملائم للارتداء بدون جوارب صيفاً'
    ],
    isNew: true,
    isNewItem: true,
    isBestSeller: true,
    isSale: true,
    stockCount: 16,
    relatedIds: ['ys-trouser-01', 'ys-trouser-03', 'ys-shirt-01', 'ys-shoe-04']
  },
  {
    id: 'ys-shoe-02',
    _id: 'ys-shoe-02',
    name: 'حذاء سليب أون لوفر مخملي رمادي عاجي بنعل كاجوال أبيض',
    nameAr: 'حذاء سليب أون لوفر مخملي رمادي عاجي بنعل كاجوال أبيض',
    subtitle: 'Taupe Greige Velvet Suede Slip-on Cupsole Loafers',
    subtitleAr: 'حذاء سليب أون سويد مخملي ناعم بنعل كب-سول أبيض عصري مريح',
    price: 7900,
    originalPrice: 9400,
    category: 'shoes',
    categoryLabel: 'أحذية',
    categoryLabelAr: 'أحذية',
    rating: 4.9,
    reviewCount: 31,
    images: [
      '/products/shoe-taupe-velvet-slipon-loafers.jpg'
    ],
    colors: [
      { name: 'رمادي عاجي مخملي', nameAr: 'رمادي عاجي مخملي' },
      { name: 'كحلي داكن', nameAr: 'كحلي داكن' },
      { name: 'أسود فحمي', nameAr: 'أسود فحمي' }
    ],
    sizes: ['40 EU', '41 EU', '42 EU', '43 EU', '44 EU', '45 EU'],
    description: 'تصميم عصري يجمع بين وقار اللوفر وحيوية الحذاء الرياضي الأنيق. جلد سويدي ناعم بلون الرمادي العاجي الدافئ مع شريط أمامي بارز ونعل مطاطي أبيض خفيف. يمنحك الراحة الكاملة طوال اليوم في الخرجات العملية واليومية.',
    fabricCare: [
      'جلد سويدي مخملي عالي الجودة معالج بنعومة',
      'تنظيف بقطعة قماش جافة وفرشاة خاصة',
      'حفظ في كيس قماشي واقٍ'
    ],
    details: [
      'نعل أبيض سميك ومرن يمتص الصدمات',
      'حزام أمامي عريض بلمسة سارتوريال مميزة',
      'سهل الارتداء والخلع (Slip-On)',
      'يتماشى بروعة مع الجينز الكلاسيكي وبناطيل الكتان'
    ],
    isNew: true,
    isNewItem: true,
    isBestSeller: false,
    isSale: true,
    stockCount: 14,
    relatedIds: ['ys-trouser-03', 'ys-trouser-02', 'ys-shirt-02', 'ys-shoe-01']
  },
  {
    id: 'ys-shoe-03',
    _id: 'ys-shoe-03',
    name: 'حذاء لوفر بيني جلد طبيعي أسود كلاسيكي بنعل سميك عصري (Chunky Lug Sole)',
    nameAr: 'حذاء لوفر بيني جلد طبيعي أسود كلاسيكي بنعل سميك عصري (Chunky Lug Sole)',
    subtitle: 'Chunky Black Calfskin Classic Penny Loafers',
    subtitleAr: 'لوفر بيني جلد عجل أسود إيطالي مصقول بنعل سميك وهيبة كلاسيكية',
    price: 9400,
    originalPrice: 11500,
    category: 'shoes',
    categoryLabel: 'أحذية',
    categoryLabelAr: 'أحذية',
    rating: 5.0,
    reviewCount: 42,
    images: [
      '/products/shoe-black-chunky-penny-loafers.jpg'
    ],
    colors: [
      { name: 'أسود ملكي لامع', nameAr: 'أسود ملكي لامع' },
      { name: 'بني محروق', nameAr: 'بني محروق' }
    ],
    sizes: ['40 EU', '41 EU', '42 EU', '43 EU', '44 EU', '45 EU'],
    description: 'لوفر كلاسيكي فاخر من جلد العجل الإيطالي الأسود المصقول، مزود بفتحة البيني التقليدية مع نعل سميك مسنن (Lug Sole) يمنح ثباتاً وهيبة وقواماً مميزاً. قطعة كلاسيكية رائعة للمناسبات الرسمية والبدلات والسراويل الكلاسيكية.',
    fabricCare: [
      '100% جلد عجل طبيعي نخب أول (Full-Grain Calfskin)',
      'تلميع دوري بشمع الأحذية الأسود الطبيعي',
      'استخدام قالب أحذية خشبي للحفاظ على شكله'
    ],
    details: [
      'نعل سميك مسنن خفيف الوزن يمنح راحة وثباتاً',
      'حزام بيني لوفر كلاسيكي محفور بحرفية يدوية',
      'جلد لامع ومقاوم للخدوش وعوامل الطقس',
      'تناغم استثنائي مع البناطيل القماشية البيضاء والسوداء'
    ],
    isNew: true,
    isNewItem: true,
    isBestSeller: true,
    isSale: false,
    stockCount: 18,
    relatedIds: ['ys-trouser-04', 'ys-trouser-05', 'ys-shirt-01', 'ys-shoe-04']
  },
  {
    id: 'ys-shoe-04',
    _id: 'ys-shoe-04',
    name: 'حذاء لوفر إيطالي سويد بني كونياك دافئ مع نعل أبيض كلاسيكي',
    nameAr: 'حذاء لوفر إيطالي سويد بني كونياك دافئ مع نعل أبيض كلاسيكي',
    subtitle: 'Warm Cognac Suede Italian Penny Loafers with White Sole',
    subtitleAr: 'لوفر سويد بلون بني كونياك دافئ ونعل أبيض خفيف مستوحى من الريفييرا',
    price: 8600,
    originalPrice: 10200,
    category: 'shoes',
    categoryLabel: 'أحذية',
    categoryLabelAr: 'أحذية',
    rating: 5.0,
    reviewCount: 39,
    images: [
      '/products/shoe-cognac-suede-italian-loafers.jpg'
    ],
    colors: [
      { name: 'بني كونياك دافئ', nameAr: 'بني كونياك دافئ' },
      { name: 'بيج جملي', nameAr: 'بيج جملي' },
      { name: 'أخضر زيتي', nameAr: 'أخضر زيتي' }
    ],
    sizes: ['40 EU', '41 EU', '42 EU', '43 EU', '44 EU', '45 EU'],
    description: 'التجسيد الأمثل لأناقة شوارع فلورنسا وميلانو. مصنوع من جلد السويد بلون الكونياك العسلي الغني مع قصة بيني لوفر كلاسيكية ونعل أبيض نحيف يضفي لمسة عصرية صيفية راقية. يتناغم بامتياز مع السراويل البيضاء والبيج.',
    fabricCare: [
      'جلد سويدي إيطالي أصلي معالج ضد البقع والرطوبة',
      'فرشاة سويد خفيفة لإزالة الأتربة اليومية',
      'عدم التعريض المباشر للحرارة الشديدة'
    ],
    details: [
      'لون كونياك عميق وغني يبرز فخامة الجلد الطبيعي',
      'نعل أبيض متباين يمنح طابع الـ Summer Chic الإيطالي',
      'بطانة داخلية من الجلد الطبيعي الكامل لتوفير أقصى درجات الراحة',
      'مناسب للمناسبات الصيفية والخرجات الأنيقة والمطاعم الفاخرة'
    ],
    isNew: true,
    isNewItem: true,
    isBestSeller: true,
    isSale: true,
    stockCount: 15,
    relatedIds: ['ys-trouser-01', 'ys-trouser-04', 'ys-shirt-03', 'ys-shoe-01']
  },

  // --- WATCHES (ساعات) ---
  {
    id: 'ys-watch-01',
    _id: 'ys-watch-01',
    name: 'ساعة يد كلاسيكية فاخرة بإطار فضي وميناء فضي مشع مع حزام جلد طبيعي بني',
    nameAr: 'ساعة يد كلاسيكية فاخرة بإطار فضي وميناء فضي مشع مع حزام جلد طبيعي بني',
    subtitle: 'Maurice Lacroix Eliros Classic Silver Sunray Dial & Brown Leather',
    subtitleAr: 'ساعة سويسرية كلاسيكية بميناء فضي مصقول وحزام جلد عجل بني هادئ',
    price: 14500,
    originalPrice: 18000,
    category: 'watches',
    categoryLabel: 'ساعات',
    categoryLabelAr: 'ساعات',
    rating: 5.0,
    reviewCount: 26,
    images: [
      '/products/watch-maurice-lacroix-silver-brown.jpg'
    ],
    colors: [
      { name: 'بني كلاسيكي مع إطار فضي', nameAr: 'بني كلاسيكي مع إطار فضي' },
      { name: 'أسود ملكي مع إطار فضي', nameAr: 'أسود ملكي مع إطار فضي' }
    ],
    sizes: ['40mm (مقاس قياسي مريح)'],
    description: 'ساعة سويسرية كلاسيكية راقية بتصميم مينيماليست يعكس فخامة الـ Old Money الهادئة. تتميز بميناء فضي بلمعة شعاع الشمس (Sunray Dial) ومؤشرات ناعمة مع نافذة تاريخ عند الساعة الثالثة، ومزودة بحزام من الجلد الطبيعي البني الفاخر بدرزات يدوية متقنة.',
    fabricCare: [
      'هيكل من الفولاذ المقاوم للصدأ 316L المصقول بعناية',
      'زجاج ياقوتي (Sapphire Crystal) مقاوم للخدش والصدمات',
      'حزام جلد طبيعي فاخر يحفظ بعيداً عن الماء المفرط'
    ],
    details: [
      'ميناء فضي كلاسيكي مع مؤشرات ساعات محفورة بدقة',
      'نافذة عرض التاريخ العملي عند موضع الساعة 3',
      'حزام جلد عجل طبيعي بني مع إبزيم فضي منقوش',
      'مقاومة للماء حتى ضغط 5 بار (50 متراً)'
    ],
    isNew: true,
    isNewItem: true,
    isBestSeller: true,
    isSale: true,
    stockCount: 11,
    relatedIds: ['ys-shirt-01', 'ys-trouser-01', 'ys-shoe-01', 'ys-watch-02']
  },
  {
    id: 'ys-watch-02',
    _id: 'ys-watch-02',
    name: 'ساعة مون فيز أوتوماتيك ملكية بإطار ذهبي وردي وميناء أزرق ليلي غامق',
    nameAr: 'ساعة مون فيز أوتوماتيك ملكية بإطار ذهبي وردي وميناء أزرق ليلي غامق',
    subtitle: 'Master Ultra Thin Moonphase Rose Gold & Midnight Blue Sunray',
    subtitleAr: 'تحفة سويسرية بمؤشر أطوار القمر وميناء أزرق ملكي متدرج مع حزام تمساح كحلي',
    price: 22500,
    originalPrice: 28000,
    category: 'watches',
    categoryLabel: 'ساعات',
    categoryLabelAr: 'ساعات',
    rating: 5.0,
    reviewCount: 38,
    images: [
      '/products/watch-jaeger-lecoultre-moonphase-blue-gold.jpg'
    ],
    colors: [
      { name: 'أزرق ليلي مع ذهب وردي', nameAr: 'أزرق ليلي مع ذهب وردي' },
      { name: 'أسود فحمي مع ذهب وردي', nameAr: 'أسود فحمي مع ذهب وردي' }
    ],
    sizes: ['39mm (سمك نحيف فائق الأناقة)'],
    description: 'قمة الهيبة والأرستقراطية الكلاسيكية. ميناء أزرق ليلي عميق يتدرج تحت الضوء مع تعقيدة منازل القمر (Moonphase) الذهبية ومؤشر تاريخ دائري. إطار نحيف للغاية من الذهب الوردي المصقول ينساب تحت أساور القميص بكل سلاسة مع حزام جلدي كحلي بنقشة التمساح.',
    fabricCare: [
      'هيكل ذهبي وردي فاخر عالي المقاومة وتلميع ميكانيكي دقيق',
      'حركة ميكانيكية أوتوماتيكية سويسرية فائقة الدقة',
      'حزام جلد تمساح فاخر يحفظ في علبته الخاصة'
    ],
    details: [
      'تعقيدة أطوار القمر الذهبية الفلكية مع سماء ليلية مرصعة بالنجوم',
      'حركة أوتوماتيكية ذاتية التعبئة باحتياطي طاقة ممتاز',
      'زجاج زفير مزدوج مضاد للانعكاس لكلا الوجهين',
      'حزام جلد تمساح كحلي فاخر مع إبزيم قابل للتعديل'
    ],
    isNew: true,
    isNewItem: true,
    isBestSeller: true,
    isSale: false,
    stockCount: 8,
    relatedIds: ['ys-shirt-02', 'ys-trouser-02', 'ys-shoe-03', 'ys-watch-01']
  },
  {
    id: 'ys-watch-03',
    _id: 'ys-watch-03',
    name: 'ساعة تانك كلاسيكية مربعة بإطار ذهبي وأرقام رومانية مع حزام جلد أسود',
    nameAr: 'ساعة تانك كلاسيكية مربعة بإطار ذهبي وأرقام رومانية مع حزام جلد أسود',
    subtitle: 'Vintage Tank Louis Gold Watch with Roman Numerals & Sapphire Crown',
    subtitleAr: 'الساعة الأيقونية التاريخية بإطار ذهبي مستطيل وعقارب زرقاء وعقرب كابوشون ياقوتي',
    price: 16800,
    originalPrice: 21000,
    category: 'watches',
    categoryLabel: 'ساعات',
    categoryLabelAr: 'ساعات',
    rating: 4.9,
    reviewCount: 45,
    images: [
      '/products/watch-cartier-tank-gold-roman.jpg'
    ],
    colors: [
      { name: 'أسود مع إطار ذهبي عتيق', nameAr: 'أسود مع إطار ذهبي عتيق' },
      { name: 'بني تمساح مع إطار ذهبي', nameAr: 'بني تمساح مع إطار ذهبي' }
    ],
    sizes: ['33mm × 25mm (تانك كلاسيكي راقٍ)'],
    description: 'الساعة التي ارتداها ملوك ونبلاء العالم لعقود. تصميم مستطيل هندسي بأسلوب الآرت ديكو الخالد مع أرقام رومانية سوداء ومسار دقائق كلاسيكي وعقارب فولاذية زرقاء، متوجة بتاج مرصع بحجر كابوشون أزرق فاخر وحزام جلد أسود ملكي.',
    fabricCare: [
      'هيكل صلب مطلي بذهب عيار 18 عالي النقاوة',
      'زجاج ياقوتي مقبب ومقاوم للخدوش تماماً',
      'تجنب الرش المباشر للعطور على حزام الجلد'
    ],
    details: [
      'تاج ضبط الوقت مرصع بحجر كابوشون أزرق ملكي بارز',
      'ميناء أبيض عاجي بأرقام رومانية سوداء حادة ومسار قطار الدقائق',
      'عقارب سيفية فولاذية معالجة حرارياً باللون الأزرق',
      'حزام جلد تمساح أسود كلاسيكي بإبزيم ذهبي متناسق'
    ],
    isNew: true,
    isNewItem: true,
    isBestSeller: true,
    isSale: true,
    stockCount: 12,
    relatedIds: ['ys-shirt-05', 'ys-trouser-04', 'ys-shoe-03', 'ys-watch-02']
  },

  // --- EYEWEAR (نظارات) ---
  {
    id: 'ys-eyewear-01',
    _id: 'ys-eyewear-01',
    name: 'نظارة شمسية كلاسيكية دائرية بإطار هافانا تورتويس وعدسات بنية متدرجة',
    nameAr: 'نظارة شمسية كلاسيكية دائرية بإطار هافانا تورتويس وعدسات بنية متدرجة',
    subtitle: 'Havana Tortoise Classic Acetate Sunglasses UV400',
    subtitleAr: 'نظارة صيفية بطراز الريفييرا الإيطالية وعدسات شمسية بنية مستقطبة',
    price: 6400,
    originalPrice: 8000,
    category: 'eyewear',
    categoryLabel: 'نظارات',
    categoryLabelAr: 'نظارات',
    rating: 5.0,
    reviewCount: 33,
    images: [
      '/products/eyewear-havana-tortoise-classic-sunglasses.jpg'
    ],
    colors: [
      { name: 'هافانا تورتويس كلاسيكي', nameAr: 'هافانا تورتويس كلاسيكي' },
      { name: 'عسلي شفاف', nameAr: 'عسلي شفاف' },
      { name: 'أسود ملكي', nameAr: 'أسود ملكي' }
    ],
    sizes: ['مقاس قياسي موحد (Standard Fit)'],
    description: 'النظارة الشمسية الأيقونية لإطلالة الـ Old Money الصيفية. إطار مصنوع يدوياً من أسيتات السليلوز الإيطالي بنقشة صدف السلحفاة (Tortoiseshell) مع عدسات شمسية بنية دافئة توفر حماية كاملة 100% من الأشعة فوق البنفسجية UV400. تتماشى بشكل ساحر مع قمصان الكتان والبولو.',
    fabricCare: [
      'أسيتات سليلوز طبيعي إيطالي مصقول يدوياً',
      'تنظيف العدسات بقطعة الميكروفايبر المرفقة فقط',
      'حفظ النظارة دائماً داخل العلبة الجلدية الصلبة'
    ],
    details: [
      'عدسات شمسية فئة 3 مستقطبة بحماية كاملة 100% من أشعة UV400',
      'مفصلات معدنية قوية بخمس أسنان لضمان المتانة وطول العمر',
      'نقشة هافانا تورتويس إيطالية فريدة لكل قطعة',
      'مرفقة بجراب جلدي فاخر ومنديل تنظيف ناعم'
    ],
    isNew: true,
    isNewItem: true,
    isBestSeller: true,
    isSale: true,
    stockCount: 20,
    relatedIds: ['ys-shirt-01', 'ys-shirt-03', 'ys-trouser-03', 'ys-shoe-01']
  },
  {
    id: 'ys-eyewear-02',
    _id: 'ys-eyewear-02',
    name: 'نظارة شمسية كلاسيكية مفصلية رمادية مدخنة بجسر مفتاح الأناقة',
    nameAr: 'نظارة شمسية كلاسيكية مفصلية رمادية مدخنة بجسر مفتاح الأناقة',
    subtitle: 'Smoked Grey Acetate Keyhole Bridge Sunglasses',
    subtitleAr: 'تصميم عصري كلاسيكي بعدسات رمادية داكنة وجسر أنف Keyhole لراحة استثنائية',
    price: 6200,
    originalPrice: 7800,
    category: 'eyewear',
    categoryLabel: 'نظارات',
    categoryLabelAr: 'نظارات',
    rating: 4.9,
    reviewCount: 28,
    images: [
      '/products/eyewear-smoked-black-keyhole-sunglasses.jpg'
    ],
    colors: [
      { name: 'رمادي مدخن شفاف', nameAr: 'رمادي مدخن شفاف' },
      { name: 'أسود لامع', nameAr: 'أسود لامع' },
      { name: 'زيتي زجاجي', nameAr: 'زيتي زجاجي' }
    ],
    sizes: ['مقاس قياسي موحد (Standard Fit)'],
    description: 'نظارة شمسية أنيقة تتميز بجسر الأنف الكلاسيكي بتصميم ثقب المفتاح (Keyhole Bridge) الذي يوزع الوزن براحة فائقة على الأنف، مع إطار شفاف بلون الرمادي الدخاني العصري وعدسات داكنة تحمي العينين بأناقة لا مثيل لها.',
    fabricCare: [
      'أسيتات معالج ضد الخدوش وخفيف الوزن على الأنف',
      'غسيل بماء فاتر وتجفيف بمنديل النظارات',
      'تجنب ترك النظارة في تابلوه السيارة تحت الشمس الحارقة'
    ],
    details: [
      'جسر أنف ثقب المفتاح (Keyhole) يمنح راحة فائقة دون ضغط على الأنف',
      'عدسات داكنة تحجب الوهج وتوفر وضوح رؤية عالي الدقة',
      'إطار رمادي مدخن شفاف يضفي لمسة عصرية هادئة للمظهر العام',
      'مناسبة جداً للقيادة والخرجات الصيفية والشواطئ'
    ],
    isNew: true,
    isNewItem: true,
    isBestSeller: true,
    isSale: false,
    stockCount: 16,
    relatedIds: ['ys-shirt-05', 'ys-trouser-01', 'ys-shoe-02', 'ys-eyewear-01']
  }
];

export function getLocalizedProduct(p: Product, lang: string = 'ar'): Product {
  if (!p) return p;
  return {
    ...p,
    name: lang === 'ar' ? (p.nameAr || p.name) : p.name,
    subtitle: lang === 'ar' ? (p.subtitleAr || p.subtitle) : p.subtitle,
    categoryLabel: lang === 'ar' ? (p.categoryLabelAr || p.categoryLabel) : p.categoryLabel,
    description: lang === 'ar' ? (p.descriptionAr || p.description) : p.description,
    fabricCare: lang === 'ar' ? (p.fabricCareAr || p.fabricCare) : p.fabricCare,
    details: lang === 'ar' ? (p.detailsAr || p.details) : p.details,
    colors: (p.colors || []).map(c => ({
      ...c,
      name: lang === 'ar' ? (c.nameAr || c.name) : c.name
    }))
  };
}

export function getLocalizedCategory(c: CategoryOption, lang: string = 'ar'): CategoryOption {
  if (!c) return c;
  return {
    ...c,
    label: lang === 'ar' ? (c.labelAr || c.label) : c.label,
    description: lang === 'ar' ? (c.descriptionAr || c.description) : c.description
  };
}

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'رياض بن عيسى',
    author: 'رياض بن عيسى',
    location: 'حيدرة، الجزائر العاصمة',
    comment: 'جودة خيالية وتفصيل متقن يحاكي أرقى دور الخياطة الكلاسيكية العالمية. قمصان البولو وأحذية اللوفر السويد الصيفية تفوق كل التوقعات، فخور بوجود هذه الفخامة في الجزائر.',
    quote: 'جودة خيالية وتفصيل متقن يحاكي أرقى دور الخياطة الكلاسيكية العالمية. قمصان البولو وأحذية اللوفر السويد الصيفية تفوق كل التوقعات، فخور بوجود هذه الفخامة في الجزائر.',
    quoteAr: 'جودة خيالية وتفصيل متقن يحاكي أرقى دور الخياطة الكلاسيكية العالمية. قمصان البولو وأحذية اللوفر السويد الصيفية تفوق كل التوقعات، فخور بوجود هذه الفخامة في الجزائر.',
    rating: 5,
    role: 'عميل دائم — الجزائر العاصمة'
  },
  {
    id: '2',
    name: 'أمين بلمهدي',
    author: 'أمين بلمهدي',
    location: 'حي العقيد لطفي، وهران',
    comment: 'الفخامة الهادئة والـ Old Money الحقيقي في أبهى صوره. الأقمشة والجلود طبيعية وفاخرة 100%، والتوصيل كان سريعاً جداً مع معاينة قبل الدفع وتغليف ملكي أنيق.',
    quote: 'الفخامة الهادئة والـ Old Money الحقيقي في أبهى صوره. الأقمشة والجلود طبيعية وفاخرة 100%، والتوصيل كان سريعاً جداً مع معاينة قبل الدفع وتغليف ملكي أنيق.',
    quoteAr: 'الفخامة الهادئة والـ Old Money الحقيقي في أبهى صوره. الأقمشة والجلود طبيعية وفاخرة 100%، والتوصيل كان سريعاً جداً مع معاينة قبل الدفع وتغليف ملكي أنيق.',
    rating: 5,
    role: 'عضو النادي الذهبي — وهران'
  },
  {
    id: '3',
    name: 'كريم بلحاج',
    author: 'كريم بلحاج',
    location: 'المنصورة، تلمسان',
    comment: 'تعامل راقٍ وقطع سارتوريال استثنائية ذات خياطة مبهرة تدوم لسنوات. متجر يونس سارتوريال عنوان الأناقة والرجولة الكلاسيكية بلا منازع.',
    quote: 'تعامل راقٍ وقطع سارتوريال استثنائية ذات خياطة مبهرة تدوم لسنوات. متجر يونس سارتوريال عنوان الأناقة والرجولة الكلاسيكية بلا منازع.',
    quoteAr: 'تعامل راقٍ وقطع سارتوريال استثنائية ذات خياطة مبهرة تدوم لسنوات. متجر يونس سارتوريال عنوان الأناقة والرجولة الكلاسيكية بلا منازع.',
    rating: 5,
    role: 'عميل دائم — تلمسان'
  }
];
