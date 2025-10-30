import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const todoRouter = createTRPCRouter({
  getTodosByUserId: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ ctx, input }) => {
      const todos = await ctx.db.todo.findMany({
        where: { userId: input.userId },
        orderBy: [{ completed: "asc" }, { createdAt: "desc" }],
      });

      return todos;
    }),

  createTodo: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        todo: z.string().min(1, "Todo text is required"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Get the next available ID
      const lastTodo = await ctx.db.todo.findFirst({
        orderBy: { id: "desc" },
      });

      const newId = lastTodo ? lastTodo.id + 1 : 1;

      const newTodo = await ctx.db.todo.create({
        data: {
          todo: input.todo,
          id: newId,
          userId: input.userId,
          completed: false,
        },
      });

      return newTodo;
    }),

  updateTodo: publicProcedure
    .input(
      z.object({
        id: z.number(),
        todo: z.string().min(1, "Todo text is required").optional(),
        completed: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      const updatedTodo = await ctx.db.todo.update({
        where: { id },
        data,
      });

      return updatedTodo;
    }),

  deleteTodo: publicProcedure
    .mutation(async ({ ctx, input }) => {
      await ctx.db.todo.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),

  toggleTodo: publicProcedure
    .mutation(async ({ ctx, input }) => {
      // Get current todo
      const todo = await ctx.db.todo.findUnique({
        where: { id: input.id },
      });

      if (!todo) {
        throw new Error("Todo not found");
      }

      // Toggle completion status
      const updatedTodo = await ctx.db.todo.update({
        where: { id: input.id },
        data: { completed: !todo.completed },
      });

      return updatedTodo;
    }),
});
