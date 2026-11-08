"use client";

import { useFormStatus } from "react-dom";
import { Button, type ButtonVariant } from "./ui";

export function SubmitButton({
  children,
  pendingText = "Сохраняем…",
  variant = "primary",
  className,
  ...props
}: React.ComponentProps<"button"> & { pendingText?: string; variant?: ButtonVariant }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant={variant} className={className} disabled={pending || props.disabled} {...props}>
      {pending ? pendingText : children}
    </Button>
  );
}
