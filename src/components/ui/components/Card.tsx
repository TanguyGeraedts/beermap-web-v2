import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

type CardVariant = 'default' | 'muted' | 'elevated';

type CardProps = HTMLAttributes<HTMLDivElement> & {
    variant?: CardVariant;
    children: ReactNode;
};

type CardHeaderProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
};

type CardBodyProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
};

type CardFooterProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
};

const variantStyles: Record<CardVariant, string> = {
    default: 'bg-[var(--color-surface)] border border-[var(--color-border)]',
    muted: 'bg-[var(--color-surface-muted)] border border-[var(--color-border)]',
    elevated:
        'bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg'
};

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ className = '', ...props }, ref) => (
        <div
            ref={ref}
            className={`px-6 py-4 border-b border-[var(--color-border)] ${className}`}
            {...props}
        />
    )
);

CardHeader.displayName = 'CardHeader';

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
    ({ className = '', ...props }, ref) => (
        <div
            ref={ref}
            className={`px-6 py-4 ${className}`}
            {...props}
        />
    )
);

CardBody.displayName = 'CardBody';

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
    ({ className = '', ...props }, ref) => (
        <div
            ref={ref}
            className={`px-6 py-4 border-t border-[var(--color-border)] bg-[var(--color-surface-muted)] ${className}`}
            {...props}
        />
    )
);

CardFooter.displayName = 'CardFooter';

interface CardComponent
    extends React.ForwardRefExoticComponent<
        CardProps & React.RefAttributes<HTMLDivElement>
    > {
    Header: typeof CardHeader;
    Body: typeof CardBody;
    Footer: typeof CardFooter;
}

/**
 * Card component for grouping content.
 * Uses CSS variables for automatic theme support.
 *
 * @example
 * <Card variant="default">
 *   <Card.Header>Title</Card.Header>
 *   <Card.Body>Content here</Card.Body>
 * </Card>
 */
const CardComponent = forwardRef<HTMLDivElement, CardProps>(
    ({ variant = 'default', className = '', ...props }, ref) => (
        <div
            ref={ref}
            className={`rounded-lg overflow-hidden ${variantStyles[variant]} ${className}`}
            {...props}
        />
    )
);

CardComponent.displayName = 'Card';

export const Card = Object.assign(CardComponent, {
    Header: CardHeader,
    Body: CardBody,
    Footer: CardFooter
}) as CardComponent;