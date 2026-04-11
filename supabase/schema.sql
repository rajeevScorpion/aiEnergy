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
create policy "Users can manage own threads"
  on threads for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Messages: users can access messages in their own threads
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
