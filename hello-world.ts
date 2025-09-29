// Divide two numbers using long division approach for learning
function divide(dividend: number, divisor: number): number {
  console.log(`\n--- Long Division: ${dividend} ÷ ${divisor} ---`);

  if (divisor === 0) {
    console.log("Cannot divide by zero!");
    return NaN;
  }

  if (dividend === 0) {
    console.log("0 divided by anything is 0");
    return 0;
  }

  let quotient = 0;
  let remainder = Math.abs(dividend);
  const absDivisor = Math.abs(divisor);

  console.log(`Step 1: We're dividing ${Math.abs(dividend)} by ${absDivisor}`);

  while (remainder >= absDivisor) {
    remainder -= absDivisor;
    quotient++;
    console.log(`Step ${quotient + 1}: ${absDivisor} goes into ${remainder + absDivisor}, subtract ${absDivisor}, remainder is ${remainder}`);
  }

  console.log(`Final result: ${dividend} ÷ ${divisor} = ${quotient} with remainder ${remainder}`);

  // Handle negative numbers
  const isNegative = (dividend < 0) !== (divisor < 0);
  const result = isNegative ? -quotient : quotient;

  if (isNegative) {
    console.log(`Since one number is negative, the result is negative: ${result}`);
  }

  return result;
}

// Out of band insertion
// Line2 
// Line3
// Line4
// Line5
// Line6
// Line7
// Line8
// Line9
// Line10


// Utilities
function reverse(str: string): string {
  return str.split('').reverse().join('');
}
// Add two numbers
function add(a: number, b: number): number {
  return a + b;
}

// Subtract two numbers
function subtract(a: number, b: number): number {
  return a - b;
}

// Generate pi using Leibniz formula
function generatePi(iterations: number = 1000000): number {
  let pi = 0;
  for (let i = 0; i < iterations; i++) {
    pi += Math.pow(-1, i) / (2 * i + 1);
  }
  return pi * 4;
}

// Count prime numbers up to 10,000 using Sieve of Eratosthenes
function countPrimes(): number {
  const maxPrime = 10000;
  const isPrime = new Array(maxPrime + 1).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let i = 2; i * i <= maxPrime; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= maxPrime; j += i) {
        isPrime[j] = false;
      }
    }
  }

  return isPrime.filter(prime => prime).length;
}

