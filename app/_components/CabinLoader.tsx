import Spinner from "@/app/_components/Spinner";

type loadingProps = {};
export default function CabinLoader({}: loadingProps) {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabins data...</p>
    </div>
  );
}
