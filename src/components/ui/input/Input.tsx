import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils/cn';

export type InputProps = ComponentPropsWithoutRef<'input'> & {
  invalid?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid = false, ...props }, ref) => {
    return (
      <input
        className={cn(
          'h-11 w-full rounded-lg border bg-[var(--color-surface)] px-3 text-sm text-[var(--color-text)] shadow-sm outline-none transition placeholder:text-[var(--color-muted)] focus:ring-2 focus:ring-offset-0',
          invalid
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
            : 'border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-[var(--color-ring-soft)]',
          className
        )}
        ref={ref}
        aria-invalid={invalid || undefined}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
