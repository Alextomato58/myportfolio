export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  thumbnail: string;
  gallery?: string[];
  tag: string;
  company: string;
  year: string;
  category: 'Design' | 'Development' | 'Video' | 'Article';
  link?: string;
  role?: string;
  videoUrl?: string;
  codeSnippet?: string;
  githubUrl?: string;
  docUrl?: string;
}

export interface Brand {
  name: string;
  logo: string;
}

export interface Stat {
  label: string;
  value: string;
  description: string;
  color: string;
  link: string;
}

export interface SiteConfig {
  greeting: string;
  role: string;
  introTitle: string;
  introBody: string;
  portraitUrl: string;
  email: string;
}
