export type GenderFilter = "all" | "male" | "female";
export type SortField = "firstName" | "lastName" | "age" | "email";
export type SortOrder = "asc" | "desc";

export interface UserFilters {
  search: string;
  gender: GenderFilter;
  sortBy: SortField;
  sortOrder: SortOrder;
} 