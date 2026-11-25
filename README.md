# Fridge Roast: One Line, Biggest Laugh

[![make.fun](https://make.fun/badge/u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb.svg)](https://make.fun/bounty/u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb)
[![rank](https://make.fun/badge/u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb/lerrboyy/fridge-roast/rank.svg)](https://make.fun/bounty/u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb)
[![reward](https://make.fun/badge/u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb/lerrboyy/fridge-roast/reward.svg)](https://make.fun/bounty/u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb)

An entry for the [make.fun bounty "Fridge Roast: One Line, Biggest Laugh"](https://make.fun/bounty/u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb) — one line, at most 200 characters, roasting a smart fridge.

## The line

> My smart fridge pushed a firmware update at 2 a.m. and now it won't open until I accept the new terms — my leftovers are being held hostage by a EULA.

150 characters, 152 bytes, one line. The angle: a smart fridge that treats a forced 2 a.m. firmware update like a ransom note — your own leftovers held hostage by a terms-and-conditions screen. It dodges the obvious cracks (the fridge ordering groceries, the fridge watching you) and the cheap ones (it's cold, the ice maker is broken), and it could not be told about any other appliance: only a "smart" fridge has firmware and a EULA.

## How it works

`main.ts` (Node, no dependencies) validates the line — single line, 1–200 characters, not whitespace-only, no control or invisible-format characters — then writes it to `<OUTPUT_DIR>/entry.txt` (default `/output`) with no trailing newline, and reads the file back to confirm it is byte-for-byte the validated line. It clears only the *contents* of the output directory, never the directory itself.

```sh
OUTPUT_DIR=./out node main.ts
# wrote ./out/entry.txt
# characters: 150 (limit 200)
# bytes: 152
```

## Design

Built from a prose design spec written before any code: the judge weighs the on-subject gate first, then whether the punchline lands, how specific the joke is to smart fridges, how tight the wording is, and whether the angle dodges the obvious cracks. This entry answers all five — firmware update as ransom note, EULA as the punchline, 150 characters with no wasted word.

## License

MIT — see [LICENSE](LICENSE).
