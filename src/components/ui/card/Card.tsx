import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils/cn';

export type CardProps = ComponentPropsWithoutRef<'div'>;

export const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm',
        className
      )}
      {...props}
    />
  );
};
