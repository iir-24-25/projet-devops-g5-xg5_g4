import React, { useState } from 'react';
import { UserPlus, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Cardadmin';
import { Button } from '../components/ui/Buttonadmin';
import { Input } from '../components/ui/Input';
import { UserTable, type User } from '../components/users/UserTable';
import { UserForm } from '../components/users/UserForm';

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'student',
      status: 'active',
      joinedDate: '2023-09-15',
      quizzesTaken: 15,
      averageScore: 85,
      lastQuizDate: '2024-03-10',
    },
    {
      id: '2',
      name: 'Emily Johnson',
      email: 'emily.j@example.com',
      role: 'teacher',
      status: 'active',
      joinedDate: '2023-08-22',
      quizzesTaken: 8,
      averageScore: 92,
      lastQuizDate: '2024-03-12',
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      role: 'student',
      status: 'inactive',
      joinedDate: '2023-07-05',
      quizzesTaken: 3,
      averageScore: 45,
      lastQuizDate: '2024-02-28',
    },
    {
      id: '4',
      name: 'Sarah Davis',
      email: 'sarah.d@example.com',
      role: 'admin',
      status: 'active',
      joinedDate: '2023-06-18',
      quizzesTaken: 12,
      averageScore: 88,
      lastQuizDate: '2024-03-11',
    },
    {
      id: '5',
      name: 'David Wilson',
      email: 'david.w@example.com',
      role: 'student',
      status: 'active',
      joinedDate: '2023-09-02',
      quizzesTaken: 6,
      averageScore: 78,
      lastQuizDate: '2024-03-09',
    },
  ]);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddUser = () => {
    setEditingUser(undefined);
    setIsFormVisible(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsFormVisible(true);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleSubmitUser = (userData: Omit<User, 'id' | 'joinedDate'> & { id?: string }) => {
    if (userData.id) {
      // Edit existing user
      setUsers(users.map(user => 
        user.id === userData.id 
          ? { ...user, ...userData } 
          : user
      ));
    } else {
      // Add new user
      const newUser: User = {
        ...userData,
        id: (users.length + 1).toString(),
        joinedDate: new Date().toISOString().split('T')[0],
        quizzesTaken: 0,
        averageScore: 0,
        lastQuizDate: '-',
      };
      setUsers([...users, newUser]);
    }
    
    setIsFormVisible(false);
    setEditingUser(undefined);
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
    setEditingUser(undefined);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <Button onClick={handleAddUser}>
          <UserPlus size={18} className="mr-2" />
          Add User
        </Button>
      </div>

      {isFormVisible ? (
        <UserForm 
          user={editingUser} 
          onSubmit={handleSubmitUser} 
          onCancel={handleCancelForm} 
        />
      ) : (
        <>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>All Users</CardTitle>
                <div className="relative w-64">
                  <Input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Search size={18} />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <UserTable 
                users={filteredUsers} 
                onEdit={handleEditUser} 
                onDelete={handleDeleteUser} 
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};