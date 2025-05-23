export interface User {
  averageScore: number;
  quizzesTaken: number;
  id: string;
  name: string;
  email: string;
  joinedDate?: string;
  avatar: string;
  educationLevel: string;
  progress: string;
  totalScore: number;
  completedQuizzes: number;
  timeSpent: number; // in hours
  lastQuizDate?: string;  // ✅ Propriété optionnelle

}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: Question[];
  timeLimit: number; // in minutes
  questionCount?: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  dateCompleted: string;
  score: number;
  totalQuestions: number;
  timeSpent: number; // in minutes
  status: 'completed' | 'in-progress';
}

