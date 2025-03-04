import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, TrendingUp, Brain, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import HealthLogForm from '../../components/health/HealthLogForm';

const HealthTracker: React.FC = () => {
  const { user, supabase } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [healthLogs, setHealthLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState({
    water: [0, 0, 0, 0, 0, 0, 0],
    sleep: [0, 0, 0, 0, 0, 0, 0],
    exercise: [0, 0, 0, 0, 0, 0, 0],
    mood: ['neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral'] as ('happy' | 'neutral' | 'sad')[]
  });
  
  // Fetch health logs
  useEffect(() => {
    const fetchHealthLogs = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Get the date range for the past week
        const today = new Date();
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
        
        const { data, error } = await supabase
          .from('health_logs')
          .select('*')
          .eq('student_id', user.id)
          .gte('date', oneWeekAgo.toISOString().split('T')[0])
          .lte('date', today.toISOString().split('T')[0])
          .order('date', { ascending: false });
          
        if (error) throw error;
        
        setHealthLogs(data || []);
        
        // Process data for weekly trends
        if (data && data.length > 0) {
          const waterData = Array(7).fill(0);
          const sleepData = Array(7).fill(0);
          const exerciseData = Array(7).fill(0);
          const moodData = Array(7).fill('neutral');
          
          data.forEach(log => {
            const logDate = new Date(log.date);
            const dayDiff = Math.floor((today.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24));
            
            if (dayDiff >= 0 && dayDiff < 7) {
              const index = 6 - dayDiff; // Reverse index (today is at the end)
              waterData[index] = log.water_intake;
              sleepData[index] = log.sleep_hours;
              exerciseData[index] = log.exercise_minutes;
              moodData[index] = log.mood;
            }
          });
          
          setWeeklyData({
            water: waterData,
            sleep: sleepData,
            exercise: exerciseData,
            mood: moodData as ('happy' | 'neutral' | 'sad')[]
          });
        }
      } catch (error) {
        console.error('Error fetching health logs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHealthLogs();
  }, [user, supabase]);
  
  // AI tips based on health data
  const getAITips = () => {
    const tips = [];
    
    // Get the most recent log
    const latestLog = healthLogs[0];
    
    if (latestLog) {
      if (latestLog.water_intake < 6) {
        tips.push("Try to drink at least 8 glasses of water daily for optimal hydration.");
      }
      
      if (latestLog.sleep_hours < 7) {
        tips.push("You're not getting enough sleep. Aim for 7-9 hours for better health and focus.");
      }
      
      if (latestLog.exercise_minutes < 30) {
        tips.push("Try to get at least 30 minutes of physical activity daily for better health outcomes.");
      }
      
      if (latestLog.mood === 'sad') {
        tips.push("Consider activities that boost your mood like walking outside or talking with friends.");
      }
    }
    
    if (tips.length === 0) {
      tips.push("Great job maintaining your health habits! Keep it up!");
    }
    
    return tips;
  };
  
  // Format date as "Day, Month Date"
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };
  
  // Navigate to previous or next day
  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setSelectedDate(newDate);
  };
  
  // Handle log saved
  const handleLogSaved = () => {
    // Refresh data
    window.location.reload();
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800 flex items-center">
            <ArrowLeft size={16} className="mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Health Tracker</h1>
          <p className="text-gray-600">Monitor and log your daily health activities</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Daily Log Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Health Log Form */}
            <HealthLogForm onLogSaved={handleLogSaved} />
            
            {/* Weekly Trends */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <TrendingUp size={20} className="mr-2 text-indigo-600" />
                Weekly Trends
              </h2>
              
              <div className="space-y-6">
                {/* Water Intake Chart */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Water Intake
                    </h3>
                    <span className="text-xs text-gray-500">Past 7 days</span>
                  </div>
                  
                  <div className="flex items-end h-24 space-x-2">
                    {weeklyData.water.map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-blue-200 rounded-t"
                          style={{ height: `${(value / 8) * 100}%` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-1">
                          {['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Sleep Hours Chart */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                      Sleep Hours
                    </h3>
                    <span className="text-xs text-gray-500">Past 7 days</span>
                  </div>
                  
                  <div className="flex items-end h-24 space-x-2">
                    {weeklyData.sleep.map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-purple-200 rounded-t"
                          style={{ height: `${(value / 9) * 100}%` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-1">
                          {['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Exercise Minutes Chart */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      Exercise Minutes
                    </h3>
                    <span className="text-xs text-gray-500">Past 7 days</span>
                  </div>
                  
                  <div className="flex items-end h-24 space-x-2">
                    {weeklyData.exercise.map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-green-200 rounded-t"
                          style={{ height: `${(value / 60) * 100}%` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-1">
                          {['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Mood Chart */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
                      </svg>
                      Mood
                    </h3>
                    <span className="text-xs text-gray-500">Past 7 days</span>
                  </div>
                  
                  <div className="flex items-center justify-between h-12 space-x-2">
                    {weeklyData.mood.map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="text-2xl">
                          {value === 'happy' ? '😊' : value === 'neutral' ? '😐' : '😔'}
                        </div>
                        <span className="text-xs text-gray-500 mt-1">
                          {['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
          
          {/* Sidebar - Right */}
          <div className="space-y-8">
            {/* Calendar View */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar size={20} className="mr-2 text-indigo-600" />
                Health Log Calendar
              </h2>
              
              <div className="bg-gray-50 px-4 py-3 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-gray-500 mb-2">
                  <div>Sun</div>
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                </div>
                
                <div className="grid grid-cols-7 gap-2 text-center">
                  {Array.from({ length: 28 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - 21 + i);
                    const dateStr = date.toISOString().split('T')[0];
                    const hasLog = healthLogs.some(log => log.date === dateStr);
                    
                    return (
                      <div 
                        key={i} 
                        className={`p-2 rounded-full text-sm ${
                          hasLog 
                            ? 'bg-indigo-100 text-indigo-800 font-medium' 
                            : 'text-gray-500'
                        } ${
                          date.toDateString() === new Date().toDateString() 
                            ? 'ring-2 ring-indigo-500' 
                            : ''
                        }`}
                      >
                        {date.getDate()}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mt-4 text-center">
                Dates with health logs are highlighted
              </p>
            </section>
            
            {/* AI Health Tips */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Brain size={20} className="mr-2 text-indigo-600" />
                AI Health Tips
              </h2>
              
              <div className="space-y-4">
                {getAITips().map((tip, index) => (
                  <div key={index} className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Health Insights */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Health Insights</h2>
              
              {healthLogs.length > 0 ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Water Intake</h3>
                    <p className="text-sm text-gray-600">
                      Your average water intake this week is {Math.round(weeklyData.water.reduce((a, b) => a + b, 0) / 7)} glasses per day.
                      {weeklyData.water.reduce((a, b) => a + b, 0) / 7 < 6 ? 
                        " Try to increase your water intake for better hydration." : 
                        " Great job staying hydrated!"}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Sleep Pattern</h3>
                    <p className="text-sm text-gray-600">
                      Your average sleep duration this week is {(weeklyData.sleep.reduce((a, b) => a + b, 0) / 7).toFixed(1)} hours per night.
                      {weeklyData.sleep.reduce((a, b) => a + b, 0) / 7 < 7 ? 
                        " Consider getting more sleep for better health and focus." : 
                        " You're maintaining a healthy sleep schedule!"}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Exercise Consistency</h3>
                    <p className="text-sm text-gray-600">
                      You exercised on {weeklyData.exercise.filter(v => v > 0).length} out of 7 days this week.
                      {weeklyData.exercise.filter(v => v > 0).length < 5 ? 
                        " Try to be more consistent with your exercise routine." : 
                        " You're doing great with your exercise consistency!"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No health logs available yet. Start tracking your health to see insights!</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTracker;