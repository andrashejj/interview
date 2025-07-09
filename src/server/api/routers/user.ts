import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(9),
        search: z.string().optional(),
        gender: z.enum(["male", "female"]).optional(),
        sortBy: z.enum(["name", "age"]).optional(),
        sortOrder: z.enum(["asc", "desc"]).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, limit, search, gender, sortBy, sortOrder } = input;
      const where: any = {};
      if (search) {
        where.OR = [
          { firstName: { contains: search } },
          { lastName: { contains: search} },
          { email: { contains: search } },
        ];
      }
      if (gender) {
        where.gender = gender;
      }
      let orderBy: any = undefined;
      if (sortBy === "name") {
        orderBy = [
          { firstName: sortOrder ?? "asc" },
          { lastName: sortOrder ?? "asc" },
        ];
      } else if (sortBy === "age") {
        orderBy = { age: sortOrder ?? "asc" };
      }
      const [users, total] = await Promise.all([
        ctx.db.user.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
        ctx.db.user.count({ where }),
      ]);
      return { users, total };
    }),
});