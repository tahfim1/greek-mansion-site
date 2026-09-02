'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function MediaGallery({ initialMedia }: { initialMedia: any[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (initialMedia.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-[#E8DCCB] p-12 text-center">
        <p className="text-[#11102F]/60">No media uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {initialMedia.map((media) => (
        <div key={media.id} className="bg-white rounded-lg shadow-sm border border-[#E8DCCB] overflow-hidden flex flex-col">
          <div className="relative aspect-square bg-gray-100 w-full overflow-hidden">
            {media.url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) || media.mimeType.startsWith('image/') ? (
              <Image 
                src={media.url} 
                alt={media.altText || 'Media asset'} 
                fill 
                className="object-contain"
                sizes="(max-width: 768px) 50vw, 25vw"
                unoptimized // Let Vercel Blob handle optimization if needed
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span>File</span>
              </div>
            )}
          </div>
          <div className="p-3 border-t border-[#E8DCCB] flex flex-col gap-2">
            <p className="text-xs text-[#1E1C59] font-medium truncate" title={media.altText || media.url}>
              {media.altText || 'Unnamed asset'}
            </p>
            <button
              onClick={() => copyToClipboard(media.url, media.id)}
              className="text-xs py-1.5 px-2 rounded border border-[#E8DCCB] bg-[#F7F3EA] text-[#1E1C59] font-medium hover:bg-[#E8DCCB] transition-colors"
            >
              {copiedId === media.id ? 'Copied!' : 'Copy URL'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
