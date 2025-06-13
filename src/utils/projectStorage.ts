import { Project, ProjectFormData } from '../types/project';

const STORAGE_KEY = 'portfolio_projects';

// Default projects data
const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'Food Ordering System',
    description: 'A Food Ordering System solution with React, Node.js, and Stripe integration.',
    image: 'https://camo.githubusercontent.com/c761709564fec007ea2e2a679d9a601ab39208066895bfba64070810a1bc0d73/68747470733a2f2f7777772e73656d696f736973736f6674776172652e636f6d2f77702d636f6e74656e742f75706c6f6164732f323032302f30312f466f6f642d4f72646572696e672d53797374656d2e6a7067',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    demoUrl: 'https://fantastic-gecko-ff9c30.netlify.app/',
    githubUrl: 'https://github.com/ideastextile',
    featured: true,
    category: 'Web Development',
    completedDate: '2024-01-15',
    status: 'completed',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    title: '3D Portfolio Website',
    description: 'An interactive portfolio showcasing Three.js animations and modern web design.',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['Three.js', 'React', 'TypeScript', 'GSAP'],
    demoUrl: 'https://waryam.site/',
    githubUrl: 'https://github.com/ideastextile',
    featured: true,
    category: '3D Development',
    completedDate: '2024-02-20',
    status: 'completed',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-20T00:00:00Z',
  },
  {
    id: '3',
    title: 'smartcar-park App',
    description: 'A collaborative task management tool with real-time updates and team features.',
    image: 'https://www.teksmobile.com.au/blog/wp-content/uploads/2017/05/42_smart_parking.jpg',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Socket.io'],
    demoUrl: 'https://parkingmanger.netlify.app/',
    githubUrl: 'https://github.com/ideastextile',
    featured: false,
    category: 'Web Development',
    completedDate: '2024-03-10',
    status: 'completed',
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-03-10T00:00:00Z',
  },
  {
    id: '4',
    title:  'School Management Dashboard',
    description: 'A beautiful weather application with location-based forecasts and data visualization.',
    image: 'https://miro.medium.com/v2/resize:fit:1358/0*JRwtb9P5C-gk5ZSw',
    technologies: ['React', 'Chart.js', 'OpenWeather API', 'Tailwind'],
    demoUrl: 'https://kides-heaven.netlify.app/',
    githubUrl: 'https://github.com/ideastextile',
    featured: false,
    category: 'Web Development',
    completedDate: '2024-03-25',
    status: 'completed',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-25T00:00:00Z',
  },
];

export const getProjects = (): Project[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with default projects if none exist
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects));
    return defaultProjects;
  } catch (error) {
    console.error('Error loading projects:', error);
    return defaultProjects;
  }
};

export const saveProjects = (projects: Project[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error('Error saving projects:', error);
  }
};

export const addProject = (projectData: ProjectFormData): Project => {
  const projects = getProjects();
  const newProject: Project = {
    ...projectData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  const updatedProjects = [...projects, newProject];
  saveProjects(updatedProjects);
  return newProject;
};

export const updateProject = (id: string, projectData: ProjectFormData): Project | null => {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  const updatedProject: Project = {
    ...projects[index],
    ...projectData,
    updatedAt: new Date().toISOString(),
  };
  
  projects[index] = updatedProject;
  saveProjects(projects);
  return updatedProject;
};

export const deleteProject = (id: string): boolean => {
  const projects = getProjects();
  const filteredProjects = projects.filter(p => p.id !== id);
  
  if (filteredProjects.length === projects.length) return false;
  
  saveProjects(filteredProjects);
  return true;
};

export const toggleFeatured = (id: string): boolean => {
  const projects = getProjects();
  const project = projects.find(p => p.id === id);
  
  if (!project) return false;
  
  project.featured = !project.featured;
  project.updatedAt = new Date().toISOString();
  saveProjects(projects);
  return true;
};
