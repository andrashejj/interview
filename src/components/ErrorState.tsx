import React from "react";
import { Button } from "./ui/Button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  error?: Error | null;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  error,
  onRetry,
}: ErrorStateProps) {
  const displayMessage =
    message ||
    error?.message ||
    "An unexpected error occurred. Please try again.";

  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <svg
          className="h-6 w-6 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h3 className="mt-4 text-lg font-medium text-red-900">{title}</h3>
      <p className="mt-2 text-sm text-red-800">{displayMessage}</p>

      {onRetry && (
        <div className="mt-6">
          <Button onClick={onRetry} variant="danger">
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
