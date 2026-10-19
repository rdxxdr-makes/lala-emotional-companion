import { describe, expect, it } from "vitest";

import { crisisReply, getLalaMood, getLalaReply } from "@/lib/lala-responses";

describe("Lala's local emotional response matching", () => {
  it.each([
    ["I topped my exam", "happy"],
    ["I failed", "sad"],
    ["I am stressed", "stressed"],
    ["I feel lonely", "lonely"],
    ["I'm not feeling well", "tired"],
    ["I am angry", "angry"],
    ["It was an ordinary day", "neutral"],
  ] as const)("recognizes the feeling in %s", (message, expectedMood) => {
    expect(getLalaMood(message)).toBe(expectedMood);
  });

  it("shows the requested safety reply for self-harm language", () => {
    expect(getLalaReply("I want to hurt myself")).toBe(crisisReply);
    expect(crisisReply).toBe(
      "I’m really glad you shared this. Please contact someone you trust nearby or your local emergency service right now.",
    );
  });

  it("varies supportive replies for the same feeling", () => {
    expect(getLalaReply("I topped my exam", () => 0)).not.toBe(
      getLalaReply("I topped my exam", () => 0.9),
    );
  });
});