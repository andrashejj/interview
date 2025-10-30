import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface DummyJsonUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  ip: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      country: string;
    };
  };
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };
  role: string;
}

interface DummyJsonTodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

interface DummyJsonUsersResponse {
  users: DummyJsonUser[];
  total: number;
  skip: number;
  limit: number;
}

interface DummyJsonTodosResponse {
  todos: DummyJsonTodo[];
  total: number;
  skip: number;
  limit: number;
}

async function fetchUsers(): Promise<DummyJsonUser[]> {
  console.log("Fetching users from dummyjson.com...");
  const response = await fetch("https://dummyjson.com/users?limit=1000");
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`);
  }
  const data = (await response.json()) as DummyJsonUsersResponse;
  console.log(`✓ Fetched ${data.users.length} users`);
  return data.users;
}

async function fetchTodos(): Promise<DummyJsonTodo[]> {
  console.log("Fetching todos from dummyjson.com...");
  const response = await fetch("https://dummyjson.com/todos?limit=1000");
  if (!response.ok) {
    throw new Error(`Failed to fetch todos: ${response.statusText}`);
  }
  const data = (await response.json()) as DummyJsonTodosResponse;
  console.log(`✓ Fetched ${data.todos.length} todos`);
  return data.todos;
}

async function seedUsers(users: DummyJsonUser[]) {
  console.log("\nSeeding users...");
  let count = 0;

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        maidenName: user.maidenName,
        age: user.age,
        gender: user.gender,
        email: user.email,
        phone: user.phone,
        username: user.username,
        password: user.password,
        birthDate: user.birthDate,
        image: user.image,
        bloodGroup: user.bloodGroup,
        height: user.height,
        weight: user.weight,
        eyeColor: user.eyeColor,
        hairColor: user.hair?.color,
        hairType: user.hair?.type,
        ip: user.ip,
        macAddress: user.macAddress,
        university: user.university,
        ein: user.ein,
        ssn: user.ssn,
        userAgent: user.userAgent,
        role: user.role,
        // Address fields
        address: user.address?.address,
        city: user.address?.city,
        state: user.address?.state,
        stateCode: user.address?.stateCode,
        postalCode: user.address?.postalCode,
        addressLat: user.address?.coordinates?.lat,
        addressLng: user.address?.coordinates?.lng,
        country: user.address?.country,
        // Company fields
        companyName: user.company?.name,
        companyTitle: user.company?.title,
        companyDepartment: user.company?.department,
        companyAddress: user.company?.address?.address,
        companyCity: user.company?.address?.city,
        companyState: user.company?.address?.state,
        companyStateCode: user.company?.address?.stateCode,
        companyPostalCode: user.company?.address?.postalCode,
        companyLat: user.company?.address?.coordinates?.lat,
        companyLng: user.company?.address?.coordinates?.lng,
        companyCountry: user.company?.address?.country,
        // Bank and Crypto as JSON
        bankJson: user.bank ? JSON.stringify(user.bank) : null,
        cryptoJson: user.crypto ? JSON.stringify(user.crypto) : null,
      },
    });
    count++;
    if (count % 50 === 0) {
      console.log(`  Seeded ${count}/${users.length} users...`);
    }
  }
  console.log(`✓ Successfully seeded ${count} users`);
}

async function seedTodos(todos: DummyJsonTodo[]) {
  console.log("\nSeeding todos...");
  let count = 0;

  for (const todo of todos) {
    // Only seed todos if the user exists
    const userExists = await prisma.user.findUnique({
      where: { id: todo.userId },
    });

    if (userExists) {
      await prisma.todo.upsert({
        where: { id: todo.id },
        update: {},
        create: {
          id: todo.id,
          todo: todo.todo,
          completed: todo.completed,
          userId: todo.userId,
        },
      });
      count++;
      if (count % 50 === 0) {
        console.log(`  Seeded ${count} todos...`);
      }
    }
  }
  console.log(`✓ Successfully seeded ${count} todos`);
}

async function main() {
  console.log("🌱 Starting database seed...\n");

  try {
    // Check if database is already seeded
    const userCount = await prisma.user.count();
    const todoCount = await prisma.todo.count();

    if (userCount > 0 || todoCount > 0) {
      console.log("✓ Database already seeded!");
      console.log(`  - ${userCount} users found`);
      console.log(`  - ${todoCount} todos found`);
      console.log("\n⏭️  Skipping seed (database not empty)");
      return;
    }

    // Fetch data from DummyJSON
    const users = await fetchUsers();
    const todos = await fetchTodos();

    // Seed users first (since todos depend on users)
    await seedUsers(users);

    // Then seed todos
    await seedTodos(todos);

    console.log("\n✅ Database seeded successfully!");
  } catch (error) {
    console.error("\n❌ Error seeding database:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
