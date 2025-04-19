
import { useToast } from '@/hooks/use-toast';

export const useEnrollmentActions = () => {
  const { toast } = useToast();

  const handleStatusChange = (id: string, newStatus: string) => {
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    const updatedEnrollments = enrollments.map((enrollment: any) => 
      enrollment.id === id ? { ...enrollment, status: newStatus } : enrollment
    );
    
    localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments));
    
    toast({
      title: 'Status updated',
      description: 'The enrollment status has been updated successfully',
    });
  };

  return { handleStatusChange };
};
