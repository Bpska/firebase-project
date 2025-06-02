"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-8 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-xl text-muted-foreground">Loading your FireBlog experience...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-8 text-center">
      <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
        Welcome to <span className="text-primary">FireBlog</span>
      </h1>
      
      {user ? (
        <>
          <p className="mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Hello, <span className="font-semibold text-accent">{user.displayName || user.email}!</span> You are logged in and ready to explore.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild>
              <Link href="/registration">Go to Dashboard</Link>
            </Button>
            <Button size="lg" variant="outline">
              Explore Blogs
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            The modern blogging platform built with Firebase and Next.js. Share your thoughts, ideas, and stories with the world.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </>
      )}
       <div className="mt-16">
        <img 
          src="https://placehold.co/600x400.png" 
          alt="Blogging illustration" 
          data-ai-hint="blogging workspace"
          className="rounded-lg shadow-2xl"
          width={600}
          height={400} 
        />
      </div>
    </div>
  );
}
