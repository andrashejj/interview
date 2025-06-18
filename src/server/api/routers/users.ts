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
        // Build the database query with filters
        const where: Prisma.UserWhereInput = {};
        
        // Apply search filter (name or email) - SQLite doesn't support case-insensitive contains
        if (input.search) {
          const searchTerm = input.search;
          where.OR = [
            { firstName: { contains: searchTerm } },
            { lastName: { contains: searchTerm } },
            { email: { contains: searchTerm } },
          ];
        }

        // Apply gender filter
        if (input.gender) {
          where.gender = input.gender;
        }

        // Build the orderBy clause for sorting
        let orderBy: Prisma.UserOrderByWithRelationInput = { createdAt: 'desc' };
        if (input.sortBy && input.sortOrder) {
          const sortField = input.sortBy;
          const sortOrder = input.sortOrder;
          
          // Map sort fields to database fields
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

        // Set pagination parameters
        const limit = Math.min(input.limit ?? 30, 100); // Max 100 items
        const skip = input.skip ?? 0;

        // Execute the queries
        const [users, totalCount] = await Promise.all([
          db.user.findMany({
            where,
            orderBy,
            take: limit,
            skip,
          }),
          db.user.count({ where }),
        ]);

        // Transform database users to API format
        const transformedUsers: User[] = users.map(transformDatabaseUserToApiUser);

        // Get original total count without filters for compatibility
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

  getUser: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      try {
        const user = await db.user.findUnique({
          where: { id: input.id },
        });

        if (!user) {
          throw new Error(`User with ID ${input.id} not found`);
        }

        // Transform database user to API format
        return transformDatabaseUserToApiUser(user);
      } catch (error) {
        console.error("Error fetching user from database:", error);
        
        if (error instanceof Error && error.message.includes('not found')) {
          throw error; // Re-throw user not found errors
        }
        
        throw new Error("Failed to fetch user from database");
      }
    }),

  // Additional optimized database operations
  createUser: publicProcedure
    .input(z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      email: z.string().email(),
      phone: z.string().min(1),
      username: z.string().min(1),
      gender: z.enum(['male', 'female']),
      age: z.number().min(1).max(120),
    }))
    .mutation(async ({ input }) => {
      try {
        // Check if user with email or username already exists
        const existingUser = await db.user.findFirst({
          where: {
            OR: [
              { email: input.email },
              { username: input.username },
            ],
          },
        });

        if (existingUser) {
          throw new Error("User with this email or username already exists");
        }

        // Create a new user with minimal required fields
        const newUser = await db.user.create({
          data: {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            phone: input.phone,
            username: input.username,
            gender: input.gender,
            age: input.age,
            // Set default values for required fields
            maidenName: null,
            password: "defaultpassword", // In production, this should be properly hashed
            birthDate: new Date().toISOString(),
            image: `https://ui-avatars.com/api/?name=${input.firstName}+${input.lastName}&background=random`,
            bloodGroup: "O+",
            height: 170,
            weight: 70,
            eyeColor: "Brown",
            hairColor: "Brown",
            hairType: "Straight",
            ip: "127.0.0.1",
            addressLine: "N/A",
            city: "N/A",
            state: "N/A",
            stateCode: "N/A",
            postalCode: "00000",
            country: "N/A",
            latitude: 0,
            longitude: 0,
            macAddress: "00:00:00:00:00:00",
            university: "N/A",
            bankCardExpire: "01/30",
            bankCardNumber: "0000000000000000",
            bankCardType: "Visa",
            bankCurrency: "USD",
            bankIban: "N/A",
            companyDepartment: "N/A",
            companyName: "N/A",
            companyTitle: "N/A",
            companyAddress: "N/A",
            companyCity: "N/A",
            companyState: "N/A",
            companyPostal: "00000",
            companyCountry: "N/A",
            ein: "00-000",
            ssn: "000-00-0000",
            userAgent: "N/A",
            cryptoCoin: "Bitcoin",
            cryptoWallet: "N/A",
            cryptoNetwork: "N/A",
            role: "user",
          },
        });

        return transformDatabaseUserToApiUser(newUser);
      } catch (error) {
        console.error("Error creating user:", error);
        
        if (error instanceof Error && error.message.includes('already exists')) {
          throw error; // Re-throw duplicate user errors
        }
        
        throw new Error("Failed to create user");
      }
    }),

  updateUser: publicProcedure
    .input(z.object({
      id: z.number(),
      firstName: z.string().min(1).optional(),
      lastName: z.string().min(1).optional(),
      email: z.string().email().optional(),
      phone: z.string().min(1).optional(),
      age: z.number().min(1).max(120).optional(),
    }))
    .mutation(async ({ input }) => {
      try {
        const { id, ...updateData } = input;

        // Check if user exists
        const existingUser = await db.user.findUnique({
          where: { id },
        });

        if (!existingUser) {
          throw new Error(`User with ID ${id} not found`);
        }

        // Check for email/username conflicts if updating them
        if (updateData.email) {
          const emailConflict = await db.user.findFirst({
            where: {
              email: updateData.email,
              id: { not: id },
            },
          });

          if (emailConflict) {
            throw new Error("Email already in use by another user");
          }
        }

        // Update the user
        const updatedUser = await db.user.update({
          where: { id },
          data: updateData,
        });

        return transformDatabaseUserToApiUser(updatedUser);
      } catch (error) {
        console.error("Error updating user:", error);
        
        if (error instanceof Error && (
          error.message.includes('not found') || 
          error.message.includes('already in use')
        )) {
          throw error; // Re-throw specific errors
        }
        
        throw new Error("Failed to update user");
      }
    }),

  deleteUser: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      try {
        // Check if user exists
        const existingUser = await db.user.findUnique({
          where: { id: input.id },
        });

        if (!existingUser) {
          throw new Error(`User with ID ${input.id} not found`);
        }

        // Delete the user
        await db.user.delete({
          where: { id: input.id },
        });

        return { success: true, message: "User deleted successfully" };
      } catch (error) {
        console.error("Error deleting user:", error);
        
        if (error instanceof Error && error.message.includes('not found')) {
          throw error; // Re-throw user not found errors
        }
        
        throw new Error("Failed to delete user");
      }
    }),

  // Statistics endpoint for dashboard
  getStats: publicProcedure
    .query(async () => {
      try {
        const [totalUsers, maleCount, femaleCount, recentUsers] = await Promise.all([
          db.user.count(),
          db.user.count({ where: { gender: 'male' } }),
          db.user.count({ where: { gender: 'female' } }),
          db.user.count({
            where: {
              createdAt: {
                gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
              },
            },
          }),
        ]);

        return {
          totalUsers,
          maleCount,
          femaleCount,
          recentUsers,
          genderDistribution: {
            male: Math.round((maleCount / totalUsers) * 100),
            female: Math.round((femaleCount / totalUsers) * 100),
          },
        };
      } catch (error) {
        console.error("Error fetching statistics:", error);
        throw new Error("Failed to fetch statistics");
      }
    }),
});
