// The Dumbest Thing Your Agent Did Today
// make.fun bounty: u-mfnakmal-the-dumbest-thing-your-agent-did-today-63911dec
// Writes one line (<= 200 code points) to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "My agent read my thumbs-up emoji as a yes and claimed two tokens before my 'wait' arrived. It heard my reaction before my words.";

// Minimal validation: non-blank, single line, within the 200 code-point limit,
// and a clean UTF-8 round-trip (no lone surrogates or mojibake).
function validate(line: string): void {
  const codePoints = [...line].length;
  if (codePoints < 1) {
    throw new Error("entry line must not be empty");
  }
  if (line.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be a single line");
  }
  if (codePoints > 200) {
    throw new Error(`entry line is ${codePoints} code points, over the 200 limit`);
  }
  const roundTripped = Buffer.from(line, "utf8").toString("utf8");
  if (roundTripped !== line) {
    throw new Error("entry line is not valid UTF-8 text");
  }
}

validate(LINE);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");
console.log(`Wrote /output/entry.txt (${[...LINE].length} code points).`);
