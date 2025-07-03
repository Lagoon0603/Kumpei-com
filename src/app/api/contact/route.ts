import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// 環境変数はPOST関数の外で一度だけ読み込むのが効率的
const resendApiKey = process.env.RESEND_API_KEY;
const toEmailAddress = process.env.CONTACT_FORM_TO_EMAIL; // 受信先アドレス

const resend = new Resend(resendApiKey);

export async function POST(request: Request) {
  // ★修正点1: 関数の先頭で環境変数が存在するかをチェックする
  if (!resendApiKey || !toEmailAddress) {
    console.error('Error: Missing environment variables for Resend.');
    return NextResponse.json({ message: 'サーバー側の設定エラーです。' }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string; // これはユーザーが入力したアドレス
    const message = formData.get('message') as string;
    const attachmentFile = formData.get('attachment') as File | null;

    if (!name || !email || !message) {
      return NextResponse.json({ message: '必須項目が不足しています。' }, { status: 400 });
    }

    const attachments = [];
    if (attachmentFile && attachmentFile.size > 0) {
      const buffer = Buffer.from(await attachmentFile.arrayBuffer());
      attachments.push({
        filename: attachmentFile.name,
        content: buffer,
      });
    }

    // ★修正点2: toプロパティには、関数の外で定義した`toEmailAddress`を正しく使う
    const data = await resend.emails.send({
      from: 'お問い合わせフォーム <onboarding@resend.dev>',
      to: toEmailAddress, // ← ここを修正
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
    console.error(error);
    return NextResponse.json({ message: 'メールの送信中にエラーが発生しました。', error: (error as Error).message }, { status: 500 });
  }
}