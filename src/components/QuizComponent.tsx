import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, HelpCircle, ArrowRight, Award } from 'lucide-react';

interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  quiz: {
    id: string;
    title: string;
    description: string;
    timeLimit: number;
    questions: QuizQuestion[];
  };
  onComplete?: (score: number) => void;
}

const QuizComponent: React.FC<QuizProps> = ({ quiz, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quiz.questions.length).fill(null));
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  const handleOptionSelect = (optionIndex: number) => {
    if (showExplanation) return; // Prevent changing answer after seeing explanation
    
    setSelectedOption(optionIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
  };
  
  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setShowExplanation(true);
  };
  
  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
      // Calculate score
      const score = calculateScore();
      if (onComplete) {
        onComplete(score);
      }
    }
  };
  
  const calculateScore = () => {
    const correctAnswers = answers.filter(
      (answer, index) => answer === quiz.questions[index].correctAnswer
    ).length;
    return Math.round((correctAnswers / quiz.questions.length) * 100);
  };
  
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setAnswers(Array(quiz.questions.length).fill(null));
    setQuizCompleted(false);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {!quizCompleted ? (
        <>
          {/* Quiz Header */}
          <div className="bg-indigo-600 text-white p-6">
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <p className="mt-1 text-indigo-100">{quiz.description}</p>
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <Clock size={18} className="mr-1" />
                <span>Time Limit: {quiz.timeLimit} minutes</span>
              </div>
              <div>
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-indigo-800 rounded-full h-2.5 mt-4">
              <div 
                className="bg-white h-2.5 rounded-full" 
                style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Question */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {currentQuestion.text}
            </h2>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border ${
                    selectedOption === index 
                      ? showExplanation
                        ? index === currentQuestion.correctAnswer
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-300 hover:border-indigo-300 hover:bg-indigo-50'
                  } transition-colors`}
                  disabled={showExplanation}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {showExplanation ? (
                        index === currentQuestion.correctAnswer ? (
                          <CheckCircle size={20} className="text-green-500" />
                        ) : (
                          <XCircle size={20} className="text-red-500" />
                        )
                      ) : (
                        <div className={`w-5 h-5 rounded-full border ${
                          selectedOption === index ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'
                        }`}>
                          {selectedOption === index && (
                            <div className="w-3 h-3 bg-white rounded-full m-1"></div>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="ml-3">{option}</span>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Explanation */}
            {showExplanation && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start">
                  <HelpCircle size={20} className="text-blue-500 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-800">Explanation</h3>
                    <p className="text-blue-700 mt-1">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Actions */}
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
                  currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              
              {!showExplanation ? (
                <button
                  onClick={handleCheckAnswer}
                  className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 ${
                    selectedOption === null ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={selectedOption === null}
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 flex items-center"
                >
                  {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  <ArrowRight size={16} className="ml-2" />
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div>
          <div className="bg-indigo-600 text-white p-6 text-center">
            <h1 className="text-2xl font-bold">Quiz Completed!</h1>
            <p className="mt-1 text-indigo-100">You've completed the {quiz.title} quiz</p>
          </div>
          
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-indigo-100 mb-6">
              <Award size={48} className="text-indigo-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Score: {calculateScore()}%</h2>
            
            <p className="text-gray-600 mb-8">
              You answered {answers.filter((answer, index) => answer === quiz.questions[index].correctAnswer).length} out of {quiz.questions.length} questions correctly.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={restartQuiz}
                className="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 inline-block"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;