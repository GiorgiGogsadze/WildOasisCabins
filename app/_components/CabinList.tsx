import CabinCard from "@/app/_components/CabinCard";

type CabinListProps = { cabins: any[] };
export default function CabinList({ cabins }: CabinListProps) {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
