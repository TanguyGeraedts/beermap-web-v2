import { forwardRef, type HTMLAttributes } from 'react';
import { ShieldCheck, Crown, type LucideIcon } from 'lucide-react';
import type { AccountType } from '@/types';

type UserRankPillProps = HTMLAttributes<HTMLSpanElement> & {
    accountType: AccountType;
    compact?: boolean;
};

const rankConfig: Partial<Record<AccountType, { label: string; className: string; Icon: LucideIcon }>> = {
    ADMIN: {
        label: 'Admin',
        className: 'bg-red-100 text-red-700 border border-red-300',
        Icon: ShieldCheck
    },
    PREMIUM: {
        label: 'Premium',
        className: 'bg-[var(--color-ring-soft)] text-[var(--color-primary)] border border-[var(--color-primary)]',
        Icon: Crown
    }
};

/**
 * Displays a rank pill for ADMIN and PREMIUM users.
 * Renders nothing for NORMAL users.
 *
 * @example
 * <UserRankPill accountType="PREMIUM" />
 * <UserRankPill accountType="ADMIN" compact /> // Icon only
 */
export const UserRankPill = forwardRef<HTMLSpanElement, UserRankPillProps>(
    ({ accountType, compact = false, className = '', ...props }, ref) => {
        const config = rankConfig[accountType];

        if (!config) return null;

        const { Icon, label, className: variantClass } = config;

        return (
            <span
                ref={ref}
                title={compact ? label : undefined}
                className={`
                    inline-flex items-center justify-center rounded-full font-semibold
                    ${compact ? 'p-1' : 'gap-1.5 px-2 py-0.5 text-xs'} 
                    ${variantClass} 
                    ${className}
                `}
                {...props}
            >
                <Icon
                    size={compact ? 14 : 12}
                    strokeWidth={2.5}
                    aria-hidden="true"
                />
                {!compact && <span>{label}</span>}
            </span>
        );
    }
);

UserRankPill.displayName = 'UserRankPill';