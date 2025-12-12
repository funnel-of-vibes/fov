import React, { useEffect, useState } from 'react';
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

  // Listen for global request to open the Add App modal from the header button
  useEffect(() => {
    const open = () => setIsDeployModalOpen(true);
    window.addEventListener('open:add_app_modal', open as EventListener);
    return () => window.removeEventListener('open:add_app_modal', open as EventListener);
  }, []);

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
        {/* Support container extracted to global SupportHeader */}
        <div className="grid grid-cols-1 gap-6 items-stretch">
          {/* Info / Marketing Panel */}
          <div id="concept" className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/60 backdrop-blur shadow-md p-6 sm:p-8">
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
          
          {/* signInCard removed */}

          {/* Vibe Tools - inserted between concept and examples */}
          <div id="vibeTools" className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/60 backdrop-blur shadow-md p-6 sm:p-8">
            <div className="relative">
              <h2 className="text-xl font-bold text-slate-900">{t('vibeTools.title')}</h2>
              <p className="mt-1 text-slate-600 text-sm">Useful tools to build your vibes</p>
              <ul className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <li>
                  <a
                    href="https://aistudio.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-fuchsia-700 hover:text-fuchsia-900 font-medium"
                  >
                    <span>AI Studio</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M11 3a1 1 0 100 2h2.586L7.293 11.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://lovable.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-fuchsia-700 hover:text-fuchsia-900 font-medium"
                  >
                    <span>Lovable</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M11 3a1 1 0 100 2h2.586L7.293 11.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://lovable.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-fuchsia-700 hover:text-fuchsia-900 font-medium"
                  >
                    <span>Replit</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M11 3a1 1 0 100 2h2.586L7.293 11.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://bolt.new/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-fuchsia-700 hover:text-fuchsia-900 font-medium"
                  >
                    <span>Bolt</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M11 3a1 1 0 100 2h2.586L7.293 11.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Examples of Vibe Apps - now 3rd section */}
          <div id="examples" className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/60 backdrop-blur shadow-md p-6 sm:p-8">
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
      {/* Deploy/Add App Modal - opened via header "Submit" even on Sign In page */}
      <AddAppModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        onAdd={handleAddFromDeploy}
      />
    </div>
  );
};

export default SignIn;
