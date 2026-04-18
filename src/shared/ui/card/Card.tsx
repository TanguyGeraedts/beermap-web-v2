import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../lib/cn';

export type CardProps = ComponentPropsWithoutRef<'div'>;

export const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-zinc-200 bg-white p-5 shadow-sm',
        className
      )}
      {...props}
    />
  );
};
