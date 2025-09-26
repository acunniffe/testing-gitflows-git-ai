function reverse_alphabet(): string {
  return "zyxwvutsrqponmlkjihgfedcba";
}

function reverse_number_line(numbers: number[]) {
  return numbers.reverse();
}

function flip_even_odd(numbers: number[]): number[] {
  return numbers.map((num) => (num % 2 === 0 ? num + 1 : num - 1));
}
