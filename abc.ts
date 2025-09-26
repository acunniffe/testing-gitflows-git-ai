function reverseAlphabet(): string {
  return "zyxwvutsrqponmlkjihgfedcba";
}

function reverseNumberLine(numbers: number[]) {
  return numbers.reverse();
}

function flipEvenOdd(numbers: number[]): number[] {
  return numbers.map((num) => (num % 2 === 0 ? num + 1 : num - 1));
}
