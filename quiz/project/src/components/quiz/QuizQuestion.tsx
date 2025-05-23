import React from 'react';
import { useAppContext } from '../../context/AppContext';

const QuizQuestion: React.FC = () => {
  const { 
    activeQuiz, 
    currentQuestionIndex, 
    userAnswers, 
    answerQuestion, 
    nextQuestion, 
    previousQuestion,
    submitQuiz
  } = useAppContext();

  // 🛡️ Vérification sécurisée
  if (!activeQuiz || !activeQuiz.questions || activeQuiz.questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Aucune question disponible</h2>
          <p className="text-gray-600">Le quiz ne contient pas encore de questions.</p>
        </div>
      </div>
    );
  }

  const question = activeQuiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === activeQuiz.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const currentAnswer = userAnswers[currentQuestionIndex];
  
  const handleAnswer = (answerIndex: number) => {
    answerQuestion(currentQuestionIndex, answerIndex);
  };

  const answeredCount = userAnswers.filter(a => a !== -1).length;
  const progress = Math.round((answeredCount / activeQuiz.questions.length) * 100);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-800">
            {activeQuiz.title}
          </h2>
          <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
            Question {currentQuestionIndex + 1} sur {activeQuiz.questions.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-6">{question.text}</h3>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-4 border rounded-lg transition-colors ${
                currentAnswer === index
                  ? 'bg-primary-100 border-primary-300 text-primary-800'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start">
                <div className={`flex-shrink-0 h-5 w-5 mt-0.5 rounded-full border ${
                  currentAnswer === index
                    ? 'bg-primary-600 border-primary-600'
                    : 'border-gray-300'
                } flex items-center justify-center mr-3`}>
                  {currentAnswer === index && (
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={previousQuestion}
          disabled={isFirstQuestion}
          className={`px-4 py-2 rounded-lg border border-gray-300 ${
            isFirstQuestion
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-50'
          }`}
        >
          Précédent
        </button>
        
        {isLastQuestion ? (
          <button
            onClick={submitQuiz}
            disabled={userAnswers.includes(-1)}
            className={`px-6 py-2 bg-primary-600 text-white rounded-lg font-medium ${
              userAnswers.includes(-1)
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-primary-700'
            }`}
          >
            Terminer le Quiz
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
          >
            Suivant
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;
