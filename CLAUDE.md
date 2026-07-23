# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

**Before writing any Next.js code, read the relevant guide in `node_modules/next/dist/docs/`.** This repo pins `next@16.2.10`, a version newer than most training data — APIs, conventions, and file/folder structure may differ from what you expect. Heed deprecation notices.

## Commands

Working directory for all commands is the inner `emtp-site/` folder (this repo has a duplicated outer folder name — the actual Next.js project root is `emtp-site/emtp-site/`).

- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint (flat config via `eslint.config.mjs`)

There is no test suite configured in this project.

## Architecture

This is a single-purpose Next.js **App Router** marketing site for EMTP, a construction company (French-language content, Côte d'Ivoire office). No database, no CMS, no auth — content is hardcoded in components.

### Page structure
- `app/page.tsx` — the single-page marketing site. Stitches together section components in order (Navbar, Hero, Apropos, Services, Projets, Feedback, Contact, Footer), each wrapped in an `<section id="...">` for anchor-link navigation.
- `app/demande-devis/page.js` — standalone "request a quote" form page (separate from the homepage contact form).
- `app/loading-devis/page.js` — a client-side interstitial that redirects to `/demande-devis` after 1s (a fake loading screen, not a data-dependent route).
- `app/components/*` — all homepage sections. Mix of `.tsx` (typed) and the form/page files under `demande-devis`/`loading-devis` which are plain `.js` — this split is inconsistent, not a deliberate pattern; don't assume `.js` vs `.tsx` implies anything about the code.

### Server-side mail via Nodemailer + Gmail SMTP
Both the homepage contact form (`components/contact.tsx`) and the devis request form (`demande-devis/page.js`) submit to Next.js Route Handlers, which send mail server-side with `nodemailer` through Gmail SMTP (`smtp.gmail.com`), authenticating as `SMTP_USER` (App Password in `SMTP_PASSWORD`) from `.env.local`. **`SMTP_USER` is intentionally a personal, non-Workspace Gmail account** (not `contact@emtp-btp.com`) — Workspace's admin policy blocked App Passwords, so a separate free Gmail account is used purely as the sending identity. All mail is delivered to `contact@emtp-btp.com`, with `replyTo` set to the submitter's address.

- `app/api/send-contact/route.ts` — homepage contact form. Takes JSON `{ name, email, phone, subject, message }`, sends one email.
- `app/api/send-devis/route.js` — devis request form. Takes `multipart/form-data` (file + `fullName`/`company`/`role`/`email`/`phone`/`mission`/`details`), saves the file to `public/uploads/` (filename prefixed with `Date.now()`) *and* attaches it directly to the outgoing email. File size is capped at 18MB (`page.js` client-side check + route handler check) to stay under Gmail's ~25MB message-size ceiling after base64 attachment overhead — don't raise this without switching attachment strategy.

Both EmailJS and Resend were tried and removed from this project — don't reintroduce either; Gmail SMTP via a personal App Password is the current, deliberate choice (Workspace SMTP relay and Resend's free-tier domain-verification requirement were both ruled out).

### Styling
Tailwind CSS v4 (`@tailwindcss/postcss` plugin, no `tailwind.config.*` file — theme customization lives in `app/globals.css` via `@theme inline`). Two Google fonts (Montserrat for headings, Open Sans for body) are loaded via `next/font/google` in `app/layout.tsx` and exposed as CSS variables consumed from `globals.css`.

### Import aliases
`@/*` maps to `./app/*` (see `tsconfig.json`). Usage is inconsistent across the codebase — some files use `@/components/...`, others use relative `./components/...` from `app/page.tsx`. Either works; match the surrounding file's style rather than "fixing" it.
