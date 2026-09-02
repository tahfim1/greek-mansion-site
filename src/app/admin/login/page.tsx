'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Rate limiting timer state
  const [lockoutTimeLeft, setLockoutTimeLeft] = useState<number | null>(null);
  
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (lockoutTimeLeft !== null && lockoutTimeLeft > 0) {
      interval = setInterval(() => {
        setLockoutTimeLeft((prev) => (prev && prev > 1 ? prev - 1 : 0));
      }, 1000);
    } else if (lockoutTimeLeft === 0) {
      setLockoutTimeLeft(null);
      setError(''); // Clear error when timer finishes
    }

    return () => clearInterval(interval);
  }, [lockoutTimeLeft]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTimeLeft) return; // Prevent submission if locked out
    
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        if (data.lockUntil) {
          const secondsLeft = Math.ceil((data.lockUntil - Date.now()) / 1000);
          setLockoutTimeLeft(secondsLeft);
        } else {
          setError(data.message || 'Login failed');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3EA] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-[#E8DCCB] max-w-md w-full">
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <Image
              src="/images/logo/logo-icon.png"
              alt="Greek Mansion"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>
            Admin Login
          </h1>
          <p className="text-[#11102F]/60 text-sm mt-1">Enter your credentials to access the dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="form-label" htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!!lockoutTimeLeft}
              required
            />
          </div>
          
          <div>
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!!lockoutTimeLeft}
              required
            />
          </div>

          {error && !lockoutTimeLeft && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 font-medium">
              {error}
            </div>
          )}

          {lockoutTimeLeft !== null && lockoutTimeLeft > 0 && (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-center animate-pulse">
              <div className="w-10 h-10 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <p className="text-amber-800 font-bold mb-1">Too many attempts</p>
              <p className="text-amber-700/80 text-sm">
                Try again in <span className="font-bold text-amber-900">{lockoutTimeLeft}</span> seconds
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !!lockoutTimeLeft}
            className="w-full btn-primary !justify-center py-3 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
