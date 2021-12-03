import {randomBits, randomInt, random} from '../dist/index.js';

const hex32 = (n) => '0x' + n.toString(16).padStart(8, '0');

console.log('randomBits()\n');
for (let i = 0; i < 10; i++) {
    console.log(hex32(randomBits()));
}

console.log('\nrandomInt(10)\n');
for (let i = 0; i < 10; i++) {
    console.log(Array(20).fill().map(() => randomInt(10)).join(' '));
}

console.log('\nrandom()\n');
for (let i = 0; i < 10; i++) {
    console.log(random());
}
