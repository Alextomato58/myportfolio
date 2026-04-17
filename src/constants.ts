import { Project, Brand, Stat } from './types';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  greeting: "Hello, I'm Alex",
  role: "Creative Developer & Video Editor",
  introTitle: "A bit about me",
  introBody: "I merge the technical logic of code with the emotional resonance of visual storytelling. Based in Shanghai, working globally.",
  portraitUrl: "/portrait.png",
  email: "wbsept1@qq.com"
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Integrated Media Showcase',
    description: 'A comprehensive project demonstrating support for video, code snippets, GitHub repositories, and document distribution.',
    fullDescription: 'This entry showcases the versatility of the updated portfolio system. It now seamlessly integrates embedded YouTube videos for visual demonstrations, high-performance code blocks for technical exposition, and direct links to external resources like GitHub or PDF documentation.',
    thumbnail: 'https://picsum.photos/seed/multimedia/800/600',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder video
    githubUrl: 'https://github.com/wb20030901',
    docUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', // Placeholder PDF
    codeSnippet: `// Example: Custom Scramble Animation Logic
const startScramble = (text: string) => {
  let iteration = 0;
  const interval = setInterval(() => {
    setDisplayText(
      text.split("").map((char, index) => {
        if (index < iteration) return text[index];
        return CHARS[Math.floor(Math.random() * 62)];
      }).join("")
    );
    if (iteration >= text.length) clearInterval(interval);
    iteration += 1/3;
  }, 30);
};`,
    tag: 'DYNAMIC',
    company: 'Vibecoding',
    year: '2026',
    category: 'Development',
    role: 'Full Stack Engineer'
  },
  {
    id: '2',
    title: 'Cinematic Narrative Montage',
    description: 'A professional video edit deconstructing the transition between reality and absurdity through lighting and sound design.',
    fullDescription: 'This video project explores the boundaries of cinematic storytelling through non-linear editing techniques. By focusing on micro-expressions and atmospheric soundscapes, the piece invites viewers into a deconstructed reality.',
    thumbnail: 'https://picsum.photos/seed/video/800/600',
    gallery: [
      'https://picsum.photos/seed/vid1/1200/800',
      'https://picsum.photos/seed/vid2/1200/800'
    ],
    tag: 'VIDEO',
    company: 'Alex Films',
    year: '2025',
    category: 'Video',
    role: 'Editor & Director'
  },
  {
    id: '3',
    title: 'Indie Game UX Study',
    description: 'A research project analyzing the interaction design mechanisms that drive player engagement in cozy indie games.',
    fullDescription: 'This in-depth study looks at games like "Stardew Valley" and "A Short Hike" to understand how subtle design choices impacts player emotion. The publication includes interactive diagrams and breakdown of UI elements.',
    thumbnail: 'https://picsum.photos/seed/gameux/800/600',
    tag: 'ARTICLE',
    company: 'Personal Study',
    year: '2025',
    category: 'Article',
    role: 'UX Researcher'
  },
  {
    id: '4',
    title: 'Minimalist Web Framework',
    description: 'A custom, lightweight React framework designed for high-performance creative portfolios.',
    thumbnail: 'https://picsum.photos/seed/framework/800/600',
    tag: 'VISIT GITHUB',
    company: 'Open Source',
    year: '2024',
    category: 'Development',
  }
];

export const BRANDS: Brand[] = [
  { name: 'Vite', logo: 'https://via.placeholder.com/100x40/000000/FFFFFF?text=Vite' },
  { name: 'React', logo: 'https://via.placeholder.com/100x40/000000/FFFFFF?text=React' },
  { name: 'Tailwind', logo: 'https://via.placeholder.com/100x40/000000/FFFFFF?text=Tailwind' },
  { name: 'Motion', logo: 'https://via.placeholder.com/100x40/000000/FFFFFF?text=Motion' },
  { name: 'Lucide', logo: 'https://via.placeholder.com/100x40/000000/FFFFFF?text=Lucide' },
];

export const STATS: Stat[] = [
  {
    label: 'GitHub',
    value: '52 Repos',
    description: 'Building in public',
    color: 'bg-gray-100 text-gray-700',
    link: '#',
  },
  {
    label: 'YouTube',
    value: '12K Subs',
    description: 'Tech & Video editing',
    color: 'bg-red-100 text-red-700',
    link: '#',
  },
  {
    label: 'Fitness Streak',
    value: '450 Days',
    description: 'Focused routine',
    color: 'bg-blue-100 text-blue-700',
    link: '#',
  },
];
