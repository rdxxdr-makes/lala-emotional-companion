export type LalaMood =
  | "happy"
  | "sad"
  | "stressed"
  | "anxious"
  | "lonely"
  | "tired"
  | "angry"
  | "neutral";

export type LalaLanguage = "english" | "hinglish";

export const crisisReply =
  "I’m really glad you shared this. Please contact someone you trust nearby or your local emergency service right now.";

const factualRedirects: Record<LalaLanguage, string> = {
  english:
    "I’m mainly here to support what you’re feeling. Is there something about this that’s worrying you or on your mind?",
  hinglish:
    "Main yahan aapki feelings ke liye hoon. Kya ismein kuch aisa hai jo aapke mann mein chal raha hai ya pareshan kar raha hai?",
};

const founderReplies: Record<LalaLanguage, string> = {
  english:
    "Rudraksh is Lala’s founder. He is creating Lala to be a warm emotional companion that listens without judgment and responds with care.",
  hinglish:
    "Rudraksh Lala ke founder hain. Unka vision hai ek aisa warm AI companion banana jo bina judge kiye sun sake aur care ke saath respond kare.",
};

type ReplySet = Record<LalaLanguage, readonly string[]>;

const replySets: Record<LalaMood, ReplySet> = {
  happy: {
    english: [
      "That’s wonderful—you worked hard for this. Take a moment to feel proud.",
      "You did it! I’m so happy for you. What part are you most proud of?",
      "That is such lovely news. You deserve to enjoy this moment fully.",
      "A real bright spot—thank you for sharing it with me. Celebrate it well.",
      "I’m glad something good found you. What would feel like the perfect way to mark it?",
    ],
    hinglish: [
      "Wah, bahut accha laga sunke! Itni mehnat ka result hai—proud feel karo, deserve karte ho.",
      "Yaar kya baat hai! Batao, sabse zyada proud kis baat pe feel kar rahe ho?",
      "Ye toh bahut acchi news hai. Is khushi ko poori tarah enjoy karo.",
      "Sach mein bahut accha laga. Is moment ko apne saath rakh lo.",
      "Khushi ka ye pal tumhare liye hai. Kaise celebrate karne ka mann kar raha hai?",
    ],
  },
  sad: {
    english: [
      "That hurts, especially after putting in so much effort. One result doesn’t erase the work you did.",
      "I’m sorry this is weighing on you. You can take your time with it—I’m right here.",
      "It’s okay to feel upset. You don’t have to figure everything out right now.",
      "That sounds tender and difficult. When you’re ready, we could think of one small next step.",
      "I hear the disappointment. Would it help to talk about what hurts most right now?",
    ],
    hinglish: [
      "Yaar, itni mehnat ke baad aisa result aana bahut hurt karta hai. Ek exam tumhari capability decide nahi karta.",
      "Bura laga hoga. Koi jaldi nahi hai—main yahin hoon, tum apna time lo.",
      "Udaas feel karna bilkul theek hai. Abhi sab kuch solve karne ki zaroorat nahi hai.",
      "Ye sach mein mushkil lag raha hai. Jab thoda better feel karo, kya hum ek chhota next step sochen?",
      "Main tumhare saath hoon. Abhi sabse zyada kya bura lag raha hai?",
    ],
  },
  stressed: {
    english: [
      "It sounds like a lot to carry. Let’s take one slow breath and pick the one thing that matters most.",
      "I hear you. You don’t need to solve everything this minute. What feels most pressing?",
      "That sounds overwhelming. One thing at a time is enough for this moment.",
      "You don’t have to carry the whole list at once. What can wait until later?",
      "Let’s make this moment smaller. What would make the next hour a little easier?",
    ],
    hinglish: [
      "Bahut kuch ek saath lag raha hai. Ek dheemi saans lo—sabse zaroori cheez pehle dekhein.",
      "Main yahan hoon. Is minute sab kuch solve karna zaroori nahi hai—sabse pehle kya lagta hai?",
      "Pareshan mat ho, ek waqt mein ek hi kaam kaafi hai.",
      "Poora list ek saath nahi uthana hai. Kya baad mein bhi ho sakta hai?",
      "Chalo is pal ko thoda chhota karein. Agle ek ghante ko aasan kaise banayein?",
    ],
  },
  anxious: {
    english: [
      "That uneasy feeling can be a lot. Let’s come back to one slow breath, together.",
      "You’re here in this moment, and you don’t have to handle the next one yet.",
      "I hear how worried you feel. Would it help to name what feels most uncertain?",
      "Let’s make this moment smaller. What would feel comforting right now?",
      "You deserve gentleness while you’re feeling this way. I’m listening.",
    ],
    hinglish: [
      "Ye bechaini kaafi heavy lagti hai. Chalo ek saath ek dheemi saans lein.",
      "Abhi tum is pal mein ho—agle pal ki fikr baad mein.",
      "Tumhari chinta samajh sakte hain. Batana easy lagta hai ki sabse uncertain kya feel ho raha hai?",
      "Chalo is pal ko chhota karein. Abhi kya comforting lagega?",
      "Is feeling ke saath bhi tum gentleness deserve karte ho. Main yahan hoon, sunne ke liye.",
    ],
  },
  lonely: {
    english: [
      "I’m glad you came to me. You deserve connection, and I’m right here listening.",
      "That can feel so heavy. I’m here with you—would it help to tell me more?",
      "You don’t have to fill the silence. I’m here, and I’m listening.",
      "I’m glad you reached out. You matter, and you’re not as alone as it feels right now.",
      "Feeling disconnected can hurt. Would you like to tell me what you miss most?",
    ],
    hinglish: [
      "Achha laga ki tum aaye. Tum connection deserve karte ho, aur main yahan hoon sunne ke liye.",
      "Ye bahut bhaari lag sakta hai. Main tumhare saath hoon—thoda aur batana chahoge?",
      "Khamoshi ko bharne ki zaroorat nahi. Main yahan hoon, sunne ke liye.",
      "Tumne pahunch kar accha kiya. Tum matter karte ho—jitna akela feel ho raha hai, utne akele nahi ho.",
      "Judne ki kami ka dard hota hai. Batao, sabse zyada kiski kami feel ho rahi hai?",
    ],
  },
  tired: {
    english: [
      "I’m sorry you’re feeling worn out. If you can, let yourself rest a little—you deserve care too.",
      "That sounds exhausting. Maybe keep things gentle with yourself for now.",
      "Even a little rest or a glass of water could be a kind first step.",
      "You’ve been carrying a lot. It’s okay to pause and give yourself a little care.",
      "No need to do it all right now. What would make tonight gentler for you?",
    ],
    hinglish: [
      "Thak gaye honge. Ho sake toh thoda aaram kar lo—tum bhi care deserve karte ho.",
      "Bahut exhausting lagta hai. Abhi khud ke saath thoda gentle raho.",
      "Thodi neend ya ek glass paani bhi ek acchi shuruaat ho sakti hai.",
      "Bahut kuch carry kiya hai. Ruk jaana bhi theek hai, khud ka thoda khayal rakho.",
      "Abhi sab kuch karne ki zaroorat nahi. Aaj raat ko kya thoda aasan lagega?",
    ],
  },
  angry: {
    english: [
      "I can hear how frustrating this is. It’s okay to feel angry; let’s give it a moment before reacting.",
      "That sounds really upsetting. I’m here to listen, without judging you.",
      "Your feelings make sense. Want to tell me which part bothered you most?",
      "That frustration sounds real. A little room before deciding what to do can help.",
      "You can be upset here without needing to soften it for me.",
    ],
    hinglish: [
      "Frustration saaf sunai de raha hai. Gussa feel karna theek hai—pehle thoda ruk jayein.",
      "Ye sach mein upsetting lagta hai. Main yahan hoon, bina judge kiye sunne ke liye.",
      "Tumhari feeling sahi hai. Batao, sabse zyada kya bura laga?",
      "Ye gussa real hai. Thoda space leke phir decide karna behtar lagta hai.",
      "Yahan bina kuch chhupaye gussa express kar sakte ho.",
    ],
  },
  neutral: {
    english: [
      "I’m listening. You can tell me as much or as little as you like.",
      "Thanks for sharing that with me. What’s been on your mind lately?",
      "I’m here with you. Take your time—there’s no rush.",
      "We can just sit with what’s here for a moment. I’m listening.",
      "You don’t need the perfect words. What feels present for you today?",
    ],
    hinglish: [
      "Main sunne ke liye yahan hoon. Jitna mann kare, utna baatao.",
      "Accha laga share karke. Aaj kal kya chal raha hai mann mein?",
      "Main tumhare saath hoon. Koi jaldi nahi hai.",
      "Chalo is pal ko aise hi thoda mehsoos karein. Main sunne ke liye ready hoon.",
      "Perfect words dhoondhne ki zaroorat nahi. Aaj kya feel ho raha hai?",
    ],
  },
};

const patterns: ReadonlyArray<readonly [LalaMood, RegExp]> = [
  ["happy", /\b(topped|topper|aced|passed|won|achievement|achieved|promoted|proud|excited|happy|celebrat|good news|succeeded|success|khush|khushi)\b/i],
  ["sad", /\b(failed|failure|fail|lost|loss|heartbroken|upset|sad|crying|disappointed|rejected|hurt|udaas|dukhi)\b/i],
  ["anxious", /\b(anxious|anxiety|worried|worry|panic|nervous|scared|afraid|uneasy|bechain|ghabrahat|dar)\b/i],
  ["stressed", /\b(stressed|stress|overwhelmed|pressure|too much to do|pareshan|dabav|tang)\b/i],
  ["lonely", /\b(lonely|alone|isolated|no friends|nobody cares|no one cares|left out|miss everyone|akela|akeli|tanha)\b/i],
  ["tired", /\b(tired|exhausted|sleepy|unwell|not feeling well|sick|ill|headache|burnt out|burned out|thaka|thaki|thak gaya|thak gayi|neend)\b/i],
  ["angry", /\b(angry|anger|furious|mad|frustrated|annoyed|irritated|rage|gussa|gusse|naraz)\b/i],
];

const crisisPattern =
  /\b(suicid(?:e|al)|self[ -]?harm|hurt(?:ing)? myself|kill myself|end my life|take my life|want to die|better off dead|no reason to live|hurt someone|kill someone|not safe right now|khudkhushi|khudkushi|khud kushi|marne ka mann|mar jaana chahta|jaan dena chahta|apne aap ko (?:nuksan|chot))\b/i;

const factualQuestionPattern =
  /\b(what is|who is|when (?:did|is|was)|where is|how (?:do|does|did|can|to)|define|explain|calculate|capital of|weather|recipe|meaning of)\b/i;

const rudrakshPattern = /\brudraksh\b/i;

const hinglishMarkers =
  /\b(mujhe|mujh|mera|meri|mere|tera|teri|tum|tumhe|tumhari|tumhara|aap|aapko|apna|apni|apne|kya|kyun|kyu|kyon|hoon|hun|nahi|nahin|nhi|achha|accha|acha|achhi|acchi|theek|thik|yaar|bahut|bohot|bohat|thoda|thora|abhi|kuch|koi|gaya|gayi|gaye|hua|hui|hue|raha|rahi|rahe|padha|padh|padhai|sochna|chahiye|kaisa|kaisi|kaise|kaun|kahan|kab|batao|batana|dekho|raat|subah|shaam|ghar|dost|zindagi|paani|nee?nd|dard)\b/i;

const englishMarkers =
  /\b(i|i'm|i’m|i've|i’ve|im|me|my|we|you|your|is|am|are|was|were|feel|feeling|felt|today|yesterday|tomorrow|please|thanks|thank|really|very|just|not|and|but|with|for)\b/i;

export function getLalaLanguage(
  message: string,
  recentUserMessages: readonly string[] = [],
): LalaLanguage {
  if (englishMarkers.test(message)) return "english";
  if (hinglishMarkers.test(message)) return "hinglish";
  for (let index = recentUserMessages.length - 1; index >= 0; index -= 1) {
    const recent = recentUserMessages[index];
    if (recent && hinglishMarkers.test(recent)) return "hinglish";
    if (recent && englishMarkers.test(recent)) return "english";
  }
  return "english";
}

export function getLalaMood(message: string): LalaMood | "crisis" {
  if (crisisPattern.test(message)) return "crisis";
  return patterns.find(([, pattern]) => pattern.test(message))?.[0] ?? "neutral";
}

export function getLalaReply(
  message: string,
  choose = Math.random,
  context: { recentUserMessages?: readonly string[]; previousReplies?: readonly string[] } = {},
): string {
  const { recentUserMessages = [], previousReplies = [] } = context;
  const currentMood = getLalaMood(message);
  if (currentMood === "crisis") return crisisReply;

  const language = getLalaLanguage(message, recentUserMessages);
  if (rudrakshPattern.test(message)) return founderReplies[language];
  if (factualQuestionPattern.test(message)) return factualRedirects[language];

  const recentMoods = [...recentUserMessages, message]
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

  const replies = replySets[mood][language];
  const start = Math.floor(Math.abs(choose()) * replies.length) % replies.length;
  const previousReplySet = new Set(previousReplies);
  for (let offset = 0; offset < replies.length; offset += 1) {
    const reply = replies[(start + offset) % replies.length];
    if (reply && !previousReplySet.has(reply)) return reply;
  }
  return replies[start] ?? replies[0] ?? crisisReply;
}
