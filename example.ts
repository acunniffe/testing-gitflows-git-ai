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
