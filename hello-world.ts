// Divide two numbers using long division approach for learning
function divide(dividend: number, divisor: number): number {


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

// Multiply two numbers
function multiply(a: number, b: number): number {
  return a * b;
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

// Derivative functions for random math calculations

// Calculate derivative of polynomial function ax^n using power rule
function derivativePolynomial(coefficient: number, exponent: number): { coefficient: number; exponent: number } {
  if (exponent === 0) {
    return { coefficient: 0, exponent: 0 };
  }
  return {
    coefficient: coefficient * exponent,
    exponent: exponent - 1
  };
}

// Calculate numerical derivative using finite difference approximation
function numericalDerivative(func: (x: number) => number, x: number, h: number = 0.0001): number {
  return (func(x + h) - func(x - h)) / (2 * h);
}

// Calculate derivative of exponential function e^(ax)
function derivativeExponential(a: number): (x: number) => number {
  return (x: number) => a * Math.exp(a * x);
}

// Calculate derivative of logarithmic function ln(ax)
function derivativeLogarithm(a: number): (x: number) => number {
  return (x: number) => a / x;
}

// Calculate derivative of trigonometric function sin(ax)
function derivativeSine(a: number): (x: number) => number {
  return (x: number) => a * Math.cos(a * x);
}

// Calculate derivative of trigonometric function cos(ax)
function derivativeCosine(a: number): (x: number) => number {
  return (x: number) => -a * Math.sin(a * x);
}

// Calculate second derivative using finite difference
function secondDerivative(func: (x: number) => number, x: number, h: number = 0.0001): number {
  return (func(x + h) - 2 * func(x) + func(x - h)) / (h * h);
}

// Calculate partial derivative approximation for multivariable function
function partialDerivative(func: (x: number, y: number) => number, x: number, y: number, variable: 'x' | 'y', h: number = 0.0001): number {
  if (variable === 'x') {
    return (func(x + h, y) - func(x - h, y)) / (2 * h);
  } else {
    return (func(x, y + h) - func(x, y - h)) / (2 * h);
  }
}

// Generate random derivative problems
function generateRandomDerivativeProblem(): { function: string; derivative: string; x: number } {
  const problems = [
    {
      function: "x^2 + 3x + 1",
      derivative: "2x + 3",
      x: Math.random() * 10 - 5
    },
    {
      function: "sin(x)",
      derivative: "cos(x)",
      x: Math.random() * Math.PI * 2
    },
    {
      function: "e^x",
      derivative: "e^x",
      x: Math.random() * 5 - 2.5
    },
    {
      function: "ln(x)",
      derivative: "1/x",
      x: Math.random() * 5 + 1
    },
    {
      function: "x^3 - 2x^2 + x - 1",
      derivative: "3x^2 - 4x + 1",
      x: Math.random() * 6 - 3
    }
  ];
  
  return problems[Math.floor(Math.random() * problems.length)];
}

// Calculate derivative at a specific point using multiple methods
function calculateDerivativeAtPoint(func: (x: number) => number, x: number): {
  numerical: number;
  analytical?: number;
  error?: number;
} {
  const numerical = numericalDerivative(func, x);
  
  // For demonstration, let's calculate analytical derivative for x^2
  if (func.toString().includes('x * x') || func.toString().includes('Math.pow(x, 2)')) {
    const analytical = 2 * x;
    const error = Math.abs(numerical - analytical);
    return { numerical, analytical, error };
  }
  
  return { numerical };
}

