import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, pickupDate, pickupTime, returnDate, returnTime, carType, message } = body;

    // 환경 변수 확인
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailTo = process.env.EMAIL_TO;

    if (!emailUser || !emailPass || !emailTo) {
      return NextResponse.json(
        { error: '이메일 설정이 완료되지 않았습니다.' },
        { status: 500 }
      );
    }

    // Nodemailer 설정
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // 이메일 내용 구성
    const mailOptions = {
      from: emailUser,
      to: emailTo,
      subject: `[공항렌트24] 새로운 예약 문의 - ${name}님`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            새로운 예약 문의가 접수되었습니다
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <div style="color: #374151; margin-top: 0; font-size: 1.2em; font-weight: bold;">고객 정보</div>  
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">이름:</td>
                <td style="padding: 8px 0; color: #6b7280;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">전화번호:</td>
                <td style="padding: 8px 0; color: #6b7280;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">이메일:</td>
                <td style="padding: 8px 0; color: #6b7280;">${email}</td>
              </tr>
            </table>
          </div>

          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <div style="color: #374151; margin-top: 0; font-size: 1.2em; font-weight: bold;">예약 정보</div>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">픽업 날짜:</td>
                <td style="padding: 8px 0; color: #6b7280;">${pickupDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">픽업 시간:</td>
                <td style="padding: 8px 0; color: #6b7280;">${pickupTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">반납 날짜:</td>
                <td style="padding: 8px 0; color: #6b7280;">${returnDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">반납 시간:</td>
                <td style="padding: 8px 0; color: #6b7280;">${returnTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">차종:</td>
                <td style="padding: 8px 0; color: #6b7280;">${carType}</td>
              </tr>
            </table>
          </div>

          ${message ? `
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <div style="color: #374151; margin-top: 0; font-size: 1.2em; font-weight: bold;">추가 요청사항</div>
              <p style="color: #78350f; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          ` : ''}

          <div style="background-color: #dcfce7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #166534; margin: 0; font-weight: bold;">
              ⚡ 빠른 연락을 위해 고객님께 전화 드리시기 바랍니다.
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              공항렌트24 - 24시간 인천공항 픽업 서비스
            </p>
          </div>
        </div>
      `,
    };

    // 이메일 전송
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: '이메일이 성공적으로 전송되었습니다.' });
  } catch (error) {
    console.error('이메일 전송 오류:', error);
    return NextResponse.json(
      { error: '이메일 전송에 실패했습니다.' },
      { status: 500 }
    );
  }
} 