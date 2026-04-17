import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { STATS, BRANDS } from '../constants';
import { ScrambleText } from './ScrambleText';
import { TypewriterText } from './TypewriterText';
import { SiteConfig } from '../types';

import { useLanguage } from '../i18n/LanguageContext';

interface AboutViewProps {
  config: SiteConfig | null;
}

export const AboutView: React.FC<AboutViewProps> = ({ config }) => {
  const { t, language } = useLanguage();
  const [githubRepos, setGithubRepos] = useState<string>('50+ Repos');

  const portrait = config?.portraitUrl || "/portrait.png";
  const bio = config?.introBody || t.about.bio;

  useEffect(() => {
    fetch('https://api.github.com/users/Alextomato58')
      .then(res => res.json())
      .then(data => {
        if (data.public_repos) {
          setGithubRepos(`${data.public_repos} Repos`);
        }
      })
      .catch(err => console.error('GitHub fetch failed:', err));
  }, []);

  const fitnessStreak = useMemo(() => {
    const startDate = new Date('2024-04-19');
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} ${language === 'zh' ? '天' : 'Days'}`;
  }, [language]);

  const updatedStats = useMemo(() => {
    return STATS.map(stat => {
      if (stat.label === 'GitHub') {
        return { ...stat, value: githubRepos };
      }
      if (stat.label === 'YouTube' || stat.label === 'Douyin') {
        return { ...stat, label: 'Douyin', value: '15.6W+' };
      }
      if (stat.label === 'Fitness Streak' || stat.label === '健身打卡') {
        return { 
          ...stat, 
          label: language === 'zh' ? '健身打卡' : 'Fitness Streak',
          value: fitnessStreak 
        };
      }
      return stat;
    });
  }, [fitnessStreak, language, githubRepos]);

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <img 
            src={portrait} 
            alt="Portrait"
            className="w-full aspect-[4/5] rounded-[48px] object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div>
          <h1 className="font-display font-bold text-5xl md:text-7xl mb-4 tracking-tight min-h-[1.2em]">
            <TypewriterText 
              phrases={[
                t.about.title,
                language === 'zh' ? '我是一名创意开发者' : "I'm a Creative Developer",
                language === 'zh' ? '我也热爱视频剪辑' : "I love Video Editing",
              ]} 
            />
          </h1>
          <p className="text-gray-400 font-medium mb-10 tracking-widest text-sm uppercase">/ Alex Wu /</p>
          
          <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-xl text-justify whitespace-pre-wrap">
            {bio}
          </p>
        </div>
      </div>
      
      {/* Stats/Links Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-32">
        {updatedStats.map((stat, i) => (
          <motion.a
            key={stat.label}
            href={stat.link}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center text-center group bg-white/50 p-8 rounded-[32px] border border-black/5 hover:border-black/20 transition-all duration-300"
          >
            <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold mb-4 border border-black/5 ${stat.color}`}>
              <ScrambleText text={stat.value} />
            </span>
            <h3 className="font-display font-semibold text-2xl mb-1 group-hover:underline">{stat.label}</h3>
            <p className="text-gray-400 text-sm">{stat.description}</p>
          </motion.a>
        ))}
      </div>
      
      {/* Brands Section */}
      <div className="text-center mb-32">
        <p className="text-gray-400 text-sm font-medium uppercase tracking-[0.2em] mb-12">{t.about.brands_title}</p>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {BRANDS.map((brand) => (
            <img 
              key={brand.name} 
              src={brand.logo} 
              alt={brand.name} 
              className="h-8 md:h-10 object-contain"
              referrerPolicy="no-referrer"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
