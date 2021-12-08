import * as pcg from '../dist/index.js';

pcg.setState(0x0123456789ABCDEFn);

console.log('\nrandomInt(10)\n');
for (let i = 0; i < 10; i++) {
    console.log(Array.from({length: 20}, () => pcg.randomInt(10)).join(' '));
}

console.log('\nrandom()\n');
for (let i = 0; i < 10; i++) {
    console.log(pcg.random());
}

console.log('\n');
