import { FileText, Camera } from 'lucide-react';

interface LogDrinkButtonProps {
    onLog?: () => void;
    onSnap?: () => void;
}

export const LogDrinkButton = ({ onLog, onSnap }: LogDrinkButtonProps) => {
    return (
        <div
            className="flex rounded-full shadow-lg overflow-hidden"
            style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
            }}
        >
            {/* Log button - left side */}
            <button
                onClick={onLog}
                className="flex items-center justify-center gap-2 px-4 py-3 transition-colors active:scale-95"
                style={{
                    color: 'var(--color-primary)',
                    borderRight: '1px solid var(--color-border)',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-surface-muted)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                }}
            >
                <FileText size={18} />
                <span className="text-sm font-medium">Log</span>
            </button>

            {/* Snap button - right side */}
            <button
                onClick={onSnap}
                className="flex items-center justify-center gap-2 px-4 py-3 transition-colors active:scale-95"
                style={{
                    color: 'var(--color-primary)',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-surface-muted)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                }}
            >
                <Camera size={18} />
                <span className="text-sm font-medium">Snap</span>
            </button>
        </div>
    );
};