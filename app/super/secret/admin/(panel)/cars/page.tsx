import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ActionButton } from "@/components/admin/ActionButton";
import { Badge, EmptyState, LinkButton, PageTitle } from "@/components/admin/ui";
import { deleteCarAction, moveCarAction, toggleCarHiddenAction } from "@/lib/admin/actions/cars";
import { adminRoutes } from "@/lib/admin/paths";
import { formatUsd } from "@/lib/content/cars";
import { loadCars } from "@/lib/data/cars";

export const metadata: Metadata = { title: "Автомобили" };

export default async function AdminCarsPage() {
  const cars = await loadCars();

  return (
    <>
      <PageTitle
        title="Автомобили"
        description="Каталог на главной, в разделе «Автомобили» и в футере. Порядок списка = порядок на сайте."
        action={<LinkButton href={adminRoutes.newCar}>+ Добавить</LinkButton>}
      />

      {cars.length === 0 ? (
        <EmptyState title="Каталог пуст">Добавьте первую модель.</EmptyState>
      ) : (
        <ul className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
          {cars.map((car, i) => (
            <li key={car.slug} className="flex flex-col gap-3 border-b border-line p-4 last:border-b-0 sm:flex-row sm:items-center">
              <Link href={adminRoutes.car(car.slug)} className="flex min-w-0 flex-1 items-center gap-4">
                <div className={`relative aspect-[16/10] w-28 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br ${car.accent}`}>
                  {car.image && (
                    <Image src={car.image} alt="" fill sizes="112px" className="object-cover" unoptimized={car.image.startsWith("/uploads/")} />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-navy-900">
                    {car.brand} {car.model}
                    {car.hidden && <Badge className="ml-2 bg-zinc-200 text-zinc-700">скрыт</Badge>}
                  </p>
                  <p className="truncate text-[13px] text-muted">
                    {car.segment} · под ключ от {formatUsd(car.priceTurnkey[0])} · /avtomobili/{car.slug}
                  </p>
                </div>
              </Link>
              <div className="flex shrink-0 flex-wrap items-center gap-1.5">
                <ActionButton action={moveCarAction.bind(null, car.slug, "up")} disabled={i === 0} title="Выше" className="px-2.5">
                  ↑
                </ActionButton>
                <ActionButton action={moveCarAction.bind(null, car.slug, "down")} disabled={i === cars.length - 1} title="Ниже" className="px-2.5">
                  ↓
                </ActionButton>
                <ActionButton action={toggleCarHiddenAction.bind(null, car.slug)} title={car.hidden ? "Показать на сайте" : "Скрыть с сайта"}>
                  {car.hidden ? "Показать" : "Скрыть"}
                </ActionButton>
                <LinkButton href={adminRoutes.car(car.slug)} variant="secondary">
                  Изменить
                </LinkButton>
                <ActionButton
                  action={deleteCarAction.bind(null, car.slug)}
                  confirm={`Удалить «${car.brand} ${car.model}»? Страница /avtomobili/${car.slug} перестанет открываться.`}
                  variant="danger"
                >
                  Удалить
                </ActionButton>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
