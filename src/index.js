const wasmBuffer = new Uint8Array([
    /* PCG32_WASM_DATA */
]);
const wasmModule = new WebAssembly.Module(wasmBuffer);
const wasmInstance = new WebAssembly.Instance(wasmModule);
const wasmState = wasmInstance.exports.state;
const wasmSequence = wasmInstance.exports.sequence;
const wasmRandomInt32 = wasmInstance.exports.randomInt32;
const wasmRandomInt = wasmInstance.exports.randomInt;

/**
 * Returns a uniformly distributed 32-bit unsigned random integer.
 */
export const randomInt32 = () => wasmRandomInt32() >>> 0;

/**
 * Returns a uniformly distributed 32-bit unsigned random integer in the range
 * [0, bound).
 */
export const randomInt = (bound) => {
    if (bound < 1 || bound > 0x1_0000_0000) {
        throw new RangeError('randomInt() bound must be between 1 and 2³²');
    } else if (bound === 0x1_0000_0000) {
        return wasmRandomInt32() >>> 0;
    }
    return wasmRandomInt(bound) >>> 0;
};

/**
 * Returns a uniformly distributed  floating point number in the range [0, 1)
 * that has been rounded down to the nearest multiple of 2⁻⁵³.
 *
 * This includes all possible double-precision floating-point numbers in the
 * range [0.5, 1), but only half of numbers in the range [0.25, 0.5), a quarter
 * of numbers in the range [0.125, 0.25), and so forth, because the floating
 * point format has a higher resolution for numbers closer to zero. This is also
 * the reason why selecting a number from all floating point numbers in the
 * range [0, 1) with equal probability would not result in a uniform
 * distribution.
 *
 * Multiplying the result by 2⁵³ can be used to generate a random integer in the
 * range [0, 2⁵³), but for other ranges of integers it's preferable to use
 * randomInt() because it's more efficient and doesn't introduce a bias due to
 * rounding when the upper bound is not a power of two.
 */
export const random = () =>
    // 1. Create a 53-bit integer from two 32-bit integers by combining the
    //    lowest 21 bits of the first with all bits of the second.
    // 2. Multiply the result by 2⁻⁵³ to map it to the range [0, 1).
    //    0x0000_0000, 0x0000_0000 ⇒ 0
    //    0x0000_0000, 0x0000_0001 ⇒ 2⁻⁵³
    //    0x001f_ffff, 0xffff_ffff ⇒ 1 - 2⁻⁵³
    ((randomInt32() & 0x1f_ffff) * 0x1_0000_0000 + randomInt32()) * 1.1102230246251565e-16;

/**
 * Updates the internal state of the generator, which has 2⁶⁴ possible internal
 * states, and iterates through all of them.
 * @param state - a 64-bit unsigned BigInt representing the new state.
 */
export const setState = (state) => {
    wasmState.value = state;
};

/**
 * Returns a 64-bit unsigned BigInt representing the internal state of the
 * generator.
 */
export const getState = () => BigInt.asUintN(64, wasmState.value);

/**
 * For this generator, there are 2⁶³ possible sequences of pseudorandom numbers.
 * Each sequence is entirely distinct and has a period of 2⁶⁴. This function
 * selects one of the sequences.
 * @param sequence - a 64-bit odd BigInt.
 */
export const setSequence = (sequence) => {
    if ((sequence & 1n) !== 1n) {
        throw new RangeError(`The sequence argument must be an odd number`);
    }
    wasmSequence.value = sequence;
};

/**
 * Returns a 64-bit unsigned BigInt representing the selected sequence.
 */
export const getSequence = () => BigInt.asUintN(64, wasmSequence.value);

/**
 * Seeds the generator. If the value is not provided, uses a value based on
 * Math.random().
 * @param value - a 64-bit BigInt.
 */
export const seed = (value = BigInt(Math.floor(Math.random() * 2 ** 53))) => {
    wasmState.value = 0n;
    randomInt32();
    wasmState.value += value;
    randomInt32();
};
