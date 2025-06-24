import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { SearchParamsSchema, transformDatabaseUserToApiUser, type User } from "~/lib/schemas";
import { db } from "~/server/db";
import type { Prisma } from "@prisma/client";

export const usersRouter = createTRPCRouter({
  getUsers: publicProcedure
    .input(SearchParamsSchema)
    .query(async ({ input }) => {
      try {
        const where: Prisma.UserWhereInput = {};
        
        if (input.search) {
          const searchTerm = input.search;
          where.OR = [
            { firstName: { contains: searchTerm } },
            { lastName: { contains: searchTerm } },
            { email: { contains: searchTerm } },
          ];
        }

        if (input.gender) {
          where.gender = input.gender;
        }

        let orderBy: Prisma.UserOrderByWithRelationInput = { createdAt: 'desc' };
        if (input.sortBy && input.sortOrder) {
          const sortField = input.sortBy;
          const sortOrder = input.sortOrder;
          
          const sortFieldMap: Record<string, keyof Prisma.UserOrderByWithRelationInput> = {
            firstName: 'firstName',
            lastName: 'lastName',
            age: 'age',
            email: 'email',
            gender: 'gender',
          };
          
          const dbSortField = sortFieldMap[sortField];
          if (dbSortField) {
            orderBy = { [dbSortField]: sortOrder };
          }
        }

        const limit = Math.min(input.limit ?? 30, 100);
        const skip = input.skip ?? 0;

        const [users, totalCount] = await Promise.all([
          db.user.findMany({
            where,
            orderBy,
            take: limit,
            skip,
          }),
          db.user.count({ where }),
        ]);

        const transformedUsers: User[] = users.map(transformDatabaseUserToApiUser);

        const originalTotal = await db.user.count();

        return {
          users: transformedUsers,
          total: totalCount,
          originalTotal,
          skip,
          limit,
          hasMore: skip + limit < totalCount,
        };
      } catch (error) {
        console.error("Error fetching users from database:", error);
        throw new Error("Failed to fetch users from database");
      }
    }),
});
