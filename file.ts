// Hello world

/**
 * Calculate pi using the Leibniz formula (infinite series)
 * π/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...
 * 
 * @param iterations - Number of iterations (more iterations = more accuracy)
 * @returns Approximation of pi
 */
export function calculatePiLeibniz(iterations: number): number {
  let pi = 0;
  for (let i = 0; i < iterations; i++) {
    const sign = i % 2 === 0 ? 1 : -1;
    pi += sign / (2 * i + 1);
  }
  return pi * 4;
}

/**
 * Calculate pi using the Monte Carlo method
 * Randomly generates points in a unit square and counts how many fall inside a unit circle
 * 
 * @param iterations - Number of random points to generate (more iterations = more accuracy)
 * @returns Approximation of pi
 */
export function calculatePiMonteCarlo(iterations: number): number {
  let pointsInsideCircle = 0;
  
  for (let i = 0; i < iterations; i++) {
    const x = Math.random();
    const y = Math.random();
    const distance = Math.sqrt(x * x + y * y);
    
    if (distance <= 1) {
      pointsInsideCircle++;
    }
  }
  
  // Ratio of points inside circle to total points approximates π/4
  return (pointsInsideCircle / iterations) * 4;
}

/**
 * Calculate pi using the Nilakantha series (converges faster than Leibniz)
 * π = 3 + 4/(2×3×4) - 4/(4×5×6) + 4/(6×7×8) - ...
 * 
 * @param iterations - Number of iterations (more iterations = more accuracy)
 * @returns Approximation of pi
 */
export function calculatePiNilakantha(iterations: number): number {
  let pi = 3;
  let sign = 1;
  
  for (let i = 1; i <= iterations; i++) {
    const denominator = 2 * i * (2 * i + 1) * (2 * i + 2);
    pi += sign * (4 / denominator);
    sign *= -1;
  }
  
  return pi;
}

// Example usage:
// console.log('Leibniz (1000 iterations):', calculatePiLeibniz(1000));
// console.log('Monte Carlo (100000 iterations):', calculatePiMonteCarlo(100000));
// console.log('Nilakantha (100 iterations):', calculatePiNilakantha(100));

/**
 * Calculate e (Euler's number) using the infinite series
 * e = 1 + 1/1! + 1/2! + 1/3! + 1/4! + ...
 * 
 * @param iterations - Number of iterations (more iterations = more accuracy)
 * @returns Approximation of e
 */
export function calculateESeries(iterations: number): number {
  let e = 1;
  let factorial = 1;
  
  for (let i = 1; i <= iterations; i++) {
    factorial *= i;
    e += 1 / factorial;
  }
  
  return e;
}

/**
 * Calculate e using the limit definition
 * e = lim(n→∞) (1 + 1/n)^n
 * 
 * @param n - Large number to approximate the limit (larger n = more accuracy)
 * @returns Approximation of e
 */
export function calculateELimit(n: number): number {
  return Math.pow(1 + 1 / n, n);
}

/**
 * Calculate e^x using the Taylor series expansion
 * e^x = 1 + x/1! + x²/2! + x³/3! + ...
 * 
 * @param x - The exponent
 * @param iterations - Number of iterations (more iterations = more accuracy)
 * @returns Approximation of e^x
 */
export function calculateEToPowerX(x: number, iterations: number): number {
  let result = 1;
  let factorial = 1;
  let power = 1;
  
  for (let i = 1; i <= iterations; i++) {
    factorial *= i;
    power *= x;
    result += power / factorial;
  }
  
  return result;
}

export function factorial(n: number): number {
  if (n < 0) throw new Error('Factorial is not defined for negative numbers');
  if (n === 0 || n === 1) return 1;
  
 
  return result;
}

/**
 * Generate Fibonacci sequence up to n terms
 * F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)
 * 
 * @param n - Number of terms to generate
 * @returns Array of Fibonacci numbers
 */
export function fibonacci(n: number): number[] {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];
  
  const sequence = [0, 1];
  for (let i = 2; i < n; i++) {
    sequence[i] = sequence[i - 1] + sequence[i - 2];
  }
  return sequence;
}

/**
 * Check if a number is prime
 * 
 * @param n - Number to check
 * @returns True if n is prime, false otherwise
 */
export function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  
  const sqrt = Math.sqrt(n);
  for (let i = 3; i <= sqrt; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

/**
 * Calculate Greatest Common Divisor (GCD) using Euclidean algorithm
 * 
 * @param a - First number
 * @param b - Second number
 * @returns GCD of a and b
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * Calculate Least Common Multiple (LCM)
 * 
 * @param a - First number
 * @param b - Second number
 * @returns LCM of a and b
 */
export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Calculate square root using Newton's method
 * 
 * @param n - Number to find square root of
 * @param precision - Number of iterations (more = more accurate)
 * @returns Approximation of square root of n
 */
export function sqrt(n: number, precision: number = 10): number {
  if (n < 0) throw new Error('Square root is not defined for negative numbers');
  if (n === 0) return 0;
  
  let guess = n / 2;
  for (let i = 0; i < precision; i++) {
    guess = (guess + n / guess) / 2;
  }
  return guess;
}

/**
 * Calculate sine using Taylor series
 * sin(x) = x - x³/3! + x⁵/5! - x⁷/7! + ...
 * 
 * @param x - Angle in radians
 * @param iterations - Number of iterations (more = more accurate)
 * @returns Approximation of sin(x)
 */
export function sin(x: number, iterations: number = 15): number {
  // Normalize x to [-2π, 2π]
  x = x % (2 * Math.PI);
  
  let result = 0;
  let power = x;
  let factorial = 1;
  let sign = 1;
  
  for (let i = 1; i <= iterations; i += 2) {
    result += sign * (power / factorial);
    power *= x * x;
    factorial *= (i + 1) * (i + 2);
    sign *= -1;
  }
  
  return result;
}

/**
 * Calculate cosine using Taylor series
 * cos(x) = 1 - x²/2! + x⁴/4! - x⁶/6! + ...
 * 
 * @param x - Angle in radians
 * @param iterations - Number of iterations (more = more accurate)
 * @returns Approximation of cos(x)
 */
export function cos(x: number, iterations: number = 15): number {
  // Normalize x to [-2π, 2π]
  x = x % (2 * Math.PI);
  
  let result = 1;
  let power = 1;
  let factorial = 1;
  let sign = -1;
  
  for (let i = 2; i <= iterations; i += 2) {
    power *= x * x;
    factorial *= (i - 1) * i;
    result += sign * (power / factorial);
    sign *= -1;
  }
  
  return result;
}

/**
 * Calculate natural logarithm using Taylor series
 * ln(1+x) = x - x²/2 + x³/3 - x⁴/4 + ... for |x| < 1
 * 
 * @param x - Number to find logarithm of (must be > 0)
 * @param iterations - Number of iterations (more = more accurate)
 * @returns Approximation of ln(x)
 */
export function ln(x: number, iterations: number = 100): number {
  if (x <= 0) throw new Error('Natural logarithm is not defined for non-positive numbers');
  if (x === 1) return 0;
  
  // Use ln(x) = -ln(1/x) for x > 1
  if (x > 1) return -ln(1 / x, iterations);
  
  // For 0 < x < 1, use ln(1+x) series with x-1
  const y = x - 1;
  let result = 0;
  let power = y;
  
  for (let i = 1; i <= iterations; i++) {
    result += power / i;
    power *= -y;
  }
  
  return result;
}

/**
 * Calculate power using iterative multiplication
 * 
 * @param base - Base number
 * @param exponent - Exponent (must be non-negative integer)
 * @returns base raised to the power of exponent
 */
export function power(base: number, exponent: number): number {
  if (exponent < 0 || !Number.isInteger(exponent)) {
    throw new Error('Exponent must be a non-negative integer');
  }
  
  if (exponent === 0) return 1;
  if (exponent === 1) return base;
  
  let result = 1;
  for (let i = 0; i < exponent; i++) {
    result *= base;
  }
  return result;
}

/**
 * Generate prime numbers up to n using Sieve of Eratosthenes
 * 
 * @param n - Upper limit
 * @returns Array of prime numbers up to n
 */
export function generatePrimes(n: number): number[] {
  if (n < 2) return [];
  
  const sieve = new Array(n + 1).fill(true);
  sieve[0] = false;
  sieve[1] = false;
  
  for (let i = 2; i * i <= n; i++) {
    if (sieve[i]) {
      for (let j = i * i; j <= n; j += i) {
        sieve[j] = false;
      }
    }
  }
  
  const primes: number[] = [];
  for (let i = 2; i <= n; i++) {
    if (sieve[i]) {
      primes.push(i);
    }
  }
  
  return primes;
}

/**
 * Calculate the golden ratio (φ)
 * φ = (1 + √5) / 2 ≈ 1.618033988749895
 * 
 * @returns The golden ratio
 */
export function goldenRatio(): number {
  return (1 + sqrt(5)) / 2;
}
