import {z} from 'zod';
export const UserSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    gender: z.string(),
    age: z.number(),
});

export const UsersSchema = z.object({
    users: z.array(UserSchema)
});

export type User = z.infer<typeof UserSchema>;
