import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { Languages } from 'lucide-react';

interface NavigationProps {
  currentPage: 'work' | 'about';
  setPage: (page: 'work' | 'about') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, setPage }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-4">
      <div className="flex items-center gap-4">
        <nav className="flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-2 py-1.5 shadow-sm border border-black/5">
          <button
            onClick={() => setPage('work')}
            className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              currentPage === 'work' ? 'text-black' : 'text-gray-500 hover:text-black'
            }`}
          >
            {currentPage === 'work' && (
              <motion.div
                layoutId="nav-bg"
                className="absolute inset-0 bg-gray-100 rounded-full -z-10"
                transition={{ type: 'spring', duration: 0.6 }}
              />
            )}
            {t.nav.work}
          </button>
          <button
            onClick={() => setPage('about')}
            className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              currentPage === 'about' ? 'text-black' : 'text-gray-500 hover:text-black'
            }`}
          >
            {currentPage === 'about' && (
              <motion.div
                layoutId="nav-bg"
                className="absolute inset-0 bg-gray-100 rounded-full -z-10"
                transition={{ type: 'spring', duration: 0.6 }}
              />
            )}
            {t.nav.about}
          </button>
        </nav>

        <button
          onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
          className="flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-4 py-2.5 shadow-sm border border-black/5 text-xs font-bold hover:bg-gray-50 transition-colors"
        >
          <Languages className="w-4 h-4" />
          {language === 'en' ? '中文' : 'EN'}
        </button>
      </div>
      
      <div className="absolute left-10 md:left-20 top-6 hidden md:flex items-center gap-2">
        <div className="w-6 h-6 bg-primary-prussian rounded-[30%] rotate-45" />
        <span className="font-display font-semibold text-lg">Alex Wu</span>
      </div>
    </header>
  );
};
