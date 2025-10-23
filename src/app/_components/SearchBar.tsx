"use client";

import { useState, useEffect } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  return (
    <div className="relative mb-4">
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 py-3 pl-12 pr-4 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Search contacts"
      />
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
        🔍
      </span>
      {localValue && (
        <button
          onClick={() => setLocalValue("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
