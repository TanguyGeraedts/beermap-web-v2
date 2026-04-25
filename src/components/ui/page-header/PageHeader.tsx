import type { ReactNode } from 'react';

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export const PageHeader = ({
  eyebrow,
  title,
  description,
  actions
}: PageHeaderProps) => {
  return (
    <header>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">
          {eyebrow}
        </p>
      ) : null}
      <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold leading-tight text-[var(--color-text)] sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--color-muted)]">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </header>
  );
};
