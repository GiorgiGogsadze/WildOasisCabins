import { Metadata } from "next";
import { auth } from "@/app/_lib/auth";
import { Session } from "next-auth";
import { getBookedDatesByGuestId } from "../_lib/data-service";
import Calendar from "./Calendar";

export const metadata: Metadata = {
  title: "Guest area",
};

type pageProps = {};
export default async function page({}: pageProps) {
  const session: any = await auth();
  if (!session?.user) throw new Error("auth middleware doesn't work");

  const bookedDates = await getBookedDatesByGuestId(session.user.guestId);

  return (
    <div>
      <h2 className="font-semibold text-3xl text-accent-400 mb-4 text-center">
        Welcome, {session.user.name}
      </h2>
      <h3 className="font-semibold text-2xl text-accent-100 mb-7 text-center">
        Here you can see your reserved dates
      </h3>
      <Calendar bookedDates={bookedDates} />
    </div>
  );
}
