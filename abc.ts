function reverse_alphabet(): string {
  return "zyxwvutsrqponmlkjihgfedcba";
}

function reverse_number_line(numbers: number[]) {
  return numbers.reverse();
}

function flip_even_odd(numbers: number[]): number[] {
  return numbers.map((num) => (num % 2 === 0 ? num + 1 : num - 1));
}

function factor_number(num: number): number[] {
  if (num < 1 || num >= 1000) {
    throw new Error("Number must be between 1 and 999");
  }

  const factors: number[] = [];
  let divisor = 2;

  while (num > 1 && divisor <= Math.sqrt(num)) {
    while (num % divisor === 0) {
      factors.push(divisor);
      num /= divisor;
    }
    divisor++;
  }

  if (num > 1) {
    factors.push(num);
  }

  return factors;
}
