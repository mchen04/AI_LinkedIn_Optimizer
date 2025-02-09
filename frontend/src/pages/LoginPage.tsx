import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '../store/authStore';
import { LinkedinIcon, ArrowLeft } from 'lucide-react';

export function LoginPage() {
  console.log('LoginPage component rendered'); // Add this line at the start of the component

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, register, isLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, name);
      }
      navigate({ to: '/upload' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate({ to: '/' })}
        className="absolute top-8 left-8 text-gray-600 hover:text-gray-900 flex items-center space-x-2 transition-all duration-300 hover:-translate-x-1"
      >
        <ArrowLeft className="icon-sm" />
        <span className="font-medium">Back to Home</span>
      </button>

      <div className="sm:mx-auto sm:w-full sm:max-w-md animate-fade-in-up">
        <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 mb-8 flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 hover:bg-blue-200">
          <LinkedinIcon className="h-10 w-10 text-blue-600 animate-pulse" />
        </div>
        <h2 className="text-center text-4xl font-bold text-gray-900 tracking-tight">
          {isLogin ? 'Welcome back' : 'Join us today'}
        </h2>
        <p className="mt-3 text-center text-gray-600">
          {isLogin ? 'Sign in to continue your journey' : 'Create an account to get started'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md reveal reveal-delay-1">
        <div className="bg-white/90 backdrop-blur-lg py-8 px-4 shadow-xl shadow-blue-500/5 sm:rounded-xl sm:px-10
                      border border-gray-200 transition-all duration-300 hover:shadow-blue-500/10">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 animate-shake flex items-center space-x-2 @apply animate-shake">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              <p>{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required={!isLogin}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="mt-1 block w-full rounded-lg shadow-sm border-gray-300
                          focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                          transition-colors duration-300
                          hover:border-blue-300"
                />
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 block w-full rounded-lg shadow-sm border-gray-300
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                        transition-colors duration-300
                        hover:border-blue-300"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 block w-full rounded-lg shadow-sm border-gray-300
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                        transition-colors duration-300
                        hover:border-blue-300"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
                       text-sm font-semibold text-white bg-blue-600 
                       hover:bg-blue-700 focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-blue-500 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transform transition-all duration-300
                       hover:scale-[1.02] active:scale-[0.98]
                       shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <span>{isLogin ? 'Sign in' : 'Create account'}</span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-4 border-t border-gray-100">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full text-center text-sm text-gray-500 hover:text-gray-900
                     transition-all duration-300 hover:underline decoration-blue-500 underline-offset-4"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
