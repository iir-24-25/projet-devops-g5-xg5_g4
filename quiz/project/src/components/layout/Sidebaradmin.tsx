import React from 'react';
import { 
  Home, 
  Users, 
  FileQuestion, 
  BarChart, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useNavigate } from 'react-router-dom';

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  active = false,
  onClick 
}) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={cn(
          'flex items-center w-full p-2 rounded-md transition-colors',
          active 
            ? 'bg-indigo-100 text-indigo-700' 
            : 'text-gray-600 hover:bg-gray-100'
        )}
      >
        <span className="mr-3">{icon}</span>
        <span>{label}</span>
      </button>
    </li>
  );
};

type SidebarProps = {
  activePage: string;
  onNavigate: (page: string) => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const navigate = useNavigate();
  const iconSize = 20;
  
  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={iconSize} /> },
    { id: 'users', label: 'Users', icon: <Users size={iconSize} /> },
    { id: 'quizzes', label: 'Quizzes', icon: <FileQuestion size={iconSize} /> },
    { id: 'reports', label: 'Reports', icon: <BarChart size={iconSize} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={iconSize} /> },
  ];

  // Fonction de déconnexion
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Supprimer les informations d'authentification admin du localStorage
      localStorage.removeItem('admin');
      localStorage.removeItem('adminToken');
      console.log('✅ Admin logged out');

      // ✅ Rediriger vers la page de connexion admin
      navigate('/admin-login');
    }
  };

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="flex items-center mb-8 pl-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center">
          <span className="text-white font-bold">Q</span>
        </div>
        <span className="ml-2 text-xl font-bold text-gray-800">QuizAdmin</span>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activePage === item.id}
              onClick={() => onNavigate(item.id)}
            />
          ))}
        </ul>
      </nav>
      
      <div className="pt-4 border-t border-gray-200 mt-6">
        <SidebarItem
          icon={<LogOut size={iconSize} />}
          label="Logout"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};