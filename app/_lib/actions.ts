"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { createBooking, updateGuest } from "./data-service";

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

export async function reserveCabinAction(additionalData: any) {
  const session: any = await auth();
  if (!session) throw new Error("You must be logged in");
  const { guestId } = session.user;

  const data: any = { guestId, ...additionalData };

  await createBooking(data);

  revalidatePath(`/cabins/${additionalData.cabinId}`);
}
