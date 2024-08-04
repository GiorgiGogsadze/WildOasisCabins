import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.png";

type pageProps = {};
export default function Page({}: pageProps) {
  return (
    <main className="mt-24">
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src={bg}
          fill
          placeholder="blur"
          quality={80}
          className="object-cover object-top"
          alt="Mountains and forests with two cabins"
          loading="eager"
        />
      </div>

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
