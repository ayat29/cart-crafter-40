-- Create purchases table to store user transactions
create table public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  items jsonb not null,
  total decimal(10, 2) not null,
  created_at timestamp with time zone default now() not null
);

-- Enable RLS
alter table public.purchases enable row level security;

-- Users can view their own purchases
create policy "Users can view their own purchases"
on public.purchases
for select
to authenticated
using (auth.uid() = user_id);

-- Users can insert their own purchases
create policy "Users can insert their own purchases"
on public.purchases
for insert
to authenticated
with check (auth.uid() = user_id);

-- Create index for better query performance
create index idx_purchases_user_id on public.purchases(user_id);
create index idx_purchases_created_at on public.purchases(created_at desc);