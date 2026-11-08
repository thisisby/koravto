import type { Lead, LeadRow, LeadState, LeadStatus } from "@/lib/content/leads";
import { getStorage, randomId } from "@/lib/storage";
import { readDoc, writeDoc } from "@/lib/storage/docs";

/**
 * Leads (CRM).
 *
 * Every submitted form becomes an immutable file `leads/<id>.json` — appends never
 * conflict, so two simultaneous submissions can't overwrite each other. The id starts
 * with an inverted timestamp so that a plain pathname sort lists newest leads first.
 *
 * Admin-side state (status, notes) is a single versioned document `leads-state`,
 * written only from the admin panel.
 */

export type { Lead, LeadRow, LeadState, LeadStatus };
export { leadStatuses } from "@/lib/content/leads";

type LeadsStateDoc = { version: 1; updatedAt: string; states: Record<string, LeadState> };

const PREFIX = "leads/";
const STATE_DOC = "leads-state";
const MAX_TS = 9_999_999_999_999; // 13 digits — Date.now() stays 13 digits until the year 2286

const defaultState = (): LeadState => ({ status: "new", note: "", updatedAt: "" });

function leadPathname(id: string) {
  return `${PREFIX}${id}.json`;
}

export async function createLead(input: Omit<Lead, "id" | "createdAt">): Promise<Lead> {
  const now = Date.now();
  const id = `${String(MAX_TS - now).padStart(13, "0")}-${randomId(8)}`;
  const lead: Lead = { id, createdAt: new Date(now).toISOString(), ...input };
  await getStorage().put(leadPathname(id), JSON.stringify(lead), { contentType: "application/json" });
  return lead;
}

async function loadStates(): Promise<Record<string, LeadState>> {
  const doc = await readDoc<LeadsStateDoc>(STATE_DOC);
  return doc?.states ?? {};
}

async function saveStates(states: Record<string, LeadState>) {
  const doc: LeadsStateDoc = { version: 1, updatedAt: new Date().toISOString(), states };
  await writeDoc(STATE_DOC, doc);
}

export async function listLeads({ cursor, limit = 50 }: { cursor?: string; limit?: number } = {}) {
  const storage = getStorage();
  const [{ files, cursor: next, hasMore }, states] = await Promise.all([
    storage.list(PREFIX, { limit, cursor }),
    loadStates(),
  ]);
  const leads = await Promise.all(
    files.map(async (f): Promise<LeadRow | null> => {
      const lead = await storage.readJson<Lead>(f.url);
      if (!lead) return null;
      return { ...lead, url: f.url, state: states[lead.id] ?? defaultState() };
    }),
  );
  return { leads: leads.filter((l): l is LeadRow => l !== null), cursor: next, hasMore };
}

export async function getLead(id: string): Promise<LeadRow | null> {
  if (!/^[0-9]{13}-[a-z0-9]+$/.test(id)) return null;
  const storage = getStorage();
  const [{ files }, states] = await Promise.all([storage.list(leadPathname(id), { limit: 1 }), loadStates()]);
  const file = files[0];
  if (!file) return null;
  const lead = await storage.readJson<Lead>(file.url);
  if (!lead) return null;
  return { ...lead, url: file.url, state: states[id] ?? defaultState() };
}

export async function setLeadState(id: string, patch: Partial<Pick<LeadState, "status" | "note">>) {
  const states = await loadStates();
  const current = states[id] ?? defaultState();
  states[id] = { ...current, ...patch, updatedAt: new Date().toISOString() };
  await saveStates(states);
}

export async function deleteLead(id: string) {
  const storage = getStorage();
  const { files } = await storage.list(leadPathname(id), { limit: 1 });
  if (files.length) await storage.remove(files.map((f) => f.url));
  const states = await loadStates();
  if (id in states) {
    delete states[id];
    await saveStates(states);
  }
}

/** Counts for the dashboard. Scans up to 1000 most recent leads. */
export async function leadStats() {
  const storage = getStorage();
  const [{ files }, states] = await Promise.all([storage.list(PREFIX, { limit: 1000 }), loadStates()]);
  let fresh = 0;
  for (const f of files) {
    const id = f.pathname.slice(PREFIX.length).replace(/\.json$/, "");
    if ((states[id]?.status ?? "new") === "new") fresh += 1;
  }
  return { total: files.length, new: fresh };
}
