"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { ADMIN_PATH } from "@/lib/admin/paths";
import { revalidateContent } from "@/lib/admin/revalidate";
import { carAccents, type Car } from "@/lib/content/cars";
import { CARS_TAG, loadCars, saveCars } from "@/lib/data/cars";
import { removeManaged, slugify } from "@/lib/storage";
import { bool, errorMessage, lines, num, str, type ActionState } from "./types";

const CARS_PATH = `${ADMIN_PATH}/cars`;

function parseCar(formData: FormData): { car: Car } | { error: string } {
  const brand = str(formData, "brand", 60);
  const model = str(formData, "model", 80);
  const segment = str(formData, "segment", 80);
  const drive = str(formData, "drive", 80);
  const description = str(formData, "description", 1200);
  const slug = slugify(str(formData, "slug", 100) || `${brand} ${model}`);
  const priceKorea: [number, number] = [num(formData, "priceKoreaMin"), num(formData, "priceKoreaMax")];
  const priceTurnkey: [number, number] = [num(formData, "priceTurnkeyMin"), num(formData, "priceTurnkeyMax")];
  const engines = lines(formData, "engines", 12);
  const highlights = lines(formData, "highlights", 12);
  const whyPopular = lines(formData, "whyPopular", 8);
  const accent = str(formData, "accent", 120);
  const image = str(formData, "image", 1000) || undefined;
  const creditAuthor = str(formData, "creditAuthor", 120);
  const creditLicense = str(formData, "creditLicense", 60);
  const creditSource = str(formData, "creditSource", 500);

  if (!brand || !model) return { error: "Укажите марку и модель" };
  if (!slug) return { error: "Не удалось сформировать адрес страницы (slug)" };
  if (!segment) return { error: "Укажите сегмент (например, «Бизнес-седан»)" };
  if (!description) return { error: "Добавьте описание" };
  if (priceKorea.some(Number.isNaN) || priceTurnkey.some(Number.isNaN)) return { error: "Цены должны быть числами" };
  if (priceKorea[0] > priceKorea[1] || priceTurnkey[0] > priceTurnkey[1]) return { error: "Минимальная цена больше максимальной" };
  if (engines.length === 0) return { error: "Добавьте хотя бы один двигатель" };
  if (!carAccents.some((a) => a.value === accent)) return { error: "Выберите цвет карточки" };
  if (image && !/^(https?:\/\/|\/)/.test(image)) return { error: "Некорректная ссылка на фото" };

  const car: Car = {
    slug,
    brand,
    model,
    segment,
    priceKorea,
    priceTurnkey,
    engines,
    drive: drive || "—",
    highlights,
    description,
    whyPopular,
    accent,
    image,
    imageCredit: image && creditAuthor && creditSource ? { author: creditAuthor, license: creditLicense || undefined, source: creditSource } : undefined,
    hidden: bool(formData, "hidden") || undefined,
  };
  return { car };
}

export async function saveCarAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseCar(formData);
  if ("error" in parsed) return { ok: false, error: parsed.error };
  const { car } = parsed;
  const originalSlug = str(formData, "originalSlug", 100);

  try {
    const cars = await loadCars();
    const existingIndex = originalSlug ? cars.findIndex((c) => c.slug === originalSlug) : -1;
    const clash = cars.find((c) => c.slug === car.slug && c.slug !== originalSlug);
    if (clash) return { ok: false, error: `Адрес «${car.slug}» уже занят (${clash.brand} ${clash.model})` };

    let next: Car[];
    if (existingIndex === -1) {
      next = [...cars, car];
    } else {
      const previous = cars[existingIndex];
      next = cars.map((c, i) => (i === existingIndex ? car : c));
      if (previous.image && previous.image !== car.image) await removeManaged([previous.image]);
    }
    await saveCars(next);
    revalidateContent(CARS_TAG);
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
  redirect(CARS_PATH);
}

export async function deleteCarAction(slug: string) {
  await requireAdmin();
  const cars = await loadCars();
  const target = cars.find((c) => c.slug === slug);
  if (!target) return;
  await saveCars(cars.filter((c) => c.slug !== slug));
  await removeManaged([target.image]);
  revalidateContent(CARS_TAG);
}

export async function moveCarAction(slug: string, direction: "up" | "down") {
  await requireAdmin();
  const cars = await loadCars();
  const i = cars.findIndex((c) => c.slug === slug);
  const j = direction === "up" ? i - 1 : i + 1;
  if (i === -1 || j < 0 || j >= cars.length) return;
  const next = [...cars];
  [next[i], next[j]] = [next[j], next[i]];
  await saveCars(next);
  revalidateContent(CARS_TAG);
}

export async function toggleCarHiddenAction(slug: string) {
  await requireAdmin();
  const cars = await loadCars();
  if (!cars.some((c) => c.slug === slug)) return;
  await saveCars(cars.map((c) => (c.slug === slug ? { ...c, hidden: !c.hidden || undefined } : c)));
  revalidateContent(CARS_TAG);
}
