export default function Home() {
  return (
    // <main>タグで囲むのが一般的です
    <main className="container mx-auto p-8">
      
      {/* ページタイトル */}
      <div className="text-center my-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Kumpei.comへようこそ！
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Next.jsとVercelで構築した、私の公式サイトです。
        </p>
      </div>

      {/* 自己紹介セクション */}
      <div className="bg-slate-100 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">サイトについて</h2>
        <p>
          こんにちは、土井薫平です。このサイトでは、私についての様々なことを発信しております。
          どうぞごゆっくりご覧ください。
        </p>
      </div>

    </main>
  );
}