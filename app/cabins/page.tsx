import { Suspense } from "react";
import CabinLoader from "@/app/_components/CabinLoader";
import Cabins from "./Cabins";
import { Metadata } from "next";
import Filter from "@/app/_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

export const revalidate = 3600; // an hour

type pageProps = {
  searchParams: { capacity: string };
};
export default function page({ searchParams }: pageProps) {
  const capacityFilter: string = searchParams?.capacity;
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      <Suspense fallback={<CabinLoader />} key={capacityFilter}>
        <Cabins capacityFilter={capacityFilter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Cabins",
};
