import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guest area",
};

type pageProps = {};
export default function page({}: pageProps) {
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome, Jonas
      </h2>
    </div>
  );
}
