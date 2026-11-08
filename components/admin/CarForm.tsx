"use client";

import { useActionState, useState } from "react";
import { saveCarAction } from "@/lib/admin/actions/cars";
import { adminRoutes } from "@/lib/admin/paths";
import { carAccents, type Car } from "@/lib/content/cars";
import { slugify, type UploadMode } from "@/lib/storage/shared";
import { ImageUpload } from "./ImageUpload";
import { SubmitButton } from "./SubmitButton";
import { Card, Field, Input, LinkButton, Notice, Select, Textarea } from "./ui";

export function CarForm({ car, uploadMode }: { car?: Car; uploadMode: UploadMode }) {
  const [state, action] = useActionState(saveCarAction, null);
  const [brand, setBrand] = useState(car?.brand ?? "");
  const [model, setModel] = useState(car?.model ?? "");
  const [slug, setSlug] = useState(car?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(car));

  const autoSlug = slugify(`${brand} ${model}`);
  const effectiveSlug = slugTouched ? slug : autoSlug;

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="originalSlug" value={car?.slug ?? ""} />

      <Card>
        <h2 className="font-display text-lg font-bold text-navy-900">Основное</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Марка">
            <Input name="brand" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Mercedes-Benz" required />
          </Field>
          <Field label="Модель">
            <Input name="model" value={model} onChange={(e) => setModel(e.target.value)} placeholder="E-Class" required />
          </Field>
          <Field label="Сегмент" hint="Показывается на карточке и в заголовке страницы">
            <Input name="segment" defaultValue={car?.segment ?? ""} placeholder="Бизнес-седан" required />
          </Field>
          <Field label="Привод">
            <Input name="drive" defaultValue={car?.drive ?? ""} placeholder="Задний / 4MATIC" />
          </Field>
          <Field label="Адрес страницы (slug)" hint={`Страница: /avtomobili/${effectiveSlug || "…"}`} className="sm:col-span-2">
            <Input
              name="slug"
              value={effectiveSlug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              onBlur={(e) => setSlug(slugify(e.target.value))}
              placeholder="mercedes-benz-e-class"
            />
          </Field>
          <Field label="Описание" hint="1–2 предложения для шапки страницы и разметки Product" className="sm:col-span-2">
            <Textarea name="description" defaultValue={car?.description ?? ""} rows={3} required />
          </Field>
        </div>
      </Card>

      <Card>
        <h2 className="font-display text-lg font-bold text-navy-900">Цены, USD</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-4">
          <Field label="В Корее от">
            <Input name="priceKoreaMin" type="number" min={0} step={500} defaultValue={car?.priceKorea[0] ?? ""} required inputMode="numeric" />
          </Field>
          <Field label="В Корее до">
            <Input name="priceKoreaMax" type="number" min={0} step={500} defaultValue={car?.priceKorea[1] ?? ""} required inputMode="numeric" />
          </Field>
          <Field label="Под ключ в РФ от">
            <Input name="priceTurnkeyMin" type="number" min={0} step={500} defaultValue={car?.priceTurnkey[0] ?? ""} required inputMode="numeric" />
          </Field>
          <Field label="Под ключ в РФ до">
            <Input name="priceTurnkeyMax" type="number" min={0} step={500} defaultValue={car?.priceTurnkey[1] ?? ""} required inputMode="numeric" />
          </Field>
        </div>
      </Card>

      <Card>
        <h2 className="font-display text-lg font-bold text-navy-900">Характеристики</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Двигатели" hint="По одному в строке">
            <Textarea name="engines" defaultValue={car?.engines.join("\n") ?? ""} rows={5} placeholder={"E 250 (2.0, 204 л.с.)\nE 300 (2.0, 258 л.с.)"} required />
          </Field>
          <Field label="Особенности комплектаций" hint="По одной в строке, первые 3 — на карточке">
            <Textarea name="highlights" defaultValue={car?.highlights.join("\n") ?? ""} rows={5} placeholder={"AMG Line\nBurmester\nMBUX"} />
          </Field>
          <Field label="Почему везут из Кореи" hint="По одному аргументу в строке (3 — оптимально)" className="sm:col-span-2">
            <Textarea name="whyPopular" defaultValue={car?.whyPopular.join("\n") ?? ""} rows={4} />
          </Field>
        </div>
      </Card>

      <Card>
        <h2 className="font-display text-lg font-bold text-navy-900">Фото и оформление</h2>
        <div className="mt-4 space-y-4">
          <ImageUpload name="image" defaultValue={car?.image ?? ""} folder="cars" mode={uploadMode} />
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Автор фото" hint="Для CC-лицензий, необязательно">
              <Input name="creditAuthor" defaultValue={car?.imageCredit?.author ?? ""} />
            </Field>
            <Field label="Лицензия">
              <Input name="creditLicense" defaultValue={car?.imageCredit?.license ?? ""} placeholder="CC BY-SA 4.0" />
            </Field>
            <Field label="Источник (ссылка)">
              <Input name="creditSource" type="url" defaultValue={car?.imageCredit?.source ?? ""} />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Цвет карточки без фото">
              <Select name="accent" defaultValue={car?.accent ?? carAccents[0].value}>
                {carAccents.map((a) => (
                  <option key={a.value} value={a.value}>
                    {a.label}
                  </option>
                ))}
              </Select>
            </Field>
            <label className="flex items-center gap-3 self-end rounded-lg border border-line px-3 py-2.5">
              <input type="checkbox" name="hidden" defaultChecked={Boolean(car?.hidden)} className="size-4 accent-navy-900" />
              <span className="text-[14px] text-navy-900">Скрыть с сайта (черновик)</span>
            </label>
          </div>
        </div>
      </Card>

      {state && !state.ok && <Notice tone="error">{state.error}</Notice>}

      <div className="flex flex-wrap items-center gap-2">
        <SubmitButton>{car ? "Сохранить изменения" : "Добавить автомобиль"}</SubmitButton>
        <LinkButton href={adminRoutes.cars} variant="ghost">
          Отмена
        </LinkButton>
        {car && (
          <a href={`/avtomobili/${car.slug}`} target="_blank" rel="noreferrer" className="ml-auto text-[13px] font-semibold text-accent-600 hover:underline">
            Открыть на сайте ↗
          </a>
        )}
      </div>
    </form>
  );
}
