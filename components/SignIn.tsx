import React, { useState } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useI18n } from '../services/i18n';

const Section: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, children, defaultOpen = false }) => {
  const { t } = useI18n();
  const [open, setOpen] = useState<boolean>(defaultOpen);
  return (
    <div className="mb-3">
      <button
        className="w-full flex items-center justify-between rounded-lg px-4 py-3 bg-white/70 hover:bg-white transition text-left shadow-sm border border-white/40 backdrop-blur"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span className="font-semibold text-slate-800">{title}</span>
        <span className="text-slate-500 text-sm">{open ? t('section.hide') : t('section.show')}</span>
      </button>
      {open && (
        <div className="mt-2 text-sm leading-relaxed text-slate-700 bg-white/60 rounded-lg px-4 py-3 border border-white/40 shadow-sm">
          {children}
        </div>
      )}
    </div>
  );
};

const SignIn: React.FC = () => {
  const { t } = useI18n();
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = (cred: CredentialResponse) => {
    try {
      // Persist a simple auth flag; in a real app you'd verify the token server-side
      localStorage.setItem('auth.google', 'true');
      if (cred.credential) {
        localStorage.setItem('auth.google.credential', cred.credential);
      }
      // Notify the app that login succeeded
      window.dispatchEvent(new Event('google:login_success'));
    } catch (e) {
      setError('Failed to process login locally.');
      console.error(e);
    }
  };

  const handleError = () => {
    setError(t('signin.error'));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-fuchsia-100 via-rose-100 to-sky-100">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 gap-6 items-stretch">
          {/* Info / Marketing Panel */}
          <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/50 backdrop-blur shadow-md p-6 sm:p-8">
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
              <div className="absolute -top-20 -left-16 h-56 w-56 rounded-full bg-fuchsia-300/30 blur-3xl"></div>
              <div className="absolute -bottom-16 -right-10 h-56 w-56 rounded-full bg-sky-300/30 blur-3xl"></div>
            </div>
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-white/60 px-3 py-1 text-xs text-slate-600 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                {t('signin.badge')}
              </div>
              <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">{t('app.title')}</h1>
              <p className="mt-2 text-slate-700 text-base sm:text-lg">
                {t('signin.marketing')}
              </p>

              <div className="mt-6">
                <Section title={t('section.glossary')}>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      {t('glossary.viber')}
                    </li>
                    <li>
                      {t('glossary.funnel')}
                    </li>
                    <li>
                      {t('glossary.genai')}
                    </li>
                    <li>
                      {t('glossary.prompt')}
                    </li>
                    <li>
                      {t('glossary.builder')}
                    </li>
                    <li>
                      {t('glossary.scaler')}
                    </li>
                  </ul>
                </Section>

                <Section title={t('section.how')}>
                  <ul className="list-decimal pl-5 space-y-2">
                    <li>
                      {t('how.1')}
                    </li>
                    <li>
                      {t('how.2')}
                    </li>
                    <li>
                      {t('how.3')}
                    </li>
                    <li>
                      {t('how.4')}
                    </li>
                    <li>
                      {t('how.5')}
                    </li>
                  </ul>
                </Section>
              </div>
            </div>
          </div>

          {/* Examples of Vibe Apps - placed above the Sign-in Card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/60 backdrop-blur shadow-md p-6 sm:p-8">
            <div className="relative">
              <h2 className="text-xl font-bold text-slate-900">{t('signin.examples.title')}</h2>
              <p className="mt-1 text-slate-600 text-sm">{t('signin.examples.subtitle')}</p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="http://vibes4humanity.agenticus.eu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-fuchsia-700 hover:text-fuchsia-900 font-medium"
                  >
                    <span>Vibes4Humanity</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M11 3a1 1 0 100 2h2.586L7.293 11.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="http://homo.agenticus.eu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-fuchsia-700 hover:text-fuchsia-900 font-medium"
                  >
                    <span>Homo Agenticus</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M11 3a1 1 0 100 2h2.586L7.293 11.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Sign-in Card */}
          <div className="flex items-center">
            <div className="w-full rounded-2xl bg-white shadow-md border border-slate-200 p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-1 text-slate-900">{t('signin.title')}</h2>
              <p className="text-slate-600 mb-6">{t('signin.subtitle')}</p>

              <div className="flex justify-center">
                <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap />
              </div>

              {error && (
                <p className="text-red-600 text-sm mt-4" role="alert">
                  {error}
                </p>
              )}

              <div className="mt-6 text-xs text-slate-500">
                <p><b>{t('signin.disclaimer')}</b> {t('signin.disclaimer_text')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-xs">
        <p>{t('footer.copyright')}</p>
      </footer>
    </div>
  );
};

export default SignIn;
