
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut, isAdmin, profile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: '/dashboard',
      adminOnly: false,
    },
    {
      name: 'Courses',
      icon: <BookOpen className="h-5 w-5" />,
      href: '/admin/courses',
      adminOnly: true,
    },
    {
      name: 'Enrollments',
      icon: <Users className="h-5 w-5" />,
      href: '/admin/enrollments',
      adminOnly: true,
    },
    {
      name: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      href: '/dashboard/settings',
      adminOnly: false,
    },
  ];

  // Filter out admin-only pages if user is not an admin
  const filteredNavItems = navItems.filter(
    (item) => !item.adminOnly || isAdmin
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile header */}
      <header className="md:hidden bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Collapsible
            open={sidebarOpen}
            onOpenChange={setSidebarOpen}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                {sidebarOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </CollapsibleTrigger>
            <div className="flex items-center">
              <span className="font-bold text-xl text-academy-teal">
                Elite Minds
              </span>
            </div>
            <CollapsibleContent className="absolute left-0 right-0 bg-white z-50 shadow-md mt-4 py-2">
              <nav className="space-y-1 px-3">
                {filteredNavItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                      location.pathname === item.href
                        ? 'bg-academy-teal text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    handleSignOut();
                  }}
                  className="flex w-full items-center px-4 py-3 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="ml-3">Sign Out</span>
                </button>
              </nav>
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div>
          {profile && (
            <div className="text-sm font-medium">
              {profile.first_name || profile.last_name
                ? `${profile.first_name} ${profile.last_name}`
                : 'User'}
            </div>
          )}
        </div>
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white border-r">
        <div className="p-6">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl text-academy-teal">
              Elite Minds
            </span>
          </Link>
        </div>

        <div className="flex-1 px-4 py-2">
          <nav className="space-y-1">
            {filteredNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                  location.pathname === item.href
                    ? 'bg-academy-teal text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                {profile?.first_name?.[0] || 'U'}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">
                  {profile?.first_name || profile?.last_name
                    ? `${profile?.first_name || ''} ${profile?.last_name || ''}`
                    : 'User'}
                </p>
                <p className="text-xs text-gray-500">
                  {isAdmin ? 'Administrator' : 'User'}
                </p>
              </div>
            </div>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="w-full flex items-center justify-center"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <div className="container mx-auto py-6 px-4">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
