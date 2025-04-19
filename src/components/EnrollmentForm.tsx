
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const EnrollmentForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    student_name: "",
    email: "",
    phone: "",
    course_id: "1",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get existing enrollments or initialize empty array
    const existingEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    
    // Add new enrollment with timestamp
    const newEnrollment = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      created_at: new Date().toISOString(),
      courses: {
        name: formData.course_id === "1" ? "English Basics" :
              formData.course_id === "2" ? "Spanish Intermediate" : "French Advanced",
        level: formData.course_id === "1" ? "Beginner" :
               formData.course_id === "2" ? "Intermediate" : "Advanced"
      }
    };

    // Save to localStorage
    localStorage.setItem('enrollments', JSON.stringify([...existingEnrollments, newEnrollment]));

    toast({
      title: "Enrollment Submitted!",
      description: "We'll contact you shortly to confirm your enrollment.",
    });

    setFormData({
      student_name: "",
      email: "",
      phone: "",
      course_id: "1",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <section className="py-16" id="enroll">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-academy-teal">
            Enroll Today
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take the first step towards mastering a new language. Fill out the form below and our team will contact you.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input
                  name="student_name"
                  value={formData.student_name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course
                </label>
                <select
                  name="course_id"
                  value={formData.course_id}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="1">English Basics (Beginner)</option>
                  <option value="2">Spanish Intermediate (Intermediate)</option>
                  <option value="3">French Advanced (Advanced)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your learning goals"
                  className="w-full p-2 border border-gray-300 rounded-md h-32 resize-none"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full md:w-auto bg-academy-teal hover:bg-academy-teal/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Enrollment"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EnrollmentForm;
