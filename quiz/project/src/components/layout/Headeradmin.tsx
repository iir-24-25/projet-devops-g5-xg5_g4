import React, { useState, useEffect } from 'react';
import { Bell, Search } from 'lucide-react';
import { Input } from '../ui/Input';

export const Header: React.FC = () => {
  const [adminName, setAdminName] = useState<string>('Admin User');

  // Charger le nom de l'admin depuis le localStorage
  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      try {
        const admin = JSON.parse(storedAdmin);
        if (admin && admin.name) {
          setAdminName(admin.name);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l'admin depuis le localStorage:", error);
      }
    }
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center w-64">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Search size={18} />
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-600 transition-colors hover:text-indigo-600 hover:bg-gray-100 rounded-full">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
            <span>{adminName.charAt(0).toUpperCase()}</span>
          </div>
          <div className="ml-2">
            <p className="font-medium text-sm text-gray-800">{adminName}</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};
