
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  isAdmin: boolean;
  email?: string;
  id?: string;
}

interface Profile {
  first_name?: string;
  last_name?: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check local storage on mount
  useEffect(() => {
    setIsLoading(true);
    const storedUser = localStorage.getItem('user');
    const storedProfile = localStorage.getItem('profile');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
    
    setIsLoading(false);
  }, []);

  const signIn = async (username: string, password: string) => {
    // Hardcoded admin credentials
    if (username === 'omran2025' && password === 'PASSWORD123') {
      const userData = { username, isAdmin: true, email: `${username}@example.com`, id: '1' };
      const profileData = { first_name: 'Admin', last_name: 'User' };
      
      setUser(userData);
      setProfile(profileData);
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('profile', JSON.stringify(profileData));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signOut = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
  };

  const value = {
    user,
    profile,
    isLoading,
    signIn,
    signOut,
    isAdmin: user?.isAdmin || false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
