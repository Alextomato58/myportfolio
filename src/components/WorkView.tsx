import React from 'react';
import { motion } from 'motion/react';
import { ProjectCard } from './ProjectCard';
import { SocialIcons } from './SocialIcons';
import { PROJECTS } from '../constants';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Project, SiteConfig } from '../types';
import { AddProjectModal } from './AddProjectModal';
import { Magnetic } from './Magnetic';
import { ScrambleText } from './ScrambleText';

interface WorkViewProps {
  projects: Project[];
  config: SiteConfig;
  onAboutClick: () => void;
  onProjectClick: (project: Project) => void;
  onAddProject: (project: Project) => void;
  showAddButton?: boolean;
}

import { useLanguage } from '../i18n/LanguageContext';

export const WorkView: React.FC<WorkViewProps> = ({ projects, config, onAboutClick, onProjectClick, onAddProject, showAddButton = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-end">
        {/* ... Hero left side ... */}
        <div>
          {/* ... Flower icons ... */}
          <div className="flex gap-4 mb-10">
            {['blue', 'prussian', 'yellow', 'purple'].map((color, i) => (
              <motion.div
                key={color}
                animate={{ 
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1],
                  rotate: [0, (i % 2 === 0 ? 5 : -5), 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
                className={`w-12 h-12 rounded-full flex items-center justify-center p-2
                  ${color === 'blue' ? 'bg-primary-blue/20 stroke-primary-blue' : ''}
                  ${color === 'prussian' ? 'bg-primary-prussian/20 stroke-primary-prussian' : ''}
                  ${color === 'yellow' ? 'bg-primary-yellow/20 stroke-primary-yellow' : ''}
                  ${color === 'purple' ? 'bg-primary-purple/20 stroke-primary-purple' : ''}
                `}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-current stroke-2">
                  <path d="M12 4L13.5 8.5L18 10L13.5 11.5L12 16L10.5 11.5L6 10L10.5 8.5L12 4Z" />
                </svg>
              </motion.div>
            ))}
          </div>
          
          <h1 className="font-display font-bold text-6xl md:text-7xl mb-6 tracking-tight leading-tight">
            <ScrambleText text={config.greeting} />
          </h1>
          
          <div className="flex flex-col gap-1 mb-8">
            <span className="text-gray-500 font-medium tracking-wide font-display">{config.role}</span>
          </div>
          
          <Magnetic>
            <SocialIcons onAboutClick={onAboutClick} />
          </Magnetic>
        </div>
        
        {/* ... Hero right side ... */}
        <div className="flex gap-8 items-start">
          <div className="relative">
            <motion.img 
              whileHover={{ scale: 1.1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              src={config.portraitUrl} 
              alt="Portrait"
              className="w-24 h-24 md:w-32 md:h-32 rounded-3xl object-cover border-4 border-yellow-200 rotate-3 cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="max-w-xs">
            <h3 className="font-display font-semibold text-xl mb-2 flex items-center gap-2">
              {config.introTitle} <span className="text-2xl mt-[-4px]">👨‍💻</span>
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {config.introBody}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-12">
        <h2 className="font-display font-bold text-3xl">{t.hero.featured_projects}</h2>
        {showAddButton && (
          <Magnetic>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors duration-200 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              {t.hero.add_project}
            </button>
          </Magnetic>
        )}
      </div>

      <AddProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={onAddProject} 
      />
      
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-black/5">
        {projects.map((project, index) => (
          <div key={project.id} className="border-b border-black/5 md:border-r lg:[&:nth-child(3n)]:border-r-0 p-8 hover:bg-white transition-colors duration-300">
            <ProjectCard project={project} index={index} onClick={onProjectClick} />
          </div>
        ))}
      </div>
    </div>
  );
};
