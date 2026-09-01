import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, service, message, honeypot } = body;

    // Honeypot anti-spam check
    if (honeypot) {
      return NextResponse.json({ success: true, message: 'Form submitted successfully' });
    }

    if (!name || !phone) {
      return NextResponse.json({ error: 'Họ tên và số điện thoại là bắt buộc' }, { status: 400 });
    }

    // Insert into Inquiry table using ANSI SQL compatible with PostgreSQL & SQLite
    await prisma.$executeRawUnsafe(
      `INSERT INTO Inquiry (name, phone, email, service, message, status) VALUES (?, ?, ?, ?, ?, ?);`,
      name, phone, email || '', service || 'Tư vấn chung', message || '', 'pending'
    );

    return NextResponse.json({
      success: true,
      message: 'Gửi yêu cầu tư vấn thành công! Đội ngũ chuyên gia VMTA sẽ liên hệ lại với bạn trong thời gian sớm nhất.',
    });
  } catch (error: unknown) {
    console.error('Error submitting inquiry:', error);
    const errMessage = error instanceof Error ? error.message : 'Lỗi hệ thống khi gửi yêu cầu';
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}
