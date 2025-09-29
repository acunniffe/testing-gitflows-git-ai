// Fibonacci
function fibonacci_generator(n: number): number {
  if (n <= 1) return n;
  return fibonacci_generator(n - 1) + fibonacci_generator(n - 2);
}

function fibonacciSequence(length: number): number[] {
  const sequence: number[] = [];
  for (let i = 0; i < length; i++) {
    sequence.push(fibonacci_generator(i));
  }
  return sequence;
}

// Next even or odd #

function nextEvenOrOdd(n: number, findEven: boolean): number {
  const isCurrentEven = n % 2 === 0;
  if (findEven) {
    return isCurrentEven ? n + 2 : n + 1;
  } else {
    return isCurrentEven ? n + 1 : n + 2;
  }
}

function generatePiDigits(digits: number): string {
  if (digits <= 0) return "3";

  let pi = 3;
  let numerator = 4;
  let denominator = 2;

  for (let i = 0; i < digits * 10; i++) {
    if (i % 2 === 0) {
      pi += numerator / (denominator * (denominator + 1) * (denominator + 2));
    } else {
      pi -= numerator / (denominator * (denominator + 1) * (denominator + 2));
    }
    denominator += 2;
  }

  return pi.toFixed(digits);
}
