'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <button 
      onClick={handleLogout}
      className="text-sm font-semibold text-white/80 hover:text-white transition-colors bg-[#1E1C59]/80 px-4 py-2 rounded-lg"
    >
      Logout
    </button>
  );
}
