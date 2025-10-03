'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Set the admin credentials
    const adminEmail = 'kiballkip@gmail.com';
    const adminPassword = 'Luget@portfolio@A1XJ1';
    
    // Simple authentication - in production, use proper auth
    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('adminPassword', adminPassword);
      router.push('/admin');
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

        <div className="mt-6 text-center">
          <Link 
            href="/forgot-password" 
            className="body-text text-accent hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

      </motion.div>
    </div>
  );
}