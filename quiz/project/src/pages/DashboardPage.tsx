import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import UserProfile from '../components/dashboard/UserProfile';
import SummaryCards from '../components/dashboard/SummaryCards';
import ProgressChart from '../components/dashboard/ProgressChart';
import RecentQuizzes from '../components/dashboard/RecentQuizzes';

const DashboardPage: React.FC = () => {
  const { user } = useAppContext();

  // 🔐 Redirection vers login si utilisateur non connecté
  if (!user || !user.name) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-1">
          <UserProfile />
        </div>
        <div className="lg:col-span-3">
          <SummaryCards />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ProgressChart variant="line" />
        <ProgressChart variant="doughnut" />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <RecentQuizzes />
      </div>
    </div>
  );
};

export default DashboardPage;
