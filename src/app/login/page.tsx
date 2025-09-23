'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple authentication - in production, use proper auth
    if (email === 'admin@portfolio.com' && password === 'admin123') {
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8 max-w-md w-full"
      >
        <h1 className="headline text-center mb-8">ADMIN LOGIN</h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block body-text mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          <div>
            <label className="block body-text mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-center body-text">
              {error}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full glass rounded-lg py-3 font-bold hover:bg-accent/10 transition-colors"
          >
            LOGIN
          </motion.button>
        </form>

      </motion.div>
    </div>
  );
}