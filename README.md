# Lala Emotional Companion

Create a simple one-page MVP named Lala — an emotional companion, not a question-answering chatbot. make this happen in less than *3 credits

Use React + Tailwind only. No backend, login, database, API, or external assets.

The page should have:

Dark purple/blue calming gradient background.

A large centered chest-up companion avatar made with CSS/SVG, with a big head, shoulders, clothes, blinking, gentle floating/breathing animation, and simple mouth movement while speaking.

Two choices at the top: Sami (girl) and Ammy (boy). Selecting one changes the avatar’s hair, clothing, and colors.

A chat area with one text input and Send button.

A microphone button using browser speech recognition if supported.

Use browser text-to-speech to speak every reply.

Save the selected companion and latest messages in localStorage.

The user shares feelings, such as “I topped my exam,” “I failed,” “I feel lonely,” “I am stressed,” or “I’m not feeling well.”

Use simple local keyword matching—no AI API—to select caring prewritten replies. Detect: happy/achievement, sad/failure, stress/anxiety, lonely, tired/unwell, angry, and neutral.

Change the avatar’s expression and background glow:

happy: smile

sad: caring/soft

stressed: calm

lonely: warm/attentive

tired: gentle concern

angry: composed

Keep replies short, polite, supportive, and varied. For danger or self-harm language, display: “I’m really glad you shared this. Please contact someone you trust nearby or your local emergency service right now.”

Add the headline: “A space to be heard, not judged.”

Make it beautiful, responsive, polished, and easy to demo.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/38d97ae6-90c7-4688-bb79-8dcc08152e06).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
