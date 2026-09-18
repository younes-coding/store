import React, { useState } from 'react';
import { Lock, Mail, Sparkles, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAdminLanguage } from '../context/AdminLanguageContext';
import { apiRequest } from '../api/client';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { t } = useAdminLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await apiRequest('/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      if (res.success && res.token) {
        login(res.token, res.admin);
      } else {
        setError(res.message || 'البريد الإلكتروني أو كلمة السر غير صحيحة');
      }
    } catch (err: any) {
      setError(err.message || 'تعذر الاتصال بالخادم الرئيسي');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-brand-200 shadow-floating relative">
        {/* Header */}
        <div className="text-center space-y-3 pt-2">
          <div className="w-14 h-14 rounded-2xl bg-dark text-accent flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent bg-brand-100 px-3 py-1 rounded-full border border-brand-200">
            <Sparkles className="w-3.5 h-3.5" /> يونس سارتوريال — بوابة التحكم الآمنة
          </span>
          <h1 className="font-serif text-3xl font-light text-dark">
            {t('loginPortalTitle')}
          </h1>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            {t('loginSubtitle')}
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
              {t('emailField')}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full pr-10 pl-4 py-3 text-xs bg-brand-50 border border-brand-200 rounded-xl focus:outline-none focus:border-accent text-dark font-medium placeholder-neutral-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
              {t('passwordField')}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pr-10 pl-4 py-3 text-xs bg-brand-50 border border-brand-200 rounded-xl focus:outline-none focus:border-accent text-dark font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-dark hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-luxury cursor-pointer"
          >
            {isSubmitting ? (
              <span>جاري التحقق والدخول...</span>
            ) : (
              <>
                <span>{t('signInButton')}</span>
                <ArrowLeft className="w-4 h-4 text-accent" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

