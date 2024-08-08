import { Metadata } from "next";
import { auth } from "@/app/_lib/auth";
import { Session } from "next-auth";

export const metadata: Metadata = {
  title: "Guest area",
};

type pageProps = {};
export default async function page({}: pageProps) {
  const session: Session | null = await auth();
  if (!session?.user) throw new Error("auth middleware doesn't work");
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome, {session.user.name}
      </h2>
    </div>
  );
}
