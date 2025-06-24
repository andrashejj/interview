"use client"

import { useState } from "react"
import { api } from "~/trpc/react"

const GENDERS = ["", "male", "female"] as const
type Gender = typeof GENDERS[number]

const SORT_FIELDS = ["firstName", "lastName", "age"] as const
type SortField = typeof SORT_FIELDS[number]

const SORT_ORDERS = ["asc", "desc"] as const
type SortOrder = typeof SORT_ORDERS[number]

export default function UserList() {
  const [search, setSearch] = useState("")
  const [gender, setGender] = useState<Gender>("")
  const [sortBy, setSortBy] = useState<SortField>("firstName")
  const [order, setOrder] = useState<SortOrder>("asc")

  const { data: users, isLoading, error } = api.user.getAll.useQuery({
    search, //tried to add debounce here but there are some problems with installation of the package
    gender: gender || undefined,
    sortBy,
    order,
  })

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search"
          className="border px-2 py-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={gender} onChange={(e) => setGender(e.target.value as Gender)}>
          {GENDERS.map((g) => (
            <option key={g} value={g}>
              {g === "" ? "All" : g}
            </option>
          ))}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortField)} className="border px-2 py-1">
          {SORT_FIELDS.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
        <select value={order} onChange={(e) => setOrder(e.target.value as SortOrder)} className="border px-2 py-1">
          {SORT_ORDERS.map((ord) => (
            <option key={ord} value={ord}>
              {ord}
            </option>
          ))}
        </select>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading users</p>}
      {!isLoading && !users?.length && <p>No users found</p>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {users?.map((user) => (
          <div key={user.id} className="border rounded p-4 flex gap-4">
            <img src={user.image} alt={user.firstName} className="w-16 h-16 rounded-full" />
            <div>
              <p className="font-bold">{user.firstName} {user.lastName}</p>
              <p className="text-sm">{user.email}</p>
              <p className="text-sm text-gray-600">{user.gender} • {user.age} • {user.city}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
