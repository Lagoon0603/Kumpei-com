'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('送信中...');

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        // headersはブラウザが自動で設定するので削除する
        body: formData, // JSON.stringifyは使わず、formDataを直接渡す
      });

      if (response.ok) {
        setStatus('送信に成功しました！ありがとうございます。');
        (event.target as HTMLFormElement).reset();
      } else {
        const errorData = await response.json();
        setStatus(`送信に失敗しました: ${errorData.error || 'サーバーエラー'}`);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setStatus('予期せぬエラーが発生しました。');
    }
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        お問い合わせフォーム
      </h1>
      <div className="max-w-xl mx-auto">
        <p className="text-center mb-8">
          ご意見、ご感想、お仕事のご依頼など、お気軽にご連絡ください。
        </p>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">お名前</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">メールアドレス</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">お問い合わせ内容</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div>
            <label htmlFor="attachment" className="block text-sm font-medium text-gray-700">
              添付ファイル (任意)
            </label>
            <input
              type="file"
              id="attachment"
              name="attachment"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
              disabled={status === '送信中...'}
            >
              {status === '送信中...' ? '送信しています...' : '送信する'}
            </button>
          </div>
        </form>
        {status && status !== '送信中...' && (
          <p className={`text-center mt-4 font-medium ${status.includes('失敗') ? 'text-red-600' : 'text-green-600'}`}>
            {status}
          </p>
        )}
      </div>
    </main>
  );
}