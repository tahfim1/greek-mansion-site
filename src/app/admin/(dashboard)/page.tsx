import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [
    publishedProducts,
    draftProducts,
    soldOutProducts,
    activeCategories,
    homepageSections
  ] = await Promise.all([
    prisma.product.count({ where: { status: 'PUBLISHED' } }),
    prisma.product.count({ where: { status: 'DRAFT' } }),
    prisma.product.count({ where: { isSoldOut: true } }),
    prisma.category.count({ where: { isHidden: false, isArchived: false } }),
    prisma.homepageSection.count()
  ]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <p className="text-[#F3BA2F] text-sm font-bold tracking-widest uppercase mb-2">Overview</p>
          <h1 className="text-3xl md:text-4xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>
            Admin Dashboard
          </h1>
        </div>
        <Link 
          href="/admin/menu/products"
          className="bg-[#1E1C59] text-white px-6 py-3 rounded-full font-bold hover:bg-[#F3BA2F] transition-colors shadow-md flex items-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Product
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link href="/admin/menu/products" className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8DCCB] hover:border-[#F3BA2F] hover:shadow-lg transition-all group relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#1E1C59]/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#1E1C59]/10 flex items-center justify-center text-[#1E1C59]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 16V4a2 2 0 00-2-2H6a2 2 0 00-2 2v12" />
                <path d="M4 16v4a2 2 0 002 2h12a2 2 0 002-2v-4" />
                <path d="M8 10h.01M12 10h.01M16 10h.01" />
              </svg>
            </div>
            <p className="text-[#11102F]/60 text-sm font-bold uppercase tracking-wider">Published</p>
          </div>
          <p className="text-4xl font-bold text-[#1E1C59] group-hover:text-[#F3BA2F] transition-colors">{publishedProducts}</p>
        </Link>

        <Link href="/admin/menu/products" className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8DCCB] hover:border-[#F3BA2F] hover:shadow-lg transition-all group relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#F3BA2F]/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#F3BA2F]/10 flex items-center justify-center text-[#F3BA2F]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>
            <p className="text-[#11102F]/60 text-sm font-bold uppercase tracking-wider">Drafts</p>
          </div>
          <p className="text-4xl font-bold text-[#1E1C59]">{draftProducts}</p>
        </Link>

        <Link href="/admin/menu/products" className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8DCCB] hover:border-red-500 hover:shadow-lg transition-all group relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <p className="text-[#11102F]/60 text-sm font-bold uppercase tracking-wider">Sold Out</p>
          </div>
          <p className="text-4xl font-bold text-red-600">{soldOutProducts}</p>
        </Link>

        <Link href="/admin/menu/categories" className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8DCCB] hover:border-[#1E1C59] hover:shadow-lg transition-all group relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#1E1C59]/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#1E1C59]/10 flex items-center justify-center text-[#1E1C59]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </div>
            <p className="text-[#11102F]/60 text-sm font-bold uppercase tracking-wider">Categories</p>
          </div>
          <p className="text-4xl font-bold text-[#1E1C59]">{activeCategories}</p>
        </Link>
      </div>

      {/* Quick Actions & Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 border border-[#E8DCCB] shadow-sm">
          <h2 className="text-xl font-bold text-[#1E1C59] mb-6 font-display" style={{ fontFamily: "'Marcellus', serif" }}>Quick Links</h2>
          <div className="space-y-4">
            <Link href="/admin/homepage" className="flex items-center justify-between p-4 rounded-xl hover:bg-[#F7F3EA] border border-transparent hover:border-[#E8DCCB] transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F3BA2F]/10 flex items-center justify-center text-[#F3BA2F]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#1E1C59]">Homepage Config</h3>
                  <p className="text-sm text-[#11102F]/60">{homepageSections} sections featured</p>
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#F3BA2F] opacity-0 group-hover:opacity-100 transition-opacity">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>

            <Link href="/admin/media" className="flex items-center justify-between p-4 rounded-xl hover:bg-[#F7F3EA] border border-transparent hover:border-[#E8DCCB] transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1E1C59]/10 flex items-center justify-center text-[#1E1C59]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#1E1C59]">Media Library</h3>
                  <p className="text-sm text-[#11102F]/60">Manage uploaded images</p>
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1E1C59] opacity-0 group-hover:opacity-100 transition-opacity">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="bg-[#1E1C59] rounded-2xl p-8 shadow-sm text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full -mr-10 -mt-10 pointer-events-none" />
          <h2 className="text-xl font-bold text-white mb-4 font-display" style={{ fontFamily: "'Marcellus', serif" }}>Settings & Store</h2>
          <p className="text-white/80 mb-8 leading-relaxed max-w-md">
            Manage your store's global configuration, business hours, and operational status directly from the settings panel.
          </p>
          <Link 
            href="/admin/settings"
            className="inline-flex items-center gap-2 bg-white text-[#1E1C59] px-6 py-3 rounded-full font-bold hover:bg-[#F3BA2F] hover:text-black transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
            Global Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
