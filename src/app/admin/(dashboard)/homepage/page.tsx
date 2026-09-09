'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type Category = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
};

export default function HomepageSettingsPage() {
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  const [featuredIds, setFeaturedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/homepage')
      .then(res => res.json())
      .then(data => {
        if (data.availableCategories) {
          setAvailableCategories(data.availableCategories);
        }
        if (data.featuredCategoryIds) {
          setFeaturedIds(data.featuredCategoryIds);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    try {
      const res = await fetch('/api/admin/homepage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featuredCategoryIds: featuredIds })
      });
      if (res.ok) {
        setSaveMessage('Saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage('Failed to save.');
      }
    } catch (error) {
      setSaveMessage('An error occurred.');
    } finally {
      setIsSaving(false);
    }
  };

  const addCategory = (id: string) => {
    if (!featuredIds.includes(id)) {
      setFeaturedIds([...featuredIds, id]);
    }
  };

  const removeCategory = (id: string) => {
    setFeaturedIds(featuredIds.filter(fId => fId !== id));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newIds = [...featuredIds];
    const temp = newIds[index - 1];
    newIds[index - 1] = newIds[index];
    newIds[index] = temp;
    setFeaturedIds(newIds);
  };

  const moveDown = (index: number) => {
    if (index === featuredIds.length - 1) return;
    const newIds = [...featuredIds];
    const temp = newIds[index + 1];
    newIds[index + 1] = newIds[index];
    newIds[index] = temp;
    setFeaturedIds(newIds);
  };

  if (isLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>Homepage Sections</h1>
          <p className="text-[#11102F]/60 mt-2">Manage the vertical scroll sections on the home page.</p>
        </div>
        <div className="flex items-center gap-4">
          {saveMessage && (
            <span className={saveMessage.includes('success') ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
              {saveMessage}
            </span>
          )}
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-[#D4AF37] text-white px-6 py-2 rounded shadow hover:bg-[#AA8B24] transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Available Categories */}
        <div className="bg-white rounded border border-[#E8DCCB] shadow-sm overflow-hidden flex flex-col h-[600px]">
          <div className="bg-[#F7F3EA] border-b border-[#E8DCCB] p-4 font-bold text-[#1E1C59]">
            Available Menu Categories
          </div>
          <div className="p-4 overflow-y-auto flex-1">
            {availableCategories.filter(cat => !featuredIds.includes(cat.id)).map(cat => (
              <div key={cat.id} className="flex justify-between items-center p-3 mb-2 border border-gray-200 rounded hover:border-[#D4AF37] transition-colors">
                <span className="font-semibold text-[#1E1C59]">{cat.name}</span>
                <button 
                  onClick={() => addCategory(cat.id)}
                  className="bg-[#1E1C59] text-white text-sm px-3 py-1 rounded hover:bg-[#2A2870]"
                >
                  Add to Homepage
                </button>
              </div>
            ))}
            {availableCategories.filter(cat => !featuredIds.includes(cat.id)).length === 0 && (
              <p className="text-gray-500 text-center py-8">All available categories are already featured.</p>
            )}
          </div>
        </div>

        {/* Featured Categories (Selected) */}
        <div className="bg-white rounded border border-[#D4AF37] shadow-sm overflow-hidden flex flex-col h-[600px]">
          <div className="bg-white border-b border-[#D4AF37] p-4 font-bold text-[#1E1C59] flex justify-between">
            <span>Featured on Homepage (Vertical Scroll)</span>
            <span className="text-[#D4AF37] bg-[#F7F3EA] px-2 py-0.5 rounded text-sm">{featuredIds.length} sections</span>
          </div>
          <div className="p-4 overflow-y-auto flex-1">
            {featuredIds.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 p-8">
                <p>No categories selected.</p>
                <p className="text-sm">Add categories from the left panel to feature them on the homepage.</p>
              </div>
            ) : (
              featuredIds.map((id, index) => {
                const cat = availableCategories.find(c => c.id === id);
                if (!cat) return null;
                return (
                  <motion.div 
                    layout 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={cat.id} 
                    className="flex justify-between items-center p-3 mb-3 bg-white border border-[#E8DCCB] rounded shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-[#1E1C59] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="font-bold text-[#1E1C59] text-lg">{cat.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => { e.preventDefault(); moveUp(index); }}
                        disabled={index === 0}
                        className="p-2.5 rounded-lg bg-[#F7F3EA] text-[#1E1C59] hover:bg-[#E8DCCB] disabled:opacity-30 disabled:hover:bg-[#F7F3EA] transition-colors flex items-center justify-center cursor-pointer"
                        title="Move up"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
                      </button>
                      <button 
                        onClick={(e) => { e.preventDefault(); moveDown(index); }}
                        disabled={index === featuredIds.length - 1}
                        className="p-2.5 rounded-lg bg-[#F7F3EA] text-[#1E1C59] hover:bg-[#E8DCCB] disabled:opacity-30 disabled:hover:bg-[#F7F3EA] transition-colors flex items-center justify-center cursor-pointer"
                        title="Move down"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                      </button>
                      
                      <button 
                        onClick={(e) => { e.preventDefault(); removeCategory(cat.id); }}
                        className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors font-bold ml-2 border border-transparent hover:border-red-200 cursor-pointer"
                        title="Remove"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
