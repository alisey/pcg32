# PCG-32: A Seedable 32-bit PRNG

A WebAssembly port of the PCG Random Number Generator, [Minimal C Edition](https://github.com/imneme/pcg-c-basic).

## Usage

```js
import * as pcg from '@alisey/pcg32';

pcg.setState(0x0123456789ABCDEFn);

console.log(pcg.randomInt(10)); // ⇒ 5
console.log(pcg.random());      // ⇒ 0.3697000732146962
```

## API

##### `randomInt(bound: number): number`

Returns a uniformly distributed 32-bit unsigned random integer in the range
[0, bound), where `bound` is a number from 1 to 2³².

##### `random(): number`

Returns a uniformly distributed  floating point number in the range [0, 1) that
has been rounded down to the nearest multiple of 2⁻⁵³.

##### `setState(state: bigint): void`

Updates the internal state of the generator. The generator has 2⁶⁴ possible
internal states, and iterates through all of them. `state` is a 64-bit unsigned
BigInt.

##### `getState(): bigint`

Returns a 64-bit unsigned BigInt representing the internal state of the
generator.

##### `seed(value?: bigint): void`

Seeds the generator with a 64-bit BigInt. If the value is not provided, uses
a value based on `Math.random()`.

## Performance

As of 2021, in V8 `pcg.randomInt()` is as fast as
`Math.floor(Math.random() * n)`, but doesn't introduce bias. `pcg.random()` is
2 times slower than `Math.random()`.

In SpiderMonkey and JavaScriptCore both functions are 10 times slower than
native equivalents.

## Working With This Repo

1. `npm install`
2. `npm run build`
3. `npm run test`
4. `npm run demo`
5. `npm run perf`

## Links
* [PCG: A Family of Better Random Number Generators](https://www.pcg-random.org)
* [PCG: Using the Minimal C Implementation](https://www.pcg-random.org/using-pcg-c-basic.html)
