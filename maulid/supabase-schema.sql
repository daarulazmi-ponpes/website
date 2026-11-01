-- Run in Supabase SQL Editor to apply the public guestbook rules.
-- New submissions appear immediately. Only project staff can remove entries in Table Editor.
create table if not exists public.maulid_doa (
  id uuid primary key default gen_random_uuid(),
  nama text not null check (char_length(nama) between 1 and 80),
  pesan text not null check (char_length(pesan) between 1 and 500),
  approved boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.maulid_doa enable row level security;
alter table public.maulid_doa alter column approved set default true;
update public.maulid_doa set approved = true where approved = false;
grant select, insert on public.maulid_doa to anon;

drop policy if exists maulid_doa_read_approved on public.maulid_doa;
drop policy if exists maulid_doa_read_public on public.maulid_doa;
create policy maulid_doa_read_public
  on public.maulid_doa for select to anon
  using (true);

drop policy if exists maulid_doa_submit_pending on public.maulid_doa;
drop policy if exists maulid_doa_submit_public on public.maulid_doa;
create policy maulid_doa_submit_public
  on public.maulid_doa for insert to anon
  with check (approved = true);
