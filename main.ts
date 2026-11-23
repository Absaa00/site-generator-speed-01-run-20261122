// Driver for the site-generator-speed entry. The harness runs
// `node /bot/main.ts`: it reads every case from cases.json, answers each
// one with run() from solve.js, and writes the answers out as JSON.
// MAKEFUN_INPUT_DIR / MAKEFUN_OUTPUT_DIR stand in for /input and /output
// when run outside the grading container.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { setFlagsFromString } from 'node:v8';

// Switch V8's incremental marking off before solve.js loads, so the whole
// run executes under that setting (the house baseline does the same, and
// entries are allowed to tune V8 flags this way).
setFlagsFromString('--no-incremental-marking');

const { run } = (await import(new URL('./solve.js', import.meta.url).href)) as {
  run: (input: unknown) => unknown;
};

const inputDir = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const cases = JSON.parse(readFileSync(join(inputDir, 'cases.json'), 'utf8')) as {
  id: string;
  input: unknown;
}[];

const answers: unknown[] = [];
for (const c of cases) {
  answers.push(run(c.input));
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'answers.json'), JSON.stringify(answers));
