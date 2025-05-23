import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Cardadmin';
import { Button } from '../components/ui/Buttonadmin';
import { Input } from '../components/ui/Input';
import { UserTable, type User } from '../components/users/UserTable';
import { UserForm } from '../components/users/UserForm';

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');

  // 📝 Récupération des utilisateurs depuis l'API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users');
      setUsers(response.data);
      console.log('✅ Utilisateurs chargés avec succès');
    } catch (error) {
      console.error('❌ Erreur lors du chargement des utilisateurs :', error);
    }
  };

  // 🚀 Ajouter un utilisateur
  const handleAddUser = () => {
    setEditingUser(undefined);
    setIsFormVisible(true);
  };

  // ✏️ Modifier un utilisateur
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsFormVisible(true);
  };

  // 🗑️ Supprimer un utilisateur via l'API
  const handleDeleteUser = async (userId: string) => {
  try {
    // ✅ Confirmation simple avec window.confirm()
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");

    if (confirmed) {
      // ✅ Supprimer l'utilisateur si confirmé
      await axios.delete(`http://localhost:8080/api/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      console.log(`✅ Utilisateur supprimé avec succès (ID: ${userId})`);
    } else {
      console.log("❌ Suppression annulée par l'utilisateur.");
    }
  } catch (error) {
    console.error('❌ Erreur lors de la suppression de l\'utilisateur :', error);
  }
};


  // ✅ Soumettre un utilisateur (ajouter ou modifier)
  const handleSubmitUser = (userData: Omit<User, 'id' | 'joinedDate'> & { id?: string }) => {
    if (userData.id) {
      // Modifier un utilisateur existant
      setUsers(users.map(user => 
        user.id === userData.id 
          ? { ...user, ...userData } 
          : user
      ));
    } else {
      // Ajouter un nouvel utilisateur
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

  // 🛑 Annuler la création ou la modification
  const handleCancelForm = () => {
    setIsFormVisible(false);
    setEditingUser(undefined);
  };

  // 🔍 Filtrer les utilisateurs par nom, email ou rôle
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) 
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
