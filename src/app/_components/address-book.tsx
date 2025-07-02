"use client";

import { useState, useCallback, useDeferredValue, useTransition, useEffect } from "react";
import { api } from "~/trpc/react";
import { UserCard } from "./user-card";
import { SearchBar } from "./search-bar";
import { FilterControls } from "./filter-controls";
import { SortControls } from "./sort-controls";
import { LoadingState } from "./loading-state";
import { ErrorState } from "./error-state";
import { EmptyState } from "./empty-state";
import type { GenderFilter, SortField, SortOrder } from "~/types/users";
import type { User } from "~/server/api/routers/users";
import { colors, cn, borderRadius, typography } from "~/styles/design-tokens";

export default function AddressBook() {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState<GenderFilter>("all");
  const [sortBy, setSortBy] = useState<SortField>("firstName");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [isPending, startTransition] = useTransition();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [cursor, setCursor] = useState<number | undefined>(undefined);

  const deferredSearch = useDeferredValue(search);

  const { data, isLoading, error, refetch, isPlaceholderData, isFetching } = api.users.getAll.useQuery({
    search: deferredSearch,
    gender,
    sortBy,
    sortOrder,
    cursor,
  }, {
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    if (data?.users) {
      if (cursor === undefined) {
        setAllUsers(data.users);
      } else {
        setAllUsers(prev => [...prev, ...data.users]);
      }
    }
  }, [data?.users, cursor]);

  const handleSearchChange = useCallback((value: string) => {
    startTransition(() => {
      setSearch(value);
      setCursor(undefined);
    });
  }, []);

  const handleGenderChange = useCallback((value: GenderFilter) => {
    setGender(value);
    setCursor(undefined);
  }, []);

  const handleSortChange = useCallback((field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setCursor(undefined);
  }, [sortBy, sortOrder]);

  const handleRetry = useCallback(() => {
    setCursor(undefined);
    setAllUsers([]);
    void refetch();
  }, [refetch]);

  const handleLoadMore = useCallback(() => {
    if (data?.nextCursor !== undefined) {
      setCursor(data.nextCursor);
    }
  }, [data?.nextCursor]);

  const hasResults = allUsers.length > 0;
  const isFiltered = search !== "" || gender !== "all";
  const isStale = search !== deferredSearch || isPending || isPlaceholderData;
  const showLoadMore = data?.hasMore && !isLoading && !error;

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Address Book</h1>
        <p className="text-sm sm:text-base text-slate-600">Browse and search through user profiles</p>
      </div>

      <div className="mb-6 space-y-4">
        <SearchBar value={search} onChange={handleSearchChange} />
        
        <div className="flex flex-col space-y-4">
          <FilterControls gender={gender} onGenderChange={handleGenderChange} />
          <SortControls 
            sortBy={sortBy} 
            sortOrder={sortOrder} 
            onSortChange={handleSortChange} 
          />
        </div>
      </div>

      {!error && !hasResults && isLoading && cursor === undefined && <LoadingState />}
      
      {error && !isStale && <ErrorState message={error.message} onRetry={handleRetry} />}
      
      {!isLoading && !isFetching && !error && !hasResults && cursor === undefined && (
        <EmptyState isFiltered={isFiltered} onClearFilters={() => {
          setSearch("");
          setGender("all");
        }} />
      )}

      {!error && hasResults && (
        <>
          <div className="mb-4 text-sm text-slate-600 flex items-center gap-3">
            <span>Showing {allUsers.length} of {data?.total ?? 0} users</span>
            {(isFetching || isPending) && (
              <span className="flex items-center gap-2 text-blue-600">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="font-medium">Updating...</span>
              </span>
            )}
          </div>
          <div className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",
            (isFetching || isPending) && "opacity-50 pointer-events-none"
          )}>
            {allUsers.map((user, index) => (
              <UserCard key={`${user.id}-${index}`} user={user} />
            ))}
          </div>
          
          {showLoadMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleLoadMore}
                disabled={isFetching}
                className={cn(
                  'px-6 py-3',
                  borderRadius.md,
                  typography.body.base,
                  typography.weight.medium,
                  'transition-all',
                  'focus:outline-none focus:ring-2 focus:ring-offset-2',
                  colors.primary.ring,
                  isFetching
                    ? cn(colors.slate[300], colors.slate.text[500], 'cursor-not-allowed')
                    : cn(colors.primary[500], colors.primary.textOnPrimary, colors.primary.hover)
                )}
              >
                {isFetching ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
} 