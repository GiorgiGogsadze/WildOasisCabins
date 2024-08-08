import Link from "next/link";

function LoginMessage({ cabinId }: { cabinId: number | string }) {
  return (
    <div className="grid bg-primary-800 flex-1 min-w-[16rem]">
      <p className="text-center text-xl py-12 self-center">
        Please{" "}
        <Link
          href={{
            pathname: "/login",
            query: { redirectTo: `/cabins/${cabinId}` },
          }}
          className="underline text-accent-500"
        >
          login
        </Link>{" "}
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  );
}

export default LoginMessage;
