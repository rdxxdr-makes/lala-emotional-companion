export type LalaMood =
  | "happy"
  | "sad"
  | "stressed"
  | "anxious"
  | "lonely"
  | "tired"
  | "angry"
  | "neutral";

export const crisisReply =
  "I’m really glad you shared this. Please contact someone you trust nearby or your local emergency service right now.";

const factualRedirect =
  "I’m not here to answer general knowledge questions, but I am here for you. What’s been on your mind?";

const replySets: Record<LalaMood, readonly string[]> = {
  happy: [
    "That’s wonderful—you worked hard for this. I hope you’re taking a moment to feel proud.",
    "You did it! I’m so happy for you. What part are you most proud of?",
    "That is such lovely news. You deserve to enjoy this moment.",
    "I’m glad you have this moment to feel proud of. What a lovely thing to celebrate.",
    "That sounds like a real bright spot. I hope you let yourself enjoy it.",
  ],
  sad: [
    "I’m sorry—that must feel disappointing. One hard result doesn’t define you.",
    "Oh, that hurts. You put in effort, and that still matters. I’m here with you.",
    "It’s okay to feel upset. You don’t have to figure everything out right now.",
    "I’m sorry this is weighing on you. You can take your time with it.",
    "That sounds tender and difficult. I’m here, and you don’t have to rush.",
  ],
  stressed: [
    "It sounds like a lot to carry. Let’s take one slow breath together—you can go one step at a time.",
    "I hear you. You don’t need to solve everything this minute. What feels most pressing?",
    "That sounds overwhelming. Take a small pause; we can untangle one thing at a time.",
    "One thing at a time is enough for this moment. I’m here with you.",
    "You don’t have to carry the whole list at once. What can wait?",
  ],
  anxious: [
    "That uneasy feeling can be a lot. Let’s come back to one slow breath, together.",
    "You’re here in this moment, and you don’t have to handle the next one yet.",
    "I hear how worried you feel. Would it help to name what feels uncertain?",
    "Let’s make this moment smaller. What would feel comforting right now?",
    "You deserve gentleness while you’re feeling this way. I’m listening.",
  ],
  lonely: [
    "I’m glad you came to me. You deserve connection, and I’m right here listening.",
    "That can feel so heavy. I’m here with you—would it help to tell me more?",
    "You don’t have to fill the silence. I’m here, and I’m listening.",
    "I’m glad you reached out. You matter, and I’m here with you.",
    "Feeling disconnected can hurt. Would you like to tell me what you miss most?",
  ],
  tired: [
    "I’m sorry you’re feeling worn out. If you can, let yourself rest a little—you deserve care too.",
    "That sounds exhausting. Maybe keep things gentle with yourself for now.",
    "I hear you. Even a little rest or a glass of water could be a kind first step.",
    "You’ve been carrying a lot. It’s okay to pause and give yourself a little care.",
    "No need to do it all right now. What would make this moment gentler?",
  ],
  angry: [
    "I can hear how frustrating this is. It’s okay to feel angry; we can take a moment before reacting.",
    "That sounds really upsetting. I’m here to listen, without judging you.",
    "Your feelings make sense. Want to tell me which part bothered you most?",
    "That frustration sounds real. Let’s give it a little room before deciding what to do.",
    "I hear you. You can be upset here without needing to soften it for me.",
  ],
  neutral: [
    "I’m listening. You can tell me as much or as little as you like.",
    "Thanks for sharing that with me. What’s been on your mind lately?",
    "I’m here with you. Take your time—there’s no rush.",
    "We can just sit with what’s here for a moment. I’m listening.",
    "You don’t need the perfect words. What feels present for you today?",
  ],
};

const patterns: ReadonlyArray<readonly [LalaMood, RegExp]> = [
  ["happy", /\b(topped|topper|aced|passed|won|achievement|achieved|promoted|proud|excited|happy|celebrat|good news|succeeded|success)\b/i],
  ["sad", /\b(failed|failure|fail|lost|loss|heartbroken|upset|sad|crying|disappointed|rejected|hurt)\b/i],
  ["anxious", /\b(anxious|anxiety|worried|worry|panic|nervous|scared|afraid|uneasy)\b/i],
  ["stressed", /\b(stressed|stress|overwhelmed|pressure|too much to do)\b/i],
  ["lonely", /\b(lonely|alone|isolated|no friends|nobody cares|no one cares|left out|miss everyone)\b/i],
  ["tired", /\b(tired|exhausted|sleepy|unwell|not feeling well|sick|ill|headache|burnt out|burned out)\b/i],
  ["angry", /\b(angry|anger|furious|mad|frustrated|annoyed|irritated|rage)\b/i],
];

const crisisPattern =
  /\b(suicid(?:e|al)|self[ -]?harm|hurt(?:ing)? myself|kill myself|end my life|take my life|want to die|better off dead|no reason to live|hurt someone|kill someone|not safe right now)\b/i;

const factualQuestionPattern =
  /\b(what is|who is|when (?:did|is|was)|where is|how (?:do|does|did|can|to)|define|explain|calculate|capital of|weather|recipe|meaning of)\b/i;

export function getLalaMood(message: string): LalaMood | "crisis" {
  if (crisisPattern.test(message)) return "crisis";
  return patterns.find(([, pattern]) => pattern.test(message))?.[0] ?? "neutral";
}

export function getLalaReply(
  message: string,
  choose = Math.random,
  context: { recentUserMessages?: readonly string[]; previousReplies?: readonly string[] } = {},
): string {
  const currentMood = getLalaMood(message);
  if (currentMood === "crisis") return crisisReply;
  if (factualQuestionPattern.test(message)) return factualRedirect;

  const recentMoods = [...(context.recentUserMessages ?? []), message]
    .slice(-3)
    .map(getLalaMood)
    .filter((recentMood): recentMood is LalaMood => recentMood !== "crisis");
  const moodCounts = new Map<LalaMood, number>();
  for (const recentMood of recentMoods) {
    moodCounts.set(recentMood, (moodCounts.get(recentMood) ?? 0) + 1);
  }
  const mood = recentMoods.reduce<LalaMood>((chosenMood, recentMood) => {
    return (moodCounts.get(recentMood) ?? 0) >= (moodCounts.get(chosenMood) ?? 0)
      ? recentMood
      : chosenMood;
  }, currentMood);
  const replies = replySets[mood];
  const start = Math.floor(Math.abs(choose()) * replies.length) % replies.length;
  const previousReplies = new Set(context.previousReplies ?? []);
  for (let offset = 0; offset < replies.length; offset += 1) {
    const reply = replies[(start + offset) % replies.length];
    if (reply && !previousReplies.has(reply)) return reply;
  }
  return replies[start] ?? replies[0] ?? crisisReply;
}