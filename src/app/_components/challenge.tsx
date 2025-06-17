"use client";

// pages/index.tsx
import { useEffect, useState } from "react";
// import { User } from "../utils/userSchema";
import { type User } from "~/utils/userSchema";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [sortBy, setSortBy] = useState<"name"|"age">("name");

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then(res => res.json())
      .then(data=>setUsers(data.users))
      .catch(() => setUsers([]));
  }, []);

  const filtered = users
    .filter(u => 
      (u.firstName + " " + u.lastName).toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter(u => !gender || u.gender === gender)
    .sort((a, b) => sortBy === "name"
      ? (a.firstName + a.lastName).localeCompare(b.firstName + b.lastName)
      : a.age - b.age
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-black">
    <div
      style={{
        padding: 32,
        fontFamily: "Arial, sans-serif",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginBottom: 24, color: 'white' }}>Address Book</h1>

      <div
        style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24, color: 'white' }}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email"
          style={{
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: 6,
            flex: 1,
            minWidth: 200,
          }}
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={{
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: 6,
            minWidth: 120,
          }}
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          style={{
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: 6,
            minWidth: 120,
          }}
        >
          <option value="name">Sort by Name</option>
          <option value="age">Sort by Age</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div style={{ marginTop: 40, fontSize: 18, color: "#666" }}>
          No results found.
        </div>
      ) : (
        <table
          style={{
            width: "100%",
            background: "#fff",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Gender</th>
              <th style={thStyle}>Age</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={tdStyle}>
                  {u.firstName} {u.lastName}
                </td>
                <td style={tdStyle}>{u.email}</td>
                <td style={tdStyle}>{u.gender}</td>
                <td style={tdStyle}>{u.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </main>

  );
}
const thStyle = {
  textAlign: "left",
  padding: "12px 8px",
  background: "#f8f8f8",
  borderBottom: "2px solid #ddd",
};

const tdStyle = {
  padding: "10px 8px",
};