"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/admin/actions/auth";
import { Field, Input, Notice } from "./ui";
import { SubmitButton } from "./SubmitButton";

export function LoginForm({ next }: { next: string }) {
  const [state, action] = useActionState(loginAction, null);
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={next} />
      <Field label="Логин">
        <Input name="login" autoComplete="username" required autoFocus />
      </Field>
      <Field label="Пароль">
        <Input name="password" type="password" autoComplete="current-password" required />
      </Field>
      {state && !state.ok && <Notice tone="error">{state.error}</Notice>}
      <SubmitButton className="w-full" pendingText="Проверяем…">
        Войти
      </SubmitButton>
    </form>
  );
}
