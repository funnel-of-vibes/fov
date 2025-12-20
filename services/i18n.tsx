import React, {createContext, useContext, useMemo, useState, useEffect} from 'react';

type Lang = 'en' | 'ro';

type Dict = Record<string, string>;

const translations: Record<Lang, Dict> = {
    en: {
        'app.title': 'Funnel of Vibes',
        'app.subtitle': 'Vibers Community',
        'header.toggler.concept': 'See Concept',
        'header.toggler.votedVibes': 'See Vibes',
        'header.submit': 'Publish from zip file',
        'header.publishGithub': 'Publish from Github',
        'tabs.vibe': 'Vibe',
        'tabs.building': 'Building',
        'tabs.scaling': 'Scaling',
        'skills.label': 'Skills:',
        'empty.stage': 'No apps in this stage yet.',
        'btn.visit': 'Visit',
        'btn.source': 'Source',
        'footer.copyright': '© 2025 Funnel Of Vibes. All rights reserved.',
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
        'section.glossary': 'Concept',
        'section.show': 'Show',
        'section.hide': 'Hide',
        'glossary.viber': '<b>Viber</b> — idealistic human manifesting some vibes directed to helping fellow humans.<br>' +
            'The viber does not need software development skills.<br>' +
            'The viber believes that crafting and using software should be basically free of charge.<br>' +
            'The viber understands that maintaining the software may however incur some costs.',
        'glossary.funnel': '<b>Funnel of vibes</b> — a platform intended for the viber community. It is about contributing to take the initial vibe all the way to being a real working application.',
        'glossary.builder': '<b>Builder</b> — Viber with software development skills. Not all vibers are builders, but they can develop the skills to become one.',
        'glossary.scaler': '<b>Scaler</b> — Viber with advanced software development skills. Not all builders are scalers, but they can develop the skills to become one.',
        'section.how': 'How it works',
        'how.1': 'Think of a useful representation of data to help humans',
        'how.2': 'Enter <b><a href="https://aistudio.google.com">AI Studio</a></b> from Google',
        'how.3': 'Enter your prompt and hit build',
        'how.4': 'Wait a few seconds for the source code to be generated',
        'how.5': 'In the upper right, click on the "download app" button and save the <b>zip file</b> on your drive',
        'how.6': 'Come back and hit <b>Submit vibe</b> below. This will deploy the app for public access.',
        'funnel.vibeChecking': 'Vibe Checking',
        'funnel.building': 'Building',
        'funnel.scaling': 'Scaling',
        'header.language': 'Language',
        'vibeTools.title': 'Vibe Tools',
        // Common
        'common.cancel': 'Cancel',
        'common.processing': 'Processing...'
        ,
        // AddAppModal
        'addModal.title': 'Submit Vibe Code',
        'addModal.appName': 'App Name',
        'addModal.appName.rule': 'Only lowercase letters and numbers are allowed.',
        'addModal.appName.placeholder': 'e.g. myawesomeapp',
        'addModal.author': 'Author',
        'addModal.author.anonymous': 'Anonymous',
        'addModal.optional': 'Optional',
        'addModal.description': 'Description',
        'addModal.sourceZip': 'Source Code (Zip)',
        'addModal.maxSize': 'Max size: 1 MB',
        'addModal.selected': 'Selected:',
        'addModal.submit': 'Submit App',
        'addModal.ready': 'Your deployment is ready.',
        'addModal.openDeployed': 'Open deployed app',
        'addModal.deploying': 'Deploying vibe to AWS ...',
        'addModal.error.noZip': 'No zip file selected',
        'addModal.error.tooLarge': 'Zip file is too large. Maximum allowed is 1 MB.',
        'addModal.error.signedUrl': 'Failed to get upload URL. Please try again later.',
        'addModal.error.uploadFailed': 'Upload failed',
        'addModal.error.siteNotReady': 'Deployed site is not reachable yet. Please try opening it again in a little while.'
    },
    ro: {
        'app.title': 'Funnel of Vibes',
        'app.subtitle': 'Vibers Community',
        'header.toggler.concept': 'Vezi concept',
        'header.toggler.votedVibes': 'Vezi Vibes',
        'header.submit': 'Publică din arhivă zip',
        'header.publishGithub': 'Publica din Github',
        'tabs.vibe': 'Vibe',
        'tabs.building': 'Construire',
        'tabs.scaling': 'Scalare',
        'skills.label': 'Aptitudini:',
        'empty.stage': 'Nu există aplicații în această etapă.',
        'btn.visit': 'Vizitează',
        'btn.source': 'Sursă',
        'footer.copyright': '© 2025 Funnel Of Vibes. Toate drepturile rezervate.',
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
        'section.glossary': 'Concept',
        'section.show': 'Arată',
        'section.hide': 'Ascunde',
        'glossary.viber': '<b>Viber</b> — persoană idealist care manifestă viburi îndreptate spre a ajuta alți oameni.<br>' +
            'Viberul nu necesită abilități de a scrie cod.<br>' +
            'Viberul crede că realizarea și folosirea soft-ului nu trebuie să îl coste nimic.<br>' +
            'Viberul înțelege însă că scalarea și mentenanța poate implica anumite costuri.',
        'glossary.funnel': '<b>Pâlnia vibe-urilor</b> — o platformă destinată comunității de vibers. Este vorba despre contribuția la drumul necesar pentru a duce vibe-ul inițial până la o aplicație funcțională.',
        'glossary.builder': '<b>Builder</b> — Viber cu abilități de dezvoltare software. Nu toți viberii sunt builderi, dar își pot dezvolta abilitățile pentru a deveni.',
        'glossary.scaler': '<b>Scaler</b> — Viber cu abilități avansate de dezvoltare software. Nu toți builderii sunt scaleri, dar își pot dezvolta abilitățile pentru a deveni.',
        'section.how': 'Cum funcționează',
        'how.1': 'Gândește-te la o reprezentare a datelor utila pentru oameni',
        'how.2': 'Intră in <b><a href="https://aistudio.google.com">AI Studio</a></b> de la Google',
        'how.3': 'Introdu promptul tău și apasă build',
        'how.4': 'Așteaptă câteva zeci de secunde să se genereze codul sursă',
        'how.5': 'În colțul din dreapta sus, dă click pe butonul "download app".',
        'how.6': 'Salvează fișierul zip pe disc și apoi încarcă-l mai jos prin <b>Propune Vibe</b>',
        'funnel.vibeChecking': 'Verificarea viburilor',
        'funnel.building': 'Construire',
        'funnel.scaling': 'Scalare',
        'header.language': 'Limbă',
        'vibeTools.title': 'Vibe Tools',
        // Common
        'common.cancel': 'Anulează',
        'common.processing': 'Se procesează...'
        ,
        // AddAppModal
        'addModal.title': 'Încarcă Vibe-ul (cod sursă)',
        'addModal.appName': 'Numele aplicației',
        'addModal.appName.rule': 'Sunt permise doar litere mici și cifre.',
        'addModal.appName.placeholder': 'ex: aplicatiamea',
        'addModal.author': 'Autor',
        'addModal.author.anonymous': 'Anonim',
        'addModal.optional': 'Opțional',
        'addModal.description': 'Descriere',
        'addModal.sourceZip': 'Cod sursă (Zip)',
        'addModal.maxSize': 'Dimensiune maximă: 1 MB',
        'addModal.selected': 'Selectat:',
        'addModal.submit': 'Trimite aplicația',
        'addModal.ready': 'Deploy-ul este gata.',
        'addModal.openDeployed': 'Deschide aplicația',
        'addModal.deploying': 'Se face deploy pe AWS ...',
        'addModal.error.noZip': 'Nu a fost selectat niciun fișier zip',
        'addModal.error.tooLarge': 'Fișierul zip este prea mare. Maxim permis este 1 MB.',
        'addModal.error.signedUrl': 'Nu s-a putut obține URL-ul de încărcare. Încearcă mai târziu.',
        'addModal.error.uploadFailed': 'Încărcarea a eșuat',
        'addModal.error.siteNotReady': 'Site-ul publicat nu este încă accesibil. Încearcă din nou peste puțin timp.'
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

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [lang, setLangState] = useState<Lang>(() => {
        try {
            const saved = localStorage.getItem('lang') as Lang | null;
            return saved || 'en';
        } catch {
            return 'en';
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('lang', lang);
        } catch {
        }
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

        const root: { type: 'root'; children: Node[] } = {type: 'root', children: []};
        const stack: ({ type: 'root'; children: Node[] } | Node)[] = [root];

        const pushChild = (node: Node) => {
            const current = stack[stack.length - 1] as any;
            (current.children as Node[]).push(node);
        };

        const pushText = (txt: string) => {
            if (!txt) return;
            pushChild({type: 'text', text: txt});
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
                const node: Node = {type: 'b', children: []};
                pushChild(node);
                stack.push(node);
            } else if (tok === '</b>') {
                const top = stack[stack.length - 1] as Node;
                if (top && (top as any).type === 'b') stack.pop();
                else pushText(tok);
            } else if (tok === '<i>') {
                const node: Node = {type: 'i', children: []};
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
                const node: Node = {type: 'a', href, children: []};
                pushChild(node);
                stack.push(node);
            } else if (tok === '</a>') {
                const top = stack[stack.length - 1] as Node;
                if (top && (top as any).type === 'a') stack.pop();
                else pushText(tok);
            } else if (/^<br\s*\/?\s*>$/.test(tok)) {
                // Line break
                pushChild({type: 'br'});
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
                    return React.createElement('strong', {key: keyCounter++}, node.children.map(toReact));
                case 'i':
                    return React.createElement('em', {key: keyCounter++}, node.children.map(toReact));
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
                    return React.createElement('br', {key: keyCounter++});
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

    const value = useMemo(() => ({lang, setLang, t, tr}), [lang, setLang, t, tr]);
    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n() {
    const ctx = useContext(I18nContext);
    if (!ctx) throw new Error('useI18n must be used within LanguageProvider');
    return ctx;
}
