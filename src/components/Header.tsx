
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/636c656a-a5e7-4e51-83d5-673b4402253e.png" 
              alt="Elite Minds Academia Logo" 
              className="h-12 w-auto" 
            />
            <span className={`font-heading font-bold text-academy-teal text-xl ${language === 'ar' ? 'hidden' : ''}`}>
              Elite Minds Academia
            </span>
            <span className={`font-heading font-bold text-academy-teal text-xl ${language === 'en' ? 'hidden' : ''}`}>
              أكاديمية العقول النخبة
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="text-gray-700 hover:text-academy-teal font-medium transition-colors">
                  {language === 'en' ? 'Home' : 'الرئيسية'}
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-700 hover:text-academy-teal font-medium transition-colors">
                  {language === 'en' ? 'Courses' : 'الدورات'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-700 hover:text-academy-teal font-medium transition-colors">
                  {language === 'en' ? 'About Us' : 'من نحن'}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-700 hover:text-academy-teal font-medium transition-colors">
                  {language === 'en' ? 'Contact' : 'اتصل بنا'}
                </Link>
              </li>
            </ul>
            <Button 
              onClick={toggleLanguage} 
              variant="ghost" 
              size="icon"
              className="text-gray-700 hover:text-academy-teal"
            >
              <Globe className="h-5 w-5" />
              <span className="ml-1">{language === 'en' ? 'AR' : 'EN'}</span>
            </Button>
            <Button className="bg-academy-teal hover:bg-academy-teal/90 text-white">
              {language === 'en' ? 'Enroll Now' : 'سجل الآن'}
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Button 
              onClick={toggleLanguage} 
              variant="ghost" 
              size="icon"
              className="text-gray-700"
            >
              <Globe className="h-5 w-5" />
            </Button>
            <Button onClick={toggleMenu} variant="ghost" size="icon">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link 
                  to="/" 
                  className="block text-gray-700 hover:text-academy-teal font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {language === 'en' ? 'Home' : 'الرئيسية'}
                </Link>
              </li>
              <li>
                <Link 
                  to="/courses" 
                  className="block text-gray-700 hover:text-academy-teal font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {language === 'en' ? 'Courses' : 'الدورات'}
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="block text-gray-700 hover:text-academy-teal font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {language === 'en' ? 'About Us' : 'من نحن'}
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="block text-gray-700 hover:text-academy-teal font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {language === 'en' ? 'Contact' : 'اتصل بنا'}
                </Link>
              </li>
              <li>
                <Button 
                  className="w-full bg-academy-teal hover:bg-academy-teal/90 text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {language === 'en' ? 'Enroll Now' : 'سجل الآن'}
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
