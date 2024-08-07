import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(
  req: any,
  { params: { cabinId } }: { params: { cabinId: string } }
) {
  let res: any = {};
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    res = { cabin, bookedDates };
  } catch (err: any) {
    res = { code: 404, error: err?.message };
  }
  return Response.json(res);
}

// export async function POST(){}
