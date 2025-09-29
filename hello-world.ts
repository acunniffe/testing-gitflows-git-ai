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

