import React from "react";
import { Button } from "./ui/Button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  icon,
  title = "No results found",
  message = "Try adjusting your search or filters",
  action,
}: EmptyStateProps) {
  const defaultIcon = (
    <svg
      className="h-12 w-12 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    </svg>
  );

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 text-center">
      <div className="mx-auto w-fit">{icon || defaultIcon}</div>

      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500">{message}</p>

      {action && (
        <div className="mt-6">
          <Button onClick={action.onClick} variant="primary">
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
}
