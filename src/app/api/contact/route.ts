import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const smtpConfig = {
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: 'kaleah@163.com',
    pass: 'ANZXDzskXFCgTAXN',
  },
};

const receiver = 'kaleah@163.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: '姓名、邮箱和留言内容为必填项' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport(smtpConfig);

    const mailSubject = `【科栎雅】${subject || '咨询'} - 来自 ${name}`;

    const mailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb;">
        <div style="background: #059669; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px;">科栎雅（KALEAH）官网留言</h2>
        </div>
        <div style="background: #ffffff; padding: 32px; border-radius: 0 0 12px 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 80px;">姓名</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">电话</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 500;">${phone || '未填写'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">邮箱</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 500;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">主题</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 500;">${subject || '未选择'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; vertical-align: top;">留言</td>
              <td style="padding: 10px 0; color: #111827; line-height: 1.6;">${message}</td>
            </tr>
          </table>
        </div>
        <div style="text-align: center; padding: 16px; color: #9ca3af; font-size: 12px;">
          此邮件由科栎雅官方网站自动发送
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: '"科栎雅官网" <kaleah@163.com>',
      to: receiver,
      replyTo: email,
      subject: mailSubject,
      html: mailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('提交联系表单失败:', error);
    return NextResponse.json(
      { success: false, error: '提交失败，请稍后重试' },
      { status: 500 }
    );
  }
}