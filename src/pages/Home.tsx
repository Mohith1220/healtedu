import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookOpen, Brain, Activity, Award, Users, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const { t } = useTranslation();
  
  // Mock testimonials data
  const testimonials = [
    {
      quote: t('home.testimonials.1.quote'),
      author: t('home.testimonials.1.author'),
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
    },
    {
      quote: t('home.testimonials.2.quote'),
      author: t('home.testimonials.2.author'),
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
    },
    {
      quote: t('home.testimonials.3.quote'),
      author: t('home.testimonials.3.author'),
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
    }
  ];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t('home.hero.title')}
              </h1>
              <p className="text-xl mb-8">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/learn"
                  className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow-md hover:bg-gray-100 transition duration-300 text-center"
                >
                  {t('home.cta.start')}
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-indigo-600 transition duration-300 text-center"
                >
                  {t('home.cta.signup')}
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Students learning" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('home.features.title')}
            </h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <BookOpen size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">
                {t('home.features.quizzes.title')}
              </h3>
              <p className="text-gray-600 text-center">
                {t('home.features.quizzes.description')}
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Brain size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">
                {t('home.features.ai.title')}
              </h3>
              <p className="text-gray-600 text-center">
                {t('home.features.ai.description')}
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Activity size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">
                {t('home.features.tracking.title')}
              </h3>
              <p className="text-gray-600 text-center">
                {t('home.features.tracking.description')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your account as a student, teacher, or parent</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Explore Topics</h3>
              <p className="text-gray-600">Browse through our comprehensive health education topics</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Learn & Practice</h3>
              <p className="text-gray-600">Engage with interactive content and take quizzes</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">Monitor your health journey and see your improvements</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/learn" 
              className="px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 inline-flex items-center"
            >
              Start Learning Now
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('home.testimonials.title')}
            </h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                <p className="text-gray-900 font-medium">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to make health education fun?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of students, teachers, and parents who are transforming how we learn about health and wellness.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/learn" 
              className="px-8 py-4 bg-white text-indigo-600 font-medium rounded-lg shadow-md hover:bg-gray-100 transition duration-300 inline-block"
            >
              Start Learning
            </Link>
            <Link 
              to="/signup" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-indigo-600 transition duration-300 inline-block"
            >
              Sign Up For Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;