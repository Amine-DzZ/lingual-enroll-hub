
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-20">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-7xl font-bold text-academy-teal mb-4">404</h1>
          <div className="w-16 h-1 bg-academy-gold mx-auto mb-6"></div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Button asChild className="bg-academy-teal hover:bg-academy-teal/90 text-white">
            <Link to="/">Return to Homepage</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
