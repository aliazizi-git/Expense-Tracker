'use client';
import { useAuthStore } from '@/Store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, token, logout } = useAuthStore();
  const router = useRouter();

  if (!token) return null;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-400"> Expense Tracker</h1>
      
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-300">Welcome, {user?.username}</span>
        <button 
          onClick={handleLogout}
          className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1.5 rounded-lg text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}