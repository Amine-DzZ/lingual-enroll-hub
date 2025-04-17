
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

// Sample courses data
const sampleCourses = [
  { id: '1', name: 'English Basics', level: 'Beginner' },
  { id: '2', name: 'Spanish Intermediate', level: 'Intermediate' },
  { id: '3', name: 'French Advanced', level: 'Advanced' },
];

// Define enrollment schema
const enrollmentSchema = z.object({
  student_name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(6, { message: "Phone number is required" }),
  course_id: z.string().min(1, { message: "Please select a course" }),
  message: z.string().optional(),
});

type EnrollmentFormValues = z.infer<typeof enrollmentSchema>;

const EnrollmentForm = () => {
  const { toast } = useToast();
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      student_name: "",
      email: "",
      phone: "",
      course_id: "",
      message: "",
    },
  });

  const onSubmit = async (data: EnrollmentFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Enrollment submitted:', data);
      
      toast({
        title: language === "en" ? "Enrollment Submitted!" : "تم إرسال التسجيل!",
        description:
          language === "en"
            ? "We'll contact you shortly to confirm your enrollment."
            : "سنتصل بك قريبًا لتأكيد تسجيلك.",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      console.error('Enrollment submission error:', error);
      toast({
        title: language === "en" ? "Submission Error" : "خطأ في الإرسال",
        description: "An error occurred while submitting your enrollment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16" id="enroll">
      <div className="container mx-auto px-4">
        <div className={`mb-12 text-center ${language === "ar" ? "text-right" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-academy-teal">
            {language === "en" ? "Enroll Today" : "سجل اليوم"}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === "en"
              ? "Take the first step towards mastering a new language. Fill out the form below and our team will contact you."
              : "اتخذ الخطوة الأولى نحو إتقان لغة جديدة. املأ النموذج أدناه وسيتصل بك فريقنا."}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="p-6 md:p-8 shadow-lg border-t-4 border-t-academy-teal">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={`space-y-6 ${language === "ar" ? "text-right" : ""}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="student_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language === "en" ? "Full Name" : "الاسم الكامل"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={
                              language === "en"
                                ? "Enter your full name"
                                : "أدخل اسمك الكامل"
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language === "en"
                            ? "Email Address"
                            : "البريد الإلكتروني"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder={
                              language === "en"
                                ? "Enter your email"
                                : "أدخل بريدك الإلكتروني"
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language === "en"
                            ? "Phone Number"
                            : "رقم الهاتف"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={
                              language === "en"
                                ? "Enter your phone number"
                                : "أدخل رقم هاتفك"
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="course_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language === "en"
                            ? "Preferred Course"
                            : "الدورة المفضلة"}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  language === "en"
                                    ? "Select a course"
                                    : "اختر دورة"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sampleCourses.map((course) => (
                              <SelectItem key={course.id} value={course.id}>
                                {course.name} ({course.level})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>
                          {language === "en" ? "Message (Optional)" : "رسالة (اختياري)"}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={
                              language === "en"
                                ? "Tell us more about your learning goals"
                                : "أخبرنا المزيد عن أهداف التعلم الخاصة بك"
                            }
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full md:w-auto bg-academy-teal hover:bg-academy-teal/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? language === "en"
                      ? "Submitting..."
                      : "جاري الإرسال..."
                    : language === "en"
                    ? "Submit Enrollment"
                    : "إرسال التسجيل"}
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EnrollmentForm;
