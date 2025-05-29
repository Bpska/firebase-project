"use client";

import { useContext, useEffect } from 'react';
import { AuthContext, AuthContextType } from '@/contexts/auth-provider';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const withAdminAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const ComponentWithAdminAuth = (props: P) => {
    const authContext = useContext(AuthContext);
    const router = useRouter();

    if (!authContext) {
      // This case should ideally not happen if the component is wrapped within AuthProvider
      console.error("AuthContext is undefined, make sure you are wrapping your app in AuthProvider");
      // Optionally redirect or show an error
      useEffect(() => {
        router.push('/login');
      }, [router]);
      return null;
    }

    const { user, isAdmin, loading } = authContext;

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.push('/login'); // Redirect to login if not authenticated
        } else if (!isAdmin) {
          router.push('/'); // Redirect to home if not admin
        }
      }
    }, [user, isAdmin, loading, router]);

    if (loading || !user || !isAdmin) {
      // Show a loading spinner or a generic loading state while checking auth/admin status
      // or if the user is not an admin and redirection is about to happen.
      return (
        <div className="flex min-h-screen items-center justify-center bg-background">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      );
    }

    // If authenticated and is an admin, render the wrapped component
    return <WrappedComponent {...props} />;
  };

  ComponentWithAdminAuth.displayName = `WithAdminAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAdminAuth;
};

export default withAdminAuth;
