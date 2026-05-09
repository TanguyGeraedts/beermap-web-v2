import { forwardRef, type HTMLAttributes } from 'react';

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
    width?: string;
    height?: string;
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
};

const roundedStyles = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
};

/**
 * Skeleton component for loading states.
 * Shows a pulsing placeholder while content loads.
 *
 * @example
 * <Skeleton width="w-full" height="h-12" rounded="md" />
 * <Skeleton width="w-32" height="h-8" rounded="full" />
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
    (
        {
            width = 'w-full',
            height = 'h-4',
            rounded = 'md',
            className = '',
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={`
          bg-(--color-surface-muted)
          animate-pulse
          ${width}
          ${height}
          ${roundedStyles[rounded]}
          ${className}
        `}
                {...props}
            />
        );
    }
);

Skeleton.displayName = 'Skeleton';