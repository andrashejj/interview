"use client";

interface EmptyStateProps {
  isFiltered: boolean;
  onClearFilters: () => void;
}

export function EmptyState({ isFiltered, onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="rounded-full bg-slate-100 p-3 mb-4">
        <svg
          className="h-8 w-8 text-slate-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-slate-900 mb-1">
        {isFiltered ? "No users found" : "No users available"}
      </h3>
      <p className="text-sm text-slate-600 mb-4">
        {isFiltered
          ? "Try adjusting your search or filters"
          : "There are no users to display"}
      </p>
      {isFiltered && (
        <button
          onClick={onClearFilters}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
} 