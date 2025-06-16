"use client";

import React from "react";
import type { User } from "~/lib/schemas";
import { useAddressBookFilters, useUsers } from "~/lib/hooks";

// Search and Filter Controls Component
const SearchAndFilters = ({
  searchTerm,
  setSearchTerm,
  genderFilter,
  setGenderFilter,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  resetFilters,
  hasActiveFilters,
}: {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  genderFilter: string;
  setGenderFilter: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}) => {
  return (
    <div className="mb-8 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Search & Filter</h2>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-slate-700">
            Search by name or email
          </label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search..."
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Gender Filter */}
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-slate-700">
            Filter by gender
          </label>
          <select
            id="gender"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-slate-700">
            Sort by
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Default</option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="age">Age</option>
            <option value="email">Email</option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label htmlFor="sortOrder" className="block text-sm font-medium text-slate-700">
            Sort order
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// User Card Component
const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:border-slate-300 hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              className="h-16 w-16 rounded-full border-2 border-slate-200 object-cover"
            />
          </div>
          
          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 truncate">
                {user.firstName} {user.lastName}
              </h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                user.gender === 'male' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-pink-100 text-pink-800'
              }`}>
                {user.gender}
              </span>
            </div>
            
            <p className="text-sm text-slate-600 mt-1">@{user.username}</p>
            
            <div className="mt-3 space-y-2">
              <div className="flex items-center text-sm text-slate-600">
                <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="truncate">{user.email}</span>
              </div>
              
              <div className="flex items-center text-sm text-slate-600">
                <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{user.phone}</span>
              </div>
              
              <div className="flex items-center text-sm text-slate-600">
                <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate">{user.address.city}, {user.address.state}</span>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-slate-500">Age: {user.age}</span>
              <span className="text-sm text-slate-500">{user.company.title}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading Component
const LoadingState = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="animate-pulse rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-start space-x-4">
            <div className="h-16 w-16 rounded-full bg-slate-200"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="h-3 bg-slate-200 rounded w-1/2"></div>
              <div className="h-3 bg-slate-200 rounded w-full"></div>
              <div className="h-3 bg-slate-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Error Component
const ErrorState = ({ error, onRetry }: { error: string; onRetry: () => void }) => {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-medium text-red-900">Something went wrong</h3>
      <p className="mt-2 text-sm text-red-700">{error}</p>
      <button
        onClick={onRetry}
        className="mt-4 inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Try again
      </button>
    </div>
  );
};

// Empty State Component
const EmptyState = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
        <svg className="h-6 w-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-medium text-slate-900">No users found</h3>
      <p className="mt-2 text-sm text-slate-500">
        Try adjusting your search or filter criteria to find what you&apos;re looking for.
      </p>
    </div>
  );
};

// Main Address Book Component
export default function AddressBook() {
  const {
    searchTerm,
    genderFilter,
    sortBy,
    sortOrder,
    setSearchTerm,
    setGenderFilter,
    setSortBy,
    setSortOrder,
    resetFilters,
    queryParams,
    hasActiveFilters,
  } = useAddressBookFilters();

  const { data, isLoading, error, refetch, hasResults, isEmpty, isFiltered } = useUsers(queryParams);

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Address Book</h1>
        <p className="mt-2 text-slate-600">Search and browse through our user directory</p>
      </div>

      <SearchAndFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        resetFilters={resetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Results Summary */}
      {!isLoading && !error && data && (
        <div className="mb-6 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Showing {data.users.length} of {data.originalTotal} users
            {(searchTerm || genderFilter) && " (filtered)"}
          </div>
          {hasActiveFilters && (
            <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              Filters active
            </div>
          )}
        </div>
      )}

      {/* Content */}
      {isLoading && <LoadingState />}
      
      {error && (
        <ErrorState 
          error={error.message} 
          onRetry={() => refetch()} 
        />
      )}
      
      {!isLoading && !error && data && data.users.length === 0 && <EmptyState />}
      
      {!isLoading && !error && data && data.users.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
} 