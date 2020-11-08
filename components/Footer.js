import Link from "next/link";

export default function Footer() {
  return (
    <footer className="font-light text-center text-white">
      <div className="bg-blue-500">
        <div className="max-w-5xl p-4 mx-auto">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a>Homepage</a>
            </Link>
            <Link href="/blog">
              <a>Blog</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-blue-600">
        <div className="max-w-5xl p-4 mx-auto">
          © {new Date().getFullYear()}, BantuTemu | Built with{" "}
          <a href="https://nextjs.org/">Next.js</a>
          &#128293;
        </div>
      </div>
    </footer>
  );
}
