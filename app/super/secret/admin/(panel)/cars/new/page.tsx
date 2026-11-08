import type { Metadata } from "next";
import { CarForm } from "@/components/admin/CarForm";
import { PageTitle } from "@/components/admin/ui";
import { getUploadMode } from "@/lib/storage";

export const metadata: Metadata = { title: "Новый автомобиль" };

export default function AdminNewCarPage() {
  return (
    <>
      <PageTitle title="Новый автомобиль" description="После сохранения появится в каталоге и получит собственную страницу." />
      <CarForm uploadMode={getUploadMode()} />
    </>
  );
}
