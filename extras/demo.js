import { randomBits, randomInt } from '../dist/index.js';

const hex32 = (n) => '0x' + n.toString(16).padStart(8, '0');

for (let i = 0; i < 10; i++) {
    console.log(hex32(randomBits()));
}

console.log('----------');

for (let i = 0; i < 10; i++) {
    console.log(hex32(randomInt(0xfafafafa)));
}
