import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Sparkles, Settings } from 'lucide-react';
import { Project } from '../types/project';
import { getProjects } from '../utils/projectStorage';
import AdminDashboard from './admin/AdminDashboard';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-400/30 transition-all duration-500 ${
        project.featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        
        {project.featured && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 rounded-full text-sm font-semibold text-white">
              <Sparkles className="w-3 h-3" />
              Featured
            </div>
          </div>
        )}

        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            project.status === 'completed' ? 'bg-green-500/80 text-white' :
            project.status === 'in-progress' ? 'bg-orange-500/80 text-white' :
            'bg-gray-500/80 text-white'
          }`}>
            {project.status === 'in-progress' ? 'In Progress' : 
             project.status === 'completed' ? 'Completed' : 'Planned'}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded">
            {project.category}
          </span>
        </div>
        
        <p className="text-gray-300 mb-4 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech: string) => (
            <span
              key={tech}
              className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-600/30"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400">
            Completed: {new Date(project.completedDate).toLocaleDateString()}
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          {project.demoUrl && (
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </motion.a>
          )}
          
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4" />
              Code
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAdminButton, setShowAdminButton] = useState(false);

  useEffect(() => {
    loadProjects();
    
    // Show admin button on Ctrl+Shift+A
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowAdminButton(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const loadProjects = () => {
    const loadedProjects = getProjects();
    setProjects(loadedProjects);
  };

  if (showAdmin) {
    return <AdminDashboard onClose={() => {
      setShowAdmin(false);
      loadProjects(); // Reload projects when closing admin
    }} />;
  }

  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            A showcase of my recent work, featuring modern web applications and innovative solutions
          </p>

          {showAdminButton && (
            <motion.button
              onClick={() => setShowAdmin(true)}
              className="absolute top-0 right-0 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Admin Panel (Ctrl+Shift+A)"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No projects available</div>
            <p className="text-gray-500 mt-2">Projects will appear here once added</p>
          </div>
        )}

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://github.com', '_blank')}
          >
            View All Projects on GitHub
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}