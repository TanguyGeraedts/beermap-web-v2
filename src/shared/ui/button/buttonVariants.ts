import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--color-primary)] text-[var(--color-primary-contrast)] shadow-sm hover:bg-[var(--color-primary-hover)] focus:ring-[var(--color-ring)]',
        secondary:
          'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] focus:ring-[var(--color-ring)]',
        ghost:
          'text-[var(--color-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)] focus:ring-[var(--color-ring)]'
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-11 px-5',
        lg: 'h-12 px-6'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);
