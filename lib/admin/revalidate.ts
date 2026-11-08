import { revalidatePath, updateTag } from "next/cache";

/**
 * Invalidate public pages after an admin edit. `updateTag` expires the cached data
 * immediately (read-your-own-writes); `revalidatePath('/', 'layout')` drops every
 * prerendered page so the next visit renders with fresh content.
 * Must be called from a Server Action.
 */
export function revalidateContent(...tags: string[]) {
  for (const tag of tags) updateTag(tag);
  revalidatePath("/", "layout");
}
