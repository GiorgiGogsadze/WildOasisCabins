import { signInAction } from "@/app/_lib/actions";

type SignInButtonProps = {
  redirectTo: string;
};
function SignInButton({ redirectTo }: SignInButtonProps) {
  return (
    <form action={signInAction.bind(null, redirectTo)}>
      <button
        className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium"
        // onClick={signIn}
      >
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
