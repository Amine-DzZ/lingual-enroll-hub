
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

// Define our simplified user and profile types
type User = {
  username: string;
  email?: string;
  id?: string;
};

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'user';
};

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        // Set admin profile
        if (parsedUser.username === 'omran2025') {
          setProfile({
            id: '1',
            first_name: 'Admin',
            last_name: 'User',
            role: 'admin'
          });
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    
    setIsLoading(false);
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      // Hardcoded admin credentials
      if (username === 'omran2025' && password === 'PASSWORD123') {
        const user = { 
          username: 'omran2025',
          email: 'admin@eliteminds.com',
          id: '1'
        };
        setUser(user);
        
        // Set admin profile
        setProfile({
          id: '1',
          first_name: 'Admin',
          last_name: 'User',
          role: 'admin'
        });
        
        // Store in localStorage to persist login
        localStorage.setItem('user', JSON.stringify(user));
        
        toast({
          title: "Login successful",
          description: "Welcome back, admin!",
        });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during sign in.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = () => {
    try {
      setUser(null);
      setProfile(null);
      localStorage.removeItem('user');
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message || "An error occurred during sign out.",
        variant: "destructive",
      });
    }
  };

  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAdmin,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
