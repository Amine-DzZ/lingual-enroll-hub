
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, BookOpen, CheckCircle } from 'lucide-react';

// Course type definition
type Course = {
  id: number;
  titleEn: string;
  titleAr: string;
  level: string;
  levelAr: string;
  duration: string;
  students: number;
  imageSrc: string;
  featuresEn: string[];
  featuresAr: string[];
};

// Sample course data
const courses: Course[] = [
  {
    id: 1,
    titleEn: "English for Beginners",
    titleAr: "الإنجليزية للمبتدئين",
    level: "Beginner",
    levelAr: "مبتدئ",
    duration: "8 weeks",
    students: 45,
    imageSrc: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    featuresEn: ["Basic vocabulary", "Simple conversations", "Essential grammar"],
    featuresAr: ["المفردات الأساسية", "محادثات بسيطة", "القواعد الأساسية"],
  },
  {
    id: 2,
    titleEn: "Intermediate French",
    titleAr: "الفرنسية المتوسطة",
    level: "Intermediate",
    levelAr: "متوسط",
    duration: "10 weeks",
    students: 32,
    imageSrc: "https://images.unsplash.com/photo-1549877452-9c387954fbc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    featuresEn: ["Advanced grammar", "Business conversations", "Cultural aspects"],
    featuresAr: ["قواعد متقدمة", "محادثات الأعمال", "الجوانب الثقافية"],
  },
  {
    id: 3,
    titleEn: "Spanish Mastery",
    titleAr: "إتقان الإسبانية",
    level: "Advanced",
    levelAr: "متقدم",
    duration: "12 weeks",
    students: 28,
    imageSrc: "https://images.unsplash.com/photo-1557425955-df376b5903c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    featuresEn: ["Fluent conversations", "Literature analysis", "Cultural immersion"],
    featuresAr: ["محادثات طلاقة", "تحليل الأدب", "الاندماج الثقافي"],
  },
];

const CoursesSection = () => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 ${language === 'ar' ? 'text-right' : ''}`}>
          <Badge variant="outline" className="bg-academy-gold/20 text-academy-teal border-academy-gold mb-3">
            {language === 'en' ? 'Our Programs' : 'برامجنا'}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {language === 'en' ? 'Featured Language Courses' : 'دورات اللغة المميزة'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Our expert-led language courses are designed to help you achieve fluency through immersive learning experiences.' 
              : 'تم تصميم دورات اللغة لدينا بقيادة الخبراء لمساعدتك على تحقيق الطلاقة من خلال تجارب تعلم غامرة.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.imageSrc} 
                  alt={language === 'en' ? course.titleEn : course.titleAr} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-academy-teal text-white">
                    {language === 'en' ? course.level : course.levelAr}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className={`text-xl text-academy-teal ${language === 'ar' ? 'text-right' : ''}`}>
                  {language === 'en' ? course.titleEn : course.titleAr}
                </CardTitle>
              </CardHeader>
              
              <CardContent className={language === 'ar' ? 'text-right' : ''}>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="mr-2 h-4 w-4" />
                    <span>{course.students} {language === 'en' ? 'students' : 'طالب'}</span>
                  </div>
                  
                  <ul className="mt-4 space-y-2">
                    {(language === 'en' ? course.featuresEn : course.featuresAr).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-academy-gold mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button variant="outline" className="w-full border-academy-teal text-academy-teal hover:bg-academy-teal hover:text-white">
                  {language === 'en' ? 'Learn More' : 'اعرف المزيد'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-academy-teal hover:bg-academy-teal/90 text-white">
            {language === 'en' ? 'View All Courses' : 'عرض جميع الدورات'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
