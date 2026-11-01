-- Run once in Supabase SQL Editor for the Maulid guestbook.
create table if not exists public.maulid_doa (
  id uuid primary key default gen_random_uuid(),
  nama text not null check (char_length(nama) between 1 and 80),
  pesan text not null check (char_length(pesan) between 1 and 500),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.maulid_doa enable row level security;
grant select, insert on public.maulid_doa to anon;

drop policy if exists maulid_doa_read_approved on public.maulid_doa;
create policy maulid_doa_read_approved
  on public.maulid_doa for select to anon
  using (approved = true);

drop policy if exists maulid_doa_submit_pending on public.maulid_doa;
create policy maulid_doa_submit_pending
  on public.maulid_doa for insert to anon
  with check (approved = false);
