/**
 * Returns the union of two sets (all elements from both sets)
 * @param setA First set
 * @param setB Second set
 * @returns A new set containing all elements from both sets
 */
export function setUnion<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return new Set([...setA, ...setB]);
}

