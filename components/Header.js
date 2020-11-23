import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [session, loading] = useSession();

  const toggleNav = () => setNavOpen(!navOpen);

  return (
    <>
      <div className="sticky top-0 bg-white border-b">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between py-3">
            <Link href="/">
              <a className="py-4 ml-4">
                <img src="/logo.svg" alt="logo bantutemu" />
              </a>
            </Link>
            <div className="flex mr-4 space-x-4">
              {session && (
                <div className="items-center justify-between hidden px-4 py-2 space-x-4 text-sm md:flex">
                  {session.user.image && (
                    <img
                      className="w-8 h-8 rounded-full"
                      src={session.user.image}
                    />
                  )}
                  <span>
                    <small>Signed in as</small>
                    <br />
                    <span className="">
                      {session.user.name || session.user.email}
                    </span>
                  </span>
                  <a
                    href={`/api/auth/signout`}
                    className="px-4 py-2 text-sm text-white bg-red-500 rounded"
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                    }}
                  >
                    Sign out
                  </a>
                </div>
              )}
              <button onClick={toggleNav} className="py-4">
                Menu
              </button>
            </div>
          </div>
        </div>

        {/* overlay */}
        <div
          hidden={!navOpen}
          className="absolute z-50 w-full h-screen bg-white"
        >
          <div className="flex flex-col justify-between mt-20 space-y-4 text-lg text-center font-display">
            {session && (
              <>
                <Link href="/item/new">
                  <a>
                    <p onClick={toggleNav} className="p-4">
                      Laporkan Barang Hilang/Temuan
                    </p>
                  </a>
                </Link>
                <Link href="/item/mine">
                  <a>
                    <p onClick={toggleNav} className="p-4">
                      Laporanku
                    </p>
                  </a>
                </Link>
              </>
            )}
            <Link href="/">
              <a>
                <p onClick={toggleNav} className="p-4">
                  Beranda
                </p>
              </a>
            </Link>
            <Link href="/blog">
              <a>
                <p onClick={toggleNav} className="p-4">
                  Blog
                </p>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="border-b">
        <div className="max-w-5xl mx-auto">
          {!session && (
            <div className="flex items-center justify-between px-4 py-2 text-sm">
              <span>You are not signed in</span>
              <a
                href={`/api/auth/signin`}
                className="px-4 py-2 text-white rounded bg-accent"
                onClick={(e) => {
                  e.preventDefault();
                  signIn('google');
                }}
              >
                Sign in
              </a>
            </div>
          )}
          {session && (
            <div className="flex items-center justify-between px-4 py-2 text-sm md:hidden">
              {session.user.image && (
                <img
                  className="w-8 h-8 rounded-full"
                  src={session.user.image}
                />
              )}
              <span>
                <small>Signed in as</small>
                <br />
                <span className="">
                  {session.user.name || session.user.email}
                </span>
              </span>
              <button
                className="px-2 py-1 text-sm text-white bg-red-500 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
