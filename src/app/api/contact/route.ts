import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  // ▼▼▼ 環境変数の読み込みとチェックを、POST関数の内側に移動 ▼▼▼
  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmailAddress = process.env.CONTACT_FORM_TO_EMAIL;

  // 関数の先頭で、必要な環境変数がすべて存在するかをチェックする
  if (!resendApiKey || !toEmailAddress) {
    console.error('Error: Missing environment variables for Resend.');
    // ユーザーには具体的なエラー内容を返さず、サーバー側の問題であることだけを伝える
    return NextResponse.json({ message: 'サーバー側で設定エラーが発生しました。' }, { status: 500 });
  }
  // ▲▲▲ ここまで ▲▲▲

  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const attachmentFile = formData.get('attachment') as File | null;

    if (!name || !email || !message) {
      return NextResponse.json({ message: '必須項目が不足しています。' }, { status: 400 });
    }

    // ▼▼▼ Resendインスタンスの作成も、キーのチェック後に移動 ▼▼▼
    const resend = new Resend(resendApiKey);

    const attachments = [];
    if (attachmentFile && attachmentFile.size > 0) {
      const buffer = Buffer.from(await attachmentFile.arrayBuffer());
      attachments.push({
        filename: attachmentFile.name,
        content: buffer,
      });
    }
    
    const data = await resend.emails.send({
      from: 'お問い合わせフォーム <onboarding@resend.dev>',
      to: toEmailAddress, // 正しく受信先アドレスを参照
      subject: `【kumpei.com】お問い合わせがありました`,
      replyTo: email,
      html: `
        <h1>お問い合わせがありました</h1>
        <p><strong>お名前:</strong> ${name}</p>
        <p><strong>メールアドレス:</strong> ${email}</p>
        <p><strong>お問い合わせ内容:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      attachments: attachments,
    });

    return NextResponse.json({ message: 'メールの送信に成功しました。', data });

  } catch (error) {
    console.error('Error in /api/contact:', error);
    return NextResponse.json({ message: 'メールの送信中にエラーが発生しました。', error: (error as Error).message }, { status: 500 });
  }
}