import { HydrateClient } from "~/trpc/server";
import AddressBook from "./_components/address-book";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
        <AddressBook />
      </main>
    </HydrateClient>
  );
}
