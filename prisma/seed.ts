import { PrismaClient } from "@prisma/client";
import { usersSchema } from "../src/lib/userSchema";

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.user.count();
  if (count > 0) {
    console.log("DB already has dummy users so skipping seed.");
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

try {
  await main();
} catch (err) {
  console.error(err);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}