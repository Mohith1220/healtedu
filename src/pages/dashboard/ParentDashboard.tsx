import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Activity, Calendar, TrendingUp, MessageCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ChildSelector from '../../components/parent/ChildSelector';
import ChildProgressChart from '../../components/parent/ChildProgressChart';

const ParentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [selectedChildName, setSelectedChildName] = useState<string>('');
  
  const handleSelectChild = (childId: string, childName: string) => {
    setSelectedChildId(childId);
    setSelectedChildName(childName);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Parent Dashboard</h1>
          <p className="text-gray-600">Monitor your child's health education progress</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Left */}
          <div className="space-y-8">
            {/* Child Selector */}
            <ChildSelector onSelectChild={handleSelectChild} />
            
            {/* Quick Stats */}
            {selectedChildId && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp size={20} className="mr-2 text-indigo-600" />
                  Quick Stats
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Completed Lessons</p>
                    <p className="text-xl font-bold text-indigo-600">12</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Quiz Average</p>
                    <p className="text-xl font-bold text-green-600">78%</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Health Log Streak</p>
                    <p className="text-xl font-bold text-orange-600">5 days</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Recent Activity */}
            {selectedChildId && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Activity size={20} className="mr-2 text-indigo-600" />
                  Recent Activity
                </h2>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-indigo-500 pl-4 py-2">
                    <p className="text-sm text-gray-600">Yesterday</p>
                    <p className="font-medium">Completed "Nutrition Basics" quiz</p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <p className="text-sm text-gray-600">3 days ago</p>
                    <p className="font-medium">Logged health data for 7 days straight</p>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-4 py-2">
                    <p className="text-sm text-gray-600">1 week ago</p>
                    <p className="font-medium">Started "Physical Activity" module</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Upcoming */}
            {selectedChildId && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar size={20} className="mr-2 text-indigo-600" />
                  Upcoming
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-indigo-100 mr-3">
                      <BookOpen size={16} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium">Mental Health Quiz</p>
                      <p className="text-sm text-gray-500">Due in 2 days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-green-100 mr-3">
                      <Activity size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Physical Activity Challenge</p>
                      <p className="text-sm text-gray-500">Starts next week</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Main Content - Right */}
          <div className="lg:col-span-3 space-y-8">
            {selectedChildId ? (
              <>
                {/* Progress Chart */}
                <ChildProgressChart 
                  childId={selectedChildId} 
                  childName={selectedChildName} 
                />
                
                {/* Health Tracking */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <Activity size={20} className="mr-2 text-indigo-600" />
                    Health Tracking
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <div className="text-blue-600 mb-2">
                        <Droplet size={24} className="mx-auto" />
                      </div>
                      <p className="text-sm text-gray-600">Water Intake</p>
                      <p className="text-xl font-bold text-gray-900">6 glasses</p>
                      <p className="text-xs text-gray-500">Daily average</p>
                    </div>
                    
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <div className="text-purple-600 mb-2">
                        <Moon size={24} className="mx-auto" />
                      </div>
                      <p className="text-sm text-gray-600">Sleep</p>
                      <p className="text-xl font-bold text-gray-900">7.5 hours</p>
                      <p className="text-xs text-gray-500">Daily average</p>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="text-green-600 mb-2">
                        <Activity size={24} className="mx-auto" />
                      </div>
                      <p className="text-sm text-gray-600">Exercise</p>
                      <p className="text-xl font-bold text-gray-900">35 minutes</p>
                      <p className="text-xs text-gray-500">Daily average</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Link 
                      to={`/health-tracker?childId=${selectedChildId}`}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 inline-block"
                    >
                      View Detailed Health Data
                    </Link>
                  </div>
                </div>
                
                {/* Message Teacher */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <MessageCircle size={20} className="mr-2 text-indigo-600" />
                    Message Teacher
                  </h2>
                  
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Send a message to {selectedChildName}'s teacher
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Type your message here..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="button"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 inline-block"
                  >
                    Send Message
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <Users size={48} className="mx-auto text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Select a Child</h2>
                <p className="text-gray-600 mb-6">
                  Please select a child from the sidebar to view their health education progress.
                </p>
                <p className="text-gray-500 text-sm">
                  If you haven't linked any children yet, use the "Add Child" button in the sidebar.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;

// Import missing components
function Droplet(props: any) {
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
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
    </svg>
  );
}

function Moon(props: any) {
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
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  );
}