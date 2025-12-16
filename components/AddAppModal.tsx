import React, {useState} from 'react';
import {createPortal} from 'react-dom';
import {AppEntry} from '../types';
import {processVibeCheck} from '../services/vibeCheckService';
import { useI18n } from '../services/i18n';

interface AddAppModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (app: AppEntry) => void;
}

const AddAppModal: React.FC<AddAppModalProps> = ({isOpen, onClose, onAdd}) => {
    const { t } = useI18n();
    const MAX_ZIP_BYTES = 1024 * 1024; // 1 MB
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [zipFile, setZipFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [waitingMessage, setWaitingMessage] = useState<string | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [elapsedSec, setElapsedSec] = useState(0);
    const [availableUrl, setAvailableUrl] = useState<string | null>(null);

    if (!isOpen) return null;

    const waitFor200 = async (
        url: string,
        opts: { timeoutMs?: number; intervalMs?: number } = {}
    ): Promise<boolean> => {
        const timeoutMs = opts.timeoutMs ?? 180_000; // 3 minutes
        const intervalMs = opts.intervalMs ?? 3000; // 3 seconds
        const start = Date.now();
        while (Date.now() - start < timeoutMs) {
            try {
                // First try a proper CORS-visible HEAD
                const res = await fetch(url, {method: 'HEAD', cache: 'no-store'});
                if (res.status === 200) return true;
            } catch (_) {
                // If CORS blocks status visibility, attempt a no-cors GET.
                try {
                    await fetch(url, {method: 'GET', cache: 'no-store', mode: 'no-cors'});
                    // If fetch resolves in no-cors mode, consider it available.
                    return true;
                } catch (_) {
                    // ignore and retry
                }
            }
            await new Promise(r => setTimeout(r, intervalMs));
        }
        return false;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsAnalyzing(true);
        setUploadError(null);
        setWaitingMessage(null);
        setAvailableUrl(null);

        try {
            // AI Vibe Check
            const vibeResult = await processVibeCheck(name, description);

            const newApp: AppEntry = {
                id: crypto.randomUUID(),
                name,
                // No app link is collected at submission; set to a safe placeholder
                link: '#',
                author: author || t('addModal.author.anonymous'),
                likes: Math.floor(Math.random() * 50) + 1,
                vibeScore: vibeResult.vibeScore,
                description: vibeResult.shortDescription,
                timestamp: Date.now(),
                stage: 'vibe' // Default stage for new apps
            };

            if (!zipFile) throw new Error(t('addModal.error.noZip'));
            if (zipFile.size > MAX_ZIP_BYTES) {
                throw new Error(t('addModal.error.tooLarge'));
            }

            // 1) Get the presigned URL and key from your endpoint
            const endpointBase = 'https://hqyvtkj6j6.execute-api.eu-north-1.amazonaws.com/Stage/signed-s3-url-for-vibe-upload';
            const vibedApp = encodeURIComponent(name || 'unnamed');
            const apiUrl = `${endpointBase}?vibed_app=${vibedApp}`;

            const resp = await fetch(apiUrl);
            if (!resp.ok) {
                console.error('Failed to get signed URL', resp.status);
                throw new Error(t('addModal.error.signedUrl'));
            }
            const {url, key}: { url: string; key: string } = await resp.json();

            console.log(`Uploading to S3 key: ${key}`);

            // 2) Upload the local ZIP file using the presigned URL
            const putRes = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/zip'
                },
                body: zipFile
            });
            if (!putRes.ok) {
                // Attempt to read any error text for debugging
                const errText = await putRes.text().catch(() => '');
                console.error('Upload failed', putRes.status, errText);
                throw new Error(t('addModal.error.uploadFailed'));
            }
            console.log('Upload complete');

            // 3) After successful upload, poll the S3 website endpoint until it returns 200
            const s3DeployedVibeUrl = `http://${vibedApp}.agenticus.eu.s3-website.eu-north-1.amazonaws.com/`;
            const waitingUrl = `https://hqyvtkj6j6.execute-api.eu-north-1.amazonaws.com/Stage/wait-for-site-ready?vibed_app=${vibedApp}`;
            setWaitingMessage(t('addModal.deploying'));
            setElapsedSec(0);
            let ticker: ReturnType<typeof setInterval> | null = null;
            try {
                ticker = setInterval(() => setElapsedSec((s) => s + 1), 1000);
                const ok = await waitFor200(waitingUrl);
                if (ok) {
                    // Make the URL available to the user as a clickable link instead of auto-opening
                    setAvailableUrl(s3DeployedVibeUrl);
                    setWaitingMessage(null);
                } else {
                    setUploadError(t('addModal.error.siteNotReady'));
                }
            } finally {
                if (ticker) clearInterval(ticker);
            }
        } catch (err) {
            console.error("Failed to add app", err);
            setUploadError(err instanceof Error ? err.message : t('addModal.error.uploadFailed'));
        } finally {
            setIsAnalyzing(false);
            setWaitingMessage(null);
            setElapsedSec(0);
        }
    };

    const handleClose = () => {
        setName('');
        setAuthor('');
        setDescription('');
        setZipFile(null);
        // Clear any status from a previous submit so the below-form section disappears
        setAvailableUrl(null);
        setWaitingMessage(null);
        setUploadError(null);
        setElapsedSec(0);
        setIsAnalyzing(false);
        onClose();
    };

    // Render the modal in a portal so the overlay covers the entire viewport
    return createPortal(
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
            <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-2xl">
                <h2 className="mb-6 text-xl font-bold text-gray-900">
                    {t('addModal.title')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4" aria-busy={isAnalyzing}>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">{t('addModal.appName')}</label>
                        <input
                            required
                            type="text"
                            value={name}
                            onChange={(e) => {
                                // Enforce lowercase and allow only lowercase alphanumeric characters (no spaces or symbols)
                                const sanitized = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '');
                                setName(sanitized);
                            }}
                            pattern="^[a-z0-9]+$"
                            title={t('addModal.appName.rule')}
                            className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            placeholder={t('addModal.appName.placeholder')}
                            disabled={isAnalyzing}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">{t('addModal.author')}</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            disabled={isAnalyzing}
                            className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            placeholder={t('addModal.optional')}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">{t('addModal.description')}</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isAnalyzing}
                            className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            rows={3}
                            placeholder={t('addModal.optional')}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">{t('addModal.sourceZip')}</label>
                        <input
                            type="file"
                            accept=".zip"
                            required
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const file = e.target.files ? e.target.files[0] : null;
                                if (file && file.size > MAX_ZIP_BYTES) {
                                    // Too large — show error and reset selection
                                    setUploadError(t('addModal.error.tooLarge'));
                                    setZipFile(null);
                                    // Reset the input value so user can re-select
                                    e.target.value = '';
                                    return;
                                }
                                setUploadError(null);
                                setZipFile(file);
                            }}
                            disabled={isAnalyzing}
                            className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
              "
                        />
                        <p className="mt-1 text-xs text-gray-500">{t('addModal.maxSize')}</p>
                        {zipFile && <p className="mt-1 text-xs text-green-600">{t('addModal.selected')} {zipFile.name}</p>}
                    </div>

                    <div className="flex justify-end pt-4 gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className={[
                                'relative px-4 py-2 font-medium rounded-full transition-all duration-200',
                                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                                'disabled:opacity-50 disabled:cursor-not-allowed',
                                'bg-white/80 text-slate-700 border border-white/60 backdrop-blur hover:bg-white focus:ring-sky-400'
                            ].join(' ')}
                            disabled={isAnalyzing}
                        >
                            {t('common.cancel')}
                        </button>
                        <button
                            type="submit"
                            disabled={isAnalyzing}
                            className={[
                                'relative px-4 py-2 font-medium rounded-full transition-all duration-200',
                                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                                'disabled:opacity-50 disabled:cursor-not-allowed',
                                'text-white bg-gradient-to-r from-fuchsia-500 to-sky-500 shadow-md hover:shadow-lg focus:ring-fuchsia-400'
                            ].join(' ')}
                        >
                            {isAnalyzing ? (
                                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                            strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('common.processing')}
                </span>
                            ) : (
                                t('addModal.submit')
                            )}
                        </button>
                    </div>
                </form>
                {availableUrl && (
                    <div
                        className="mt-4 p-3 rounded-md border border-emerald-200 bg-emerald-50 text-sm text-emerald-800">
                        <div className="font-medium mb-1">{t('addModal.ready')}</div>
                        <a
                            href={availableUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 underline"
                        >
                            {t('addModal.openDeployed')}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                 className="w-4 h-4">
                                <path
                                    d="M11 3a1 1 0 100 2h2.586L7.293 11.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                                <path
                                    d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
                            </svg>
                        </a>
                        <div className="mt-2 text-xs text-emerald-700/90 break-all">{availableUrl}</div>
                    </div>
                )}
                {waitingMessage && (
                    <div className="mt-3 text-sm text-slate-700 flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>
                          {waitingMessage} ({elapsedSec}s)
                        </span>
                    </div>
                )}
                {uploadError && (
                    <p className="mt-3 text-sm text-red-600" role="alert">{uploadError}</p>
                )}
            </div>
        </div>,
        document.body
    );
};

export default AddAppModal;