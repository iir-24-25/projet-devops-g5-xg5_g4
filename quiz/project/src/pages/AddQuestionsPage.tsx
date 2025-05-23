import React, { useState } from 'react';
import axios from 'axios';

interface AddQuestionsPageProps {
  quizId: string | null;
  setActivePage: (page: string) => void;
}

interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
}

const AddQuestionsPage: React.FC<AddQuestionsPageProps> = ({ quizId, setActivePage }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    text: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
  };

  const addQuestion = () => {
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    });
  };

  const handleSubmit = async () => {
    try {
      if (!quizId) {
        console.error('Quiz ID manquant');
        return;
      }

      await axios.post(`http://localhost:8080/api/quizzes/${quizId}/questions`, questions);

      setSuccessMessage('✅ Questions ajoutées avec succès ! Redirection en cours...');

      setTimeout(() => {
        setActivePage('quizzes');
      }, 2000);

    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des questions :', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Ajouter des Questions au Quiz</h1>

      {successMessage && (
        <div className="bg-green-100 text-green-800 p-3 rounded mb-6">
          {successMessage}
        </div>
      )}

      <div className="space-y-4">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-2"
          placeholder="Texte de la question"
          value={currentQuestion.text}
          onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
        />

        {currentQuestion.options.map((option, index) => (
          <input
            key={index}
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        ))}

        <select
          className="w-full border border-gray-300 rounded-lg p-2"
          value={currentQuestion.correctAnswer}
          onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: parseInt(e.target.value) })}
        >
          {currentQuestion.options.map((_, index) => (
            <option key={index} value={index}>
              Bonne réponse : Option {index + 1}
            </option>
          ))}
        </select>

        <button
          onClick={addQuestion}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ajouter la Question
        </button>

        <hr className="my-4" />

        <div className="flex justify-between">
          <span>{questions.length} question(s) ajoutée(s)</span>
          <button
            onClick={handleSubmit}
            disabled={questions.length === 0}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Enregistrer toutes les Questions
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionsPage;
