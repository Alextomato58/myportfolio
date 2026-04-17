import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Calendar, Building, User, Github, FileText, PlayCircle, Code as CodeIcon } from 'lucide-react';
import { Project } from '../types';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import { ScrambleText } from './ScrambleText';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

import { useLanguage } from '../i18n/LanguageContext';

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const { t } = useLanguage();

  useEffect(() => {
    Prism.highlightAll();
  }, [project.codeSnippet]);

  const isYouTube = (url: string) => url.includes('youtube.com') || url.includes('youtu.be');

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    return url;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg pt-32 pb-20 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-12 transition-colors duration-200 group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
          <span className="font-medium">{t.project_detail.back}</span>
        </button>

        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-1.5 rounded-full bg-primary-purple/10 text-primary-purple text-xs font-bold tracking-wider uppercase">
                {project.category}
              </span>
              <span className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-500 text-xs font-bold tracking-wider uppercase border border-black/5">
                {project.tag}
              </span>
            </div>
            
            <h1 className="font-display font-bold text-5xl md:text-7xl mb-8 tracking-tight leading-tight">
              {project.title}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-black/5 mb-12">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-400">
                  <Building className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{t.project_detail.client}</span>
                </div>
                <p className="font-semibold">{project.company}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{t.project_detail.year}</span>
                </div>
                <p className="font-semibold">{project.year}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-400">
                  <User className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{t.project_detail.role}</span>
                </div>
                <p className="font-semibold">{project.role || 'Designer'}</p>
              </div>
              {project.link && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-400">
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{t.project_detail.link}</span>
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-blue hover:underline">
                    {t.project_detail.live_demo}
                  </a>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none text-gray-500 leading-relaxed mb-16"
          >
            <p className="text-xl text-black font-medium mb-6">
              {project.description}
            </p>
            <p className="whitespace-pre-wrap">
              {project.fullDescription || t.project_detail.no_gallery}
            </p>
          </motion.div>

          {/* Action Links for Code/Docs */}
          {(project.githubUrl || project.docUrl) && (
            <div className="flex flex-wrap gap-4 mb-16">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-black text-white hover:bg-black/80 transition-all font-semibold"
                >
                  <Github className="w-5 h-5" />
                  View on GitHub
                </a>
              )}
              {project.docUrl && (
                <a 
                  href={project.docUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary-prussian text-white hover:opacity-90 transition-all font-semibold"
                >
                  <FileText className="w-5 h-5" />
                  Documentation (PDF)
                </a>
              )}
            </div>
          )}

          {/* Video Section */}
          {project.videoUrl && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <div className="flex items-center gap-2 mb-4 text-primary-prussian">
                <PlayCircle className="w-5 h-5" />
                <h3 className="font-display font-bold text-xl uppercase tracking-wider">Video Showcase</h3>
              </div>
              <div className="aspect-video w-full rounded-[32px] overflow-hidden border border-black/5 bg-gray-100">
                {isYouTube(project.videoUrl) ? (
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={getEmbedUrl(project.videoUrl)} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                ) : (
                  <video controls className="w-full h-full object-cover">
                    <source src={project.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </motion.div>
          )}

          {/* Code Section */}
          {project.codeSnippet && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <div className="flex items-center gap-2 mb-4 text-primary-prussian">
                <CodeIcon className="w-5 h-5" />
                <h3 className="font-display font-bold text-xl uppercase tracking-wider">Code Snippet</h3>
              </div>
              <div className="bg-[#1e1e1e] p-8 rounded-[32px] overflow-hidden text-sm font-mono relative group">
                <pre className="line-numbers custom-scrollbar">
                  <code className="language-typescript">{project.codeSnippet}</code>
                </pre>
                <div className="absolute top-4 right-4 text-[10px] text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
                  Source Code
                </div>
              </div>
            </motion.div>
          )}

          {/* Gallery Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {project.gallery?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${project.title} gallery ${i}`}
                className="w-full h-auto rounded-[32px] shadow-sm border border-black/5"
                referrerPolicy="no-referrer"
              />
            ))}
            {!project.gallery && !project.videoUrl && (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-auto rounded-[32px] shadow-sm border border-black/5"
                referrerPolicy="no-referrer"
              />
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
