'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import LogoutButton from './LogoutButton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Menu Products', href: '/admin/menu/products' },
    { name: 'Categories', href: '/admin/menu/categories' },
    { name: 'Collections', href: '/admin/menu/collections' },
    { name: 'Homepage', href: '/admin/homepage' },
    { name: 'Media Library', href: '/admin/media' },
    { name: 'Settings', href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EA] flex pt-20">
      {/* Mobile Header & Hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-20 bg-white border-b border-[#E8DCCB] z-40 flex items-center justify-between px-6">
        <h2 className="text-[#1E1C59] font-bold tracking-widest uppercase text-sm">Admin CMS</h2>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-[#11102F] p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar (Desktop & Mobile) */}
      <aside className={`
        fixed md:sticky top-20 md:top-24 left-0 h-[calc(100vh-5rem)] md:h-[calc(100vh-6rem)]
        w-64 bg-white border-r border-[#E8DCCB] overflow-y-auto z-30
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 flex flex-col h-full">
          <h2 className="text-[#1E1C59] font-bold tracking-widest uppercase mb-8 text-sm hidden md:block">Admin CMS</h2>
          <nav className="space-y-3 flex-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200
                    ${isActive 
                      ? 'bg-[#1E1C59] text-white shadow-md' 
                      : 'text-[#11102F]/70 hover:bg-[#F7F3EA] hover:text-[#1E1C59]'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="pt-6 border-t border-[#E8DCCB] mt-auto">
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#11102F]/20 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 md:pt-10 pt-8 w-full max-w-full overflow-hidden">
        {children}
      </main>
    </div>
  );
}
