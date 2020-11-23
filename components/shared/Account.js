import { useState } from "react";
import { Transition } from "@headlessui/react";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";

function Account() {
  const [accountNav, setAccountNav] = useState(false);
  const toggleAccountNav = () => setAccountNav(!accountNav);
  const [session, loading] = useSession();

  return (
    <div className="border-b">
      <div className="max-w-5xl mx-auto">
        {!session && (
          <div className="flex items-center justify-between px-4 py-2 text-sm">
            <span>You are not signed in</span>
            <button
              className="px-4 py-2 text-white rounded bg-accent"
              onClick={(e) => {
                e.preventDefault();
                signIn("google");
              }}
            >
              Sign in
            </button>
          </div>
        )}
        {session && (
          <div className="flex items-center justify-between px-4 py-2 text-sm md:hidden">
            <div className="flex items-center space-x-2">
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
            </div>
            <div className="relative z-0 inline-block text-left">
              <div>
                <button
                  onClick={() => {
                    toggleAccountNav();
                  }}
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  Opsi
                  {/* <!-- Heroicon name: chevron-down --> */}
                  <svg
                    className="w-6 h-6 ml-2 -mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
              <Transition
                show={accountNav}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100 transform"
                leaveTo="opacity-0 scale-95"
              >
                <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {session && (
                      <Link href="/account" className="" role="menuitem">
                        <a
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Pengaturan akun
                        </a>
                      </Link>
                    )}
                    <Link href="/post/bantuan" className="" role="menuitem">
                      <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                        Bantuan
                      </a>
                    </Link>
                    <form method="POST" action="#">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          signOut();
                        }}
                        type="submit"
                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                        role="menuitem"
                      >
                        Keluar dari aplikasi
                      </button>
                    </form>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;
