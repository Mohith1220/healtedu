import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Brain, Activity, Heart, Shield, Apple, ArrowLeft, ArrowRight, Play } from 'lucide-react';
import VideoPlayer from '../../components/VideoPlayer';
import { topics, courseContent } from '../../data/staticData';

const LearningContent: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'quizzes' | 'resources'>('content');
  const [contentType, setContentType] = useState<'video' | 'text'>('text');
  
  // Get the current topic data
  const currentTopic = topics.find(topic => topic.id === topicId) || topics[0];
  
  // Get content for this topic
  const topicContent = courseContent.filter(content => content.topic_id === topicId);
  
  // Filter content based on preference
  const filteredContent = topicContent.filter(item => item.content_type === contentType);
  
  // Scroll to top when topic changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [topicId]);

  // Get icon component based on topic
  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'apple':
        return <Apple size={32} className="text-green-600" />;
      case 'activity':
        return <Activity size={32} className="text-blue-600" />;
      case 'brain':
        return <Brain size={32} className="text-purple-600" />;
      case 'shield':
        return <Shield size={32} className="text-indigo-600" />;
      case 'heart':
        return <Heart size={32} className="text-red-600" />;
      case 'book-open':
      default:
        return <BookOpen size={32} className="text-yellow-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/learn" className="text-indigo-600 hover:text-indigo-800 flex items-center">
            <ArrowLeft size={16} className="mr-1" />
            Back to Topics
          </Link>
        </div>
        
        {/* Topic Header */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <div className="absolute inset-0">
            <img 
              src={currentTopic.image} 
              alt={currentTopic.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-indigo-900/70"></div>
          </div>
          
          <div className="relative px-8 py-16 md:py-24 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{currentTopic.title}</h1>
            <p className="text-xl max-w-3xl">{currentTopic.description}</p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center">
                <BookOpen size={20} className="mr-2" />
                <span>{topicContent.length} Lessons</span>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center">
                <div className="mr-2">{getTopicIcon(currentTopic.icon)}</div>
                <span>{currentTopic.level}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Preference */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-3">How would you like to learn?</h3>
          <div className="flex space-x-4">
            <button
              onClick={() => setContentType('video')}
              className={`flex-1 flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                contentType === 'video' 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <Video size={32} className={contentType === 'video' ? 'text-indigo-600' : 'text-gray-400'} />
              <span className={`mt-2 font-medium ${contentType === 'video' ? 'text-indigo-600' : 'text-gray-500'}`}>
                Video Lessons
              </span>
              <p className="text-xs text-gray-500 mt-1 text-center">
                Learn through engaging video content
              </p>
            </button>
            
            <button
              onClick={() => setContentType('text')}
              className={`flex-1 flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                contentType === 'text' 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <BookOpen size={32} className={contentType === 'text' ? 'text-indigo-600' : 'text-gray-400'} />
              <span className={`mt-2 font-medium ${contentType === 'text' ? 'text-indigo-600' : 'text-gray-500'}`}>
                Text Lessons
              </span>
              <p className="text-xs text-gray-500 mt-1 text-center">
                Learn through comprehensive reading materials
              </p>
            </button>
          </div>
        </div>
        
        {/* Content Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'overview' 
                    ? 'border-b-2 border-indigo-600 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              
              <button
                onClick={() => setActiveTab('content')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'content' 
                    ? 'border-b-2 border-indigo-600 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Content
              </button>
              
              <button
                onClick={() => setActiveTab('quizzes')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'quizzes' 
                    ? 'border-b-2 border-indigo-600 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Quizzes
              </button>
              
              <button
                onClick={() => setActiveTab('resources')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'resources' 
                    ? 'border-b-2 border-indigo-600 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Resources
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About this Topic</h2>
                <p className="text-gray-600 mb-6">{currentTopic.description}</p>
                
                <h3 className="text-lg font-medium text-gray-900 mb-3">What You'll Learn</h3>
                <ul className="space-y-2 mb-6">
                  {topicContent.map((content) => (
                    <li key={content.id} className="flex items-start">
                      <CheckCircle size={20} className="text-green-500 mr-2 mt-0.5" />
                      <span>{content.title}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => setActiveTab('content')}
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Start Learning
                </button>
              </div>
            )}
            
            {/* Content Tab */}
            {activeTab === 'content' && (
              <div>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Lessons</h2>
                  <div className="space-y-4">
                    {topicContent.map((content, index) => (
                      <div 
                        key={content.id} 
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                              <span className="font-medium text-indigo-600">{index + 1}</span>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{content.title}</h3>
                              <p className="text-sm text-gray-500">
                                {content.content_type === 'video' ? 'Video' : 'Text'} • ~15 min
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Display content based on preference */}
                {contentType === 'video' && filteredContent.length > 0 ? (
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Video Lessons</h3>
                    <div className="space-y-6">
                      {filteredContent.map((content) => (
                        <div key={content.id} className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">{content.title}</h4>
                          <VideoPlayer url={content.content} title={content.title} />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : contentType === 'text' && filteredContent.length > 0 ? (
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Text Lessons</h3>
                    <div className="space-y-6">
                      {filteredContent.map((content) => (
                        <div key={content.id} className="border border-gray-200 rounded-lg p-6">
                          <h4 className="text-xl font-medium text-gray-900 mb-4">{content.title}</h4>
                          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content.content }}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500">No {contentType} content available for this topic yet.</p>
                    <button
                      onClick={() => setContentType(contentType === 'text' ? 'video' : 'text')}
                      className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      Try {contentType === 'text' ? 'video' : 'text'} content instead
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Quizzes Tab */}
            {activeTab === 'quizzes' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Topic Quizzes</h2>
                <p className="text-gray-600 mb-6">Test your knowledge with these quizzes to reinforce your learning.</p>
                
                <div className="space-y-4">
                  <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                    <Award size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">Quizzes are available on the quiz page.</p>
                    <Link 
                      to="/quiz"
                      className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 inline-block"
                    >
                      Go to Quizzes
                    </Link>
                  </div>
                </div>
              </div>
            )}
            
            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Resources</h2>
                <p className="text-gray-600 mb-6">Check out these resources to supplement your learning.</p>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">CDC Health Resources</h3>
                        <p className="text-sm text-gray-500">External Link</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <a 
                        href="https://www.cdc.gov/healthyliving/index.html" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 text-gray-500 hover:text-indigo-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">WHO Health Topics</h3>
                        <p className="text-sm text-gray-500">External Link</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <a 
                        href="https://www.who.int/health-topics" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 text-gray-500 hover:text-indigo-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningContent;

// Import missing components
function Video(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <polygon points="23 7 16 12 23 17 23 7"></polygon>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
    </svg>
  );
}

function CheckCircle(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}