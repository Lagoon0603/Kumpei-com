import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// ★修正点1: 定数名をより明確にし、コンポーネントの外で定義する
const resendApiKey = process.env.RESEND_API_KEY;
const toEmailAddress = process.env.CONTACT_EMAIL;

// 環境変数が読み込まれているか、起動時に一度だけ確認
if (!process.env.RESEND_API_KEY) {
  console.error('Error: RESEND_API_KEY is not set in environment variables.');
}
if (!toEmailAddress) {
  console.error('Error: CONTACT_EMAIL is not set in environment variables.');
}
const resend = new Resend(resendApiKey);

export async function POST(request: Request) {
  // ★修正点2: POSTリクエストの最初に、改めて環境変数の存在をチェックする
  if (!resendApiKey || !toEmailAddress) {
    // 環境変数がなければ、サーバー内部のエラーとして500を返す
    return NextResponse.json(
      { message: 'サーバーの設定エラーです。管理者に連絡してください。' },
      { status: 500 }
    );
  }
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // デバッグ用: 受け取ったデータを確認
    console.log('Received data:', { name, email, message });

    // バリデーション: 必要なデータが揃っているか確認
    if (!name || !email || !message) {
      return NextResponse.json({ message: '必須項目が不足しています。' }, { status: 400 });
    }
    
    // Resendでメールを送信
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // Resendのテスト用送信元アドレス
      to: [toEmailAddress!], // 環境変数から取得したメールアドレス
      subject: `【kumpei.com】お問い合わせがありました`,
      replyTo: [email], // ユーザーのメールアドレスを返信先に設定
      html: `<p><strong>お名前:</strong> ${name}</p>
             <p><strong>メールアドレス:</strong> ${email}</p>
             <p><strong>お問い合わせ内容:</strong><br>${message.replace(/\n/g, '<br>')}</p>`, // 改行を<br>に変換
    });

    // デバッグ用: Resendからの応答を確認
    console.log('Resend response:', data);

    return NextResponse.json({ message: 'メールの送信に成功しました。', data });

  } catch (error) {
    // デバッグ用: エラー内容をコンソールに出力
    console.error('Error in /api/contact:', error);
    
    // エラー発生時は、より詳細なエラーメッセージと500ステータスを返す
    return NextResponse.json({ message: 'メールの送信中にエラーが発生しました。', error: (error as Error).message }, { status: 500 });
  }
}