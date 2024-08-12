"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  deleteBooking,
  getBooking,
  updateBooking,
  updateGuest,
} from "./data-service";
import { redirect } from "next/navigation";

export async function serverValidationPathAction(path: any) {
  revalidatePath(path);
}

export async function signInAction(redirectTo: string) {
  await signIn("google", { redirectTo: redirectTo || "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfileAction(formData: FormData) {
  const session: any = await auth();
  if (!session) throw new Error("You must be logged in");
  const { guestId } = session.user;

  const nationalID = "" + formData.get("nationalID");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("please provide a valid national ID");
  const [nationality, countryFlag] = `${formData.get("nationality")}`.split(
    "%"
  );
  const updateData = {
    nationalID: nationalID || null,
    nationality: nationality || null,
    countryFlag: countryFlag || null,
  };
  await updateGuest(guestId, updateData);

  revalidatePath("/account/profile");
}

export async function reserveCabinAction(bookingData: any) {
  const session: any = await auth();
  if (!session) throw new Error("You must be logged in");
  const { guestId } = session.user;

  if (!bookingData.startDate || !bookingData.endDate || !bookingData.numNights)
    throw new Error("Incorrect date range!");

  const data: any = {
    ...bookingData,
    observations: bookingData.observations.slice(0, 1000),
    guestId,
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  await createBooking(data);

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  revalidatePath("/account/reservations");
  redirect("/cabins/thankyou");
}

export async function deleteReservationAction(bookingId: any) {
  const session: any = await auth();
  if (!session) throw new Error("You must be logged in");
  const { guestId } = session.user;

  const booking = await getBooking(bookingId);
  if (+booking.guestId !== +guestId) throw new Error("Not your booking");
  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");
}

export async function updateReservationAction(
  bookingId: number,
  formData: FormData
) {
  const session: any = await auth();
  if (!session) throw new Error("You must be logged in");
  const { guestId } = session.user;

  const booking = await getBooking(bookingId);
  if (+booking.guestId !== +guestId) throw new Error("Not your booking");

  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations")?.slice(0, 1000);
  await updateBooking(+bookingId, { numGuests, observations });

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}
