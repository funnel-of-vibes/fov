import React, { useState } from 'react';
import { CredentialResponse } from '@react-oauth/google';
import { useI18n } from '../services/i18n';
import AddAppModal from './AddAppModal';
import { AppEntry } from '../types';

const Section: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, children, defaultOpen = false }) => {
  const { t, tr } = useI18n();
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

// In-app browser detection removed since Google sign-in is disabled for now

const SignIn: React.FC = () => {
  const { t, tr } = useI18n();
  const [error, setError] = useState<string | null>(null);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState<boolean>(false);
  // Use the provided PNG asset for the anonymous button icon
  const anonIcon = new URL('./icons/anonymous.png', import.meta.url).href;
  // Google sign-in temporarily disabled; in-app browser handling not needed

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

  // Handle adding an app from the Deploy Vibe modal.
  // On the sign-in page we don't manage the main list, so just close the modal.
  const handleAddFromDeploy = (app: AppEntry) => {
    try {
      // Optionally stash for later; kept minimal to avoid side effects
      // localStorage.setItem('draft.deployVibe', JSON.stringify(app));
    } catch {}
    setIsDeployModalOpen(false);
  };

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 gap-6 items-stretch">
          {/* Info / Marketing Panel */}
          <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/60 backdrop-blur shadow-md p-6 sm:p-8">
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
                {tr('signin.marketing')}
              </p>

              <div className="mt-6">
                <Section title={t('section.glossary')}>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      {tr('glossary.viber')}
                    </li>
                    <li>
                      {tr('glossary.funnel')}
                    </li>
                    <li>
                      {tr('glossary.genai')}
                    </li>
                    <li>
                      {tr('glossary.prompt')}
                    </li>
                    <li>
                      {tr('glossary.builder')}
                    </li>
                    <li>
                      {tr('glossary.scaler')}
                    </li>
                  </ul>
                </Section>

                <Section title={t('section.how')} defaultOpen>
                  <ul className="list-decimal pl-5 space-y-2">
                    <li>
                      {tr('how.1')}
                    </li>
                    <li>
                      {tr('how.2')}
                    </li>
                    <li>
                      {tr('how.3')}
                    </li>
                    <li>
                      {tr('how.4')}
                    </li>
                    <li>
                      {tr('how.5')}
                    </li>
                    <li>
                      {tr('how.6')}
                    </li>
                  </ul>
                </Section>
              </div>
            </div>
          </div>

          {/* Sign-in Card (Enter the funnel) - now 2nd section */}
          <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/60 backdrop-blur shadow-md p-6 sm:p-8">
            <div className="relative">
              <h2 className="text-2xl font-bold mb-1 text-slate-900">{t('signin.title')}</h2>
              <p className="text-slate-600 mb-6">{t('signin.subtitle')}</p>

              <div className="flex justify-center items-center gap-3 flex-wrap">
                {/* Deploy Vibe - to the left of Vibe anonymously */}
                <button
                  type="button"
                  onClick={() => setIsDeployModalOpen(true)}
                  className={[
                    'relative px-4 py-2 font-medium rounded-md transition-all duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-offset-2',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'text-white bg-gradient-to-r from-fuchsia-500 to-sky-500 shadow-md hover:shadow-lg focus:ring-fuchsia-400',
                    'text-sm'
                  ].join(' ')}
                  style={{ fontFamily: 'Roboto, Arial, sans-serif' }}
                >
                  Submit Vibe
                </button>

                {/* Vibe anonymously */}
                <button
                  type="button"
                  onClick={() => {
                    try {
                      // Mark session as anonymously authenticated
                      localStorage.setItem('auth.anonymous', 'true');
                    } catch {}
                    // Reuse the same app-wide event to enter the app without Google
                    window.dispatchEvent(new Event('google:login_success'));
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                  style={{ fontFamily: 'Roboto, Arial, sans-serif' }}
                >
                  <img src={anonIcon} alt="" className="w-5 h-5" aria-hidden />
                  {t('signin.anon')}
                </button>

                {/* Disabled Google sign-in (component disabled and moved after anon) */}
                <button
                  type="button"
                  aria-disabled="true"
                  disabled
                  title="Disabled for now"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white/70 px-4 py-2 text-sm font-medium text-slate-400 shadow-sm cursor-not-allowed"
                  style={{ fontFamily: 'Roboto, Arial, sans-serif' }}
                >
                  {/* Using a simple G icon placeholder */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5" aria-hidden>
                    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 32.6 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/>
                    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 14.9 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16 4 9.1 8.3 6.3 14.7z"/>
                    <path fill="#4CAF50" d="M24 44c5.3 0 10.1-2 13.6-5.3l-6.3-5.2C29.3 35.8 26.8 37 24 37c-5.3 0-9.8-3.4-11.4-8.1l-6.5 5C9 39.7 15.9 44 24 44z"/>
                    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.4 5.7-6.7 7.2l6.3 5.2C37.8 38.3 40 33.6 40 28c0-1.2-.1-2.3-.4-3.5z"/>
                  </svg>
                  Sign in with Google
                </button>
              </div>

              {/* Deploy Vibe Modal */}
              <AddAppModal
                isOpen={isDeployModalOpen}
                onClose={() => setIsDeployModalOpen(false)}
                onAdd={handleAddFromDeploy}
              />

              {error && (
                <p className="text-red-600 text-sm mt-4" role="alert">
                  {error}
                </p>
              )}

            </div>
          </div>

          {/* Examples of Vibe Apps - now 3rd section */}
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
