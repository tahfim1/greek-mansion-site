'use client';

import { useState, useTransition } from 'react';
import { createCategory, updateCategory, deleteCategory } from '@/app/admin/actions';

export default function CategoryClient({ initialCategories }: { initialCategories: any[] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    displayOrder: 0,
    isHidden: false,
  });

  const openNew = () => {
    setEditingCategory(null);
    setFormData({ name: '', slug: '', description: '', image: '', displayOrder: categories.length, isHidden: false });
    setIsModalOpen(true);
  };

  const openEdit = (cat: any) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      image: cat.image || '',
      displayOrder: cat.displayOrder,
      isHidden: cat.isHidden,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      let res;
      if (editingCategory) {
        res = await updateCategory(editingCategory.id, formData);
      } else {
        res = await createCategory(formData);
      }
      
      if (res.success) {
        if (editingCategory) {
          setCategories(categories.map(c => c.id === editingCategory.id ? res.category : c));
        } else {
          setCategories([...categories, res.category]);
        }
        setIsModalOpen(false);
      } else {
        alert(res.error);
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category? All products in this category might be affected.')) {
      startTransition(async () => {
        const res = await deleteCategory(id);
        if (res.success) {
          setCategories(categories.filter(c => c.id !== id));
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
          <h1 className="text-3xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>Categories</h1>
          <p className="text-[#11102F]/60">Manage your menu categories</p>
        </div>
        <button onClick={openNew} className="bg-[#B18C56] text-white px-4 py-2 rounded shadow">
          + Add Category
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#E8DCCB] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F7F3EA] border-b border-[#E8DCCB]">
              <th className="p-4 text-sm font-bold text-[#1E1C59] uppercase tracking-wider">Name</th>
              <th className="p-4 text-sm font-bold text-[#1E1C59] uppercase tracking-wider">Order</th>
              <th className="p-4 text-sm font-bold text-[#1E1C59] uppercase tracking-wider">Status</th>
              <th className="p-4 text-sm font-bold text-[#1E1C59] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.sort((a, b) => a.displayOrder - b.displayOrder).map((cat) => (
              <tr key={cat.id} className="border-b border-[#E8DCCB] hover:bg-gray-50">
                <td className="p-4 font-medium text-[#1E1C59]">{cat.name}</td>
                <td className="p-4 text-[#11102F]/60">{cat.displayOrder}</td>
                <td className="p-4 text-[#11102F]/60">
                  {cat.isHidden ? 'Hidden' : cat.isArchived ? 'Archived' : 'Active'}
                </td>
                <td className="p-4">
                  <button onClick={() => openEdit(cat)} className="text-[#B18C56] font-semibold text-sm mr-4 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(cat.id)} className="text-red-600 font-semibold text-sm hover:underline disabled:opacity-50" disabled={isPending}>Delete</button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-[#11102F]/50">No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl text-[#1E1C59] mb-4" style={{ fontFamily: "'Marcellus', serif" }}>
              {editingCategory ? 'Edit Category' : 'New Category'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full form-input rounded border border-[#E8DCCB] p-2" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Slug (URL friendly)</label>
                <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full form-input rounded border border-[#E8DCCB] p-2" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Description</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full form-input rounded border border-[#E8DCCB] p-2 h-20" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Display Order</label>
                <input type="number" value={formData.displayOrder} onChange={e => setFormData({...formData, displayOrder: parseInt(e.target.value)})} className="w-full form-input rounded border border-[#E8DCCB] p-2" />
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={formData.isHidden} onChange={e => setFormData({...formData, isHidden: e.target.checked})} className="rounded text-[#B18C56] focus:ring-[#B18C56]" />
                  <span className="text-sm font-semibold text-[#1E1C59]">Hide Category</span>
                </label>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded border border-[#E8DCCB] text-[#11102F]">Cancel</button>
                <button type="submit" disabled={isPending} className="bg-[#B18C56] text-white px-4 py-2 rounded shadow disabled:opacity-50">
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
