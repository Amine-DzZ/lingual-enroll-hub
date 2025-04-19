
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, ArrowUpDown } from 'lucide-react';
import { EnrollmentStatusBadge } from './EnrollmentStatusBadge';
import { useEnrollmentActions } from '@/hooks/useEnrollmentActions';
import type { Enrollment, SortConfig } from '@/types/enrollment';

interface EnrollmentTableProps {
  enrollments: Enrollment[];
  onViewEnrollment: (enrollment: Enrollment) => void;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
}

const EnrollmentTable = ({
  enrollments,
  onViewEnrollment,
  sortConfig,
  onSort,
}: EnrollmentTableProps) => {
  const { handleStatusChange } = useEnrollmentActions();

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button
                className="flex items-center space-x-1"
                onClick={() => onSort('student_name')}
              >
                <span>Student Name</span>
                <ArrowUpDown className="h-3 w-3" />
              </button>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button
                className="flex items-center space-x-1"
                onClick={() => onSort('email')}
              >
                <span>Email</span>
                <ArrowUpDown className="h-3 w-3" />
              </button>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button
                className="flex items-center space-x-1"
                onClick={() => onSort('courses.name')}
              >
                <span>Course</span>
                <ArrowUpDown className="h-3 w-3" />
              </button>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button
                className="flex items-center space-x-1"
                onClick={() => onSort('created_at')}
              >
                <span>Date</span>
                <ArrowUpDown className="h-3 w-3" />
              </button>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {enrollments.map((enrollment) => (
            <tr key={enrollment.id}>
              <td className="px-6 py-4 whitespace-nowrap">{enrollment.student_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{enrollment.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{enrollment.courses.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <EnrollmentStatusBadge status={enrollment.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(enrollment.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewEnrollment(enrollment)}
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
  );
};

export default EnrollmentTable;
