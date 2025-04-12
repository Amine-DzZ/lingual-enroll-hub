
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  return (
    <section className="relative bg-academy-teal text-white py-16 md:py-24 overflow-hidden">
      {/* Background Design Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-academy-gold/20 rounded-bl-[100px] -z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-academy-gold/10 rounded-tr-[100px] -z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className={`md:w-1/2 mb-10 md:mb-0 ${language === 'ar' ? 'md:order-2 text-right' : ''}`}>
            <h5 className="text-academy-gold font-medium mb-2">
              {language === 'en' ? 'Unlock Your Potential' : 'أطلق إمكاناتك'}
            </h5>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {language === 'en' 
                ? 'Master Languages with Elite Minds Academia' 
                : 'أتقن اللغات مع أكاديمية العقول النخبة'}
            </h1>
            <p className="text-lg mb-8 text-gray-100 max-w-lg">
              {language === 'en' 
                ? 'Join our prestigious language programs taught by expert instructors. Learn at your own pace with personalized instruction for all levels.' 
                : 'انضم إلى برامجنا اللغوية المرموقة التي يدرسها مدربون خبراء. تعلم بالوتيرة الخاصة بك مع تعليمات مخصصة لجميع المستويات.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-academy-gold hover:bg-academy-gold/90 text-academy-teal font-medium">
                {language === 'en' ? 'Enroll Now' : 'سجل الآن'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                {language === 'en' ? 'Explore Courses' : 'استكشف الدورات'}
              </Button>
            </div>
          </div>
          
          <div className={`md:w-1/2 ${language === 'ar' ? 'md:order-1' : ''}`}>
            <div className="relative">
              <div className="w-full h-full absolute -right-4 -bottom-4 bg-academy-gold/50 rounded-lg"></div>
              <img 
                src="/lovable-uploads/8174f623-08da-49b7-b6f5-4224c813fdf0.png"
                alt="Elite Minds Academia" 
                className="w-full h-auto rounded-lg shadow-lg relative z-10" 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave shape divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1440 120H0V0C720 80 720 80 1440 0V120Z" fill="white" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
