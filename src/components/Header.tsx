import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Kumpei.com
        </Link>
        <nav className="flex gap-6 text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/profile" className="hover:text-blue-600">Profile</Link>
          {/* <Link href="/blog" className="hover:text-blue-600">Blog</Link> */}
          {/* <Link href="/works" className="hover:text-blue-600">Works</Link> */}
          <Link href="/links" className="hover:text-blue-600">Links</Link>
        </nav>
      </div>
    </header>
  );
}