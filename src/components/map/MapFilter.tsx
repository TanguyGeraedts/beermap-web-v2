import { Globe, Users, Lock, type LucideIcon } from 'lucide-react';
import type { MapMode } from '@/types/map';

interface FilterConfig {
    id: MapMode;
    label: string;
    icon: LucideIcon;
}

const FILTERS: FilterConfig[] = [
    { id: 'GLOBAL',  label: 'All',     icon: Globe },
    { id: 'FRIENDS', label: 'Friends', icon: Users },
    { id: 'MINE',    label: 'Private', icon: Lock  },
];

interface MapFilterProps {
    mode: MapMode;
    onChange: (mode: MapMode) => void;
}

export const MapFilter = ({ mode, onChange }: MapFilterProps) => {
    return (
        <div
            className="flex p-2 rounded-2xl bg-(--color-surface)/90 backdrop-blur-md border border-(--color-border)"
            style={{ boxShadow: 'var(--shadow-nav)' }}
        >
            {FILTERS.map(({ id, label, icon: Icon }) => {
                const isActive = mode === id;
                return (
                    <button
                        key={id}
                        onClick={() => onChange(id)}
                        className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                        style={
                            isActive
                                ? { background: 'var(--color-primary)', color: 'var(--color-primary-contrast)' }
                                : { color: 'var(--color-muted)' }
                        }
                    >
                        <Icon size={11} />
                        {label}
                    </button>
                );
            })}
        </div>
    );
};