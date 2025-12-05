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
    'signin.title': 'Sign in',
    'signin.subtitle': 'Continue to Funnel of Vibes to provide your vibe',
    'signin.error': 'Google Sign-In failed. Please try again.',
    'signin.disclaimer': 'Disclaimer:',
    'signin.disclaimer_text': 'Application intended as a proof of concept.',
    'signin.badge': 'Open community experiment',
    'signin.marketing': 'A place used to turn simple vibes into real software which improves the lives of humans.',
    'signin.examples.title': 'Examples of vibed apps',
    'signin.examples.subtitle': 'Explore a couple of live examples created by vibers:',
    'section.glossary': 'Glossary of terms',
    'section.show': 'Show',
    'section.hide': 'Hide',
    'glossary.viber': 'Viber — idealistic human of the sapiens species manifesting some vibes directed to helping fellow humans. The viber does not need to manifest any software development skills. The viber believes that crafting and using software should be basically free of charge. The viber understands that maintaining the software may however incur some costs.',
    'glossary.funnel': 'Funnel of vibes — a platform intended for the viber community. It is about contributing to the journey needed to take the initial vibe all the way to being a real working application.',
    'glossary.genai': 'GenAI coding assistant — generative AI model capable of generating code based on viber prompts.',
    'glossary.prompt': 'Prompt — the request made by the viber to a GenAI model to produce or change source code.',
    'glossary.builder': 'Builder — Viber with software development skills. Not all vibers are builders, but they can develop the skills to become one.',
    'glossary.scaler': 'Scaler — Viber with advanced software development skills. Not all builders are scalers, but they can develop the skills to become one.',
    'section.how': 'How it works',
    'how.1': "A vibe pops up in the brain of the viber. Using the AI code generation tool of choice, the viber prompts the GenAI model to generate a prototype of the application.",
    'how.2': 'The Viber submits the source code to be made available as a web application for the other vibers to assess.',
    'how.3': "If in a week's time, based on the feedback received from the viber community, the vibe receives enough likes, it is chosen to be taken to the next step, which is the build step.",
    'how.4': 'The builders or just vibers who aspire to be builders, contribute further to bring the initial vibe to life.',
    'how.5': 'Once the vibed app reaches an arbitrary number of users, say 1000, the scalers are invited to contribute.',
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
    'signin.marketing': 'Un loc folosit pentru a transforma viburile simple în software real care îmbunătățește viața oamenilor.',
    'signin.examples.title': 'Exemple de aplicații vibate',
    'signin.examples.subtitle': 'Explorează câteva exemple live create de vibers:',
    'section.glossary': 'Glosar de termeni',
    'section.show': 'Arată',
    'section.hide': 'Ascunde',
    'glossary.viber': 'Viber — om idealist din specia sapiens care manifestă viburi îndreptate spre a ajuta alți oameni. Viberul nu trebuie să aibă abilități de dezvoltare software. Viberul crede că realizarea și folosirea software-ului ar trebui să fie practic gratuite. Viberul înțelege însă că mentenanța poate implica unele costuri.',
    'glossary.funnel': 'Funnelul vibelor — o platformă destinată comunității de vibers. Este vorba despre contribuția la drumul necesar pentru a duce vibe-ul inițial până la o aplicație funcțională.',
    'glossary.genai': 'Asistent de codare GenAI — model de AI generativ capabil să genereze cod pe baza prompturilor viberilor.',
    'glossary.prompt': 'Prompt — cererea făcută de viber unui model GenAI pentru a produce sau modifica cod sursă.',
    'glossary.builder': 'Builder — Viber cu abilități de dezvoltare software. Nu toți viberii sunt builderi, dar își pot dezvolta abilitățile pentru a deveni.',
    'glossary.scaler': 'Scaler — Viber cu abilități avansate de dezvoltare software. Nu toți builderii sunt scaleri, dar își pot dezvolta abilitățile pentru a deveni.',
    'section.how': 'Cum funcționează',
    'how.1': 'Un vibe apare în mintea viberului. Folosind instrumentul preferat de generare de cod cu AI, viberul face un prompt către modelul GenAI pentru a genera un prototip al aplicației.',
    'how.2': 'Viberul trimite codul sursă pentru a fi disponibil ca aplicație web pentru evaluarea altor vibers.',
    'how.3': 'Dacă într-o săptămână, pe baza feedbackului primit din partea comunității, vibe-ul primește suficiente aprecieri, este ales să treacă la următorul pas, faza de construire.',
    'how.4': 'Builderii sau viberii care aspiră să devină builderi contribuie în continuare pentru a aduce la viață vibe-ul inițial.',
    'how.5': 'După ce aplicația vibată ajunge la un număr arbitrar de utilizatori, să zicem 1000, scalerii sunt invitați să contribuie.',
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

  const t = useMemo(() => {
    return (key: string) => {
      const dict = translations[lang] as Dict;
      const enDict = translations.en as Dict;
      return (dict[key] ?? enDict[key] ?? key) as string;
    };
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider');
  return ctx;
}
