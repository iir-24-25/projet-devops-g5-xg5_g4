import React from 'react';
import { Clock, BarChart, Award } from 'lucide-react';
import { Quiz } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const { startQuiz } = useAppContext();
  const navigate = useNavigate();

  const handleStartQuiz = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/quizzes/${quiz.id}/questions`);
      const questions = response.data;

      if (questions.length === 0) {
        alert("Ce quiz ne contient pas encore de questions !");
        return;
      }

      // ✅ Convertir l'ID en chaîne pour correspondre au type attendu
      startQuiz(quiz.id.toString());
      navigate(`/quiz/${quiz.id}`); // Redirige l'utilisateur vers le quiz

    } catch (error) {
      console.error('Erreur lors du démarrage du quiz:', error);
      alert("Erreur lors du démarrage du quiz. Essayez plus tard.");
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3"></div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-gray-800 text-lg">{quiz.title}</h3>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(quiz.difficulty)}`}>
            {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4">{quiz.category}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            {quiz.timeLimit ?? 10} min
          </div>
          <div className="flex items-center">
            <BarChart size={16} className="mr-1" />
            {quiz.questions?.length ?? 0} questions
          </div>
          <div className="flex items-center">
            <Award size={16} className="mr-1" />
            100 points
          </div>
        </div>

        <button
          onClick={handleStartQuiz}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 rounded-lg transition-colors"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
