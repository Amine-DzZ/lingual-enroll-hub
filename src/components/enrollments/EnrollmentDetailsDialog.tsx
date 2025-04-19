
import { Button } from '@/components/ui/button';
import type { Enrollment } from '@/types/enrollment';
import { EnrollmentStatusBadge } from './EnrollmentStatusBadge';

interface EnrollmentDetailsDialogProps {
  enrollment: Enrollment | null;
  onClose: () => void;
}

const EnrollmentDetailsDialog = ({ enrollment, onClose }: EnrollmentDetailsDialogProps) => {
  if (!enrollment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-4">Enrollment Details</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Student Name</h4>
            <p>{enrollment.student_name}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Email</h4>
            <p>{enrollment.email}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Phone</h4>
            <p>{enrollment.phone}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Course</h4>
            <p>{enrollment.courses.name}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Status</h4>
            <EnrollmentStatusBadge status={enrollment.status} />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Message</h4>
            <p>{enrollment.message || 'No message provided'}</p>
          </div>
        </div>
        <Button onClick={onClose} className="w-full">Close</Button>
      </div>
    </div>
  );
};

export default EnrollmentDetailsDialog;
