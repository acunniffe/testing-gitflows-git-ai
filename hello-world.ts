
function reverse(str: string): string {
  return str.split('').reverse().join('');
}

function generatePi(precision: number = 10): number {
  let pi = 0;
  for (let k = 0; k < precision; k++) {
    const term = (1 / Math.pow(16, k)) *
      (4 / (8 * k + 1) - 2 / (8 * k + 4) - 1 / (8 * k + 5) - 1 / (8 * k + 6));
    pi += term;
  }
  return pi;
}

// This is where we'll keep the utility functions

function add(a: number, b: number): number {
  return a + b;
}

function addMany(...args: number[]): number {
  return args.reduce((sum, num) => sum + num, 0);
}

function subtract_numbers(a: number, b: number): number {
  return a - b;
}

function multiply_numbers(a: number, b: number): number {
  return a * b;
}

function multiplyMany(...args: number[]): number {
  return args.reduce((product, num) => product * num, 1);
}

function divide_numbers(a: number, b: number): number {
  return a / b;
}
