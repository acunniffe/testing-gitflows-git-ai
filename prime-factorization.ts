/**
 * Prime Factorization Algorithm
 * 
 * This module provides functions to find the prime factors of a number.
 */

/**
 * Checks if a number is prime
 * @param n - The number to check
 * @returns true if n is prime, false otherwise
 */
function isPrime(n: number): boolean {
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
 * Finds all prime factors of a number using trial division
 * @param n - The number to factorize
 * @returns An array of prime factors (may contain duplicates)
 */
export function primeFactorization(n: number): number[] {
  if (n < 2) {
    throw new Error('Number must be greater than 1');
  }
  
  const factors: number[] = [];
  let num = n;
  
  // Handle 2 as a factor
  while (num % 2 === 0) {
    factors.push(2);
    num /= 2;
  }
  
  // Handle odd factors starting from 3
  for (let i = 3; i * i <= num; i += 2) {
    while (num % i === 0) {
      factors.push(i);
      num /= i;
    }
  }
  
  // If num is still greater than 1, it's a prime factor
  if (num > 1) {
    factors.push(num);
  }
  
  return factors;
}

/**
 * Returns prime factors as a map of prime -> exponent
 * @param n - The number to factorize
 * @returns A map where keys are primes and values are their exponents
 */
export function primeFactorizationMap(n: number): Map<number, number> {
  const factors = primeFactorization(n);
  const factorMap = new Map<number, number>();
  
  for (const factor of factors) {
    factorMap.set(factor, (factorMap.get(factor) || 0) + 1);
  }
  
  return factorMap;
}

/**
 * Returns prime factors as an array of [prime, exponent] tuples
 * @param n - The number to factorize
 * @returns An array of [prime, exponent] pairs
 */
export function primeFactorizationPairs(n: number): [number, number][] {
  const factorMap = primeFactorizationMap(n);
  return Array.from(factorMap.entries());
}

// Example usage
if (require.main === module) {
  const testNumbers = [12, 17, 100, 360, 1001];
  
  console.log('Prime Factorization Examples:\n');
  
  for (const num of testNumbers) {
    const factors = primeFactorization(num);
    const factorMap = primeFactorizationMap(num);
    const pairs = primeFactorizationPairs(num);
    
    console.log(`Number: ${num}`);
    console.log(`  Prime factors: [${factors.join(', ')}]`);
    console.log(`  Factor map: ${Array.from(factorMap.entries()).map(([p, e]) => `${p}^${e}`).join(' × ')}`);
    console.log(`  Pairs: [${pairs.map(([p, e]) => `[${p}, ${e}]`).join(', ')}]`);
    console.log();
  }
}

