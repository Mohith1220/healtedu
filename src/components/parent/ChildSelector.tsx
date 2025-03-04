import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Users, Plus } from 'lucide-react';

interface ChildSelectorProps {
  onSelectChild: (childId: string, childName: string) => void;
}

const ChildSelector: React.FC<ChildSelectorProps> = ({ onSelectChild }) => {
  const { user, supabase } = useAuth();
  const [children, setChildren] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [showAddChildForm, setShowAddChildForm] = useState(false);
  const [childEmail, setChildEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchChildren = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch children linked to this parent
        const { data, error } = await supabase
          .from('parent_child')
          .select(`
            child_id,
            profiles:child_id (
              id,
              name,
              school
            )
          `)
          .eq('parent_id', user.id);
          
        if (error) throw error;
        
        const childrenData = data?.map(item => item.profiles) || [];
        setChildren(childrenData);
        
        // Select the first child by default if available
        if (childrenData.length > 0 && !selectedChildId) {
          setSelectedChildId(childrenData[0].id);
          onSelectChild(childrenData[0].id, childrenData[0].name);
        }
      } catch (error: any) {
        console.error('Error fetching children:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchChildren();
  }, [user, supabase, onSelectChild, selectedChildId]);

  const handleSelectChild = (childId: string, childName: string) => {
    setSelectedChildId(childId);
    onSelectChild(childId, childName);
  };

  const handleAddChild = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!childEmail) {
      setError('Please enter your child\'s email address');
      return;
    }
    
    try {
      setError(null);
      setSuccess(null);
      
      // Find the child's profile by email
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id, name, role')
        .eq('email', childEmail)
        .single();
        
      if (userError) {
        throw new Error('Child not found with this email address');
      }
      
      if (userData.role !== 'student') {
        throw new Error('This email does not belong to a student account');
      }
      
      // Check if already linked
      const { data: existingLink, error: linkError } = await supabase
        .from('parent_child')
        .select('*')
        .eq('parent_id', user?.id)
        .eq('child_id', userData.id)
        .single();
        
      if (existingLink) {
        throw new Error('This child is already linked to your account');
      }
      
      // Create the parent-child link
      const { error: insertError } = await supabase
        .from('parent_child')
        .insert({
          parent_id: user?.id,
          child_id: userData.id
        });
        
      if (insertError) throw insertError;
      
      setSuccess(`Successfully linked to ${userData.name}'s account`);
      setChildEmail('');
      setShowAddChildForm(false);
      
      // Refresh the children list
      const { data: updatedData } = await supabase
        .from('parent_child')
        .select(`
          child_id,
          profiles:child_id (
            id,
            name,
            school
          )
        `)
        .eq('parent_id', user?.id);
        
      const updatedChildren = updatedData?.map(item => item.profiles) || [];
      setChildren(updatedChildren);
      
      // Select the newly added child
      if (userData) {
        setSelectedChildId(userData.id);
        onSelectChild(userData.id, userData.name);
      }
    } catch (error: any) {
      console.error('Error adding child:', error);
      setError(error.message || 'Failed to link child account');
    }
  };

  if (loading) {
    return <div className="animate-pulse h-20 bg-gray-200 rounded-lg"></div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Users size={20} className="mr-2 text-indigo-600" />
        Your Children
      </h2>
      
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-800 rounded-lg p-3 text-sm">
          {success}
        </div>
      )}
      
      {children.length > 0 ? (
        <div className="space-y-2 mb-4">
          {children.map((child) => (
            <button
              key={child.id}
              onClick={() => handleSelectChild(child.id, child.name)}
              className={`w-full text-left px-4 py-3 rounded-lg ${
                selectedChildId === child.id 
                  ? 'bg-indigo-50 border border-indigo-200' 
                  : 'border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-medium">
                    {child.name.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">{child.name}</p>
                  {child.school && (
                    <p className="text-xs text-gray-500">{child.school}</p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 mb-4 border border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">No children linked to your account yet</p>
        </div>
      )}
      
      {showAddChildForm ? (
        <form onSubmit={handleAddChild} className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Link Child Account</h3>
          <div className="mb-3">
            <label htmlFor="childEmail" className="block text-xs text-gray-500 mb-1">
              Child's Email Address
            </label>
            <input
              type="email"
              id="childEmail"
              value={childEmail}
              onChange={(e) => setChildEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Enter your child's email"
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
            >
              Link Account
            </button>
            <button
              type="button"
              onClick={() => setShowAddChildForm(false)}
              className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowAddChildForm(true)}
          className="w-full flex items-center justify-center px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:text-indigo-600 hover:border-indigo-300"
        >
          <Plus size={16} className="mr-1" />
          Add Child
        </button>
      )}
    </div>
  );
};

export default ChildSelector;