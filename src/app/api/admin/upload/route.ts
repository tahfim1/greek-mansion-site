import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import sharp from 'sharp';

const prisma = new PrismaClient();

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  let filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  if (!request.body) {
    return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
  }

  try {
    // Read the array buffer from the request
    const arrayBuffer = await request.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Optimize image to WebP using sharp
    const optimizedBuffer = await sharp(buffer)
      .webp({ quality: 80 }) // High compression with excellent visual quality
      .toBuffer();

    // Change filename extension to .webp
    const filenameWithoutExt = filename.substring(0, filename.lastIndexOf('.')) || filename;
    const webpFilename = `${filenameWithoutExt}.webp`;
    
    // Upload directly to Vercel Blob
    const blob = await put(webpFilename, optimizedBuffer, {
      access: 'public',
      addRandomSuffix: true,
      contentType: 'image/webp'
    });
    
    // Store reference in Prisma
    const mediaAsset = await prisma.mediaAsset.create({
      data: {
        url: blob.url,
        publicId: blob.url, // Vercel Blob uses the URL for identification/deletion
        altText: webpFilename,
        mimeType: 'image/webp',
        sizeBytes: optimizedBuffer.length,
      }
    });

    return NextResponse.json({ ...blob, mediaId: mediaAsset.id });
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error);
    return NextResponse.json({ error: 'Failed to process and upload image' }, { status: 500 });
  }
}
