
import { User, Course, Grade, Resource } from './types';

export const MOCK_STUDENT: User = {
  id: 'std-1',
  name: 'Alex Johnson',
  email: 'alex.j@scholar.edu',
  role: 'student',
  avatar: 'https://picsum.photos/seed/alex/200/200'
};

export const MOCK_PROFESSOR: User = {
  id: 'prof-1',
  name: 'Dr. Sarah Mitchell',
  email: 's.mitchell@scholar.edu',
  role: 'professor',
  avatar: 'https://picsum.photos/seed/prof-mitchell/200/200'
};

export const MOCK_COURSES: Course[] = [
  { 
    id: 'c-1', 
    name: 'Mathématiques Avancées', 
    code: 'MATH401', 
    professorId: 'prof-1', 
    description: 'Calcul différentiel complexe et algèbre linéaire appliquée aux systèmes dynamiques.',
    imageUrl: 'https://picsum.photos/seed/math-bg/800/400'
  },
  { 
    id: 'c-2', 
    name: 'Intelligence Artificielle', 
    code: 'CS302', 
    professorId: 'prof-1', 
    description: 'Fondamentaux de l\'apprentissage automatique et architectures de réseaux de neurones profonds.',
    imageUrl: 'https://picsum.photos/seed/ai-bg/800/400'
  },
  { 
    id: 'c-3', 
    name: 'Physique Quantique', 
    code: 'PHYS101', 
    professorId: 'prof-2', 
    description: 'Introduction aux principes de la mécanique quantique et de la thermodynamique statistique.',
    imageUrl: 'https://picsum.photos/seed/physics-bg/800/400'
  },
  { 
    id: 'c-4', 
    name: 'Design d\'Interface UI/UX', 
    code: 'DSGN200', 
    professorId: 'prof-3', 
    description: 'Principes fondamentaux du design centré sur l\'utilisateur et prototypage haute fidélité.',
    imageUrl: 'https://picsum.photos/seed/design-bg/800/400'
  }
];

export const MOCK_GRADES: Grade[] = [
  { id: 'g-1', studentId: 'std-1', courseId: 'c-1', courseName: 'Mathématiques Avancées', topic: 'Intégrales Multiples', score: 65, maxScore: 100, date: '10 Mars 2024' },
  { id: 'g-2', studentId: 'std-1', courseId: 'c-1', courseName: 'Mathématiques Avancées', topic: 'Algèbre Linéaire', score: 88, maxScore: 100, date: '15 Mars 2024' },
  { id: 'g-3', studentId: 'std-1', courseId: 'c-2', courseName: 'Intelligence Artificielle', topic: 'Réseaux Convolutionnels', score: 45, maxScore: 100, date: '12 Mars 2024' },
  { id: 'g-4', studentId: 'std-1', courseId: 'c-2', courseName: 'Intelligence Artificielle', topic: 'Préparation des Données', score: 92, maxScore: 100, date: '18 Mars 2024' },
  { id: 'g-5', studentId: 'std-1', courseId: 'c-3', courseName: 'Physique Quantique', topic: 'Effet Photoélectrique', score: 76, maxScore: 100, date: '20 Mars 2024' },
  { id: 'g-6', studentId: 'std-1', courseId: 'c-4', courseName: 'Design d\'Interface', topic: 'Théorie des Couleurs', score: 95, maxScore: 100, date: '22 Mars 2024' }
];

const generateResources = (): Resource[] => {
  const types: ('document' | 'video' | 'link')[] = ['document', 'video', 'link'];
  const categories = ['Lectures', 'Exercices', 'Projets', 'Maths', 'Ressources UI', 'Handouts', 'Pratique'];
  const resources: Resource[] = [];

  for (let i = 1; i <= 50; i++) {
    const courseId = `c-${(i % 4) + 1}`;
    const type = types[i % 3];
    const category = categories[i % categories.length];
    
    resources.push({
      id: `res-${i}`,
      courseId,
      title: `Ressource Pédagogique #${i}: ${category} Approfondi`,
      type,
      url: '#',
      category,
      uploadedAt: `${(i % 28) + 1} Mars 2024`,
      imageUrl: `https://picsum.photos/seed/resource-${i}/400/300`
    });
  }
  return resources;
};

export const MOCK_RESOURCES: Resource[] = generateResources();

export const MOCK_ACTIVITIES = [
  { id: 1, user: 'Maria Garcia', action: 'a partagé une nouvelle ressource', target: 'Intro to UI Design', time: 'il y a 5 min', avatar: 'https://picsum.photos/seed/maria/100/100' },
  { id: 2, user: 'Dr. Mitchell', action: 'a publié les notes du quiz', target: 'Intelligence Artificielle', time: 'il y a 20 min', avatar: 'https://picsum.photos/seed/sarah/100/100' },
  { id: 3, user: 'Kevin Lee', action: 'a rejoint le groupe de travail', target: 'Physics Study Group', time: 'il y a 1h', avatar: 'https://picsum.photos/seed/kevin/100/100' },
  { id: 4, user: 'Système AI', action: 'a généré des suggestions pour vous', target: 'Mathématiques', time: 'il y a 2h', avatar: 'https://picsum.photos/seed/ai/100/100' }
];

export const MOCK_UPCOMING_EVENTS = [
  { id: 1, title: 'Quiz IA', time: '14:00 - 15:30', date: 'Aujourd\'hui', course: 'CS302', type: 'exam' },
  { id: 2, title: 'Cours de Maths', time: '09:00 - 11:00', date: 'Demain', course: 'MATH401', type: 'lecture' },
  { id: 3, title: 'Atelier UI/UX', time: '16:00 - 18:00', date: 'Mercredi', course: 'DSGN200', type: 'workshop' }
];
