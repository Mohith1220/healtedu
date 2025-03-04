import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Award, Calendar, Plus, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AssignmentCreator from '../../components/teacher/AssignmentCreator';
import ContentUploader from '../../components/teacher/ContentUploader';

const TeacherDashboard: React.FC = () => {
  const { user, supabase } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'content' | 'assignments'>('overview');
  const [students, setStudents] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAssignmentCreator, setShowAssignmentCreator] = useState(false);
  const [showContentUploader, setShowContentUploader] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Fetch students
        const { data: studentsData, error: studentsError } = await supabase
          .from('profiles')
          .select('id, name, school')
          .eq('role', 'student');
          
        if (studentsError) throw studentsError;
        
        // Fetch assignments created by this teacher
        const { data: assignmentsData, error: assignmentsError } = await supabase
          .from('assignments')
          .select(`
            id, 
            title, 
            description, 
            due_date,
            student_assignments (
              id,
              student_id,
              status,
              score
            )
          `)
          .eq('teacher_id', user.id)
          .order('due_date', { ascending: true });
          
        if (assignmentsError) throw assignmentsError;
        
        // Fetch content created by this teacher
        const { data: contentData, error: contentError } = await supabase
          .from('course_content')
          .select('*')
          .eq('created_by', user.id)
          .order('created_at', { ascending: false });
          
        if (contentError) throw contentError;
        
        setStudents(studentsData || []);
        setAssignments(assignmentsData || []);
        setContent(contentData || []);
      } catch (error: any) {
        console.error('Error fetching dashboard data:', error.message || 'Unknown error');
        setError(error.message || 'Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user, supabase, showAssignmentCreator, showContentUploader]);
  
  const handleAssignmentCreated = () => {
    setShowAssignmentCreator(false);
  };
  
  const handleContentUploaded = () => {
    setShowContentUploader(false);
  };
  
  // Calculate stats
  const totalStudents = students.length;
  const totalAssignments = assignments.length;
  const pendingAssignments = assignments.filter(assignment => {
    const dueDate = new Date(assignment.due_date);
    return dueDate >= new Date();
  }).length;
  const totalContent = content.length;
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Calculate assignment completion stats
  const getAssignmentStats = (assignment: any) => {
    const totalStudents = assignment.student_assignments?.length || 0;
    const completedStudents = assignment.student_assignments?.filter((sa: any) => sa.status === 'completed').length || 0;
    const completionRate = totalStudents > 0 ? Math.round((completedStudents / totalStudents) * 100) : 0;
    
    return {
      totalStudents,
      completedStudents,
      completionRate
    };
  };
  
  if (loading) {
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
          <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-600">Manage your students, content, and assignments</p>
        </div>
        
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 flex items-start">
            <AlertCircle size={20} className="text-red-500 mr-2 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100 mr-4">
                <Users size={24} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <Award size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Assignments</p>
                <p className="text-2xl font-bold text-gray-900">{totalAssignments}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 mr-4">
                <Clock size={24} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Assignments</p>
                <p className="text-2xl font-bold text-gray-900">{pendingAssignments}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <BookOpen size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Learning Content</p>
                <p className="text-2xl font-bold text-gray-900">{totalContent}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
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
                onClick={() => setActiveTab('students')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'students' 
                    ? 'border-b-2 border-indigo-600 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Students
              </button>
              
              <button
                onClick={() => setActiveTab('content')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'content' 
                    ? 'border-b-2 border-indigo-600 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Learning Content
              </button>
              
              <button
                onClick={() => setActiveTab('assignments')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'assignments' 
                    ? 'border-b-2 border-indigo-600 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Assignments
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Assignments */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">Recent Assignments</h2>
                      <button
                        onClick={() => setActiveTab('assignments')}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                      >
                        View All
                      </button>
                    </div>
                    
                    {assignments.length > 0 ? (
                      <div className="space-y-4">
                        {assignments.slice(0, 3).map((assignment) => {
                          const stats = getAssignmentStats(assignment);
                          return (
                            <div key={assignment.id} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                                <span className="text-xs text-gray-500">Due: {formatDate(assignment.due_date)}</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{assignment.description}</p>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">{stats.completedStudents} of {stats.totalStudents} completed</span>
                                <span className={`font-medium ${
                                  stats.completionRate >= 70 ? 'text-green-600' : 
                                  stats.completionRate >= 30 ? 'text-yellow-600' : 
                                  'text-red-600'
                                }`}>
                                  {stats.completionRate}% completion rate
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                        <BookOpen size={32} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500">No assignments created yet</p>
                        <button
                          onClick={() => setShowAssignmentCreator(true)}
                          className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                        >
                          Create your first assignment
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Recent Content */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">Recent Content</h2>
                      <button
                        onClick={() => setActiveTab('content')}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                      >
                        View All
                      </button>
                    </div>
                    
                    {content.length > 0 ? (
                      <div className="space-y-4">
                        {content.slice(0, 3).map((item) => (
                          <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-gray-900">{item.title}</h3>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                item.content_type === 'video' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                              }`}>
                                {item.content_type === 'video' ? 'Video' : 'Text'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">Topic: {item.topic_id}</p>
                            <p className="text-xs text-gray-500">Created: {formatDate(item.created_at)}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                        <BookOpen size={32} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500">No content uploaded yet</p>
                        <button
                          onClick={() => setShowContentUploader(true)}
                          className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                        >
                          Upload your first content
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Calendar Section */}
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Due Dates</h2>
                  
                  {assignments.filter(a => new Date(a.due_date) >= new Date()).length > 0 ? (
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-gray-500">
                          <div>Sun</div>
                          <div>Mon</div>
                          <div>Tue</div>
                          <div>Wed</div>
                          <div>Thu</div>
                          <div>Fri</div>
                          <div>Sat</div>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="space-y-2">
                          {assignments
                            .filter(a => new Date(a.due_date) >= new Date())
                            .slice(0, 3)
                            .map(assignment => (
                              <div key={assignment.id} className="flex items-start p-2 border-l-4 border-indigo-500 bg-indigo-50">
                                <Calendar size={16} className="text-indigo-600 mr-2 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium">{assignment.title}</p>
                                  <p className="text-xs text-gray-500">Due: {formatDate(assignment.due_date)}</p>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                      <Calendar size={32} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-500">No upcoming due dates</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Students Tab */}
            {activeTab === 'students' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Students</h2>
                
                {students.length > 0 ? (
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            School
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Assignments
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Progress
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {students.map((student) => (
                          <tr key={student.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                  <span className="text-indigo-600 font-medium">
                                    {student.name.split(' ').map((n: string) => n[0]).join('')}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{student.school || 'Not specified'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {assignments.filter(a => 
                                  a.student_assignments?.some((sa: any) => sa.student_id === student.id)
                                ).length} assigned
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className="bg-indigo-600 h-2.5 rounded-full" 
                                  style={{ width: '45%' }}
                                ></div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-indigo-600 hover:text-indigo-900">View Details</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                    <Users size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">No students found</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Content Tab */}
            {activeTab === 'content' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Learning Content</h2>
                  <button
                    onClick={() => setShowContentUploader(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
                  >
                    <Plus size={16} className="mr-1" />
                    Upload Content
                  </button>
                </div>
                
                {showContentUploader ? (
                  <ContentUploader onContentUploaded={handleContentUploaded} />
                ) : (
                  <>
                    {content.length > 0 ? (
                      <div className="space-y-6">
                        {content.map((item) => (
                          <div key={item.id} className="border border-gray-200 rounded-lg p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">Topic: {item.topic_id}</p>
                              </div>
                              <span className={`px-3 py-1 text-xs rounded-full ${
                                item.content_type === 'video' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                              }`}>
                                {item.content_type === 'video' ? 'Video' : 'Text'}
                              </span>
                            </div>
                            
                            {item.content_type === 'video' ? (
                              <div className="mt-4">
                                <p className="text-sm text-gray-600 mb-2">Video URL:</p>
                                <a 
                                  href={item.content} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-indigo-600 hover:text-indigo-800"
                                >
                                  {item.content}
                                </a>
                              </div>
                            ) : (
                              <div className="mt-4">
                                <p className="text-sm text-gray-600 mb-2">Content Preview:</p>
                                <div className="border border-gray-200 rounded-md p-4 bg-gray-50 max-h-32 overflow-hidden">
                                  <div dangerouslySetInnerHTML={{ __html: item.content.substring(0, 200) + '...' }}></div>
                                </div>
                              </div>
                            )}
                            
                            <div className="mt-4 text-sm text-gray-500">
                              Created: {formatDate(item.created_at)}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
                        <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-4">You haven't uploaded any content yet</p>
                        <button
                          onClick={() => setShowContentUploader(true)}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                          Upload Your First Content
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
            
            {/* Assignments Tab */}
            {activeTab === 'assignments' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Assignments</h2>
                  <button
                    onClick={() => setShowAssignmentCreator(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
                  >
                    <Plus size={16} className="mr-1" />
                    Create Assignment
                  </button>
                </div>
                
                {showAssignmentCreator ? (
                  <AssignmentCreator onAssignmentCreated={handleAssignmentCreated} />
                ) : (
                  <>
                    {assignments.length > 0 ? (
                      <div className="space-y-6">
                        {assignments.map((assignment) => {
                          const stats = getAssignmentStats(assignment);
                          const isPastDue = new Date(assignment.due_date) < new Date();
                          
                          return (
                            <div 
                              key={assignment.id} 
                              className={`border ${isPastDue ? 'border-gray-200' : 'border-indigo-200'} rounded-lg p-6`}
                            >
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h3 className="text-lg font-medium text-gray-900">{assignment.title}</h3>
                                  <p className="text-sm text-gray-600 mt-1">{assignment.description}</p>
                                </div>
                                <div className={`px-3 py-1 text-xs rounded-full ${
                                  isPastDue ? 'bg-gray-100 text-gray-800' : 'bg-indigo-100 text-indigo-800'
                                }`}>
                                  {isPastDue ? 'Past Due' : 'Active'}
                                </div>
                              </div>
                              
                              <div className="flex items-center text-sm text-gray-500 mb-4">
                                <Calendar size={16} className="mr-1" />
                                <span>Due: {formatDate(assignment.due_date)}</span>
                              </div>
                              
                              <div className="mb-2">
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Completion Rate</span>
                                  <span className="font-medium">{stats.completionRate}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div 
                                    className={`h-2.5 rounded-full ${
                                      stats.completionRate >= 70 ? 'bg-green-600' : 
                                      stats.completionRate >= 30 ? 'bg-yellow-600' : 
                                      'bg-red-600'
                                    }`}
                                    style={{ width: `${stats.completionRate}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <div className="flex items-center text-sm text-gray-600">
                                  <CheckCircle size={16} className="mr-1 text-green-500" />
                                  <span>{stats.completedStudents} of {stats.totalStudents} students completed</span>
                                </div>
                                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                                  View Details
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
                        <Award size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-4">You haven't created any assignments yet</p>
                        <button
                          onClick={() => setShowAssignmentCreator(true)}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                          Create Your First Assignment
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;