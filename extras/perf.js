import { randomBits, randomInt } from '../dist/index.js';

function perfMathRandom() {
    let sum = 0;
    const start = performance.now();
    for (let i = 0; i < 1e6; i++) {
        sum += Math.random();
    }
    const end = performance.now();
    console.log('');
    console.log('Math.random()');
    console.log('Sum: ', sum);
    console.log('Time: ', end - start);
}

function perfPcgRandomBits() {
    let sum = 0;
    const start = performance.now();
    for (let i = 0; i < 1e6; i++) {
        sum += randomBits();
    }
    const end = performance.now();
    console.log('');
    console.log('pcg.randomBits()');
    console.log('Sum: ', sum);
    console.log('Time: ', end - start);
}

function pefMathRandomInt() {
    let sum = 0;
    const start = performance.now();
    for (let i = 0; i < 1e6; i++) {
        sum += Math.floor(Math.random() * 0xfafafafa);
    }
    const end = performance.now();
    console.log('');
    console.log('Math.floor(Math.random() * bound)');
    console.log('Sum: ', sum);
    console.log('Time: ', end - start);
}

function perfPcgRandomInt() {
    let sum = 0;
    const start = performance.now();
    for (let i = 0; i < 1e6; i++) {
        sum += randomInt(0xfafafafa);
    }
    const end = performance.now();
    console.log('');
    console.log('pcg.randomInt(bound)');
    console.log('Sum: ', sum);
    console.log('Time: ', end - start);
}

perfMathRandom();
perfPcgRandomBits();
pefMathRandomInt();
perfPcgRandomInt();
