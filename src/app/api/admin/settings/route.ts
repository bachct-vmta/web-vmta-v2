import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

async function ensureSettingTable() {
  try {
    // For SQLite
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS Setting (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT UNIQUE NOT NULL,
        value TEXT,
        type TEXT DEFAULT 'string',
        "group" TEXT DEFAULT 'general',
        created_at DATETIME,
        updated_at DATETIME
      );
    `);
  } catch {
    try {
      // For PostgreSQL
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "Setting" (
          id SERIAL PRIMARY KEY,
          key VARCHAR(255) UNIQUE NOT NULL,
          value TEXT,
          type VARCHAR(50) DEFAULT 'string',
          "group" VARCHAR(50) DEFAULT 'general',
          created_at TIMESTAMP,
          updated_at TIMESTAMP
        );
      `);
    } catch (e) {
      console.warn('Could not auto-create Setting table:', e);
    }
  }
}

export async function GET() {
  try {
    await ensureSettingTable();

    const rawSettings: any[] = await prisma.$queryRawUnsafe(`SELECT key, value FROM Setting;`);
    const settingsMap: Record<string, string> = {
      site_name: 'Vietnam Medical Tourism Alliance',
      site_hotline: '1900-1234',
      site_address: '193 Trích Sài, Phường Tây Hồ, Hà Nội',
      site_branch_address: 'Chi nhánh VMTA',
      site_support_email: 'vmta@vmta.vn',
      social_facebook: '#',
      social_instagram: '#',
      social_youtube: '#',
      social_tiktok: '#',
      bo_cong_thuong_badge: '/images/home/footer/vmta-bo-y-te-badge.png',
    };

    if (rawSettings && Array.isArray(rawSettings)) {
      rawSettings.forEach((row) => {
        if (row.key) settingsMap[row.key] = row.value || '';
      });
    }

    return NextResponse.json({ settings: settingsMap });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({
      settings: {
        site_name: 'Vietnam Medical Tourism Alliance',
        site_hotline: '1900-1234',
        site_address: '193 Trích Sài, Phường Tây Hồ, Hà Nội',
        site_branch_address: 'Chi nhánh VMTA',
        site_support_email: 'vmta@vmta.vn',
        social_facebook: '#',
        social_instagram: '#',
        social_youtube: '#',
        social_tiktok: '#',
        bo_cong_thuong_badge: '/images/home/footer/vmta-bo-y-te-badge.png',
      },
    });
  }
}

export async function POST(req: Request) {
  try {
    await ensureSettingTable();

    const body = await req.json();
    const settingsObj: Record<string, string> = body.settings || {};

    for (const [key, value] of Object.entries(settingsObj)) {
      const existing: any[] = await prisma.$queryRawUnsafe(
        `SELECT id FROM Setting WHERE key = ? LIMIT 1;`,
        key
      );

      if (existing && existing.length > 0) {
        await prisma.$executeRawUnsafe(
          `UPDATE Setting SET value = ? WHERE key = ?;`,
          value || '', key
        );
      } else {
        await prisma.$executeRawUnsafe(
          `INSERT INTO Setting (key, value, type, "group") VALUES (?, ?, 'string', 'general');`,
          key, value || ''
        );
      }
    }

    return NextResponse.json({ success: true, message: 'Đã lưu cấu hình website thành công!' });
  } catch (error: any) {
    console.error('Error saving settings:', error);
    return NextResponse.json({ error: error.message || 'Lỗi khi lưu cấu hình' }, { status: 500 });
  }
}
