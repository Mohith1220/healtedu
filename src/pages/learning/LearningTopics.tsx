import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, Activity, Heart, Shield, Apple } from 'lucide-react';
import { topics } from '../../data/staticData';

const LearningTopics: React.FC = () => {
  // Get icon component based on topic
  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'apple':
        return <Apple size={32} className="text-green-600" />;
      case 'activity':
        return <Activity size={32} className="text-blue-600" />;
      case 'brain':
        return <Brain size={32} className="text-purple-600" />;
      case 'shield':
        return <Shield size={32} className="text-indigo-600" />;
      case 'heart':
        return <Heart size={32} className="text-red-600" />;
      case 'book-open':
      default:
        return <BookOpen size={32} className="text-yellow-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="bg-indigo-600 text-white rounded-lg shadow-md mb-12 overflow-hidden">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl font-bold mb-4">Health Education Topics</h1>
            <p className="text-xl max-w-3xl">
              Explore our comprehensive health education topics designed to help you learn about various aspects of health and wellness.
            </p>
          </div>
        </section>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic) => (
            <Link 
              key={topic.id} 
              to={`/learn/${topic.id}`}
              className={`block ${topic.color} border ${topic.borderColor} rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden`}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    {getTopicIcon(topic.icon)}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{topic.title}</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  {topic.description}
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{topic.lessons} Lessons</span>
                  <span>{topic.quizzes} Quizzes</span>
                  <span>{topic.level}</span>
                </div>
              </div>
              <div className="bg-white p-4 border-t border-gray-200">
                <span className="text-indigo-600 font-medium">Explore Topic →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Learning Paths */}
        <section className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Recommended Learning Paths</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">For Beginners</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <span>Personal Hygiene Basics</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <span>Introduction to Nutrition</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <span>Physical Activity Fundamentals</span>
                </li>
              </ul>
              <Link to="/learn/personal-hygiene" className="mt-4 px-4 py-2 bg-white text-indigo-600 rounded-md font-medium inline-block">
                Start Path
              </Link>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">For Intermediates</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <span>Advanced Nutrition Concepts</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <span>Mental Health Strategies</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <span>First Aid Essentials</span>
                </li>
              </ul>
              <Link to="/learn/nutrition" className="mt-4 px-4 py-2 bg-white text-indigo-600 rounded-md font-medium inline-block">
                Start Path
              </Link>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">For Advanced</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <span>Health Literacy & Advocacy</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <span>Specialized Nutrition Topics</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <span>Mental Health Deep Dive</span>
                </li>
              </ul>
              <Link to="/learn/health-literacy" className="mt-4 px-4 py-2 bg-white text-indigo-600 rounded-md font-medium inline-block">
                Start Path
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LearningTopics;