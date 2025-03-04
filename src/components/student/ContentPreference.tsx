import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Video } from 'lucide-react';

interface ContentPreferenceProps {
  topicId: string;
  onPreferenceChange: (preference: 'video' | 'text') => void;
}

const ContentPreference: React.FC<ContentPreferenceProps> = ({ topicId, onPreferenceChange }) => {
  const { user, supabase } = useAuth();
  const [preference, setPreference] = useState<'video' | 'text'>('text');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreference = async () => {
      if (!user) return;

      try {
        // Check if the user has a preference for this topic
        const { data, error } = await supabase
          .from('student_progress')
          .select('preferred_content_type')
          .eq('student_id', user.id)
          .eq('topic_id', topicId)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching preference:', error);
        }

        if (data && data.preferred_content_type) {
          setPreference(data.preferred_content_type as 'video' | 'text');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreference();
  }, [user, supabase, topicId]);

  const handlePreferenceChange = async (newPreference: 'video' | 'text') => {
    if (!user) return;
    
    setPreference(newPreference);
    onPreferenceChange(newPreference);

    try {
      // Update or insert the preference
      const { error } = await supabase
        .from('student_progress')
        .upsert({
          student_id: user.id,
          topic_id: topicId,
          preferred_content_type: newPreference
        }, {
          onConflict: 'student_id, topic_id'
        });

      if (error) {
        console.error('Error saving preference:', error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-4">Loading preferences...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-3">How would you like to learn?</h3>
      <div className="flex space-x-4">
        <button
          onClick={() => handlePreferenceChange('video')}
          className={`flex-1 flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
            preference === 'video' 
              ? 'border-indigo-500 bg-indigo-50' 
              : 'border-gray-200 hover:border-indigo-300'
          }`}
        >
          <Video size={32} className={preference === 'video' ? 'text-indigo-600' : 'text-gray-400'} />
          <span className={`mt-2 font-medium ${preference === 'video' ? 'text-indigo-600' : 'text-gray-500'}`}>
            Video Lessons
          </span>
          <p className="text-xs text-gray-500 mt-1 text-center">
            Learn through engaging video content
          </p>
        </button>
        
        <button
          onClick={() => handlePreferenceChange('text')}
          className={`flex-1 flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
            preference === 'text' 
              ? 'border-indigo-500 bg-indigo-50' 
              : 'border-gray-200 hover:border-indigo-300'
          }`}
        >
          <BookOpen size={32} className={preference === 'text' ? 'text-indigo-600' : 'text-gray-400'} />
          <span className={`mt-2 font-medium ${preference === 'text' ? 'text-indigo-600' : 'text-gray-500'}`}>
            Text Lessons
          </span>
          <p className="text-xs text-gray-500 mt-1 text-center">
            Learn through comprehensive reading materials
          </p>
        </button>
      </div>
    </div>
  );
};

export default ContentPreference;