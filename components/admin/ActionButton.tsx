"use client";

import { useTransition, type ReactNode } from "react";
import { Button, type ButtonVariant } from "./ui";

/**
 * Button that runs a server action (optionally after a confirm dialog) and shows a
 * pending state. Used for delete / reorder / toggle buttons.
 */
export function ActionButton({
  action,
  confirm: confirmText,
  children,
  variant = "secondary",
  className = "",
  title,
  disabled,
}: {
  action: () => Promise<unknown>;
  confirm?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  title?: string;
  disabled?: boolean;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      title={title}
      disabled={pending || disabled}
      onClick={() => {
        if (confirmText && !window.confirm(confirmText)) return;
        startTransition(async () => {
          await action();
        });
      }}
    >
      {pending ? "…" : children}
    </Button>
  );
}
