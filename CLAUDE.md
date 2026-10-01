# CLAUDE.md — Biryani Bot

## Purpose

Biryani Bot is a restaurant web app for **Ali's Biryani House, Manchester**. It has a simple website and an AI assistant that answers customer questions about the menu, opening hours, location and similar restaurant information.

## Architecture overview

```
Customer's browser                Server                     AI provider
┌──────────────────┐   HTTP   ┌──────────────────┐   API   ┌────────────┐
│ frontend/        │ ───────▶ │ backend/         │ ──────▶ │ LLM API    │
│ index.html       │ ◀─────── │ reads data/ and  │ ◀────── │            │
│ styles.css       │          │ prompts/, holds  │         └────────────┘
│ app.js           │          │ the API key      │
└──────────────────┘          └──────────────────┘
```

- `frontend/`: plain HTML, CSS and vanilla JavaScript. It has no build step and no framework unless one is agreed first.
- `backend/`: a small server that receives chat messages from the frontend, adds restaurant data and prompts, calls the AI provider and returns the reply. Its language and framework haven't been chosen yet. Ask before choosing.
- `data/`: restaurant facts (menu, prices, hours, address, allergens) in simple files such as JSON. This is the single source of truth for those facts.
- `prompts/`: the assistant's instructions as plain text or Markdown files, kept separate from code.

## Coding rules

- Keep it simple and beginner-readable. Prefer clear code over clever code.
- Don't add libraries, frameworks or tools without asking first.
- Use small, focused functions with descriptive names.
- Never hard-code restaurant facts (prices, hours, dishes) in code or prompts. Read them from `data/`.
- Keep prompt text in `prompts/`, not inside code.
- The frontend must work on mobile and desktop.
- Write comments only where the reason for the code isn't obvious.

## Security rules

- Never put API keys, passwords or secrets in any file that is committed. Use a `.env` file, which is git-ignored, and environment variables.
- The AI API key lives only on the backend. The frontend must never call the AI provider directly.
- Treat all user input as untrusted. Validate and limit message length on the backend, and never insert user text into the page as raw HTML.
- The assistant must not make up menu items, prices or allergen information. If something isn't in `data/`, it should say it doesn't know and suggest contacting the restaurant.
- Don't collect or store customers' personal data unless a task explicitly requires it.

## Token-saving rules

- Read only the files needed for the current task. Don't scan the whole repo.
- Don't re-read a file you've just edited.
- Make targeted edits rather than rewriting whole files.
- Keep explanations short. Summarise what changed in a few lines and don't repeat code back.
- Don't generate placeholder content, sample data or documentation unless asked.
- Ask one short question when a task is unclear instead of guessing and redoing work.

## Scope of changes

**Only modify the files needed for the current task.** Don't refactor, reformat, rename or "tidy up" other files, and don't add features that weren't asked for. If you notice something elsewhere that should change, mention it instead of changing it.
