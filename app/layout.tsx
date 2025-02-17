import { ReactNode } from "react";

import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" });

import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import { Metadata } from "next";
import { ReservationProvider } from "./_components/ReservationContext";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.BASE_URL ||
      process.env.VERCEL_URL ||
      `http://localhost:${process.env.PORT || 3000}`
  ),
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome | The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export const experimental_ppr = true;

type layoutProps = { children: ReactNode };
export default function RootLayout({ children }: layoutProps) {
  return (
    <html lang="en">
      <body
        className={`bg-primary-950 antialiased text-primary-100 min-h-screen ${josefin.className} flex flex-col`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid ">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
        <footer className="p-8 text-right">
          <p>
            The website is developed for personal purposes. Provided information
            is fictitious.
          </p>
          <p>
            ©{new Date().getFullYear()} by Jonas Schmedtmann and Giorgi
            Gogsadze.
          </p>
        </footer>
      </body>
    </html>
  );
}
