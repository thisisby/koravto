"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { ADMIN_PATH } from "@/lib/admin/paths";
import { deleteLead, leadStatuses, setLeadState, type LeadStatus } from "@/lib/data/leads";
import { errorMessage, str, type ActionState } from "./types";

const LEADS_PATH = `${ADMIN_PATH}/leads`;

function asStatus(v: unknown): LeadStatus | null {
  return leadStatuses.some((s) => s.value === v) ? (v as LeadStatus) : null;
}

export async function setLeadStatusAction(id: string, status: string) {
  await requireAdmin();
  const s = asStatus(status);
  if (!s) return;
  await setLeadState(id, { status: s });
  revalidatePath(LEADS_PATH, "layout");
}

export async function saveLeadNoteAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const id = str(formData, "id", 60);
  const note = str(formData, "note", 4000);
  const status = asStatus(formData.get("status"));
  try {
    await setLeadState(id, { note, ...(status ? { status } : {}) });
    revalidatePath(LEADS_PATH, "layout");
    return { ok: true, message: "Сохранено" };
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
}

export async function deleteLeadAction(id: string) {
  await requireAdmin();
  await deleteLead(id);
  revalidatePath(LEADS_PATH, "layout");
  redirect(LEADS_PATH);
}
