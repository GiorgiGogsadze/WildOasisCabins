"use server";
import { signIn, signOut } from "./auth";
export async function signInAction(redirectTo: string) {
  await signIn("google", { redirectTo: redirectTo || "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
