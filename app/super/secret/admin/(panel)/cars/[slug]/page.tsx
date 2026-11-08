import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CarForm } from "@/components/admin/CarForm";
import { PageTitle } from "@/components/admin/ui";
import { loadCars } from "@/lib/data/cars";
import { getUploadMode } from "@/lib/storage";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const car = (await loadCars()).find((c) => c.slug === slug);
  return { title: car ? `${car.brand} ${car.model}` : "Автомобиль" };
}

export default async function AdminEditCarPage({ params }: Props) {
  const { slug } = await params;
  const car = (await loadCars()).find((c) => c.slug === decodeURIComponent(slug));
  if (!car) notFound();

  return (
    <>
      <PageTitle title={`${car.brand} ${car.model}`} description={`Редактирование · /avtomobili/${car.slug}`} />
      <CarForm car={car} uploadMode={getUploadMode()} />
    </>
  );
}
