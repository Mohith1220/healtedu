import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Video, Upload, Check, AlertCircle } from 'lucide-react';

interface ContentUploaderProps {
  onContentUploaded: () => void;
}

const ContentUploader: React.FC<ContentUploaderProps> = ({ onContentUploaded }) => {
  const { user, supabase } = useAuth();
  const [title, setTitle] = useState('');
  const [topicId, setTopicId] = useState('');
  const [contentType, setContentType] = useState<'video' | 'text'>('text');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Mock topics for dropdown
  const topics = [
    { id: 'nutrition', name: 'Nutrition & Healthy Eating' },
    { id: 'physical-activity', name: 'Physical Activity & Fitness' },
    { id: 'mental-health', name: 'Mental Health & Wellbeing' },
    { id: 'personal-hygiene', name: 'Personal Hygiene' },
    { id: 'first-aid', name: 'First Aid & Safety' },
    { id: 'health-literacy', name: 'Health Literacy' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !topicId || !content) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Prepare the content data
      const contentData = {
        title,
        topic_id: topicId,
        content_type: contentType,
        content,
        created_by: user?.id
      };

      console.log('Submitting content:', contentData);

      // Insert the content into the database
      const { data, error } = await supabase
        .from('course_content')
        .insert(contentData)
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Content uploaded successfully:', data);
      setSuccess('Content uploaded successfully!');
      setTitle('');
      setTopicId('');
      setContent('');
      onContentUploaded();
    } catch (error: any) {
      console.error('Error uploading content:', error);
      setError(error.message || 'Failed to upload content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload Learning Content</h2>
      
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 flex items-start">
          <AlertCircle size={20} className="text-red-500 mr-2 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 flex items-start">
          <Check size={20} className="text-green-500 mr-2 mt-0.5" />
          <span>{success}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Content Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter content title"
            />
          </div>
          
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
              Topic
            </label>
            <select
              id="topic"
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a topic</option>
              {topics.map(topic => (
                <option key={topic.id} value={topic.id}>{topic.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Content Type
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setContentType('video')}
                className={`flex-1 flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                  contentType === 'video' 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
              >
                <Video size={32} className={contentType === 'video' ? 'text-indigo-600' : 'text-gray-400'} />
                <span className={`mt-2 font-medium ${contentType === 'video' ? 'text-indigo-600' : 'text-gray-500'}`}>
                  Video
                </span>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  Upload video content (URL)
                </p>
              </button>
              
              <button
                type="button"
                onClick={() => setContentType('text')}
                className={`flex-1 flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                  contentType === 'text' 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
              >
                <BookOpen size={32} className={contentType === 'text' ? 'text-indigo-600' : 'text-gray-400'} />
                <span className={`mt-2 font-medium ${contentType === 'text' ? 'text-indigo-600' : 'text-gray-500'}`}>
                  Text
                </span>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  Upload text content
                </p>
              </button>
            </div>
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              {contentType === 'video' ? 'Video URL' : 'Text Content'}
            </label>
            {contentType === 'video' ? (
              <input
                type="url"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter video URL (YouTube, Vimeo, etc.)"
              />
            ) : (
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter text content (supports HTML formatting)"
              ></textarea>
            )}
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={18} className="mr-2" />
                  Upload Content
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContentUploader;