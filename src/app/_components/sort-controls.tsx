"use client";

import type { SortField, SortOrder } from "~/types/users";
import { spacing, cn, typography, transition, colors, buttonVariants } from "~/styles/design-tokens";

interface SortControlsProps {
  sortBy: SortField;
  sortOrder: SortOrder;
  onSortChange: (field: SortField) => void;
}

export function SortControls({ sortBy, sortOrder, onSortChange }: SortControlsProps) {
  const sortFields: Array<{ value: SortField; label: string }> = [
    { value: "firstName", label: "First Name" },
    { value: "lastName", label: "Last Name" },
    { value: "age", label: "Age" },
    { value: "email", label: "Email" },
  ];

  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center', spacing.gap.sm)} role="group" aria-labelledby="sort-controls-label">
      <span id="sort-controls-label" className={cn(typography.body.sm, typography.weight.medium, colors.slate.text[700], 'whitespace-nowrap')}>
        Sort by:
      </span>
      <div className={cn('flex flex-wrap', spacing.gap.xs, 'sm:gap-2')}>
        {sortFields.map((field) => (
          <button
            key={field.value}
            onClick={() => onSortChange(field.value)}
            className={buttonVariants.sort(sortBy === field.value)}
            aria-pressed={sortBy === field.value}
            aria-label={`Sort by ${field.label} ${
              sortBy === field.value ? (sortOrder === "asc" ? "ascending" : "descending") : ""
            }`}
          >
            <span>{field.label}</span>
            {sortBy === field.value && (
              <svg
                className={cn('w-3 h-3', transition.transform, 
                  sortOrder === "desc" ? "rotate-180" : ""
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
} 