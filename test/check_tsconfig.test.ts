import * as fs from 'fs';
import * as assert from 'assert';

const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));

assert.ok(tsconfig.exclude.includes('scripts'), 'tsconfig.json should exclude "scripts"');
