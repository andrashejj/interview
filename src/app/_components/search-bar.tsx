"use client";

import { colors, borderRadius, focus, cn, typography } from "~/styles/design-tokens";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <label htmlFor="user-search" className="sr-only">
        Search users by name or email
      </label>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-slate-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <input
        id="user-search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'block w-full pl-10 pr-3 py-2',
          'border',
          colors.slate.border[300],
          borderRadius.md,
          'leading-5',
          colors.white.bg,
          colors.slate.text[900],
          colors.slate.placeholder,
          focus.inputRing,
          typography.body.sm
        )}
        placeholder="Search by name or email..."
        aria-label="Search users by name or email"
        aria-describedby="search-description"
      />
      <span id="search-description" className="sr-only">
        Type to search through user profiles. Results update automatically.
      </span>
    </div>
  );
} 