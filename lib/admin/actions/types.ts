export type ActionState = { ok: true; message?: string } | { ok: false; error: string } | null;

export function errorMessage(err: unknown, fallback = "Что-то пошло не так") {
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}

export function str(formData: FormData, key: string, max = 500) {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export function lines(formData: FormData, key: string, max = 20) {
  return str(formData, key, 5000)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, max);
}

export function num(formData: FormData, key: string) {
  const v = Number.parseFloat(str(formData, key, 20).replace(/\s|,/g, ""));
  return Number.isFinite(v) ? Math.round(v) : NaN;
}

export function bool(formData: FormData, key: string) {
  const v = formData.get(key);
  return v === "on" || v === "true" || v === "1";
}
