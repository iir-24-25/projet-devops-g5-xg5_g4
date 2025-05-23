import React , { useState }from 'react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Check, X, Trophy, Download, Home } from 'lucide-react';
import axios from 'axios';
import { useEffect } from 'react';



const QuizResults: React.FC = () => {
  const { recentQuizzes } = useAppContext();
  const navigate = useNavigate();
  
  // Get the most recent quiz
  const latestQuiz = recentQuizzes[0];
  
  if (!latestQuiz) {
    navigate('/quizzes');
    return null;
  }
  
  const correctAnswers = Math.round((latestQuiz.score / 100) * latestQuiz.totalQuestions);
  const incorrectAnswers = latestQuiz.totalQuestions - correctAnswers;


  const [isSubmitting, setIsSubmitting] = useState(false);

const saveQuizResult = async () => {
    if (isSubmitting) return;

    try {
        setIsSubmitting(true); // Désactiver le bouton
        const userId = localStorage.getItem("userId");
        if (!userId) {
            console.error("❌ User ID not found in localStorage");
            return;
        }

        const resultData = {
            user: { id: Number(userId) },
            quizTitle: latestQuiz.quizTitle,
            score: latestQuiz.score,
            correctAnswers: correctAnswers,
            incorrectAnswers: incorrectAnswers,
            totalQuestions: latestQuiz.totalQuestions,
            status: 'completed',
            timeSpent: latestQuiz.timeSpent,
            dateCompleted: new Date().toLocaleDateString('fr-CA'), // Format: YYYY-MM-DD
        };

        console.log("📊 Data to save:", resultData);
        await axios.post("http://localhost:8080/api/quiz-results/save", resultData);
        console.log("✅ Quiz result saved successfully!");
        setIsSubmitting(false); // Réactiver le bouton
    } catch (error: unknown) {
        setIsSubmitting(false); // Réactiver le bouton même en cas d'erreur
        
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


  
  






  
  
  
  
  // Calculate performance message based on score
  const getPerformanceMessage = (score: number) => {
    if (score >= 90) return 'Excellent! You mastered this quiz.';
    if (score >= 70) return 'Great job! You performed well.';
    if (score >= 50) return 'Good effort! Keep practicing to improve.';
    return 'Keep going! With more practice, you\'ll improve your score.';
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary-100 text-primary-600 mb-4">
          <Trophy size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
        <p className="text-gray-600">{getPerformanceMessage(latestQuiz.score)}</p>
      </div>
      
      <div className="flex justify-center mb-8">
        <div className="grid grid-cols-3 gap-6 w-full max-w-md">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">{latestQuiz.score}%</p>
            <p className="text-sm text-gray-500">Your Score</p>
          </div>
          
          <div className="bg-success-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-success-600">{correctAnswers}</p>
            <p className="text-sm text-gray-500">Correct</p>
          </div>
          
          <div className="bg-error-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-error-600">{incorrectAnswers}</p>
            <p className="text-sm text-gray-500">Incorrect</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-8">
        <h3 className="font-medium text-gray-800 mb-3">Quiz Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Quiz Title:</span>
            <span className="text-gray-800 font-medium">{latestQuiz.quizTitle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date Completed:</span>
            <span className="text-gray-800">{latestQuiz.dateCompleted}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time Spent:</span>
            <span className="text-gray-800">{latestQuiz.timeSpent} minutes</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Questions:</span>
            <span className="text-gray-800">{latestQuiz.totalQuestions}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          <Home size={18} />
          Back to Dashboard
        </button>
        <button
          onClick={() => navigate('/quizzes')}
          className="flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          <Download size={18} />
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default QuizResults;