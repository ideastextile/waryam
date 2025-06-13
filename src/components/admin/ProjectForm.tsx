import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { Project, ProjectFormData } from '../../types/project';

interface ProjectFormProps {
  project?: Project | null;
  onSave: (projectData: ProjectFormData) => void;
  onCancel: () => void;
}

export default function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    image: '',
    technologies: [],
    demoUrl: '',
    githubUrl: '',
    featured: false,
    category: '',
    completedDate: '',
    status: 'completed',
  });

  const [newTech, setNewTech] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        image: project.image,
        technologies: project.technologies,
        demoUrl: project.demoUrl,
        githubUrl: project.githubUrl,
        featured: project.featured,
        category: project.category,
        completedDate: project.completedDate,
        status: project.status,
      });
    }
  }, [project]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.completedDate) newErrors.completedDate = 'Completion date is required';
    if (formData.technologies.length === 0) newErrors.technologies = 'At least one technology is required';

    // URL validation
    const urlPattern = /^https?:\/\/.+/;
    if (formData.demoUrl && !urlPattern.test(formData.demoUrl)) {
      newErrors.demoUrl = 'Please enter a valid URL';
    }
    if (formData.githubUrl && !urlPattern.test(formData.githubUrl)) {
      newErrors.githubUrl = 'Please enter a valid URL';
    }
    if (formData.image && !urlPattern.test(formData.image)) {
      newErrors.image = 'Please enter a valid image URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const addTechnology = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()]
      }));
      setNewTech('');
      if (errors.technologies) {
        setErrors(prev => ({ ...prev, technologies: '' }));
      }
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {project ? 'Edit Project' : 'Add New Project'}
          </h1>
          <motion.button
            onClick={onCancel}
            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="Enter project title"
              />
              {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                  errors.description ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="Describe your project"
              />
              {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.image ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && <p className="text-red-400 text-sm mt-1">{errors.image}</p>}
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-32 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Demo URL */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Demo URL
              </label>
              <input
                type="url"
                name="demoUrl"
                value={formData.demoUrl}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.demoUrl ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="https://example.com"
              />
              {errors.demoUrl && <p className="text-red-400 text-sm mt-1">{errors.demoUrl}</p>}
            </div>

            {/* GitHub URL */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.githubUrl ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="https://github.com/username/repo"
              />
              {errors.githubUrl && <p className="text-red-400 text-sm mt-1">{errors.githubUrl}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category *
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="e.g., Web Development, Mobile App"
              />
              {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category}</p>}
            </div>

            {/* Completion Date */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Completion Date *
              </label>
              <input
                type="date"
                name="completedDate"
                value={formData.completedDate}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.completedDate ? 'border-red-500' : 'border-white/20'
                }`}
              />
              {errors.completedDate && <p className="text-red-400 text-sm mt-1">{errors.completedDate}</p>}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="planned">Planned</option>
              </select>
            </div>

            {/* Featured */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm font-medium text-gray-300">
                Featured Project
              </label>
            </div>

            {/* Technologies */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Technologies *
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add technology (e.g., React, Node.js)"
                />
                <motion.button
                  type="button"
                  onClick={addTechnology}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech) => (
                  <motion.div
                    key={tech}
                    className="flex items-center gap-2 px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full border border-blue-600/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <span className="text-sm">{tech}</span>
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="text-blue-300 hover:text-red-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
              {errors.technologies && <p className="text-red-400 text-sm mt-1">{errors.technologies}</p>}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
            <motion.button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold text-white hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Save className="w-5 h-5" />
              {project ? 'Update Project' : 'Save Project'}
            </motion.button>
            
            <motion.button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-600 rounded-lg font-semibold text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}