
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Course, Enrollment } from '@/integrations/supabase/client-types';
import { BookOpen, Users, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [enrollmentCount, setEnrollmentCount] = useState<number>(0);
  const [courseCount, setCourseCount] = useState<number>(0);
  const [recentEnrollments, setRecentEnrollments] = useState<Enrollment[]>([]);

  // Fetch courses count
  const { data: coursesData } = useQuery({
    queryKey: ['courses-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count;
    },
  });

  // Fetch enrollments if admin
  useEffect(() => {
    if (isAdmin) {
      const fetchEnrollmentData = async () => {
        try {
          // Get enrollment count
          const { count: enrollCount, error: countError } = await supabase
            .from('enrollments')
            .select('*', { count: 'exact', head: true });
          
          if (countError) throw countError;
          setEnrollmentCount(enrollCount || 0);
          
          // Get recent enrollments
          const { data: recentData, error: recentError } = await supabase
            .from('enrollments')
            .select(`
              *,
              courses:course_id(name)
            `)
            .order('created_at', { ascending: false })
            .limit(5);
          
          if (recentError) throw recentError;
          setRecentEnrollments(recentData as any[] || []);
        } catch (error) {
          console.error('Error fetching enrollment data:', error);
        }
      };
      
      fetchEnrollmentData();
    }
  }, [isAdmin]);

  // Update course count when data changes
  useEffect(() => {
    if (coursesData !== undefined) {
      setCourseCount(coursesData);
    }
  }, [coursesData]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Courses
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courseCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Available language courses
              </p>
            </CardContent>
          </Card>
          
          {isAdmin && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Enrollments
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{enrollmentCount}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Students enrolled in courses
                </p>
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Conversion Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23%</div>
              <p className="text-xs text-muted-foreground mt-1">
                From website visitors to enrollment
              </p>
            </CardContent>
          </Card>
        </div>

        {isAdmin && recentEnrollments.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Recent Enrollments</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentEnrollments.map((enrollment: any) => (
                    <tr key={enrollment.id}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {enrollment.student_name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {enrollment.email}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {enrollment.courses?.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          enrollment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : enrollment.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {new Date(enrollment.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
