import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Buttonadmin';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Cardadmin';
import axios from 'axios';
import type { User } from './UserTable';

type UserFormProps = {
  user?: User;
  onSubmit: (userData: Omit<User, 'id' | 'joinedDate'> & { id?: string }) => void;
  onCancel: () => void;
};

export const UserForm: React.FC<UserFormProps> = ({ 
  user, 
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    quizzesTaken: user?.quizzesTaken || 0,
    averageScore: user?.averageScore || 0,
    lastQuizDate: user?.lastQuizDate || '-',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        if (user?.id) {
          await axios.put(`http://localhost:8080/api/users/${user.id}`, formData);
          alert('✅ Utilisateur mis à jour avec succès');
        } else {
          await axios.post('http://localhost:8080/api/users', formData);
          alert('✅ Utilisateur ajouté avec succès');
        }
        onSubmit({
          ...formData,
          id: user?.id,
        });
      } catch (error) {
        console.error('❌ Erreur lors de l\'enregistrement de l\'utilisateur :', error);
        alert('❌ Erreur lors de l\'enregistrement de l\'utilisateur');
      }
    }
  };

  const isEditMode = !!user;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{isEditMode ? 'Edit User' : 'Add New User'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
          </div>

          {/* Champs non modifiables */}
          <div>
            <label htmlFor="quizzesTaken" className="block text-sm font-medium text-gray-700 mb-1">
              Quizzes Taken
            </label>
            <Input
              id="quizzesTaken"
              name="quizzesTaken"
              type="number"
              value={formData.quizzesTaken}
              readOnly
              disabled
              className="bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="averageScore" className="block text-sm font-medium text-gray-700 mb-1">
              Average Score
            </label>
            <Input
              id="averageScore"
              name="averageScore"
              type="number"
              value={formData.averageScore}
              readOnly
              disabled
              className="bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="lastQuizDate" className="block text-sm font-medium text-gray-700 mb-1">
              Last Quiz Date
            </label>
            <Input
              id="lastQuizDate"
              name="lastQuizDate"
              type="text"
              value={formData.lastQuizDate}
              readOnly
              disabled
              className="bg-gray-100 cursor-not-allowed"
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
            {isEditMode ? 'Update User' : 'Add User'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
