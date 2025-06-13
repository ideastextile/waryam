import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Star, 
  StarOff, 
  Eye, 
  Github, 
  Calendar,
  Tag,
  Search,
  Filter,
  X,
  Save,
  ArrowLeft
} from 'lucide-react';
import { Project, ProjectFormData } from '../../types/project';
import { getProjects, addProject, updateProject, deleteProject, toggleFeatured } from '../../utils/projectStorage';
import ProjectForm from './ProjectForm';

interface AdminDashboardProps {
  onClose: () => void;
}

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const loadedProjects = getProjects();
    setProjects(loadedProjects);
  };

  const handleAddProject = (projectData: ProjectFormData) => {
    addProject(projectData);
    loadProjects();
    setShowForm(false);
  };

  const handleUpdateProject = (projectData: ProjectFormData) => {
    if (editingProject) {
      updateProject(editingProject.id, projectData);
      loadProjects();
      setEditingProject(null);
      setShowForm(false);
    }
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
      loadProjects();
    }
  };

  const handleToggleFeatured = (id: string) => {
    toggleFeatured(id);
    loadProjects();
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(projects.map(p => p.category))];

  if (showForm) {
    return (
      <ProjectForm
        project={editingProject}
        onSave={editingProject ? handleUpdateProject : handleAddProject}
        onCancel={() => {
          setShowForm(false);
          setEditingProject(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={onClose}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-400">Manage your portfolio projects</p>
            </div>
          </div>
          
          <motion.button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            Add Project
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <div className="text-2xl font-bold text-blue-400">{projects.length}</div>
            <div className="text-gray-400">Total Projects</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <div className="text-2xl font-bold text-yellow-400">{projects.filter(p => p.featured).length}</div>
            <div className="text-gray-400">Featured</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <div className="text-2xl font-bold text-green-400">{projects.filter(p => p.status === 'completed').length}</div>
            <div className="text-gray-400">Completed</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <div className="text-2xl font-bold text-orange-400">{projects.filter(p => p.status === 'in-progress').length}</div>
            <div className="text-gray-400">In Progress</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="planned">Planned</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden hover:border-blue-400/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                  
                  {project.featured && (
                    <div className="absolute top-3 right-3">
                      <div className="flex items-center gap-1 bg-yellow-500 px-2 py-1 rounded-full text-xs font-semibold text-black">
                        <Star className="w-3 h-3" />
                        Featured
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'completed' ? 'bg-green-500 text-white' :
                      project.status === 'in-progress' ? 'bg-orange-500 text-white' :
                      'bg-gray-500 text-white'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {new Date(project.completedDate).toLocaleDateString()}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-600/20 text-gray-300 rounded text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => window.open(project.demoUrl, '_blank')}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="View Demo"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      
                      <motion.button
                        onClick={() => window.open(project.githubUrl, '_blank')}
                        className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="View Code"
                      >
                        <Github className="w-4 h-4" />
                      </motion.button>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleToggleFeatured(project.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          project.featured 
                            ? 'bg-yellow-600 hover:bg-yellow-700' 
                            : 'bg-gray-600 hover:bg-gray-700'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title={project.featured ? 'Remove from Featured' : 'Add to Featured'}
                      >
                        {project.featured ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
                      </motion.button>
                      
                      <motion.button
                        onClick={() => {
                          setEditingProject(project);
                          setShowForm(true);
                        }}
                        className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Edit Project"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No projects found</div>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}