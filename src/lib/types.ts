
export type Role = 'student' | 'professor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  professorId: string;
  description: string;
  imageUrl?: string;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  courseName: string;
  topic: string;
  score: number;
  maxScore: number;
  date: string;
}

export interface Resource {
  id: string;
  courseId: string;
  title: string;
  type: 'document' | 'video' | 'link';
  url: string;
  category: string;
  uploadedAt: string;
  imageUrl?: string;
}
