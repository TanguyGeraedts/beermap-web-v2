import { forwardRef, type HTMLAttributes } from 'react';

interface Option<T> {
    label: string;
    value: T;
}

// @ts-ignore
interface SegmentedControlProps<T> extends HTMLAttributes<HTMLDivElement> {
    options: Option<T>[];
    value: T;
    onChange: (value: T) => void;
    fullWidth?: boolean;
}

/**
 * A pill-style button group for switching between views or filters.
 * Matches the project's theme-aware surface and primary colors.
 * Works with any type: strings, numbers, string unions, etc.
 */
export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps<any>>(
    ({
         options,
         value,
         onChange,
         className = '',
         fullWidth = false,
         ...props
     }, ref) => {
        return (
            <div
                ref={ref}
                className={`
                    flex p-1 gap-1 
                    bg-(--color-surface-muted) 
                    border border-(--color-border) 
                    rounded-lg 
                    ${fullWidth ? 'w-full' : 'w-fit'} 
                    ${className}
                `}
                {...props}
            >
                {options.map((option) => {
                    const isActive = option.value === value;
                    return (
                        <button
                            key={String(option.value)}
                            onClick={() => onChange(option.value)}
                            className={`
                                flex-1 px-4 py-1.5 text-sm font-medium rounded-md
                                transition-all duration-200 cursor-pointer
                                ${isActive
                                ? 'bg-(--color-primary) text-(--color-primary-contrast) shadow-sm'
                                : 'text-(--color-muted) hover:text-(--color-text) hover:bg-(--color-ring-soft)'
                            }
                            `}
                        >
                            {option.label}
                        </button>
                    );
                })}
            </div>
        );
    }
);

SegmentedControl.displayName = 'SegmentedControl';