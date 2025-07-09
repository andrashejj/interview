export async function fetchDummyUsers(): Promise<any[]> {
  const url = process.env.NEXT_PUBLIC_DUMMY_USERS_API;

  if (!url) {
    throw new Error('NEXT_PUBLIC_DUMMY_USERS_API environment variable is not set.');
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`);
  }

  const data = await response.json();
  return data.users;
}
