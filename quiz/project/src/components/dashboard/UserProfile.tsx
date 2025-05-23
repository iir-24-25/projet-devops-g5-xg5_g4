import React from 'react';
import { Trophy, Clock, BookOpen } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const UserProfile: React.FC = () => {
  const { user } = useAppContext();

  // Fonction pour obtenir l'initiale en majuscule
  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };
  
  // Fonction pour générer une image d'initiale en base64
  const generateInitialImage = (initial: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const context = canvas.getContext('2d');
    if (context) {
      // Arrière-plan circulaire
      context.fillStyle = '#4f46e5'; // Couleur de fond
      context.beginPath();
      context.arc(50, 50, 50, 0, 2 * Math.PI);
      context.fill();

      // Texte au centre
      context.fillStyle = '#ffffff'; // Couleur du texte
      context.font = '50px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(initial, 50, 60);
    }
    return canvas.toDataURL('image/png');
  };

  const avatarSrc = user.avatar ? user.avatar : generateInitialImage(getInitial(user.name));

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-4">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img 
              src={avatarSrc}
              alt={user.name} 
              className="h-20 w-20 rounded-full border-4 border-white object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-success-500 h-5 w-5 rounded-full border-2 border-white"></div>
          </div>
          <h2 className="mt-2 text-xl font-semibold text-white">{user.name}</h2>
          <p className="text-white text-opacity-80">{user.educationLevel}</p>
          <div className="mt-2 bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
            {user.progress} Level
          </div>
        </div>
      </div>
      
      <div className="p-4 grid grid-cols-3 gap-2 text-center">
        <div className="flex flex-col items-center p-2">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-50 text-primary-500 mb-2">
            <Trophy size={20} />
          </div>
          <p className="text-lg font-semibold">{Number.isFinite(user.averageScore) ? user.averageScore.toFixed(2):'N/A'}%</p>
          <p className="text-xs text-gray-500">Total Score</p>
        </div>
        
        <div className="flex flex-col items-center p-2">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary-50 text-secondary-500 mb-2">
            <BookOpen size={20} />
          </div>
          <p className="text-lg font-semibold">{user.quizzesTaken}</p>
          <p className="text-xs text-gray-500">Quizzes</p>
        </div>
        
        <div className="flex flex-col items-center p-2">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent-50 text-accent-500 mb-2">
            <Clock size={20} />
          </div>
          <p className="text-lg font-semibold">{user.timeSpent}h</p>
          <p className="text-xs text-gray-500">Time Spent</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;