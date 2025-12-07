import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { AppEntry } from '../types';
import { processVibeCheck } from '../services/vibeCheckService';

interface AddAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (app: AppEntry) => void;
}

const AddAppModal: React.FC<AddAppModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    try {
      // AI Vibe Check
      const vibeResult = await processVibeCheck(name, description);

      const newApp: AppEntry = {
        id: crypto.randomUUID(),
        name,
        link,
        author: author || 'Anonymous',
        likes: Math.floor(Math.random() * 50) + 1,
        vibeScore: vibeResult.vibeScore,
        description: vibeResult.shortDescription,
        timestamp: Date.now(),
        stage: 'vibe' // Default stage for new apps
      };

      if (zipFile) {
        console.log(`Uploading ${zipFile.name} (${zipFile.size} bytes)...`);
      }

      onAdd(newApp);
      handleClose();
    } catch (err) {
      console.error("Failed to add app", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClose = () => {
    setName('');
    setLink('');
    setAuthor('');
    setDescription('');
    setZipFile(null);
    onClose();
  };

  // Render the modal in a portal so the overlay covers the entire viewport
  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-2xl">
        <h2 className="mb-6 text-xl font-bold text-gray-900">
          Submit Vibe Code
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">App Name</label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. My Awesome App"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">App Link</label>
            <input
              required
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              rows={3}
              placeholder="Describe your app..."
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Source Code (Zip)</label>
            <input
              type="file"
              accept=".zip"
              onChange={(e) => setZipFile(e.target.files ? e.target.files[0] : null)}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
              "
            />
            {zipFile && <p className="mt-1 text-xs text-green-600">Selected: {zipFile.name}</p>}
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
            >
              Cancel
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
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Submit App'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AddAppModal;