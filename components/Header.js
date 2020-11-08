import Link from "next/link";

export default function Header() {
  return (
    <div className="max-w-5xl px-4 py-2 mx-auto border-b border-blue-500">
      <div className="flex items-center justify-center">
        <Link href="/">
          <a className="p-4 text-2xl font-bold leading-none text-blue-600 no-underline font-display">
            BantuTemu
          </a>
        </Link>
      </div>
    </div>
  );
}
