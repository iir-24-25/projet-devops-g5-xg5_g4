import React from 'react';
import { Home, LayoutDashboard, BookOpen, BarChart2, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
          isActive 
            ? 'bg-primary-50 text-primary-600 font-medium' 
            : 'text-gray-600 hover:bg-gray-100'
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

const Sidebar: React.FC = () => {
  return (
    <aside className="w-full h-full bg-white border-r border-gray-200 p-4">
      <div className="flex flex-col h-full">
        <div className="space-y-1">
          <SidebarLink to="/" icon={<Home size={20} />} label="Home" />
          <SidebarLink to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <SidebarLink to="/quizzes" icon={<BookOpen size={20} />} label="My Quizzes" />
          <SidebarLink to="/results" icon={<BarChart2 size={20} />} label="Results" />
          <SidebarLink to="/settings" icon={<Settings size={20} />} label="Settings" />
        </div>

        <div className="mt-auto pt-4 border-t border-gray-200">
          <div className="bg-primary-50 rounded-lg p-4">
            <h3 className="font-medium text-primary-700 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-3">
              Access our knowledge base or contact support for assistance.
            </p>
            <button className="w-full bg-white text-primary-600 border border-primary-300 rounded-lg py-2 text-sm font-medium hover:bg-primary-600 hover:text-white transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;