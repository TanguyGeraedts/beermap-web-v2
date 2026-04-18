import type { ReactNode } from 'react';

type FieldProps = {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
};

export const Field = ({ label, htmlFor, hint, error, children }: FieldProps) => {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium text-zinc-900" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-sm text-rose-600">{error}</p>
      ) : hint ? (
        <p className="text-sm text-zinc-500">{hint}</p>
      ) : null}
    </div>
  );
};
