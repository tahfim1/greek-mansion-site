'use client';

import { useState, useTransition, useRef, useMemo } from 'react';
import { createProduct, updateProduct, deleteProduct } from '@/app/admin/actions';

export default function ProductClient({ 
  initialProducts, 
  categories 
}: { 
  initialProducts: any[], 
  categories: any[] 
}) {
  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    basePriceStr: '', // UI state for dollars
    categoryId: '',
    status: 'DRAFT',
    isSoldOut: false,
    isFeatured: false,
    image: '',
  });

  const openNew = () => {
    setEditingProduct(null);
    setFormData({ 
      name: '', slug: '', shortDescription: '', fullDescription: '', 
      basePriceStr: '0.00', categoryId: categories[0]?.id || '', status: 'DRAFT', 
      isSoldOut: false, isFeatured: false, image: '' 
    });
    setIsModalOpen(true);
  };

  const openEdit = (prod: any) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      slug: prod.slug,
      shortDescription: prod.shortDescription || '',
      fullDescription: prod.fullDescription || '',
      basePriceStr: (prod.basePrice / 100).toFixed(2), // Cents to Dollars
      categoryId: prod.categoryId || '',
      status: prod.status,
      isSoldOut: prod.isSoldOut,
      isFeatured: prod.isFeatured,
      image: prod.images?.[0]?.url || '',
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setIsUploading(true);
    try {
      const response = await fetch(`/api/admin/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        body: file,
      });
      const data = await response.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, image: data.url }));
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      alert('Upload failed');
    }
    setIsUploading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      // Parse Dollar string back to Cents integer
      const parsedPrice = Math.round(parseFloat(formData.basePriceStr) * 100);
      const submissionData = {
        ...formData,
        basePrice: parsedPrice || 0,
      };

      let res;
      if (editingProduct) {
        res = await updateProduct(editingProduct.id, submissionData);
      } else {
        res = await createProduct(submissionData);
      }
      
      if (res.success) {
        window.location.reload();
      } else {
        alert(res.error);
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      startTransition(async () => {
        const res = await deleteProduct(id);
        if (res.success) {
          setProducts(products.filter(p => p.id !== id));
        } else {
          alert(res.error);
        }
      });
    }
  };

  // Group products by category
  const groupedProducts = useMemo(() => {
    const groups: Record<string, { category: any, items: any[] }> = {};
    
    // Initialize groups based on categories array
    categories.forEach(cat => {
      groups[cat.id] = { category: cat, items: [] };
    });
    // Fallback for uncategorized
    groups['uncategorized'] = { category: { id: 'uncategorized', name: 'Uncategorized', displayOrder: 999 }, items: [] };

    products.forEach(p => {
      const catId = p.categoryId || 'uncategorized';
      if (groups[catId]) {
        groups[catId].items.push(p);
      } else {
        groups['uncategorized'].items.push(p);
      }
    });

    // Convert to sorted array
    return Object.values(groups)
      .filter(g => g.items.length > 0)
      .sort((a, b) => a.category.displayOrder - b.category.displayOrder);
  }, [products, categories]);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>Products</h1>
          <p className="text-[#11102F]/60">Manage your menu items (Block View)</p>
        </div>
        <button onClick={openNew} className="bg-[#B18C56] text-white px-4 py-2 rounded shadow">
          + Add Product
        </button>
      </div>

      <div className="space-y-12">
        {groupedProducts.map(group => (
          <div key={group.category.id}>
            <div className="flex items-center gap-4 mb-6 border-b border-[#E8DCCB] pb-2">
              <h2 className="text-2xl text-[#1E1C59] font-bold" style={{ fontFamily: "'Marcellus', serif" }}>
                {group.category.name}
              </h2>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-bold">
                {group.items.length} items
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {group.items.map(p => (
                <div key={p.id} className="bg-white rounded-xl border border-[#E8DCCB] shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                  {p.images?.[0]?.url && (
                    <div className="relative h-40 bg-gray-100">
                      <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 flex gap-1">
                        {p.status === 'PUBLISHED' && <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">PUBLISHED</span>}
                        {p.status === 'DRAFT' && <span className="bg-yellow-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">DRAFT</span>}
                        {p.status === 'ARCHIVED' && <span className="bg-gray-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">ARCHIVED</span>}
                        {p.isSoldOut && <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">SOLD OUT</span>}
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4 flex flex-col flex-1">
                    {!p.images?.[0]?.url && (
                       <div className="flex justify-between items-start mb-2">
                          <div className="flex gap-1 flex-wrap">
                            {p.status === 'PUBLISHED' ? <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded">PUBLISHED</span> : <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-0.5 rounded">{p.status}</span>}
                            {p.isSoldOut && <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-0.5 rounded">SOLD OUT</span>}
                          </div>
                       </div>
                    )}
                    <h3 className="text-lg font-bold text-[#1E1C59] mb-1" style={{ fontFamily: "'Marcellus', serif" }}>{p.name}</h3>
                    <p className="text-sm font-bold text-[#B18C56] mb-3">${(p.basePrice / 100).toFixed(2)}</p>
                    <p className="text-[#11102F]/60 text-xs line-clamp-2 mb-4 flex-1">{p.shortDescription || p.fullDescription}</p>
                    
                    <div className="flex gap-2 pt-4 border-t border-[#E8DCCB] mt-auto">
                      <button onClick={() => openEdit(p)} className="flex-1 bg-[#F7F3EA] text-[#1E1C59] font-semibold py-1.5 rounded border border-[#E8DCCB] hover:bg-[#E8DCCB] transition-colors text-sm">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(p.id)} disabled={isPending} className="px-3 bg-red-50 text-red-600 font-semibold py-1.5 rounded border border-red-200 hover:bg-red-100 transition-colors text-sm disabled:opacity-50">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg border border-[#E8DCCB]">
            <p className="text-[#11102F]/50">No products found. Click "Add Product" to create one.</p>
          </div>
        )}
      </div>

      {/* Simplified Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            
            <div className="p-6 border-b border-[#E8DCCB] flex justify-between items-center bg-[#F7F3EA]">
              <h2 className="text-2xl text-[#1E1C59] font-bold" style={{ fontFamily: "'Marcellus', serif" }}>
                {editingProduct ? 'Edit Product' : 'New Product'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-black">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <form id="productForm" onSubmit={handleSubmit} className="space-y-6">
                
                {/* Basic Info */}
                <div>
                  <h3 className="text-lg font-bold text-[#1E1C59] mb-3 border-b border-[#E8DCCB] pb-1">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Name</label>
                      <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full form-input rounded border border-[#E8DCCB] p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Slug (URL friendly)</label>
                      <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full form-input rounded border border-[#E8DCCB] p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Price ($)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input required type="number" step="0.01" min="0" value={formData.basePriceStr} onChange={e => setFormData({...formData, basePriceStr: e.target.value})} className="w-full form-input rounded border border-[#E8DCCB] p-2 pl-8" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Category</label>
                      <select required value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="w-full form-select rounded border border-[#E8DCCB] p-2 bg-white">
                        <option value="" disabled>Select a category</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-[#1E1C59] mb-3 border-b border-[#E8DCCB] pb-1">Descriptions</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Short Description (Cards)</label>
                      <textarea value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} className="w-full form-input rounded border border-[#E8DCCB] p-2 h-16 text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Full Description (Menu Details Modal)</label>
                      <textarea value={formData.fullDescription} onChange={e => setFormData({...formData, fullDescription: e.target.value})} className="w-full form-input rounded border border-[#E8DCCB] p-2 h-24 text-sm" />
                      <p className="text-xs text-gray-500 mt-1">This detailed text appears when customers click "View Details" on the public menu.</p>
                    </div>
                  </div>
                </div>

                {/* Media */}
                <div>
                  <h3 className="text-lg font-bold text-[#1E1C59] mb-3 border-b border-[#E8DCCB] pb-1">Media</h3>
                  <div>
                    <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Product Image</label>
                    <div className="flex space-x-2">
                      <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="https://..." className="w-full form-input rounded border border-[#E8DCCB] p-2 text-sm" />
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 px-4 py-2 rounded border border-gray-300 whitespace-nowrap hover:bg-gray-200 text-sm font-semibold shadow-sm transition-colors">
                        {isUploading ? 'Uploading...' : 'Upload Image'}
                      </button>
                      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                    </div>
                    {formData.image && (
                      <div className="mt-3 relative w-48 h-32 rounded-lg border border-[#E8DCCB] overflow-hidden shadow-sm">
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => setFormData({...formData, image: ''})} className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:text-red-500">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Options */}
                <div>
                  <h3 className="text-lg font-bold text-[#1E1C59] mb-3 border-b border-[#E8DCCB] pb-1">Visibility & Status</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg border border-[#E8DCCB]">
                    <div>
                      <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Publish Status</label>
                      <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full form-select rounded border border-[#E8DCCB] p-2 bg-white">
                        <option value="PUBLISHED">Published</option>
                        <option value="DRAFT">Draft</option>
                        <option value="ARCHIVED">Archived</option>
                      </select>
                    </div>
                    <div className="flex flex-col justify-end pb-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} className="rounded text-[#B18C56] focus:ring-[#B18C56] w-5 h-5" />
                        <span className="text-sm font-bold text-[#1E1C59]">Featured on Home</span>
                      </label>
                    </div>
                    <div className="flex flex-col justify-end pb-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" checked={formData.isSoldOut} onChange={e => setFormData({...formData, isSoldOut: e.target.checked})} className="rounded text-[#B18C56] focus:ring-[#B18C56] w-5 h-5" />
                        <span className="text-sm font-bold text-red-600">Mark as Sold Out</span>
                      </label>
                    </div>
                  </div>
                </div>
                
              </form>
            </div>

            <div className="p-6 border-t border-[#E8DCCB] flex justify-end gap-3 bg-[#F7F3EA]">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-lg border border-[#E8DCCB] text-[#11102F] font-semibold hover:bg-white transition-colors bg-transparent">
                Cancel
              </button>
              <button type="submit" form="productForm" disabled={isPending || isUploading} className="bg-[#B18C56] text-white px-8 py-2.5 rounded-lg shadow font-semibold hover:bg-[#C9A872] transition-colors disabled:opacity-50">
                {isPending ? 'Saving...' : 'Save Product'}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
