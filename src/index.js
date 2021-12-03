const wasmBuffer = new Uint8Array([
    /* PCG32_WASM_DATA */
]);
const wasmModule = new WebAssembly.Module(wasmBuffer);
const wasmInstance = new WebAssembly.Instance(wasmModule);
const wasmState = wasmInstance.exports.state;
const wasmSequence = wasmInstance.exports.sequence;
const wasmRandomBits = wasmInstance.exports.randomBits;
const wasmRandomInt = wasmInstance.exports.randomInt;

/**
 * Returns a uniformly distributed 32-bit unsigned random integer.
 */
export const randomBits = () => wasmRandomBits() >>> 0;

/**
 * Returns a uniformly distributed 32-bit unsigned random integer in the
 * range [0, bound).
 * You may think that you can just run randomBits() % bound, but doing so
 * introduces nonuniformity when bound is not a power of two.
 */
export const randomInt = (bound) => wasmRandomInt(bound) >>> 0;

/**
 * Updates the iternal state of the RNG. The RNG has 2⁶⁴ possible internal
 * states, and iterates through all of them.
 * @param state a 64-bit unsigned integer representing the new state.
 */
export const setState = (state) => {
    wasmState.value = state;
};

/**
 * Returns a 64-bit unsigned integer representing the internal state of the RNG.
 */
export const getState = () => BigInt.asUintN(64, wasmState.value);

/**
 * For this generator, there are 2⁶³ possible sequences of pseudorandom numbers.
 * Each sequence is entirely distinct and has a period of 2⁶⁴. This function
 * selects one of the sequences.
 * @param sequence an 64-bit odd BigInt.
 */
export const setSequence = (sequence) => {
    if ((sequence & 1n) !== 1n) {
        throw new RangeError(`The sequence argument must be an odd number`);
    }
    wasmSequence.value = sequence;
};

export const getSequence = () => BigInt.asUintN(64, wasmSequence.value);
