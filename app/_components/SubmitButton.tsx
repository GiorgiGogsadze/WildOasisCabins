"use client";

import SpinnerMini from "@/app/_components/SpinnerMini";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: ReactNode;
  disabled: boolean;
};
export default function SubmitButton({
  children,
  disabled,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending || disabled}
    >
      {pending ? <SpinnerMini /> : children}
    </button>
  );
}
