import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, FileText, Image as ImageIcon, PlayCircle } from 'lucide-react';
import { Project } from '../types';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (project: Project) => void;
}

import { useLanguage } from '../i18n/LanguageContext';

export const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, onAdd }) => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Design' as const,
    company: '',
    year: new Date().getFullYear().toString(),
    videoUrl: '',
    githubUrl: '',
    docUrl: '',
    codeSnippet: '',
    thumbnail: '',
  });

  const uploadFile = async (file: File): Promise<string | null> => {
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
        return result.url;
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
    return null;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'thumbnail' | 'doc' | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
      const serverUrl = await uploadFile(file);
      if (serverUrl) {
        if (type === 'thumbnail') {
          setFormData(prev => ({ ...prev, thumbnail: serverUrl }));
        } else if (type === 'doc') {
          setFormData(prev => ({ ...prev, docUrl: serverUrl }));
        } else if (type === 'video') {
          setFormData(prev => ({ ...prev, videoUrl: serverUrl }));
        }
      } else {
        alert("Upload failed. Please try again.");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading) return;
    
    const newProject: Project = {
      id: Date.now().toString(),
      ...formData,
      fullDescription: `Detailed case study for ${formData.title}. This was an amazing project focused on solving real user problems.`,
      thumbnail: formData.thumbnail || `https://picsum.photos/seed/${formData.title}/800/600`,
      tag: 'NEW',
      category: formData.category as any,
    };
    onAdd(newProject);
    onClose();
    setFormData({
      title: '',
      description: '',
      category: 'Design',
      company: '',
      year: new Date().getFullYear().toString(),
      videoUrl: '',
      githubUrl: '',
      docUrl: '',
      codeSnippet: '',
      thumbnail: '',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
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
            className="relative w-full max-w-xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header - Fixed */}
            <div className="p-6 md:p-8 border-b border-black/5 flex justify-between items-center shrink-0 bg-white">
              <h3 className="font-display font-bold text-2xl">
                {t.modal.title}
                {isUploading && <span className="ml-3 text-xs text-primary-blue animate-pulse font-mono tracking-widest uppercase">Uploading...</span>}
              </h3>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Scrollable Content Area */}
            <form id="project-form" onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 overflow-y-auto custom-scrollbar flex-1">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.modal.form_title}</label>
                  <input
                    required
                    type="text"
                    disabled={isUploading}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Portfolio Website"
                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary-purple transition-all disabled:opacity-50"
                  />
                </div>

                {/* Local Image Upload */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Project Cover (Thumbnail)</label>
                  <div 
                    onClick={() => !isUploading && fileInputRef.current?.click()}
                    className={`w-full h-32 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-primary-purple hover:bg-primary-purple/5 transition-all overflow-hidden relative ${isUploading ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    {formData.thumbnail ? (
                      <img src={formData.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <ImageIcon className="w-8 h-8 text-gray-300 mb-2" />
                        <span className="text-xs text-gray-400 font-medium tracking-wide">Click to upload cover image</span>
                      </>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'thumbnail')} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.modal.form_category}</label>
                    <div className="relative">
                      <select
                        disabled={isUploading}
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                        className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary-purple transition-all appearance-none cursor-pointer disabled:opacity-50"
                      >
                        <option value="Design">Design</option>
                        <option value="Development">Development</option>
                        <option value="Video">Video</option>
                        <option value="Article">Article</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.modal.form_year}</label>
                    <input
                      required
                      disabled={isUploading}
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary-purple transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.modal.form_company}</label>
                  <input
                    required
                    disabled={isUploading}
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Personal Project"
                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary-purple transition-all disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.modal.form_desc}</label>
                  <textarea
                    required
                    disabled={isUploading}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="What makes this project special?"
                    rows={2}
                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary-purple transition-all resize-none font-medium text-sm disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-black/5 space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-prussian">Multi-Media Content (Optional)</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Video URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        disabled={isUploading}
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                        placeholder="YouTube / Video link"
                        className="flex-1 px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-1 focus:ring-primary-purple transition-all disabled:opacity-50"
                      />
                      <button
                        type="button"
                        onClick={() => !isUploading && videoInputRef.current?.click()}
                        className="px-3 bg-gray-100 rounded-xl hover:bg-gray-200"
                      >
                        <PlayCircle className="w-5 h-5 text-gray-500" />
                        <input 
                          type="file" 
                          ref={videoInputRef} 
                          className="hidden" 
                          accept="video/*"
                          onChange={(e) => handleFileChange(e, 'video')}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">GitHub Link</label>
                    <input
                      type="text"
                      disabled={isUploading}
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      placeholder="Repository URL"
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-1 focus:ring-primary-purple transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Local Document (PDF / Zip)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      disabled={isUploading}
                      value={formData.docUrl}
                      onChange={(e) => setFormData({ ...formData, docUrl: e.target.value })}
                      placeholder="Or enter Doc URL here"
                      className="flex-1 px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-1 focus:ring-primary-purple transition-all text-xs disabled:opacity-50"
                    />
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={() => !isUploading && docInputRef.current?.click()}
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center justify-center text-gray-600 disabled:opacity-50"
                    >
                      <FileText className="w-5 h-5" />
                      <input 
                        type="file" 
                        ref={docInputRef} 
                        className="hidden" 
                        onChange={(e) => handleFileChange(e, 'doc')}
                      />
                    </button>
                  </div>
                  {formData.docUrl.startsWith('/uploads/') && (
                    <p className="text-[10px] text-green-600 font-bold">✓ File uploaded successfully</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Key Code Snippet</label>
                  <textarea
                    disabled={isUploading}
                    value={formData.codeSnippet}
                    onChange={(e) => setFormData({ ...formData, codeSnippet: e.target.value })}
                    placeholder="Paste important code here..."
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-1 focus:ring-primary-purple transition-all resize-none font-mono text-[10px] leading-relaxed disabled:opacity-50"
                  />
                </div>
              </div>
            </form>

            {/* Footer Actions - Fixed */}
            <div className="p-6 md:p-8 bg-gray-50 border-t border-black/5 shrink-0">
              <button
                form="project-form"
                type="submit"
                disabled={isUploading}
                className="w-full py-5 bg-black text-white rounded-2xl font-bold hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Upload className="w-5 h-5" />
                {t.modal.submit}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
