export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'كيف أختار المقاس الدقيق والمثالي لي؟',
    answer: 'تعتمد أزياؤنا القياسات الإيطالية القياسية (46, 48, 50, 52, 54). يمكنك الاطلاع على دليل المقاسات في صفحة كل قطعة أو التواصل معنا لنساعدك في اختيار المقاس الأنسب لطولك ووزنك.'
  },
  {
    id: 'faq-2',
    question: 'هل يمكنني الدفع عند الاستلام (Cash on Delivery)؟',
    answer: 'نعم بكل تأكيد، الدفع عند الاستلام متاح لجميع الولايات بعد معاينة الطرد والتأكد من الجودة التامة.'
  },
  {
    id: 'faq-3',
    question: 'كيف أقوم بتتبع طلبي بعد الإرسال؟',
    answer: 'يمكنك التوجه إلى صفحة "تتبع الطلب" في أعلى الموقع وإدخال رقم طلبك (مثل: 1 أو 2) أو رقم هاتفك لمعرفة موقع الشحنة مباشرة.'
  }
];

export const getDefaultFaqs = (): FaqItem[] => {
  return JSON.parse(JSON.stringify(DEFAULT_FAQS));
};
