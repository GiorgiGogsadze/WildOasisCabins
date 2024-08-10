"use client";
import { usePathname } from "next/navigation";
import { serverValidationPathAction } from "./_lib/actions";
type errorProps = {
  error: any;
  reset: any;
};
export default function Error({ error, reset }: errorProps) {
  const pathname: any = usePathname();
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>
      <form
        action={serverValidationPathAction.bind(null, pathname)}
        onSubmit={reset}
      >
        <button className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg">
          Try again
        </button>
      </form>
    </main>
  );
}
