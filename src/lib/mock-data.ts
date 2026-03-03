
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
  { id: 'c-1', name: 'Mathématiques Avancées', code: 'MATH401', professorId: 'prof-1', description: 'Calcul différentiel complexe et algèbre linéaire appliquée aux systèmes dynamiques.' },
  { id: 'c-2', name: 'Intelligence Artificielle', code: 'CS302', professorId: 'prof-1', description: 'Fondamentaux de l\'apprentissage automatique et architectures de réseaux de neurones profonds.' },
  { id: 'c-3', name: 'Physique Quantique', code: 'PHYS101', professorId: 'prof-2', description: 'Introduction aux principes de la mécanique quantique et de la thermodynamique statistique.' },
  { id: 'c-4', name: 'Design d\'Interface UI/UX', code: 'DSGN200', professorId: 'prof-3', description: 'Principes fondamentaux du design centré sur l\'utilisateur et prototypage haute fidélité.' },
  { id: 'c-5', name: 'Économie Numérique', code: 'ECON350', professorId: 'prof-4', description: 'Analyse des marchés digitaux, de la blockchain et des impacts de la tech sur l\'économie globale.' }
];

export const MOCK_GRADES: Grade[] = [
  { id: 'g-1', studentId: 'std-1', courseId: 'c-1', courseName: 'Mathématiques Avancées', topic: 'Intégrales Multiples', score: 65, maxScore: 100, date: '10 Mars 2024' },
  { id: 'g-2', studentId: 'std-1', courseId: 'c-1', courseName: 'Mathématiques Avancées', topic: 'Algèbre Linéaire', score: 88, maxScore: 100, date: '15 Mars 2024' },
  { id: 'g-3', studentId: 'std-1', courseId: 'c-2', courseName: 'Intelligence Artificielle', topic: 'Réseaux Convolutionnels', score: 45, maxScore: 100, date: '12 Mars 2024' },
  { id: 'g-4', studentId: 'std-1', courseId: 'c-2', courseName: 'Intelligence Artificielle', topic: 'Préparation des Données', score: 92, maxScore: 100, date: '18 Mars 2024' },
  { id: 'g-5', studentId: 'std-1', courseId: 'c-3', courseName: 'Physique Quantique', topic: 'Effet Photoélectrique', score: 76, maxScore: 100, date: '20 Mars 2024' },
  { id: 'g-6', studentId: 'std-1', courseId: 'c-4', courseName: 'Design d\'Interface', topic: 'Théorie des Couleurs', score: 95, maxScore: 100, date: '22 Mars 2024' },
  { id: 'g-7', studentId: 'std-1', courseId: 'c-5', courseName: 'Économie Numérique', topic: 'Marchés Cryptos', score: 82, maxScore: 100, date: '25 Mars 2024' }
];

export const MOCK_RESOURCES: Resource[] = [
  { id: 'r-1', courseId: 'c-1', title: 'Aide-mémoire : Calcul Intégral', type: 'document', url: '#', category: 'Handouts', uploadedAt: '01 Mars 2024' },
  { id: 'r-2', courseId: 'c-2', title: 'Comprendre les Transformers', type: 'video', url: '#', category: 'Lectures', uploadedAt: '05 Mars 2024' },
  { id: 'r-3', courseId: 'c-1', title: 'Exercices d\'Entraînement : Algèbre', type: 'document', url: '#', category: 'Exercices', uploadedAt: '08 Mars 2024' },
  { id: 'r-4', courseId: 'c-4', title: 'Guide Figma pour Débutants', type: 'link', url: '#', category: 'Ressources UI', uploadedAt: '12 Mars 2024' },
  { id: 'r-5', courseId: 'c-2', title: 'Dataset : Classification d\'images', type: 'document', url: '#', category: 'Projets', uploadedAt: '15 Mars 2024' },
  { id: 'r-6', courseId: 'c-3', title: 'Physique : Équation de Schrödinger', type: 'video', url: '#', category: 'Lectures', uploadedAt: '18 Mars 2024' }
];

export const MOCK_ACTIVITIES = [
  { id: 1, user: 'Maria Garcia', action: 'a partagé une nouvelle ressource', target: 'Intro to UI Design', time: 'il y a 5 min', avatar: 'https://picsum.photos/seed/maria/100/100' },
  { id: 2, user: 'Dr. Mitchell', action: 'a publié les notes du quiz', target: 'Intelligence Artificielle', time: 'il y a 20 min', avatar: 'https://picsum.photos/seed/sarah/100/100' },
  { id: 3, user: 'Kevin Lee', action: 'a rejoint le groupe de travail', target: 'Physics Study Group', time: 'il y a 1h', avatar: 'https://picsum.photos/seed/kevin/100/100' },
  { id: 4, user: 'Système AI', action: 'a généré des suggestions pour vous', target: 'Mathématiques', time: 'il y a 2h', avatar: 'https://picsum.photos/seed/ai/100/100' },
];
