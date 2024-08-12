import { updateReservationAction } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { getBooking, getCabin } from "@/app/_lib/data-service";
import SubmitButton from "../../../../_components/SubmitButton";
import { redirect } from "next/navigation";

type pageProps = { params: { bookingId: number } };
export default async function page({ params: { bookingId } }: pageProps) {
  const session: any = await auth();
  if (!session) throw new Error("You must be logged in");
  const { guestId } = session.user;

  const booking: bookingType = await getBooking(bookingId);

  if (+booking.guestId != +guestId) redirect("/account/reservations");
  // CHANGE
  const { cabinId, numGuests, observations } = booking;
  const { maxCapacity } = await getCabin(cabinId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <form
        action={updateReservationAction.bind(null, bookingId)}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={numGuests}
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={observations}
            maxLength={1000}
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton>Update reservation</SubmitButton>
        </div>
      </form>
    </div>
  );
}
