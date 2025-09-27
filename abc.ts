/**
 * Returns the alphabet in reverse order (z to a)
 * @returns {string} The alphabet string in reverse order
 */
function reverse_alphabet(): string {
  return "zyxwvutsrqponmlkjihgfedcba";
}

/**
 * Reverses the order of numbers in an array
 * @param {number[]} numbers - Array of numbers to reverse
 * @returns {number[]} The reversed array of numbers
 */
function reverse_number_line(numbers: number[]) {
  return numbers.reverse();
}

/**
 * Flips even and odd numbers by adding 1 to even numbers and subtracting 1 from odd numbers
 * @param {number[]} numbers - Array of numbers to flip
 * @returns {number[]} Array with even numbers incremented and odd numbers decremented
 */
function flip_even_odd(numbers: number[]): number[] {
  return numbers.map((num) => (num % 2 === 0 ? num + 1 : num - 1));
}

/**
 * Finds the prime factors of a given number
 * @param {number} num - The number to factor (must be between 1 and 999)
 * @returns {number[]} Array of prime factors
 * @throws {Error} Throws an error if the number is not between 1 and 999
 */
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
