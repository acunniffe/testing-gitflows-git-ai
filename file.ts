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
