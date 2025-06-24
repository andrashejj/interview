import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'
import { type Prisma } from '@prisma/client'

export const userRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({
      search: z.string().optional(),
      gender: z.enum(['male', 'female']).optional(),
      sortBy: z.enum(['firstName', 'lastName', 'age']).optional(),
      order: z.enum(['asc', 'desc']).optional(),
    }).optional())
    .query(async ({ ctx, input }) => {
      const where: Prisma.UserWhereInput = {}

      if (input?.search) {
        where.OR = [
          { firstName: { contains: input.search } },
          { lastName: { contains: input.search } },
          { email: { contains: input.search } },
        ]
      }

      if (input?.gender) {
        where.gender = input.gender
      }

      const orderBy: Prisma.UserOrderByWithRelationInput[] = []
      if (input?.sortBy) {
        orderBy.push({ [input.sortBy]: input.order ?? 'asc' })
      }

      return ctx.db.user.findMany({
        where,
        orderBy,
      })
    }),
})
