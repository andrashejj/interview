import React from "react";

interface LoadingStateProps {
  rows?: number;
  type?: "table" | "card" | "list";
}

export function LoadingState({ rows = 5, type = "table" }: LoadingStateProps) {
  if (type === "card") {
    return (
      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-lg border border-gray-200 bg-white p-6"
          >
            <div className="space-y-3">
              <div className="h-4 w-3/4 rounded bg-gray-200" />
              <div className="h-4 w-1/2 rounded bg-gray-200" />
              <div className="h-4 w-5/6 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex animate-pulse items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-gray-200" />
              <div className="h-3 w-1/2 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default: table skeleton
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="animate-pulse">
        {/* Table Header */}
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
          <div className="flex gap-4">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="h-4 w-28 rounded bg-gray-200" />
            <div className="h-4 w-36 rounded bg-gray-200" />
          </div>
        </div>

        {/* Table Rows */}
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="border-b border-gray-200 px-6 py-4 last:border-b-0"
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 rounded bg-gray-200" />
                <div className="h-3 w-1/4 rounded bg-gray-200" />
              </div>
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-4 w-32 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
