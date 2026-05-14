import { forwardRef, type HTMLAttributes } from 'react';
import { Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type LegalPillProps = HTMLAttributes<HTMLButtonElement>;

/**
 * An interactive pill button that navigates to the Legal Center.
 */
export const LegalPill = forwardRef<HTMLButtonElement, LegalPillProps>(
    ({ className = '', ...props }, ref) => {
        const navigate = useNavigate();

        return (
            <button
                ref={ref}
                onClick={() => navigate('/legal')}
                type="button"
                className={`
                    inline-flex items-center justify-center rounded-full font-mono font-medium
                    bg-slate-100 text-slate-600 border border-slate-200
                    px-2 py-0.5 text-[10px] uppercase tracking-wider
                    transition-all duration-200 ease-in-out
                    hover:bg-slate-200 hover:text-slate-900 hover:border-slate-300
                    active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-300
                    ${className}
                `}
                {...props}
            >
                <Scale size={10} className="mr-1 opacity-70" strokeWidth={2.5} />
                Terms & Privacy
            </button>
        );
    }
);

LegalPill.displayName = 'LegalPill';