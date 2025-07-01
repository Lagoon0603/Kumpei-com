import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear(); // 現在の年を自動で取得

  return (
    <footer className="bg-gray-100 text-gray-600 mt-12 py-8">
      <div className="container mx-auto text-center">
        <nav className="flex justify-center gap-4 mb-4">
          <Link href="/" className="hover:underline">HOME</Link>
          <Link href="/profile" className="hover:underline">PROFILE</Link>
          <Link href="/news" className="hover:underline">NEWS</Link>
          <Link href="/links" className="hover:underline">LINKS</Link>
          <Link href="/contact" className="hover:underline">CONTACT</Link>
        </nav>
        <p>&copy; {currentYear} Kumpei.com. All Rights Reserved.</p>
      </div>
    </footer>
  );
}