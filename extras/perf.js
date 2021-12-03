import { randomBits, randomInt, random } from '../dist/index.js';

function perfMathRandom() {
    let sum = 0;
    const start = performance.now();
    for (let i = 0; i < 1e8; i++) {
        sum += Math.random();
    }
    const end = performance.now();
    console.log('Math.random()');
    console.log('Sum: ', sum);
    console.log('Time: ', end - start);
}

function perfPcgRandom() {
    let sum = 0;
    const start = performance.now();
    for (let i = 0; i < 1e8; i++) {
        sum += random();
    }
    const end = performance.now();
    console.log('pcg32.random()');
    console.log('Sum: ', sum);
    console.log('Time: ', end - start);
}

function pefMathRandomInt() {
    let sum = 0;
    const start = performance.now();
    for (let i = 0; i < 1e8; i++) {
        sum += Math.floor(Math.random() * 10);
    }
    const end = performance.now();
    console.log('Math.floor(Math.random() * 10)');
    console.log('Sum: ', sum);
    console.log('Time: ', end - start);
}

function perfPcgRandomInt() {
    let sum = 0;
    const start = performance.now();
    for (let i = 0; i < 1e8; i++) {
        sum += randomInt(10);
    }
    const end = performance.now();
    console.log('pcg.randomInt(10)');
    console.log('Sum: ', sum);
    console.log('Time: ', end - start);
}

perfMathRandom();
perfPcgRandom();
console.log('');
pefMathRandomInt();
perfPcgRandomInt();
