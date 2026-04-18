import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../lib/cn';

export type InputProps = ComponentPropsWithoutRef<'input'> & {
  invalid?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid = false, ...props }, ref) => {
    return (
      <input
        className={cn(
          'h-11 w-full rounded-lg border bg-white px-3 text-sm text-zinc-950 shadow-sm outline-none transition placeholder:text-zinc-400 focus:ring-2 focus:ring-offset-0',
          invalid
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
            : 'border-zinc-300 focus:border-teal-600 focus:ring-teal-100',
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
