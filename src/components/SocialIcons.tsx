import React from 'react';
import { Github, Music2, Book, Smile } from 'lucide-react';

interface SocialIconsProps {
  onAboutClick?: () => void;
}

/**
 * SOCIAL MEDIA LINKS CONFIGURATION
 * To update your profile links, replace the '#' in the href attributes below
 * with your actual profile URLs.
 * 
 * Example: href="https://github.com/your-username"
 */
const SOCIAL_LINKS = {
  douyin: 'https://v.douyin.com/55XOSaoOsFk/',      // Updated Douyin link
  xiaohongshu: 'https://xhslink.com/m/Q9Br9BbjDi', // Updated Xiaohongshu link
  github: 'https://github.com/Alextomato58',      // Updated Github link
};

export const SocialIcons: React.FC<SocialIconsProps> = ({ onAboutClick }) => {
  return (
    <div className="flex items-center gap-4 text-gray-400">
      <button 
        onClick={onAboutClick}
        className="hover:text-black transition-colors duration-200 cursor-pointer"
        title="About"
      >
        <Smile className="w-6 h-6" />
      </button>
      <a 
        href={SOCIAL_LINKS.douyin} 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:text-black transition-colors duration-200" 
        title="Douyin"
      >
        <Music2 className="w-6 h-6" />
      </a>
      <a 
        href={SOCIAL_LINKS.xiaohongshu} 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:text-red-500 transition-colors duration-200" 
        title="Xiaohongshu"
      >
        <Book className="w-6 h-6" />
      </a>
      <a 
        href={SOCIAL_LINKS.github} 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:text-black transition-colors duration-200" 
        title="Github"
      >
        <Github className="w-6 h-6" />
      </a>
    </div>
  );
};
