import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { 
  UsersResponseSchema, 
  SearchParamsSchema,
  type User,
  type SearchParams 
} from "~/lib/schemas";

export const usersRouter = createTRPCRouter({
  getUsers: publicProcedure
    .input(SearchParamsSchema)
    .query(async ({ input }) => {
      try {
        // Build the API URL with query parameters
        const params = new URLSearchParams();
        
        // Set default pagination if not provided
        const limit = input.limit ?? 30;
        const skip = input.skip ?? 0;
        
        params.set('limit', limit.toString());
        params.set('skip', skip.toString());
        
        // Fetch data from DummyJSON API
        const response = await fetch(`https://dummyjson.com/users?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json() as unknown;
        
        // Validate the response using Zod
        const validatedData = UsersResponseSchema.parse(data);
        
        // Apply client-side filtering and sorting since DummyJSON has limited query support
        let filteredUsers = validatedData.users;
        
        // Apply search filter (name or email)
        if (input.search) {
          const searchTerm = input.search.toLowerCase();
          filteredUsers = filteredUsers.filter(user => 
            user.firstName.toLowerCase().includes(searchTerm) ||
            user.lastName.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
          );
        }
        
        // Apply gender filter
        if (input.gender) {
          filteredUsers = filteredUsers.filter(user => user.gender === input.gender);
        }
        
        // Apply sorting
        if (input.sortBy) {
          const sortField = input.sortBy;
          const sortOrder = input.sortOrder ?? 'asc';
          
          filteredUsers.sort((a, b) => {
            let aValue = a[sortField];
            let bValue = b[sortField];
            
            // Handle string comparisons
            if (typeof aValue === 'string' && typeof bValue === 'string') {
              aValue = aValue.toLowerCase();
              bValue = bValue.toLowerCase();
            }
            
            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
          });
        }
        
        // Return processed data
        return {
          users: filteredUsers,
          total: filteredUsers.length,
          originalTotal: validatedData.total,
          skip,
          limit,
          hasMore: (skip + limit) < validatedData.total
        };
        
      } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
      }
    }),
  
  getUser: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      try {
        const response = await fetch(`https://dummyjson.com/users/${input.id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json() as unknown;
        
        // Validate single user response
        const UserSchema = UsersResponseSchema.shape.users.element;
        const validatedUser = UserSchema.parse(data);
        
        return validatedUser;
        
      } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Failed to fetch user');
      }
    }),
}); 