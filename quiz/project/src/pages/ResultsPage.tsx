import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { DownloadCloud, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const ResultsPage: React.FC = () => {
  const { recentQuizzes, setRecentQuizzes } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };


// Récupérer les résultats depuis la base de données
// Récupérer les résultats depuis la base de données
const fetchResults = async () => {
  try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
          console.error("❌ User ID not found in localStorage");
          navigate('/login');  // Redirection vers la page de connexion
          return;
      }

      const response = await axios.get(`http://localhost:8080/api/quiz-results/user/${Number(userId)}`);
      setRecentQuizzes(response.data);
      setLoading(false);
  } catch (error) {
      console.error("❌ Error fetching quiz results:", error);
      setLoading(false);
  }
};

// Utilisation de useEffect pour vérifier l'authentification
useEffect(() => {
  fetchResults();
}, []);


  if (loading) {
    return <p className="text-center">Loading quiz results...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Results</h1>

      {recentQuizzes.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Quiz</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Date</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Score</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Duration</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="py-3 px-4 text-right text-sm font-medium text-gray-600">Certificate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentQuizzes.map((quiz) => (
                  <tr key={quiz.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-800">{quiz.quizTitle}</div>
                      <div className="text-xs text-gray-500">{quiz.totalQuestions} questions</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(quiz.dateCompleted)}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className={`font-medium ${quiz.score >= 70 ? 'text-success-600' : 'text-error-600'}`}>
                        {quiz.score}%
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center text-gray-600">
                        <Clock size={14} className="mr-1" />
                        {quiz.timeSpent} min
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className={`flex items-center ${quiz.status === 'completed' ? 'text-success-600' : 'text-warning-600'}`}>
                        {quiz.status === 'completed' ? <CheckCircle size={14} className="mr-1" /> : <XCircle size={14} className="mr-1" />}
                        {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {quiz.score >= 70 ? (
                        <button className="flex items-center text-primary-600 hover:text-primary-700 font-medium">
                          <DownloadCloud size={14} className="mr-1" />
                          Download
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm">Unavailable</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
          <h3 className="text-lg font-medium text-gray-800 mb-2">No quiz results yet</h3>
          <p className="text-gray-600 mb-4">Take some quizzes to see your results here.</p>
          <button
            onClick={() => navigate('/quizzes')}
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Browse Quizzes
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
