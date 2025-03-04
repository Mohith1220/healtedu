import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// User type
type User = {
  id: string;
  email: string;
  user_metadata: {
    name?: string;
    role?: 'student' | 'teacher' | 'parent';
    school?: string;
  };
};

type AuthContextType = {
  user: User | null;
  session: any;
  supabase: any; // Keep for compatibility
  signUp: (email: string, password: string, userData: any) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for testing
const mockUsers = [
  {
    id: '1',
    email: 'student@example.com',
    password: 'password123',
    user_metadata: {
      name: 'Student User',
      role: 'student',
      school: 'Health Academy'
    }
  },
  {
    id: '2',
    email: 'teacher@example.com',
    password: 'password123',
    user_metadata: {
      name: 'Teacher User',
      role: 'teacher',
      school: 'Health Academy'
    }
  },
  {
    id: '3',
    email: 'parent@example.com',
    password: 'password123',
    user_metadata: {
      name: 'Parent User',
      role: 'parent'
    }
  }
];

// Mock database for storing user data
const mockDatabase = {
  // Mock method to query data
  from: (table: string) => {
    const tables: Record<string, any[]> = {
      'profiles': mockUsers,
      'course_content': [],
      'assignments': [],
      'student_assignments': [],
      'student_progress': [],
      'parent_child': [],
      'health_logs': []
    };
    
    return {
      select: (columns: string = '*') => {
        return {
          eq: (column: string, value: any) => {
            return {
              single: () => {
                const result = tables[table]?.find(item => item[column] === value);
                return { data: result, error: result ? null : { message: 'Not found', code: 'PGRST116' } };
              },
              limit: (limit: number) => {
                const results = tables[table]?.filter(item => item[column] === value).slice(0, limit);
                return { data: results, error: null };
              }
            };
          },
          order: (column: string, options: { ascending: boolean }) => {
            return { data: tables[table], error: null };
          },
          limit: (limit: number) => {
            return { data: tables[table]?.slice(0, limit), error: null };
          }
        };
      },
      insert: (data: any) => {
        return { data, error: null };
      },
      update: (data: any) => {
        return {
          eq: (column: string, value: any) => {
            return { data, error: null };
          }
        };
      },
      upsert: (data: any, options: any) => {
        return { data, error: null };
      }
    };
  },
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: (callback: Function) => {
      return {
        data: {
          subscription: {
            unsubscribe: () => {}
          }
        }
      };
    },
    signUp: ({ email, password, options }: any) => {
      const existingUser = mockUsers.find(user => user.email === email);
      if (existingUser) {
        return Promise.resolve({ data: null, error: { message: 'User already exists' } });
      }
      
      const newUser = {
        id: `${mockUsers.length + 1}`,
        email,
        password,
        user_metadata: options.data
      };
      
      mockUsers.push(newUser);
      return Promise.resolve({ data: { user: newUser }, error: null });
    },
    signInWithPassword: ({ email, password }: any) => {
      const user = mockUsers.find(user => user.email === email && user.password === password);
      if (!user) {
        return Promise.resolve({ data: null, error: { message: 'Invalid login credentials' } });
      }
      
      return Promise.resolve({ 
        data: { 
          user,
          session: { user }
        }, 
        error: null 
      });
    },
    signOut: () => Promise.resolve({ error: null })
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate getting initial session
    const getInitialSession = async () => {
      setLoading(true);
      
      // Check if there's a user in localStorage (for persistence)
      const storedUser = localStorage.getItem('mockUser');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setSession({ user: parsedUser });
      }
      
      setLoading(false);
    };
    
    getInitialSession();
  }, []);

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const { data, error } = await mockDatabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await mockDatabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      // Set user and session
      setUser(data.user);
      setSession(data.session);
      
      // Store user in localStorage for persistence
      localStorage.setItem('mockUser', JSON.stringify(data.user));
      
      return data;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await mockDatabase.auth.signOut();
      setUser(null);
      setSession(null);
      localStorage.removeItem('mockUser');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    user,
    session,
    supabase: mockDatabase, // Provide the mock database as supabase
    signUp,
    signIn,
    signOut,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}