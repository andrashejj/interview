'use client';

import { useEffect, useState } from 'react';
import UserTable from './components/UserTable';
import SearchBar from './components/SearchBar';
import { User } from '@prisma/client';

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let result = [...users];

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        return fullName.includes(query) || user.email.toLowerCase().includes(query);
      });
    }

    if (gender) {
      result = result.filter((user) => user.gender === gender);
    }

    if (sortBy === 'name') {
      result.sort((a, b) =>
        `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
      );
    } else if (sortBy === 'age') {
      result.sort((a, b) => a.age - b.age);
    }

    setFilteredUsers(result);
  }, [search, gender, sortBy, users]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📒 Address Book</h1>

      {loading ? (
        <p className="text-gray-600">🔄 Loading users...</p>
      ) : (
        <>
          <SearchBar
            search={search}
            setSearch={setSearch}
            gender={gender}
            setGender={setGender}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          <UserTable users={filteredUsers} />
        </>
      )}
    </main>
  );
}
