"use client";

import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase'; // Import db
import { collection, query, where, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { Loader2 } from 'lucide-react';

import { usePathname, useRouter } from 'next/navigation'; // Import for redirection

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  hasSpecialAccess: boolean; // Add hasSpecialAccess
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasSpecialAccess, setHasSpecialAccess] = useState(false); // Add hasSpecialAccess state
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // For redirection
  const pathname = usePathname(); // For checking current path

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      let currentIsAdmin = false;
      let currentHasSpecialAccess = false;

      if (firebaseUser) {
        setUser(firebaseUser);
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "==", firebaseUser.uid));
        try {
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0].data();
            currentIsAdmin = userDoc.isAdmin || false;
            currentHasSpecialAccess = userDoc.hasSpecialAccess || false;
            setIsAdmin(currentIsAdmin);
            setHasSpecialAccess(currentHasSpecialAccess);
          } else {
            console.warn("User document not found in Firestore for UID:", firebaseUser.uid);
            setIsAdmin(false);
            setHasSpecialAccess(false);
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
          setIsAdmin(false);
          setHasSpecialAccess(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        setHasSpecialAccess(false);
      }
      setLoading(false);

      // Redirection logic after all states are set
      if (firebaseUser && currentHasSpecialAccess && !currentIsAdmin) {
        const nonSpecialAccessPaths = ['/', '/login', '/register']; // Define paths that are not special access
        // Add more "normal" user paths here if needed
        if (nonSpecialAccessPaths.includes(pathname) && pathname !== '/special-access') {
          router.push('/special-access');
        }
      }
    });

    return () => unsubscribe();
  }, [pathname, router]); // Add pathname and router to dependency array

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, hasSpecialAccess }}> {/* Add hasSpecialAccess to context */}
      {children}
    </AuthContext.Provider>
  );
}
