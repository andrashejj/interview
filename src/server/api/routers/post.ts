import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  // Note: Post model doesn't exist in current schema
  // Keeping this router for potential future use
  getLatest: publicProcedure.query(async ({ ctx }) => {
    // Return a mock response since post model doesn't exist
    return {
      id: 1,
      name: "Sample Post",
      createdAt: new Date(),
    };
  }),
});
