import React, { useState } from 'react';
import { AppEntry } from '../types';
import { processVibeCheck } from '../services/vibeCheckService';
import Button from './CyberButton'; // Importing the updated component

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
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
            <Button 
              type="button" 
              variant="secondary" 
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary"
              isLoading={isAnalyzing}
            >
              Submit App
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppModal;