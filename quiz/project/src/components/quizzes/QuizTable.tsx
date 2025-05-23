import React from 'react';
import { Edit, Trash2, Copy } from 'lucide-react';

export type Quiz = {
  id: string;
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
  createdAt: string;
};

type QuizTableProps = {
  quizzes: Quiz[];
  onEdit: (quiz: Quiz) => void;
  onDelete: (quizId: string) => void;
  onDuplicate: (quiz: Quiz) => void;
};

export const QuizTable: React.FC<QuizTableProps> = ({
  quizzes,
  onEdit,
  onDelete,
  onDuplicate,
}) => {
  const getDifficultyClass = (difficulty: Quiz['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Title</th>
            <th scope="col" className="px-6 py-3">Category</th>
            <th scope="col" className="px-6 py-3">Difficulty</th>
            <th scope="col" className="px-6 py-3">Questions</th>
            <th scope="col" className="px-6 py-3">Created Date</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">{quiz.title}</td>
              <td className="px-6 py-4">{quiz.category}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyClass(quiz.difficulty)}`}>
                  {quiz.difficulty}
                </span>
              </td>
              <td className="px-6 py-4">{quiz.questionCount}</td>
              <td className="px-6 py-4">{quiz.createdAt}</td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEdit(quiz)}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="Edit quiz"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDuplicate(quiz)}
                    className="text-amber-600 hover:text-amber-900"
                    title="Duplicate quiz"
                  >
                    <Copy size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(quiz.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete quiz"
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