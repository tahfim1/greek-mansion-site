'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function MediaUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputFileRef.current?.files?.length) {
      setError('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    setError('');

    const file = inputFileRef.current.files[0];

    try {
      const response = await fetch(
        `/api/admin/upload?filename=${encodeURIComponent(file.name)}`,
        {
          method: 'POST',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload image');
      }

      // Reset form and refresh page to show new image
      if (inputFileRef.current) inputFileRef.current.value = '';
      router.refresh();
      
    } catch (err: any) {
      setError(err.message || 'An error occurred during upload');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E8DCCB] mb-8">
      <h2 className="text-xl font-bold text-[#1E1C59] mb-4">Upload New Media</h2>
      <form onSubmit={handleUpload} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <input 
          type="file" 
          ref={inputFileRef} 
          accept="image/*"
          required 
          className="flex-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-[#F7F3EA] file:text-[#1E1C59]
            hover:file:bg-[#E8DCCB] transition-colors"
        />
        <button 
          type="submit" 
          disabled={isUploading}
          className="bg-[#B18C56] text-white px-6 py-2 rounded shadow font-semibold hover:bg-[#8A6A40] disabled:opacity-50 transition-colors whitespace-nowrap"
        >
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
    </div>
  );
}
