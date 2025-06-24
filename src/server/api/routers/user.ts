import { z } from 'zod';
import { publicProcedure, createTRPCRouter } from '../trpc';
import { db } from '~/server/db';

export const userRouter = createTRPCRouter({
  getAllUsers: publicProcedure.query(async () => {
    const users = await db.user.findMany();
    return users;
  }),
});
