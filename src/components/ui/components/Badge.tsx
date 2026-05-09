import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';
type BadgeSize = 'sm' | 'md';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
    variant?: BadgeVariant;
    size?: BadgeSize;
    children: ReactNode;
};

const variantStyles: Record<BadgeVariant, string> = {
    default:
        'bg-[var(--color-surface-muted)] text-[var(--color-text)] border border-[var(--color-border)]',
    primary:
        'bg-[var(--color-primary)] text-[var(--color-primary-contrast)] border border-[var(--color-primary)]',
    success: 'bg-green-100 text-green-800 border border-green-300',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    danger: 'bg-red-100 text-red-800 border border-red-300'
};

const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
};

/**
 * Badge component for labels and tags.
 *
 * @example
 * <Badge variant="primary">Active</Badge>
 * <Badge variant="success" size="sm">Verified</Badge>
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    ({ variant = 'default', size = 'md', className = '', ...props }, ref) => {
        return (
            <span
                ref={ref}
                className={`inline-flex items-center font-medium rounded-full ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
                {...props}
            />
        );
    }
);

Badge.displayName = 'Badge';