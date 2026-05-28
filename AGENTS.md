# Agent Instructions — WebXR First Steps (React)

A guided tutorial repo for building a WebXR target-shooting game with React Three XR. Each `tutorial/chapterN.md` walks through a stage of the final app in `src/`.

## Source-of-truth files (read these first, do not duplicate their contents in this file)

For setup, build steps, SDK versions, and project layout, read:

- `README.md` — official setup, local server, headset workflow, deploy
- `package.json` and `package-lock.json` — Node / npm dependencies (React, `@react-three/xr`, IWER, etc.)
- `tsconfig.json` and `webpack.config.js` — TypeScript and bundler config
- `tutorial/chapter1.md` … `tutorial/chapter6.md` — chapter-by-chapter source-of-truth for what the code should look like at each step
- `LICENSE` — license terms

## Quest / Horizon-specific notes

- Dev server runs on `https://localhost:8081` with a self-signed cert — the browser warning is expected; access from the Quest browser via LAN IP or Chrome `chrome://inspect` port forwarding.
- The project bundles IWER + `@iwer/devui` for in-browser XR emulation when running on `localhost`. The Immersive Web Emulator browser extension conflicts with this and should be disabled while developing here.
- This is a tutorial repo — keep `src/` aligned with the chapter markdown when editing; the chapters are the user-facing contract.

## Meta Quest tooling

This repository is part of the Meta Quest / Horizon OS ecosystem (a sample, library, template, or related project — the bespoke intro above describes which). Use that intro and the source-of-truth files it references for project-specific decisions; don't restate or invent facts from memory.

When the user asks anything about Quest device behavior, build / deploy / debug / capture flows, on-device performance, or Horizon OS APIs, reach for these tools instead of generic WebXR answers:

- **`hzdb`** — Quest-aware ADB wrapper (device list, install / launch / stop, logs, screenshots, Perfetto traces, on-device docs search). Already wired up as an MCP server via `.mcp.json`, `.vscode/mcp.json`, and `.cursor/mcp.json`. Also runnable directly: `npx -y @meta-quest/hzdb <subcommand>`.
- **Meta Quest Agentic Tools** — the full skill set, including WebXR-specific skills: [github.com/meta-quest/agentic-tools](https://github.com/meta-quest/agentic-tools). Install per your client (Claude Code: `/plugin install meta-vr@meta-quest`; Gemini CLI: `gemini extensions install https://github.com/meta-quest/agentic-tools`; Cursor / VS Code: install the **Meta Horizon** extension from the Marketplace).

A few behavior expectations:

- **Read this repo's files first.** Before answering anything project-specific, read `README.md` and whichever source-of-truth files the intro above points at. Don't restate their contents in chat — quote or link instead.
- **Use `hzdb` for device-side work.** Anything that touches an attached Quest (install, launch, logs, screenshot, capture, manifest inspection) goes through `hzdb`, not raw `adb`.
- **Check live Horizon OS docs before answering API questions.** `hzdb docs search "..."` queries the live docs; training data on Horizon OS APIs goes stale fast.
- **Don't fabricate SDK / engine versions.** If a version isn't visible in this repo's files, say so rather than guessing.
