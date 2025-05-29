// TODO: This is not a valid error component. It must be a client component.
// Error components must be Client Components
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-8 text-center">
      <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
      <h2 className="text-3xl font-semibold text-destructive mb-2">
        Oops! Something went wrong.
      </h2>
      <p className="text-muted-foreground mb-6">
        We encountered an error. Please try again, or contact support if the problem persists.
      </p>
      <p className="text-sm text-muted-foreground mb-6">
        Error: {error.message}
      </p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        size="lg"
      >
        Try again
      </Button>
    </div>
  );
}
