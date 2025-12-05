import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignIn from './components/SignIn';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

function AuthGate() {
  const [isAuthed, setIsAuthed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('auth.google') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const onLogin = () => setIsAuthed(true);
    window.addEventListener('google:login_success', onLogin as EventListener);
    return () => window.removeEventListener('google:login_success', onLogin as EventListener);
  }, []);

  // Listen for logout events triggered from the app header
  useEffect(() => {
    const onLogout = () => setIsAuthed(false);
    window.addEventListener('google:logout', onLogout as EventListener);
    return () => window.removeEventListener('google:logout', onLogout as EventListener);
  }, []);

  if (!isAuthed) {
    return <SignIn />;
  }

  return <App />;
}

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || ''}>
      <AuthGate />
    </GoogleOAuthProvider>
  </React.StrictMode>
);