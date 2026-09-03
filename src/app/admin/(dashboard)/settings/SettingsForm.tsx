'use client';

import { useState, useTransition } from 'react';
import { saveSettings } from '@/app/admin/actions';

export default function SettingsForm({ initialConfig }: { initialConfig: Record<string, string> }) {
  const [config, setConfig] = useState(initialConfig);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const handleChange = (key: string, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setStatus('saving');
    startTransition(async () => {
      const res = await saveSettings(config);
      if (res.success) {
        setStatus('success');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        console.error(res.error);
      }
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>Settings</h1>
          <p className="text-[#11102F]/60">Manage restaurant business info and configuration</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={isPending}
          className="bg-[#B18C56] text-white px-4 py-2 rounded shadow disabled:opacity-50"
        >
          {isPending ? 'Saving...' : status === 'success' ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#E8DCCB] p-6 max-w-3xl">
        <h2 className="text-xl font-bold text-[#1E1C59] mb-4">Business Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Restaurant Name</label>
            <input 
              type="text" 
              value={config['BUSINESS_NAME'] || ''} 
              onChange={e => handleChange('BUSINESS_NAME', e.target.value)}
              className="w-full form-input rounded border border-[#E8DCCB] p-2" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Phone Number</label>
            <input 
              type="text" 
              value={config['BUSINESS_PHONE'] || ''} 
              onChange={e => handleChange('BUSINESS_PHONE', e.target.value)}
              className="w-full form-input rounded border border-[#E8DCCB] p-2" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Address</label>
            <input 
              type="text" 
              value={config['BUSINESS_ADDRESS'] || ''} 
              onChange={e => handleChange('BUSINESS_ADDRESS', e.target.value)}
              className="w-full form-input rounded border border-[#E8DCCB] p-2" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Takeout Instructions</label>
            <textarea 
              value={config['TAKEOUT_INSTRUCTIONS'] || ''} 
              onChange={e => handleChange('TAKEOUT_INSTRUCTIONS', e.target.value)}
              className="w-full form-input rounded border border-[#E8DCCB] p-2 h-24" 
            />
          </div>
        </div>
        
        {status === 'error' && (
          <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
            Failed to save settings. Please try again.
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#E8DCCB] p-6 max-w-3xl mt-8">
        <h2 className="text-xl font-bold text-[#1E1C59] mb-4">Homepage Food Gallery</h2>
        <p className="text-sm text-[#11102F]/60 mb-6">Manage the image mosaic displayed on the homepage. You can copy image URLs from your Media Library.</p>
        
        <div className="space-y-4">
          {(() => {
            let gallery: {src: string, alt: string}[] = [];
            try {
              if (config['HOMEPAGE_GALLERY']) gallery = JSON.parse(config['HOMEPAGE_GALLERY']);
            } catch (e) {}

            return (
              <>
                {gallery.map((img, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-[#F7F3EA] p-4 rounded border border-[#E8DCCB]">
                    {img.src && (
                      <div className="w-16 h-16 shrink-0 relative rounded overflow-hidden bg-gray-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 space-y-2 w-full">
                      <input 
                        type="text" 
                        placeholder="Image URL"
                        value={img.src} 
                        onChange={e => {
                          const newGallery = [...gallery];
                          newGallery[idx].src = e.target.value;
                          handleChange('HOMEPAGE_GALLERY', JSON.stringify(newGallery));
                        }}
                        className="w-full form-input rounded border border-[#E8DCCB] p-2 text-sm" 
                      />
                      <input 
                        type="text" 
                        placeholder="Alt Text (e.g. Greek Salad)"
                        value={img.alt} 
                        onChange={e => {
                          const newGallery = [...gallery];
                          newGallery[idx].alt = e.target.value;
                          handleChange('HOMEPAGE_GALLERY', JSON.stringify(newGallery));
                        }}
                        className="w-full form-input rounded border border-[#E8DCCB] p-2 text-sm" 
                      />
                    </div>
                    <button 
                      onClick={() => {
                        const newGallery = gallery.filter((_, i) => i !== idx);
                        handleChange('HOMEPAGE_GALLERY', JSON.stringify(newGallery));
                      }}
                      className="text-red-600 hover:text-red-800 p-2 font-medium text-sm whitespace-nowrap"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                
                <button
                  onClick={() => {
                    const newGallery = [...gallery, { src: '', alt: '' }];
                    handleChange('HOMEPAGE_GALLERY', JSON.stringify(newGallery));
                  }}
                  className="mt-4 px-4 py-2 border-2 border-dashed border-[#B18C56] text-[#B18C56] font-medium rounded hover:bg-[#F7F3EA] w-full"
                >
                  + Add Another Image
                </button>
              </>
            );
          })()}
        </div>
      </div>
    </>
  );
}
