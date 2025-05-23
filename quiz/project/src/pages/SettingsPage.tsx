import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { User, Save } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { user, setUser } = useAppContext();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    educationLevel: user.educationLevel,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      ...user,
      name: formData.name,
      email: formData.email,
      educationLevel: formData.educationLevel,
    });
    
    // Show success message
    alert('Profile updated successfully!');
  };

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
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="bg-primary-50 p-4 border-b border-primary-100">
          <h2 className="text-primary-800 font-medium flex items-center">
            <User size={18} className="mr-2" />
            Profile Settings
          </h2>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <img 
                    src={avatarSrc}  
                    alt={user.name} 
                    className="h-24 w-24 rounded-full object-cover border-4 border-gray-100"
                  />
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 bg-primary-600 text-white h-8 w-8 rounded-full flex items-center justify-center shadow-md hover:bg-primary-700 transition-colors"
                  >
                    <span className="text-lg">+</span>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Education Level</label>
                  <select
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
                  >
                    <option value="High School">High School</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="University">University</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Progress Level</label>
                  <div className="p-2 bg-gray-100 rounded-lg text-gray-500 cursor-not-allowed">
                    {user.progress} (Auto-calculated)
                  </div>
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <Save size={18} className="mr-2" />
              Save Changes
            </button>
          </form>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-error-50 p-4 border-b border-error-100">
          <h2 className="text-error-800 font-medium">Danger Zone</h2>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            The following actions are irreversible. Please be certain before proceeding.
          </p>
          
          <div className="space-y-4">
            <button
              type="button"
              className="bg-white border border-error-300 text-error-600 font-medium px-4 py-2 rounded-lg hover:bg-error-50 transition-colors"
            >
              Reset Progress
            </button>
            
            <button
              type="button"
              className="bg-white border border-error-300 text-error-600 font-medium px-4 py-2 rounded-lg hover:bg-error-50 transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;