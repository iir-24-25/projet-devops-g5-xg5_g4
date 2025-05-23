import React from 'react';
import { Trophy, Clock, BookOpen, Award } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const SummaryCards: React.FC = () => {
  const { user } = useAppContext();

  const cards = [
    {
      title: 'Total Score',
      value: user.averageScore,
      icon: <Trophy size={24} className="text-accent-500" />,
      color: 'bg-gradient-to-r from-accent-50 to-accent-100',
      textColor: 'text-accent-700',
    },
    {
      title: 'Completed Quizzes',
      value: user.quizzesTaken,
      icon: <BookOpen size={24} className="text-primary-500" />,
      color: 'bg-gradient-to-r from-primary-50 to-primary-100',
      textColor: 'text-primary-700',
    },
    {
      title: 'Time Spent',
      value: `${user.timeSpent}h`,
      icon: <Clock size={24} className="text-secondary-500" />,
      color: 'bg-gradient-to-r from-secondary-50 to-secondary-100',
      textColor: 'text-secondary-700',
    },
    {
      title: 'Achievement Rank',
      value: 'Gold',
      icon: <Award size={24} className="text-warning-500" />,
      color: 'bg-gradient-to-r from-warning-50 to-warning-100',
      textColor: 'text-warning-700',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className={`rounded-xl p-4 shadow-sm border border-gray-100 ${card.color} transition-transform hover:scale-105 cursor-pointer`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm">{card.title}</p>
              <p className={`text-2xl font-bold mt-1 ${card.textColor}`}>{card.value}</p>
            </div>
            <div className="bg-white p-2 rounded-lg shadow-sm">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;