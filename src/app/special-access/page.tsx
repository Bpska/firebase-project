"use client";

import React from 'react';
import { useAuth } from '@/hooks/use-auth'; // To optionally greet the user
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DoorOpen, LogOut } from 'lucide-react'; // Icons

export default function SpecialAccessPage() {
  const { user, loading, hasSpecialAccess } = useAuth();
  const router = useRouter();

  // Redirect if user somehow lands here without special access or if still loading
  // This is a fallback, AuthProvider should handle primary redirection.
  useEffect(() => {
    if (!loading && !hasSpecialAccess && user) {
      router.push('/'); // Redirect non-special users back to home
    }
    if (!loading && !user) {
      router.push('/login'); // Redirect unauthenticated users to login
    }
  }, [user, loading, hasSpecialAccess, router]);

  if (loading || !user || !hasSpecialAccess) {
    // Show loading or a minimal screen while redirecting or confirming access
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 p-4">
        <div className="text-white text-xl">Loading Special Access Area...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-green-500 rounded-full p-3 w-fit mb-4">
            <DoorOpen className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800">Welcome to the Special Access Area!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg text-gray-600 mb-6">
            Hello, {user.displayName || user.email}! You have been granted exclusive access.
          </p>
          <p className="text-md text-gray-500 mb-8">
            This area contains content or features not available to standard users.
          </p>
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="w-full mb-3 group"
          >
            Go to Homepage (You might be redirected back if still on special path)
            <LogOut className="ml-2 h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
          </Button>
           <p className="text-xs text-gray-400 mt-4">
            Note: If you navigate to standard pages like the homepage, you might be redirected back here as long as your special access is active on those pages.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
