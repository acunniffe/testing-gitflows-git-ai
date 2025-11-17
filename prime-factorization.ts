/**
 * Computes the prime factorization of a given number.
 * Returns an array of prime factors, with duplicates included.
 * 
 * @param n - The number to factorize (must be a positive integer >= 2)
 * @returns An array of prime factors
 * @throws Error if n is less than 2 or not an integer
 * 
 * @example
 * primeFactorization(12) // returns [2, 2, 3]
 * primeFactorization(17) // returns [17]
 * primeFactorization(100) // returns [2, 2, 5, 5]
 */
export function primeFactorization(n: number): number[] {
  if (n < 2 || !Number.isInteger(n)) {
    throw new Error('Input must be an integer >= 2');
  }

  const factors: number[] = [];
  let num = n;

  // Check for factor 2
  while (num % 2 === 0) {
    factors.push(2);
    num /= 2;
  }

  // Check for odd factors starting from 3
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