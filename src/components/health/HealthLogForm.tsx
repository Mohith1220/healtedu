import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Droplet, Moon, Smile, Activity } from 'lucide-react';

interface HealthLogFormProps {
  onLogSaved?: () => void;
}

const HealthLogForm: React.FC<HealthLogFormProps> = ({ onLogSaved }) => {
  const { user, supabase } = useAuth();
  const [waterIntake, setWaterIntake] = useState(4);
  const [sleepHours, setSleepHours] = useState(7);
  const [exerciseMinutes, setExerciseMinutes] = useState(30);
  const [mood, setMood] = useState<'happy' | 'neutral' | 'sad'>('neutral');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Check if there's already a log for today
  useEffect(() => {
    const fetchTodayLog = async () => {
      if (!user) return;
      
      try {
        const today = new Date().toISOString().split('T')[0];
        
        const { data, error } = await supabase
          .from('health_logs')
          .select('*')
          .eq('student_id', user.id)
          .eq('date', today)
          .single();
          
        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching today\'s log:', error);
          return;
        }
        
        if (data) {
          // Pre-fill form with today's data
          setWaterIntake(data.water_intake);
          setSleepHours(data.sleep_hours);
          setExerciseMinutes(data.exercise_minutes);
          setMood(data.mood);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchTodayLog();
  }, [user, supabase]);
  
  const saveHealthLog = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Check if there's already a log for today
      const { data: existingLog, error: checkError } = await supabase
        .from('health_logs')
        .select('id')
        .eq('student_id', user.id)
        .eq('date', today)
        .single();
        
      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }
      
      if (existingLog) {
        // Update existing log
        const { error: updateError } = await supabase
          .from('health_logs')
          .update({
            water_intake: waterIntake,
            sleep_hours: sleepHours,
            exercise_minutes: exerciseMinutes,
            mood: mood
          })
          .eq('id', existingLog.id);
          
        if (updateError) throw updateError;
        
        setSuccess('Health log updated successfully!');
      } else {
        // Create new log
        const { error: insertError } = await supabase
          .from('health_logs')
          .insert({
            student_id: user.id,
            date: today,
            water_intake: waterIntake,
            sleep_hours: sleepHours,
            exercise_minutes: exerciseMinutes,
            mood: mood
          });
          
        if (insertError) throw insertError;
        
        setSuccess('Health log saved successfully!');
      }
      
      if (onLogSaved) {
        onLogSaved();
      }
    } catch (error: any) {
      console.error('Error saving health log:', error);
      setError(error.message || 'Failed to save health log. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Activity size={20} className="mr-2 text-indigo-600" />
        Today's Health Tracker
      </h2>
      
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-800 rounded-lg p-3 text-sm">
          {success}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center">
          <Droplet size={24} className="text-blue-500 mb-2" />
          <h3 className="text-sm font-medium text-gray-700 mb-1">Water Intake</h3>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setWaterIntake(Math.max(0, waterIntake - 1))}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-xl font-bold text-gray-900">{waterIntake}</span>
            <button 
              onClick={() => setWaterIntake(waterIntake + 1)}
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
              onClick={() => setSleepHours(Math.max(0, sleepHours - 0.5))}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-xl font-bold text-gray-900">{sleepHours}</span>
            <button 
              onClick={() => setSleepHours(Math.min(24, sleepHours + 0.5))}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
            >
              +
            </button>
          </div>
          <span className="text-xs text-gray-500 mt-1">hours</span>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center">
          <Activity size={24} className="text-green-500 mb-2" />
          <h3 className="text-sm font-medium text-gray-700 mb-1">Exercise</h3>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setExerciseMinutes(Math.max(0, exerciseMinutes - 5))}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-xl font-bold text-gray-900">{exerciseMinutes}</span>
            <button 
              onClick={() => setExerciseMinutes(exerciseMinutes + 5)}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
            >
              +
            </button>
          </div>
          <span className="text-xs text-gray-500 mt-1">minutes</span>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Today's Mood</h3>
        <div className="flex justify-center space-x-8 mb-4">
          <button 
            onClick={() => setMood('happy')}
            className={`text-4xl ${mood === 'happy' ? 'transform scale-125' : 'opacity-60'} transition-all`}
          >
            😊
          </button>
          <button 
            onClick={() => setMood('neutral')}
            className={`text-4xl ${mood === 'neutral' ? 'transform scale-125' : 'opacity-60'} transition-all`}
          >
            😐
          </button>
          <button 
            onClick={() => setMood('sad')}
            className={`text-4xl ${mood === 'sad' ? 'transform scale-125' : 'opacity-60'} transition-all`}
          >
            😔
          </button>
        </div>
      </div>
      
      <button 
        onClick={saveHealthLog}
        disabled={loading}
        className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save Today\'s Log'}
      </button>
    </div>
  );
};

export default HealthLogForm;