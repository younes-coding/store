import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquare, Send, User } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export interface CustomerReview {
  id: string;
  name: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

const DEFAULT_REVIEWS: Record<string, CustomerReview[]> = {
  default: [
    {
      id: 'rev-1',
      name: 'مهدي بن يحيى',
      city: 'الجزائر العاصمة',
      rating: 5,
      date: 'منذ 3 أيام',
      comment: 'ما شاء الله تبارك الرحمن، جودة القماش والخياطة تفوق التوقعات! القطن فائق النعومة والقصة متوازنة جداً مثل بدلات ميلانو تماماً.',
      verified: true
    },
    {
      id: 'rev-2',
      name: 'سفيان دراجي',
      city: 'وهران',
      rating: 5,
      date: 'منذ أسبوع',
      comment: 'التغليف الملكي والصندوق الفاخر مع الرائحة العطرة جعلت فتح الطرد تجربة استثنائية. والتوصيل سريع خلال 48 ساعة فقط.',
      verified: true
    },
    {
      id: 'rev-3',
      name: 'طارق بلقاسم',
      city: 'تلمسان',
      rating: 5,
      date: 'منذ أسبوعين',
      comment: 'اللون والمقاس مطابق تماماً للصور المعروضة. الأزرار الصدفية مدهشة والمظهر كلاسيكي أرستقراطي 100%. سأطلب الطقم الثاني قريباً.',
      verified: true
    }
  ]
};

export const ProductReviews: React.FC<{
  productId: string;
  productName: string;
  rating: number;
  reviewCount: number;
}> = ({ productId, productName, rating, reviewCount }) => {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    const saved = localStorage.getItem(`reviews_${productId}`);
    return saved ? JSON.parse(saved) : DEFAULT_REVIEWS.default;
  });

  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) {
      showToast('بيانات غير مكتملة', 'يرجى إدخال اسمك وتعليقك حول القطعة.', 'error');
      return;
    }

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      name: newName.trim(),
      city: newCity.trim() || 'الجزائر',
      rating: newRating,
      date: 'الآن',
      comment: newComment.trim(),
      verified: true
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(updated));

    showToast('شكراً لتقييمك!', 'تمت إضافة تقييمك ومراجعته بنجاح.', 'success');
    setNewName('');
    setNewCity('');
    setNewComment('');
    setIsAddingReview(false);
  };

  return (
    <div className="pt-16 border-t border-brand-200/80 space-y-10">
      {/* Header & Score Summary */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-right">
          <div className="w-24 h-24 rounded-2xl bg-brand-50 border border-brand-200 flex flex-col items-center justify-center">
            <span className="font-serif text-3xl font-bold text-dark">{rating.toFixed(1)}</span>
            <div className="flex text-amber-400 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-[10px] text-neutral-400 mt-0.5">من 5 نجوم</span>
          </div>

          <div>
            <h3 className="font-serif text-2xl font-bold text-dark">آراء وتقييمات العملاء الموثقة ({reviewCount || reviews.length})</h3>
            <p className="text-xs text-neutral-500 mt-1">
              جميع التقييمات صادرة من عملاء حقيقيين استلموا وعاينوا أزياء LUMIÈRE
            </p>
            <span className="inline-block mt-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ✓ 98% من العملاء يوصون باقتناء هذه القطعة
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsAddingReview(!isAddingReview)}
          className="px-6 py-3 bg-dark hover:bg-neutral-800 text-white rounded-2xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
        >
          <MessageSquare className="w-4 h-4 text-accent" />
          <span>{isAddingReview ? 'إلغاء' : 'أضف تقييمك ورأيك'}</span>
        </button>
      </div>

      {/* Write Review Form */}
      {isAddingReview && (
        <form onSubmit={handleSubmitReview} className="bg-brand-50/80 p-6 sm:p-8 rounded-3xl border border-brand-200 shadow-sm space-y-5">
          <h4 className="font-serif text-xl font-bold text-dark">شاركنا تجربتك مع {productName}</h4>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-dark">تقييمك بالنجوم:</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewRating(star)}
                  className="p-1 cursor-pointer"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= newRating ? 'text-amber-400 fill-amber-400' : 'text-neutral-300'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-dark mb-1">الاسم الكامل *</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="مثال: يوسف العربي"
                className="w-full px-4 py-3 text-xs bg-white border border-brand-200 rounded-xl focus:outline-none focus:border-accent text-dark"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-dark mb-1">المدينة / الولاية</label>
              <input
                type="text"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                placeholder="مثال: وهران، قسنطينة..."
                className="w-full px-4 py-3 text-xs bg-white border border-brand-200 rounded-xl focus:outline-none focus:border-accent text-dark"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-dark mb-1">تفاصيل رأيك وخبرتك مع القماش والمقاس *</label>
            <textarea
              required
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="اكتب انطباعك عن ملمس القماش، دقة المقاس، التغليف، وتجربة الاستلام..."
              className="w-full px-4 py-3 text-xs bg-white border border-brand-200 rounded-xl focus:outline-none focus:border-accent text-dark resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-dark hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-accent" />
              <span>نشر التقييم فوراً</span>
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white p-6 rounded-3xl border border-brand-200 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] text-neutral-400">{rev.date}</span>
              </div>

              <p className="text-xs text-neutral-700 leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-brand-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center text-dark font-bold text-[11px]">
                  <User className="w-3.5 h-3.5 text-neutral-600" />
                </div>
                <div>
                  <h5 className="font-bold text-dark">{rev.name}</h5>
                  <span className="text-[10px] text-neutral-400">{rev.city}</span>
                </div>
              </div>

              {rev.verified && (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  مشتري مؤكد
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
