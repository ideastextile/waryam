export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  category: string;
  completedDate: string;
  status: 'completed' | 'in-progress' | 'planned';
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  category: string;
  completedDate: string;
  status: 'completed' | 'in-progress' | 'planned';
}