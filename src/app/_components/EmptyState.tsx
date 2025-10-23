interface EmptyStateProps {
  hasSearch: boolean;
}

export function EmptyState({ hasSearch }: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
      <div className="mb-4 text-6xl">{hasSearch ? "🔍" : "📭"}</div>
      <h3 className="mb-2 text-xl font-semibold text-slate-900">
        {hasSearch ? "No matches found" : "No contacts available"}
      </h3>
      <p className="text-slate-600">
        {hasSearch
          ? "Try adjusting your search or filters"
          : "Contacts will appear here once loaded"}
      </p>
    </div>
  );
}
