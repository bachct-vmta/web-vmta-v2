import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    let dbAssets: any[] = [];
    try {
      dbAssets = await prisma.$queryRawUnsafe(`SELECT * FROM MediaAsset ORDER BY id DESC;`);
    } catch (e) {
      console.warn('MediaAsset query warning:', e);
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const useCloudStorage = process.env.USE_CLOUD_STORAGE === 'true';

    let cloudAssets: any[] = [];

    // Fetch live images directly from Cloudinary Admin API if credentials present
    if (useCloudStorage && cloudName && apiKey && apiSecret && cloudName !== 'demo') {
      try {
        const authString = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/resources/image?max_results=100`, {
          headers: {
            Authorization: `Basic ${authString}`,
          },
        });

        if (res.ok) {
          const cloudData = await res.json();
          if (cloudData.resources && Array.isArray(cloudData.resources)) {
            cloudAssets = cloudData.resources.map((r: any) => ({
              id: r.public_id,
              filename: r.public_id.split('/').pop() + '.' + r.format,
              url: r.secure_url,
              mime_type: `image/${r.format}`,
              size_bytes: r.bytes || 0,
              created_at: r.created_at,
              is_cloud_direct: true,
            }));
          }
        }
      } catch (cloudErr) {
        console.warn('Cloudinary fetch warning:', cloudErr);
      }
    }

    // Merge CSDL assets and Cloudinary direct assets uniquely by URL
    const urlSet = new Set<string>();
    const mergedAssets: any[] = [];

    [...cloudAssets, ...(dbAssets || [])].forEach((asset) => {
      if (asset.url && !urlSet.has(asset.url)) {
        urlSet.add(asset.url);
        mergedAssets.push(asset);
      }
    });

    return NextResponse.json({ assets: mergedAssets });
  } catch (error) {
    console.error('Error fetching media assets:', error);
    return NextResponse.json({ assets: [] });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    try {
      await prisma.$executeRawUnsafe(`DELETE FROM MediaAsset WHERE id = ?;`, id);
    } catch (dbErr) {
      console.warn('Delete from DB warning:', dbErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting media asset:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
