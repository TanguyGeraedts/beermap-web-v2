import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

type AlertProps = HTMLAttributes<HTMLDivElement> & {
    variant?: AlertVariant;
    title?: string;
    children: ReactNode;
    onClose?: () => void;
};

const variantStyles: Record<AlertVariant, string> = {
    info: 'bg-blue-50 border border-blue-200 text-blue-800',
    success: 'bg-green-50 border border-green-200 text-green-800',
    warning: 'bg-yellow-50 border border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border border-red-200 text-red-800'
};

/**
 * Alert component for notifications and messages.
 *
 * @example
 * <Alert variant="success" title="Success">
 *   Your profile has been updated.
 * </Alert>
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
    (
        {
            variant = 'info',
            title,
            children,
            onClose,
            className = '',
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={`rounded-lg p-4 ${variantStyles[variant]} ${className}`}
                {...props}
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        {title && (
                            <h3 className="font-semibold mb-1">{title}</h3>
                        )}
                        <div className="text-sm">{children}</div>
                    </div>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="text-current opacity-60 hover:opacity-100 transition-opacity flex-shrink-0"
                            aria-label="Close alert"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>
        );
    }
);

Alert.displayName = 'Alert';