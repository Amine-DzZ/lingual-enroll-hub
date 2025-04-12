
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  const { isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not admin
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate('/dashboard');
    }
  }, [isAdmin, isLoading, navigate]);

  // Fetch counts for dashboard
  const { data: coursesCount } = useQuery({
    queryKey: ['courses-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    },
    enabled: isAdmin,
  });

  // Fetch enrollment counts by status
  const { data: enrollmentStats } = useQuery({
    queryKey: ['enrollments-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('enrollments')
        .select('status');
      
      if (error) throw error;
      
      const counts = {
        total: data.length,
        pending: data.filter(e => e.status === 'pending').length,
        approved: data.filter(e => e.status === 'approved').length,
        rejected: data.filter(e => e.status === 'rejected').length
      };
      
      return counts;
    },
    enabled: isAdmin,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-academy-teal"></div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage courses, enrollments, and monitor key metrics
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Courses Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>Courses</span>
                <BookOpen className="h-5 w-5 text-academy-teal" />
              </CardTitle>
              <CardDescription>Total available courses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{coursesCount || 0}</p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate('/admin/courses')}
              >
                Manage Courses
              </Button>
            </CardFooter>
          </Card>

          {/* Enrollments Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>Enrollments</span>
                <Users className="h-5 w-5 text-academy-teal" />
              </CardTitle>
              <CardDescription>Total student enrollments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{enrollmentStats?.total || 0}</p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/admin/enrollments')}
              >
                Manage Enrollments
              </Button>
            </CardFooter>
          </Card>

          {/* Pending Applications Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>Pending Approvals</span>
                <AlertCircle className="h-5 w-5 text-amber-500" />
              </CardTitle>
              <CardDescription>Applications requiring review</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{enrollmentStats?.pending || 0}</p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/admin/enrollments')}
              >
                Review Applications
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Stats Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-md border border-green-200">
                <p className="text-sm text-green-700 font-medium">Approved</p>
                <p className="text-2xl font-bold text-green-800">{enrollmentStats?.approved || 0}</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
                <p className="text-sm text-amber-700 font-medium">Pending</p>
                <p className="text-2xl font-bold text-amber-800">{enrollmentStats?.pending || 0}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-md border border-red-200">
                <p className="text-sm text-red-700 font-medium">Rejected</p>
                <p className="text-2xl font-bold text-red-800">{enrollmentStats?.rejected || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
