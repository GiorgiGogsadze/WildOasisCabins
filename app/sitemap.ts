import { MetadataRoute } from "next";
import { getCabins } from "@/app/_lib/data-service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.BASE_URL;
  const cabins = await getCabins();

  const cabinsMap: MetadataRoute.Sitemap = cabins.map((el) => ({
    url: `${baseUrl}/cabins/${el.id}`,
    // lastModified: new Date(el.updateAt)
    // changeFrequency: "daily"
    // priority: el.id
  }));

  return [
    {
      url: `${baseUrl}/`,
    },
    {
      url: `${baseUrl}/about`,
    },
    {
      url: `${baseUrl}/account`,
    },
    {
      url: `${baseUrl}/account/profile`,
    },
    {
      url: `${baseUrl}/account/reservations`,
    },
    {
      url: `${baseUrl}/cabins`,
    },
    {
      url: `${baseUrl}/login`,
    },
    ...cabinsMap,
  ];
}
