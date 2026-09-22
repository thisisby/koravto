import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-32 text-white">
      <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
      <div className="container-x relative text-center">
        <p className="font-display text-8xl font-extrabold text-accent-400">404</p>
        <h1 className="font-display mt-4 text-3xl font-bold">Такой страницы нет</h1>
        <p className="mx-auto mt-3 max-w-md text-white/65">
          Возможно, ссылка устарела. Начните с главной или посмотрите популярные модели.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">На главную</ButtonLink>
          <ButtonLink href="/avtomobili" variant="outline-light">
            Автомобили <Icon.ArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
