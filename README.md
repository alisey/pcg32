# PCG-32: A Seedable 32-bit PRNG

This is JavaScript port of the PCG Random Number Generator, [Minimal C Edition](https://github.com/imneme/pcg-c-basic).

It's slightly slower than `Math.random()` in V8, and provides only 32 bits of randomness instead of 52.

### Try it out

1. `npm install`
2. `npm run build`
3. `npm run demo`
4. `npm run perf`

### Links
* [PCG: A Family of Better Random Number Generators](https://www.pcg-random.org)
* [PCG: Using the Minimal C Implementation](https://www.pcg-random.org/using-pcg-c-basic.html)
