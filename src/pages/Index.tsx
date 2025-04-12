
import { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CoursesSection from '@/components/CoursesSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import StatsBanner from '@/components/StatsBanner';
import TestimonialsSection from '@/components/TestimonialsSection';
import EnrollmentForm from '@/components/EnrollmentForm';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Set page title
    document.title = "Elite Minds Academia | Language School Enrollment";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <WhyChooseUs />
        <StatsBanner />
        <CoursesSection />
        <TestimonialsSection />
        <EnrollmentForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
