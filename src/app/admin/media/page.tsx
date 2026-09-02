import { PrismaClient } from '@prisma/client';
import MediaUploader from '@/components/admin/MediaUploader';
import MediaGallery from '@/components/admin/MediaGallery';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function MediaAdmin() {
  const media = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>Media Library</h1>
        <p className="text-[#11102F]/60">Upload and manage images for your menu and homepage</p>
      </div>

      <MediaUploader />
      
      <MediaGallery initialMedia={media} />
    </div>
  );
}
