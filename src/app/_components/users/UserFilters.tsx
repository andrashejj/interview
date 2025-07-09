export type Gender = "male" | "female";

interface UsersFiltersProps {
    search: string;
    setSearch: (v: string) => void;
    gender: Gender | undefined;
    setGender: (v: Gender | undefined) => void;
    sortBy: "name" | "age";
    setSortBy: (v: "name" | "age") => void;
    sortOrder: "asc" | "desc";
    setSortOrder: (v: "asc" | "desc") => void;
    onFilterChange: () => void;
}

export function UsersFilters({
    search,
    setSearch,
    gender,
    setGender,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    onFilterChange,
}: UsersFiltersProps) {
    
    function handleGenderChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        if (value === "male" || value === "female") {
            setGender(value);
        } else {
            setGender(undefined);
        }
        onFilterChange();
    }
    return (
        <div className="flex flex-wrap gap-4 mb-6 items-end">
            <div>
                <label className="block text-sm mb-1">Search</label>
                <input
                    type="text"
                    value={search}
                    onChange={e => { setSearch(e.target.value); onFilterChange(); }}
                    placeholder="Search by name or email"
                    className="px-3 py-2 rounded bg-white/10 text-white border border-white/20"
                />
            </div>
            <div>
                <label className="block text-sm mb-1">Gender</label>
                <select
                    value={gender ?? ""}
                    onChange={handleGenderChange}
                    className="px-3 py-2 rounded bg-white/10 text-white border border-white/20"
                >
                    <option value="">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div>
                <label className="block text-sm mb-1">Sort By</label>
                <select
                    value={sortBy}
                    onChange={e => { setSortBy(e.target.value as "name" | "age"); onFilterChange(); }}
                    className="px-3 py-2 rounded bg-white/10 text-white border border-white/20"
                >
                    <option value="name">Name</option>
                    <option value="age">Age</option>
                </select>
            </div>
            <div>
                <label className="block text-sm mb-1">Order</label>
                <button
                    onClick={() => { setSortOrder(sortOrder === "asc" ? "desc" : "asc"); onFilterChange(); }}
                    className="px-3 py-2 rounded bg-white/10 text-white border border-white/20 w-full"
                >
                    {sortOrder === "asc" ? "Ascending" : "Descending"}
                </button>
            </div>
        </div>
    );
}
