import { getCabins } from "@/app/_lib/data-service";
import CabinList from "../_components/CabinList";
import { unstable_noStore } from "next/cache";

type CabinsProps = {
  capacityFilter: string;
};

export default async function CabinDataLoading({
  capacityFilter,
}: CabinsProps) {
  // unstable_noStore();
  let cabins: any[] | null = [];
  try {
    cabins = await getCabins();
  } catch (error: any) {
    return <h2>{error.message}</h2>;
  }

  if (!cabins || cabins.length === 0)
    return (
      <h2 className="text-primary-100 text-3xl text-center">No Cabins found</h2>
    );

  if (capacityFilter === "small") {
    cabins = cabins.filter((el) => el.maxCapacity <= 3);
  } else if (capacityFilter === "medium") {
    cabins = cabins.filter((el) => el.maxCapacity >= 4 && el.maxCapacity <= 7);
  } else if (capacityFilter === "large") {
    cabins = cabins.filter((el) => el.maxCapacity >= 8);
  }

  return <CabinList cabins={cabins} />;
}
