-- FavoriteNews Phase 1 schema. Apply once in the Supabase SQL editor.
-- Ingestion runs with a server-side secret key in Phase 2; the app reads with a publishable key.

create table public.news_categories (
  id text primary key,
  name text not null unique,
  display_name text not null,
  color text not null,
  icon text not null,
  sort_order integer not null unique
);

insert into public.news_categories (id, name, display_name, color, icon, sort_order) values
  ('security', 'Security', 'サイバーセキュリティ', '#2477F3', '✦', 1),
  ('ntt', 'NTT', 'NTTグループ', '#12A875', '◎', 2),
  ('stocks', 'Stocks', '株式・市場', '#FF8A1F', '↗', 3),
  ('ai', 'AI', 'AI', '#8B5CF6', '◉', 4);

create table public.news_events (
  id text primary key,
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  summary text not null check (char_length(summary) <= 500),
  category text not null references public.news_categories(id),
  secondary_categories text[] not null default '{}',
  company text not null default '',
  published_at timestamptz not null,
  importance_score numeric(3,1) not null check (importance_score between 0 and 10),
  relevance_score numeric(3,1) not null check (relevance_score between 0 and 10),
  buzz_score numeric(3,1) not null check (buzz_score between 0 and 10),
  personal_relevance_reason text not null default '',
  image_url text,
  tags text[] not null default '{}',
  impacts jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.news_sources (
  id uuid primary key default gen_random_uuid(),
  event_id text not null references public.news_events(id) on delete cascade,
  source_name text not null,
  source_type text not null check (source_type in ('official','nikkei','reuters','media','x','other')),
  title text not null,
  summary text not null default '',
  url text not null check (url ~ '^https://'),
  published_at timestamptz not null,
  unique (event_id, url)
);

create table public.news_snapshots (
  id uuid primary key default gen_random_uuid(),
  snapshot_at timestamptz not null,
  event_id text not null references public.news_events(id) on delete cascade,
  importance_score numeric(3,1) not null check (importance_score between 0 and 10),
  buzz_score numeric(3,1) not null check (buzz_score between 0 and 10),
  rank integer not null check (rank > 0),
  unique (snapshot_at, event_id)
);

create table public.market_snapshots (
  id uuid primary key default gen_random_uuid(),
  symbol text not null,
  name text not null,
  price numeric(18,4) not null,
  change_percent numeric(8,3) not null,
  points numeric[] not null default '{}',
  captured_at timestamptz not null,
  unique (symbol, captured_at)
);

create table public.x_trends (
  id uuid primary key default gen_random_uuid(),
  keyword text not null,
  post_count integer not null check (post_count >= 0),
  change_percent numeric(10,2) not null,
  buzz_score numeric(3,1) not null check (buzz_score between 0 and 10),
  points numeric[] not null default '{}',
  captured_at timestamptz not null,
  unique (keyword, captured_at)
);

create table public.user_themes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  kind text not null default 'interest' check (kind in ('work','investment','learning','interest')),
  created_at timestamptz not null default now(),
  unique (user_id, name)
);

create index news_events_published_idx on public.news_events (published_at desc);
create index news_events_category_idx on public.news_events (category, importance_score desc);
create index news_sources_event_idx on public.news_sources (event_id);
create index news_snapshots_time_idx on public.news_snapshots (snapshot_at desc, rank);
create index market_snapshots_latest_idx on public.market_snapshots (captured_at desc);
create index x_trends_latest_idx on public.x_trends (captured_at desc);
create index user_themes_owner_idx on public.user_themes (user_id);

alter table public.news_categories enable row level security;
alter table public.news_events enable row level security;
alter table public.news_sources enable row level security;
alter table public.news_snapshots enable row level security;
alter table public.market_snapshots enable row level security;
alter table public.x_trends enable row level security;
alter table public.user_themes enable row level security;

-- Public editorial data can be read without signing in. Personalized rows remain owner-only.
create policy "read categories" on public.news_categories for select to anon, authenticated using (true);
create policy "read visible events" on public.news_events for select to anon, authenticated
  using (user_id is null or (select auth.uid()) = user_id);
create policy "read sources for visible events" on public.news_sources for select to anon, authenticated
  using (exists (select 1 from public.news_events e where e.id = event_id and (e.user_id is null or e.user_id = (select auth.uid()))));
create policy "read snapshots for visible events" on public.news_snapshots for select to anon, authenticated
  using (exists (select 1 from public.news_events e where e.id = event_id and (e.user_id is null or e.user_id = (select auth.uid()))));
create policy "read markets" on public.market_snapshots for select to anon, authenticated using (true);
create policy "read trends" on public.x_trends for select to anon, authenticated using (true);
create policy "read own themes" on public.user_themes for select to authenticated using ((select auth.uid()) = user_id);
create policy "insert own themes" on public.user_themes for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "delete own themes" on public.user_themes for delete to authenticated using ((select auth.uid()) = user_id);

-- Explicit grants also work on projects where new public tables are no longer exposed automatically.
grant usage on schema public to anon, authenticated;
grant select on public.news_categories, public.news_events, public.news_sources,
  public.news_snapshots, public.market_snapshots, public.x_trends to anon, authenticated;
grant select, insert, delete on public.user_themes to authenticated;
