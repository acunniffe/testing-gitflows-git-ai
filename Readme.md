# Set Operations Library

A TypeScript library providing essential set operations for working with JavaScript `Set` objects. This library offers a collection of utility functions for performing common set operations like union, intersection, difference, and more.

## Features

This library provides the following set operations:

- **Union** - Combine all elements from two sets
- **Intersection** - Find elements common to both sets
- **Difference** - Find elements in the first set but not in the second
- **Symmetric Difference** - Find elements in either set but not in both
- **Superset Check** - Determine if one set contains all elements of another
- **Subset Check** - Determine if one set is contained within another

## Installation

Since this is a TypeScript project, you can use the functions directly by importing them:

```typescript
import { union, intersection, difference } from './set-ops';
// or
import { setUnion, setIntersect, setDiff } from './src/set-ops';
```

## Usage

### Basic Operations

```typescript
import { union, intersection, difference, symmetricDifference } from './set-ops';

// Create some sets
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// Union: all elements from both sets
const unionResult = union(setA, setB);
// Result: Set { 1, 2, 3, 4, 5, 6 }

// Intersection: elements in both sets
const intersectionResult = intersection(setA, setB);
// Result: Set { 3, 4 }

// Difference: elements in setA but not in setB
const differenceResult = difference(setA, setB);
// Result: Set { 1, 2 }

// Symmetric Difference: elements in either set but not both
const symDiffResult = symmetricDifference(setA, setB);
// Result: Set { 1, 2, 5, 6 }
```

### Set Relationships

```typescript
import { isSuperset, isSubset } from './set-ops';

const setA = new Set([1, 2, 3, 4, 5]);
const setB = new Set([2, 3, 4]);

// Check if setA is a superset of setB
const isSuper = isSuperset(setA, setB);
// Result: true

// Check if setB is a subset of setA
const isSub = isSubset(setB, setA);
// Result: true
```

### Working with Different Types

All functions are generic and work with any type:

```typescript
// Strings
const fruitsA = new Set(['apple', 'banana', 'orange']);
const fruitsB = new Set(['banana', 'grape', 'apple']);
const allFruits = union(fruitsA, fruitsB);

// Objects (with proper comparison)
const usersA = new Set([{ id: 1 }, { id: 2 }]);
const usersB = new Set([{ id: 2 }, { id: 3 }]);
const allUsers = union(usersA, usersB);
```

## API Reference

### `union<T>(setA: Set<T>, setB: Set<T>): Set<T>`

Returns a new set containing all elements from both `setA` and `setB`.

### `intersection<T>(setA: Set<T>, setB: Set<T>): Set<T>`

Returns a new set containing only the elements that are present in both `setA` and `setB`.

### `difference<T>(setA: Set<T>, setB: Set<T>): Set<T>`

Returns a new set containing elements that are in `setA` but not in `setB`.

### `symmetricDifference<T>(setA: Set<T>, setB: Set<T>): Set<T>`

Returns a new set containing elements that are in either `setA` or `setB`, but not in both.

### `isSuperset<T>(set: Set<T>, subset: Set<T>): boolean`

Returns `true` if `set` contains all elements of `subset`, `false` otherwise.

### `isSubset<T>(set: Set<T>, superset: Set<T>): boolean`

Returns `true` if all elements of `set` are contained in `superset`, `false` otherwise.

## Notes

- All functions return new `Set` objects and do not modify the input sets
- Functions are generic and work with any type `T`
- Empty sets are handled correctly in all operations

## License

This project is open source and available for use.
