import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:8080/api/users/admin/login', {
            email,
            password,
        });

        console.log("🧪 Réponse brute du backend :", response.data);
        const { user, id, token } = response.data;

        if (user === 'admin' && token) {
            // Créer un objet utilisateur complet pour satisfaire le type 'User'
            const adminUser = {
                id: id,
                name: user,
                email: email,
                averageScore: 0,
                quizzesTaken: 0,
                avatar: '',  // Image par défaut ou vide
                joinedDate: new Date().toISOString().split('T')[0],
                lastQuizDate: '-',
                timeSpent: 0,
                educationLevel: 'Admin',
                progress: 'N/A',
                totalScore: 0,
                completedQuizzes: 0,
            };

            // Enregistrer l'utilisateur complet et le token dans le localStorage
            localStorage.setItem('admin', JSON.stringify(adminUser));
            localStorage.setItem('adminToken', token);

            console.log("✅ Admin user and token saved in localStorage:", id, token);
            setUser(adminUser);  // Mettre à jour avec l'objet complet
            alert('✅ Connexion admin réussie !');
            navigate('/admin', { replace: true });
        } else {
            alert("❌ Accès refusé. Vous n'êtes pas administrateur.");
        }
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            alert('❌ Email ou mot de passe incorrect pour admin');
        } else {
            alert('⚠️ Erreur de connexion au serveur');
            console.error("Erreur de réseau ou de serveur:", error.message);
        }
    }
};


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Admin Panel
        </h1>
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">Admin Login</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Admin Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={20} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Admin email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Admin Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={20} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full flex justify-center" icon={<LogIn size={20} />}>
                Sign in as Admin
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
