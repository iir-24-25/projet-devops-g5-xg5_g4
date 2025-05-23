import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '../ui/Buttonadmin';
import { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

export type User = {
  id: string;
  name: string;
  email: string;
  joinedDate?: string;
  quizzesTaken: number;
  averageScore: number;
  lastQuizDate?: string;
};

type UserTableProps = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
};




export const UserTable: React.FC<UserTableProps> = ({
  onEdit,
  onDelete,
}) => {
  const { users, reloadUsers, recentQuizzes } = useAppContext();
  useEffect(() => {
  reloadUsers();
}, [recentQuizzes]);
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Quizzes Taken</th>
            <th scope="col" className="px-6 py-3">Avg. Score</th>
            <th scope="col" className="px-6 py-3">Last Quiz</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">
                {user.name}
              </td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.quizzesTaken}</td>
              <td className="px-6 py-4">
                <span className={`font-medium ${
                  user.averageScore >= 80 ? 'text-green-600' :
                  user.averageScore >= 60 ? 'text-amber-600' : 'text-red-600'
                }`}>
                  {Number.isFinite(user.averageScore) ? user.averageScore.toFixed(2):'N/A'}%
                </span>
              </td>
              <td className="px-6 py-4">{user.lastQuizDate}</td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="Edit user"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete user"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
