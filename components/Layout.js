import { useRouter } from "next/router";
import Footer from './Footer'
import Header from "./Header";
export default function Layout({ children }) {
  const { pathname } = useRouter();
  const isRoot = pathname === "/";

  return (
    <div className="antialiased font-body">
      <Header />
      <main className="p-4">{children}</main>
      <Footer />
    </div>
  );
}
