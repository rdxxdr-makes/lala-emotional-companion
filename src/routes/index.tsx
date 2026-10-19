import { createFileRoute } from "@tanstack/react-router";
import { ArrowUp, Heart, Mic, Sparkles, Volume2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getLalaMood, getLalaReply, type LalaMood } from "@/lib/lala-responses";
import { getLalaGeminiReply } from "@/lib/lala-chat.functions";
type Companion = "sami" | "ammy";
type Message = { id: string; role: "user" | "lala"; text: string; mood: LalaMood };
type SpeechRecognitionResultLike = { 0?: { transcript?: string } };
type SpeechRecognitionEventLike = { results: ArrayLike<SpeechRecognitionResultLike> };
type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};
type SpeechWindow = Window & {
  SpeechRecognition?: new () => SpeechRecognitionLike;
  webkitSpeechRecognition?: new () => SpeechRecognitionLike;
};

const storageKey = "lala-companion-v1";
const starterMessage: Message = {
  id: "lala-welcome",
  role: "lala",
  text: "Hi, I’m glad you’re here. What’s been on your mind?",
  mood: "neutral",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lala — A space to be heard, not judged" },
      {
        name: "description",
        content: "Meet Lala, your gentle emotional companion. Share what's on your mind in a warm, judgment-free space.",
      },
      { property: "og:title", content: "Lala — A space to be heard, not judged" },
      {
        property: "og:description",
        content: "A gentle emotional companion, always here to listen without judgment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Lala,
});

function CompanionAvatar({ companion, mood, speaking }: { companion: Companion; mood: LalaMood; speaking: boolean }) {
  const sami = companion === "sami";
  const mouth = mood === "happy" ? "M178 269 Q220 302 262 269" : mood === "sad" || mood === "tired" ? "M185 282 Q220 263 255 282" : mood === "angry" ? "M190 282 Q220 273 250 282" : "M191 278 Q220 291 249 278";

  return (
    <svg
      aria-label={`${sami ? "Sami" : "Ammy"}, ${mood} expression`}
      className={`companion-portrait ${sami ? "portrait-sami" : "portrait-ammy"} mood-${mood}${speaking ? " portrait-speaking" : ""}`}
      role="img"
      viewBox="0 0 440 480"
    >
      <defs>
        <linearGradient id="hair-shine" x1="0" x2="1" y1="0" y2="1">
          <stop className="hair-light" offset="0" />
          <stop className="hair-dark" offset="1" />
        </linearGradient>
        <linearGradient id="shirt-shine" x1="0" x2="1" y1="0" y2="1">
          <stop className="shirt-light" offset="0" />
          <stop className="shirt-dark" offset="1" />
        </linearGradient>
      </defs>
      <path className="shoulders" d="M91 480c4-69 27-106 76-120l53-14 53 14c49 14 72 51 76 120Z" />
      <path className="shirt" d="m168 356 52 46 52-46 31 17-26 107H163l-26-107Z" />
      <path className="neck" d="M191 280h58v84c-16 27-42 27-58 0Z" />
      <path className="hair-behind" d={sami ? "M132 158q-28 22-27 75l12 106q5 40 43 51l15-146Z" : "M137 155q-29 29-17 95l12 86q9 41 44 43l8-195Z"} />
      <ellipse className="ear" cx="129" cy="215" rx="17" ry="26" />
      <ellipse className="ear" cx="311" cy="215" rx="17" ry="26" />
      <ellipse className="face" cx="220" cy="198" rx="91" ry="111" />
      {sami ? (
        <g className="hair-front">
          <path d="M126 180q-3-103 92-111 94-2 98 91l-9 45q-13-39-26-63-31 13-69 10-31-2-67-18-3 31-21 70Z" />
          <path d="M134 152q-23 42-11 136l10 44q-32-8-38-39l-1-118q6-65 40-92 31-25 82-24-60 23-82 93Z" />
          <path d="M307 161q24 34 18 111l-9 57q32-8 37-43l-3-116q-13-82-79-97 35 26 36 88Z" />
          <path className="hair-highlight" d="M171 96q31-29 70-22-43 13-58 43Z" />
        </g>
      ) : (
        <g className="hair-front hair-curly">
          <path d="M129 194q-26-40-7-74 7-52 50-60 12-40 58-24 36-32 68 8 42 6 43 56 27 36 4 82l-16-24-5-37-20 22-20-38-23 26-20-34-27 27-18-16-25 33-18 30Z" />
          <circle cx="145" cy="113" r="34" />
          <circle cx="184" cy="77" r="35" />
          <circle cx="228" cy="71" r="36" />
          <circle cx="273" cy="86" r="36" />
          <circle cx="304" cy="119" r="34" />
          <path className="hair-highlight" d="M176 83q26-35 57-27-24 6-37 35Z" />
        </g>
      )}
      <path className="brow" d="M164 192q21-12 42 0M234 192q21-12 42 0" />
      <g className="left-eye">
        <ellipse className="eye-white" cx="185" cy="218" rx="12" ry="15" />
        <ellipse className="pupil" cx="187" cy="220" rx="5" ry="8" />
        <circle className="eye-shine" cx="189" cy="217" r="2" />
      </g>
      <g className="right-eye">
        <ellipse className="eye-white" cx="255" cy="218" rx="12" ry="15" />
        <ellipse className="pupil" cx="253" cy="220" rx="5" ry="8" />
        <circle className="eye-shine" cx="255" cy="217" r="2" />
      </g>
      <path className="nose" d="M219 227q-7 25 3 28" />
      <ellipse className="blush" cx="163" cy="257" rx="15" ry="7" />
      <ellipse className="blush" cx="277" cy="257" rx="15" ry="7" />
      <g className="mouth-group">
  <ellipse className="mouth-opening" cx="220" cy="278" rx="17" ry="2.5" />
  <path className="mouth" d={mouth} />
</g>
      <path className="collar" d="m168 356 52 46-19 14-35-43Zm104 0-52 46 19 14 35-43Z" />
      <path className="shirt-stitch" d="M220 410v69" />
    </svg>
  );
}

function Lala() {
  const [companion, setCompanion] = useState<Companion>("sami");
  const [mood, setMood] = useState<LalaMood>("neutral");
  const [messages, setMessages] = useState<Message[]>([starterMessage]);
  const [input, setInput] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [speechAvailable, setSpeechAvailable] = useState(false);
  const [notice, setNotice] = useState("");
  const messageList = useRef<HTMLDivElement>(null);
  const recognition = useRef<SpeechRecognitionLike | null>(null);
  const name = companion === "sami" ? "Sami" : "Ammy";

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (typeof parsed === "object" && parsed !== null) {
          const record = parsed as { companion?: unknown; messages?: unknown };
          if (record.companion === "sami" || record.companion === "ammy") setCompanion(record.companion);
          if (
            Array.isArray(record.messages) &&
            record.messages.length > 0 &&
            record.messages.every(
              (message): message is Message =>
                typeof message === "object" &&
                message !== null &&
                typeof message.id === "string" &&
                (message.role === "lala" || message.role === "user") &&
                typeof message.text === "string" &&
                ["happy", "sad", "stressed", "lonely", "tired", "angry", "neutral"].includes(message.mood),
            )
          ) {
            const restored = record.messages.slice(-32);
            setMessages(restored);
            const lastReply = [...restored].reverse().find((message: Message) => message.role === "lala");
            if (lastReply) setMood(lastReply.mood);
          }
        }
      }
    } catch {
      localStorage.removeItem(storageKey);
    }

    const speechWindow = window as SpeechWindow;
    setSpeechAvailable("speechSynthesis" in window);
    if (!speechWindow.SpeechRecognition && !speechWindow.webkitSpeechRecognition) {
      setNotice("Microphone dictation isn’t available in this browser.");
    }

    return () => {
      window.speechSynthesis?.cancel();
      recognition.current?.stop();
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ companion, messages: messages.slice(-32) }));
    } catch {
      setNotice("Your browser couldn’t save this conversation.");
    }
  }, [companion, messages]);

  useEffect(() => {
    if (messageList.current) messageList.current.scrollTop = messageList.current.scrollHeight;
  }, [messages]);

  const speak = useCallback((text: string) => {
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.94;
    utterance.pitch = 1.04;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const text = input.trim();
  if (!text) return;

  const currentMood = getLalaMood(text);

  const userMessage: Message = {
    id: `user-${Date.now()}`,
    role: "user",
    text,
    mood: currentMood === "crisis" ? "sad" : currentMood,
  };

  const conversationForGemini = [...messages, userMessage]
    .slice(-12)
    .map((message) => ({
      role: message.role,
      text: message.text,
    }));

  setMessages((current) => [...current, userMessage].slice(-32));
  setMood(userMessage.mood);
  setInput("");
  setNotice("");

  try {
    const result = await getLalaGeminiReply({
      data: {
        companion,
        messages: conversationForGemini,
      },
    });

    const lalaMessage: Message = {
      id: `lala-${Date.now()}`,
      role: "lala",
      text: result.reply,
      mood: userMessage.mood,
    };

    setMessages((current) => [...current, lalaMessage].slice(-32));
    setMood(lalaMessage.mood);
    speak(result.reply);
  } catch {
    const fallbackReply = getLalaReply(text);

    const lalaMessage: Message = {
      id: `lala-${Date.now()}`,
      role: "lala",
      text: fallbackReply,
      mood: userMessage.mood,
    };

    setMessages((current) => [...current, lalaMessage].slice(-32));
    setNotice("I’m having a small connection problem, so I’m using my offline replies for now.");
    speak(fallbackReply);
  }
};
   
    const speechWindow = window as SpeechWindow;
    const Recognition = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
    if (!Recognition) {
      setNotice("Microphone dictation isn’t available in this browser.");
      return;
    }
    if (listening) {
      recognition.current?.stop();
      setListening(false);
      return;
    }
    const currentRecognition = new Recognition();
    currentRecognition.lang = "en-US";
    currentRecognition.interimResults = false;
    currentRecognition.continuous = false;
    currentRecognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) setInput((current) => [current.trim(), transcript].filter(Boolean).join(" "));
    };
    currentRecognition.onerror = () => {
      setNotice("We couldn’t hear that. Please try again or type a message.");
      setListening(false);
    };
    currentRecognition.onend = () => setListening(false);
    recognition.current = currentRecognition;
    try {
      currentRecognition.start();
      setListening(true);
      setNotice("");
    } catch {
      setNotice("Microphone couldn’t start. Please check your browser permission.");
      setListening(false);
    }
  };

  return (
    <main className={`lala-page mood-${mood}`}>
      <header className="topbar">
        <a aria-label="Lala, home" className="brand-mark" href="/">
          <span className="brand-heart"><Heart aria-hidden="true" fill="currentColor" size={17} strokeWidth={1.7} /></span>
          <span>lala<span className="brand-period">.</span></span>
        </a>
        <div aria-label="Choose a companion" className="companion-switcher" role="group">
          <span className="switcher-label">YOUR COMPANION</span>
          <Button
            aria-pressed={companion === "sami"}
            className={`companion-option${companion === "sami" ? " companion-option-active" : ""}`}
            onClick={() => setCompanion("sami")}
            type="button"
            variant="ghost"
          >
            <span className="person-marker person-marker-sami" aria-hidden="true" />Sami
          </Button>
          <Button
            aria-pressed={companion === "ammy"}
            className={`companion-option${companion === "ammy" ? " companion-option-active" : ""}`}
            onClick={() => setCompanion("ammy")}
            type="button"
            variant="ghost"
          >
            <span className="person-marker person-marker-ammy" aria-hidden="true" />Ammy
          </Button>
        </div>
        <div aria-label="Private conversation saved on this device" className="privacy-label">
          <span className="privacy-dot" aria-hidden="true" /> Just between us
        </div>
      </header>

      <div className="main-layout">
        <section aria-label={`Meet ${name}`} className="presence-panel">
          <div className="presence-copy">
            <div className="eyebrow"><Sparkles aria-hidden="true" size={14} /> A LITTLE SPACE FOR YOU</div>
            <h1>A space to be heard,<br /><span>not judged.</span></h1>
            <p>Whatever you’re carrying, you don’t have to carry it alone.</p>
          </div>

          <div className="portrait-stage">
            <div aria-hidden="true" className="portrait-halo" />
            <div aria-hidden="true" className="portrait-orbit portrait-orbit-one" />
            <div aria-hidden="true" className="portrait-orbit portrait-orbit-two" />
            <CompanionAvatar companion={companion} mood={mood} speaking={speaking} />
            <div className="portrait-caption">
              <div className="online-mark"><span /><span /><span /></div>
              <span>Here with you</span>
              <span aria-hidden="true" className="caption-divider">·</span>
              <span className="portrait-name">{name}</span>
            </div>
          </div>

          <div className="presence-footnote"><span className="footnote-line" />One moment at a time</div>
        </section>

        <section aria-label="Your conversation" className="conversation-panel">
          <div className="conversation-header">
            <div>
              <div className="conversation-eyebrow">YOUR SPACE</div>
              <h2>A little check-in</h2>
            </div>
            <div aria-label={speechAvailable ? "Spoken replies are available" : "Spoken replies aren’t available in this browser"} className={`voice-status${speechAvailable ? "" : " voice-unavailable"}`}>
              <Volume2 aria-hidden="true" size={15} />
              <span>Gentle voice</span>
            </div>
          </div>

          <div aria-live="polite" className="message-list" ref={messageList}>
            <div className="day-divider"><span>RIGHT NOW</span></div>
            {messages.map((message, index) => (
              <div className={`message-row message-row-${message.role}`} key={message.id}>
                {message.role === "lala" && (
                  <span aria-hidden="true" className="message-avatar"><Heart fill="currentColor" size={12} strokeWidth={1.5} /></span>
                )}
                <div className="message-body">
                  {message.role === "lala" && index > 0 && <span className="message-sender">{name}</span>}
                  <p className="message-bubble">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="conversation-bottom">
            {notice && <p aria-live="polite" className="notice-line">{notice}</p>}
            <form className="composer" onSubmit={sendMessage}>
              <Input
                aria-label="Share what’s on your mind"
                autoComplete="off"
                className="composer-input"
                maxLength={500}
                onChange={(event) => setInput(event.target.value)}
                placeholder="What’s on your mind?"
                value={input}
              />
              <Button
                aria-label={listening ? "Stop listening" : "Speak a message"}
                className={`mic-button${listening ? " mic-listening" : ""}`}
                onClick={startListening}
                size="icon"
                title={listening ? "Stop listening" : "Speak a message"}
                type="button"
                variant="ghost"
              >
                <Mic aria-hidden="true" size={18} />
              </Button>
              <Button aria-label="Send message" className="send-button" disabled={!input.trim()} size="icon" title="Send message" type="submit">
                <ArrowUp aria-hidden="true" size={19} strokeWidth={2.2} />
              </Button>
            </form>
            <p className="composer-footer">A kind reply is just a little moment away <span aria-hidden="true">✳</span></p>
          </div>
        </section>
      </div>

      <footer className="page-footer"><span>lala<span className="brand-period">.</span></span><span>Made for the days you need a little softness.</span><span>With care, always <Heart aria-hidden="true" fill="currentColor" size={12} /></span></footer>
    </main>
  );
}
