import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

type Lang = 'en' | 'ro';

type Dict = Record<string, string>;

const translations: Record<Lang, Dict> = {
  en: {
    'app.title': 'Funnel of Vibes',
    'app.subtitle': 'Vibers Community',
    'header.signout': 'Sign out',
    'header.submit': 'Submit Vibe',
    'tabs.vibe': 'Vibe',
    'tabs.building': 'Building',
    'tabs.scaling': 'Scaling',
    'skills.label': 'Skills:',
    'empty.stage': 'No apps in this stage yet.',
    'btn.visit': 'Visit',
    'btn.source': 'Source',
    'footer.copyright': '© 2025 FunnelOfVibes. All rights reserved.',
    'signin.title': 'Enter the funnel',
    'signin.subtitle': 'Continue to Funnel of Vibes to provide your vibe',
    'signin.error': 'Google Sign-In failed. Please try again.',
    'signin.disclaimer': 'Disclaimer:',
    'signin.disclaimer_text': 'Application intended as a proof of concept.',
    'signin.badge': 'Open community experiment',
    'signin.marketing': 'Goal is to convert vibed code into real software products. How far we can go <b>without paying a cent</b>?',
    'signin.anon': 'Vote other vibes',
    'signin.openInBrowser': 'Open in browser for Google sign-in',
    'signin.examples.title': 'Examples of vibed apps',
    'signin.examples.subtitle': 'Explore a couple of live examples created by vibers:',
    'section.glossary': 'Glossary of terms',
    'section.show': 'Show',
    'section.hide': 'Hide',
    'glossary.viber': '<b>Viber</b> — idealistic human manifesting some vibes directed to helping fellow humans.<br>' +
        'The viber does not need software development skills.<br>' +
        'The viber believes that crafting and using software should be basically free of charge.<br>' +
        'The viber understands that maintaining the software may however incur some costs.',
    'glossary.funnel': '<b>Funnel of vibes</b> — a platform intended for the viber community. It is about contributing to take the initial vibe all the way to being a real working application.',
    'glossary.genai': '<b>GenAI coding assistant</b> — generative AI model capable of generating code based on viber prompts.',
    'glossary.prompt': '<b>Prompt</b> — the request made by the viber to a GenAI model to produce or change source code.',
    'glossary.builder': '<b>Builder</b> — Viber with software development skills. Not all vibers are builders, but they can develop the skills to become one.',
    'glossary.scaler': '<b>Scaler</b> — Viber with advanced software development skills. Not all builders are scalers, but they can develop the skills to become one.',
    'section.how': 'How it works',
    'how.1': 'Think of a useful representation of data to help humans',
    'how.2': 'Enter <a href="https://aistudio.google.com">AI Studio</a> from Google',
    'how.3': 'Enter your prompt and hit build',
    'how.4': 'Wait a few seconds for the source code to be generated',
    'how.5': 'In the upper right, click on the "download app" button',
    'how.6': 'Save the zip file to disk and hit <b>Submit vibe</b> below. This will deploy the app for public access.',
    'funnel.vibeChecking': 'Vibe Checking',
    'funnel.building': 'Building',
    'funnel.scaling': 'Scaling',
    'header.language': 'Language',
  },
  ro: {
    'app.title': 'Funnel of Vibes',
    'app.subtitle': 'Vibers Community',
    'header.signout': 'Sign out',
    'header.submit': 'Propune Vibe',
    'tabs.vibe': 'Vibe',
    'tabs.building': 'Construire',
    'tabs.scaling': 'Scalare',
    'skills.label': 'Aptitudini:',
    'empty.stage': 'Nu există aplicații în această etapă.',
    'btn.visit': 'Vizitează',
    'btn.source': 'Sursă',
    'footer.copyright': '© 2025 FunnelOfVibes. Toate drepturile rezervate.',
    'signin.title': 'Autentificare',
    'signin.subtitle': 'Continuă către Funnel of Vibes pentru a-ți oferi vibe-ul',
    'signin.error': 'Autentificarea Google a eșuat. Te rugăm să încerci din nou.',
    'signin.disclaimer': 'Declinarea răspunderii:',
    'signin.disclaimer_text': 'Aplicație destinată ca dovadă de concept.',
    'signin.badge': 'Experiment comunitar deschis',
    'signin.marketing': 'Scopul este de a transforma codul generat din vibes în software util. Cât de departe putem ajunge <b>pe gratis</b>? ',
    'signin.anon': 'Descopera vibe-urile altora',
    'signin.openInBrowser': 'Deschide în browser pentru autentificarea Google',
    'signin.examples.title': 'Exemple de aplicații vibate',
    'signin.examples.subtitle': 'Explorează câteva exemple live create de vibers:',
    'section.glossary': 'Glosar de termeni',
    'section.show': 'Arată',
    'section.hide': 'Ascunde',
    'glossary.viber': '<b>Viber</b> — persoană idealist care manifestă viburi îndreptate spre a ajuta alți oameni.<br>' +
        'Viberul nu necesită abilități de a scrie cod.<br>' +
        'Viberul crede că realizarea și folosirea soft-ului nu trebuie să îl coste nimic.<br>' +
        'Viberul înțelege însă că scalarea și mentenanța poate implica anumite costuri.',
    'glossary.funnel': '<b>Pâlnia vibe-urilor</b> — o platformă destinată comunității de vibers. Este vorba despre contribuția la drumul necesar pentru a duce vibe-ul inițial până la o aplicație funcțională.',
    'glossary.genai': '<b>Asistent de codare GenAI</b> — model de AI generativ capabil să genereze cod pe baza prompturilor viberilor.',
    'glossary.prompt': '<b>Prompt</b> — cererea făcută de viber unui model GenAI pentru a produce sau modifica cod sursă.',
    'glossary.builder': '<b>Builder</b> — Viber cu abilități de dezvoltare software. Nu toți viberii sunt builderi, dar își pot dezvolta abilitățile pentru a deveni.',
    'glossary.scaler': '<b>Scaler</b> — Viber cu abilități avansate de dezvoltare software. Nu toți builderii sunt scaleri, dar își pot dezvolta abilitățile pentru a deveni.',
    'section.how': 'Cum funcționează',
    'how.1': 'Gândește-te la o reprezentare a datelor utila pentru oameni',
    'how.2': 'Intră in <a href="https://aistudio.google.com">AI Studio</a> de la Google',
    'how.3': 'Introdu promptul tău și apasă build',
    'how.4': 'Așteaptă câteva secunde să se genereze codul sursă',
    'how.5': 'În colțul din dreapta sus, dă click pe butonul "download app".',
    'how.6': 'Salvează fișierul zip pe disc și apoi încarcă-l mai jos',
    'funnel.vibeChecking': 'Verificarea viburilor',
    'funnel.building': 'Construire',
    'funnel.scaling': 'Scalare',
    'header.language': 'Limbă',
  },
};

type I18nContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  // Rich translation that supports a tiny subset of inline markup: <b> and <i>
  tr: (key: string) => React.ReactNode;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('lang') as Lang | null;
      return saved || 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try { localStorage.setItem('lang', lang); } catch {}
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);

  // Very small and safe renderer that allows <b>, <i>, <a href>, and <br>.
  // - Only whitelisted tags are rendered; others become text.
  // - Only http, https, and mailto schemes are allowed for href.
  // - target and rel are enforced for safety; other attributes are ignored.
  function renderRich(input: string): React.ReactNode {
    // Tokenize by tags <b>, </b>, <i>, </i>, <a href="…">, </a>, and <br>
    const tagRegex = /(<\/?b>|<\/?i>|<a\s+href=\"[^\"]*\">|<\/a>|<br\s*\/?\s*>)/g;
    const tokens = input.split(tagRegex).filter(Boolean);

    type Node =
      | { type: 'text'; text: string }
      | { type: 'b'; children: Node[] }
      | { type: 'i'; children: Node[] }
      | { type: 'a'; href: string; children: Node[] }
      | { type: 'br' };

    const root: { type: 'root'; children: Node[] } = { type: 'root', children: [] };
    const stack: ({ type: 'root'; children: Node[] } | Node)[] = [root];

    const pushChild = (node: Node) => {
      const current = stack[stack.length - 1] as any;
      (current.children as Node[]).push(node);
    };

    const pushText = (txt: string) => {
      if (!txt) return;
      pushChild({ type: 'text', text: txt });
    };

    const isSafeHref = (href: string) => {
      try {
        const base = 'https://example.com';
        const u = new URL(href, base);
        const scheme = u.protocol.replace(':', '');
        return scheme === 'http' || scheme === 'https' || href.startsWith('mailto:');
      } catch {
        return false;
      }
    };

    for (const tok of tokens) {
      if (tok === '<b>') {
        const node: Node = { type: 'b', children: [] };
        pushChild(node);
        stack.push(node);
      } else if (tok === '</b>') {
        const top = stack[stack.length - 1] as Node;
        if (top && (top as any).type === 'b') stack.pop();
        else pushText(tok);
      } else if (tok === '<i>') {
        const node: Node = { type: 'i', children: [] };
        pushChild(node);
        stack.push(node);
      } else if (tok === '</i>') {
        const top = stack[stack.length - 1] as Node;
        if (top && (top as any).type === 'i') stack.pop();
        else pushText(tok);
      } else if (tok.startsWith('<a ')) {
        const m = tok.match(/<a\s+href=\"([^\"]*)\">/);
        const href = m?.[1] ?? '';
        if (!href || !isSafeHref(href)) {
          // Treat as text if href missing/unsafe
          pushText(tok);
          continue;
        }
        const node: Node = { type: 'a', href, children: [] };
        pushChild(node);
        stack.push(node);
      } else if (tok === '</a>') {
        const top = stack[stack.length - 1] as Node;
        if (top && (top as any).type === 'a') stack.pop();
        else pushText(tok);
      } else if (/^<br\s*\/?\s*>$/.test(tok)) {
        // Line break
        pushChild({ type: 'br' });
      } else {
        // Plain text
        pushText(tok);
      }
    }

    // Close any unclosed tags implicitly
    while (stack.length > 1) stack.pop();

    // Convert to React nodes
    let keyCounter = 0;
    const toReact = (node: Node): React.ReactNode => {
      switch (node.type) {
        case 'text':
          return node.text;
        case 'b':
          return React.createElement('strong', { key: keyCounter++ }, node.children.map(toReact));
        case 'i':
          return React.createElement('em', { key: keyCounter++ }, node.children.map(toReact));
        case 'a':
          return React.createElement(
            'a',
            {
              key: keyCounter++,
              href: node.href,
              target: '_blank',
              rel: 'noopener noreferrer',
            },
            node.children.map(toReact)
          );
        case 'br':
          return React.createElement('br', { key: keyCounter++ });
      }
    };

    return React.createElement(
      React.Fragment,
      null,
      ...root.children.map((c) => toReact(c))
    );
  }

  const t = useMemo(() => {
    return (key: string) => {
      const dict = translations[lang] as Dict;
      const enDict = translations.en as Dict;
      return (dict[key] ?? enDict[key] ?? key) as string;
    };
  }, [lang]);

  const tr = useMemo(() => {
    return (key: string) => renderRich(t(key));
  }, [t]);

  const value = useMemo(() => ({ lang, setLang, t, tr }), [lang, setLang, t, tr]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider');
  return ctx;
}
