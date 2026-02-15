'use client';

import Footer from '@/components/winview/Footer';
import Header from '@/components/winview/Header';
import useAuth from '@/utils/useAuth';
import { useState } from 'react';

export default function SignUpPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUpWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const params = new URLSearchParams(
        typeof window !== 'undefined' ? window.location.search : ''
      );
      const originalCb = params.get('callbackUrl');
      // Always redirect to the after-auth page so it can decide based on admin status
      const callbackUrl = `/account/after-auth${originalCb ? `?callbackUrl=${encodeURIComponent(originalCb)}` : ''}`;
      await signUpWithCredentials({
        email,
        password,
        callbackUrl,
        redirect: true,
      });
    } catch (err) {
      const errorMessages = {
        OAuthSignin: 'Couldn’t start sign-up. Please try again or use a different method.',
        OAuthCallback: 'Sign-up failed after redirecting. Please try again.',
        OAuthCreateAccount: 'Couldn’t create an account with this sign-up option. Try another one.',
        EmailCreateAccount: 'This email can’t be used. It may already be registered.',
        Callback: 'Something went wrong during sign-up. Please try again.',
        OAuthAccountNotLinked:
          'This account is linked to a different sign-in method. Try using that instead.',
        CredentialsSignin:
          'Invalid email or password. If you already have an account, sign in instead.',
        AccessDenied: 'You don’t have permission to sign up.',
        Configuration: 'Sign-up isn’t working right now. Please try again later.',
        Verification: 'Your sign-up link has expired. Request a new one.',
      };

      setError(errorMessages[err?.message] || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] relative overflow-hidden">
      <div className="absolute top-[-30%] right-[-10%] w-[800px] h-[800px] bg-[#8A2BE2]/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-[#00BFFF]/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />

      <Header />

      <main className="relative z-10 pt-28 pb-20 px-6">
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur rounded-3xl border border-white/60 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] p-8">
          <h1 className="text-[32px] font-semibold text-[#1D1D1F] text-center mb-6">
            Create account
          </h1>
          <form noValidate onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#6E6E73] mb-1">Email</label>
              <div className="rounded-xl border border-[#E5E5E7] px-4 py-3 focus-within:border-[#0A84FF] focus-within:ring-1 focus-within:ring-[#0A84FF] bg-white">
                <input
                  required
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-transparent outline-none text-[#1D1D1F]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6E6E73] mb-1">Password</label>
              <div className="rounded-xl border border-[#E5E5E7] px-4 py-3 focus-within:border-[#0A84FF] focus-within:ring-1 focus-within:ring-[#0A84FF] bg-white">
                <input
                  required
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full bg-transparent outline-none text-[#1D1D1F]"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-5 py-3 rounded-xl text-white bg-gradient-to-r from-[#8A2BE2] to-[#00BFFF] font-semibold shadow-lg shadow-[#8A2BE2]/25 hover:shadow-xl transition-all disabled:opacity-60"
            >
              {loading ? 'Creating...' : 'Sign up'}
            </button>

            <p className="text-center text-sm text-[#6E6E73]">
              Already have an account?{' '}
              <a
                href={`/account/signin${typeof window !== 'undefined' ? window.location.search : ''}`}
                className="text-[#0A84FF] hover:underline"
              >
                Sign in
              </a>
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
