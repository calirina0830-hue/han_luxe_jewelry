begin;

-- "Processed by" columns on the Reservations and Shipments lists show who
-- created each order or release. profiles is readable only by its owner and
-- by admins/owners, so staff could not resolve other users' names directly.
-- This function returns ONLY a display name (username, else full name) for
-- the given user ids, to any signed-in user with an active profile. No
-- emails, roles, or other profile fields are exposed.

create or replace function public.profile_display_names(p_ids uuid[])
returns table (id uuid, display_name text)
language sql
stable
security definer
set search_path = ''
as $function$
  select
    profile.id,
    coalesce(nullif(btrim(profile.username), ''), profile.full_name) as display_name
  from public.profiles as profile
  where auth.uid() is not null
    and public.current_profile_role() is not null
    and coalesce(cardinality(p_ids), 0) between 1 and 500
    and profile.id = any(p_ids);
$function$;

revoke all on function public.profile_display_names(uuid[]) from public, anon;
grant execute on function public.profile_display_names(uuid[]) to authenticated;

commit;
