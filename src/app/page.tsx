import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import Challenge from "./_components/challenge";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Andras Full stack{" "}
            <span className="text-[hsl(280,100%,70%)]">Interview</span> App
          </h1>

          <Challenge />

          <div className="flex flex-col items-center gap-2">
            <div className="mb-2 rounded border border-white/20 bg-white/10 px-4 py-2 text-sm text-slate-200 italic">
              <span className="font-semibold">Note:</span> The following section
              is just boilerplate/sample code to demonstrate API usage and
              component rendering. You can remove or replace it as you build
              your solution.
            </div>
            <p className="text-2xl text-white">
              Debug: {hello ? hello.greeting : "Loading tRPC query..."}
            </p>
          </div>
          <LatestPost />
        </div>
      </main>
    </HydrateClient>
  );
}
