import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUsers: publicProcedure
    .input(
      z.object({
        // Pagination
        skip: z.number().min(0).default(0),
        take: z.number().min(1).max(100).default(10),

        // Search
        search: z.string().optional(),

        // Filters
        gender: z.string().optional(),
        hairColor: z.string().optional(),
        eyeColor: z.string().optional(),
        bloodGroup: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { skip, take, search, gender, hairColor, eyeColor, bloodGroup } =
        input;

      // Build where clause
      const where: Record<string, unknown> = {};

      // Add search conditions
      if (search && search.trim() !== "") {
        where.OR = [
          { firstName: { contains: search } },
          { lastName: { contains: search } },
          { email: { contains: search } },
          { phone: { contains: search } },
          { companyName: { contains: search } },
        ];
      }

      // Add filter conditions
      if (gender) where.gender = gender;
      if (hairColor) where.hairColor = hairColor;
      if (eyeColor) where.eyeColor = eyeColor;
      if (bloodGroup) where.bloodGroup = bloodGroup;

      // Execute queries
      const [users, total] = await Promise.all([
        ctx.db.user.findMany({
          where,
          skip,
          take,
          orderBy: [{ firstName: "asc" }, { lastName: "asc" }],
        }),
        ctx.db.user.count({ where }),
      ]);

      // Prepare active filters
      const activeFilters: Array<{
        key: string;
        value: string;
        label: string;
      }> = [];
      if (gender)
        activeFilters.push({
          key: "gender",
          value: gender,
          label: `Gender: ${gender}`,
        });
      if (hairColor)
        activeFilters.push({
          key: "hairColor",
          value: hairColor,
          label: `Hair: ${hairColor}`,
        });
      if (eyeColor)
        activeFilters.push({
          key: "eyeColor",
          value: eyeColor,
          label: `Eyes: ${eyeColor}`,
        });
      if (bloodGroup)
        activeFilters.push({
          key: "bloodGroup",
          value: bloodGroup,
          label: `Blood: ${bloodGroup}`,
        });

      return {
        users,
        total,
        activeFilters,
        hasMore: skip + take < total,
      };
    }),

  getUserById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.id },
        include: {
          todos: {
            orderBy: { createdAt: "desc" },
          },
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    }),
});
