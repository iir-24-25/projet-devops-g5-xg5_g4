import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';



interface LoginPageProps {
  onSignupClick: () => void;
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSignupClick, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
        const response = await axios.post('http://localhost:8080/api/login', {
            email,
            password,
        });

        console.log("🧪 Réponse brute du backend :", response.data);
        const user = response.data.user;
        const token = response.data.token;

        if (user && user.id && token) {
            // Enregistrer l'utilisateur complet et le token dans localStorage
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userId', String(user.id));  // Enregistrer l'ID séparément
            localStorage.setItem('token', token);
  
            console.log("✅ User and token saved in localStorage:", user.id, token);
            setUser(user);
            alert('✅ Connexion réussie !');
            onLoginSuccess();
            navigate('/dashboard', { replace: true });
        } else {
            alert("⚠️ Problème lors de la récupération de l'utilisateur ou du token");
        }
    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 401) {
                alert('❌ Email ou mot de passe incorrect');
            } else {
                alert(`⚠️ Erreur serveur: ${error.response.status} - ${error.response.data.message}`);
            }
        } else {
            alert('⚠️ Erreur de connexion au serveur');
            console.error("Erreur de réseau ou de serveur:", error.message);
        }
    }
};

  
  


  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          EduQuiz 
        </h1>
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <button onClick={onSignupClick} className="font-medium text-blue-600 hover:text-blue-500">
            create a new account
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
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
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-900">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <a href="#forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>

            <div>
              <Button type="submit" className="w-full flex justify-center" icon={<LogIn size={20} />}>
                Sign in
              </Button>
            </div>
          </form>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm text-gray-500 hover:bg-gray-50">
              Google
            </button>
            <button className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm text-gray-500 hover:bg-gray-50">
              Microsoft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
