import { EmptyState, LinkButton } from "@/components/admin/ui";
import { adminRoutes } from "@/lib/admin/paths";

export default function AdminNotFound() {
  return (
    <EmptyState title="Запись не найдена">
      <p>Возможно, она была удалена или адрес изменился.</p>
      <div className="mt-4">
        <LinkButton href={adminRoutes.home} variant="secondary">
          На главную админки
        </LinkButton>
      </div>
    </EmptyState>
  );
}
