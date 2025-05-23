import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Award, Users, BarChart } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Welcome to the EduQuiz Learning Platform
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Enhance your knowledge with interactive quizzes and track your progress
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate('/quizzes')}
            className="bg-white hover:bg-gray-50 text-primary-600 border border-primary-300 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Start a Quiz
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          {
            icon: <BookOpen className="h-10 w-10 text-primary-500" />,
            title: 'Interactive Quizzes',
            description: 'Test your knowledge with engaging quizzes on various topics',
          },
          {
            icon: <BarChart className="h-10 w-10 text-secondary-500" />,
            title: 'Progress Tracking',
            description: 'Monitor your performance and growth over time',
          },
          {
            icon: <Award className="h-10 w-10 text-accent-500" />,
            title: 'Earn Certificates',
            description: 'Get recognized for your achievements with certificates',
          },
          {
            icon: <Users className="h-10 w-10 text-success-500" />,
            title: 'Community Learning',
            description: 'Connect with other learners to enhance your experience',
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="bg-gray-50 rounded-full h-16 w-16 flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 mb-12">
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 py-10 px-6 md:px-10 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Test Your Knowledge?</h2>
          <p className="mb-6 text-white text-opacity-90 max-w-lg">
            Our quizzes are designed to challenge and improve your understanding.
            Each quiz has 20 questions to thoroughly test your knowledge.
          </p>
          <button
            onClick={() => navigate('/quizzes')}
            className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Browse Quizzes
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-y md:divide-y-0 divide-gray-100">
          {[
            { value: '1000+', label: 'Questions' },
            { value: '50+', label: 'Quiz Topics' },
            { value: '10k+', label: 'Active Users' },
          ].map((stat, index) => (
            <div key={index} className="p-8 text-center">
              <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;