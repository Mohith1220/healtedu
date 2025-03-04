import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Brain, Activity, Award, TrendingUp, Droplet, Moon, Smile } from 'lucide-react';
import ProgressTracker from '../../components/student/ProgressTracker';
import RecommendedContent from '../../components/student/RecommendedContent';

const StudentDashboard: React.FC = () => {
  const { user, supabase } = useAuth();
  const [recentQuizzes, setRecentQuizzes] = useState<any[]>([]);
  const [healthLogs, setHealthLogs] = useState<any>({
    waterIntake: 4,
    sleepHours: 7,
    mood: 'neutral',
    exerciseMinutes: 30
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch recent quizzes/assignments
        const { data: quizData, error: quizError } = await supabase
          .from('student_assignments')
          .select(`
            id,
            score,
            status,
            assignments (
              id,
              title,
              description
            )
          `)
          .eq('student_id', user.id)
          .order('submitted_at', { ascending: false })
          .limit(3);
          
        if (quizError) throw quizError;
        
        // Format quiz data
        const formattedQuizzes = quizData?.map(quiz => ({
          id: quiz.assignments.id,
          title: quiz.assignments.title,
          score: quiz.score || 0,
          totalQuestions: 10, // This would ideally come from the database
          completedQuestions: quiz.status === 'completed' ? 10 : Math.floor(Math.random() * 10)
        })) || [];
        
        setRecentQuizzes(formattedQuizzes);
        
        // Fetch health logs (in a real app, this would come from a health_logs table)
        // For now, we'll use mock data
        // const { data: healthData, error: healthError } = await supabase
        //   .from('health_logs')
        //   .select('*')
        //   .eq('student_id', user.id)
        //   .order('date', { ascending: false })
        //   .limit(1);
        
        // if (healthData && healthData.length > 0) {
        //   setHealthLogs(healthData[0]);
        // }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user, supabase]);
  
  // Handle health tracker updates
  const updateWaterIntake = (value: number) => {
    setHealthLogs(prev => ({ ...prev, waterIntake: Math.max(0, value) }));
  };
  
  const updateSleepHours = (value: number) => {
    setHealthLogs(prev => ({ ...prev, sleepHours: Math.max(0, value) }));
  };
  
  const updateExerciseMinutes = (value: number) => {
    setHealthLogs(prev => ({ ...prev, exerciseMinutes: Math.max(0, value) }));
  };
  
  const updateMood = (value: 'happy' | 'neutral' | 'sad') => {
    setHealthLogs(prev => ({ ...prev, mood: value }));
  };
  
  const saveHealthLog = async () => {
    if (!user) return;
    
    try {
      // In a real app, you would save this to a health_logs table
      // const { error } = await supabase
      //   .from('health_logs')
      //   .insert({
      //     student_id: user.id,
      //     date: new Date().toISOString(),
      //     water_intake: healthLogs.waterIntake,
      //     sleep_hours: healthLogs.sleepHours,
      //     exercise_minutes: healthLogs.exerciseMinutes,
      //     mood: healthLogs.mood
      //   });
      
      // if (error) throw error;
      
      alert('Health log saved successfully!');
    } catch (error) {
      console.error('Error saving health log:', error);
      alert('Failed to save health log. Please try again.');
    }
  };
  
  // Mock data for health tips
  const healthTips = [
    'Try to get at least 8 hours of sleep tonight for better focus tomorrow.',
    'Your water intake is below average today. Try to drink 2 more glasses before bedtime.',
    'Great job on your physical activity! Keep it up for better health outcomes.',
  ];
  
  // Mock data for achievements
  const achievements = [
    { id: '1', title: 'Health Novice', description: 'Complete your first quiz', earned: true },
    { id: '2', title: 'Hydration Hero', description: 'Track water intake for 7 days', earned: true },
    { id: '3', title: 'Exercise Expert', description: 'Complete 10 physical activity quizzes', earned: false },
  ];
  
  // Mock data for daily challenges
  const dailyChallenges = [
    { id: '1', title: 'Drink 8 glasses of water', completed: false },
    { id: '2', title: 'Take a 15-minute walk', completed: true },
    { id: '3', title: 'Practice mindfulness for 5 minutes', completed: false },
  ];
  
  const [challenges, setChallenges] = useState(dailyChallenges);
  
  const toggleChallengeCompletion = (id: string) => {
    setChallenges(prev => 
      prev.map(challenge => 
        challenge.id === id 
          ? { ...challenge, completed: !challenge.completed } 
          : challenge
      )
    );
  };
  
  if (loading && !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600">Welcome back{user?.user_metadata?.name ? `, ${user.user_metadata.name}` : ''}! Here's your health education progress.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left and Center */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning Section */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BookOpen size={20} className="mr-2 text-indigo-600" />
                Continue Learning
              </h2>
              
              <div className="space-y-4">
                {recentQuizzes.length > 0 ? (
                  recentQuizzes.map((quiz) => (
                    <div key={quiz.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-gray-900">{quiz.title}</h3>
                        <span className="text-sm font-medium text-indigo-600">{quiz.score}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-indigo-600 h-2.5 rounded-full" 
                          style={{ width: `${(quiz.completedQuestions / quiz.totalQuestions) * 100}%` }}
                        ></div>
                      </div>
                      
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {quiz.completedQuestions} of {quiz.totalQuestions} questions
                        </span>
                        <Link 
                          to={`/quiz/${quiz.id}`}
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                        >
                          {quiz.completedQuestions === quiz.totalQuestions ? 'Retake Quiz' : 'Continue'}
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                    <BookOpen size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">No quizzes taken yet</p>
                    <Link 
                      to="/learn"
                      className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 inline-block"
                    >
                      Start Learning
                    </Link>
                  </div>
                )}
                
                <Link 
                  to="/learn"
                  className="block text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Explore More Topics
                </Link>
              </div>
            </section>
            
            {/* Daily Challenges Section */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award size={20} className="mr-2 text-indigo-600" />
                Daily Challenges
              </h2>
              
              <div className="space-y-3">
                {challenges.map((challenge) => (
                  <div key={challenge.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                    <input
                      type="checkbox"
                      checked={challenge.completed}
                      onChange={() => toggleChallengeCompletion(challenge.id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className={`ml-3 ${challenge.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                      {challenge.title}
                    </span>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Health Tracker Section */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Activity size={20} className="mr-2 text-indigo-600" />
                Today's Health Tracker
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center">
                  <Droplet size={24} className="text-blue-500 mb-2" />
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Water Intake</h3>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => updateWaterIntake(healthLogs.waterIntake - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="text-xl font-bold text-gray-900">{healthLogs.waterIntake}</span>
                    <button 
                      onClick={() => updateWaterIntake(healthLogs.waterIntake + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">glasses</span>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center">
                  <Moon size={24} className="text-purple-500 mb-2" />
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Sleep Hours</h3>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => updateSleepHours(healthLogs.sleepHours - 0.5)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="text-xl font-bold text-gray-900">{healthLogs.sleepHours}</span>
                    <button 
                      onClick={() => updateSleepHours(healthLogs.sleepHours + 0.5)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">hours</span>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center">
                  <Smile size={24} className="text-yellow-500 mb-2" />
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Mood</h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <button 
                      onClick={() => updateMood('happy')}
                      className={`text-2xl ${healthLogs.mood === 'happy' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                    >
                      😊
                    </button>
                    <button 
                      onClick={() => updateMood('neutral')}
                      className={`text-2xl ${healthLogs.mood === 'neutral' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                    >
                      😐
                    </button>
                    <button 
                      onClick={() => updateMood('sad')}
                      className={`text-2xl ${healthLogs.mood === 'sad' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                    >
                      😔
                    </button>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={saveHealthLog}
                className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Today's Log
              </button>
            </section>
          </div>
          
          {/* Sidebar - Right */}
          <div className="space-y-8">
            {/* Progress Tracker */}
            <ProgressTracker />
            
            {/* Recommended Content */}
            <RecommendedContent />
            
            {/* AI Health Recommendations */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Brain size={20} className="mr-2 text-indigo-600" />
                AI Health Tips
              </h2>
              
              <div className="space-y-4">
                {healthTips.map((tip, index) => (
                  <div key={index} className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Achievements */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award size={20} className="mr-2 text-indigo-600" />
                Achievements
              </h2>
              
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`p-3 rounded-lg border ${achievement.earned ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-200'}`}
                  >
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full ${achievement.earned ? 'bg-green-100' : 'bg-gray-200'}`}>
                        <Award size={16} className={achievement.earned ? 'text-green-600' : 'text-gray-400'} />
                      </div>
                      <div className="ml-3">
                        <h3 className={`text-sm font-medium ${achievement.earned ? 'text-green-800' : 'text-gray-500'}`}>
                          {achievement.title}
                        </h3>
                        <p className="text-xs text-gray-500">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Link 
                  to="/achievements"
                  className="block text-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
                >
                  View All Achievements
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;