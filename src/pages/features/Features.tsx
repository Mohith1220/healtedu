import React from 'react';
import { BookOpen, Brain, Activity, Award, Users, Clock, Zap, Globe, Shield } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Platform Features</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Discover how HealthEduConnect makes health education engaging, interactive, and effective.
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Features</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
              Our platform combines gamification, personalization, and tracking to create an engaging health education experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <BookOpen size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Gamified Quizzes</h3>
              <p className="text-gray-600">
                Interactive quizzes with immediate feedback make learning health concepts fun and engaging. 
                Earn points and badges as you progress through different health topics.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <Brain size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Health Tips</h3>
              <p className="text-gray-600">
                Receive personalized health recommendations based on your quiz performance and daily tracking data. 
                Our AI system adapts to your specific health education needs.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <Activity size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Health Tracking</h3>
              <p className="text-gray-600">
                Monitor your daily habits like water intake, sleep, exercise, and mood. 
                Visualize your progress over time with easy-to-understand charts and graphs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feature Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Engaging Learning Experience</h2>
              <div className="w-24 h-1 bg-indigo-600 mb-6"></div>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Award size={24} className="text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Achievement System</h3>
                    <p className="mt-2 text-gray-600">
                      Earn badges and certificates as you complete quizzes, maintain healthy habits, and reach milestones.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Users size={24} className="text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Social Learning</h3>
                    <p className="mt-2 text-gray-600">
                      Participate in group challenges with classmates and friends to reinforce healthy habits together.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Clock size={24} className="text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Adaptive Learning</h3>
                    <p className="mt-2 text-gray-600">
                      Our platform adjusts to your learning pace and focuses on areas where you need more practice.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Students learning together" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Teacher using digital platform" 
                className="rounded-lg shadow-xl"
              />
            </div>
            
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Powerful Tools for Educators</h2>
              <div className="w-24 h-1 bg-indigo-600 mb-6"></div>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Zap size={24} className="text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Custom Quiz Creation</h3>
                    <p className="mt-2 text-gray-600">
                      Teachers can easily create and customize health quizzes tailored to their curriculum and student needs.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <BarChart size={24} className="text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Performance Analytics</h3>
                    <p className="mt-2 text-gray-600">
                      Comprehensive dashboards show student progress, identify knowledge gaps, and track class performance.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Users size={24} className="text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Parent Communication</h3>
                    <p className="mt-2 text-gray-600">
                      Keep parents informed about their child's health education progress and achievements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Additional Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Features</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <Globe size={24} className="text-indigo-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Multi-Language Support</h3>
              <p className="text-gray-600">
                Access content in multiple languages to support diverse student populations.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <Shield size={24} className="text-indigo-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Privacy-Focused</h3>
              <p className="text-gray-600">
                Robust data protection ensures student information remains secure and private.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <Smartphone size={24} className="text-indigo-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Mobile Friendly</h3>
              <p className="text-gray-600">
                Access all features on any device - desktop, tablet, or smartphone.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <FileText size={24} className="text-indigo-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Comprehensive Resources</h3>
              <p className="text-gray-600">
                Access a library of health education materials, videos, and activities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform health education?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of students, teachers, and parents who are making health education engaging and effective.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/signup"
              className="px-8 py-4 bg-white text-indigo-600 font-medium rounded-lg shadow-md hover:bg-gray-100 transition duration-300 inline-block"
            >
              Sign Up For Free
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-indigo-600 transition duration-300 inline-block"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;

// Import missing components
function BarChart(props: any) {
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
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
      <line x1="3" y1="20" x2="21" y2="20"></line>
    </svg>
  );
}

function Smartphone(props: any) {
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
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
      <line x1="12" y1="18" x2="12.01" y2="18"></line>
    </svg>
  );
}

function FileText(props: any) {
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  );
}