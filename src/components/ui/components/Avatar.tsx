import { forwardRef, type HTMLAttributes, useState } from 'react';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: AvatarSize;
};

const sizeStyles: Record<AvatarSize, string> = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-2xl',
};

const getInitials = (fallback: string) => {
    return fallback
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

/**
 * Avatar component for user profile images.
 * Falls back to initials if image fails or no src provided.
 *
 * @example
 * <Avatar src="/profile.jpg" alt="John Doe" size="md" />
 * <Avatar fallback="John Doe" size="lg" />
 * <Avatar size="sm" /> // generic fallback icon
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
    (
        {
            src,
            alt = '',
            fallback,
            size = 'md',
            className = '',
            ...props
        },
        ref
    ) => {
        const [imgError, setImgError] = useState(false);
        const showImage = src && !imgError;
        const sizeClass = sizeStyles[size];

        return (
            <div
                ref={ref}
                className={`
          relative inline-flex items-center justify-center
          rounded-full overflow-hidden shrink-0
          bg-(--color-surface-muted)
          border border-(--color-border)
          ${sizeClass}
          ${className}
        `}
                {...props}
            >
                {showImage ? (
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-full object-cover"
                        onError={() => setImgError(true)}
                    />
                ) : fallback ? (
                    <span className="font-semibold text-(--color-muted) leading-none select-none">
            {getInitials(fallback)}
          </span>
                ) : (
                    // Generic person icon SVG fallback
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3/5 h-3/5 text-(--color-muted)"
                    >
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                )}
            </div>
        );
    }
);

Avatar.displayName = 'Avatar';