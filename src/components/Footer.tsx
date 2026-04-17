import React from 'react';
import { SocialIcons } from './SocialIcons';
import { SiteConfig } from '../types';

interface FooterProps {
  onAboutClick: () => void;
  config: SiteConfig | null;
}

import { useLanguage } from '../i18n/LanguageContext';

export const Footer: React.FC<FooterProps> = ({ onAboutClick, config }) => {
  const { t } = useLanguage();

  const portrait = config?.portraitUrl || "/avatar.jpg";
  const email = config?.email || "wbsept1@qq.com";
  const role = config?.role || t.hero.role;

  return (
    <footer className="py-20 px-6 border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="mb-10">
          <img 
            src={portrait} 
            alt="Portrait"
            className="w-16 h-16 aspect-square rounded-2xl object-cover mb-4 mx-auto"
            referrerPolicy="no-referrer"
          />
          <h4 className="font-display font-bold text-lg">Alex Wu</h4>
          <p className="text-gray-400 text-sm font-medium">{role}</p>
        </div>
        
        <div className="space-y-4 mb-12">
          <p className="text-2xl md:text-3xl font-display font-bold leading-tight flex flex-wrap justify-center gap-x-2">
            <span className="text-primary-prussian">{t.footer.construction}</span>
          </p>
          <p className="text-lg text-gray-500 font-medium">
            {t.footer.made_with}
          </p>
        </div>
        
        <div className="mb-20">
          <SocialIcons onAboutClick={onAboutClick} />
          <a 
            href={`mailto:${email}`} 
            className="mt-6 block text-gray-500 hover:text-black transition-colors font-medium text-lg underline underline-offset-4"
          >
            {email}
          </a>
        </div>
        
        <div className="max-w-3xl text-left md:text-center">
          <h5 className="font-display font-bold text-xl mb-4">{t.footer.disclaimer_title}</h5>
          <p className="text-gray-400 text-xs leading-relaxed uppercase tracking-wider">
            {t.footer.disclaimer_body}
          </p>
        </div>
      </div>
    </footer>
  );
};
