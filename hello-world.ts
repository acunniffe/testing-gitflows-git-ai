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

  // new comment

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

// Helper function to compute arctan using Taylor series
function arctan(x: number, iterations: number): number {
  let result = 0;
  const xSquared = x * x;
  let power = x;
  
  for (let i = 0; i < iterations; i++) {
    const term = power / (2 * i + 1);
    if (i % 2 === 0) {
      result += term;
    } else {
      result -= term;
    }
    power *= xSquared;
  }
  
  return result;
}

// Generate pi using Machin's formula (much faster convergence than Leibniz)
// π/4 = 4*arctan(1/5) - arctan(1/239)
function generatePi(iterations: number = 20): number {
  // Machin's formula converges very quickly - only need ~20 iterations for high precision
  const arctan1_5 = arctan(1/5, iterations);
  const arctan1_239 = arctan(1/239, iterations);
  return 4 * (4 * arctan1_5 - arctan1_239);
}

// Alternative: Generate pi using Chudnovsky algorithm (extremely fast convergence)
// This is the algorithm used to calculate pi to billions of digits
function generatePiChudnovsky(iterations: number = 5): number {
  let sum = 0;
  let factorial = 1;
  let factorial3 = 1;
  
  for (let k = 0; k < iterations; k++) {
    if (k > 0) {
      factorial *= k;
      factorial3 *= (6 * k - 5) * (6 * k - 4) * (6 * k - 3) * (6 * k - 2) * (6 * k - 1) * (6 * k);
    }
    
    const numerator = factorial * (545140134 * k + 13591409);
    const denominator = factorial3 * Math.pow(640320, 3 * k + 1.5);
    
    sum += numerator / denominator;
  }
  
  return 1 / (12 * sum);
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

// Better way: Efficient division using bit manipulation
function divideEfficient(dividend: number, divisor: number): number {
  if (divisor === 0) {
    throw new Error("Cannot divide by zero!");
  }

  if (dividend === 0) {
    return 0;
  }

  // Handle negative numbers
  const isNegative = (dividend < 0) !== (divisor < 0);
  let absDividend = Math.abs(dividend);
  const absDivisor = Math.abs(divisor);

  // Use bit manipulation for faster division
  let quotient = 0;
  let temp = 0;

  for (let i = 31; i >= 0; i--) {
    if (temp + (absDivisor << i) <= absDividend) {
      temp += absDivisor << i;
      quotient |= 1 << i;
    }
  }

  const result = isNegative ? -quotient : quotient;
  
  // Clamp result to 32-bit signed integer range
  const MAX_INT = 2147483647;
  const MIN_INT = -2147483648;
  
  if (result > MAX_INT) return MAX_INT;
  if (result < MIN_INT) return MIN_INT;
  
  return result;
}
