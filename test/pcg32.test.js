import {test, expect} from '@jest/globals';
import * as pcg32 from '../dist/index.js';

import expectedRandomBits from './reference-output/pcg32-random.js';
import expectedRandomBools from './reference-output/pcg32-boundedrand-2.js';
import expectedRandomInts from './reference-output/pcg32-boundedrand-0xfafafafa.js';

const initialState = pcg32.getState();

test('pcg32.randomInt(0x1_0000_0000)', () => {
    pcg32.setState(initialState);
    for (const expected of expectedRandomBits) {
        const actual = pcg32.randomInt(0x1_0000_0000);
        if (actual !== expected) {
            expect(actual).toBe(expected);
        }
    }
});

test('pcg32.randomInt(0xfafafafa)', () => {
    pcg32.setState(initialState);
    for (const expected of expectedRandomInts) {
        const actual = pcg32.randomInt(0xfafafafa);
        if (actual !== expected) {
            expect(actual).toBe(expected);
        }
    }
});

test('pcg32.randomInt(2)', () => {
    pcg32.setState(initialState);
    for (const expected of expectedRandomBools) {
        const actual = pcg32.randomInt(2);
        if (actual !== expected) {
            expect(actual).toBe(expected);
        }
    }
});

test('pcg32.random()', () => {
    const expectedRandomFloats = [
        0.3954529808570445, 0.24169348468376284, 0.7333849163448338, 0.9467072658853242, 0.297499610337988,
        0.5820852640850929, 0.7923910866606445, 0.3045990233129916, 0.4103969627549837, 0.9893965449542568,
    ];

    pcg32.setState(initialState);
    for (const expected of expectedRandomFloats) {
        const actual = pcg32.random();
        if (actual !== expected) {
            expect(actual).toBe(expected);
        }
    }
});
