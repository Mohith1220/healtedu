import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Video, Award } from 'lucide-react';

const RecommendedContent: React.FC = () => {
  const { user, supabase } = useAuth();
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Get user's progress to determine what they've already completed
        const { data: progressData, error: progressError } = await supabase
          .from('student_progress')
          .select('content_id, completed')
          .eq('student_id', user.id);
          
        if (progressError) throw progressError;
        
        // Get all available content
        const { data: contentData, error: contentError } = await supabase
          .from('course_content')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);
          
        if (contentError) throw contentError;
        
        // Filter out content the user has already completed
        const completedContentIds = progressData
          ?.filter(item => item.completed)
          .map(item => item.content_id) || [];
          
        const recommendedContent = contentData
          ?.filter(content => !completedContentIds.includes(content.id))
          .slice(0, 3) || [];
          
        setRecommendations(recommendedContent);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecommendations();
  }, [user, supabase]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommended for You</h2>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommended for You</h2>
      
      {recommendations.length > 0 ? (
        <div className="space-y-4">
          {recommendations.map((content) => (
            <Link 
              key={content.id}
              to={`/learn/${content.topic_id}`}
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  {content.content_type === 'video' ? (
                    <Video size={20} className="text-blue-600" />
                  ) : (
                    <BookOpen size={20} className="text-green-600" />
                  )}
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">{content.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">Topic: {content.topic_id}</p>
                </div>
              </div>
            </Link>
          ))}
          
          <Link 
            to="/learn"
            className="block text-center py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            View All Topics
          </Link>
        </div>
      ) : (
        <div className="text-center py-6">
          <Award size={32} className="mx-auto text-indigo-300 mb-2" />
          <p className="text-gray-500">You've completed all available content!</p>
          <Link 
            to="/learn"
            className="block mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            Browse All Topics
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecommendedContent;