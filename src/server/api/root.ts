import { postRouter } from "@/server/api/routers/post";
import { userRouter } from "@/server/api/routers/user";
import { todoRouter } from "@/server/api/routers/todo";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";


export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
  todo: todoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
