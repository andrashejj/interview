type SortField = "name" | "email" | "company";
type SortDirection = "asc" | "desc";

interface FilterControlsProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSortChange: (field: SortField) => void;
  companyFilter: string;
  onCompanyFilterChange: (company: string) => void;
  companies: string[];
}

export function FilterControls({
  sortField,
  sortDirection,
  onSortChange,
  companyFilter,
  onCompanyFilterChange,
  companies,
}: FilterControlsProps) {
  const sortButtons: { field: SortField; label: string }[] = [
    { field: "name", label: "Name" },
    { field: "email", label: "Email" },
    { field: "company", label: "Company" },
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-medium text-slate-700">Sort:</span>
        {sortButtons.map(({ field, label }) => (
          <button
            key={field}
            onClick={() => onSortChange(field)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              sortField === field
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {label}
            {sortField === field && (
              <span className="ml-1.5">{sortDirection === "asc" ? "↑" : "↓"}</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-700">Filter:</span>
        <select
          value={companyFilter}
          onChange={(e) => onCompanyFilterChange(e.target.value)}
          className="min-w-[180px] rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Companies ({companies.length})</option>
          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
