import {test, expect} from '@jest/globals';
import * as pcg32 from '../dist/index.js';

import expectedRandomBits from './reference-output/pcg32-random.js';
import expectedRandomBools from './reference-output/pcg32-boundedrand-2.js';
import expectedRandomInts from './reference-output/pcg32-boundedrand-0xfafafafa.js';

const initialState = pcg32.getState();

test('pcg32.randomBits', () => {
    pcg32.setState(initialState);
    for (const expected of expectedRandomBits) {
        const actual = pcg32.randomBits();
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
