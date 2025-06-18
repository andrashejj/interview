import { PrismaClient } from '@prisma/client';
import { UsersResponseSchema, transformApiUserToDatabase } from '../src/lib/schemas';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  try {
    // Check if users already exist
    const existingUsers = await prisma.user.count();
    if (existingUsers > 0) {
      console.log(`✅ Database already has ${existingUsers} users. Skipping seed.`);
      return;
    }

    // Fetch users from DummyJSON API
    console.log('📥 Fetching users from DummyJSON API...');
    const response = await fetch('https://dummyjson.com/users?limit=100');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: unknown = await response.json();
    const validatedData = UsersResponseSchema.parse(data);

    console.log(`📊 Found ${validatedData.users.length} users to seed`);

    // Transform and insert users in batches for performance
    const batchSize = 10;
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < validatedData.users.length; i += batchSize) {
      const batch = validatedData.users.slice(i, i + batchSize);
      
      try {
        const transformedBatch = batch.map(user => {
          const { id, ...userWithoutId } = user;
          return transformApiUserToDatabase(userWithoutId);
        });

        await prisma.user.createMany({
          data: transformedBatch,
        });

        successCount += batch.length;
        console.log(`✅ Seeded batch ${Math.floor(i / batchSize) + 1} (${batch.length} users)`);
      } catch (error) {
        errorCount += batch.length;
        console.error(`❌ Error seeding batch ${Math.floor(i / batchSize) + 1}:`, error);
      }
    }

    console.log(`🎉 Seed completed!`);
    console.log(`✅ Successfully seeded: ${successCount} users`);
    console.log(`❌ Failed to seed: ${errorCount} users`);

    // Verify the seed
    const totalUsers = await prisma.user.count();
    console.log(`📊 Total users in database: ${totalUsers}`);

  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error('❌ Unexpected error during seeding:', e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  }); 