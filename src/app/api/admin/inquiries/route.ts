import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const inquiries: any[] = await prisma.$queryRawUnsafe(`SELECT * FROM Inquiry ORDER BY id DESC;`);
    return NextResponse.json({ inquiries });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json({ inquiries: [] });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, full_name, phone, email, service, organization, message, content } = body;

    const finalName = name || full_name;
    if (!finalName) {
      return NextResponse.json({ error: 'Missing name' }, { status: 400 });
    }

    const finalService = service || organization || 'Tư vấn chung';
    const finalMessage = message || content || '';

    await prisma.$executeRawUnsafe(
      `INSERT INTO Inquiry (name, phone, email, service, message, status) VALUES (?, ?, ?, ?, ?, ?);`,
      finalName, phone || '', email || '', finalService, finalMessage, 'pending'
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json({ error: 'Failed to create inquiry' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }

    await prisma.$executeRawUnsafe(`UPDATE Inquiry SET status = ? WHERE id = ?;`, status, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    await prisma.$executeRawUnsafe(`DELETE FROM Inquiry WHERE id = ?;`, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
