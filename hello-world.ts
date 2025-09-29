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

