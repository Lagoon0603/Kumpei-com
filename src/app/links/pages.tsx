import type { Metadata } from 'next';

// ページのタイトルや説明文を設定します (SEO対策)
export const metadata: Metadata = {
  title: 'SNSリンク集 - Kumpei.com',
  description: '関連リンクやサイトの一覧です。',
};

export default function LinksPage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        リンク集
      </h1>
      {
        "Instagram: https://www.instagram.com/lagoon0603/profilecard/?igsh=YnprYXQzcDRhemR4"
        "Facebook: https://www.facebook.com/profile.php?id=61577213146535"
      }
    </main>
  );
}
