import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Buttonadmin';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Cardadmin';
import type { Quiz } from './QuizTable';

type QuizFormProps = {
  quiz?: Quiz;
  onSubmit: (quizData: Omit<Quiz, 'id' | 'createdAt'> & { id?: string }) => void;
  onCancel: () => void;
};

export const QuizForm: React.FC<QuizFormProps> = ({ 
  quiz, 
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    title: quiz?.title || '',
    category: quiz?.category || '',
    difficulty: quiz?.difficulty || 'medium',
    questionCount: quiz?.questionCount || 10,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'questionCount' ? parseInt(value) || 0 : value 
    }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    if (formData.questionCount <= 0) {
      newErrors.questionCount = 'Question count must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        id: quiz?.id,
      });
    }
  };

  const isEditMode = !!quiz;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{isEditMode ? 'Edit Quiz' : 'Create New Quiz'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              error={errors.category}
            />
          </div>
          
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty
            </label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="questionCount" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Questions
            </label>
            <Input
              id="questionCount"
              name="questionCount"
              type="number"
              min="1"
              value={formData.questionCount}
              onChange={handleChange}
              error={errors.questionCount}
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isEditMode ? 'Update Quiz' : 'Create Quiz'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};