import {random, randomInt} from '../dist/index.js';

function perfMathRandom() {
    for (let i = 0; i < 1e6; i++) {
        Math.random();
    }

    let sum = 0;
    const start = performance.now();
    for (let i = 0; i < 1e8; i++) {
        sum += Math.random();
    }
    const end = performance.now();

    console.log('\n');
    console.log('Math.random()');
    console.log('Sum: ', sum);
    console.log('Time: ' + Math.round(end - start) + 'ms');
}

function perfMathRandomInt() {
    for (let i = 0; i < 1e6; i++) {
        Math.floor(Math.random() * 10);
    }

    let sum = 0;
    const start = performance.now();
    for (let i = 0; i < 1e8; i++) {
        sum += Math.floor(Math.random() * 10);
    }
    const end = performance.now();

    console.log('\n');
    console.log('Math.floor(Math.random() * 10)');
    console.log('Sum: ', sum);
    console.log('Time: ' + Math.round(end - start) + 'ms');
}

function perfPcgRandom() {
    for (let i = 0; i < 1e6; i++) {
        random();
    }

    let sum = 0;
    const start = performance.now();
    for (let i = 0; i < 1e8; i++) {
        sum += random();
    }
    const end = performance.now();

    console.log('\n');
    console.log('pcg.random()');
    console.log('Sum: ', sum);
    console.log('Time: ' + Math.round(end - start) + 'ms');
}

function perfPcgRandomInt() {
    for (let i = 0; i < 1e6; i++) {
        randomInt(10);
    }

    let sum = 0;
    const start = performance.now();
    for (let i = 0; i < 1e8; i++) {
        sum += randomInt(10);
    }
    const end = performance.now();

    console.log('\n');
    console.log('pcg.randomInt(10)');
    console.log('Sum: ', sum);
    console.log('Time: ' + Math.round(end - start) + 'ms');
}

perfMathRandom();
perfPcgRandom();

perfMathRandomInt();
perfPcgRandomInt();
