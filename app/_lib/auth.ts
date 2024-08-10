import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig: any = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }: { auth: { user: any } }) {
      return !!auth?.user;
    },
    async signIn({ user }: { user: { name: string; email: string } }) {
      const { name, email } = user;
      try {
        const existingGuest = await getGuest(email);
        if (!existingGuest) {
          await createGuest({ fullName: name, email });
        }
        return true;
      } catch (err: any) {
        return false;
      }
    },
    async session({ session }: any) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/",
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
