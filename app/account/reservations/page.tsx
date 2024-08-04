import ReservationCard from "@/app/_components/ReservationCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservations",
};

type pageProps = {};
export default function page({}: pageProps) {
  // CHANGE
  const bookings: any[] | null = [];

  if (!bookings || bookings.length === 0)
    return (
      <h2 className="text-primary-100 text-3xl text-center">No Bookings</h2>
    );

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
