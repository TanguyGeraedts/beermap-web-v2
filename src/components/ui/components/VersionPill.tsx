import { forwardRef, type HTMLAttributes } from 'react';
import { Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppVersion } from '@/hooks/useMeta';

type VersionPillProps = HTMLAttributes<HTMLButtonElement> & {
    showIcon?: boolean;
};

/**
 * An interactive pill button that displays the app version
 * and navigates to the changelog on click.
 */
export const VersionPill = forwardRef<HTMLButtonElement, VersionPillProps>(
    ({ showIcon = true, className = '', ...props }, ref) => {
        const navigate = useNavigate();
        const { data, isLoading, isError } = useAppVersion();

        if (isLoading || isError || !data) return null;

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            navigate('/changelog'); // Update this path to your actual changelog route
            props.onClick?.(e);
        };

        return (
            <button
                ref={ref}
                onClick={handleClick}
                type="button"
                className={`
                    inline-flex items-center justify-center rounded-full font-mono font-medium
                    bg-slate-100 text-slate-600 border border-slate-200
                    px-2 py-0.5 text-[10px] uppercase tracking-wider
                    transition-all duration-200 ease-in-out
                    hover:bg-slate-200 hover:text-slate-900 hover:border-slate-300
                    active:scale-95 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-slate-300
                    ${className}
                `}
                {...props}
            >
                {showIcon && (
                    <Tag
                        size={10}
                        className="mr-1 opacity-70"
                        strokeWidth={2.5}
                    />
                )}
                {data.version}
            </button>
        );
    }
);

VersionPill.displayName = 'VersionPill';