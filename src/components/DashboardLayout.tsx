import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Settings, Layout, BookOpen, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const onSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onSignOut={onSignOut} />
      <div className="flex-1 overflow-y-auto p-8">
        {children}
      </div>
    </div>
  );
};

// Update the sidebar links to include admin dashboard
const SidebarContent = ({ isAdmin = false }) => (
  <div className="h-full w-64 border-r bg-gray-50">
    <div className="flex flex-col h-full">
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Academy Dashboard
        </h2>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        <Link
          to="/dashboard"
          className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
        >
          <Layout className="mr-3 h-5 w-5" />
          Dashboard
        </Link>
        
        {isAdmin && (
          <>
            <Link
              to="/admin"
              className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
            >
              <Shield className="mr-3 h-5 w-5" />
              Admin Dashboard
            </Link>
            <Link
              to="/admin/courses"
              className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
            >
              <BookOpen className="mr-3 h-5 w-5" />
              Manage Courses
            </Link>
            <Link
              to="/admin/enrollments"
              className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
            >
              <Users className="mr-3 h-5 w-5" />
              Manage Enrollments
            </Link>
          </>
        )}
        
        <Link
          to="/dashboard/settings"
          className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
        >
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </Link>
      </nav>
      <div className="p-4 border-t">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={onSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  </div>
);

const Sidebar = ({ onSignOut }: { onSignOut: () => void }) => {
  const { isAdmin } = useAuth();

  return <SidebarContent isAdmin={isAdmin} onSignOut={onSignOut} />;
};

export default DashboardLayout;
