import { useRouter } from "next/router";
import Footer from "./Footer";
import Header from "./shared/Header";
export default function Layout({ children }) {
  const { pathname } = useRouter();
  const isRoot = pathname === "/";

  return (
    <div className="antialiased font-body">
      <Header />
      <main className="max-w-5xl p-4 mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
