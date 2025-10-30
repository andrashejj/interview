import React, { useState } from "react";
import { Button } from "./ui/Button";
import { Select } from "./ui/Select";
import { Badge } from "./ui/Badge";

interface FilterPanelProps {
  gender: string;
  hairColor: string;
  eyeColor: string;
  bloodGroup: string;
  onGenderChange: (value: string) => void;
  onHairColorChange: (value: string) => void;
  onEyeColorChange: (value: string) => void;
  onBloodGroupChange: (value: string) => void;
  onClearAll: () => void;
}

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const hairColorOptions = [
  { value: "Black", label: "Black" },
  { value: "Brown", label: "Brown" },
  { value: "Blond", label: "Blond" },
  { value: "Red", label: "Red" },
  { value: "Gray", label: "Gray" },
  { value: "White", label: "White" },
  { value: "Auburn", label: "Auburn" },
];

const eyeColorOptions = [
  { value: "Brown", label: "Brown" },
  { value: "Blue", label: "Blue" },
  { value: "Green", label: "Green" },
  { value: "Gray", label: "Gray" },
  { value: "Hazel", label: "Hazel" },
  { value: "Amber", label: "Amber" },
];

const bloodGroupOptions = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
];

export function FilterPanel({
  gender,
  hairColor,
  eyeColor,
  bloodGroup,
  onGenderChange,
  onHairColorChange,
  onEyeColorChange,
  onBloodGroupChange,
  onClearAll,
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activeFilters = [
    gender && {
      key: "gender",
      value: gender,
      label: `Gender: ${gender}`,
      onRemove: () => onGenderChange(""),
    },
    hairColor && {
      key: "hairColor",
      value: hairColor,
      label: `Hair: ${hairColor}`,
      onRemove: () => onHairColorChange(""),
    },
    eyeColor && {
      key: "eyeColor",
      value: eyeColor,
      label: `Eyes: ${eyeColor}`,
      onRemove: () => onEyeColorChange(""),
    },
    bloodGroup && {
      key: "bloodGroup",
      value: bloodGroup,
      label: `Blood: ${bloodGroup}`,
      onRemove: () => onBloodGroupChange(""),
    },
  ].filter(Boolean) as Array<{
    key: string;
    value: string;
    label: string;
    onRemove: () => void;
  }>;

  const hasFilters = activeFilters.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Button
            variant={hasFilters ? "primary" : "secondary"}
            
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="mr-2 -ml-1 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters {hasFilters && `(${activeFilters.length})`}
          </Button>
        </div>

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={onClearAll}>
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters Badges */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge
              key={filter.key}
              variant="primary"
              onRemove={filter.onRemove}
            >
              {filter.label}
            </Badge>
          ))}
        </div>
      )}

      {/* Filter Dropdown Panel */}
      {isOpen && (
        <div className="animate-slideDown rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Gender
              </label>
              <Select
                value={gender}
                onChange={(e) => onGenderChange(e.target.value)}
                options={genderOptions}
                placeholder="All"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Hair Color
              </label>
              <Select
                value={hairColor}
                onChange={(e) => onHairColorChange(e.target.value)}
                options={hairColorOptions}
                placeholder="All"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Eye Color
              </label>
              <Select
                value={eyeColor}
                onChange={(e) => onEyeColorChange(e.target.value)}
                options={eyeColorOptions}
                placeholder="All"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Blood Group
              </label>
              <Select
                value={bloodGroup}
                onChange={(e) => onBloodGroupChange(e.target.value)}
                options={bloodGroupOptions}
                placeholder="All"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
