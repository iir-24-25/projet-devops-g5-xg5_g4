import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';
import { User, Quiz, QuizAttempt, Question } from '../types';
//import { useNavigate } from 'react-router-dom';

interface AppContextProps {
  user: User;
  users: User[]; // ✅ Ajouter ici
  setUsers: React.Dispatch<React.SetStateAction<User[]>>; // ✅ Ajouter ici
  recentQuizzes: QuizAttempt[];
  setRecentQuizzes: React.Dispatch<React.SetStateAction<QuizAttempt[]>>;
  availableQuizzes: Quiz[];
  activeQuiz: Quiz | null;
  currentQuestionIndex: number;
  userAnswers: number[];
  setActiveQuiz: (quiz: Quiz | null) => void;
  startQuiz: (quizId: string) => Promise<void>;
  answerQuestion: (questionIndex: number, answerIndex: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitQuiz: () => void;
  setUser: (user: User) => void;
  reloadUsers: () => Promise<void>; // ✅ Ajouter ici
  logout: () => void;
}


const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : {} as User;
  });

  const [recentQuizzes, setRecentQuizzes] = useState<QuizAttempt[]>([]);
  const [availableQuizzes, setAvailableQuizzes] = useState<Quiz[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [users, setUsers] = useState<User[]>([]);


  // Charger les quizzes disponibles au démarrage
  useEffect(() => {
    fetchAvailableQuizzes();
  }, []);
  

  const fetchAvailableQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/quizzes');
      setAvailableQuizzes(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des quizzes:', error);
    }
  };

  
  

  // Démarrer un quiz
  const startQuiz = async (quizId: string) => {
    try {
      const quizInfo = availableQuizzes.find(q => q.id.toString() === quizId);
      if (!quizInfo) {
        console.error('Quiz non trouvé');
        return;
      }

      const response = await axios.get(`http://localhost:8080/api/quizzes/${quizId}/questions`);
      const questions: Question[] = response.data;

      if (!questions.length) {
        console.error('Pas de questions trouvées pour ce quiz');
        return;
      }

      const fullQuiz: Quiz = {
        ...quizInfo,
        questions,
      };

      setActiveQuiz(fullQuiz);
      setCurrentQuestionIndex(0);
      setUserAnswers(new Array(questions.length).fill(-1));
    } catch (error) {
      console.error('Erreur lors du démarrage du quiz:', error);
    }
  };

  const answerQuestion = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (activeQuiz && currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Fonction de déconnexion
// AppContext.tsx
const logout = () => {
  localStorage.removeItem('userId');   // Supprime l'ID de l'utilisateur
  localStorage.removeItem('token');    // Supprime le token JWT
  localStorage.removeItem('user');     // Supprime l'objet utilisateur complet
  setUser({} as User);                 // Réinitialise l'utilisateur dans le contexte
};

 // Fonction pour enregistrer les résultats du quiz dans la base de données
const saveQuizResult = async (quizResult: QuizAttempt) => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("❌ User ID not found in localStorage");
      return;
    }

    const resultData = {
      user: { id: Number(userId) },
      quizTitle: quizResult.quizTitle,
      score: quizResult.score,
      correctAnswers: Math.round((quizResult.score / 100) * quizResult.totalQuestions),
      incorrectAnswers: quizResult.totalQuestions - Math.round((quizResult.score / 100) * quizResult.totalQuestions),
      totalQuestions: quizResult.totalQuestions,
      status: 'completed',
      timeSpent: quizResult.timeSpent,
      dateCompleted: quizResult.dateCompleted,
    };

    console.log("📊 Data to save:", resultData);
    await axios.post("http://localhost:8080/api/quiz-results/save", resultData);
    console.log("✅ Quiz result saved successfully!");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 409) {
        console.error("❌ Quiz result already exists for this user and date.");
        alert("Le résultat du quiz existe déjà pour cet utilisateur et cette date.");
      } else {
        console.error("❌ Axios error occurred:", error.message);
      }
    } else {
      console.error("❌ Unexpected error:", String(error));
    }
  }
};


  // Soumettre le quiz
  const submitQuiz = async () => {
  if (!activeQuiz) return;

  const score = userAnswers.reduce((total, answer, index) => {
    return total + (answer === activeQuiz.questions[index].correctAnswer ? 1 : 0);
  }, 0);

  const percentage = Math.round((score / activeQuiz.questions.length) * 100);

  const newAttempt: QuizAttempt = {
    id: Date.now().toString(),
    quizId: activeQuiz.id.toString(),
    quizTitle: activeQuiz.title,
    dateCompleted: new Date().toISOString().split('T')[0],
    score: percentage,
    totalQuestions: activeQuiz.questions.length,
    timeSpent: Math.floor(Math.random() * 10) + 10,
    status: 'completed',
  };

  try {
    await saveQuizResult(newAttempt); 
    setRecentQuizzes([newAttempt, ...recentQuizzes]);

    // ✅ Mise à jour des informations de l'utilisateur
    const updatedUser = {
      ...user,
      quizzesTaken: (user.quizzesTaken || 0) + 1,
      averageScore: ((user.averageScore || 0) * (user.quizzesTaken || 0) + percentage) / ((user.quizzesTaken || 0) + 1),
      lastQuizDate: new Date().toISOString().split('T')[0],
    };
    


    // ✅ Enregistrer dans la base de données
    await axios.put(`http://localhost:8080/api/users/${user.id}`, updatedUser);
    setUser(updatedUser);
    await reloadUsers();
    console.log("✅ Utilisateur mis à jour :", updatedUser);

  } catch (error) {
    console.error("Erreur lors de l'enregistrement du quiz:", error);
  }

  setActiveQuiz(null);
  setCurrentQuestionIndex(0);
  setUserAnswers([]);
};
const reloadUsers = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/users');
    setUsers(response.data);
    console.log("✅ Utilisateurs rechargés :", response.data);
  } catch (error) {
    console.error("Erreur lors du rechargement des utilisateurs :", error);
  }
};






  return (
    <AppContext.Provider
      value={{
        user,
        users,           // ✅ Ajouter ici
        setUsers,        // ✅ Ajouter ici
        recentQuizzes,
        setRecentQuizzes,
        availableQuizzes,
        activeQuiz,
        currentQuestionIndex,
        userAnswers,
        setActiveQuiz,
        startQuiz,
        answerQuestion,
        nextQuestion,
        previousQuestion,
        submitQuiz,
        setUser,
        reloadUsers,// ✅ Ajouter ici
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
