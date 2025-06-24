import { PrismaClient } from "@prisma/client";
import { usersSchema } from "~/schema/user";

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.user.count();
  if (count > 0) {
    console.log("DB already has users — skipping seed.");
    return;
  }

  const res = await fetch("https://dummyjson.com/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  const raw = (await res.json()) as unknown;
  const parsed = usersSchema.parse(raw);

  const users = parsed.users.map((u) => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    maidenName: u.maidenName,
    age: u.age,
    gender: u.gender,
    email: u.email,
    phone: u.phone,
    username: u.username,
    image: u.image,
    address: u.address.address,
    city: u.address.city,
    state: u.address.state,
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
