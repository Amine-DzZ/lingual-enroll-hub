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
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Course } from "@/integrations/supabase/client-types";

// Define enrollment schema
const enrollmentSchema = z.object({
  student_name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(6, { message: "Phone number is required" }),
  course_id: z.string().min(1, { message: "Please select a course" }),
  message: z.string().optional(),
});

// Define enrollment form field values
type EnrollmentFormValues = z.infer<typeof enrollmentSchema>;

const EnrollmentForm = () => {
  const { toast } = useToast();
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch available courses
  const { data: courses } = useQuery({
    queryKey: ["enrollment-courses"],
    queryFn: async () => {
      console.log('Fetching available courses');
      const { data, error } = await supabase
        .from("courses")
        .select("id, name, level")
        .order("name");

      if (error) {
        console.error('Error fetching courses:', error);
        throw error;
      }
      console.log('Courses fetched:', data);
      return data as Course[];
    },
  });

  // Initialize useForm
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

  // Handle form submission
  const onSubmit = async (data: EnrollmentFormValues) => {
    setIsSubmitting(true);
    console.log('Submitting enrollment form:', data);
    
    try {
      // Submit to Supabase
      const { error } = await supabase.from("enrollments").insert([
        {
          student_name: data.student_name,
          email: data.email,
          phone: data.phone,
          course_id: data.course_id,
          status: "pending",
        },
      ]);

      if (error) {
        console.error('Error inserting enrollment:', error);
        throw error;
      }

      console.log('Enrollment submitted successfully');
      // Show success toast
      toast({
        title: language === "en" ? "Enrollment Submitted!" : "تم إرسال التسجيل!",
        description:
          language === "en"
            ? "We'll contact you shortly to confirm your enrollment."
            : "سنتصل بك قريبًا لتأكيد تسجيلك.",
        variant: "default",
      });
      
      // Reset form
      form.reset();
    } catch (error: any) {
      console.error('Enrollment submission error:', error);
      // Show error toast
      toast({
        title: language === "en" ? "Submission Error" : "خطأ في الإرسال",
        description: error.message,
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
                            {courses?.map((course) => (
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
