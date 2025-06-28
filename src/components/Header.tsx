'use client';
import Link from 'next/link';
import { useState } from 'react'; // ← useStateをインポート

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => {
    setIsOpen(false);
  };
  return (
    <header className="bg-sky-300/40 shadow-md relative">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Kumpei Official Site
        </Link>
        {/* PC用のナビゲーション (mdスクリーン以上で表示) */}
        <nav className="hidden md:flex gap-6 text-gray-600"></nav>
          <Link href="/" className="hover:text-blue-600">HOME</Link>
          <Link href="/profile" className="hover:text-blue-600">PROFILE</Link>
          {/* <Link href="/blog" className="hover:text-blue-600">Blog</Link> */}
          {/* <Link href="/works" className="hover:text-blue-600">Works</Link> */}
          <Link href="/news" className="hover:text-blue-600">NEWS</Link>
          <Link href="/links" className="hover:text-blue-600">LINKS</Link>
        </nav>

        {/* スマホ用のハンバーガーボタン (mdスクリーン未満で表示) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}> {/* ← クリックでisOpenの状態を反転させる */}
            {/* ハンバーガーアイコン (SVG) */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-4 6h10" />
            </svg>
          </button>
        </div>
      </div>

      {/* モバイル用メニュー (isOpenがtrueの時だけ表示) */}
      {isOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-white shadow-md z-10">
          <ul className="flex flex-col items-center">
            <li><Link href="/" onClick={closeMenu} className="block py-4 hover:bg-gray-100 w-full text-center">HOME</Link></li>
            <li><Link href="/profile" onClick={closeMenu} className="block py-4 hover:bg-gray-100 w-full text-center">PROFILE</Link></li>
            <li><Link href="/news" onClick={closeMenu} className="block py-4 hover:bg-gray-100 w-full text-center">NEWS</Link></li>
            <li><Link href="/links" onClick={closeMenu} className="block py-4 hover:bg-gray-100 w-full text-center">LINKS</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}