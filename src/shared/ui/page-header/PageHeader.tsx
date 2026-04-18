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
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
          {eyebrow}
        </p>
      ) : null}
      <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold leading-tight text-zinc-950 sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-700">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </header>
  );
};
