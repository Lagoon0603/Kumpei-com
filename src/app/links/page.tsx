import type { Metadata } from 'next';

// ページのタイトルや説明文を設定します (SEO対策)
export const metadata: Metadata = {
  title: 'SNSリンク集 - Kumpei.com',
  description: '関連リンクやサイトの一覧です。',
};

// 表示したいリンクのデータを配列として定義します
const socialLinks = [
  {
    id: 1,
    name: 'Instagram(個人用)',
    url: 'https://www.instagram.com/lagoon0603/',
    username: '@lagoon0603',
  },
  {
    id: 2,
    name: 'Instagram(飛行機写真専用)',
    url: 'https://www.instagram.com/lagoon_air/',
    username: '@lagoon_air',
  },
  {
    id: 3,
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61577213146535',
    username: 'Kumpei on Facebook',
  },
  {
    id: 4,
    name: 'X(旧Twitter)',
    url: 'https://x.com/lagoon_air/',
    username: '@lagoon_air',
  },
  // 他にもリンクがあれば、ここに追加できます
];

export default function LinksPage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        リンク集
      </h1>

      {/* リンクを表示するリスト */}
      <div className="max-w-md mx-auto">
        <ul className="space-y-4">
          {socialLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border p-4 rounded-lg text-center hover:bg-gray-100 transition-colors"
              >
                <span className="text-xl font-semibold">{link.name}</span>
                <p className="text-sm text-gray-500">{link.username}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}