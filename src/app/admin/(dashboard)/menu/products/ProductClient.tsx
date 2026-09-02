'use client';

import { useState, useTransition, useRef } from 'react';
import { createProduct, updateProduct, deleteProduct } from '@/app/admin/actions';
import { formatPrice } from '@/data/menu';

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
    basePrice: 0,
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
      basePrice: 0, categoryId: categories[0]?.id || '', status: 'DRAFT', 
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
      basePrice: prod.basePrice,
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
      let res;
      if (editingProduct) {
        res = await updateProduct(editingProduct.id, formData);
      } else {
        res = await createProduct(formData);
      }
      
      if (res.success) {
        // Just reload the page to get the fresh data easily with the new relation fields
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

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>Products</h1>
          <p className="text-[#11102F]/60">Manage your menu items</p>
        </div>
        <button onClick={openNew} className="bg-[#B18C56] text-white px-4 py-2 rounded shadow">
          + Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#E8DCCB] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F7F3EA] border-b border-[#E8DCCB]">
              <th className="p-4 text-sm font-bold text-[#1E1C59] uppercase tracking-wider">Name</th>
              <th className="p-4 text-sm font-bold text-[#1E1C59] uppercase tracking-wider">Category</th>
              <th className="p-4 text-sm font-bold text-[#1E1C59] uppercase tracking-wider">Price</th>
              <th className="p-4 text-sm font-bold text-[#1E1C59] uppercase tracking-wider">Status</th>
              <th className="p-4 text-sm font-bold text-[#1E1C59] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-[#E8DCCB] hover:bg-gray-50">
                <td className="p-4 font-medium text-[#1E1C59]">
                  <div className="flex items-center space-x-3">
                    {p.images?.[0]?.url && (
                      <img src={p.images[0].url} alt={p.name} className="w-10 h-10 object-cover rounded" />
                    )}
                    <span>{p.name}</span>
                  </div>
                </td>
                <td className="p-4 text-[#11102F]/60">{p.category?.name || 'Uncategorized'}</td>
                <td className="p-4 text-[#11102F]/60">{formatPrice(p.basePrice)}</td>
                <td className="p-4 text-[#11102F]/60">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    p.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
                    p.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {p.status}
                  </span>
                  {p.isSoldOut && <span className="ml-2 px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Sold Out</span>}
                </td>
                <td className="p-4">
                  <button onClick={() => openEdit(p)} className="text-[#B18C56] font-semibold text-sm mr-4 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600 font-semibold text-sm hover:underline disabled:opacity-50" disabled={isPending}>Delete</button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-[#11102F]/50">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl text-[#1E1C59] mb-4" style={{ fontFamily: "'Marcellus', serif" }}>
              {editingProduct ? 'Edit Product' : 'New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full form-input rounded border border-[#E8DCCB] p-2" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Slug (URL friendly)</label>
                  <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full form-input rounded border border-[#E8DCCB] p-2" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Price (in cents, e.g. $9.95 = 995)</label>
                  <input required type="number" min="0" value={formData.basePrice} onChange={e => setFormData({...formData, basePrice: parseInt(e.target.value)})} className="w-full form-input rounded border border-[#E8DCCB] p-2" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Category</label>
                  <select required value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="w-full form-select rounded border border-[#E8DCCB] p-2 bg-white">
                    <option value="" disabled>Select a category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Short Description</label>
                <textarea value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} className="w-full form-input rounded border border-[#E8DCCB] p-2 h-16" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Image URL</label>
                <div className="flex space-x-2">
                  <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="https://..." className="w-full form-input rounded border border-[#E8DCCB] p-2" />
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-gray-100 px-4 py-2 rounded border border-gray-300 whitespace-nowrap hover:bg-gray-200">
                    {isUploading ? 'Uploading...' : 'Upload Image'}
                  </button>
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                </div>
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="mt-2 h-32 object-cover rounded border border-[#E8DCCB]" />
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-[#E8DCCB] pt-4">
                <div>
                  <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full form-select rounded border border-[#E8DCCB] p-2 bg-white">
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} className="rounded text-[#B18C56] focus:ring-[#B18C56]" />
                    <span className="text-sm font-semibold text-[#1E1C59]">Featured</span>
                  </label>
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={formData.isSoldOut} onChange={e => setFormData({...formData, isSoldOut: e.target.checked})} className="rounded text-[#B18C56] focus:ring-[#B18C56]" />
                    <span className="text-sm font-semibold text-[#1E1C59]">Sold Out</span>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded border border-[#E8DCCB] text-[#11102F]">Cancel</button>
                <button type="submit" disabled={isPending || isUploading} className="bg-[#B18C56] text-white px-4 py-2 rounded shadow disabled:opacity-50">
                  {isPending ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
