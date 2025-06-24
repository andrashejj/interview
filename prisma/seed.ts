// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const res = await fetch("https://dummyjson.com/users?limit=30");
  const data = await res.json();
  console.log('data.users',data.users[0]);
  for (const user of data.users) {
    const existing = await prisma.user.findUnique({
      where: { email: user.email },
    });
  
    if (!existing) {
      await prisma.user.create({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          gender: user.gender,
          age: user.age,
          phone: user.phone,
          company: user.company,
          location: user.address,
        },
      });
    }
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
