import React, { useEffect, useState } from 'react';
import { googleLogout } from '@react-oauth/google';
import { useI18n } from '../services/i18n';

const SupportHeader: React.FC = () => {
  const { t, lang, setLang } = useI18n();
  const [isAuthed, setIsAuthed] = useState<boolean>(() => {
    try {
      return (
        localStorage.getItem('auth.google') === 'true' ||
        localStorage.getItem('auth.anonymous') === 'true'
      );
    } catch {
      return false;
    }
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (saved === 'dark') return 'dark';
    } catch {}
    return 'light';
  });

  useEffect(() => {
    try { localStorage.setItem('theme', theme); } catch {}
    const root = document.documentElement;
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  }, [theme]);

  // Track auth state to decide whether to show action buttons in header
  useEffect(() => {
    const onLogin = () => setIsAuthed(true);
    const onLogout = () => setIsAuthed(false);
    window.addEventListener('google:login_success', onLogin as EventListener);
    window.addEventListener('google:logout', onLogout as EventListener);
    return () => {
      window.removeEventListener('google:login_success', onLogin as EventListener);
      window.removeEventListener('google:logout', onLogout as EventListener);
    };
  }, []);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const handleHeaderSignOut = () => {
    try { googleLogout(); } catch {}
    try {
      localStorage.removeItem('auth.google');
      localStorage.removeItem('auth.google.credential');
      localStorage.removeItem('auth.anonymous');
    } catch {}
    try { window.dispatchEvent(new Event('google:logout')); } catch {}
  };

  const goToConcept = () => {
    // Force SignIn screen
    handleHeaderSignOut();
  };

  const goToVibesRanking = () => {
    // Force App screen (anonymous auth is enough)
    try { localStorage.setItem('auth.anonymous', 'true'); } catch {}
    try { window.dispatchEvent(new Event('google:login_success')); } catch {}
  };

  const handleHeaderSubmit = () => {
    try { window.dispatchEvent(new Event('open:add_app_modal')); } catch {}
  };

  return (
    <div className="w-full">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-end">
          <div id="support_container" className="flex items-center gap-2">
            {/* Concept button - always visible, sends user to SignIn screen */}
            <button
              id="btnConcept"
              onClick={goToConcept}
              aria-pressed={!isAuthed}
              className={[
                'relative px-3 py-2 font-medium rounded-full transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                'text-sm',
                // Default visual
                'bg-white/80 border shadow-sm hover:bg-white hover:shadow',
                // Selected vs not selected styles
                !isAuthed
                  ? 'text-sky-700 border-sky-300 ring-sky-300 bg-sky-50'
                  : 'text-slate-600 border-slate-200'
              ].join(' ')}
              title={t('header.signout')}
            >
              {t('header.signout')}
            </button>
            {/* Vibes Ranking button - always visible, sends user to App screen */}
            <button
              id="btnVibesRanking"
              onClick={goToVibesRanking}
              aria-pressed={isAuthed}
              className={[
                'relative px-3 py-2 font-medium rounded-full transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                'text-sm',
                'bg-white/80 border shadow-sm hover:bg-white hover:shadow',
                isAuthed
                  ? 'text-sky-700 border-sky-300 ring-sky-300 bg-sky-50'
                  : 'text-slate-600 border-slate-200'
              ].join(' ')}
              title={t('header.votedVibes')}
            >
              {t('header.votedVibes')}
            </button>
            <button
              id="submitVibe"
              onClick={handleHeaderSubmit}
              className={
                [
                  'relative px-4 py-2 font-medium rounded-full transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-offset-2',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'text-white bg-gradient-to-r from-fuchsia-500 to-sky-500 shadow-md hover:shadow-lg focus:ring-fuchsia-400',
                  'text-sm'
                ].join(' ')
              }
            >
              {t('header.submit')}
            </button>
            {/* Language selector - single toggle button */}
            <div className="flex items-center gap-1 mr-2">
              <label className="sr-only">{t('header.language')}</label>
              {/* Globe icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe w-4 h-4" aria-hidden="true">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                <path d="M2 12h20"></path>
              </svg>
              <button
                className={[
                  'relative px-3 py-2 font-medium rounded-full transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-offset-2',
                  'text-slate-600 bg-white/80 border border-slate-200 hover:bg-white shadow-sm hover:shadow',
                  'text-sm'
                ].join(' ')}
                onClick={() => setLang(lang === 'en' ? 'ro' : 'en')}
                title={t('header.language')}
              >
                {lang.toUpperCase()}
              </button>
            </div>
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={[
                'theme-toggle',
                'relative px-3 py-2 font-medium rounded-full transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                'text-slate-600 bg-white/80 border border-slate-200 hover:bg-white shadow-sm hover:shadow',
                'text-sm'
              ].join(' ')}
              title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <span className="inline-flex items-center gap-1">
                  {/* Moon icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                  Dark
                </span>
              ) : (
                <span className="inline-flex items-center gap-1">
                  {/* Sun icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zm9-10v2h3v-2h-3zm-1.95 7.95l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM13 1h-2v3h2V1zm4.24 3.05l1.79-1.8-1.41-1.41-1.8 1.79 1.42 1.42zM4.22 18.36l-1.8 1.79 1.41 1.41 1.79-1.8-1.4-1.4z"/>
                    <circle cx="12" cy="12" r="5" />
                  </svg>
                  Light
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportHeader;
