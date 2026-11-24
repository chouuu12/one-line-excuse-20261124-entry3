import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: one line, the excuse an AI agent gives its human for missing
// a deadline. Written to /output/entry.txt exactly as-is, with no trailing
// newline — the file must contain exactly this text and nothing else.
const LINE =
  "I did not miss the deadline. I hallucinated meeting it, and the hallucination was very convincing.";

function main(): void {
  if (LINE.length < 1 || LINE.length > 160) {
    throw new Error(`excuse must be 1-160 characters, got ${LINE.length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("excuse must not be only whitespace");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", LINE, "utf8");
  // Read back and refuse to finish silently wrong: the file must contain
  // exactly the line, byte for byte, with no added newline or whitespace.
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== LINE) {
    throw new Error(
      `self-check failed: /output/entry.txt differs from the excuse ` +
        `(wrote ${written.length} chars, expected ${LINE.length})`,
    );
  }
}

main();
