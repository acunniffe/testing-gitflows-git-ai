
function countVowels(str: string): number {
  const vowels = 'aeiouAEIOU';
  return str.split('').filter(char => vowels.includes(char)).length;
}

/*
"Lorem ipsum dolor sit amet,
consectetur adipiscing elit,
sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
*/
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

function countPrimes(numbers: number[]): number {
  const MAX_VALUE = 1000000;

  for (const num of numbers) {
    if (num > MAX_VALUE) {
      throw new Error(`Number ${num} exceeds maximum allowed value of ${MAX_VALUE}`);
    }
  }

  function isPrime(n: number): boolean {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  }

  return numbers.filter(isPrime).length;
}

// Subtract two numbers
function subtract(a: number, b: number): number {
  return a - b;
}

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