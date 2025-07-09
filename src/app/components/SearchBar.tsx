type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
};

export default function SearchBar({
  search,
  setSearch,
  gender,
  setGender,
  sortBy,
  setSortBy,
}: SearchBarProps) {
  return (
    <div className="flex gap-4 mb-4 flex-wrap">
      <input
        type="text"
        placeholder="Search by name or email"
        className="border px-3 py-2 rounded w-64"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border px-3 py-2 rounded"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">All Genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <select
        className="border px-3 py-2 rounded"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">No Sort</option>
        <option value="name">Sort by Name</option>
        <option value="age">Sort by Age</option>
      </select>
    </div>
  );
}
