import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'bl0iakcy';
    const apiKey = process.env.CLOUDINARY_API_KEY || '666979872525556';
    const apiSecret = process.env.CLOUDINARY_API_SECRET || 't8sUu9K2ivRBu5nWzDkYU5dz5C0';
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || 'ml_default';

    let fileUrl = '';
    let isCloud = false;

    // OPTION 2: Upload directly to Cloudinary CDN
    if (cloudName && cloudName !== 'demo') {
      try {
        const timestamp = Math.floor(Date.now() / 1000);
        
        // Signed upload payload
        if (apiKey && apiSecret) {
          const paramsToSign = `timestamp=${timestamp}`;
          const signature = crypto
            .createHash('sha1')
            .update(paramsToSign + apiSecret)
            .digest('hex');

          const cloudinaryData = new FormData();
          cloudinaryData.append('file', file);
          cloudinaryData.append('api_key', apiKey);
          cloudinaryData.append('timestamp', timestamp.toString());
          cloudinaryData.append('signature', signature);

          const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: cloudinaryData,
          });

          if (cloudRes.ok) {
            const cloudResult = await cloudRes.json();
            if (cloudResult.secure_url) {
              fileUrl = cloudResult.secure_url;
              isCloud = true;
            }
          }
        }

        // Fallback to Unsigned Preset if signed upload returned error
        if (!fileUrl) {
          const presetsToTry = [uploadPreset, 'ml_default', 'unsigned_preset', 'preset_vmta'];
          for (const preset of presetsToTry) {
            if (!preset) continue;
            const unsignedData = new FormData();
            unsignedData.append('file', file);
            unsignedData.append('upload_preset', preset);

            const unsignedRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
              method: 'POST',
              body: unsignedData,
            });

            if (unsignedRes.ok) {
              const result = await unsignedRes.json();
              if (result.secure_url) {
                fileUrl = result.secure_url;
                isCloud = true;
                break;
              }
            }
          }
        }
      } catch (cloudErr) {
        console.warn('Cloudinary upload warning:', cloudErr);
      }
    }

    // DEV Fallback Local Storage if Cloud Upload failed
    if (!fileUrl) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await mkdir(uploadDir, { recursive: true });

      const safeName = `${Date.now()}-${file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-')}`;
      const filePath = path.join(uploadDir, safeName);

      await writeFile(filePath, buffer);

      fileUrl = `/uploads/${safeName}`;
    }

    // Record to MediaAsset table in CSDL
    try {
      await prisma.$executeRawUnsafe(
        `INSERT INTO MediaAsset (filename, url, mime_type, size_bytes) VALUES (?, ?, ?, ?);`,
        file.name, fileUrl, file.type || 'image/png', file.size || 0
      );
    } catch (dbErr) {
      console.warn('Failed to insert into MediaAsset table:', dbErr);
    }

    return NextResponse.json({ success: true, url: fileUrl, isCloud });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
