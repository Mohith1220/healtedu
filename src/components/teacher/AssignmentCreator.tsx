import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Clock, Users, Plus, X } from 'lucide-react';

interface Student {
  id: string;
  name: string;
}

interface AssignmentCreatorProps {
  onAssignmentCreated: () => void;
}

const AssignmentCreator: React.FC<AssignmentCreatorProps> = ({ onAssignmentCreated }) => {
  const { user, supabase } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loadingStudents, setLoadingStudents] = useState(true);

  // Fetch students when component mounts
  React.useEffect(() => {
    const fetchStudents = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, name')
          .eq('role', 'student');

        if (error) {
          throw error;
        }

        if (data) {
          setStudents(data);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoadingStudents(false);
      }
    };

    fetchStudents();
  }, [user, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !dueDate || !dueTime || selectedStudents.length === 0) {
      setError('Please fill in all fields and select at least one student.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Create the assignment
      const { data: assignmentData, error: assignmentError } = await supabase
        .from('assignments')
        .insert({
          title,
          description,
          due_date: `${dueDate}T${dueTime}:00`,
          teacher_id: user?.id
        })
        .select()
        .single();

      if (assignmentError) {
        throw assignmentError;
      }

      if (!assignmentData) {
        throw new Error('Failed to create assignment');
      }

      // Assign to selected students
      const studentAssignments = selectedStudents.map(studentId => ({
        assignment_id: assignmentData.id,
        student_id: studentId,
        status: 'assigned'
      }));

      const { error: assignError } = await supabase
        .from('student_assignments')
        .insert(studentAssignments);

      if (assignError) {
        throw assignError;
      }

      setSuccess('Assignment created and assigned successfully!');
      setTitle('');
      setDescription('');
      setDueDate('');
      setDueTime('');
      setSelectedStudents([]);
      onAssignmentCreated();
    } catch (error: any) {
      console.error('Error creating assignment:', error);
      setError(error.message || 'Failed to create assignment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleStudentSelection = (studentId: string) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Assignment</h2>
      
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-800 rounded-lg p-4">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Assignment Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter assignment title"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter assignment description"
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar size={16} className="inline mr-1" />
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="dueTime" className="block text-sm font-medium text-gray-700 mb-1">
                <Clock size={16} className="inline mr-1" />
                Due Time
              </label>
              <input
                type="time"
                id="dueTime"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Users size={16} className="inline mr-1" />
              Assign to Students
            </label>
            
            {loadingStudents ? (
              <div className="text-center py-4">Loading students...</div>
            ) : (
              <>
                <div className="mb-2 flex flex-wrap gap-2">
                  {selectedStudents.length > 0 ? (
                    selectedStudents.map(studentId => {
                      const student = students.find(s => s.id === studentId);
                      return (
                        <div 
                          key={studentId}
                          className="inline-flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                        >
                          {student?.name}
                          <button 
                            type="button"
                            onClick={() => toggleStudentSelection(studentId)}
                            className="ml-1 text-indigo-600 hover:text-indigo-800"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-sm text-gray-500">No students selected</div>
                  )}
                </div>
                
                <div className="border border-gray-300 rounded-md max-h-48 overflow-y-auto">
                  {students.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {students.map(student => (
                        <li key={student.id} className="px-4 py-2 hover:bg-gray-50">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedStudents.includes(student.id)}
                              onChange={() => toggleStudentSelection(student.id)}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <span className="ml-2">{student.name}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-center text-gray-500">No students found</div>
                  )}
                </div>
              </>
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
                  Creating...
                </>
              ) : (
                <>
                  <Plus size={18} className="mr-2" />
                  Create Assignment
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AssignmentCreator;