// testing this file

// Aidan wrote this line

// AIDAN SAID THI
export const intersection = <T>(setA: Set<T>, setB: Set<T>): Set<T> => {
  const _intersection = new Set<T>();
  for (const elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
};

export const difference = <T>(setA: Set<T>, setB: Set<T>): Set<T> => {
  const _difference = new Set<T>(setA);
  for (const elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
};

export const symmetricDifference = <T>(setA: Set<T>, setB: Set<T>): Set<T> => {
  const _symmetricDifference = new Set<T>(setA);
  for (const elem of setB) {
    if (_symmetricDifference.has(elem)) {
      _symmetricDifference.delete(elem);
    } else {
      _symmetricDifference.add(elem);
    }
  }
  return _symmetricDifference;
};

export const isSuperset = <T>(set: Set<T>, subset: Set<T>): boolean => {
  for (const elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
};

export const isSubset = <T>(set: Set<T>, superset: Set<T>): boolean => {
  for (const elem of set) {
    if (!superset.has(elem)) {
      return false;
    }
  }
  return true;
};

