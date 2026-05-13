import { forwardRef, useState, type HTMLAttributes } from 'react';

type RatingSize = 'sm' | 'lg';

type RatingProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
    value: number;
    max?: number;
    size?: RatingSize;
    interactive?: boolean;
    onChange?: (value: number) => void;
};


export const Rating = forwardRef<HTMLDivElement, RatingProps>(
    (
        {
            value,
            max = 10,
            size = 'lg',
            interactive = false,
            onChange,
            className = '',
            ...props
        },
        ref
    ) => {
        const [hoverValue, setHoverValue] = useState<number | null>(null);

        const activeValue = hoverValue !== null ? hoverValue : value;
        const starCount = max / 2;
        const displayValue = value / 2;

        const handleStarClick = (index: number, isHalf: boolean) => {
            if (!interactive || !onChange) return;
            const newValue = (index * 2) + (isHalf ? 1 : 2);
            onChange(newValue);
        };

        // Small View: Star + Number
        if (size === 'sm' && !interactive) {
            return (
                <div ref={ref} className={`flex items-center gap-1.5 ${className}`} {...props}>
                    <StarIcon filled className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium text-(--color-text)">
                        {displayValue.toFixed(1)}
                    </span>
                </div>
            );
        }

        return (
            <div
                ref={ref}
                className={`flex items-center gap-1 ${className}`}
                onMouseLeave={() => interactive && setHoverValue(null)}
                {...props}
            >
                {[...Array(starCount)].map((_, i) => {
                    const starIndex = i;
                    const currentStarRating = activeValue / 2;

                    const isFull = currentStarRating >= starIndex + 1;
                    const isHalf = currentStarRating >= starIndex + 0.5 && !isFull;

                    return (
                        <div
                            key={i}
                            className={`relative ${interactive ? 'cursor-pointer' : ''}`}
                        >
                            {/* Hitboxes for interactive half-stars */}
                            {interactive && (
                                <div className="absolute inset-0 flex">
                                    <div
                                        className="w-1/2 h-full z-10"
                                        onMouseEnter={() => setHoverValue((i * 2) + 1)}
                                        onClick={() => handleStarClick(i, true)}
                                    />
                                    <div
                                        className="w-1/2 h-full z-10"
                                        onMouseEnter={() => setHoverValue((i * 2) + 2)}
                                        onClick={() => handleStarClick(i, false)}
                                    />
                                </div>
                            )}

                            <StarIcon
                                filled={isFull}
                                half={isHalf}
                                className={`${size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'} 
                                    ${(isFull || isHalf) ? 'text-yellow-400' : 'text-gray-300'}`}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
);

Rating.displayName = 'Rating';

const StarIcon = ({ filled, half, className }: { filled?: boolean; half?: boolean; className?: string }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <defs>
                <linearGradient id="halfStarGradient">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" stopOpacity="1" />
                </linearGradient>
            </defs>
            <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                fill={filled ? 'currentColor' : half ? 'url(#halfStarGradient)' : 'none'}
            />
        </svg>
    );
};