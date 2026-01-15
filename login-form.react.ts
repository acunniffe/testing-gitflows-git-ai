import React, { useState } from 'react';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        window.location.href = '/home';
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Shark SVG - Centered */}
        <div className="flex justify-center">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            className="drop-shadow-lg"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Shark Body */}
            <ellipse
              cx="100"
              cy="100"
              rx="70"
              ry="50"
              fill="#4B5563"
              className="animate-pulse"
            />
            {/* Shark Tail */}
            <path
              d="M 30 100 Q 10 80 20 60 Q 15 70 25 85 L 30 100 Z"
              fill="#374151"
            />
            <path
              d="M 30 100 Q 10 120 20 140 Q 15 130 25 115 L 30 100 Z"
              fill="#374151"
            />
            {/* Shark Fin (Top) */}
            <path
              d="M 80 60 Q 90 40 110 50 L 100 70 Z"
              fill="#1F2937"
            />
            {/* Shark Fin (Side) */}
            <path
              d="M 140 90 Q 160 85 165 100 Q 160 115 140 110 Z"
              fill="#1F2937"
            />
            {/* Shark Eye */}
            <circle cx="120" cy="90" r="8" fill="#FFFFFF" />
            <circle cx="122" cy="88" r="4" fill="#000000" />
            {/* Shark Mouth */}
            <path
              d="M 150 105 Q 160 110 155 115 Q 150 110 145 108 Z"
              fill="#000000"
            />
            {/* Shark Gills */}
            <line x1="70" y1="85" x2="70" y2="95" stroke="#6B7280" strokeWidth="2" />
            <line x1="75" y1="85" x2="75" y2="95" stroke="#6B7280" strokeWidth="2" />
            <line x1="80" y1="85" x2="80" y2="95" stroke="#6B7280" strokeWidth="2" />
          </svg>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
