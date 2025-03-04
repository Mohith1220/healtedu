import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/about/About';
import Features from './pages/features/Features';
import Contact from './pages/contact/Contact';
import LearningTopics from './pages/learning/LearningTopics';
import LearningContent from './pages/learning/LearningContent';
import QuizPage from './pages/quiz/QuizPage';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import TeacherDashboard from './pages/dashboard/TeacherDashboard';
import ParentDashboard from './pages/dashboard/ParentDashboard';
import HealthTracker from './pages/health/HealthTracker';
import { AuthProvider, useAuth } from './context/AuthContext';
import './i18n';

// Protected route component
const ProtectedRoute = ({ children, allowedRoles = [] }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  const userRole = user.user_metadata?.role || 'student';
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'student') {
      return <Navigate to="/dashboard/student" replace />;
    } else if (userRole === 'teacher') {
      return <Navigate to="/dashboard/teacher" replace />;
    } else if (userRole === 'parent') {
      return <Navigate to="/dashboard/parent" replace />;
    }
  }
  
  return <>{children}</>;
};

// Dashboard router component
const DashboardRouter = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  const userRole = user.user_metadata?.role || 'student';
  
  if (userRole === 'student') {
    return <Navigate to="/dashboard/student" replace />;
  } else if (userRole === 'teacher') {
    return <Navigate to="/dashboard/teacher" replace />;
  } else if (userRole === 'parent') {
    return <Navigate to="/dashboard/parent" replace />;
  }
  
  return <Navigate to="/" replace />;
};

function AppContent() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Learning routes */}
            <Route path="/learn" element={<LearningTopics />} />
            <Route path="/learn/:topicId" element={<LearningContent />} />
            
            {/* Quiz routes */}
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/quiz/:quizId" element={<QuizPage />} />
            
            {/* Dashboard routes */}
            <Route path="/dashboard" element={<DashboardRouter />} />
            <Route 
              path="/dashboard/student" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/teacher" 
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/parent" 
              element={
                <ProtectedRoute allowedRoles={['parent']}>
                  <ParentDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Health tracker */}
            <Route 
              path="/health-tracker" 
              element={
                <ProtectedRoute>
                  <HealthTracker />
                </ProtectedRoute>
              } 
            />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;