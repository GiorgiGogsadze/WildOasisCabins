import { getCabins } from "@/app/_lib/data-service";
import CabinList from "../_components/CabinList";

type CabinsProps = {};
export default async function CabinDataLoading({}: CabinsProps) {
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
  return <CabinList cabins={cabins} />;
}
