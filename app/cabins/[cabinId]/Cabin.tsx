import TextExpander from "@/app/_components/TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

type CabinProps = { cabin: cabinType };
export default function Cabin({ cabin }: CabinProps) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  return (
    <div className="flex flex-col items-center sm:grid sm:grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
      <div className="relative w-[20rem] h-[15rem] sm:w-full sm:h-full scale-[1.15] sm:-translate-x-3">
        <Image
          fill
          src={image}
          alt={`Cabin ${name}`}
          className="object-cover"
          loading="eager"
          sizes="(max-width: 1000px) 500px, 1000px"
          priority
        />
      </div>

      <div>
        <h3 className="text-accent-100 font-black text-7xl mb-5 sm:translate-x-[-254px] bg-primary-950 p-6 pb-1 sm:w-[150%]">
          Cabin {name}
        </h3>

        <p className="text-lg text-primary-300 mb-10">
          <TextExpander initialNumber={40}>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
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
  );
}
