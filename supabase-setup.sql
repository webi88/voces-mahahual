-- ─────────────────────────────────────────────────────────────
--  Voces de Mahahual · Tabla de comentarios del foro
--  Ejecutar en Supabase → SQL Editor → New query → RUN
-- ─────────────────────────────────────────────────────────────

create table if not exists voces_comentarios (
  id           bigserial primary key,
  autor        text not null,
  rol          text default '',
  tema         text not null,
  texto        text not null,
  likes        int  not null default 0,
  destacado    boolean not null default false,
  created_at   timestamptz not null default now()
);

create index if not exists voces_comentarios_tema_idx
  on voces_comentarios (tema);
create index if not exists voces_comentarios_created_idx
  on voces_comentarios (created_at desc);

-- RLS: lectura pública, inserción pública, sin updates/deletes
alter table voces_comentarios enable row level security;

drop policy if exists "Lectura pública"     on voces_comentarios;
drop policy if exists "Inserción pública"   on voces_comentarios;
drop policy if exists "Like incrementable"  on voces_comentarios;

create policy "Lectura pública"
  on voces_comentarios for select
  using (true);

create policy "Inserción pública"
  on voces_comentarios for insert
  with check (
    length(autor) between 1 and 60
    and length(texto) between 1 and 1500
    and tema in (
      'trabajo','turismo','pesca','politica',
      'servicios','deportes','fiestas','vecinos'
    )
  );

-- (opcional) RPC para incrementar likes de forma atómica:
create or replace function voces_like(p_id bigint)
returns void language sql security definer as $$
  update voces_comentarios set likes = likes + 1 where id = p_id;
$$;
grant execute on function voces_like(bigint) to anon, authenticated;
