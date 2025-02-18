import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  return (
    <div>
      <nav className="w-full flex justify-around bg-green-700 p-4 text-white">
        <Link href="/" className={router.pathname === "/" ? "font-bold" : ""}>Home</Link>
        <Link href="/select-dish" className={router.pathname === "/select-dish" ? "font-bold" : ""}>Order</Link>
        <Link href="/receipt" className={router.pathname === "/receipt" ? "font-bold" : ""}>Receipt</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
