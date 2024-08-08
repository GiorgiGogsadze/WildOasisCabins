import { auth } from "@/app/_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import LoginMessage from "./LoginMessage";

type ReservationProps = {
  cabin: cabinType;
};
export default async function Reservation({ cabin }: ReservationProps) {
  const session = await auth();
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center border border-primary-800 min-h-[400x] p-8">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage cabinId={cabin.id} />
      )}
    </div>
  );
}
