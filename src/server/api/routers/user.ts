
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

interface DummyJsonUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  domain?: string;
  company?: {
    name: string;
    title: string;
  };
  address?: {
    address: string;
    city: string;
    postalCode: string;
  };
}

interface DummyJsonResponse {
  users: DummyJsonUser[];
}

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    try {
      const users = await db.user.findMany({
        orderBy: { name: 'asc' },
      });

      if (users.length === 0) {
        const response = await fetch('https://dummyjson.com/users');
        
        if (!response.ok) {
          throw new Error('Failed to fetch users from API');
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data: DummyJsonResponse = await response.json();
        
        for (const user of data.users) {
          try {
            await db.user.create({
              data: {
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                phone: user.phone,
                website: user.domain ?? `${user.firstName.toLowerCase()}.com`,
                companyName: user.company?.name ?? 'Self-employed',
                companyCatchPhrase: user.company?.title ?? 'Building the future',
                addressStreet: user.address?.address ?? 'Unknown',
                addressCity: user.address?.city ?? 'Unknown',
                addressZipcode: user.address?.postalCode ?? '00000',
              },
            });
          } catch (e) {
            console.log(`Skipping duplicate user: ${user.email}`);
          }
        }

        const newUsers = await db.user.findMany({
          orderBy: { name: 'asc' },
        });

        return newUsers.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          website: user.website,
          company: {
            name: user.companyName,
            catchPhrase: user.companyCatchPhrase,
          },
          address: {
            street: user.addressStreet,
            city: user.addressCity,
            zipcode: user.addressZipcode,
          },
        }));
      }

      return users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        website: user.website,
        company: {
          name: user.companyName,
          catchPhrase: user.companyCatchPhrase,
        },
        address: {
          street: user.addressStreet,
          city: user.addressCity,
          zipcode: user.addressZipcode,
        },
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to load users. Please try again.');
    }
  }),
});