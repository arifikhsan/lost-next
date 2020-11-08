import { useRouter } from "next/router";
import Footer from './Footer'
import Header from "./Header";
export default function Layout({ children }) {
  const { pathname } = useRouter();
  const isRoot = pathname === "/";

  return (
    <div className="antialiased font-body">
      <Header />
      <main className="px-4 py-12">{children}</main>
      <Footer />
    </div>
  );
}
