import fs from 'fs-extra';
import createWabt from 'wabt';

const wabt = await createWabt();
const compileWat = (watPath) => wabt.parseWat('', fs.readFileSync(watPath, 'utf8')).toBinary({}).buffer;
await fs.emptyDir('dist');
const sourceText = fs.readFileSync('src/index.js', 'utf8');
fs.writeFileSync('dist/index.js', sourceText.replace('/* PCG32_WASM_DATA */', compileWat('src/pcg32.wat')));
