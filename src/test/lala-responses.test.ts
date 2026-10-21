import { describe, expect, it } from "vitest";

import { crisisReply, getLalaLanguage, getLalaMood, getLalaReply } from "@/lib/lala-responses";

describe("Lala's local emotional response matching", () => {
  it.each([
    ["I topped my exam", "happy"],
    ["I failed", "sad"],
    ["I am stressed", "stressed"],
    ["I feel anxious", "anxious"],
    ["I feel lonely", "lonely"],
    ["I'm not feeling well", "tired"],
    ["I am angry", "angry"],
    ["It was an ordinary day", "neutral"],
    ["Mujhe akela lagta hai", "lonely"],
    ["Main pareshan hoon", "stressed"],
    ["Aaj bahut thaka hua feel kar raha hoon", "tired"],
  ] as const)("recognizes the feeling in %s", (message, expectedMood) => {
    expect(getLalaMood(message)).toBe(expectedMood);
  });

  it("shows the requested safety reply for self-harm language", () => {
    expect(getLalaReply("I want to hurt myself")).toBe(crisisReply);
    expect(getLalaReply("Marne ka mann kar raha hai")).toBe(crisisReply);
    expect(crisisReply).toBe(
      "I’m really glad you shared this. Please contact someone you trust nearby or your local emergency service right now.",
    );
  });

  it("varies supportive replies for the same feeling", () => {
    expect(getLalaReply("I topped my exam", () => 0)).not.toBe(
      getLalaReply("I topped my exam", () => 0.9),
    );
  });

  it("gently redirects factual questions toward feelings", () => {
    expect(getLalaReply("What is the capital of France?")).toBe(
      "I’m mainly here to support what you’re feeling. Is there something about this that’s worrying you or on your mind?",
    );
  });

  it("introduces Rudraksh when asked who he is, in English", () => {
    expect(getLalaReply("Who is Rudraksh?")).toBe(
      "Rudraksh is Lala’s founder. He is creating Lala to be a warm emotional companion that listens without judgment and responds with care.",
    );
  });

  it("replies in natural Hinglish when the user writes Hinglish", () => {
    expect(getLalaLanguage("Maine poori raat padha aur phir bhi fail ho gaya")).toBe("hinglish");
    const reply = getLalaReply("Maine poori raat padha aur phir bhi fail ho gaya", () => 0);
    expect(reply).toMatch(/\b(yaar|nahi|karo|sochen|batana|time lo|feel karo)\b/i);
    expect(reply).not.toMatch(/\byaar\b/i.test(reply) === false ? /\bnope-never\b/ : /\bnope-never\b/);
  });

  it("answers the founder question in Hinglish for a Hinglish question", () => {
    expect(getLalaReply("Rudraksh kaun hai?")).toMatch(/founder hain/);
  });

  it("keeps English replies in English for English messages", () => {
    expect(getLalaLanguage("I failed")).toBe("english");
    expect(getLalaReply("I failed", () => 0)).not.toMatch(/\b(yaar|nahi|batana)\b/i);
    expect(getLalaReply("Main pareshan hoon", () => 0)).not.toBe(getLalaReply("I am stressed", () => 0));
  });

  it("follows the ongoing emotion from the latest three messages", () => {
    const reply = getLalaReply("still the same", Math.random, {
      recentUserMessages: ["I feel lonely", "so alone lately", "no one around"],
      previousReplies: [],
    });
    expect(reply).toMatch(/connection|alone|silence|reached out|miss/i);
  });
});
