import { forwardRef, type HTMLAttributes } from 'react';
import type { AccountType } from '@/types';

type UserRankPillProps = HTMLAttributes<HTMLSpanElement> & {
    accountType: AccountType;
};

const rankConfig: Partial<Record<AccountType, { label: string; className: string }>> = {
    ADMIN: {
        label: 'Admin',
        className: 'bg-red-100 text-red-700 border border-red-300'
    },
    PREMIUM: {
        label: 'Premium',
        className: 'bg-[var(--color-ring-soft)] text-[var(--color-primary)] border border-[var(--color-primary)]'
    }
};

/**
 * Displays a rank pill for ADMIN and PREMIUM users.
 * Renders nothing for NORMAL users.
 *
 * @example
 * <UserRankPill accountType="PREMIUM" />
 * <UserRankPill accountType="ADMIN" className="shadow-sm" />
 */
export const UserRankPill = forwardRef<HTMLSpanElement, UserRankPillProps>(
    ({ accountType, className = '', ...props }, ref) => {
        const config = rankConfig[accountType];

        // Renders nothing for NORMAL users
        if (!config) return null;

        return (
            <span
                ref={ref}
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.className} ${className}`}
                {...props}
            >
                {config.label}
            </span>
        );
    }
);

UserRankPill.displayName = 'UserRankPill';