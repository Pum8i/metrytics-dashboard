"use client";

import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react"; // Using an alert icon
import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO - Log the error once we have that functionality
    console.error("Dashboard Error Boundary Caught:", JSON.stringify(error));
  }, [error]);

  return (
    <main className="flex h-dvh flex-col items-center justify-center space-y-6 p-4 text-center">
      <TriangleAlert className="h-16 w-16 text-destructive" /> {/* Icon */}
      <h2 className="text-2xl font-semibold text-destructive" aria-level={1}>
        Oops! Something went wrong.
      </h2>
      <p className="max-w-md text-muted-foreground">
        We encountered an unexpected issue while trying to load the dashboard.
        You can try refreshing the data, or return home if the problem persists.
      </p>
      {process.env.NODE_ENV === "development" && (
        <details className="w-full max-w-lg rounded-md border bg-muted p-4 text-left text-xs overflow-auto">
          <summary className="cursor-pointer font-medium">
            Error Details
          </summary>
          <pre className="mt-2 whitespace-pre-wrap break-all">
            <code aria-label="Error details">
              {error.name}: {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
              {error.stack && `\n\nStack Trace:\n${error.stack}`}
            </code>
          </pre>
        </details>
      )}
      <Button onClick={() => reset()}>Try Again</Button>
    </main>
  );
}
