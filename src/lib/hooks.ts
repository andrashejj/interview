import { useState, useMemo, useCallback } from "react";
import { api } from "~/trpc/react";
import type { SearchParams } from "./schemas";

// Custom hook for search and filter state management
export function useAddressBookFilters() {
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Debounced search to reduce API calls
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search term to avoid too many API calls
  const debouncedSetSearch = useCallback((term: string) => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(term);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Update search term and debounced version
  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
    debouncedSetSearch(term);
  }, [debouncedSetSearch]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setGenderFilter("");
    setSortBy("");
    setSortOrder("asc");
  }, []);

  // Build query parameters
  const queryParams: SearchParams = useMemo(() => ({
    search: debouncedSearchTerm ?? undefined,
    gender: (genderFilter as "male" | "female") ?? undefined,
    sortBy: (sortBy as "firstName" | "lastName" | "age" | "email" | "gender") ?? undefined,
    sortOrder: (sortOrder as "asc" | "desc"),
    limit: 30,
  }), [debouncedSearchTerm, genderFilter, sortBy, sortOrder]);

  return {
    // State
    searchTerm,
    genderFilter,
    sortBy,
    sortOrder,
    
    // Actions
    setSearchTerm: handleSearchChange,
    setGenderFilter,
    setSortBy,
    setSortOrder,
    resetFilters,
    
    // Computed
    queryParams,
    hasActiveFilters: !!(debouncedSearchTerm || genderFilter),
  };
}

// Custom hook for users data fetching with error handling
export function useUsers(params: SearchParams) {
  const query = api.users.getUsers.useQuery(params, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const hasResults = query.data && query.data.users.length > 0;
  const isEmpty = query.data && query.data.users.length === 0;
  const isFiltered = !!(params.search || params.gender);

  return {
    ...query,
    hasResults,
    isEmpty,
    isFiltered,
  };
} 