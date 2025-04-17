
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CheckCircle, XCircle, Eye, ArrowUpDown } from 'lucide-react';

type Enrollment = {
  id: string;
  student_name: string;
  email: string;
  phone: string;
  course_id: string;
  status: string;
  created_at: string;
  courses: {
    id: string;
    name: string;
  };
};

const AdminEnrollments = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Enrollment | 'courses.name';
    direction: 'asc' | 'desc';
  }>({ key: 'created_at', direction: 'desc' });

  // Fetch enrollments
  const { data: enrollments, isLoading, error: fetchError } = useQuery({
    queryKey: ['admin-enrollments'],
    queryFn: async () => {
      console.log('Fetching enrollments for admin');
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses:course_id (
            id,
            name
          )
        `);
      
      if (error) {
        console.error('Error fetching enrollments:', error);
        throw error;
      }
      
      console.log('Enrollments fetched:', data);
      return data as Enrollment[];
    },
    enabled: isAdmin,
  });

  // Update enrollment status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      console.log(`Updating enrollment ${id} to status ${status}`);
      const { data, error } = await supabase
        .from('enrollments')
        .update({ status })
        .eq('id', id)
        .select();
      
      if (error) {
        console.error('Error updating enrollment status:', error);
        throw error;
      }
      
      console.log('Enrollment updated:', data);
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-enrollments'] });
      toast({
        title: 'Status updated',
        description: 'The enrollment status has been updated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: `Failed to update status: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  // Handle sorting
  const handleSort = (key: keyof Enrollment | 'courses.name') => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Sort enrollments
  const sortedEnrollments = enrollments ? [...enrollments].sort((a, b) => {
    if (sortConfig.key === 'courses.name') {
      const aValue = a.courses?.name || '';
      const bValue = b.courses?.name || '';
      
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    }
  }) : [];

  // View enrollment details
  const viewEnrollment = (enrollment: Enrollment) => {
    setSelectedEnrollment(enrollment);
    setIsDialogOpen(true);
  };

  // Handle status change
  const handleStatusChange = (id: string, status: string) => {
    updateStatusMutation.mutate({ id, status });
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

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

  // Show error if any
  if (fetchError) {
    return (
      <DashboardLayout>
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-lg font-medium text-red-800">Error loading enrollments</h2>
          <p className="text-red-600">{(fetchError as Error).message}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Enrollment Management</h1>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-academy-teal"></div>
          </div>
        ) : !sortedEnrollments?.length ? (
          <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed">
            <p className="text-gray-500">No enrollments available</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <button
                      className="flex items-center space-x-1"
                      onClick={() => handleSort('student_name')}
                    >
                      <span>Student Name</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      className="flex items-center space-x-1"
                      onClick={() => handleSort('email')}
                    >
                      <span>Email</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      className="flex items-center space-x-1"
                      onClick={() => handleSort('courses.name')}
                    >
                      <span>Course</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      className="flex items-center space-x-1"
                      onClick={() => handleSort('status')}
                    >
                      <span>Status</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      className="flex items-center space-x-1"
                      onClick={() => handleSort('created_at')}
                    >
                      <span>Date</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedEnrollments.map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell>{enrollment.student_name}</TableCell>
                    <TableCell>{enrollment.email}</TableCell>
                    <TableCell>{enrollment.courses.name}</TableCell>
                    <TableCell>
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(enrollment.status)}`}
                      >
                        {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(enrollment.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewEnrollment(enrollment)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        
                        {enrollment.status === 'pending' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 hover:text-green-800 hover:bg-green-50"
                              onClick={() => handleStatusChange(enrollment.id, 'approved')}
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span className="sr-only">Approve</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-800 hover:bg-red-50"
                              onClick={() => handleStatusChange(enrollment.id, 'rejected')}
                            >
                              <XCircle className="h-4 w-4" />
                              <span className="sr-only">Reject</span>
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Enrollment Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enrollment Details</DialogTitle>
            <DialogDescription>Review enrollment information</DialogDescription>
          </DialogHeader>
          
          {selectedEnrollment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Student Name</h4>
                  <p className="text-base">{selectedEnrollment.student_name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Email</h4>
                  <p className="text-base">{selectedEnrollment.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                  <p className="text-base">{selectedEnrollment.phone}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Course</h4>
                  <p className="text-base">{selectedEnrollment.courses.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Date</h4>
                  <p className="text-base">{formatDate(selectedEnrollment.created_at)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  <div className="flex items-center space-x-2">
                    <span 
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedEnrollment.status)}`}
                    >
                      {selectedEnrollment.status.charAt(0).toUpperCase() + selectedEnrollment.status.slice(1)}
                    </span>
                    
                    {selectedEnrollment.status === 'pending' && (
                      <Select
                        onValueChange={(value) => handleStatusChange(selectedEnrollment.id, value)}
                        defaultValue={selectedEnrollment.status}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Change status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approve</SelectItem>
                          <SelectItem value="rejected">Reject</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminEnrollments;
