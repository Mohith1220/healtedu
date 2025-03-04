import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, ChevronDown, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageOpen(!isLanguageOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };
  
  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isLanguageOpen) setIsLanguageOpen(false);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLanguageOpen(false);
  };
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsLanguageOpen(false);
      setIsProfileOpen(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  // Get dashboard link based on user role
  const getDashboardLink = () => {
    if (!user) return '/login';
    
    const role = user.user_metadata?.role || 'student';
    return `/dashboard/${role}`;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">HealthEduConnect</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600">
              {t('nav.home')}
            </Link>
            <Link to="/learn" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600">
              Learn
            </Link>
            <Link to="/quiz" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600">
              Quizzes
            </Link>
            <Link to="/features" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600">
              {t('nav.features')}
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600">
              {t('nav.about')}
            </Link>
            <Link to="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600">
              {t('nav.contact')}
            </Link>
            
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={toggleLanguageMenu}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                <Globe size={18} className="mr-1" />
                <span>{i18n.language === 'en' ? 'English' : 'Español'}</span>
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    <button
                      onClick={() => changeLanguage('en')}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${i18n.language === 'en' ? 'bg-gray-100' : ''}`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => changeLanguage('es')}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${i18n.language === 'es' ? 'bg-gray-100' : ''}`}
                    >
                      Español
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {user ? (
              <div className="relative ml-3" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                    <span className="text-indigo-600 font-medium">
                      {user.user_metadata?.name ? user.user_metadata.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <span className="hidden lg:block">
                    {user.user_metadata?.name || 'User'}
                  </span>
                  <ChevronDown size={16} className="ml-1" />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      <Link
                        to={getDashboardLink()}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/health-tracker"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Health Tracker
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {t('nav.signup')}
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600">
              {t('nav.home')}
            </Link>
            <Link to="/learn" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600">
              Learn
            </Link>
            <Link to="/quiz" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600">
              Quizzes
            </Link>
            <Link to="/features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600">
              {t('nav.features')}
            </Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600">
              {t('nav.about')}
            </Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600">
              {t('nav.contact')}
            </Link>
            
            <div className="relative">
              <button 
                onClick={toggleLanguageMenu}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 w-full"
              >
                <Globe size={18} className="mr-1" />
                <span>{i18n.language === 'en' ? 'English' : 'Español'}</span>
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              {isLanguageOpen && (
                <div className="mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    <button
                      onClick={() => changeLanguage('en')}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${i18n.language === 'en' ? 'bg-gray-100' : ''}`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => changeLanguage('es')}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${i18n.language === 'es' ? 'bg-gray-100' : ''}`}
                    >
                      Español
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {user ? (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-center px-3 py-2">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                    <span className="text-indigo-600 font-medium">
                      {user.user_metadata?.name ? user.user_metadata.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <span className="text-base font-medium text-gray-700">
                    {user.user_metadata?.name || 'User'}
                  </span>
                </div>
                
                <Link
                  to={getDashboardLink()}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600"
                >
                  <User size={18} className="mr-2" />
                  Dashboard
                </Link>
                
                <Link
                  to="/health-tracker"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600"
                >
                  <Activity size={18} className="mr-2" />
                  Health Tracker
                </Link>
                
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600"
                >
                  <LogOut size={18} className="mr-2" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-4 mt-4 flex flex-col space-y-2">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 text-center"
                >
                  {t('nav.signup')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;