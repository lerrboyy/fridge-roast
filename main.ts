// Fridge Roast: One Line, Biggest Laugh
// make.fun bounty u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb
//
// The program writes a single roast line (max 200 characters) to
// <OUTPUT_DIR>/entry.txt (default /output). The line is a roast of a smart
// fridge that treats a forced 2 a.m. firmware update like a ransom note:
// the fridge will not open until the new terms are accepted, so the
// leftovers are hostages of a EULA. It dodges the obvious cracks the judge
// names (ordering groceries, watching you) and the cheap ones (it's cold,
// the ice maker is broken).

import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The roast. One line, plain text, no trailing newline in the output file.
const ROAST =
  "My smart fridge pushed a firmware update at 2 a.m. and now it won't open until I accept the new terms \u2014 my leftovers are being held hostage by a EULA.";

const MAX_CHARS = 200;

// Invisible format characters that must never sneak into the entry,
// written as explicit escapes so the source stays readable and auditable:
// BOM, zero-width space/joiner/non-joiner, word joiner, LRM/RLM,
// bidi embeddings/overrides/isolates, and the noncharacter U+FFFE.
const INVISIBLE_FORMAT =
  /[\uFEFF\u200B\u200C\u200D\u2060\u200E\u200F\u202A-\u202E\u2066-\u2069\uFFFE]/u;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function validate(line: string): void {
  const chars = [...line];
  if (chars.length < 1) fail("roast line is empty");
  if (chars.length > MAX_CHARS) {
    fail(`roast line is ${chars.length} characters, over the ${MAX_CHARS} limit`);
  }
  if (line.trim().length === 0) fail("roast line is only whitespace");
  if (line.includes("\n") || line.includes("\r")) {
    fail("roast line must be a single line");
  }
  for (const ch of line) {
    const code = ch.codePointAt(0) as number;
    if (code < 0x20 && ch !== "\t") {
      fail(`roast line contains a control character U+${code.toString(16).padStart(4, "0")}`);
    }
  }
  if (INVISIBLE_FORMAT.test(line)) {
    fail("roast line contains an invisible format character");
  }
  if (!/[A-Za-z]/.test(line)) fail("roast line must contain at least one letter");
}

function clearOutputContents(dir: string): void {
  // Clear only the CONTENTS of the output directory. Never remove the
  // directory itself: on the grader it is a mount point and removing it
  // throws EBUSY and fails the run.
  mkdirSync(dir, { recursive: true });
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
}

function main(): void {
  validate(ROAST);

  const outDir = process.env.OUTPUT_DIR ?? "/output";
  clearOutputContents(outDir);

  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ROAST, "utf8");

  // Read the file back and confirm it is byte-for-byte the validated line:
  // no trailing newline, no encoding surprise, nothing extra.
  const written = readFileSync(outPath, "utf8");
  if (written !== ROAST) fail("written entry.txt does not match the validated line");

  const bytes = Buffer.byteLength(ROAST, "utf8");
  console.log(`wrote ${outPath}`);
  console.log(`line: ${ROAST}`);
  console.log(`characters: ${[...ROAST].length} (limit ${MAX_CHARS})`);
  console.log(`bytes: ${bytes}`);
}

main();
