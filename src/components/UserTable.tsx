import React from "react";
import Link from "next/link";
import { Spinner } from "./ui/Spinner";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  companyName: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  image: string | null;
  gender?: string | null;
  hairColor?: string | null;
  eyeColor?: string | null;
  bloodGroup?: string | null;
}

interface ActiveFilter {
  key: string;
  value: string;
  label: string;
}

interface UserTableProps {
  users: User[];
  activeFilters: ActiveFilter[];
  isLoading: boolean;
  isError: boolean;
  error?: { message?: string } | null;
}

export function UserTable({
  users,
  activeFilters,
  isLoading,
  isError,
  error,
}: UserTableProps) {
  // Determine which dynamic columns to show based on active filters
  const showGender = activeFilters.some((f) => f.key === "gender");
  const showHairColor = activeFilters.some((f) => f.key === "hairColor");
  const showEyeColor = activeFilters.some((f) => f.key === "eyeColor");
  const showBloodGroup = activeFilters.some((f) => f.key === "bloodGroup");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-red-800">
          Error loading users: {error?.message ?? "Unknown error"}
        </p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          No users found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Address
              </th>
              {showGender && (
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Gender
                </th>
              )}
              {showHairColor && (
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Hair Color
                </th>
              )}
              {showEyeColor && (
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Eye Color
                </th>
              )}
              {showBloodGroup && (
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Blood Group
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.map((user) => (
              <tr
                key={user.id}
                className="bg-white shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap ">
                  <Link
                    href={`/users/${user.id}`}
                    className="flex items-center gap-3"
                  >
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-500">
                          <svg
                            className="h-6 w-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-y border-gray-100">
                  <Link href={`/users/${user.id}`} className="block">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-y border-gray-100">
                  <Link href={`/users/${user.id}`} className="block">
                    <div className="text-sm text-gray-900">
                      {user.phone || "N/A"}
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-y border-gray-100">
                  <Link href={`/users/${user.id}`} className="block">
                    <div className="text-sm text-gray-900">
                      {user.companyName || "N/A"}
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4 border-y border-gray-100">
                  <Link href={`/users/${user.id}`} className="block">
                    <div className="text-sm text-gray-900">
                      {user.address
                        ? `${user.address}${user.city ? `, ${user.city}` : ""}${user.state ? `, ${user.state}` : ""}`
                        : "N/A"}
                    </div>
                  </Link>
                </td>
                {showGender && (
                  <td className="px-6 py-4 whitespace-nowrap border-y border-gray-100">
                    <Link href={`/users/${user.id}`} className="block">
                      <div className="text-sm text-gray-900">
                        {user.gender || "N/A"}
                      </div>
                    </Link>
                  </td>
                )}
                {showHairColor && (
                  <td className="px-6 py-4 whitespace-nowrap border-y border-gray-100">
                    <Link href={`/users/${user.id}`} className="block">
                      <div className="text-sm text-gray-900">
                        {user.hairColor || "N/A"}
                      </div>
                    </Link>
                  </td>
                )}
                {showEyeColor && (
                  <td className="px-6 py-4 whitespace-nowrap border-y border-gray-100">
                    <Link href={`/users/${user.id}`} className="block">
                      <div className="text-sm text-gray-900">
                        {user.eyeColor || "N/A"}
                      </div>
                    </Link>
                  </td>
                )}
                {showBloodGroup && (
                  <td className="px-6 py-4 whitespace-nowrap border-y border-gray-100 last:rounded-r-lg">
                    <Link href={`/users/${user.id}`} className="block">
                      <div className="text-sm text-gray-900">
                        {user.bloodGroup || "N/A"}
                      </div>
                    </Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
