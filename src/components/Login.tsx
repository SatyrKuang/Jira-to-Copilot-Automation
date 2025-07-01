import { useState, useEffect } from 'react';

interface LoginAttempt {
  timestamp: number;
  attempts: number;
}

interface LoginProps {
  onLoginSuccess?: () => void;
}

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
const STORAGE_KEY = 'loginAttempts';

export default function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(MAX_ATTEMPTS);
  const [lockoutTimeRemaining, setLockoutTimeRemaining] = useState(0);
  const [message, setMessage] = useState('');

  // Check rate limiting status on component mount and periodically
  useEffect(() => {
    checkRateLimit();
    const interval = setInterval(checkRateLimit, 1000);
    return () => clearInterval(interval);
  }, []);

  const checkRateLimit = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setRemainingAttempts(MAX_ATTEMPTS);
      setIsLocked(false);
      setLockoutTimeRemaining(0);
      return;
    }

    const attempts: LoginAttempt = JSON.parse(stored);
    const now = Date.now();
    const timeSinceLastAttempt = now - attempts.timestamp;

    // Reset if lockout period has passed
    if (timeSinceLastAttempt > LOCKOUT_DURATION) {
      localStorage.removeItem(STORAGE_KEY);
      setRemainingAttempts(MAX_ATTEMPTS);
      setIsLocked(false);
      setLockoutTimeRemaining(0);
      setMessage('');
      return;
    }

    const remaining = MAX_ATTEMPTS - attempts.attempts;
    setRemainingAttempts(Math.max(0, remaining));

    if (attempts.attempts >= MAX_ATTEMPTS) {
      setIsLocked(true);
      const timeLeft = LOCKOUT_DURATION - timeSinceLastAttempt;
      setLockoutTimeRemaining(Math.ceil(timeLeft / 1000));
    } else {
      setIsLocked(false);
      setLockoutTimeRemaining(0);
    }
  };

  const recordFailedAttempt = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();
    
    let attempts: LoginAttempt;
    if (stored) {
      attempts = JSON.parse(stored);
      const timeSinceLastAttempt = now - attempts.timestamp;
      
      // Reset counter if enough time has passed
      if (timeSinceLastAttempt > LOCKOUT_DURATION) {
        attempts = { timestamp: now, attempts: 1 };
      } else {
        attempts.attempts += 1;
        attempts.timestamp = now;
      }
    } else {
      attempts = { timestamp: now, attempts: 1 };
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
    checkRateLimit();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      setMessage('Account temporarily locked due to too many failed attempts.');
      return;
    }

    // Simple demo authentication (username: "demo", password: "password")
    if (username === 'demo' && password === 'password') {
      localStorage.removeItem(STORAGE_KEY);
      setMessage('Login successful!');
      setRemainingAttempts(MAX_ATTEMPTS);
      setIsLocked(false);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } else {
      recordFailedAttempt();
      const newRemaining = remainingAttempts - 1;
      
      if (newRemaining <= 0) {
        setMessage(`Too many failed attempts. Account locked for ${Math.ceil(LOCKOUT_DURATION / 60000)} minutes.`);
      } else {
        setMessage(`Invalid credentials. ${newRemaining} attempt${newRemaining !== 1 ? 's' : ''} remaining.`);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
      
      {isLocked && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="font-semibold">Account Locked</p>
          <p className="text-sm">Too many failed attempts. Please try again in {formatTime(lockoutTimeRemaining)}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLocked}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Enter username"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLocked}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Enter password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLocked}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          {isLocked ? 'Account Locked' : 'Login'}
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded ${
          message.includes('successful') 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-yellow-100 border border-yellow-400 text-yellow-700'
        }`}>
          {message}
        </div>
      )}

      {!isLocked && remainingAttempts < MAX_ATTEMPTS && (
        <div className="mt-4 text-sm text-gray-600 text-center">
          Remaining attempts: {remainingAttempts}/{MAX_ATTEMPTS}
        </div>
      )}

      <div className="mt-6 text-xs text-gray-500 text-center">
        <p>Demo credentials:</p>
        <p>Username: <span className="font-mono">demo</span></p>
        <p>Password: <span className="font-mono">password</span></p>
      </div>
    </div>
  );
}