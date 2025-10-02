'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation - in production, use proper email verification
    if (email === 'admin@portfolio.com') {
      setStep('reset');
      setSuccess('Email verified. You can now reset your password.');
    } else {
      setError('Email not found in our system');
    }
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    // In production, this would save to a secure database
    // For demo purposes, we'll store in localStorage
    localStorage.setItem('adminPassword', newPassword);
    localStorage.setItem('passwordResetTime', Date.now().toString());
    
    setSuccess('Password updated successfully! You can now login with your new password.');
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8 max-w-md w-full"
      >
        <h1 className="headline text-center mb-8">
          {step === 'email' ? 'FORGOT PASSWORD' : 'RESET PASSWORD'}
        </h1>

        {step === 'email' ? (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label className="block body-text mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Enter your admin email"
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
              VERIFY EMAIL
            </motion.button>

            <div className="text-center">
              <Link 
                href="/login" 
                className="body-text text-accent hover:underline"
              >
                ← Back to Login
              </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handlePasswordReset} className="space-y-6">
            <div>
              <label className="block body-text mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Enter new password"
                required
              />
            </div>

            <div>
              <label className="block body-text mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Confirm new password"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-center body-text">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-400 text-center body-text">
                {success}
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full glass rounded-lg py-3 font-bold hover:bg-accent/10 transition-colors"
            >
              RESET PASSWORD
            </motion.button>

            <div className="text-center">
              <button 
                type="button"
                onClick={() => setStep('email')}
                className="body-text text-accent hover:underline"
              >
                ← Back to Email Verification
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Need help? Contact the system administrator.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
