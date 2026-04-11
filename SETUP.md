# AI Energy Chat — Setup Guide

## Prerequisites

- Node.js 18+
- A Supabase project
- An OpenAI API key

---

## 1. Supabase Setup

### Create project
1. Go to [supabase.com](https://supabase.com) → New Project
2. Note your **Project URL** and **anon/public key** (Settings → API)

### Run schema
1. Go to **SQL Editor** in your Supabase dashboard
2. Paste the contents of `supabase/schema.sql` and run it

### Enable Google Auth
1. Go to **Authentication → Providers → Google**
2. Enable it and add your Google OAuth credentials
3. Add your app URL to the redirect list:
   - `http://localhost:3000/auth/callback` (local)
   - `https://your-app.vercel.app/auth/callback` (production)

---

## 2. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in:

```env
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

ENERGY_PER_1K_TOKENS=0.002

SHOW_ENERGY_RESPONSE=true
SHOW_ENERGY_THREAD=true
SHOW_ENERGY_DASHBOARD=true

ENERGY_MODE=both
```

---

## 3. Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 4. Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo to Vercel and add the environment variables in the Vercel dashboard under **Settings → Environment Variables**.

---

## ENV Variable Reference

| Variable | Default | Description |
|---|---|---|
| `OPENAI_API_KEY` | — | OpenAI secret key |
| `NEXT_PUBLIC_SUPABASE_URL` | — | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | — | Supabase anon key |
| `ENERGY_PER_1K_TOKENS` | `0.002` | kWh per 1,000 tokens |
| `SHOW_ENERGY_RESPONSE` | `true` | Show energy per message |
| `SHOW_ENERGY_THREAD` | `true` | Show energy on thread hover |
| `SHOW_ENERGY_DASHBOARD` | `true` | Show energy dashboard link |
| `ENERGY_MODE` | `both` | `numeric` / `equivalent` / `both` |

---

## Experiment Controls

To create different conditions for your study, set ENV variables:

- **Control group** (no energy): `SHOW_ENERGY_RESPONSE=false SHOW_ENERGY_THREAD=false SHOW_ENERGY_DASHBOARD=false`
- **Numeric only**: `ENERGY_MODE=numeric`
- **Equivalent only**: `ENERGY_MODE=equivalent`
- **Full visibility**: All `SHOW_*=true`, `ENERGY_MODE=both`
