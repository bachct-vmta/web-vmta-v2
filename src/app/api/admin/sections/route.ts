import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page_slug = searchParams.get('page_slug') || 'home';

    const rawSections: any[] = await prisma.$queryRawUnsafe(
      `SELECT 
        s.id as section_id,
        s.page_slug,
        s.section_key,
        s."order" as section_order,
        s.is_active,
        t.locale,
        t.title,
        t.subtitle,
        t.body,
        t.extra_json
      FROM CmsSection s
      LEFT JOIN CmsSectionTranslation t ON s.id = t.section_id
      WHERE s.page_slug = ?
      ORDER BY s."order" ASC, s.id ASC;`,
      page_slug
    );

    const sectionsMap = new Map<string, any>();

    (rawSections || []).forEach((row) => {
      if (!sectionsMap.has(row.section_key)) {
        sectionsMap.set(row.section_key, {
          id: row.section_id,
          page_slug: row.page_slug,
          section_key: row.section_key,
          order: row.section_order || 0,
          is_active: row.is_active ?? true,
          translations: [],
        });
      }
      if (row.locale) {
        sectionsMap.get(row.section_key).translations.push({
          locale: row.locale,
          title: row.title || '',
          subtitle: row.subtitle || '',
          body: row.body || '',
          extra_json: row.extra_json,
        });
      }
    });

    return NextResponse.json({ sections: Array.from(sectionsMap.values()) });
  } catch (error) {
    console.error('Error fetching sections:', error);
    return NextResponse.json({ sections: [] });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { page_slug, section_key, order, vi, en } = body;

    if (!page_slug || !section_key) {
      return NextResponse.json({ error: 'Missing page_slug or section_key' }, { status: 400 });
    }

    const setOrder = order !== undefined ? order : 1;

    // Check if section exists (ANSI SQL compatible with PostgreSQL & SQLite)
    let existingSections: any[] = await prisma.$queryRawUnsafe(
      `SELECT id FROM CmsSection WHERE page_slug = ? AND section_key = ? LIMIT 1;`,
      page_slug,
      section_key
    );

    let sectionId: number;

    if (existingSections && existingSections.length > 0) {
      sectionId = existingSections[0].id;
      await prisma.$executeRawUnsafe(
        `UPDATE CmsSection SET "order" = ? WHERE id = ?;`,
        setOrder,
        sectionId
      );
    } else {
      await prisma.$executeRawUnsafe(
        `INSERT INTO CmsSection (page_slug, section_key, "order") VALUES (?, ?, ?);`,
        page_slug,
        section_key,
        setOrder
      );
      const newlyCreated: any[] = await prisma.$queryRawUnsafe(
        `SELECT id FROM CmsSection WHERE page_slug = ? AND section_key = ? LIMIT 1;`,
        page_slug,
        section_key
      );
      sectionId = newlyCreated[0].id;
    }

    // Helper for Upserting Translation (compatible with PostgreSQL & SQLite)
    const upsertTranslation = async (locale: string, langData: any) => {
      if (!langData) return;
      const extraJsonStr = langData.extra_json ? JSON.stringify(langData.extra_json) : null;
      const title = langData.title || '';
      const subtitle = langData.subtitle || '';
      const bodyText = langData.body || '';

      const existingTrans: any[] = await prisma.$queryRawUnsafe(
        `SELECT id FROM CmsSectionTranslation WHERE section_id = ? AND locale = ? LIMIT 1;`,
        sectionId,
        locale
      );

      if (existingTrans && existingTrans.length > 0) {
        await prisma.$executeRawUnsafe(
          `UPDATE CmsSectionTranslation SET title = ?, subtitle = ?, body = ?, extra_json = ? WHERE section_id = ? AND locale = ?;`,
          title,
          subtitle,
          bodyText,
          extraJsonStr,
          sectionId,
          locale
        );
      } else {
        await prisma.$executeRawUnsafe(
          `INSERT INTO CmsSectionTranslation (section_id, locale, title, subtitle, body, extra_json) VALUES (?, ?, ?, ?, ?, ?);`,
          sectionId,
          locale,
          title,
          subtitle,
          bodyText,
          extraJsonStr
        );
      }
    };

    if (vi) await upsertTranslation('vi', vi);
    if (en) await upsertTranslation('en', en);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving section:', error);
    return NextResponse.json({ error: 'Failed to save section' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page_slug = searchParams.get('page_slug');
    const section_key = searchParams.get('section_key');

    if (!page_slug || !section_key) {
      return NextResponse.json({ error: 'Missing page_slug or section_key' }, { status: 400 });
    }

    await prisma.$executeRawUnsafe(
      `DELETE FROM CmsSection WHERE page_slug = ? AND section_key = ?;`,
      page_slug,
      section_key
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting section:', error);
    return NextResponse.json({ error: 'Failed to delete section' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { page_slug, ordered_keys } = body;

    if (!page_slug || !Array.isArray(ordered_keys)) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    for (let idx = 0; idx < ordered_keys.length; idx++) {
      const key = ordered_keys[idx];
      await prisma.$executeRawUnsafe(
        `UPDATE CmsSection SET "order" = ? WHERE page_slug = ? AND section_key = ?;`,
        idx + 1,
        page_slug,
        key
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error reordering sections:', error);
    return NextResponse.json({ error: 'Failed to reorder sections' }, { status: 500 });
  }
}
