// Fibonacci sequence function implementations

/**
 * Recursive Fibonacci function
 * Time complexity: O(2^n) - inefficient for large numbers
 * Space complexity: O(n)
 */
function fibonacciRecursive(n: number): number {
  if (n <= 1) return n;
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

/**
 * Iterative Fibonacci function
 * Time complexity: O(n)
 * Space complexity: O(1)
 */
function fibonacciIterative(n: number): number {
  if (n <= 1) return n;

  let a = 0,
    b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

/**
 * Memoized Fibonacci function
 * Time complexity: O(n)
 * Space complexity: O(n)
 */
function fibonacciMemoized(
  n: number,
  memo: Map<number, number> = new Map()
): number {
  if (n <= 1) return n;

  if (memo.has(n)) {
    return memo.get(n)!;
  }

  const result =
    fibonacciMemoized(n - 1, memo) + fibonacciMemoized(n - 2, memo);
  memo.set(n, result);
  return result;
}

/**
 * Generate Fibonacci sequence up to n terms
 * Returns an array of the first n Fibonacci numbers
 */
function fibonacciSequence(n: number): number[] {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  const sequence = [0, 1];
  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  return sequence;
}

/**
 * Generate Fibonacci numbers up to a maximum value
 * Returns an array of Fibonacci numbers less than or equal to max
 */
function fibonacciUpTo(max: number): number[] {
  if (max < 0) return [];
  if (max === 0) return [0];

  const sequence = [0, 1];
  let next = 1;

  while (next <= max) {
    sequence.push(next);
    next = sequence[sequence.length - 1] + sequence[sequence.length - 2];
  }

  return sequence;
}

// Example usage and testing
console.log("Fibonacci Examples:");
console.log("fibonacciIterative(10):", fibonacciIterative(10));
console.log("fibonacciRecursive(10):", fibonacciRecursive(10));
console.log("fibonacciMemoized(10):", fibonacciMemoized(10));
console.log("fibonacciSequence(10):", fibonacciSequence(10));
console.log("fibonacciUpTo(100):", fibonacciUpTo(100));

// Performance comparison for larger numbers
console.log("\nPerformance Test (n=40):");
const start1 = performance.now();
const result1 = fibonacciRecursive(40);
const end1 = performance.now();
console.log(`Recursive: ${result1} (${(end1 - start1).toFixed(2)}ms)`);

const start2 = performance.now();
const result2 = fibonacciIterative(40);
const end2 = performance.now();
console.log(`Iterative: ${result2} (${(end2 - start2).toFixed(2)}ms)`);

const start3 = performance.now();
const result3 = fibonacciMemoized(40);
const end3 = performance.now();
console.log(`Memoized: ${result3} (${(end3 - start3).toFixed(2)}ms)`);

export {
  fibonacciRecursive,
  fibonacciIterative,
  fibonacciMemoized,
  fibonacciSequence,
  fibonacciUpTo,
};
