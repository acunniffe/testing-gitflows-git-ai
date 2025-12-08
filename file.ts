// Hello world

/**
 * Calculate pi using the Leibniz formula (infinite series)
 * π/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...
 * 
 * @param iterations - Number of iterations (more iterations = more accuracy)
 * @returns Approximation of pi
 */
export function calculatePiLeibniz(iterations: number): number {
  let pi = 0;
  for (let i = 0; i < iterations; i++) {
    const sign = i % 2 === 0 ? 1 : -1;
    pi += sign / (2 * i + 1);
  }
  return pi * 4;
}

/**
 * Calculate pi using the Monte Carlo method
 * Randomly generates points in a unit square and counts how many fall inside a unit circle
 * 
 * @param iterations - Number of random points to generate (more iterations = more accuracy)
 * @returns Approximation of pi
 */
export function calculatePiMonteCarlo(iterations: number): number {
  let pointsInsideCircle = 0;
  
  for (let i = 0; i < iterations; i++) {
    const x = Math.random();
    const y = Math.random();
    const distance = Math.sqrt(x * x + y * y);
    
    if (distance <= 1) {
      pointsInsideCircle++;
    }
  }
  
  // Ratio of points inside circle to total points approximates π/4
  return (pointsInsideCircle / iterations) * 4;
}

/**
 * Calculate pi using the Nilakantha series (converges faster than Leibniz)
 * π = 3 + 4/(2×3×4) - 4/(4×5×6) + 4/(6×7×8) - ...
 * 
 * @param iterations - Number of iterations (more iterations = more accuracy)
 * @returns Approximation of pi
 */
export function calculatePiNilakantha(iterations: number): number {
  let pi = 3;
  let sign = 1;
  
  for (let i = 1; i <= iterations; i++) {
    const denominator = 2 * i * (2 * i + 1) * (2 * i + 2);
    pi += sign * (4 / denominator);
    sign *= -1;
  }
  
  return pi;
}

// Example usage:
// console.log('Leibniz (1000 iterations):', calculatePiLeibniz(1000));
// console.log('Monte Carlo (100000 iterations):', calculatePiMonteCarlo(100000));
// console.log('Nilakantha (100 iterations):', calculatePiNilakantha(100));

/**
 * Calculate e (Euler's number) using the infinite series
 * e = 1 + 1/1! + 1/2! + 1/3! + 1/4! + ...
 * 
 * @param iterations - Number of iterations (more iterations = more accuracy)
 * @returns Approximation of e
 */
export function calculateESeries(iterations: number): number {
  let e = 1;
  let factorial = 1;
  
  for (let i = 1; i <= iterations; i++) {
    factorial *= i;
    e += 1 / factorial;
  }
  
  return e;
}

/**
 * Calculate e using the limit definition
 * e = lim(n→∞) (1 + 1/n)^n
 * 
 * @param n - Large number to approximate the limit (larger n = more accuracy)
 * @returns Approximation of e
 */
export function calculateELimit(n: number): number {
  return Math.pow(1 + 1 / n, n);
}

/**
 * Calculate e^x using the Taylor series expansion
 * e^x = 1 + x/1! + x²/2! + x³/3! + ...
 * 
 * @param x - The exponent
 * @param iterations - Number of iterations (more iterations = more accuracy)
 * @returns Approximation of e^x
 */
export function calculateEToPowerX(x: number, iterations: number): number {
  let result = 1;
  let factorial = 1;
  let power = 1;
  
  for (let i = 1; i <= iterations; i++) {
    factorial *= i;
    power *= x;
    result += power / factorial;
  }
  
  return result;
}

// Example usage for e:
// console.log('Series (20 iterations):', calculateESeries(20));
// console.log('Limit (1000000):', calculateELimit(1000000));
// console.log('e^2 (20 iterations):', calculateEToPowerX(2, 20));
