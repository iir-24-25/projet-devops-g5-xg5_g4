import { User, QuizAttempt } from '../types';

export const user: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
  educationLevel: 'University',
  progress: 'Intermediate',
  totalScore: 1250,
  completedQuizzes: 12,
  timeSpent: 24.5,
};

export const recentQuizzes: QuizAttempt[] = [
  {
    id: '1',
    quizId: '101',
    title: 'Data Structures Fundamentals',
    date: '2025-05-15',
    score: 85,
    totalQuestions: 20,
    timeSpent: 18,
    status: 'completed',
  },
  {
    id: '2',
    quizId: '102',
    title: 'Advanced Algorithms',
    date: '2025-05-10',
    score: 92,
    totalQuestions: 20,
    timeSpent: 15,
    status: 'completed',
  },
  {
    id: '3',
    quizId: '103',
    title: 'System Design Principles',
    date: '2025-05-05',
    score: 78,
    totalQuestions: 20,
    timeSpent: 20,
    status: 'completed',
  },
  {
    id: '4',
    quizId: '104',
    title: 'Web Development Basics',
    date: '2025-04-28',
    score: 88,
    totalQuestions: 20,
    timeSpent: 16,
    status: 'completed',
  },
];

export const monthlyProgress = [
  { month: 'Jan', score: 650 },
  { month: 'Feb', score: 720 },
  { month: 'Mar', score: 800 },
  { month: 'Apr', score: 920 },
  { month: 'May', score: 1250 },
];