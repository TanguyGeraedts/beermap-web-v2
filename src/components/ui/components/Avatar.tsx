import { forwardRef, type HTMLAttributes, useState, useMemo } from 'react';

/**
 * Configuration: Change this string to update the global fallback style.
 * Options: 'identicon', 'pixel-art', 'bottts', 'lorelei', 'avataaars', etc.
 */
const SELECTED_STYLE = 'thumbs';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: AvatarSize;
}

const sizeStyles: Record<AvatarSize, string> = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-2xl',
};

/**
 * Avatar component for user profile images.
 * Defaults to a deterministic DiceBear image based on the 'fallback' prop
 * if 'src' is missing or fails to load.
 *
 * @example
 * <Avatar src={profile.avatarUrl} fallback={profile.username} size="lg" />
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
        const sizeClass = sizeStyles[size];

        const diceBearUrl = useMemo(() => {
            const seed = fallback || 'default';
            return `https://api.dicebear.com/7.x/${SELECTED_STYLE}/svg?seed=${encodeURIComponent(seed)}`;
        }, [fallback]);

        // Prioritize src, but switch to DiceBear if src is null or errors out
        const finalSrc = (src && !imgError) ? src : diceBearUrl;

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
                <img
                    src={finalSrc}
                    alt={alt || fallback || 'Avatar'}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                />
            </div>
        );
    }
);

Avatar.displayName = 'Avatar';