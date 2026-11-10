-- Neon Data API schema for LCA, Abuja member data.
-- Run this in the Neon SQL Editor on the branch where the Data API is enabled.
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
-- ---------------------------------------------------------------------------
create table if not exists public.donations (
  id         uuid           primary key default gen_random_uuid(),
  user_id    text           not null,
  amount     numeric(12, 2) not null check (amount > 0),
  type       text           not null,
  allocation text           not null,
  created_at timestamptz    not null default now()
);

create index if not exists donations_user_id_idx on public.donations (user_id);

alter table public.donations enable row level security;

grant select, insert, update, delete on public.donations to authenticated;

drop policy if exists "donations_select_own" on public.donations;
create policy "donations_select_own" on public.donations
  for select to authenticated
  using (user_id = auth.user_id());

drop policy if exists "donations_insert_own" on public.donations;
create policy "donations_insert_own" on public.donations
  for insert to authenticated
  with check (user_id = auth.user_id());

drop policy if exists "donations_delete_own" on public.donations;
create policy "donations_delete_own" on public.donations
  for delete to authenticated
  using (user_id = auth.user_id());

-- Future tables created in public inherit these grants. RLS must still be
-- enabled and a policy added per table.
alter default privileges in schema public
  grant select, insert, update, delete on tables to authenticated;
