import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import Challenge from "./_components/challenge";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
     <Challenge/>
    </HydrateClient>
  );
}
