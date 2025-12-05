import React, { useState } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

const Section: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState<boolean>(defaultOpen);
  return (
    <div className="mb-3">
      <button
        className="w-full flex items-center justify-between rounded-lg px-4 py-3 bg-white/70 hover:bg-white transition text-left shadow-sm border border-white/40 backdrop-blur"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span className="font-semibold text-slate-800">{title}</span>
        <span className="text-slate-500 text-sm">{open ? 'Hide' : 'Show'}</span>
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
    setError('Google Sign-In failed. Please try again.');
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-slate-100 font-sans selection:bg-pink-500/30">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 gap-6 items-stretch">
          {/* Info / Marketing Panel */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur shadow-md p-6 sm:p-8">
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
              <div className="absolute -top-20 -left-16 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl"></div>
              <div className="absolute -bottom-16 -right-10 h-56 w-56 rounded-full bg-pink-500/10 blur-3xl"></div>
            </div>
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/60 border border-slate-700/60 px-3 py-1 text-xs text-slate-300 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Open community experiment
              </div>
              <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Funnel of Vibes</h1>
              <p className="mt-2 text-slate-300 text-base sm:text-lg">
                A place used to turn simple vibes into real software which improves the lives of humans.
              </p>

              <div className="mt-6">
                <Section title="Glossary of terms">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <b>Viber</b> — idealistic human of the sapiens species manifesting some vibes directed to helping fellow humans. The viber does not need to manifest any software development skills. The viber believes that crafting and using software should be basically free of charge. The viber understands that maintaining the software may however incur some costs.
                    </li>
                    <li>
                      <b>Funnel of vibes</b> — a platform intended for the viber community. It is about contributing to the journey needed to take the initial vibe all the way to being a real working application.
                    </li>
                    <li>
                      <b>GenAI coding assistant</b> — generative AI model capable of generating code based on viber prompts.
                    </li>
                    <li>
                      <b>Prompt</b> — the request made by the viber to a GenAI model to produce or change source code.
                    </li>
                    <li>
                      <b>Builder</b> — Viber with software development skills. Not all vibers are builders, but they can develop the skills to become one.
                    </li>
                    <li>
                      <b>Scaler</b> — Viber with advanced software development skills. Not all builders are scalers, but they can develop the skills to become one.
                    </li>
                  </ul>
                </Section>

                <Section title="How it works">
                  <ul className="list-decimal pl-5 space-y-2">
                    <li>
                      A vibe pops up in the brain of the viber. Using the AI code generation tool of choice, the viber prompts the GenAI model to generate a prototype of the application.
                    </li>
                    <li>
                      The Viber submits the source code to be made available as a web application for the other vibers to assess.
                    </li>
                    <li>
                      If in a week's time, based on the feedback received from the viber community, the vibe receives enough likes, it is chosen to be taken to the next step, which is the build step.
                    </li>
                    <li>
                      The builders or just vibers who aspire to be builders, contribute further to bring the initial vibe to life.
                    </li>
                    <li>
                      Once the vibed app reaches an arbitrary number of users, say 1000, the scalers are invited to contribute.
                    </li>
                  </ul>
                </Section>
              </div>
            </div>
          </div>

          {/* Examples of Vibe Apps - placed above the Sign-in Card */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur shadow-md p-6 sm:p-8">
            <div className="relative">
              <h2 className="text-xl font-bold text-white">Examples of vibed apps</h2>
              <p className="mt-1 text-slate-400 text-sm">Explore a couple of live examples created by vibers:</p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="http://vibes4humanity.agenticus.eu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-pink-300 hover:text-pink-200 font-medium"
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
                    className="inline-flex items-center gap-2 text-pink-300 hover:text-pink-200 font-medium"
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
            <div className="w-full rounded-2xl bg-slate-800/60 shadow-md border border-slate-700/50 p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-1 text-white">Sign in</h2>
              <p className="text-slate-300 mb-6">Continue to Funnel of Vibes to provide your vibe</p>

              <div className="flex justify-center">
                <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap />
              </div>

              {error && (
                <p className="text-red-400 text-sm mt-4" role="alert">
                  {error}
                </p>
              )}

              <div className="mt-6 text-xs text-slate-500">
                <p><b>Disclaimer:</b> Application intended as a proof of concept.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="py-6 text-center text-slate-600 text-xs">
        <p>© 2025 FunnelOfVibes. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SignIn;
