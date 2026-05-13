import { MapPin } from 'lucide-react';

interface LocationButtonProps {
    onClick?: () => void;
    isLoading?: boolean;
}

export const LocationButton = ({ onClick, isLoading }: LocationButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-200 active:scale-95 disabled:opacity-50"
            style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-primary)',
            }}
        >
            <MapPin size={18} />
        </button>
    );
};