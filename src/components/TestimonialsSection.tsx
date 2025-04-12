
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuoteIcon } from "lucide-react";

// Testimonial type
type Testimonial = {
  id: number;
  nameEn: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  textEn: string;
  textAr: string;
  avatar: string;
};

// Sample testimonial data
const testimonials: Testimonial[] = [
  {
    id: 1,
    nameEn: "Sarah Johnson",
    nameAr: "سارة جونسون",
    roleEn: "French Student",
    roleAr: "طالبة فرنسية",
    textEn: "The instructors are incredibly supportive and the small class sizes mean I get personalized attention. I've made tremendous progress in just a few months!",
    textAr: "المدرسون داعمون بشكل لا يصدق وأحجام الفصول الصغيرة تعني أنني أحصل على اهتمام شخصي. لقد أحرزت تقدمًا هائلاً في بضعة أشهر فقط!",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    nameEn: "Mohammed Al-Hassan",
    nameAr: "محمد الحسن",
    roleEn: "English Student",
    roleAr: "طالب إنجليزي",
    textEn: "The cultural aspects taught alongside language skills made my learning experience much more engaging. Elite Minds truly delivers on their promise of excellence.",
    textAr: "الجوانب الثقافية التي يتم تدريسها جنبًا إلى جنب مع مهارات اللغة جعلت تجربة التعلم الخاصة بي أكثر جاذبية. تقدم أكاديمية العقول النخبة حقًا وعدهم بالتميز.",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 3,
    nameEn: "Emily Chen",
    nameAr: "إيميلي تشن",
    roleEn: "Spanish Student",
    roleAr: "طالبة إسبانية",
    textEn: "The flexible scheduling allowed me to continue my language studies while working full-time. I couldn't recommend Elite Minds Academia more highly!",
    textAr: "سمحت لي الجداول المرنة بمواصلة دراساتي اللغوية أثناء العمل بدوام كامل. لا يمكنني التوصية بأكاديمية العقول النخبة أكثر من ذلك!",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
];

const TestimonialsSection = () => {
  const [language, setLanguage] = useState<"en" | "ar">("en");

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 ${language === "ar" ? "text-right" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {language === "en" ? "What Our Students Say" : "ماذا يقول طلابنا"}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === "en"
              ? "Hear from our students about their language learning journey with Elite Minds Academia."
              : "استمع من طلابنا عن رحلة تعلم اللغة مع أكاديمية العقول النخبة."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <QuoteIcon className="h-10 w-10 text-academy-gold/30 mb-4" />
                
                <p className={`text-gray-700 mb-6 ${language === "ar" ? "text-right" : ""}`}>
                  "{language === "en" ? testimonial.textEn : testimonial.textAr}"
                </p>
                
                <div className={`flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.nameEn} />
                    <AvatarFallback>
                      {testimonial.nameEn.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`ml-4 ${language === "ar" ? "mr-4 ml-0 text-right" : ""}`}>
                    <h4 className="font-medium text-gray-900">
                      {language === "en" ? testimonial.nameEn : testimonial.nameAr}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {language === "en" ? testimonial.roleEn : testimonial.roleAr}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
