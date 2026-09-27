import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 text-white">
      <div className="text-6xl mb-4">🎈</div>
      <h1 className="text-4xl font-extrabold mb-2">404 - Party Spot Not Found</h1>
      <p className="text-sm text-white/70 mb-6">Looks like this party room moved! Let's head back to the main celebration.</p>
      <Link
        to="/"
        className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-amber-400 text-slate-950 font-bold flex items-center gap-2 shadow-lg"
      >
        <Home className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  );
}
