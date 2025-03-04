// Mock Supabase client
const mockClient = {
  from: (table: string) => {
    return {
      select: (columns: string = '*') => {
        return {
          eq: (column: string, value: any) => {
            return {
              single: () => {
                return { data: null, error: null };
              },
              limit: (limit: number) => {
                return { data: [], error: null };
              }
            };
          },
          order: (column: string, options: { ascending: boolean }) => {
            return { data: [], error: null };
          },
          limit: (limit: number) => {
            return { data: [], error: null };
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
      return Promise.resolve({ data: null, error: null });
    },
    signInWithPassword: ({ email, password }: any) => {
      return Promise.resolve({ data: null, error: null });
    },
    signOut: () => Promise.resolve({ error: null })
  }
};

export const supabase = mockClient;