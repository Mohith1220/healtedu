import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import QuizComponent from '../../components/QuizComponent';
import { quizzes } from '../../data/staticData';

const QuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  
  useEffect(() => {
    // If quizId is provided, find that specific quiz
    if (quizId) {
      const quiz = quizzes.find(q => q.id === quizId);
      if (quiz) {
        setSelectedQuiz(quiz);
      } else {
        // If quiz not found, set the first quiz as default
        setSelectedQuiz(quizzes[0]);
      }
    } else {
      // If no quizId, show the quiz selection page
      setSelectedQuiz(null);
    }
  }, [quizId]);
  
  const handleQuizComplete = (score: number) => {
    console.log(`Quiz completed with score: ${score}%`);
    // In a real app, you might save this score to a database or local storage
  };
  
  // Quiz selection page
  if (!quizId || !selectedQuiz) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link to="/" className="text-indigo-600 hover:text-indigo-800 flex items-center">
              <ArrowLeft size={16} className="mr-1" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mt-4">Health Education Quizzes</h1>
            <p className="text-gray-600">Test your knowledge with these interactive quizzes</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{quiz.title}</h2>
                  <p className="text-gray-600 mb-4">{quiz.description}</p>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>{quiz.questions.length} Questions</span>
                    <span>{quiz.timeLimit} Minutes</span>
                  </div>
                  <Link
                    to={`/quiz/${quiz.id}`}
                    className="w-full block text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Start Quiz
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // Individual quiz page
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/quiz" className="text-indigo-600 hover:text-indigo-800 flex items-center">
            <ArrowLeft size={16} className="mr-1" />
            Back to Quizzes
          </Link>
        </div>
        
        <QuizComponent quiz={selectedQuiz} onComplete={handleQuizComplete} />
      </div>
    </div>
  );
};

export default QuizPage;