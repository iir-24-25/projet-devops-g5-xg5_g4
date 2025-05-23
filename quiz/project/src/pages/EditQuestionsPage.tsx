import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/Buttonadmin';
import { Input } from '../components/ui/Input';

type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
};

type EditQuestionsPageProps = {
  quizId: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

export const EditQuestionsPage: React.FC<EditQuestionsPageProps> = ({ quizId, setActivePage }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Charger les questions existantes du quiz
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Récupérer les questions du quiz depuis l'API
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/quizzes/${quizId}/questions`);
      if (response.data && Array.isArray(response.data)) {
        setQuestions(response.data);
      } else {
        console.error('Format de données incorrect lors de la récupération des questions.');
      }
    } catch (error) {
      console.error('Erreur lors du chargement des questions :', error);
    }
  };

  // Mettre à jour une question existante
  // Mettre à jour une question existante
const handleUpdateQuestions = async () => {
  try {
    await Promise.all(
      questions.map(async (question) => {
        if (!question.text.trim()) {
          throw new Error("❌ Le texte de la question ne peut pas être vide.");
        }
        for (let option of question.options) {
          if (!option.trim()) {
            throw new Error("❌ Les options ne peuvent pas être vides.");
          }
        }

        // URL corrigée pour inclure l'ID du quiz et de la question
        await axios.put(`http://localhost:8080/api/quizzes/${quizId}/questions/${question.id}`, {
          text: question.text,
          options: question.options,
          correctAnswer: question.correctAnswer,
        });
      })
    );
    setSuccessMessage('✅ Modifications enregistrées avec succès !');
    setTimeout(() => setActivePage('quizzes'), 1500); // Redirection après 1,5s
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Erreur lors de la mise à jour des questions :', error.message);
      setErrorMessage(`❌ Erreur : ${error.response?.data || error.message}`);
    } else {
      console.error('Erreur inconnue lors de la mise à jour des questions :', String(error));
      setErrorMessage("❌ Erreur inconnue lors de la mise à jour des questions.");
    }
  }
};


  // Gérer la modification des options
  const handleOptionChange = (question: Question, index: number, value: string) => {
    const updatedOptions = [...question.options];
    updatedOptions[index] = value;
    setQuestions((prev) =>
      prev.map((q) => (q.id === question.id ? { ...q, options: updatedOptions } : q))
    );
  };

  // Ajouter une nouvelle question
  const handleAddQuestion = async () => {
    if (!newQuestion.trim()) {
      setErrorMessage("❌ Le texte de la nouvelle question ne peut pas être vide.");
      return;
    }

    for (let option of options) {
      if (!option.trim()) {
        setErrorMessage("❌ Les options ne peuvent pas être vides.");
        return;
      }
    }

    try {
      await axios.post(`http://localhost:8080/api/quizzes/${quizId}/questions`, {
        text: newQuestion,
        options,
        correctAnswer,
      });
      setNewQuestion('');
      setOptions(['', '', '', '']);
      setCorrectAnswer(0);
      setSuccessMessage('✅ Nouvelle question ajoutée avec succès !');
      fetchQuestions();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la question :', error);
      setErrorMessage("❌ Erreur lors de l'ajout de la question.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Modifier les Questions du Quiz</h2>

      {successMessage && (
        <div className="bg-green-100 text-green-800 p-2 rounded-md mb-4">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-2 rounded-md mb-4">
          {errorMessage}
        </div>
      )}

      {questions.map((question) => (
        <div key={question.id} className="space-y-2 p-3 border rounded-md bg-gray-50 mb-4">
          <Input
            value={question.text}
            onChange={(e) =>
              setQuestions((prev) =>
                prev.map((q) =>
                  q.id === question.id ? { ...q, text: e.target.value } : q
                )
              )
            }
            placeholder="Question"
          />
          {question.options.map((option, idx) => (
            <Input
              key={idx}
              value={option}
              placeholder={`Option ${idx + 1}`}
              onChange={(e) => handleOptionChange(question, idx, e.target.value)}
            />
          ))}
          <select
            value={question.correctAnswer}
            onChange={(e) =>
              setQuestions((prev) =>
                prev.map((q) =>
                  q.id === question.id ? { ...q, correctAnswer: parseInt(e.target.value) } : q
                )
              )
            }
            className="w-full p-2 rounded-md border"
          >
            {question.options.map((_, idx) => (
              <option key={idx} value={idx}>
                Bonne réponse: Option {idx + 1}
              </option>
            ))}
          </select>
        </div>
      ))}

      <div className="mt-6 p-4 border-t">
        <Button onClick={handleUpdateQuestions} className="bg-blue-600 text-white mr-2">
          Enregistrer les modifications
        </Button>
        <Button onClick={() => setActivePage('quizzes')} className="bg-gray-600 text-white">
          Annuler
        </Button>
      </div>
    </div>
  );
};
