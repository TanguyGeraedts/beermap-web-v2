import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    children: ReactNode;
};

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        'bg-[var(--color-primary)] text-[var(--color-primary-contrast)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5',
    secondary:
        'bg-[var(--color-surface-muted)] text-[var(--color-text)] border border-[var(--color-border)] hover:-translate-y-0.5',
    ghost:
        'bg-transparent text-[var(--color-primary)] border border-[var(--color-primary)] hover:bg-[var(--color-ring-soft)] hover:-translate-y-0.5',
    danger: 'bg-red-600 text-white hover:bg-red-700 hover:-translate-y-0.5'
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm h-8',
    md: 'px-6 py-3 text-base h-10',
    lg: 'px-8 py-4 text-lg h-12'
};

/**
 * Button component with theme-aware styling.
 * Uses CSS variables from your index.css for automatic light/dark mode support.
 *
 * @example
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="ghost" disabled>Disabled</Button>
 * <Button variant="danger" isLoading>Deleting...</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            isLoading = false,
            disabled = false,
            children,
            className = '',
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={`inline-flex items-center justify-center gap-2 font-medium border-none rounded transition-all duration-150 cursor-pointer outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
                {...props}
            >
                {isLoading && (
                    <span className="inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
                )}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';