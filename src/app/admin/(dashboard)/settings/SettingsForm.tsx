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
    </>
  );
}
