import React from 'react';
import { Bell, LogOut, Palette, BookOpen } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <div className="flex items-center text-primary-600 font-bold text-xl">
          <BookOpen className="mr-2" />
          <span>EduQuiz</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 bg-error-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </button>
        
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Palette size={20} />
        </button>
        
        <div className="border-l border-gray-200 h-6 mx-2"></div>
        
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold uppercase">
          {user.name?.charAt(0)}
          </div>
          <span className="ml-2 font-medium hidden sm:block">{user.name}</span>
        </div>
        
        <button  onClick={handleLogout} className="p-2 text-gray-600 hover:text-error-500 hover:bg-error-50 rounded-full transition-colors flex items-center gap-1">
          <LogOut size={18} />
          <span className="text-sm font-medium hidden sm:block">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;