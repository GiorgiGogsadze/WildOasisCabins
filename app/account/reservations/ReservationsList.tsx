"use client";

import ReservationCard from "@/app/_components/ReservationCard";
import { useOptimistic } from "react";
import { deleteReservationAction } from "@/app/_lib/actions";

type ReservationsListProps = {
  bookings: bookingType[];
};
export default function ReservationsList({ bookings }: ReservationsListProps) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId: number) => {
      return curBookings.filter((el) => +el.id !== +bookingId);
    }
  );
  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteReservationAction(bookingId);
  }
  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking: any) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
