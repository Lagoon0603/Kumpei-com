export default function NEWS() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Latest</h1>
        <p className="text-lg">
          最新の出来事やこのサイトの更新情報などを掲載しております。
        </p>
        
        {/* 更新情報セクション */}
        <div className="bg-slate-100 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">2025.06.28</h2>
                <p>
                本サイトを開設いたしました。
                </p>
        </div>
        <div className="bg-slate-100 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">2025.07.02</h2>
                <p>
                CONTACTページを追加しました。お気軽にお問い合わせください！
                </p>
        </div>
        {/* ここに更新情報などを追加していく */}     
      </div>
    </main>
  );
}