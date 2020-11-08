import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const { pathname } = useRouter();
  const isRoot = pathname === "/";

  return (
    <div className="antialiased font-body">
      <div className="max-w-5xl px-4 py-2 mx-auto border-b">
        <div className="flex items-center justify-center">
          <Link href="/">
            <a className="p-4 text-2xl font-bold leading-none text-gray-800 no-underline font-display">
              BantuTemu
            </a>
          </Link>
        </div>
      </div>
      <main className="px-4 py-12">{children}</main>
      <footer className="max-w-5xl p-4 mx-auto font-light text-center text-white bg-blue-700">
        © {new Date().getFullYear()}, BantuTemu | Built with{" "}
        <a href="https://nextjs.org/">Next.js</a>
        &#128293;
      </footer>
    </div>
  );
}
