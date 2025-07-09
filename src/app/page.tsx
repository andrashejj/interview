import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import { Users } from "./_components/users";

export default async function Home() {
  void api.post.getLatest.prefetch();
  return (
    <HydrateClient>
      <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container gap-12 px-4 py-16">
           <Users />{/* User List */}
          <LatestPost />
        </div>
      </main>
    </HydrateClient>
  );
}
