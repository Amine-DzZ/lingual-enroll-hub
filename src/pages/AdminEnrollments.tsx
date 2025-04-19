
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Eye, ArrowUpDown } from 'lucide-react';

const AdminEnrollments = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [enrollments, setEnrollments] = useState([]);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: 'created_at',
    direction: 'desc'
  });

  useEffect(() => {
    // Load enrollments from localStorage
    const storedEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    setEnrollments(storedEnrollments);
  }, []);

  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedEnrollments = enrollments.map(enrollment => 
      enrollment.id === id ? { ...enrollment, status: newStatus } : enrollment
    );
    
    localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments));
    setEnrollments(updatedEnrollments);
    
    toast({
      title: 'Status updated',
      description: 'The enrollment status has been updated successfully',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  // Sort enrollments
  const sortedEnrollments = [...enrollments].sort((a, b) => {
    const aValue = sortConfig.key === 'courses.name' ? 
      a.courses?.name : a[sortConfig.key];
    const bValue = sortConfig.key === 'courses.name' ? 
      b.courses?.name : b[sortConfig.key];
    
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
        
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => handleSort('student_name')}
                  >
                    <span>Student Name</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => handleSort('email')}
                  >
                    <span>Email</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => handleSort('courses.name')}
                  >
                    <span>Course</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => handleSort('created_at')}
                  >
                    <span>Date</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedEnrollments.map((enrollment) => (
                <tr key={enrollment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{enrollment.student_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{enrollment.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{enrollment.courses.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(enrollment.status)}`}>
                      {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(enrollment.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedEnrollment(enrollment)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      
                      {enrollment.status === 'pending' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-800"
                            onClick={() => handleStatusChange(enrollment.id, 'approved')}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleStatusChange(enrollment.id, 'rejected')}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedEnrollment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">Enrollment Details</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Student Name</h4>
                <p>{selectedEnrollment.student_name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Email</h4>
                <p>{selectedEnrollment.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                <p>{selectedEnrollment.phone}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Course</h4>
                <p>{selectedEnrollment.courses.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Status</h4>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedEnrollment.status)}`}>
                  {selectedEnrollment.status.charAt(0).toUpperCase() + selectedEnrollment.status.slice(1)}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Message</h4>
                <p>{selectedEnrollment.message || 'No message provided'}</p>
              </div>
            </div>
            <Button
              onClick={() => setSelectedEnrollment(null)}
              className="w-full"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminEnrollments;
