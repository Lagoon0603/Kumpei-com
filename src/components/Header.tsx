import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-sky-300/40 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Kumpei Official Site
        </Link>
        <nav className="flex gap-6 text-gray-600">
          <Link href="/" className="hover:text-blue-600">HOME</Link>
          <Link href="/profile" className="hover:text-blue-600">PROFILE</Link>
          {/* <Link href="/blog" className="hover:text-blue-600">Blog</Link> */}
          {/* <Link href="/works" className="hover:text-blue-600">Works</Link> */}
          <Link href="/news" className="hover:text-blue-600">NEWS</Link>
          <Link href="/links" className="hover:text-blue-600">LINKS</Link>
        </nav>
      </div>
    </header>
  );
}