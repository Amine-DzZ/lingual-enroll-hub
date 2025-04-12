
import { useState } from 'react';

// Stats data
const stats = [
  {
    valueEn: '5,000+',
    valueAr: '+5,000',
    labelEn: 'Students Taught',
    labelAr: 'الطلاب المتعلمين',
  },
  {
    valueEn: '10+',
    valueAr: '+10',
    labelEn: 'Languages Offered',
    labelAr: 'اللغات المقدمة',
  },
  {
    valueEn: '95%',
    valueAr: '%95',
    labelEn: 'Success Rate',
    labelAr: 'معدل النجاح',
  },
  {
    valueEn: '15+',
    valueAr: '+15',
    labelEn: 'Years Experience',
    labelAr: 'سنوات الخبرة',
  },
];

const StatsBanner = () => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  return (
    <section className="bg-academy-teal py-12 text-white relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NCAwLTE4IDguMDYtMTggMThzOC4wNiAxOCAxOCAxOCAxOC04LjA2IDE4LTE4LTguMDYtMTgtMTgtMTh6bTAgMzBjLTYuNjMgMC0xMi01LjM3LTEyLTEyczUuMzctMTIgMTItMTIgMTIgNS4zNyAxMiAxMi01LjM3IDEyLTEyIDEyeiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiLz48cGF0aCBkPSJNMiAxOGMtOS45NCAwLTE4IDguMDYtMTggMThzOC4wNiAxOCAxOCAxOCAxOC04LjA2IDE4LTE4UzExLjk0IDE4IDIgMTh6bTAgMzBDLTQuNjMgNDgtMTAgNDIuNjMtMTAgMzZzNS4zNy0xMiAxMi0xMiAxMiA1LjM3IDEyIDEyLTUuMzcgMTItMTIgMTJ6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L2c+PC9zdmc+')] opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 ${language === 'ar' ? 'text-right' : 'text-center'}`}>
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-academy-gold">
                {language === 'en' ? stat.valueEn : stat.valueAr}
              </h3>
              <p className="text-sm md:text-base font-medium">
                {language === 'en' ? stat.labelEn : stat.labelAr}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBanner;
