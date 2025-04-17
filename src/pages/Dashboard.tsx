
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table';
import { Course, Enrollment } from '@/integrations/supabase/client-types';
import { BookOpen, Users, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [enrollmentCount, setEnrollmentCount] = useState<number>(0);
  const [courseCount, setCourseCount] = useState<number>(0);
  const [recentEnrollments, setRecentEnrollments] = useState<Enrollment[]>([]);
  const [studentEnrollments, setStudentEnrollments] = useState<Enrollment[]>([]);

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
    } else {
      // For regular users, fetch their own enrollments
      const fetchStudentEnrollments = async () => {
        if (!user) return;
        
        try {
          const { data, error } = await supabase
            .from('enrollments')
            .select(`
              *,
              courses:course_id(name, instructor, level)
            `)
            .eq('email', user.email)
            .order('created_at', { ascending: false });
          
          if (error) throw error;
          setStudentEnrollments(data as any[] || []);
        } catch (error) {
          console.error('Error fetching student enrollments:', error);
        }
      };
      
      fetchStudentEnrollments();
    }
  }, [isAdmin, user]);

  // Update course count when data changes
  useEffect(() => {
    if (coursesData !== undefined) {
      setCourseCount(coursesData);
    }
  }, [coursesData]);

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

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

        {/* For regular users, show their enrollments */}
        {!isAdmin && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Your Enrollments</h2>
            {studentEnrollments.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Enrollment Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentEnrollments.map((enrollment: any) => (
                      <TableRow key={enrollment.id}>
                        <TableCell className="font-medium">{enrollment.courses?.name}</TableCell>
                        <TableCell>{enrollment.courses?.instructor}</TableCell>
                        <TableCell>{enrollment.courses?.level}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            getStatusColor(enrollment.status)
                          }`}>
                            {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(enrollment.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-md border border-dashed text-center">
                <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Show recent enrollments for admin */}
        {isAdmin && recentEnrollments.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Recent Enrollments</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentEnrollments.map((enrollment: any) => (
                    <TableRow key={enrollment.id}>
                      <TableCell className="font-medium">{enrollment.student_name}</TableCell>
                      <TableCell>{enrollment.email}</TableCell>
                      <TableCell>{enrollment.courses?.name}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          getStatusColor(enrollment.status)
                        }`}>
                          {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(enrollment.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
