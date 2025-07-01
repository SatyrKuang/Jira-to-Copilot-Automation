/**
 * Rate Limiting Utility for Login Attempts
 * 
 * This utility provides rate limiting functionality to prevent brute-force attacks
 * on login attempts. It tracks failed attempts using localStorage and implements
 * a lockout mechanism after a configurable number of failed attempts.
 * 
 * Features:
 * - Configurable maximum attempts before lockout
 * - Configurable lockout duration
 * - Automatic reset after lockout period expires
 * - Persistent storage across browser sessions
 */

export interface LoginAttemptData {
  timestamp: number;
  attempts: number;
}

export interface RateLimitConfig {
  maxAttempts: number;
  lockoutDuration: number; // in milliseconds
  storageKey: string;
}

export interface RateLimitStatus {
  isLocked: boolean;
  remainingAttempts: number;
  lockoutTimeRemaining: number; // in seconds
}

export class LoginRateLimiter {
  private config: RateLimitConfig;

  constructor(config: Partial<RateLimitConfig> = {}) {
    this.config = {
      maxAttempts: config.maxAttempts ?? 5,
      lockoutDuration: config.lockoutDuration ?? 15 * 60 * 1000, // 15 minutes
      storageKey: config.storageKey ?? 'loginAttempts'
    };
  }

  /**
   * Check the current rate limit status
   */
  checkStatus(): RateLimitStatus {
    const stored = localStorage.getItem(this.config.storageKey);
    
    if (!stored) {
      return {
        isLocked: false,
        remainingAttempts: this.config.maxAttempts,
        lockoutTimeRemaining: 0
      };
    }

    const attempts: LoginAttemptData = JSON.parse(stored);
    const now = Date.now();
    const timeSinceLastAttempt = now - attempts.timestamp;

    // Reset if lockout period has passed
    if (timeSinceLastAttempt > this.config.lockoutDuration) {
      this.reset();
      return {
        isLocked: false,
        remainingAttempts: this.config.maxAttempts,
        lockoutTimeRemaining: 0
      };
    }

    const remainingAttempts = Math.max(0, this.config.maxAttempts - attempts.attempts);
    const isLocked = attempts.attempts >= this.config.maxAttempts;
    const lockoutTimeRemaining = isLocked 
      ? Math.ceil((this.config.lockoutDuration - timeSinceLastAttempt) / 1000)
      : 0;

    return {
      isLocked,
      remainingAttempts,
      lockoutTimeRemaining
    };
  }

  /**
   * Record a failed login attempt
   */
  recordFailedAttempt(): RateLimitStatus {
    const stored = localStorage.getItem(this.config.storageKey);
    const now = Date.now();
    
    let attempts: LoginAttemptData;
    if (stored) {
      attempts = JSON.parse(stored);
      const timeSinceLastAttempt = now - attempts.timestamp;
      
      // Reset counter if lockout duration has passed
      if (timeSinceLastAttempt > this.config.lockoutDuration) {
        attempts = { timestamp: now, attempts: 1 };
      } else {
        attempts.attempts += 1;
        attempts.timestamp = now;
      }
    } else {
      attempts = { timestamp: now, attempts: 1 };
    }

    localStorage.setItem(this.config.storageKey, JSON.stringify(attempts));
    return this.checkStatus();
  }

  /**
   * Reset the rate limiter (called on successful login)
   */
  reset(): void {
    localStorage.removeItem(this.config.storageKey);
  }

  /**
   * Check if login attempts are currently locked
   */
  isLocked(): boolean {
    return this.checkStatus().isLocked;
  }

  /**
   * Get remaining attempts before lockout
   */
  getRemainingAttempts(): number {
    return this.checkStatus().remainingAttempts;
  }
}