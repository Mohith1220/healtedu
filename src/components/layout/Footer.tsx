import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold text-indigo-400 mb-4">HealthEduConnect</h2>
            <p className="text-gray-300 mb-4">
              Making health education fun, engaging, and accessible for everyone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-indigo-400">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-indigo-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-indigo-400">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-indigo-400">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/learn" className="text-gray-300 hover:text-indigo-400">
                  Learn
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-gray-300 hover:text-indigo-400">
                  Quizzes
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-300 hover:text-indigo-400">
                  {t('nav.features')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-indigo-400">
                  {t('nav.about')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-indigo-400">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-indigo-400">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-indigo-400">
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300">{t('footer.rights')}</p>
          <p className="text-gray-300 mt-4 md:mt-0 flex items-center">
            Made with <Heart size={16} className="mx-1 text-red-500" /> for health education
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;