-- Neon Data API schema for LCA, Abuja member data.
--
-- PREREQUISITE: Enable the Data API on the branch first (Postgres database ->
-- Data API -> Enable Data API). That creates the `authenticated` role. If you
-- run this script before enabling the Data API you will get:
--   ERROR: role "authenticated" does not exist (SQLSTATE 42704)
-- Then run this script in the Neon SQL Editor and click "Refresh schema cache".
--
-- Authorization is enforced by Postgres Row Level Security. The Data API
-- extracts Clerk's JWT `sub` claim via auth.user_id(); the client must send a
-- token whose `role` claim is "authenticated" (see the Clerk JWT template).

grant usage on schema public to authenticated;

-- ---------------------------------------------------------------------------
-- RSVPs
-- ---------------------------------------------------------------------------
create table if not exists public.rsvps (
  user_id    text        not null,
  event_id   text        not null,
  title      text        not null,
  event_date date        not null,
  time       text        not null,
  location   text        not null,
  name       text        not null,
  email      text        not null,
  phone      text        not null default '',
  rsvped_at  timestamptz not null default now(),
  primary key (user_id, event_id)
);

alter table public.rsvps enable row level security;

grant select, insert, update, delete on public.rsvps to authenticated;

drop policy if exists "rsvps_select_own" on public.rsvps;
create policy "rsvps_select_own" on public.rsvps
  for select to authenticated
  using (user_id = auth.user_id());

drop policy if exists "rsvps_insert_own" on public.rsvps;
create policy "rsvps_insert_own" on public.rsvps
  for insert to authenticated
  with check (user_id = auth.user_id());

drop policy if exists "rsvps_update_own" on public.rsvps;
create policy "rsvps_update_own" on public.rsvps
  for update to authenticated
  using (user_id = auth.user_id())
  with check (user_id = auth.user_id());

drop policy if exists "rsvps_delete_own" on public.rsvps;
create policy "rsvps_delete_own" on public.rsvps
  for delete to authenticated
  using (user_id = auth.user_id());

-- ---------------------------------------------------------------------------
-- Donations
--
-- Rows are written only by the Netlify Functions in netlify/functions, which
-- connect with DATABASE_URL (the database owner) after verifying the Paystack
-- transaction. Authenticated app users may only read their own rows, so a
-- client can never fabricate a donation or receipt through the Data API.
-- ---------------------------------------------------------------------------
create table if not exists public.donations (
  id          uuid           primary key default gen_random_uuid(),
  reference   text,
  user_id     text,
  full_name   text,
  email       text,
  phone       text,
  amount      numeric(12, 2) not null check (amount > 0),
  amount_kobo bigint,
  currency    text           not null default 'NGN',
  type        text           not null default 'donation',
  allocation  text           not null default 'General Fund',
  channel     text,
  paystack_id text,
  anonymous   boolean        not null default false,
  status      text           not null default 'success',
  paid_at     timestamptz,
  created_at  timestamptz    not null default now()
);

-- Bring an existing donations table up to date without dropping data.
alter table public.donations
  add column if not exists reference text,
  add column if not exists full_name text,
  add column if not exists email text,
  add column if not exists phone text,
  add column if not exists amount_kobo bigint,
  add column if not exists currency text not null default 'NGN',
  add column if not exists channel text,
  add column if not exists paystack_id text,
  add column if not exists anonymous boolean not null default false,
  add column if not exists status text not null default 'success',
  add column if not exists paid_at timestamptz,
  alter column user_id drop not null;

create unique index if not exists donations_reference_key on public.donations (reference);
create index if not exists donations_user_id_idx on public.donations (user_id);

alter table public.donations enable row level security;

-- Read-only for the app; inserts/updates/deletes happen server-side only.
grant select on public.donations to authenticated;
revoke insert, update, delete on public.donations from authenticated;

drop policy if exists "donations_select_own" on public.donations;
create policy "donations_select_own" on public.donations
  for select to authenticated
  using (user_id = auth.user_id());

drop policy if exists "donations_insert_own" on public.donations;
drop policy if exists "donations_update_own" on public.donations;
drop policy if exists "donations_delete_own" on public.donations;

-- Future tables created in public inherit these grants. RLS must still be
-- enabled and a policy added per table.
alter default privileges in schema public
  grant select, insert, update, delete on tables to authenticated;
