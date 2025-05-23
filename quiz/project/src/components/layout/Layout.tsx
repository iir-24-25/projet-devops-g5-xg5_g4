import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Header from './Header';
import Sidebar from './Sidebar';
import { Home, LayoutDashboard, BookOpen, BarChart2, Settings } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAppContext();

  // ✅ Redirige vers /login si l'utilisateur est vide ou non connecté
  if (!user || !user.name) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 hidden md:block">
          <Sidebar />
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 flex justify-around">
        <NavButton to="/" icon={<Home size={20} />} />
        <NavButton to="/dashboard" icon={<LayoutDashboard size={20} />} />
        <NavButton to="/quizzes" icon={<BookOpen size={20} />} />
        <NavButton to="/results" icon={<BarChart2 size={20} />} />
        <NavButton to="/settings" icon={<Settings size={20} />} />
      </div>
    </div>
  );
};

import { NavLink } from 'react-router-dom';

interface NavButtonProps {
  to: string;
  icon: ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ to, icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `p-2 rounded-lg ${isActive ? 'text-primary-600 bg-primary-50' : 'text-gray-500'}`
      }
    >
      {icon}
    </NavLink>
  );
};

export default Layout;
