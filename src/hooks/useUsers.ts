import { api } from "@/utils/api";

interface UseUsersParams {
  page?: number;
  pageSize?: number;
  search?: string;
  gender?: string;
  hairColor?: string;
  eyeColor?: string;
  bloodGroup?: string;
}

export function useUsers({
  page = 1,
  pageSize = 10,
  search,
  gender,
  hairColor,
  eyeColor,
  bloodGroup,
}: UseUsersParams = {}) {
  const skip = (page - 1) * pageSize;

  const query = api.user.getUsers.useQuery({
    skip,
    take: pageSize,
    search: search || undefined,
    gender: gender || undefined,
    hairColor: hairColor || undefined,
    eyeColor: eyeColor || undefined,
    bloodGroup: bloodGroup || undefined,
  });

  const totalPages = query.data?.total
    ? Math.ceil(query.data.total / pageSize)
    : 0;

  return {
    ...query,
    users: query.data?.users ?? [],
    total: query.data?.total ?? 0,
    activeFilters: query.data?.activeFilters ?? [],
    hasMore: query.data?.hasMore ?? false,
    totalPages,
    currentPage: page,
  };
}
