import React, { useState } from 'react';
import { Header } from '../components/layout/Headeradmin';
import { Sidebar } from '../components/layout/Sidebaradmin';
import { HomePage } from './HomePageadmin';
import { UsersPage } from './UsersPageadmin';
import { QuizzesPageadmin } from './QuizzesPageadmin';
import { ReportsPage } from './ReportsPage';
import { SettingsPage } from './SettingsPageadmin';
import AddQuestionsPage from './AddQuestionsPage';
import { EditQuestionsPage } from './EditQuestionsPage';

const AdminRouter: React.FC = () => {
  const [activePage, setActivePage] = useState('home');
  const [currentQuizId, setCurrentQuizId] = useState<string | null>(null);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'users':
        return <UsersPage />;
      case 'quizzes':
        return <QuizzesPageadmin setActivePage={setActivePage} setCurrentQuizId={setCurrentQuizId} />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'add-questions':
        return <AddQuestionsPage quizId={currentQuizId} setActivePage={setActivePage} />;
      case 'edit-questions':
        return <EditQuestionsPage quizId={currentQuizId || ''} setActivePage={setActivePage} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default AdminRouter;
