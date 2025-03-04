import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Award, Activity, AlertCircle } from 'lucide-react';

interface ChildProgressChartProps {
  childId: string;
  childName: string;
}

interface ProgressData {
  topic: string;
  completed: number;
  total: number;
  quizScores: number[];
}

const ChildProgressChart: React.FC<ChildProgressChartProps> = ({ childId, childName }) => {
  const { supabase } = useAuth();
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'progress' | 'quizzes' | 'activity'>('progress');

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        // Fetch content completion data
        const { data: contentData, error: contentError } = await supabase
          .from('student_progress')
          .select(`
            content_id,
            completed,
            course_content(topic_id, title)
          `)
          .eq('student_id', childId);

        if (contentError) throw contentError;

        // Fetch quiz scores
        const { data: quizData, error: quizError } = await supabase
          .from('student_assignments')
          .select(`
            score,
            assignments(title, id)
          `)
          .eq('student_id', childId)
          .not('score', 'is', null);

        if (quizError) throw quizError;

        // Process data for charts
        const topicsMap = new Map<string, ProgressData>();
        
        // Process content data
        if (contentData) {
          contentData.forEach((item: any) => {
            const topicId = item.course_content?.topic_id || 'unknown';
            const topicName = getTopicName(topicId);
            
            if (!topicsMap.has(topicId)) {
              topicsMap.set(topicId, {
                topic: topicName,
                completed: 0,
                total: 0,
                quizScores: []
              });
            }
            
            const topicData = topicsMap.get(topicId)!;
            topicData.total += 1;
            if (item.completed) {
              topicData.completed += 1;
            }
          });
        }
        
        // Process quiz data
        if (quizData) {
          quizData.forEach((item: any) => {
            // For simplicity, we're just adding quiz scores to a general category
            // In a real app, you'd want to associate quizzes with specific topics
            const topicId = 'quizzes';
            const topicName = 'Quizzes';
            
            if (!topicsMap.has(topicId)) {
              topicsMap.set(topicId, {
                topic: topicName,
                completed: 0,
                total: 0,
                quizScores: []
              });
            }
            
            const topicData = topicsMap.get(topicId)!;
            if (item.score) {
              topicData.quizScores.push(item.score);
            }
          });
        }
        
        setProgressData(Array.from(topicsMap.values()));
      } catch (error: any) {
        console.error('Error fetching progress data:', error);
        setError(error.message || 'Failed to load progress data');
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, [supabase, childId]);

  // Helper function to get topic name from ID
  const getTopicName = (topicId: string): string => {
    const topicNames: Record<string, string> = {
      'nutrition': 'Nutrition',
      'physical-activity': 'Physical Activity',
      'mental-health': 'Mental Health',
      'personal-hygiene': 'Personal Hygiene',
      'first-aid': 'First Aid',
      'health-literacy': 'Health Literacy',
      'quizzes': 'Quizzes'
    };
    
    return topicNames[topicId] || topicId;
  };

  // Prepare chart data
  const progressChartData = progressData.map(item => ({
    topic: item.topic,
    completionRate: item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0,
    completed: item.completed,
    total: item.total
  }));

  const quizChartData = progressData
    .filter(item => item.quizScores.length > 0)
    .map(item => ({
      topic: item.topic,
      averageScore: Math.round(item.quizScores.reduce((sum, score) => sum + score, 0) / item.quizScores.length),
      quizzesTaken: item.quizScores.length
    }));

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex justify-center items-center h-64">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-indigo-600 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading progress data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 flex items-start">
          <AlertCircle size={20} className="text-red-500 mr-2 mt-0.5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">{childName}'s Learning Progress</h2>
      </div>
      
      <div className="border-b border-gray-200">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-6 py-4 text-sm font-medium flex items-center ${
              activeTab === 'progress' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <BookOpen size={18} className="mr-2" />
            Content Progress
          </button>
          
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`px-6 py-4 text-sm font-medium flex items-center ${
              activeTab === 'quizzes' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Award size={18} className="mr-2" />
            Quiz Performance
          </button>
          
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-6 py-4 text-sm font-medium flex items-center ${
              activeTab === 'activity' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Activity size={18} className="mr-2" />
            Recent Activity
          </button>
        </nav>
      </div>
      
      <div className="p-6">
        {activeTab === 'progress' && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Content Completion by Topic</h3>
            
            {progressChartData.length > 0 ? (
              <div className="h-80">
                <div className="space-y-4">
                  {progressChartData.map((item, index) => (
                    <div key={index} className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                            {item.topic}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-indigo-600">
                            {item.completionRate}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                        <div style={{ width: `${item.completionRate}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No content progress data available yet.
              </div>
            )}
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {progressChartData.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{item.topic}</h4>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{item.completed} of {item.total} lessons completed</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${item.completionRate}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'quizzes' && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quiz Performance</h3>
            
            {quizChartData.length > 0 ? (
              <div className="h-80">
                <div className="space-y-4">
                  {quizChartData.map((item, index) => (
                    <div key={index} className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                            {item.topic}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-green-600">
                            {item.averageScore}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                        <div style={{ width: `${item.averageScore}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No quiz data available yet.
              </div>
            )}
            
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-3">Quiz Performance Summary</h4>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Topic
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quizzes Taken
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Average Score
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Performance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {quizChartData.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.topic}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.quizzesTaken}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.averageScore}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.averageScore >= 80 ? 'bg-green-100 text-green-800' :
                            item.averageScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {item.averageScore >= 80 ? 'Excellent' :
                             item.averageScore >= 60 ? 'Good' :
                             'Needs Improvement'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'activity' && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Learning Activity</h3>
            
            <div className="space-y-4">
              {/* This would be populated with real data in a production app */}
              <div className="border-l-4 border-indigo-500 pl-4 py-2">
                <p className="text-sm text-gray-600">Yesterday</p>
                <p className="font-medium">Completed "Nutrition Basics" quiz with score 85%</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <p className="text-sm text-gray-600">3 days ago</p>
                <p className="font-medium">Completed lesson "Understanding Macronutrients"</p>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <p className="text-sm text-gray-600">5 days ago</p>
                <p className="font-medium">Started "Physical Activity" module</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <p className="text-sm text-gray-600">1 week ago</p>
                <p className="font-medium">Changed content preference to video lessons</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-3">Learning Habits</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Preferred Learning Method</p>
                  <p className="text-xl font-bold text-indigo-600">Video Lessons</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Average Study Time</p>
                  <p className="text-xl font-bold text-indigo-600">25 min/day</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Most Active Day</p>
                  <p className="text-xl font-bold text-indigo-600">Wednesday</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildProgressChart;