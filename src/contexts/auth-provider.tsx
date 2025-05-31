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
  const [hasSpecialAccess, setHasSpecialAccess] = useState(false);
  const [authLoading, setAuthLoading] = useState(true); // For Firebase Auth state
  const [firestoreLoading, setFirestoreLoading] = useState(false); // For Firestore user data fetching

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setAuthLoading(true); // Reset authLoading at the start of an auth state change
      setFirestoreLoading(false); // Default firestoreLoading to false, set true only if fetching

      if (firebaseUser) {
        setUser(firebaseUser); // Set user from Firebase Auth
        setFirestoreLoading(true); // Indicate Firestore fetch is starting

        let currentIsAdmin = false;
        let currentHasSpecialAccess = false;

        try {
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("uid", "==", firebaseUser.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0].data();
            currentIsAdmin = userDoc.isAdmin || false;
            currentHasSpecialAccess = userDoc.hasSpecialAccess || false;
          } else {
            console.warn("User document not found in Firestore for UID:", firebaseUser.uid);
            // Defaults for currentIsAdmin and currentHasSpecialAccess remain false
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
          // Defaults for currentIsAdmin and currentHasSpecialAccess remain false
        } finally {
          setIsAdmin(currentIsAdmin); // Set regardless of success/failure (defaults to false on error/not found)
          setHasSpecialAccess(currentHasSpecialAccess); // Set regardless
          setFirestoreLoading(false); // Firestore fetch complete (or attempted)
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        setHasSpecialAccess(false);
        // No Firestore fetch needed, so firestoreLoading remains false
      }
      setAuthLoading(false); // Firebase auth state resolution is complete

      // Redirection logic (can now use isAdmin and hasSpecialAccess states directly if preferred,
      // or currentIsAdmin/currentHasSpecialAccess if values right after fetch are needed)
      // Using state values is fine as this logic runs after they are set.
      if (firebaseUser && hasSpecialAccess && !isAdmin) { // Using state here
        const nonSpecialAccessPaths = ['/', '/login', '/register'];
        if (nonSpecialAccessPaths.includes(pathname) && pathname !== '/special-access') {
          router.push('/special-access');
        }
      }
    });

    return () => unsubscribe();
  }, [pathname, router, isAdmin, hasSpecialAccess]); // Added isAdmin and hasSpecialAccess as redirection logic now uses them from state

  const combinedLoading = authLoading || firestoreLoading;

  if (combinedLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading: combinedLoading, isAdmin, hasSpecialAccess }}>
      {children}
    </AuthContext.Provider>
  );
}
