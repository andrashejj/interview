// src/server/seedIfNeeded.ts
import { PrismaClient } from "@prisma/client";
import { usersSchema } from "../lib/userSchema";

export async function seedIfNeeded(prisma: PrismaClient) {
  const count = await prisma.user.count();
  if (count > 0) {
    console.log('User is present in database - do not seed')
    return;
  }

  const res = await fetch("https://dummyjson.com/users");
  if (!res.ok) throw new Error("Failed to fetch dummy users");
  const raw = (await res.json()) as unknown;
  const parsed = usersSchema.parse(raw);

  const users = parsed.users.map((u) => ({
    firstName: u.firstName,
    lastName: u.lastName,
    maidenName: u.maidenName ?? "",
    age: u.age,
    gender: u.gender,
    email: u.email,
    phone: u.phone,
    username: u.username,
    password: u.password,
    birthDate: new Date(u.birthDate), // convert to Date
    image: u.image,
  }));

  await prisma.user.createMany({ data: users });
  console.log(`Seeded ${users.length} users`);
}
