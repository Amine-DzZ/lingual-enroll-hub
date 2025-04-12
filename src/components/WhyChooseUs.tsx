
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, Award, Globe, Clock, Laptop } from 'lucide-react';

// Feature type definition
type Feature = {
  id: number;
  icon: JSX.Element;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
};

// Feature data
const features: Feature[] = [
  {
    id: 1,
    icon: <GraduationCap className="h-8 w-8 text-academy-gold" />,
    titleEn: "Expert Instructors",
    titleAr: "مدربون خبراء",
    descriptionEn: "Learn from certified language teachers with years of experience in language education.",
    descriptionAr: "تعلم من مدرسي لغة معتمدين ذوي سنوات من الخبرة في تعليم اللغات.",
  },
  {
    id: 2,
    icon: <Users className="h-8 w-8 text-academy-gold" />,
    titleEn: "Small Class Sizes",
    titleAr: "فصول صغيرة الحجم",
    descriptionEn: "Benefit from personalized attention in small groups of no more than 10 students.",
    descriptionAr: "استفد من الاهتمام الشخصي في مجموعات صغيرة لا تزيد عن 10 طلاب.",
  },
  {
    id: 3,
    icon: <Award className="h-8 w-8 text-academy-gold" />,
    titleEn: "Accredited Programs",
    titleAr: "برامج معتمدة",
    descriptionEn: "Our courses are recognized by international language certification bodies.",
    descriptionAr: "دوراتنا معترف بها من قبل هيئات شهادات اللغة الدولية.",
  },
  {
    id: 4,
    icon: <Globe className="h-8 w-8 text-academy-gold" />,
    titleEn: "Cultural Immersion",
    titleAr: "الانغماس الثقافي",
    descriptionEn: "Learn about culture, customs, and traditions alongside language instruction.",
    descriptionAr: "تعرف على الثقافة والعادات والتقاليد إلى جانب تعليم اللغة.",
  },
  {
    id: 5,
    icon: <Clock className="h-8 w-8 text-academy-gold" />,
    titleEn: "Flexible Schedules",
    titleAr: "جداول مرنة",
    descriptionEn: "Choose from morning, evening, and weekend classes to fit your lifestyle.",
    descriptionAr: "اختر من بين فصول الصباح والمساء وعطلة نهاية الأسبوع لتناسب أسلوب حياتك.",
  },
  {
    id: 6,
    icon: <Laptop className="h-8 w-8 text-academy-gold" />,
    titleEn: "Modern Resources",
    titleAr: "موارد حديثة",
    descriptionEn: "Access to digital learning tools, audio materials, and interactive resources.",
    descriptionAr: "الوصول إلى أدوات التعلم الرقمية والمواد الصوتية والموارد التفاعلية.",
  },
];

const WhyChooseUs = () => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-academy-gold/10"></div>
      <div className="absolute top-1/2 right-0 w-32 h-32 rounded-full bg-academy-teal/5"></div>
      <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-academy-gold/5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-12 ${language === 'ar' ? 'text-right' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-academy-teal">
            {language === 'en' ? 'Why Choose Elite Minds Academia' : 'لماذا تختار أكاديمية العقول النخبة'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'We provide a learning environment that combines quality education, cultural immersion, and personalized instruction.' 
              : 'نحن نوفر بيئة تعليمية تجمع بين التعليم الجيد والانغماس الثقافي والتعليمات المخصصة.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.id} className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardContent className={`p-6 flex flex-col ${language === 'ar' ? 'items-end text-right' : ''}`}>
                <div className={`mb-4 p-3 rounded-full bg-academy-teal/10 inline-flex ${language === 'ar' ? 'self-end' : 'self-start'}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {language === 'en' ? feature.titleEn : feature.titleAr}
                </h3>
                <p className="text-gray-600">
                  {language === 'en' ? feature.descriptionEn : feature.descriptionAr}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
