export type LalaMood =
  | "happy"
  | "sad"
  | "stressed"
  | "lonely"
  | "tired"
  | "angry"
  | "neutral";

export const crisisReply =
  "I’m really glad you shared this. Please contact someone you trust nearby or your local emergency service right now.";

const replySets: Record<LalaMood, readonly string[]> = {
  happy: [
    "That’s wonderful—you worked hard for this. I hope you’re taking a moment to feel proud.",
    "You did it! I’m so happy for you. What part are you most proud of?",
    "That is such lovely news. You deserve to enjoy this moment.",
  ],
  sad: [
    "I’m sorry—that must feel disappointing. One hard result doesn’t define you.",
    "Oh, that hurts. You put in effort, and that still matters. I’m here with you.",
    "It’s okay to feel upset. You don’t have to figure everything out right now.",
  ],
  stressed: [
    "It sounds like a lot to carry. Let’s take one slow breath together—you can go one step at a time.",
    "I hear you. You don’t need to solve everything this minute. What feels most pressing?",
    "That sounds overwhelming. Take a small pause; we can untangle one thing at a time.",
  ],
  lonely: [
    "I’m glad you came to me. You deserve connection, and I’m right here listening.",
    "That can feel so heavy. I’m here with you—would it help to tell me more?",
    "You don’t have to fill the silence. I’m here, and I’m listening.",
  ],
  tired: [
    "I’m sorry you’re feeling worn out. If you can, let yourself rest a little—you deserve care too.",
    "That sounds exhausting. Maybe keep things gentle with yourself for now.",
    "I hear you. Even a little rest or a glass of water could be a kind first step.",
  ],
  angry: [
    "I can hear how frustrating this is. It’s okay to feel angry; we can take a moment before reacting.",
    "That sounds really upsetting. I’m here to listen, without judging you.",
    "Your feelings make sense. Want to tell me which part bothered you most?",
  ],
  neutral: [
    "I’m listening. You can tell me as much or as little as you like.",
    "Thanks for sharing that with me. What’s been on your mind lately?",
    "I’m here with you. Take your time—there’s no rush.",
  ],
};

const patterns: ReadonlyArray<readonly [LalaMood, RegExp]> = [
  ["happy", /\b(topped|topper|aced|passed|won|achievement|achieved|promoted|proud|excited|happy|celebrat|good news|succeeded|success)\b/i],
  ["sad", /\b(failed|failure|fail|lost|loss|heartbroken|upset|sad|crying|disappointed|rejected|hurt)\b/i],
  ["stressed", /\b(stressed|stress|anxious|anxiety|worried|worry|overwhelmed|panic|nervous|pressure|scared|afraid)\b/i],
  ["lonely", /\b(lonely|alone|isolated|no friends|nobody cares|no one cares|left out|miss everyone)\b/i],
  ["tired", /\b(tired|exhausted|sleepy|unwell|not feeling well|sick|ill|headache|burnt out|burned out)\b/i],
  ["angry", /\b(angry|anger|furious|mad|frustrated|annoyed|irritated|rage)\b/i],
];

const crisisPattern =
  /\b(suicid(?:e|al)|self[ -]?harm|hurt(?:ing)? myself|kill myself|end my life|take my life|want to die|better off dead|no reason to live|hurt someone|kill someone|not safe right now)\b/i;

export function getLalaMood(message: string): LalaMood | "crisis" {
  if (crisisPattern.test(message)) return "crisis";
  return patterns.find(([, pattern]) => pattern.test(message))?.[0] ?? "neutral";
}

export function getLalaReply(message: string, choose = Math.random): string {
  const mood = getLalaMood(message);
  if (mood === "crisis") return crisisReply;
  const replies = replySets[mood];
  return replies[Math.floor(choose() * replies.length) % replies.length] ?? replies[0] ?? crisisReply;
}