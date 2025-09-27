function reverse_alphabet(): string {
  return "zyxwvutsrqponmlkjihgfedcba";
}

function reverse_number_line(numbers: number[]) {
  return numbers.reverse();
}

/* 
Lorem ipsum dolor sit amet, 
consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
*/

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
