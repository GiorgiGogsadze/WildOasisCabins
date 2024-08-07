"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const filters = [
  {
    value: "all",
    label: "All Cabins",
  },
  {
    value: "small",
    label: "1—3 guests",
  },
  ,
  {
    value: "medium",
    label: "2—7 guests",
  },
  {
    value: "large",
    label: "8—12 guests",
  },
] as { value: string; label: string }[];

type FilterProps = {};
export default function Filter({}: FilterProps) {
  const searchParams = useSearchParams();
  const capacityParam = searchParams.get("capacity") ?? "all";
  const router = useRouter();
  const pathname = usePathname();

  function handleFilter(filter: string) {
    const params = new URLSearchParams();
    if (filter === "all") {
      params.delete("capacity");
    } else {
      params.set("capacity", filter);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      {filters.map((el) => (
        <button
          key={el.value}
          className={`px-5 py-2 hover:bg-primary-700 ${
            capacityParam === el.value ? "bg-primary-700 text-primary-50" : ""
          }`}
          onClick={() => handleFilter(el.value)}
        >
          {el.label}
        </button>
      ))}
    </div>
  );
}
