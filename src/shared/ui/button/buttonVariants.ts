import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-teal-700 text-white shadow-sm hover:bg-teal-800 focus:ring-teal-600',
        secondary:
          'border border-zinc-300 bg-white text-zinc-900 hover:border-teal-600 hover:text-teal-700 focus:ring-teal-600',
        ghost:
          'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 focus:ring-zinc-400'
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
