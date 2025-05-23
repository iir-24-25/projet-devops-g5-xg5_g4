import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FilePlus, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Cardadmin';
import { Button } from '../components/ui/Buttonadmin';
import { Input } from '../components/ui/Input';
import { QuizTable, type Quiz } from '../components/quizzes/QuizTable';
import { QuizForm } from '../components/quizzes/QuizForm';

type QuizzesPageadminProps = {
  setActivePage: (page: string) => void;
  setCurrentQuizId: (quizId: string) => void;
};

export const QuizzesPageadmin: React.FC<QuizzesPageadminProps> = ({
  setActivePage,
  setCurrentQuizId,
}) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/quizzes');
      setQuizzes(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des quizzes :', error);
    }
  };

  const handleAddQuiz = () => {
    setEditingQuiz(undefined);
    setIsFormVisible(true);
  };
  const handleUpdateQuiz = (quiz: Quiz) => {
  setEditingQuiz(quiz);
  setCurrentQuizId(quiz.id.toString());  // ✅ Toujours une chaîne
  setActivePage('edit-questions');
};


  const handleEditQuiz = (quiz: Quiz) => {
    setEditingQuiz(quiz);
    setIsFormVisible(true);
  };

  // Supprimer un quiz par ID avec confirmation
const handleDeleteQuiz = async (quizId: string) => {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer ce quiz ?")) {
    try {
      await axios.delete(`http://localhost:8080/api/quizzes/${quizId}`);
      setQuizzes(quizzes.filter(q => q.id !== quizId));
      alert("✅ Quiz supprimé avec succès !");
    } catch (error) {
      console.error('❌ Erreur lors de la suppression du quiz :', error);
      alert("⚠️ Erreur lors de la suppression du quiz.");
    }
  }
};


  const handleDuplicateQuiz = async (quiz: Quiz) => {
    const newQuiz = {
      ...quiz,
      title: `${quiz.title} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    try {
      const response = await axios.post('http://localhost:8080/api/quizzes', newQuiz);
      setQuizzes([...quizzes, response.data]);
    } catch (error) {
      console.error('Erreur lors de la duplication du quiz :', error);
    }
  };

  const handleSubmitQuiz = async (quizData: Omit<Quiz, 'id' | 'createdAt'> & { id?: string }) => {
    try {
        if (quizData.id) {
            // Mise à jour du quiz existant
            await axios.put(`http://localhost:8080/api/quizzes/${quizData.id}`, quizData);
            setIsFormVisible(false);
            setEditingQuiz(undefined);
            setCurrentQuizId(quizData.id.toString());

            // ✅ Après mise à jour, rediriger vers la page d'édition des questions
            setActivePage('edit-questions');
        } else {
            // Création d'un nouveau quiz
            const response = await axios.post('http://localhost:8080/api/quizzes', {
                ...quizData,
                createdAt: new Date().toISOString().split('T')[0],
            });
            const newQuiz = response.data;
            setIsFormVisible(false);
            setEditingQuiz(undefined);

            // ✅ Après création, rediriger vers l'ajout de questions
            setCurrentQuizId(newQuiz.id.toString());
            setActivePage('add-questions');
        }
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement du quiz :', error);
    }
};


  const handleCancelForm = () => {
    setIsFormVisible(false);
    setEditingQuiz(undefined);
  };

  const filteredQuizzes = quizzes.filter(quiz =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Quizzes</h1>
        <Button onClick={handleAddQuiz}>
          <FilePlus size={18} className="mr-2" />
          Créer un Quiz
        </Button>
      </div>

      {isFormVisible ? (
        <QuizForm 
          quiz={editingQuiz}
          onSubmit={handleSubmitQuiz}
          onCancel={handleCancelForm}
        />
      ) : (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Liste des Quizzes</CardTitle>
              <div className="relative w-64">
                <Input
                  type="text"
                  placeholder="Rechercher un quiz..."
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
            <QuizTable 
              quizzes={filteredQuizzes}
              onEdit={handleEditQuiz}
              onDelete={handleDeleteQuiz}
              onDuplicate={handleDuplicateQuiz}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
