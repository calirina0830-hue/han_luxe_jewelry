import type { createClient } from "@/lib/supabase/server";

type Client = Awaited<ReturnType<typeof createClient>>;

/**
 * Display names (username, else full name) for the given user ids, via the
 * profile_display_names database function, which staff can call even though
 * they cannot read other profiles directly. Unknown or deleted users are
 * simply missing from the map.
 */
export async function loadDisplayNames(
  supabase: Client,
  userIds: Array<string | null | undefined>,
): Promise<Map<string, string>> {
  const ids = [...new Set(userIds.filter((id): id is string => Boolean(id)))];
  const names = new Map<string, string>();
  if (!ids.length) return names;

  const { data, error } = await supabase.rpc("profile_display_names", {
    p_ids: ids.slice(0, 500),
  });
  if (error) {
    // A missing migration should not break the list; the column shows "—".
    console.error("profile_display_names failed", error.message);
    return names;
  }
  for (const row of data ?? []) {
    names.set(row.id, row.display_name);
  }
  return names;
}
