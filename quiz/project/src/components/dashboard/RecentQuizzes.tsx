import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, FileCheck, CheckCircle, XCircle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const RecentQuizzes: React.FC = () => {
  const { recentQuizzes } = useAppContext();
  const navigate = useNavigate();

  const formatDate = (dateString: string | undefined | null) => {
    try {
      if (!dateString) return "Date inconnue";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) throw new Error("Invalid Date");
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    } catch (error) {
      console.error("❌ Erreur de formatage de la date:", dateString);
      return "Date invalide";
    }
  };
  

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Recent Quizzes</h3>
        <button 
          onClick={() => navigate('/results')}
          className="text-primary-600 text-sm hover:text-primary-700 font-medium"
        >
          View all
        </button>
      </div>
      
      <div className="space-y-3">
        {recentQuizzes.slice(0, 4).map((quiz) => (
          <div 
            key={quiz.id} 
            className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="mr-3 flex-none">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                quiz.score >= 70 ? 'bg-success-100 text-success-600' : 'bg-error-100 text-error-600'
              }`}>
                {quiz.score >= 70 ? <CheckCircle size={20} /> : <XCircle size={20} />}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-800 truncate">{quiz.quizTitle}</h4>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="flex items-center">
                  <FileCheck size={12} className="mr-1" />
                  {quiz.totalQuestions} questions
                </div>
                <div className="flex items-center">
                  <Clock size={12} className="mr-1" />
                  {quiz.timeSpent} min
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-sm font-medium ${
                quiz.score >= 70 ? 'text-success-600' : 'text-error-600'
              }`}>
                {quiz.score}%
              </div>
              <div className="text-xs text-gray-500">{formatDate(quiz.dateCompleted)}</div>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={() => navigate('/quizzes')}
        className="mt-4 w-full bg-primary-50 hover:bg-primary-100 text-primary-600 font-medium py-2 rounded-lg transition-colors"
      >
        Take a New Quiz
      </button>
    </div>
  );
};

export default RecentQuizzes;