import React from 'react';
import { Heart, BookOpen, Brain, Activity, Award, Users } from 'lucide-react';

const About: React.FC = () => {
  // Mock team data
  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Health Education Specialist',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      bio: 'With over 15 years of experience in health education, Dr. Johnson leads our curriculum development.'
    },
    {
      name: 'Michael Chen',
      role: 'Software Engineer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      bio: 'Michael brings 10+ years of experience in educational technology and gamification to our platform.'
    },
    {
      name: 'Aisha Patel',
      role: 'UX Designer',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      bio: 'Aisha specializes in creating engaging, accessible interfaces for educational platforms.'
    },
    {
      name: 'James Wilson',
      role: 'School Partnership Director',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      bio: 'Former school principal with a passion for bringing innovative health education to schools.'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">About HealthEduConnect</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Making health education fun, engaging, and accessible for students, teachers, and parents around the world.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <img 
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Students learning about health" 
                className="rounded-lg shadow-xl"
              />
            </div>
            
            <div className="md:w-1/2 md:pl-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Transforming Health Education</h3>
              <p className="text-gray-600 mb-6">
                At HealthEduConnect, we believe that health education should be engaging, interactive, and accessible to all. Our mission is to empower students with the knowledge and tools they need to make informed health decisions throughout their lives.
              </p>
              <p className="text-gray-600 mb-6">
                Through our innovative platform, we aim to:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Heart size={20} className="text-indigo-600 mr-2 mt-1" />
                  <span>Make health education fun and engaging through gamification</span>
                </li>
                <li className="flex items-start">
                  <BookOpen size={20} className="text-indigo-600 mr-2 mt-1" />
                  <span>Provide comprehensive, age-appropriate health content</span>
                </li>
                <li className="flex items-start">
                  <Brain size={20} className="text-indigo-600 mr-2 mt-1" />
                  <span>Personalize learning experiences with AI-powered recommendations</span>
                </li>
                <li className="flex items-start">
                  <Activity size={20} className="text-indigo-600 mr-2 mt-1" />
                  <span>Encourage healthy habits through daily tracking and challenges</span>
                </li>
                <li className="flex items-start">
                  <Users size={20} className="text-indigo-600 mr-2 mt-1" />
                  <span>Connect students, teachers, and parents in the health education journey</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Approach */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Approach</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Award size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Gamified Learning</h3>
              <p className="text-gray-600 text-center">
                We transform traditional health education into fun, interactive experiences through quizzes, challenges, and rewards that motivate students to learn.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Brain size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Personalized AI</h3>
              <p className="text-gray-600 text-center">
                Our AI-powered system adapts to each student's learning style and health needs, providing personalized recommendations and feedback.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Users size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Community Involvement</h3>
              <p className="text-gray-600 text-center">
                We involve the entire educational community—students, teachers, and parents—to create a supportive environment for health education.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
              Meet the passionate educators, technologists, and health experts behind HealthEduConnect.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-indigo-600 mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Impact */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">500+</div>
              <p className="text-xl">Schools</p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">50,000+</div>
              <p className="text-xl">Students</p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">25+</div>
              <p className="text-xl">Countries</p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Join us in our mission to make health education engaging, effective, and accessible for all students around the world.
            </p>
            <a 
              href="/contact" 
              className="inline-block px-8 py-4 bg-white text-indigo-600 font-medium rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;