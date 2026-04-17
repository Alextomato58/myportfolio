import React from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      data-cursor="project"
      onClick={() => onClick(project)}
    >
      <div className="relative overflow-hidden rounded-3xl aspect-[4/3] bg-gray-100 mb-6">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <h3 className="font-display font-semibold text-2xl group-hover:underline decoretion-2 underline-offset-4">
            {project.title}
          </h3>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-[10px] font-semibold tracking-wider text-gray-500 border border-black/5">
            {project.tag}
            {project.tag.includes('WEBSITE') && <ArrowUpRight className="w-3 h-3" />}
          </span>
        </div>
        
        <p className="text-gray-500 leading-relaxed line-clamp-2 max-w-sm">
          {project.description}
        </p>
        
        <div className="flex items-center gap-2 pt-2 text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
          <span>{project.company}</span>
          <span>•</span>
          <span>{project.year}</span>
        </div>
      </div>
    </motion.div>
  );
};
