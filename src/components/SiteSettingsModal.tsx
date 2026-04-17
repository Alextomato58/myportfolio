import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Image as ImageIcon, Loader2 } from 'lucide-react';
import { SiteConfig } from '../types';

interface SiteSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onSave: (newConfig: SiteConfig) => Promise<void>;
}

export const SiteSettingsModal: React.FC<SiteSettingsModalProps> = ({ isOpen, onClose, config, onSave }) => {
  const [formData, setFormData] = useState<SiteConfig>(config);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });
      if (res.ok) {
        const result = await res.json();
        setFormData(prev => ({ ...prev, portraitUrl: result.url }));
      }
    } catch (error) {
      console.error("Portrait upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      alert("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-8 border-b border-black/5 flex justify-between items-center shrink-0">
              <h3 className="font-display font-bold text-2xl flex items-center gap-2">
                Site Customize
                {isSaving && <Loader2 className="w-5 h-5 animate-spin text-primary-blue" />}
              </h3>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto flex-1 custom-scrollbar">
              {/* Portrait Upload */}
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Portrait Image</label>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-200 flex-shrink-0 relative">
                    <img 
                      src={formData.portraitUrl} 
                      alt="Portrait Preview" 
                      className={`w-full h-full object-cover ${isUploading ? 'opacity-30' : ''}`} 
                    />
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 animate-spin text-black" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Upload New Photo
                    </button>
                    <p className="text-[10px] text-gray-400">Recommended: Square image, high resolution.</p>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleUpload} 
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Greeting (Hero title)</label>
                  <input
                    type="text"
                    required
                    value={formData.greeting}
                    onChange={(e) => setFormData({ ...formData, greeting: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary-purple transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Sub-role Title</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary-purple transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Intro Headline</label>
                <input
                  type="text"
                  required
                  value={formData.introTitle}
                  onChange={(e) => setFormData({ ...formData, introTitle: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary-purple transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Intro Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.introBody}
                  onChange={(e) => setFormData({ ...formData, introBody: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary-purple transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Contact Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary-purple transition-all"
                />
              </div>
            </form>

            <div className="p-8 bg-gray-50 border-t border-black/5">
              <button
                disabled={isSaving || isUploading}
                type="submit"
                onClick={handleSubmit}
                className="w-full py-5 bg-black text-white rounded-2xl font-bold hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:bg-gray-400"
              >
                <Save className="w-5 h-5" />
                Apply Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
