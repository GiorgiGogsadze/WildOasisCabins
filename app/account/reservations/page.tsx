import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";
import { Metadata } from "next";
import ReservationsList from "./ReservationsList";

export const metadata: Metadata = {
  title: "Reservations",
};

type pageProps = {};
export default async function page({}: pageProps) {
  // CHANGE
  const session = await auth();
  const user: any = session?.user;
  if (!user) throw new Error("Not logged in");
  const bookings: any = await getBookings(user.guestId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {!bookings || bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationsList bookings={bookings} />
      )}
    </div>
  );
}
