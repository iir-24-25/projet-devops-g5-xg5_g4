import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import QuizQuestion from '../components/quiz/QuizQuestion';
import QuizResults from '../components/quiz/QuizResults';

const QuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const { activeQuiz, startQuiz, recentQuizzes } = useAppContext();
  
  useEffect(() => {
    if (quizId) {
      startQuiz(quizId); 
    }
  }, [quizId]); // 🛠️ Ne PAS écouter activeQuiz ici

  if (!activeQuiz && recentQuizzes.length > 0) {
    return <QuizResults />; // ✅ Affiche page résultat
  }

  if (!activeQuiz) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="animate-pulse-slow inline-block h-16 w-16 rounded-full bg-primary-100 mb-4 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-primary-500"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Quiz...</h2>
          <p className="text-gray-600">Please wait while we prepare your quiz.</p>
        </div>
      </div>
    );
  }
  
  return <QuizQuestion />; // ✅ Affiche le quiz normalement
};

export default QuizPage;
