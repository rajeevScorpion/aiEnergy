# PROJECT: AI Energy-Aware Chat Platform (Experimental)

## 1. PURPOSE

Build a web-based AI chat platform that:

- Feels like a real AI chat product (ChatGPT-like UX)
- Uses real LLM responses (OpenAI API)
- Makes energy consumption visible at multiple levels
- Nudges users to improve prompt articulation
- Supports a controlled academic experiment

This is NOT a production product. It is an experimental simulation.

---

## 2. CORE PRINCIPLES

1. Product first, intervention second  
2. Keep UI familiar and frictionless  
3. Energy awareness should feel embedded, not forced  
4. Prompt learning should feel helpful, not instructional-heavy  
5. Build fast, minimal, deployable  

---

## 3. TECH STACK

Frontend:
- Next.js (App Router)
- TailwindCSS
- Shadcn UI (for clean components)

Backend:
- Supabase (Auth + DB + Storage)

AI:
- OpenAI API (Chat Completions)

Deployment:
- Vercel

---

## 4. AUTHENTICATION

- Google Sign-In only (via Supabase)
- No manual signup
- No profile editing UI
- Store user_id internally (not exposed in UI)

---

## 5. DATA MODEL (MINIMAL)

### Table: users
- id (uuid)
- created_at

### Table: threads
- id (uuid)
- user_id
- title (default: "New Chat")
- total_energy (float)
- created_at

### Table: messages
- id (uuid)
- thread_id
- role (user | assistant)
- content (text)
- energy_used (float)
- tokens_used (int)
- created_at

### Table: daily_usage (optional)
- id
- user_id
- date
- total_energy

---

## 6. CORE FEATURES

### 6.1 Chat Interface

- ChatGPT-like layout
- Left sidebar → thread list
- Main panel → conversation
- Bottom → input box + send button
- Loading state while generating

---

### 6.2 AI Response

- Use OpenAI API
- Stream response if possible (optional)
- Store:
  - prompt
  - response
  - tokens used

---

### 6.3 Energy Estimation (IMPORTANT)

Energy is estimated, not real.

#### Basic Formula (v1):
energy = tokens_used * constant_factor

Define:
- ENERGY_PER_1K_TOKENS = configurable env variable

Example:
energy = (tokens_used / 1000) * ENERGY_PER_1K_TOKENS

---

### 6.4 ENERGY VISIBILITY (3 LEVELS)

#### A. Per Response

After each assistant message, in action row:

UI row:
[copy] [thumbs up] [thumbs down] [retry] [energy info]

Energy display:
- "⚡ 0.002 kWh"
- or "≈ charging phone for 2 min"

Controlled by config:
- SHOW_ENERGY_RESPONSE = true/false

---

#### B. Thread Level (Sidebar)

- Each thread stores total_energy
- On hover:
  - show "Total: X kWh"

Controlled by:
- SHOW_ENERGY_THREAD = true/false

---

#### C. Overall Usage (Dashboard / Settings)

Minimal panel:

- Total energy used (lifetime)
- Today’s usage
- Simple equivalent (optional)

Example:
"You have used 0.12 kWh so far"

Controlled by:
- SHOW_ENERGY_DASHBOARD = true/false

---

## 7. ENERGY DISPLAY MODES

Controlled via ENV:

- ENERGY_MODE = "numeric" | "equivalent" | "both"

Numeric:
- 0.002 kWh

Equivalent:
- "≈ 1 phone charge"

Both:
- "0.002 kWh (≈ 1 phone charge)"

---

## 8. PROMPT ARTICULATION MODULE

Lightweight. Not a full course.

### 8.1 Hover Tips (Primary)

When user hovers on energy label:

Show small tooltip:

"Try clearer prompts:
- Role
- Context
- Specific instruction"

---

### 8.2 Mini Module (Optional Panel)

Simple modal or side panel:

Title: "Write Better Prompts"

Content:

- Use a role  
  Example: "Act as a UX designer"

- Add context  
  Example: "For a mobile app for students"

- Be specific  
  Example: "Give 3 ideas with short explanations"

No long text. Keep it tight.

---

## 9. CONFIGURATION (ENV VARIABLES)

OPENAI_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=

ENERGY_PER_1K_TOKENS=0.002

SHOW_ENERGY_RESPONSE=true
SHOW_ENERGY_THREAD=true
SHOW_ENERGY_DASHBOARD=true

ENERGY_MODE=both

---

## 10. UI COMPONENTS

### Required:

- Chat layout
- Message bubble (user / assistant)
- Action row (copy, like, dislike, retry, energy)
- Sidebar with threads
- Input box
- Tooltip (for prompt tips)
- Minimal dashboard / settings panel

---

## 11. NON-FUNCTIONAL CONTROLS

Buttons:
- copy
- thumbs up
- thumbs down
- retry

They can be:
- UI only (no backend required)
- Optional logging if easy

---

## 12. STORAGE LOGIC

On every interaction:

1. Save user message
2. Call OpenAI API
3. Capture tokens
4. Calculate energy
5. Save assistant message with energy
6. Update thread total_energy

---

## 13. EXPERIMENT REQUIREMENTS

- Stable for ~30 users
- No crashes under light load
- Fast response time
- Clean UI (important for realism)

---

## 14. OUT OF SCOPE (DO NOT BUILD)

- Multimodal input/output
- Complex analytics dashboard
- Multi-user collaboration
- Prompt versioning system
- Advanced training modules
- Visual metaphors (trees, bulbs etc.)
- Admin panels

---

## 15. DEPLOYMENT

- Deploy on Vercel
- Use environment variables
- Supabase connected
- Ready-to-share URL

---

## 16. FINAL CHECK

Before delivery:

- Chat works end-to-end
- Energy shows correctly
- Toggle works via ENV
- Data is stored in Supabase
- UI feels like real AI tool

---

END OF PRD