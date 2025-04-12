
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Send } from 'lucide-react';

const Footer = () => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed with email:', email);
    setEmail('');
    // Add toast notification here if needed
  };

  return (
    <footer className="bg-academy-teal text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className={language === 'ar' ? 'text-right' : ''}>
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/636c656a-a5e7-4e51-83d5-673b4402253e.png" 
                alt="Elite Minds Academia Logo" 
                className="h-12 w-auto mr-3" 
              />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              {language === 'en' ? 'Elite Minds Academia' : 'أكاديمية العقول النخبة'}
            </h3>
            <p className="text-gray-300 mb-6">
              {language === 'en' 
                ? 'Unlocking excellence through quality language education since 2010.' 
                : 'إطلاق التميز من خلال تعليم لغوي عالي الجودة منذ عام 2010.'}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-academy-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-academy-gold transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-academy-gold transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={language === 'ar' ? 'text-right' : ''}>
            <h3 className="text-xl font-semibold mb-4">
              {language === 'en' ? 'Quick Links' : 'روابط سريعة'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-academy-gold transition-colors">
                  {language === 'en' ? 'Home' : 'الرئيسية'}
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-academy-gold transition-colors">
                  {language === 'en' ? 'Our Courses' : 'دوراتنا'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-academy-gold transition-colors">
                  {language === 'en' ? 'About Us' : 'من نحن'}
                </Link>
              </li>
              <li>
                <Link to="/instructors" className="text-gray-300 hover:text-academy-gold transition-colors">
                  {language === 'en' ? 'Our Instructors' : 'المدربون لدينا'}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-academy-gold transition-colors">
                  {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={language === 'ar' ? 'text-right' : ''}>
            <h3 className="text-xl font-semibold mb-4">
              {language === 'en' ? 'Contact Information' : 'معلومات الاتصال'}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-academy-gold" />
                <span>(+123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-academy-gold" />
                <span>info@eliteminds.com</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-academy-gold" />
                <span>
                  {language === 'en' 
                    ? '123 Education Ave, City Center' 
                    : '123 شارع التعليم، وسط المدينة'}
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className={language === 'ar' ? 'text-right' : ''}>
            <h3 className="text-xl font-semibold mb-4">
              {language === 'en' ? 'Subscribe to Newsletter' : 'اشترك في النشرة الإخبارية'}
            </h3>
            <p className="text-gray-300 mb-4">
              {language === 'en' 
                ? 'Get updates on new courses and events.' 
                : 'احصل على تحديثات حول الدورات والأحداث الجديدة.'}
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <div className="flex">
                <Input
                  type="email"
                  placeholder={language === 'en' ? "Your email address" : "عنوان بريدك الإلكتروني"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow bg-white/10 border-0 focus:ring-2 focus:ring-academy-gold text-white"
                  required
                />
                <Button 
                  type="submit" 
                  size="icon"
                  className="ml-1 bg-academy-gold hover:bg-academy-gold/90 text-academy-teal"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-white/10" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} Elite Minds Academia. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-300 hover:text-white text-sm">
              {language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
            </Link>
            <Link to="/terms" className="text-gray-300 hover:text-white text-sm">
              {language === 'en' ? 'Terms of Service' : 'شروط الخدمة'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
