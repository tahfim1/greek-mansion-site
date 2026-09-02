import Link from 'next/link';
import LogoutButton from './LogoutButton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
    <div className="pt-24 pb-16 min-h-screen bg-[#F7F3EA] flex">
      <aside className="w-64 bg-white border-r border-[#E8DCCB] hidden md:block h-[calc(100vh-6rem)] sticky top-24 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-[#1E1C59] font-bold tracking-widest uppercase mb-6 text-sm">Admin CMS</h2>
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-2 px-4 rounded-lg text-[#11102F]/80 hover:bg-[#F7F3EA] hover:text-[#1E1C59] transition-colors text-sm font-semibold"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
      
      <main className="flex-1 p-6 lg:p-10">
        <div className="flex justify-end mb-4">
           <LogoutButton />
        </div>
        {children}
      </main>
    </div>
  );
}
