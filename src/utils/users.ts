import type { User } from "~/server/api/routers/users";
import type { GenderFilter, SortField, SortOrder } from "~/types/users";

export function filterUsers(users: User[], search: string, gender: GenderFilter): User[] {
  let filtered = [...users];

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
    );
  }

  if (gender !== "all") {
    filtered = filtered.filter((user) => user.gender === gender);
  }

  return filtered;
}

export function sortUsers(users: User[], sortBy: SortField, sortOrder: SortOrder): User[] {
  const sorted = [...users];

  sorted.sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortBy) {
      case "firstName":
        aValue = a.firstName.toLowerCase();
        bValue = b.firstName.toLowerCase();
        break;
      case "lastName":
        aValue = a.lastName.toLowerCase();
        bValue = b.lastName.toLowerCase();
        break;
      case "age":
        aValue = a.age;
        bValue = b.age;
        break;
      case "email":
        aValue = a.email.toLowerCase();
        bValue = b.email.toLowerCase();
        break;
      default:
        aValue = a.firstName.toLowerCase();
        bValue = b.firstName.toLowerCase();
    }

    const primaryComparison = sortOrder === "asc" 
      ? (aValue < bValue ? -1 : aValue > bValue ? 1 : 0)
      : (aValue > bValue ? -1 : aValue < bValue ? 1 : 0);

    if (primaryComparison === 0) {
      return a.id - b.id;
    }

    return primaryComparison;
  });

  return sorted;
}

export function applyFiltersAndSort(
  users: User[],
  search: string,
  gender: GenderFilter,
  sortBy: SortField,
  sortOrder: SortOrder
): User[] {
  const filtered = filterUsers(users, search, gender);
  return sortUsers(filtered, sortBy, sortOrder);
} 