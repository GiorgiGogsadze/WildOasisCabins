import { getCabin, getCabins } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";
import Image from "next/image";
import { cache } from "react";

type pageProps = { params: { cabinId: number } };

export async function generateStaticParams() {
  const cabins = await getCabins();
  return cabins.map((el) => ({ cabinId: `${el.id}` }));
}

const getCabinCache = cache(async (cabinId: number) => {
  const cabin: any = await getCabin(cabinId);
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
  let cabin: {
    id: number;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    image: string;
    description: string;
  } | null = await getCabinCache(cabinId);

  if (!cabin)
    return (
      <h2 className="text-primary-100 text-3xl text-center">No cabin found</h2>
    );
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          <Image
            fill
            src={image}
            alt={`Cabin ${name}`}
            className="object-cover"
            loading="eager"
            sizes="(max-width: 1000px) 500px, 1000px"
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
            Cabin {name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">{description}</p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve today. Pay on arrival.
        </h2>
      </div>
    </div>
  );
}
