import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";
import SpinnerMini from "./SpinnerMini";
import { Suspense } from "react";

function Header() {
  return (
    <header className="border-b border-primary-900 px-8 py-5">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Suspense fallback={<SpinnerMini />}>
          <Navigation />
        </Suspense>
      </div>
    </header>
  );
}

export default Header;
