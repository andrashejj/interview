import { api } from "@/utils/api";

export function useUser(userId: number | undefined) {
  const query = api.user.getUserById.useQuery(
    { id: userId! },
    {
      enabled: !!userId,
    },
  );

  return {
    ...query,
    user: query.data,
  };
}
