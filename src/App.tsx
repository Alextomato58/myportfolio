import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { WorkView } from './components/WorkView';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';
import { ProjectDetail } from './components/ProjectDetail';
import { Project } from './types';
import { CursorFollower } from './components/CursorFollower';
import { ScrollProgress } from './components/ScrollProgress';

import { PROJECTS as INITIAL_PROJECTS } from './constants';
import { LanguageProvider } from './i18n/LanguageContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'work' | 'about'>('work');
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check for admin mode in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('edit') === 'true') {
      setIsAdmin(true);
      console.log("Admin mode enabled via URL");
    }
  }, []);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  // Scroll to top on page change or project selection
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedProject]);

  const handleAboutClick = () => {
    setSelectedProject(null);
    setCurrentPage('about');
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleBackToWork = () => {
    setSelectedProject(null);
    setCurrentPage('work');
  };

  const addProject = async (project: Project) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-mode': 'true'
        },
        body: JSON.stringify(project)
      });
      
      if (res.ok) {
        const savedProject = await res.json();
        setProjects([savedProject, ...projects]);
        alert("Project saved successfully to the server!");
      } else {
        const error = await res.json();
        alert(`Failed to save: ${error.error}`);
      }
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Error adding project. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen selection:bg-primary-prussian/10 selection:text-primary-prussian md:cursor-none">
      <ScrollProgress />
      <CursorFollower />
      <Navigation 
        currentPage={selectedProject ? 'work' : currentPage} 
        setPage={(page) => {
          setSelectedProject(null);
          setCurrentPage(page);
        }} 
      />
      
      <main>
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <ProjectDetail 
              key="detail"
              project={selectedProject} 
              onBack={handleBackToWork} 
            />
          ) : (
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {currentPage === 'work' ? (
                <WorkView 
                  projects={projects}
                  onAboutClick={handleAboutClick} 
                  onProjectClick={handleProjectClick} 
                  onAddProject={addProject}
                  showAddButton={isAdmin}
                />
              ) : (
                <AboutView />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      {!selectedProject && <Footer onAboutClick={handleAboutClick} />}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

