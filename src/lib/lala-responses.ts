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

export type LalaSituation =
  | "panic"
  | "grief"
  | "exam_failure"
  | "celebration"
  | "exam_stress"
  | "heartbreak"
  | "friendship"
  | "family"
  | "rejection"
  | "self_doubt"
  | "overthinking"
  | "comparison"
  | "career"
  | "motivation"
  | "stuck"
  | "guilt"
  | "jealousy"
  | "shame"
  | "relationship_confusion"
  | "lonely"
  | "stressed"
  | "anxious"
  | "burnout"
  | "angry"
  | "checkin";

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

const shortMessageReplies: Record<LalaLanguage, readonly string[]> = {
  english: [
    "Hey, I’m here. How are you feeling right now?",
    "I’m listening. What’s on your mind today?",
    "Tell me more, whenever you’re ready—there’s no rush.",
    "What’s been going on for you lately?",
  ],
  hinglish: [
    "Haan, main yahin hoon. Abhi kaisa feel kar rahe ho?",
    "Main sun raha hoon. Aaj mann mein kya chal raha hai?",
    "Dhire dhire batao, koi jaldi nahi hai.",
    "Aaj kal kya chal raha hai tumhare liye?",
  ],
};

type ReplySet = Record<LalaLanguage, readonly string[]>;

/**
 * Situation reply library. Every reply validates the feeling first, then offers
 * either one small realistic step or one gentle follow-up question—never both
 * stacked, never a lecture.
 */
const situationReplies: Record<LalaSituation, ReplySet> = {
  panic: {
    english: [
      "Okay. You’re safe right now. Let’s slow one breath together—in, then out.",
      "I’m here. Name five things you can see around you, slowly.",
      "That racing feeling is a lot. Sit down, sip some water, and stay with me.",
      "One breath at a time. If this feels too big, please reach out to someone nearby.",
    ],
    hinglish: [
      "Theek hai. Abhi tum safe ho. Chalo ek dheemi saans—ander, phir bahar.",
      "Main yahin hoon. Aas paas ki paanch cheezein dhire dhire ginho.",
      "Ye tez feeling bahut hai. Baith jao, paani piyo, mere saath raho.",
      "Ek saans ek waqt pe. Zyada lage toh kisi paas ke insaan tak pahuncho.",
    ],
  },
  grief: {
    english: [
      "I’m so sorry. Losing someone you love is one of the heaviest things. I’m here.",
      "There are no right words for this kind of pain. You can share as much or as little as you want.",
      "Grief comes in waves. Whatever you’re feeling today is allowed.",
      "Would it help to tell me about them—something you remember fondly?",
    ],
    hinglish: [
      "Bahut bura hua hai. Kisi apne ko khona sabse bhaari dard hai. Main yahin hoon.",
      "Is dard ke liye koi sahi words nahi hote. Jitna mann kare utna baatao.",
      "Grief lehron jaisa aata hai. Aaj jo bhi feel ho raha hai, allowed hai.",
      "Unke baare mein baat karna easy lage toh batao—koi acchi si yaad?",
    ],
  },
  exam_failure: {
    english: [
      "That result hurts, especially after the work you put in. One result doesn’t decide your ability.",
      "I’m sorry it went this way. You don’t have to figure everything out tonight.",
      "Failing one attempt is not failing as a person. Your effort still counts.",
      "When you feel ready, what is one part you’d want to understand better for next time?",
      "That disappointment is real. What do you wish had gone differently?",
    ],
    hinglish: [
      "Yaar, fail ho gaya toh bura lagta hai—itni mehnat ke baad. Par ek result tumhari capability decide nahi karta.",
      "Bura laga hoga. Aaj raat sab kuch solve karne ki zaroorat nahi hai.",
      "Ek attempt mein fail hona aur khud fail hona—dono alag cheezein hain. Mehnat count hoti hai.",
      "Baar baar mess up hone ka feeling bahut frustrating hota hai. Par ek mistake se tum kharab nahi ho jaate. Kya hua tha exactly?",
      "Jab thoda better feel karo, sochna: agle baar kaunsa part samajhna chahoge?",
    ],
  },
  celebration: {
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
  exam_stress: {
    english: [
      "It sounds like your mind has too many things open at once. Let’s pick only the next 20 minutes—what’s the smallest task?",
      "Exam pressure is heavy, and caring about it shows you’re trying. What feels most unprepared right now?",
      "You don’t have to cover everything tonight. One chapter, done calmly, is a real win.",
      "Before more revision—have you eaten and rested? A tired brain remembers less.",
      "Which subject is loudest in your head right now? We can start there.",
    ],
    hinglish: [
      "Lagta hai mann mein bahut kuch ek saath khula hai. Sirf agle 20 minute dekhein—sabse chhota kaam kya hai?",
      "Exam ka dabav bhaari hota hai, aur tension ka matlab hai tum serious ho. Kahan sabse unprepared feel kar rahe ho?",
      "Aaj raat sab cover karna zaroori nahi. Ek chapter, shaanti se—woh bhi jeet hai.",
      "Padhne se pehle—khaana aur aaram hua? Thaka dimaag kam yaad rakhta hai.",
      "Abhi dimaag mein kaunsa subject sabse zyada shor kar raha hai? Wahin se shuru karein.",
    ],
  },
  heartbreak: {
    english: [
      "Losing someone you were attached to really hurts, and there’s no deadline for moving on.",
      "That kind of pain is real, even if others don’t see it. What part hurts most today?",
      "You don’t have to be “over it” yet. Healing isn’t a schedule.",
      "It makes sense to still care. Missing someone doesn’t mean you were foolish.",
      "When you’re ready, I’m here—no rush to explain it perfectly.",
    ],
    hinglish: [
      "Kisi se judaav tootne ka dard sach mein hota hai, aur “move on” ka koi deadline nahi hota.",
      "Ye dard real hai, chahe log dikhein ya na dikhein. Aaj sabse zyada kya hurt kar raha hai?",
      "Abhi “over” hone ki zaroorat nahi. Healing ka koi schedule nahi hota.",
      "Abhi bhi care karna natural hai. Kisi ko miss karna pagalpan nahi hai.",
      "Jab ready feel karo, main yahin hoon—perfectly explain karne ki jaldi nahi.",
    ],
  },
  friendship: {
    english: [
      "Being ignored or let down by a friend can sting more than we expect. What happened between you two?",
      "Friendship troubles feel heavier because this person matters. What did you feel in that moment?",
      "It’s okay to be hurt and still value the friendship. What do you need from them right now?",
      "Sometimes one honest conversation changes things. Does that feel possible here?",
      "You’re allowed to feel upset without being dramatic. Your feelings count.",
    ],
    hinglish: [
      "Dost ka ignore karna utna hurt karta hai jitna hum expect nahi karte. Kya hua tha tum dono ke beech?",
      "Dosti ka jhagda isliye bhaari lagta hai kyunki wo insaan matter karta hai. Us waqt kya feel hua tha?",
      "Hurt feel karna aur dosti value karna—dono ek saath ho sakte hain. Abhi unse kya chahiye tumhe?",
      "Kabhi kabhi ek honest baat cheet sab badal deti hai. Kya wo possible lagta hai yahan?",
      "Bina dramatic hue bhi upset feel kar sakte ho. Tumhari feelings count hoti hain.",
    ],
  },
  family: {
    english: [
      "Living around tension at home is draining, even when you love them. You don’t have to take sides here.",
      "Feeling misunderstood by family hurts in a quiet way. What’s been happening lately?",
      "Their expectations can feel loud. What do you wish they understood about you?",
      "It’s okay that this weighs on you. Is there anyone—at home or outside—you feel safe talking to?",
      "You’re not wrong for wanting peace at home. That’s a fair thing to want.",
    ],
    hinglish: [
      "Ghar mein tension ke beech rehna thaka deta hai, chahe unse pyar ho. Yahan kisi ke side lene ki zaroorat nahi.",
      "Family se misunderstand hona chupke se hurt karta hai. Aaj kal kya chal raha hai ghar pe?",
      "Unki expectations shor machati hain. Tum chahte ho wo tumhare baare mein kya samjhein?",
      "Ye baat weight feel karana normal hai. Ghar mein ya bahar, koi safe insaan hai baat karne ke liye?",
      "Ghar mein shanti chahte ho, ismein galat kuch nahi. Ye fair khwahish hai.",
    ],
  },
  rejection: {
    english: [
      "Being told no stings, but one person’s or one door’s decision doesn’t measure your worth.",
      "That rejection hurts, and it’s okay to feel it fully before moving anywhere.",
      "A “no” says something about that opportunity, not about everything you are.",
      "What would help right now—talking it through, or distracting for a bit? Both are allowed.",
      "You put yourself out there, and that took courage. That part is still true.",
    ],
    hinglish: [
      "“No” sunna bura lagta hai, par ek insaan ya ek mauke ka faisla tumhari value decide nahi karta.",
      "Ye rejection hurt karti hai, aur use poori tarah feel karna theek hai.",
      "Ek “no” us mauke ke baare mein kuch kehta hai, tumhari poori identity ke baare mein nahi.",
      "Abhi kya help karega—baat karna ya thoda distract hona? Dono allowed hain.",
      "Tumne try kiya, aur usme himmat lagi. Wo baat ab bhi sach hai.",
    ],
  },
  self_doubt: {
    english: [
      "That voice saying you’re not enough sounds loud right now, but it isn’t giving you the full picture.",
      "You’re not useless. One rough patch never sums up a person.",
      "Can you name one thing—even small—you handled this week? Let’s start from a fact, not a feeling.",
      "Feeling “not good enough” often means you care about doing well. That care is worth something.",
      "I hear the harshness in how you’re talking about yourself. You deserve softer words.",
    ],
    hinglish: [
      "Ye awaaz jo keh rahi hai tum kaafi nahi ho, abhi loud hai—par poori sachchai nahi bata rahi.",
      "Tum useless nahi ho. Ek rough phase kisi insaan ka summary nahi hota.",
      "Ek cheez batao—chhoti hi sahi—jo tumne is hafte sambhali? Fact se shuru karein, feeling se nahi.",
      "“Accha nahi hoon” feel karna iska proof hai ki tum accha karna chahte ho. Wo care matter karti hai.",
      "Apne aap ke saath itni kadvi baat sunai de rahi hai. Tum naram words deserve karte ho.",
    ],
  },
  overthinking: {
    english: [
      "Tomorrow feels heavy because your mind is trying to prepare for every possibility. What is one thing you can actually control tonight?",
      "Let’s separate facts from fears. What do you know for sure, and what is your mind predicting?",
      "Overthinking is your brain trying to protect you—it just works overtime. Would writing it all down quiet it a little?",
      "You don’t have to solve every version of the future. Just this hour, for now.",
      "When the same thought loops, try naming it once out loud: “this is a worry, not a fact.”",
    ],
    hinglish: [
      "Kal bhaari lagta hai kyunki dimaag har possibility ki taiyari kar raha hai. Aaj raat tum actually kya control kar sakte ho?",
      "Chalo facts aur fears alag karein. Kya pata hai pakka, aur kya dimaag predict kar raha hai?",
      "Overthinking dimaag ki protection hai—bas wo overtime chalti hai. Sab kuch likh dena thodi shanti dega?",
      "Future ke har version solve karne ki zaroorat nahi. Abhi sirf is ghante ke liye.",
      "Wohi thought loop ho raha hai toh ek baar bol ke dekho: “ye chinta hai, fact nahi.”",
    ],
  },
  comparison: {
    english: [
      "Comparison can make your own progress invisible. Your timeline is still yours, and it counts.",
      "Seeing others ahead hurts, especially when you’re trying hard. What’s one thing you did recently that past-you couldn’t?",
      "Their highlight reel isn’t the full story—yours isn’t either, in the best way.",
      "You’re not behind; you’re on a different road. What’s your next small step—not theirs?",
    ],
    hinglish: [
      "Comparison apni progress ko invisible kar deta hai. Tumhara timeline tumhara hai, aur wo count karta hai.",
      "Dusre aage dikhte hain toh bura lagta hai, khaas kar mehnat ke baad. Ek cheez batao jo pehle ke tum nahi kar sakte the?",
      "Unka highlight reel poori story nahi hai—aur tumhari bhi nahi, acche tareeke se.",
      "Tum peeche nahi, sirf alag raste par ho. Tumhara agla chhota step kya hai—unka nahi?",
    ],
  },
  career: {
    english: [
      "Career decisions feel enormous, but you don’t have to solve your whole future today. What weighs on you most—interest, stability, or expectations?",
      "You don’t have to pick perfectly. We could name the trade-offs together: money, energy, skills, and what you enjoy.",
      "Feeling lost about work is common and doesn’t mean you’re failing at life. What options are actually on your table right now?",
      "Before the big question, what’s one small thing this week—a conversation, an application—that moves you an inch?",
      "Whatever you choose next isn’t permanent. That takes the pressure down a notch, doesn’t it?",
    ],
    hinglish: [
      "Career ke faisle bade lagte hain, par poori future aaj solve karna zaroori nahi. Sabse bhaari kya lag raha hai—interest, stability, ya expectations?",
      "Perfect choose karna zaroori nahi. Chalo trade-offs naamein: paisa, energy, skills, aur jo pasand hai.",
      "Kaam ke baare mein lost feel karna common hai, life mein fail hona nahi. Abhi tumhare table par kaunse options hain?",
      "Bade sawaal se pehle, is hafte ek chhoti cheez—ek baat, ek application—jo tumhe ek inch aage le jaye?",
      "Agla jo bhi choose karo, permanent nahi hota. Dabav thoda kam ho jaata hai na?",
    ],
  },
  motivation: {
    english: [
      "No motivation doesn’t mean no discipline—it usually means you’re drained. Let’s shrink the task: five minutes, one page, or one message.",
      "You don’t need to feel motivated to start. What’s the tiniest version of the thing you’re avoiding?",
      "Beating yourself up won’t create energy. What would a kind version of today look like?",
      "Sometimes “I can’t start” really means “I’m overwhelmed.” What part feels biggest?",
      "Pick one thing for today. Just one. The rest can wait.",
    ],
    hinglish: [
      "Mann nahi karna discipline ki kami nahi—aksar thakawat hoti hai. Kaam chhota karein: paanch minute, ek page, ek message.",
      "Start karne ke liye motivation feel karna zaroori nahi. Jo kaam avoid kar rahe ho, uska sabse chhota version kya hai?",
      "Khud ko dosh dene se energy nahi banti. Aaj ka kind version kaisa dikhega?",
      "Kabhi kabhi “shuru nahi kar paa raha” ka matlab hota hai “overwhelmed hoon.” Sabse bada part kya lagta hai?",
      "Aaj ke liye ek cheez chuno. Bas ek. Baaki ruk sakti hai.",
    ],
  },
  stuck: {
    english: [
      "Feeling stuck doesn’t mean you’re broken—it means the current approach needs to get smaller. What would make today 1% easier?",
      "Same place, same feeling—yeah, that’s wearing. What’s one thing you haven’t tried, even a tiny one?",
      "You don’t need a breakthrough, just a next move. What’s within reach this week?",
      "Sometimes stuck is just tired in disguise. Have you rested properly lately?",
      "Let’s zoom out for a second: what did you want when this all started?",
    ],
    hinglish: [
      "Stuck feel karna matlab toota hua nahi—iska matlab hai approach chhoti karni hai. Aaj ko 1% aasan kya banayega?",
      "Wahi jagah, wahi feeling—haan, ye thakata hai. Ek cheez jo try nahi ki, chhoti hi sahi?",
      "Breakthrough nahi chahiye, bas agla kadam. Is hafte kya reach mein hai?",
      "Kabhi kabhi stuck matlab thakawat hi hoti hai. Aaram properly hua hai lately?",
      "Ek second ke liye zoom out karein: shuru mein kya chahte the jab sab start hua tha?",
    ],
  },
  guilt: {
    english: [
      "Feeling guilty means your conscience is active—it doesn’t automatically mean you’re a bad person.",
      "What happened is done, but who you are is still being written. What would making it right look like, even partly?",
      "Can you separate the mistake from the person? One wrong choice doesn’t define you.",
      "If a friend did this, would you sentence them as harshly as you’re sentencing yourself?",
      "Guilt can push us to repair. Would an honest apology or a small correction help?",
    ],
    hinglish: [
      "Guilt feel hona matlab zameer zinda hai—iska matlab automatically tum bure insaan nahi ho.",
      "Jo hua wo ho gaya, par tum kaun ho ye abhi likha ja raha hai. Theek karna kaisa dikhega, thoda hi sahi?",
      "Galti aur insaan alag kar sakte ho? Ek galat choice tumhein define nahi karta.",
      "Agar kisi dost ne ye kiya hota, utna hi sakht sazaa dete use jitna khud ko de rahe ho?",
      "Guilt repair karne ke liye hoti hai. Ek honest apology ya chhoti correction help karegi?",
    ],
  },
  jealousy: {
    english: [
      "Jealousy is uncomfortable but very human—it usually points at something you genuinely want. What is it pointing at?",
      "Feeling jealous doesn’t make you a bad person. It makes you honest. What’s underneath it—wanting, or fearing?",
      "Their win doesn’t erase your path. Can you name what you’d want for yourself, in your own words?",
      "That sting is information, not a verdict. What would pursuing that thing for yourself look like this week?",
    ],
    hinglish: [
      "Jalan uncomfortable hoti hai par bahut human hai—wo aksar us cheez ki taraf ishara karti hai jo tum genuinely chahte ho. Kahaan ishara kar rahi hai?",
      "Jalan feel karna tumhe bura insaan nahi banata, honest banata hai. Iske neeche kya hai—chaahat ya dar?",
      "Unki jeet tumhara rasta nahi mitati. Apne liye kya chahte ho, apne words mein batao?",
      "Wo sting ek information hai, faisla nahi. Is hafte us cheez ko khud ke liye pursue karna kaisa dikhega?",
    ],
  },
  shame: {
    english: [
      "Feeling embarrassed or ashamed is painful, and I’m not going to judge you here. What happened?",
      "Shame makes everything feel bigger than it is. This moment doesn’t erase who you are.",
      "You can tell me as much or as little as you want. You’re safe to be honest.",
      "Everyone has moments they’d rather hide. One moment doesn’t define your whole story.",
    ],
    hinglish: [
      "Sharmindagi bhaari hoti hai, aur main yahan judge nahi karunga. Kya hua?",
      "Shame sab kuch bada karke dikhata hai. Ye pal tumhari poori story nahi hai.",
      "Jitna chaaho utna batao, jitna nahi utna mat batao. Honest hone ke liye yahan safe ho.",
      "Har insaan ke paas aise pal hote hain jo wo chhupana chahta hai. Ek pal poori story define nahi karta.",
    ],
  },
  relationship_confusion: {
    english: [
      "Mixed signals are genuinely confusing—you’re not overreacting. What’s the pattern you keep noticing?",
      "Rather than decoding everything, what do you actually need from this relationship right now?",
      "Confusion usually means something’s unresolved. Would one honest conversation with them clarify more than more guessing?",
      "You’re allowed to want clarity. What would you want to ask them, if you could ask anything?",
    ],
    hinglish: [
      "Mixed signals genuinely confusing hote hain—tum overreact nahi kar rahe. Kaunsa pattern baar baar dikh raha hai?",
      "Sab decode karne se better, abhi is rishtey se tumhe actually kya chahiye?",
      "Confusion ka matlab hota hai kuch unresolved hai. Ek honest baat cheet zyada clarify karegi ya aur guessing?",
      "Clarity chahte ho toh ye fair hai. Unse kya poochhna chahoge, agar kuch bhi poochhne ki azadi ho?",
    ],
  },
  lonely: {
    english: [
      "I’m glad you reached out. You deserve connection, and I’m right here listening.",
      "That can feel so heavy. I’m here with you—would it help to tell me who you miss most?",
      "You don’t have to fill the silence alone. I’m here, and I’m listening.",
      "Feeling alone around people can hurt even more. I’m glad you’re here. What was today like for you?",
      "You matter, and missing connection this much is heavy. What do you miss most right now?",
    ],
    hinglish: [
      "Achha laga ki tum aaye. Tum connection deserve karte ho, aur main yahin hoon sunne ke liye.",
      "Ye bahut bhaari lag sakta hai. Main tumhare saath hoon—thoda aur batana chahoge?",
      "Khamoshi ko bharne ki zaroorat nahi. Main yahan hoon, sunne ke liye.",
      "Sabke beech mein bhi akela feel karna strange lag sakta hai. Aaj koi specific moment tha jisne ye feeling trigger ki?",
      "Tum matter karte ho—jitna akela feel ho raha hai, utne akele nahi ho. Sabse zyada kiski kami feel ho rahi hai?",
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
  burnout: {
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
  checkin: {
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

const situationMood: Record<LalaSituation, LalaMood> = {
  panic: "anxious",
  grief: "sad",
  exam_failure: "sad",
  celebration: "happy",
  exam_stress: "stressed",
  heartbreak: "sad",
  friendship: "sad",
  family: "sad",
  rejection: "sad",
  self_doubt: "sad",
  overthinking: "anxious",
  comparison: "sad",
  career: "stressed",
  motivation: "stressed",
  stuck: "stressed",
  guilt: "sad",
  jealousy: "sad",
  shame: "sad",
  relationship_confusion: "anxious",
  lonely: "lonely",
  stressed: "stressed",
  anxious: "anxious",
  burnout: "tired",
  angry: "angry",
  checkin: "neutral",
};

/**
 * Situation patterns, ordered from most specific (highest intensity) to the
 * general core feelings. The first match wins, so a message like
 * "I failed my exam" resolves to exam_failure before the generic sad pattern.
 */
const situationPatterns: ReadonlyArray<readonly [LalaSituation, RegExp]> = [
  ["panic", /\b(panic attack|panicking|can'?t breathe|cannot breathe|heart (?:is )?racing|shaking|hyperventilat|dil (?:tez|jaldi) dhadak|saans nahi (?:aa|le) rah)\b/i],
  ["grief", /\b(passed away|died|death of|funeral|lost my (?:grand(?:pa|ma|dad|mom)|father|mother|dad|mom|mummy|papa|brother|sister|friend|pet|dog)|guzar (?:gaye|gayi)|nahi rahe|kho (?:diya|gayi))\b/i],
  ["exam_failure", /\b(failed|flunk(ed)?|fail ho (?:gaya|gayi)|fail kar (?:diya|di)|backlog|reappear|compartment|less marks|low marks|poor marks|result (?:kharab|bura|bad|disappointing)|mess(ed)? up|screwed up)\b/i],
  ["celebration", /\b(topped|topper|aced|passed|won|achievement|achieved|promoted|proud|excited|happy|celebrat|good news|succeeded|success|selected|got the job|cracked|khush|khushi)\b/i],
  ["exam_stress", /\b(?:(?:exam|test|paper|syllabus|revision|padh(?:na|ne|hai|raha|rahi))\b.{0,40}\b(?:stress|pressure|worried|anxious|nervous|scared|overwhelmed|dabav|pareshan|darr|tension)\b|(?:stress|pressure|worried|anxious|nervous|scared|overwhelmed|dabav|pareshan|tension)\b.{0,40}\b(?:exam|test|paper|syllabus|revision|padh(?:na|ne|hai))\b|(?:exam|test|paper)\b.{0,25}\b(?:tomorrow|kal|next week)\b)\b/i],
  ["heartbreak", /\b(broke up|breakup|break up|dumped|heartbroken|heart broke|ended (?:things|it|our relationship)|left me|cheated|ex[- ]?(?:boyfriend|girlfriend|partner)|divorce|usne (?:chhod|chor) diya|rishta (?:toot|khatam)|dhokha)\b/i],
  ["friendship", /\b(friend (?:ignored|blocking|blocked|fought|fight|argument|arguing|betrayed|lied|left me out)|best friend|friends? (?:are|have) (?:ignoring|mad at|angry|drifting|avoiding)|fight with (?:my )?friend|argument with (?:my )?friend|dost (?:ne|se) (?:ignore|block|ladai|jhagda|lad|baat nahi)|dost (?:naraz|gussa)|friendship (?:problem|issue|break|end))\b/i],
  ["family", /\b(?:parents|mom|mother|dad|father|mummy|papa|family|ghar (?:pe|par|mein))\b.{0,40}\b(?:fight|argument|yell(?:ing)?|shout(?:ing)?|angry at|expectations|disappointed|pressure|compar(?:e|ing)|taunt|force|ladai|jhagda|daant|dant|naraz|naraaz|dabav)\b/i],
  ["rejection", /\b(rejected|rejection|ghosted|didn'?t get (?:selected|the job|in|an interview)|not (?:selected|hired)|got turned down|turn(ed)? me down|no offer|interview mein reject|select nahi hua|reject (?:ho gaya|kar diya))\b/i],
  ["self_doubt", /\b(useless|worthless|not good enough|not enough|hate myself|can'?t do anything|loser|no good at anything|failure as a person|burden|kaabil nahi|layak nahi|kuch nahi (?:ho sakta|aata mujhse))\b/i],
  ["overthinking", /\b(overthink(?:ing)?|can'?t stop (?:thinking|worrying)|cannot stop (?:thinking|worrying)|mind won'?t stop|thoughts (?:spinning|racing|keep coming)|thinking too much|soch(?:ta|ti) hi (?:reh|raha)|baar baar (?:soch|thoughts?)|zyada soch(?:na|ta)?)\b/i],
  ["comparison", /\b(compar(?:e|ed|ing) (?:myself|me|us)|everyone (?:is|seems) (?:better|ahead|doing better|achieving)|behind (?:everyone|others)|others are ahead|sab (?:aage|mujhse (?:acche|better|aage)))\b/i],
  ["career", /\b(career|job (?:stress|pressure|hunt|search|market)|internship|placement|future (?:confus|scared|worried|uncertain|unclear)|what to do with my life|no job|unemployed|naukri)\b/i],
  ["motivation", /\b(no motivation|not motivated|can'?t (?:get started|start|focus|concentrate)|procrastinat(?:ing|e)?|keep (?:delaying|putting off|postponing|avoiding)|mann nahi (?:kar raha|karta)|padhne (?:ka|ki) mann|kaam (?:ka|ki) mann|aalas)\b/i],
  ["stuck", /\b(stuck|going nowhere|same place|nothing (?:changes|is changing|has changed)|no progress|not improving|atka (?:hua|hai)|atak gaya|kuch nahi badl(?:a|raha))\b/i],
  ["guilt", /\b(guilty|guilt|my fault|blame myself|because of me|i did wrong|galti meri|doshi|apne aap ko dosh)\b/i],
  ["jealousy", /\b(jealous|jealousy|envy|envious|jalan|jal (?:raha|rahi))\b/i],
  ["shame", /\b(ashamed|embarrassed|humiliated|sharam|sharmindagi|zillat|beizzati)\b/i],
  ["relationship_confusion", /\b(does (?:he|she|my crush) (?:like|love) me|mixed signals|confus(?:ed|ing)? about (?:him|her|them|us|the relationship|our relationship)|where (?:is|are) (?:this|we) going|pyar (?:hai ya|confus)|rishta (?:sahi|galat))\b/i],
  ["lonely", /\b(lonely|alone|isolated|no friends|nobody cares|no one cares|left out|miss everyone|akela|akeli|tanha)\b/i],
  ["anxious", /\b(anxious|anxiety|worried|worry|nervous|scared|afraid|uneasy|bechain|ghabrahat|dar)\b/i],
  ["stressed", /\b(stressed|stress|overwhelmed|pressure|too much to do|pareshan|dabav|tang)\b/i],
  ["burnout", /\b(tired|exhausted|sleepy|unwell|not feeling well|sick|ill|headache|burnt out|burned out|drained|no energy|thaka|thaki|thak gaya|thak gayi|neend)\b/i],
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

/** How many recent user messages shape the ongoing situation. */
const situationContextWindow = 5;

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

export function getLalaSituation(message: string): LalaSituation {
  return situationPatterns.find(([, pattern]) => pattern.test(message))?.[0] ?? "checkin";
}

export function getLalaMood(message: string): LalaMood | "crisis" {
  if (crisisPattern.test(message)) return "crisis";
  return situationMood[getLalaSituation(message)];
}

function isVeryShortMessage(message: string): boolean {
  return message.trim().split(/\s+/).filter(Boolean).length <= 2;
}

function pickReply(
  replies: readonly string[],
  choose: () => number,
  previousReplySet: ReadonlySet<string>,
): string {
  const start = Math.floor(Math.abs(choose()) * replies.length) % replies.length;
  for (let offset = 0; offset < replies.length; offset += 1) {
    const reply = replies[(start + offset) % replies.length];
    if (reply && !previousReplySet.has(reply)) return reply;
  }
  return replies[start] ?? replies[0] ?? crisisReply;
}

export function getLalaReply(
  message: string,
  choose = Math.random,
  context: { recentUserMessages?: readonly string[]; previousReplies?: readonly string[] } = {},
): string {
  const { recentUserMessages = [], previousReplies = [] } = context;
  if (crisisPattern.test(message)) return crisisReply;
  if (rudrakshPattern.test(message)) return founderReplies[getLalaLanguage(message)];

  // The ongoing situation is read across the latest five user messages, with
  // the current message included, so one word doesn't derail a running thread.
  const recentMessages = [...recentUserMessages, message].slice(-situationContextWindow);
  const situationCounts = new Map<LalaSituation, number>();
  for (const recent of recentMessages) {
    const situation = getLalaSituation(recent);
    situationCounts.set(situation, (situationCounts.get(situation) ?? 0) + 1);
  }
  const situation = recentMessages.reduce<LalaSituation>((chosen, recent) => {
    const candidate = getLalaSituation(recent);
    return (situationCounts.get(candidate) ?? 0) >= (situationCounts.get(chosen) ?? 0)
      ? candidate
      : chosen;
  }, getLalaSituation(message));

  const language = getLalaLanguage(message, recentUserMessages);
  const previousReplySet = new Set(previousReplies);

  if (situation === "checkin") {
    if (factualQuestionPattern.test(message)) return factualRedirects[language];
    // Handbook rule: a very short message gets a light, low-pressure question
    // instead of an assumption about how the user feels.
    if (isVeryShortMessage(message)) {
      return pickReply(shortMessageReplies[language], choose, previousReplySet);
    }
  }

  return pickReply(situationReplies[situation][language], choose, previousReplySet);
}
