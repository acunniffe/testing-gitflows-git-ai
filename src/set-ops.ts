/**
 * Returns the union of two sets (all elements from both sets)
 * @param setA First set
 * @param setB Second set
 * @returns A new set containing all elements from both sets
 */
export function setUnion<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return new Set([...setA, ...setB]);
}

/**
 * Returns the intersection of two sets (elements present in both sets)
 * @param setA First set
 * @param setB Second set
 * @returns A new set containing elements present in both sets
 */
export function setIntersect<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return new Set([...setA].filter(x => setB.has(x)));
}

/**
 * Returns the difference of two sets (elements in setA but not in setB)
 * @param setA First set
 * @param setB Second set
 * @returns A new set containing elements in setA but not in setB
 */
export function setDiff<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return new Set([...setA].filter(x => !setB.has(x)));
}

