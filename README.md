# PCG-32: A Seedable 32-bit PRNG

A WebAssembly port of the PCG Random Number Generator, [Minimal C Edition](https://github.com/imneme/pcg-c-basic). It's slightly slower than `Math.random()` in V8, and provides only 32 bits of randomness instead of 52.

## Usage

```js
import * as pcg32 from '@alisey/pcg32';

pcg32.setState(0x0123456789ABCDEFn);

console.log(pcg32.randomBits());  // ⇒ 610837995
console.log(pcg32.randomInt(10)); // ⇒ 7
console.log(pcg32.random());      // ⇒ 0.24794234661385417
console.log(pcg32.getState());    // ⇒ 4259798932287663464n
```

## API

##### `randomBits(): number`

Returns a uniformly distributed 32-bit unsigned random integer.

##### `randomInt(bound: number): number`

Returns a uniformly distributed 32-bit unsigned random integer in the range
[0, bound).

##### `random(): number`

Returns a floating point number in the range [0, 1) that has been rounded down
to the nearest multiple of 2⁻³².

##### `setState(state: BigInt)`

Updates the internal state of the generator. The generator has 2⁶⁴ possible
internal states, and iterates through all of them. `state` is a 64-bit unsigned
BigInt.

##### `getState(): BigInt`

Returns a 64-bit unsigned BigInt representing the internal state of the
generator.

## Working With This Repo

1. `npm install`
2. `npm run build`
3. `npm run test`
4. `npm run demo`
5. `npm run perf`

## Links
* [PCG: A Family of Better Random Number Generators](https://www.pcg-random.org)
* [PCG: Using the Minimal C Implementation](https://www.pcg-random.org/using-pcg-c-basic.html)
