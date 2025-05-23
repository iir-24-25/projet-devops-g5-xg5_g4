import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';

import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import QuizzesPage from './pages/QuizzesPage';
import ResultsPage from './pages/ResultsPage';
import SettingsPage from './pages/SettingsPage';
import QuizPage from './pages/QuizPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminRouter from './pages/AdminRouter';
import ProtectedAdminRoute from './pages/ProtectedAdminRoute';
import AdminLoginPage from './pages/LoginPageAdmin';

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();

  const isAuthenticated = !!user && !!user.name;

  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/login" element={<LoginPage onSignupClick={() => navigate('/signup')} onLoginSuccess={() => navigate('/')} />} />
      <Route path="/signup" element={<SignupPage onLoginClick={() => navigate('/login')} />} />

      {/* Routes admin sécurisées */}
      <Route path="/admin-login" element={<AdminLoginPage />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedAdminRoute>
            <AdminRouter />
          </ProtectedAdminRoute>
        }
      />

      {/* Routes protégées */}
      {isAuthenticated ? (
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/quizzes" element={<QuizzesPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/quiz/:quizId" element={<QuizPage />} />
            </Routes>
          </Layout>
        } />
      ) : (
        // Redirection par défaut si non authentifié
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
};

export default App;
