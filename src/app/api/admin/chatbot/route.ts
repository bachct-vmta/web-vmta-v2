import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  let scripts: any[] = [];
  let logs: any[] = [];
  try {
    scripts = await prisma.$queryRawUnsafe(`SELECT * FROM ChatbotScript ORDER BY "order" ASC, id ASC;`);
  } catch {
    scripts = [];
  }

  try {
    logs = await prisma.$queryRawUnsafe(`SELECT * FROM ChatbotLog ORDER BY id DESC;`);
  } catch {
    logs = [];
  }

  return NextResponse.json({ scripts, logs });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, id, category, question_vi, question_en, answer_vi, answer_en, user_email, user_phone, user_message } = body;

    // Action 1: Add/Update Script
    if (action === 'save_script' || (!action && question_vi)) {
      if (id) {
        await prisma.$executeRawUnsafe(
          `UPDATE ChatbotScript SET category=?, question_vi=?, question_en=?, answer_vi=?, answer_en=? WHERE id=?;`,
          category || 'Chung', question_vi, question_en || question_vi, answer_vi, answer_en || answer_vi, id
        );
      } else {
        await prisma.$executeRawUnsafe(
          `INSERT INTO ChatbotScript (category, question_vi, question_en, answer_vi, answer_en) VALUES (?, ?, ?, ?, ?);`,
          category || 'Chung', question_vi, question_en || question_vi, answer_vi, answer_en || answer_vi
        );
      }
      return NextResponse.json({ success: true });
    }

    // Action 2: Human Live Chat Escalation
    if (action === 'log_escalation') {
      if (!user_email || !user_message) {
        return NextResponse.json({ error: 'Missing user_email or user_message' }, { status: 400 });
      }

      try {
        await prisma.$executeRawUnsafe(
          `INSERT INTO ChatbotLog (user_email, user_phone, user_message, bot_response, status) VALUES (?, ?, ?, ?, 'pending');`,
          user_email, user_phone || '', user_message, 'Yêu cầu tư vấn 1-1 qua Email đã được chuyển tới chuyên viên VMTA.'
        );
      } catch {}

      try {
        await prisma.$executeRawUnsafe(
          `INSERT INTO Inquiry (name, phone, email, service, message) VALUES (?, ?, ?, ?, ?);`,
          `Khách Chatbot (${user_email})`, user_phone || '', user_email, 'Chatbot Escalation', user_message
        );
      } catch {}

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error in chatbot API:', error);
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type');

    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    if (type === 'log') {
      await prisma.$executeRawUnsafe(`DELETE FROM ChatbotLog WHERE id = ?;`, id);
    } else {
      await prisma.$executeRawUnsafe(`DELETE FROM ChatbotScript WHERE id = ?;`, id);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting chatbot item:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
