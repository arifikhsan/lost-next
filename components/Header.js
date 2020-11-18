import Link from "next/link";

export default function Header() {
  return (
    <div className="sticky top-0 bg-white border-b">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="p-4">
              <img src="/logo.svg" alt="logo bantutemu" />
            </a>
          </Link>
          <button className="p-4">Menu</button>
        </div>
      </div>
    </div>
  );
}
