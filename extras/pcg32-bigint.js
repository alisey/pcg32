/**
 * A very slow naive implementation of PCG-32 based on BigInt.
 */

const mask32 = 2n ** 32n - 1n;
const mask64 = 2n ** 64n - 1n;

let state = 0x853c49e6748fea9bn;
let sequence = 0xda3e39cb94b95bdbn;

export function randomBits() {
    const oldState = state;
    state = (oldState * 6364136223846793005n + sequence) & mask64;
    const xorShifted = (((oldState >> 18n) ^ oldState) >> 27n) & mask32;
    const rot = oldState >> 59n;
    return Number((xorShifted >> rot) | ((xorShifted << (-rot & 31n)) & mask32));
}
