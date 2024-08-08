import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Metadata } from "next";
import { cache, Suspense } from "react";
import Cabin from "./Cabin";

type pageProps = { params: { cabinId: number } };

// export async function generateStaticParams() {
//   const cabins = await getCabins();
//   return cabins.map((el) => ({ cabinId: `${el.id}` }));
// }

const getCabinCache = cache(async (cabinId: number) => {
  const cabin: cabinType = await getCabin(cabinId);
  return cabin;
});

export async function generateMetadata({
  params,
}: pageProps): Promise<Metadata> {
  const { cabinId } = params;
  let name: string = "Empty";
  let url: string = "";
  try {
    const cabin = await getCabinCache(cabinId);
    name = cabin.name;
    url = cabin.image;
  } catch (error: any) {}

  return {
    title: `Cabin ${name}`,
    openGraph: {
      images: [{ url }],
    },
  };
}

export default async function page({ params }: pageProps) {
  const { cabinId } = params;
  const cabin: cabinType = await getCabinCache(cabinId);

  if (!cabin)
    return (
      <h2 className="text-primary-100 text-3xl text-center">No cabin found</h2>
    );

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
