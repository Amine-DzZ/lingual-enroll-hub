
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

// Define enrollment schema
const enrollmentSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(6, { message: "Phone number is required" }),
  language: z.string().min(1, { message: "Please select a language" }),
  level: z.string().min(1, { message: "Please select your current level" }),
  message: z.string().optional(),
});

// Define enrollment form field values
type EnrollmentFormValues = z.infer<typeof enrollmentSchema>;

const EnrollmentForm = () => {
  const { toast } = useToast();
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize useForm
  const form = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      language: "",
      level: "",
      message: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: EnrollmentFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API submission with a delay
    setTimeout(() => {
      console.log("Form submitted:", data);
      toast({
        title: language === "en" ? "Enrollment Submitted!" : "تم إرسال التسجيل!",
        description:
          language === "en"
            ? "We'll contact you shortly to confirm your enrollment."
            : "سنتصل بك قريبًا لتأكيد تسجيلك.",
        variant: "default",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1500);
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
                    name="name"
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
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language === "en"
                            ? "Preferred Language"
                            : "اللغة المفضلة"}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  language === "en"
                                    ? "Select a language"
                                    : "اختر لغة"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="english">
                              {language === "en" ? "English" : "الإنجليزية"}
                            </SelectItem>
                            <SelectItem value="french">
                              {language === "en" ? "French" : "الفرنسية"}
                            </SelectItem>
                            <SelectItem value="spanish">
                              {language === "en" ? "Spanish" : "الإسبانية"}
                            </SelectItem>
                            <SelectItem value="german">
                              {language === "en" ? "German" : "الألمانية"}
                            </SelectItem>
                            <SelectItem value="arabic">
                              {language === "en" ? "Arabic" : "العربية"}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>
                          {language === "en"
                            ? "Current Level"
                            : "المستوى الحالي"}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  language === "en"
                                    ? "Select your current level"
                                    : "اختر مستواك الحالي"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="beginner">
                              {language === "en" ? "Beginner" : "مبتدئ"}
                            </SelectItem>
                            <SelectItem value="intermediate">
                              {language === "en" ? "Intermediate" : "متوسط"}
                            </SelectItem>
                            <SelectItem value="advanced">
                              {language === "en" ? "Advanced" : "متقدم"}
                            </SelectItem>
                            <SelectItem value="fluent">
                              {language === "en" ? "Fluent" : "طليق"}
                            </SelectItem>
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
