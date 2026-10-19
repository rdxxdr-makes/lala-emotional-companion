import { createServerFn } from "@tanstack/react-start";

type Companion = "sami" | "ammy";

type ChatMessage = {
  role: "user" | "lala";
  text: string;
};

type ChatInput = {
  companion: Companion;
  messages: ChatMessage[];
};

const LALA_PERSONALITY = `
You are Lala, a warm emotional companion with an expressive 3D face.
Your purpose is to help a person feel heard, understood, and gently supported.

Rules:
- Reply in a natural, warm, caring tone.
- Keep replies short: normally 2 to 4 sentences.
- Carefully understand the user's recent conversation before replying.
- Celebrate achievements sincerely.
- For sadness, stress, anxiety, loneliness, or failure: validate their feelings first, then offer one gentle next step.
- Ask at most one thoughtful follow-up question when it helps.
- Do not sound repetitive, robotic, preachy, or overly dramatic.
- You are not a doctor, therapist, or emergency service.
- If the user mentions self-harm, suicide, immediate danger, or harming another person: encourage them to contact local emergency services or a trusted person nearby immediately.
- If the user asks a factual question, gently say that you are here mainly to listen and support them emotionally, then connect it back to how they are feeling.
`;

function validateInput(value: unknown): ChatInput {
  if (typeof value !== "object" || value === null) {
    throw new Error("Invalid chat request.");
  }

  const input = value as Partial<ChatInput>;

  if (input.companion !== "sami" && input.companion !== "ammy") {
    throw new Error("Invalid companion.");
  }

  if (!Array.isArray(input.messages)) {
    throw new Error("Invalid messages.");
  }

  const messages = input.messages
    .filter(
      (message): message is ChatMessage =>
        typeof message === "object" &&
        message !== null &&
        (message.role === "user" || message.role === "lala") &&
        typeof message.text === "string",
    )
    .slice(-12);

  if (messages.length === 0) {
    throw new Error("Please share a message first.");
  }

  return { companion: input.companion, messages };
}

export const getLalaGeminiReply = createServerFn({ method: "POST" })
  .validator(validateInput)
  .handler(async ({ data }) => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("Gemini is not configured yet.");
    }

    const companionName = data.companion === "sami" ? "Sami" : "Ammy";

    const contents = data.messages.map((message) => ({
      role: message.role === "lala" ? "model" : "user",
      parts: [{ text: message.text }],
    }));

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: `${LALA_PERSONALITY}\n\nThe chosen companion is ${companionName}.`,
              },
            ],
          },
          contents,
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 180,
          },
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Lala could not reach Gemini. Please try again.");
    }

    const result = (await response.json()) as {
      candidates?: Array<{
        content?: {
          parts?: Array<{ text?: string }>;
        };
      }>;
    };

    const reply = result.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? "")
      .join("")
      .trim();

    if (!reply) {
      throw new Error("Lala could not create a reply. Please try again.");
    }

    return { reply };
  });
