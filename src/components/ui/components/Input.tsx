import { forwardRef, type InputHTMLAttributes } from 'react';

type InputSize = 'sm' | 'md' | 'lg';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    inputSize?: InputSize;
    label?: string;
    error?: string;
    helperText?: string;
};

const sizeStyles: Record<InputSize, string> = {
    sm: 'px-3 py-1.5 text-sm h-8',
    md: 'px-4 py-2 text-base h-10',
    lg: 'px-5 py-3 text-lg h-12'
};

/**
 * Input component with theme support.
 * Includes optional label, error, and helper text.
 *
 * @example
 * <Input label="Email" type="email" placeholder="you@example.com" />
 * <Input label="Name" error="This field is required" />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            inputSize = 'md',
            label,
            error,
            helperText,
            className = '',
            disabled = false,
            ...props
        },
        ref
    ) => {
        const sizeClass = sizeStyles[inputSize];

        return (
            <div className="flex flex-col gap-1.5">
                {label && (
                    <label className="text-sm font-medium text-(--color-text)">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    disabled={disabled}
                    className={`
            bg-(--color-surface)
            text-(--color-text)
            border border-(--color-border)
            rounded
            placeholder:text-(--color-muted)
            focus:outline-none focus:ring-2 focus:ring-(--color-primary)
            focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-150
            ${sizeClass}
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
                    {...props}
                />
                {error && <span className="text-xs text-red-500">{error}</span>}
                {helperText && !error && (
                    <span className="text-xs text-(--color-muted)">{helperText}</span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';