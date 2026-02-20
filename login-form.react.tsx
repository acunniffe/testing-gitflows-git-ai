import React, { useState } from 'react';

export default function LoginForm() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTos, setAgreedToTos] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
  });
  const [usernameValidation, setUsernameValidation] = useState({
    startsValid: false,
    validChars: false,
    validLength: false,
  });

  const validateUsername = (user: string) => {
    const validation = {
      startsValid: /^[a-zA-Z]/.test(user),
      validChars: /^[a-zA-Z0-9]*$/.test(user),
      validLength: user.length > 0 && user.length <= 22,
    };
    setUsernameValidation(validation);
    return validation.startsValid && validation.validChars && validation.validLength;
  };

  const validatePassword = (pwd: string) => {
    const validation = {
      length: pwd.length >= 8,
      hasUpperCase: /[A-Z]/.test(pwd),
      hasLowerCase: /[a-z]/.test(pwd),
      hasNumber: /[0-9]/.test(pwd),
    };
    setPasswordValidation(validation);
    return validation.length && validation.hasUpperCase && validation.hasLowerCase && validation.hasNumber;
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    if (mode === 'signup') {
      validateUsername(newUsername);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (mode === 'signup') {
      validatePassword(newPassword);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleModeToggle = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
    setPassword('');
    setConfirmPassword('');
    setPasswordValidation({ length: false, hasUpperCase: false, hasLowerCase: false, hasNumber: false });
    setUsernameValidation({ startsValid: false, validChars: false, validLength: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup') {
      if (!validateUsername(username)) {
        setError('Username must start with a letter, contain only letters and numbers, and be up to 22 characters.');
        return;
      }
      if (!validatePassword(password)) {
        setError('Password must be at least 8 characters and contain uppercase, lowercase, and a number.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (!agreedToTos) {
        setError('You must agree to the Terms of Service to sign up.');
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

        if (mode === 'login' && response.status === 404 && data.message?.includes('not found')) {
          setMode('signup');
          setError('No account found. Switched to sign up mode - create your account below.');
        } else {
          setError(data.message || `${mode === 'login' ? 'Login' : 'Sign up'} failed. Please try again.`);
        }
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

        {/* Login/Signup Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
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
                onChange={handleUsernameChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your username"
              />
              {mode === 'signup' && username && (
                <div className="mt-2 space-y-1">
                  <div className={`text-xs flex items-center gap-1 ${usernameValidation.startsValid ? 'text-green-600' : 'text-gray-500'}`}>
                    <span>{usernameValidation.startsValid ? '✓' : '○'}</span>
                    <span>Must start with a letter</span>
                  </div>
                  <div className={`text-xs flex items-center gap-1 ${usernameValidation.validChars ? 'text-green-600' : 'text-gray-500'}`}>
                    <span>{usernameValidation.validChars ? '✓' : '○'}</span>
                    <span>Only letters and numbers</span>
                  </div>
                  <div className={`text-xs flex items-center gap-1 ${usernameValidation.validLength ? 'text-green-600' : 'text-gray-500'}`}>
                    <span>{usernameValidation.validLength ? '✓' : '○'}</span>
                    <span>Up to 22 characters</span>
                  </div>
                </div>
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
                onChange={handlePasswordChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your password"
              />
              {mode === 'signup' && password && (
                <div className="mt-2 space-y-1">
                  <div className={`text-xs flex items-center gap-1 ${passwordValidation.length ? 'text-green-600' : 'text-gray-500'}`}>
                    <span>{passwordValidation.length ? '✓' : '○'}</span>
                    <span>At least 8 characters</span>
                  </div>
                  <div className={`text-xs flex items-center gap-1 ${passwordValidation.hasUpperCase ? 'text-green-600' : 'text-gray-500'}`}>
                    <span>{passwordValidation.hasUpperCase ? '✓' : '○'}</span>
                    <span>At least 1 uppercase letter</span>
                  </div>
                  <div className={`text-xs flex items-center gap-1 ${passwordValidation.hasLowerCase ? 'text-green-600' : 'text-gray-500'}`}>
                    <span>{passwordValidation.hasLowerCase ? '✓' : '○'}</span>
                    <span>At least 1 lowercase letter</span>
                  </div>
                  <div className={`text-xs flex items-center gap-1 ${passwordValidation.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                    <span>{passwordValidation.hasNumber ? '✓' : '○'}</span>
                    <span>At least 1 number</span>
                  </div>
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
                  onChange={handleConfirmPasswordChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                  placeholder="Confirm your password"
                />
                {confirmPassword && password !== confirmPassword && (
                  <div className="mt-2 text-xs text-red-600">
                    Passwords do not match
                  </div>
                )}
                {confirmPassword && password === confirmPassword && (
                  <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
                    <span>✓</span>
                    <span>Passwords match</span>
                  </div>
                )}
              </div>
            )}

            {mode === 'signup' && (
              <div className="flex items-start gap-2">
                <input
                  id="tos"
                  type="checkbox"
                  checked={agreedToTos}
                  onChange={(e) => setAgreedToTos(e.target.checked)}
                  className="mt-1 w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                />
                <label htmlFor="tos" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="/terms" className="text-cyan-600 hover:text-cyan-700 underline">
                    Terms of Service
                  </a>
                </label>
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
              {loading ? (mode === 'login' ? 'Signing in...' : 'Creating account...') : (mode === 'login' ? 'Sign In' : 'Sign Up')}
            </button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={handleModeToggle}
              className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
            >
              {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
