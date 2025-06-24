"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import type { User, SortConfig } from "../types/user";
import Loader from "../_components/Loader";

export default function Home() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'firstName', direction: 'asc' });

  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
          cache: "no-store",
        });
        const users: User[] = await res.json();
        setAllUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = allUsers.filter(user => {
      const matchesSearch = searchTerm === "" || 
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGender = genderFilter === "" || user.gender === genderFilter;

      const matchesAge = ageFilter === "" || 
        (ageFilter === "18-30" && user.age >= 18 && user.age <= 30) ||
        (ageFilter === "31-50" && user.age >= 31 && user.age <= 50) ||
        (ageFilter === "50+" && user.age > 50);

      return matchesSearch && matchesGender && matchesAge;
    });

    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortConfig.key) {
        case 'fullName':
          aValue = `${a.firstName} ${a.lastName}`;
          bValue = `${b.firstName} ${b.lastName}`;
          break;
        case 'company':
          aValue = a.company?.name || '';
          bValue = b.company?.name || '';
          break;
        case 'location':
          aValue = `${a.location?.city}, ${a.location?.state}`;
          bValue = `${b.location?.city}, ${b.location?.state}`;
          break;
        default:
          aValue = a[sortConfig.key as keyof User];
          bValue = b[sortConfig.key as keyof User];
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [allUsers, searchTerm, genderFilter, ageFilter, sortConfig]);

  const handleSort = useCallback((key: SortConfig["key"]) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const handleFilterChange = () => {};

  useEffect(handleFilterChange, [searchTerm, genderFilter, ageFilter]);

  const getSortIndicator = (key: SortConfig['key']) => {
    if (sortConfig.key !== key) return ' ↕️';
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  const clearFilters = () => {
    setSearchTerm("");
    setGenderFilter("");
    setAgeFilter("");
    setSortConfig({ key: 'firstName', direction: 'asc' });
  };

  if (loading) return <Loader />;

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center gap-8 px-4 py-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Andras Full stack <span className="text-[hsl(280,100%,70%)]">Interview</span> App
        </h1>

        <div className="w-full max-w-6xl bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Search by Name or Email</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter name or email..."
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Filter by Gender</label>
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="" className="text-[black]">All Genders</option>
                <option value="male" className="text-[black]">Male</option>
                <option value="female" className="text-[black]">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Filter by Age Range</label>
              <select
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="" className="text-[black]">All Ages</option>
                <option value="18-30" className="text-[black]">18-30 years</option>
                <option value="31-50" className="text-[black]">31-50 years</option>
                <option value="50+" className="text-[black]">50+ years</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-semibold transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          <div className="text-sm text-white/80">
            Showing {filteredAndSortedUsers.length} users
            {(searchTerm || genderFilter || ageFilter) && ` (filtered from ${allUsers.length} total)`}
          </div>
        </div>

        <div className="w-full max-w-6xl overflow-x-auto bg-white/5 backdrop-blur-sm rounded-lg">
          <table className="min-w-full table-auto text-white">
            <thead className="bg-white/20">
              <tr>
                <th onClick={() => handleSort('fullName')} className="cursor-pointer px-4 py-3">Name{getSortIndicator('fullName')}</th>
                <th onClick={() => handleSort('email')} className="cursor-pointer px-4 py-3">Email{getSortIndicator('email')}</th>
                <th onClick={() => handleSort('gender')} className="cursor-pointer px-4 py-3">Gender{getSortIndicator('gender')}</th>
                <th onClick={() => handleSort('age')} className="cursor-pointer px-4 py-3">Age{getSortIndicator('age')}</th>
                <th onClick={() => handleSort('phone')} className="cursor-pointer px-4 py-3">Phone{getSortIndicator('phone')}</th>
                <th onClick={() => handleSort('company')} className="cursor-pointer px-4 py-3">Company{getSortIndicator('company')}</th>
                <th onClick={() => handleSort('location')} className="cursor-pointer px-4 py-3">Location{getSortIndicator('location')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-white/60">No users found matching your criteria</td>
                </tr>
              ) : (
                filteredAndSortedUsers.map(user => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">{user.firstName} {user.lastName}</td>
                    <td className="px-4 py-3 text-blue-300">{user.email}</td>
                    <td className="px-4 py-3 capitalize">{user.gender}</td>
                    <td className="px-4 py-3">{user.age}</td>
                    <td className="px-4 py-3 text-green-300">{user.phone}</td>
                    <td className="px-4 py-3">{user.company?.name || 'N/A'}</td>
                    <td className="px-4 py-3">{user.location ? `${user.location.city}, ${user.location.state}` : 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}