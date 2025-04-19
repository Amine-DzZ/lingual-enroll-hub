
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import EnrollmentTable from '@/components/enrollments/EnrollmentTable';
import EnrollmentDetailsDialog from '@/components/enrollments/EnrollmentDetailsDialog';
import type { Enrollment, SortConfig } from '@/types/enrollment';

const AdminEnrollments = () => {
  const { isAdmin } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'created_at',
    direction: 'desc'
  });

  useEffect(() => {
    const storedEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    setEnrollments(storedEnrollments);
  }, []);

  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Sort enrollments
  const sortedEnrollments = [...enrollments].sort((a, b) => {
    const aValue = sortConfig.key === 'courses.name' ? 
      a.courses?.name : a[sortConfig.key as keyof Enrollment];
    const bValue = sortConfig.key === 'courses.name' ? 
      b.courses?.name : b[sortConfig.key as keyof Enrollment];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc' ?
        aValue.localeCompare(bValue) :
        bValue.localeCompare(aValue);
    }
    return 0;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Enrollment Management</h1>
        </div>
        
        <EnrollmentTable
          enrollments={sortedEnrollments}
          onViewEnrollment={setSelectedEnrollment}
          sortConfig={sortConfig}
          onSort={handleSort}
        />

        <EnrollmentDetailsDialog
          enrollment={selectedEnrollment}
          onClose={() => setSelectedEnrollment(null)}
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminEnrollments;
