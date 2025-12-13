import React, { useState } from 'react';

type AuthMode = 'login' | 'signup';

export default function LoginForm() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Username validation: alphanumeric only, must start with letter
  const validateUsername = (value: string): string | null => {
    if (!value) return 'Username is required';
    if (!/^[a-zA-Z]/.test(value)) {
      return 'Username must start with a letter';
    }
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      return 'Username must contain only letters and numbers';
    }
    return null;
  };

  // Password strength validation: medium security
  const validatePasswordStrength = (value: string): { valid: boolean; message: string; strength: number } => {
    if (!value) return { valid: false, message: 'Password is required', strength: 0 };

    let strength = 0;
    const checks = {
      length: value.length >= 8,
      hasUpperCase: /[A-Z]/.test(value),
      hasLowerCase: /[a-z]/.test(value),
      hasNumber: /[0-9]/.test(value),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    };

    if (checks.length) strength++;
    if (checks.hasUpperCase) strength++;
    if (checks.hasLowerCase) strength++;
    if (checks.hasNumber) strength++;
    if (checks.hasSpecial) strength++;

    // Medium security: at least 8 chars, mix of upper/lower/number
    const meetsMinimum = checks.length && checks.hasUpperCase && checks.hasLowerCase && checks.hasNumber;

    if (!meetsMinimum) {
      const missing = [];
      if (!checks.length) missing.push('at least 8 characters');
      if (!checks.hasUpperCase) missing.push('uppercase letter');
      if (!checks.hasLowerCase) missing.push('lowercase letter');
      if (!checks.hasNumber) missing.push('number');
      return {
        valid: false,
        message: `Password must contain: ${missing.join(', ')}`,
        strength
      };
    }

    return { valid: true, message: 'Password meets security requirements', strength };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation for signup mode
    if (mode === 'signup') {
      const usernameError = validateUsername(username);
      if (usernameError) {
        setError(usernameError);
        return;
      }

      const passwordValidation = validatePasswordStrength(password);
      if (!passwordValidation.valid) {
        setError(passwordValidation.message);
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }

    setLoading(true);

    try {
      const endpoint = mode === 'login' ? '/api/login' : '/api/signup';
      const response = await fetch(endpoint, {
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
        setError(data.message || `${mode === 'login' ? 'Login' : 'Signup'} failed. Please try again.`);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    if (mode === 'login' || !password) return null;
    return validatePasswordStrength(password);
  };

  const passwordStrength = getPasswordStrength();

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

        {/* Auth Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Mode Toggle */}
          <div className="flex rounded-lg bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError('');
                setConfirmPassword('');
              }}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                mode === 'login'
                  ? 'bg-white text-cyan-600 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setError('');
              }}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                mode === 'signup'
                  ? 'bg-white text-cyan-600 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {mode === 'login' ? 'Sign in to your account' : 'Sign up to get started'}
            </p>
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
                placeholder={mode === 'signup' ? 'Must start with a letter (e.g., john123)' : 'Enter your username'}
              />
              {mode === 'signup' && username && validateUsername(username) && (
                <p className="mt-1 text-xs text-amber-600">{validateUsername(username)}</p>
              )}
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
              {mode === 'signup' && passwordStrength && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded ${
                          level <= passwordStrength.strength
                            ? passwordStrength.strength <= 2
                              ? 'bg-red-500'
                              : passwordStrength.strength <= 3
                              ? 'bg-amber-500'
                              : 'bg-green-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${passwordStrength.valid ? 'text-green-600' : 'text-gray-600'}`}>
                    {passwordStrength.valid ? 'Strong password' : 'Needs: 8+ chars, uppercase, lowercase, number'}
                  </p>
                </div>
              )}
            </div>

            {mode === 'signup' && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                  placeholder="Re-enter your password"
                />
                {confirmPassword && password !== confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">Passwords do not match</p>
                )}
              </div>
            )}

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
              {loading ? (mode === 'login' ? 'Signing in...' : 'Creating account...') : (mode === 'login' ? 'Sign In' : 'Create Account')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
