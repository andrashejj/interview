"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { UserCard } from "./UserCard";
import { UsersFilters, type Gender } from "./UserFilters";

const USERS_PER_PAGE = 9;

export function Users() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [gender, setGender] = useState<Gender | undefined>(undefined);
    const [sortBy, setSortBy] = useState<"name" | "age">("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const { data, isLoading } = api.user.getAll.useQuery({
        page,
        limit: USERS_PER_PAGE,
        search: search || undefined,
        gender,
        sortBy,
        sortOrder,
    });

    const totalUsers = data?.total ?? 0;
    const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);
    const usersToShow = data?.users ?? [];

    // Reset to page 1 when filters/search/sort change
    function onFilterChange() {
        setPage(1);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <UsersFilters
                search={search}
                setSearch={setSearch}
                gender={gender}
                setGender={setGender}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                onFilterChange={onFilterChange}
            />
            {isLoading && <div>Loading...</div>}
            {!isLoading && usersToShow.length === 0 && <div>No users found</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                {usersToShow.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
            <div className="flex justify-center gap-4">
                <button
                    className="px-4 py-2 rounded bg-white/10 text-white disabled:opacity-50"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span className="px-2 py-2 text-white">
                    Page {page} of {totalPages}
                </span>
                <button
                    className="px-4 py-2 rounded bg-white/10 text-white disabled:opacity-50"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}