import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { TrendingUp, Award, BookOpen } from 'lucide-react';

interface ProgressTrackerProps {
  topicId?: string;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ topicId }) => {
  const { user, supabase } = useAuth();
  const [progress, setProgress] = useState<any>({
    completedLessons: 0,
    totalLessons: 0,
    completedQuizzes: 0,
    totalQuizzes: 0,
    averageScore: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch student progress data
        let query = supabase
          .from('student_progress')
          .select(`
            content_id,
            completed,
            course_content(topic_id)
          `)
          .eq('student_id', user.id);
          
        if (topicId) {
          query = query.eq('course_content.topic_id', topicId);
        }
        
        const { data: progressData, error: progressError } = await query;
        
        if (progressError) throw progressError;
        
        // Fetch quiz data
        let quizQuery = supabase
          .from('student_assignments')
          .select(`
            score,
            assignments(id, title)
          `)
          .eq('student_id', user.id)
          .not('score', 'is', null);
          
        const { data: quizData, error: quizError } = await quizQuery;
        
        if (quizError) throw quizError;
        
        // Calculate progress metrics
        const totalLessons = progressData?.length || 0;
        const completedLessons = progressData?.filter(item => item.completed).length || 0;
        
        const totalQuizzes = quizData?.length || 0;
        const scores = quizData?.map(item => item.score) || [];
        const averageScore = scores.length > 0 
          ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) 
          : 0;
        
        setProgress({
          completedLessons,
          totalLessons,
          completedQuizzes: totalQuizzes,
          totalQuizzes: totalQuizzes, // This would ideally be the total available quizzes
          averageScore
        });
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProgress();
  }, [user, supabase, topicId]);

  if (loading) {
    return <div className="animate-pulse h-24 bg-gray-200 rounded-lg"></div>;
  }

  const lessonProgress = progress.totalLessons > 0 
    ? Math.round((progress.completedLessons / progress.totalLessons) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <TrendingUp size={20} className="mr-2 text-indigo-600" />
        Your Progress
      </h2>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center">
              <BookOpen size={16} className="mr-1 text-indigo-600" />
              <span className="text-sm font-medium text-gray-700">Lessons Completed</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{progress.completedLessons}/{progress.totalLessons}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full" 
              style={{ width: `${lessonProgress}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center">
              <Award size={16} className="mr-1 text-indigo-600" />
              <span className="text-sm font-medium text-gray-700">Quiz Performance</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{progress.averageScore}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full" 
              style={{ width: `${progress.averageScore}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-500">Quizzes Taken</p>
            <p className="text-xl font-bold text-indigo-600">{progress.completedQuizzes}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Overall Progress</p>
            <p className="text-xl font-bold text-indigo-600">{lessonProgress}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;