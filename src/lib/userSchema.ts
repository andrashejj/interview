import { z } from 'zod'

export const userSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  maidenName: z.string().optional(),
  age: z.number(),
  gender: z.enum(['male', 'female']),
  email: z.string().email(),
  phone: z.string(),
  username: z.string(),
  image: z.string().url(),
  password: z.string(),
  birthDate: z.string(),
//   address: z.object({
//     address: z.string(),
//     city: z.string(),
//     state: z.string(),
//   }),
})

export const usersSchema = z.object({
  users: z.array(userSchema),
})