import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { fetchDummyUsers } from '@/lib/fetchUsers';
import { UsersSchema } from '@/lib/zodSchemas';

/**
 * Handles GET requests to fetch users.
 * Seeds the database from the dummy API if needed (every hour).
 */
export async function GET() {
  try {
    const ONE_HOUR = 60 * 60 * 1000;
    const oneHourAgo = new Date(Date.now() - ONE_HOUR);

    const seeded = await prisma.seedState.findFirst();
    const shouldReseed = !seeded || seeded.seededAt < oneHourAgo;

    if (shouldReseed) {
      console.info('[Seed] Seeding user data from dummyjson.com/users...');
      
      const apiUsers = await fetchDummyUsers();
      const parsed = UsersSchema.safeParse(apiUsers);

      if (!parsed.success) {
        console.error('[Seed] Invalid API structure', parsed.error.format());
        return NextResponse.json(
          { error: 'Invalid API structure', issues: parsed.error.format() },
          { status: 400 }
        );
      }

      await prisma.user.deleteMany(); // Clean existing users before reseeding

      await prisma.user.createMany({
        data: parsed.data.map((u) => ({
          firstName: u.firstName,
          lastName: u.lastName,
          maidenName: u.maidenName,
          email: u.email,
          gender: u.gender,
          age: u.age,
          phone: u.phone,
          username: u.username,
          password: u.password,
          birthDate: u.birthDate,
          image: u.image,
          bloodGroup: u.bloodGroup,
          height: u.height,
          weight: u.weight,
          eyeColor: u.eyeColor,
          address: u.address,
        })),
      });

      await prisma.seedState.upsert({
        where: { id: 1 },
        update: { seededAt: new Date() },
        create: { seededAt: new Date() },
      });

      console.info('[Seed] Database seeded successfully.');
    }

    const users = await prisma.user.findMany();
    console.info(`[GET /api/users] Returning ${users.length} users.`);

    return NextResponse.json(users);
  } catch (error) {
    console.error('[GET /api/users] Unexpected error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
