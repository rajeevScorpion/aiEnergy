-- ============================================================
-- AI Energy Chat Platform — Supabase Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------
-- Table: threads
-- ------------------------------------------------------------
create table if not exists threads (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  title       text not null default 'New Chat',
  total_energy float not null default 0,
  created_at  timestamptz not null default now()
);

-- Index for fast user thread lookups
create index if not exists threads_user_id_idx on threads(user_id);

-- ------------------------------------------------------------
-- Table: messages
-- ------------------------------------------------------------
create table if not exists messages (
  id          uuid primary key default uuid_generate_v4(),
  thread_id   uuid not null references threads(id) on delete cascade,
  role        text not null check (role in ('user', 'assistant')),
  content     text not null,
  energy_used float,
  tokens_used int,
  created_at  timestamptz not null default now()
);

-- Index for fast message lookups per thread
create index if not exists messages_thread_id_idx on messages(thread_id);
create index if not exists messages_created_at_idx on messages(created_at);

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------

alter table threads enable row level security;
alter table messages enable row level security;

-- Threads: users can only access their own threads
drop policy if exists "Users can manage own threads" on threads;
create policy "Users can manage own threads"
  on threads for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Messages: users can access messages in their own threads
drop policy if exists "Users can manage own messages" on messages;
create policy "Users can manage own messages"
  on messages for all
  using (
    exists (
      select 1 from threads
      where threads.id = messages.thread_id
        and threads.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from threads
      where threads.id = messages.thread_id
        and threads.user_id = auth.uid()
    )
  );

-- ============================================================
-- MIGRATION: Session & Interaction tracking
-- Run this block after the initial schema above
-- ============================================================

-- ------------------------------------------------------------
-- Extend: threads (session fields)
-- ------------------------------------------------------------
alter table threads
  add column if not exists mode             text not null default 'AWARENESS'
    check (mode in ('AWARENESS', 'GUIDED')),
  add column if not exists task_id          text,
  add column if not exists end_time         timestamptz,
  add column if not exists total_prompts    int not null default 0,
  add column if not exists total_tokens_in  int not null default 0,
  add column if not exists total_tokens_out int not null default 0,
  add column if not exists avg_energy_per_prompt float not null default 0;

-- ------------------------------------------------------------
-- Extend: messages (interaction fields)
-- ------------------------------------------------------------
alter table messages
  add column if not exists raw_prompt           text,
  add column if not exists enhanced_prompt      text,
  add column if not exists tokens_in            int,
  add column if not exists tokens_out           int,
  add column if not exists prompt_quality_score float,
  add column if not exists validation_flags     jsonb;

-- ------------------------------------------------------------
-- Table: tasks (static config — seeded manually)
-- ------------------------------------------------------------
create table if not exists tasks (
  id                   text primary key,
  title                text not null,
  description          text not null,
  expected_output_type text not null check (expected_output_type in ('IMAGE', 'POSTER', 'TEXT')),
  difficulty           text not null check (difficulty in ('LOW', 'MEDIUM'))
);

-- Seed default tasks (safe to re-run — upsert)
insert into tasks (id, title, description, expected_output_type, difficulty) values
  ('task_poster_event',   'Event Poster',         'Design a promotional poster for a public event.',                    'POSTER', 'MEDIUM'),
  ('task_story_short',    'Short Story',          'Write a short story based on a given theme or prompt.',             'TEXT',   'LOW'),
  ('task_image_product',  'Product Image',        'Generate a product image concept with style and composition details.','IMAGE',  'MEDIUM'),
  ('task_text_description','Product Description', 'Write a compelling product description for an e-commerce listing.', 'TEXT',   'LOW')
on conflict (id) do nothing;
