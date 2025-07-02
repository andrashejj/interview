"use client";

import type { GenderFilter } from "~/types/users";
import { colors, spacing, cn, typography, buttonVariants } from "~/styles/design-tokens";

interface FilterControlsProps {
  gender: GenderFilter;
  onGenderChange: (gender: GenderFilter) => void;
}

export function FilterControls({ gender, onGenderChange }: FilterControlsProps) {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center', spacing.gap.sm)} role="group" aria-labelledby="gender-filter-label">
      <span id="gender-filter-label" className={cn(typography.body.sm, typography.weight.medium, colors.slate.text[700], 'whitespace-nowrap')}>
        Filter by gender:
      </span>
      <div className={cn('flex flex-wrap', spacing.gap.xs, 'sm:gap-2')}>
        <button
          onClick={() => onGenderChange("all")}
          className={buttonVariants.filter(gender === "all")}
          aria-pressed={gender === "all"}
          aria-label="Show all genders"
        >
          All
        </button>
        <button
          onClick={() => onGenderChange("male")}
          className={buttonVariants.filter(gender === "male")}
          aria-pressed={gender === "male"}
          aria-label="Show only male users"
        >
          Male
        </button>
        <button
          onClick={() => onGenderChange("female")}
          className={buttonVariants.filter(gender === "female")}
          aria-pressed={gender === "female"}
          aria-label="Show only female users"
        >
          Female
        </button>
      </div>
    </div>
  );
} 