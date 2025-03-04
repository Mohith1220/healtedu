import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface UseSupabaseDataOptions {
  table: string;
  columns?: string;
  filter?: Record<string, any>;
  orderBy?: { column: string; ascending?: boolean };
  limit?: number;
  dependencies?: any[];
}

// Mock data for different tables
const mockData: Record<string, any[]> = {
  'profiles': [
    { id: '1', name: 'Student User', role: 'student', school: 'Health Academy' },
    { id: '2', name: 'Teacher User', role: 'teacher', school: 'Health Academy' },
    { id: '3', name: 'Parent User', role: 'parent' }
  ],
  'course_content': [
    { 
      id: '1', 
      topic_id: 'nutrition', 
      title: 'Introduction to Nutrition', 
      content_type: 'text',
      content: '<h2>Understanding Nutrition</h2><p>Nutrition is the science that interprets the nutrients and other substances in food...</p>'
    },
    { 
      id: '2', 
      topic_id: 'nutrition', 
      title: 'Macronutrients Explained', 
      content_type: 'video',
      content: 'https://www.youtube.com/watch?v=example'
    },
    { 
      id: '3', 
      topic_id: 'physical-activity', 
      title: 'Benefits of Regular Exercise', 
      content_type: 'text',
      content: '<h2>Why Exercise Matters</h2><p>Regular physical activity is one of the most important things you can do for your health...</p>'
    }
  ],
  'assignments': [
    {
      id: '1',
      title: 'Nutrition Quiz',
      description: 'Test your knowledge about healthy eating and nutrition fundamentals.',
      due_date: '2025-04-15T14:00:00Z',
      teacher_id: '2'
    },
    {
      id: '2',
      title: 'Physical Activity Assessment',
      description: 'Complete this quiz to test your understanding of physical fitness concepts.',
      due_date: '2025-04-20T14:00:00Z',
      teacher_id: '2'
    }
  ],
  'student_assignments': [
    {
      id: '1',
      assignment_id: '1',
      student_id: '1',
      status: 'completed',
      score: 85
    },
    {
      id: '2',
      assignment_id: '2',
      student_id: '1',
      status: 'assigned'
    }
  ],
  'student_progress': [
    {
      id: '1',
      student_id: '1',
      content_id: '1',
      completed: true,
      preferred_content_type: 'text'
    },
    {
      id: '2',
      student_id: '1',
      content_id: '2',
      completed: false,
      preferred_content_type: 'video'
    }
  ],
  'parent_child': [
    {
      id: '1',
      parent_id: '3',
      child_id: '1'
    }
  ],
  'health_logs': [
    {
      id: '1',
      student_id: '1',
      date: '2025-03-01',
      water_intake: 6,
      sleep_hours: 7.5,
      exercise_minutes: 30,
      mood: 'happy'
    },
    {
      id: '2',
      student_id: '1',
      date: '2025-03-02',
      water_intake: 5,
      sleep_hours: 6.5,
      exercise_minutes: 15,
      mood: 'neutral'
    }
  ]
};

export function useSupabaseData<T>(options: UseSupabaseDataOptions) {
  const { table, columns = '*', filter, orderBy, limit, dependencies = [] } = options;
  const { user } = useAuth();
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Get mock data for the table
        let result = mockData[table] || [];
        
        // Apply filters if provided
        if (filter) {
          Object.entries(filter).forEach(([key, value]) => {
            result = result.filter(item => item[key] === value);
          });
        }
        
        // Apply ordering if provided
        if (orderBy) {
          result.sort((a, b) => {
            if (a[orderBy.column] < b[orderBy.column]) return orderBy.ascending ?? true ? -1 : 1;
            if (a[orderBy.column] > b[orderBy.column]) return orderBy.ascending ?? true ? 1 : -1;
            return 0;
          });
        }
        
        // Apply limit if provided
        if (limit) {
          result = result.slice(0, limit);
        }
        
        setData(result as T[]);
      } catch (err: any) {
        console.error(`Error fetching data from ${table}:`, err);
        setError(err.message || `Failed to load data from ${table}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user, table, columns, JSON.stringify(filter), JSON.stringify(orderBy), limit, ...dependencies]);

  return { data, loading, error, refetch: () => setLoading(true) };
}