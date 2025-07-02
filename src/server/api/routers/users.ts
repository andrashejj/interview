import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import type { GenderFilter, SortField, SortOrder } from "~/types/users";
import { applyFiltersAndSort } from "~/utils/users";

// Zod schemas for DummyJSON user data
const hairSchema = z.object({
  color: z.string(),
  type: z.string(),
});

const coordinatesSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

const addressSchema = z.object({
  address: z.string(),
  city: z.string(),
  state: z.string(),
  stateCode: z.string(),
  postalCode: z.string(),
  coordinates: coordinatesSchema,
  country: z.string(),
});

const companyAddressSchema = z.object({
  address: z.string(),
  city: z.string(),
  state: z.string(),
  stateCode: z.string(),
  postalCode: z.string(),
  coordinates: coordinatesSchema,
  country: z.string(),
});

const companySchema = z.object({
  department: z.string(),
  name: z.string(),
  title: z.string(),
  address: companyAddressSchema,
});

const bankSchema = z.object({
  cardExpire: z.string(),
  cardNumber: z.string(),
  cardType: z.string(),
  currency: z.string(),
  iban: z.string(),
});

const cryptoSchema = z.object({
  coin: z.string(),
  wallet: z.string(),
  network: z.string(),
});

// Full user schema (for parsing API response)
const userSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  maidenName: z.string(),
  age: z.number(),
  gender: z.enum(["male", "female"]),
  email: z.string().email(),
  phone: z.string(),
  username: z.string(),
  password: z.string(),
  birthDate: z.string(),
  image: z.string().url(),
  bloodGroup: z.string(),
  height: z.number(),
  weight: z.number(),
  eyeColor: z.string(),
  hair: hairSchema,
  ip: z.string(),
  address: addressSchema,
  macAddress: z.string(),
  university: z.string(),
  bank: bankSchema,
  company: companySchema,
  ein: z.string(),
  ssn: z.string(),
  userAgent: z.string(),
  crypto: cryptoSchema,
  role: z.enum(["admin", "moderator", "user"]),
});

// Public user schema (omits sensitive fields)
const publicUserSchema = userSchema.omit({
  password: true,
  ssn: true,
  ein: true,
  bank: true,
  ip: true,
  macAddress: true,
  userAgent: true,
  crypto: true,
});

const usersResponseSchema = z.object({
  users: z.array(userSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type User = z.infer<typeof publicUserSchema>;
export type UsersResponse = {
  users: User[];
  total: number;
  nextCursor?: number;
  hasMore: boolean;
};

export const usersRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        gender: z.enum(["all", "male", "female"]).optional().default("all"),
        sortBy: z.enum(["firstName", "lastName", "age", "email"]).optional().default("firstName"),
        sortOrder: z.enum(["asc", "desc"]).optional().default("asc"),
        limit: z.number().min(1).max(100).optional().default(20),
        cursor: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        const skip = input.cursor ?? 0;
        
        const url = new URL("https://dummyjson.com/users");
        url.searchParams.append("limit", "100");
        url.searchParams.append("skip", "0");

        const response = await fetch(url.toString());
        
        if (!response.ok) {
          if (response.status === 429) {
            throw new TRPCError({
              code: "TOO_MANY_REQUESTS",
              message: "API rate limit exceeded. Please try again later.",
            });
          }
          if (response.status >= 500) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "The user service is temporarily unavailable.",
            });
          }
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Failed to fetch users: ${response.statusText}`,
          });
        }

        const data = await response.json() as unknown;
        const validatedData = usersResponseSchema.parse(data);

        const processedUsers = applyFiltersAndSort(
          validatedData.users,
          input.search ?? "",
          input.gender,
          input.sortBy,
          input.sortOrder
        );

        const paginatedUsers = processedUsers.slice(skip, skip + input.limit);
        const hasMore = skip + input.limit < processedUsers.length;
        const nextCursor = hasMore ? skip + input.limit : undefined;

        const sanitizedUsers = paginatedUsers.map(user => publicUserSchema.parse(user));

        return {
          users: sanitizedUsers,
          total: processedUsers.length,
          nextCursor,
          hasMore,
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        
        if (error instanceof TypeError && error.message.includes('fetch')) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Network error: Unable to connect to user service",
            cause: error,
          });
        }

        if (error instanceof z.ZodError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Invalid data received from user service",
            cause: error,
          });
        }

        console.error("Unexpected error fetching users:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred while fetching users",
          cause: error,
        });
      }
    }),
}); 