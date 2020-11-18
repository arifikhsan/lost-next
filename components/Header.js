import Link from "next/link";

export default function Header() {
  return (
    <div className="sticky top-0 bg-white border-b">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="p-4 text-2xl font-bold leading-none no-underline font-display">
              <span className=" text-primary">bantu</span>
              <span className="text-accent">temu</span>
            </a>
          </Link>
          <button className="p-4">Menu</button>
        </div>
      </div>
    </div>
  );
}
