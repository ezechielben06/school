
import { User, Course, Grade, Resource } from './types';

export const MOCK_STUDENT: User = {
  id: 'std-1',
  name: 'Alex Johnson',
  email: 'alex.j@scholar.edu',
  role: 'student',
  avatar: 'https://picsum.photos/seed/std1/200/200'
};

export const MOCK_PROFESSOR: User = {
  id: 'prof-1',
  name: 'Dr. Sarah Mitchell',
  email: 's.mitchell@scholar.edu',
  role: 'professor',
  avatar: 'https://picsum.photos/seed/prof1/200/200'
};

export const MOCK_COURSES: Course[] = [
  { id: 'c-1', name: 'Advanced Mathematics', code: 'MATH401', professorId: 'prof-1', description: 'Advanced calculus and linear algebra.' },
  { id: 'c-2', name: 'Intro to AI', code: 'CS302', professorId: 'prof-1', description: 'Fundamentals of machine learning and neural networks.' },
  { id: 'c-3', name: 'Physics I', code: 'PHYS101', professorId: 'prof-2', description: 'Classical mechanics and thermodynamics.' }
];

export const MOCK_GRADES: Grade[] = [
  { id: 'g-1', studentId: 'std-1', courseId: 'c-1', courseName: 'Advanced Mathematics', topic: 'Calculus', score: 65, maxScore: 100, date: '2024-03-10' },
  { id: 'g-2', studentId: 'std-1', courseId: 'c-1', courseName: 'Advanced Mathematics', topic: 'Linear Algebra', score: 88, maxScore: 100, date: '2024-03-15' },
  { id: 'g-3', studentId: 'std-1', courseId: 'c-2', courseName: 'Intro to AI', topic: 'Neural Networks', score: 45, maxScore: 100, date: '2024-03-12' },
  { id: 'g-4', studentId: 'std-1', courseId: 'c-2', courseName: 'Intro to AI', topic: 'Data Processing', score: 92, maxScore: 100, date: '2024-03-18' }
];

export const MOCK_RESOURCES: Resource[] = [
  { id: 'r-1', courseId: 'c-1', title: 'Calculus Cheat Sheet', type: 'document', url: '#', category: 'Handouts', uploadedAt: '2024-03-01' },
  { id: 'r-2', courseId: 'c-2', title: 'Understanding Transformers', type: 'video', url: '#', category: 'Lectures', uploadedAt: '2024-03-05' },
  { id: 'r-3', courseId: 'c-1', title: 'Integration Practice Problems', type: 'document', url: '#', category: 'Exercises', uploadedAt: '2024-03-08' }
];
